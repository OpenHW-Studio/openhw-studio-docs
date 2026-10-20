# gapEsp32.md — esp32-emu integration gaps (owner fills in)

Probed 2026-10-02: `esp32-emu@1.1.0` (`SimulatorWorker`, `dist/index.js` + `.d.ts`).
Verified live: 2× `SimulatorWorker.init()` isolated, `pollUart/setPinInput/sendUart/
step/terminate/pressResetButton` all functions.

**Updated 2026-10-20** — the network story changed completely. The old
"Network Worker port hooks later" plan is dead: the in-emulator WiFi/IP stack
was DELETED (the frontend Network Worker, the NetworkComponentOverlay, the
`wifi-ap` component, the `wirelessMode`/`ethLive` attrs). The ONE network path
is the **unified gateway** (`openhw-unified-gateway`, Go): raw Ethernet over
`ws://127.0.0.1:5030/api/network-gateway`, room via `?sessionId=`, virtual net
`192.168.4.0/24`, gateway at `192.168.4.1`, DHCP + gVisor DNS/NAT. See
`architecture/network-bringup.md`.

**ESP32 is the one engine that dials the gateway ITSELF.** The engine's
worker entry opens the WebSocket at boot (`connectGateway`) and buffers frames
pre-open; the runner only passes `config.wifi` and reads back
`getWifiStats()`. There is no `GatewayLink` in the ESP32 runner — the
Pico/F4 runners own their link instead.

Engine bytes: dev resolves the owner's local folder via `resolve.alias` in
`OpenHW-studio-frontend/vite.config.js`
(`esp32-emu/dist/sab/worker-proxy.js` → `/home/danish1075/Documents/esp32 emu/dist/sab`).
npm-shaped specifiers are preserved so the npm flip stays a root swap.
**The engine repos are READ-ONLY for us** — engine changes are delivered as
patches/proposals for the owner to merge, never applied in place.

## PROVEN (live e2e cells, all green)

| What | Cell | Evidence |
|---|---|---|
| ESP32 DevKit STA joins the AP and takes a DHCP lease **from the gateway** | `tests/e2e/esp32-wifi-gateway.spec.js` | `SCAN n=1`, `STATUS=3`, `IP=192.168.4.2` (a lease can only come from the gateway's gVisor DHCP server) |
| ESP32-CAM (cam preset) WiFi + DHCP | `tests/e2e/esp32-cam-wifi-gateway.spec.js` | `STATUS=3`, `IP=192.168.4.x` |

The `SCAN n=1` result is real (the fake AP is visible to the engine's scan);
the cell scans **after** the join so a `scanNetworks()` stall can never
swallow the DHCP evidence (`scanNetworks()` is a blocking call that
intermittently never returns on this engine — see STILL OPEN).

## The "RED" was a HOST-SIDE wedge, not a guest stall

The earlier red ESP32 WiFi cell was **not** an engine bug. The runner's stats
poll (`pollNetStats`, every 2 s after the first UART flow) posts
`CMD_GET_WIFI_STATS`; the SAB proxy busy-spins for `RESP_DONE`, but the
engine only serviced that command in `commandLoop`, **which never turns while
`RUN=1`**. The first stats poll therefore wedged the board worker permanently
(UART frozen, engine running unwatched) — the same class as the earlier
TWAI-TX wedge.

* Fixed **in the frontend's vendor mirror**
  (`public/vendor/board-engines/esp32-emu/dist/sab/worker-entry.js`): the
  command is serviced inline in `runSimChunk`, mirroring the
  `processCommand` case verbatim (`_syncWifiStatus` + status bridged into
  `readResp`). Read-only status mirror; no silicon behaviour invented.
* The same change was proposed to the engine on branch **`wifi-fix`, commit
  `a0684ef`** in `/home/danish1075/Documents/esp32 emu`
  ("Serve CMD_GET_WIFI_STATS inline while RUN=1"). **The engine owner has to
  merge it** — until then the frontend carries the fix in its mirror.
* The reported "guest stall at `0x400857b3`" was a **red herring** — literal
  pool data, not a stall. It never reproduced once the wedge was removed.

## STILL OPEN

- **ESP32-CAM beyond WiFi**: only WiFi + DHCP are proven. No LAN TCP, no
  HTTP-through-NAT, no camera-over-network for the cam preset.
- **`scanNetworks()` can hang.** It is a blocking call that intermittently
  never returns on this engine (reproduced 2/5 runs by the coverage lane).
  Every cell that needs a scan result must scan **after** the proof
  markers, or not at all.
- **v4 DNS for static-IP guests** needs an explicit `WiFi.setDNS(...)`
  (proven on Pico W, `pico-wifi-lan.spec.js`); the ESP32 static-IP path is
  not proven yet.
- **The gateway resolver is only reachable through the gateway's own
  `.1`.** A room whose member claims `192.168.4.1` as a soft AP makes the
  gateway yield that address (room-aware ARP arbitration, gateway
  `main@151927d`) — in such a room the gateway's own `.1` services
  (including the resolver it advertises in the DHCP lease) are **not
  reachable** from that room.
- `getPcapData` and `sendTwaiFrame` are still unwired by the runner.

## ENGINE OWNER MUST DO

1. **Merge `wifi-fix` (`a0684ef`)** into the engine main branch: serve
   `CMD_GET_WIFI_STATS` inline while `RUN=1`. Without it, any host that polls
   WiFi stats mid-run wedges the board worker. The frontend mirror carries
   the fix meanwhile, but the npm/folder engine bytes will not have it until
   the owner merges.
2. **TLS types for the net config**: `config.wifi`
   (`{ssid, bssid, channel, room, gatewayUrl}`) has no declared shape in the
   `.d.ts`; the runner passes it untyped. A rename is silent.
3. **`scanNetworks()` must not hang** — a blocking scan that never returns is
   a guest-visible liveness bug (2/5 runs).

## What the runner needs (OpenHW side implements)

- [ ] Decide Arduino `.bin` source: esp32 arduino core in compiler image?
      Dockerfile.compiler currently installs only `arduino:avr` + `rp2040:rp2040`.
      Add `esp32:esp32` core + confirm it emits `.bin` (+ which flash offset).
- [ ] Flash offset rule: README quickstart writes `.bin` at offset 0, MicroPython
      example writes at `0x1000` (`esptool write_flash 0x1000`). Runner currently
      places Arduino `.bin` at 0, MicroPython image at `0x1000` — confirm per image type.
- [ ] Decide micropython `.bin` distribution: bundle in `public/firmware/` or
      backend endpoint? (pico pattern: `public/firmware/`.)
- [ ] Confirm default UART pins for DevKit (TX0=GPIO1/RX0=GPIO3, USB TX=GPIO17/RX=GPIO16?)
      and status-LED pin for runner GPIO/pin-watch bridge.
- [x] **WiFi**: the engine dials the gateway itself at boot; the runner only
      passes `config.wifi {ssid, bssid, channel, room, gatewayUrl}` (attrs +
      run options) and surfaces `getWifiStats()` → `netUp` / `netIp`
      telemetry. **Proven** (see PROVEN above).
- [ ] BLE / Ethernet / TWAI: still unwired (`getPcapData`, `sendTwaiFrame`).

## Package gaps (needs package author or workaround)

- [ ] Runtime/type mismatch: `index.d.ts` declares `XtensaCore/Memory/GdbSession/
      IOPinState/...` but runtime exports only 7
      (`ESP32, ESP32_CAM_*, MultiSimulator, SimulatorWorker, applyBoardPreset`).
      Runner imports only the 7 real exports — confirm the rest are type-only.
- [ ] `sendUart` used in README MicroPython example but absent from `.d.ts`
      (verified present at runtime). Confirm stable API.
- [ ] `MultiSimulator` parallel API untested by runner (we run one SimulatorWorker
      per board instead — simpler + verified isolated). Confirm no shared WASM state.
- [ ] No `.hex/.elf/.uf2` — `.bin` only. Backend `artifactSelector` already
      supports `bin` (base64) — confirm arduino-esp32 build emits `.bin`.

## Wiring checklist (runner implements, no gaps)

`new SimulatorWorker()` + `_onUART` → `init('ESP32', {board, flashSizeMB:4,
mmuPages:64, strapValue:0x13, budget, [cpuFrequency],
wifi:{ssid,bssid,channel,room,gatewayUrl}}, flash, rom)` → `run()` +
timer `pollUart()` → `sendUart(str)`/`setPinInput(pin, level)` →
`pressResetButton()` reset, `terminate()` stop, `readMemory/readMmio` debug,
`step(n)` optional budget mode.

Network: `config.wifi` at init (engine dials the gateway itself) + a throttled
`getWifiStats()` poll — the poll is safe only because the engine services
`CMD_GET_WIFI_STATS` inline while `RUN=1` (see the wedge story above).
