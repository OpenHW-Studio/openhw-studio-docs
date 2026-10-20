# gapPico.md — pico-emu integration gaps (owner fills in)

Probed 2026-10-02: `pico-emu@1.0.3` (`picoemu.wasm.js` Emscripten, `_picoemu_*` × ~90).
Verified live: init/step/load_uf2/load_elf/write_uart/read_uart/set_gpio/get_gpio_out/is_halted/set_clock,
2× Module instances isolated, hello_world.uf2 boots (37B UART), micropython_rp2040.uf2 REPL works
(`print(1+2)` → `3`).

**Updated 2026-10-20** — the network story changed completely. There is no
in-emulator WiFi/IP stack any more: the old stub/fake-DHCP path and the whole
in-emulator network worker were DELETED. The ONE network path is the
**unified gateway** (`openhw-unified-gateway`, Go): raw Ethernet frames over
`ws://127.0.0.1:5030/api/network-gateway`, room selected by `?sessionId=`,
virtual net `192.168.4.0/24` with the gateway at `192.168.4.1`, DHCP + gVisor
DNS/NAT. See `architecture/network-bringup.md` for the design and for how a
new board is wired to it.

Engine bytes: dev resolves the owner's local folder via `resolve.alias` in
`OpenHW-studio-frontend/vite.config.js`
(`pico-emu/picoemu.wasm.js` → `/home/danish1075/Documents/rp2350/Pico-emu/web`).
The import specifiers stay npm-shaped, so the eventual npm flip is a root
swap in two places (`importEngine` in `src/worker/runners/arm-runner-base.ts`
+ the `resolve.alias` block). **The engine repos are READ-ONLY for us** — the
owner is actively making the engines faster; engine changes are delivered as
patch files, never applied in place.

## PROVEN (live e2e cells, all green)

WiFi (CYW43) — `_picoemu_wifi_enable(1)` + WS uplink + per-tick TX pump:

| What | Cell | Evidence |
|---|---|---|
| Pico W joins the AP and takes a DHCP lease **from the gateway** | `tests/e2e/pico-wifi-gateway.spec.js` | `STATUS=3`, `IP=192.168.4.2` (a lease can only come from the gateway's gVisor DHCP server) |
| Pico 2 W (M33) joins the AP + DHCP | `tests/e2e/pico2-w-wifi-gateway.spec.js` | `STATUS=3`, `IP=192.168.4.x` |
| Two Pico W boards in ONE room do TCP client↔server | `tests/e2e/pico-wifi-lan.spec.js` | observed echo bytes; DNS resolved via `WiFi.setDNS(192.168.4.1)` (md@6a864e0e) |
| Guest **SoftAP** hosts a TCP echo server, a joining STA reaches it | `tests/e2e/pico-wifi-ap-serve.spec.js` | `APS-STA-RX:AP-ECHO:HELLO-AP-SERVE` — real bytes, not a firmware self-report (md@f7777fb1) |
| Same room, reversed: the AP is the TCP client, the STA serves | `tests/e2e/pico-wifi-ap2.spec.js` | `APC-RX:AP-ECHO2:HELLO-STA` |
| HTTP GET through the gateway NAT map | `tests/e2e/pico-http-gateway.spec.js` | `HTTP-CODE:200` + body exactly `hello-openhw` |
| DNS resolution through the gateway resolver | `tests/e2e/pico-wifi-dns.spec.js` | `hostByName` returns a real address (not `0.0.0.0`); the guest prints the resolver it used |
| A STA targets the AP's REAL address | `tests/e2e/pico-wifi-ap.spec.js` | green (the cell used to target `192.168.5.1`, an address the engine never uses) |

Ethernet (W5500) — `_picoemu_board_eth(1, live=1, spi)` + `_picoemu_w5500_gw_enable(1)`:

| What | Cell | Evidence |
|---|---|---|
| Pico-ETH full DORA (DISCOVER→OFFER→REQUEST→ACK) | `tests/e2e/pico-eth-gateway.spec.js` | `ip=192.168.4.x` from the gateway DHCP server; needs the `tickMHz 125` attr (see engine gaps) |
| Pico 2 ETH (M33, W5500) full DORA | `tests/e2e/pico2-eth-gateway.spec.js` | `ip=192.168.4.x` |
| IPv6 SLAAC (RS → RA) through the gateway | `tests/e2e/pico-ping6-gateway.spec.js` | `RV32 PING6 RA-OK` (the guest is the owner's `wifi_ping6_rv32.uf2`) |

## STILL OPEN

- **W6300 boards — proof in progress** (lane `lane/net-6300`, not merged).
  The engine has a `pico-w6300` board (CSn=16/RSTn=22/INTn=15) and the same
  gateway bus, but the **arduino-pico core has no W6300 board entry** (only
  W5500 `wiznet_5500_evb_pico[_2]`) → no compile target → no
  `openhw-pico-w6300` shell until the core ships one (or a custom FQBN).
- **W5500 INTn / GPIO21 interrupt path — proof in progress.** The DORA cells
  above are **polling** firmware; a W5500 that interrupts on INTn is not
  proven yet (`tests/e2e/pico-eth-intn-gateway.spec.js` is in flight).
- **ICMPv6 echo** is still unproven: the owner's ping6 guest targets a
  compiled-in peer (`fd00:4::64`), and the gateway answers NS only for its
  own addresses. The cell asserts `RA-OK` only; the echo is printed but not
  asserted.
- **Sockets 1–7 TCP/UDP offload** (the lwIP proxy path) — deferred, the
  gateway path carries socket 0 only.
- **BLE HCI** (`_bt_hci_enable`) — deferred, no HCI peer plumbing.
- **v4 DNS for static-IP guests** needs an explicit `WiFi.setDNS(...)`
  (proven on Pico W: `pico-wifi-lan.spec.js`); the DHCP-lease resolver
  (gateway advertises `192.168.4.1` alongside `8.8.8.8`) is the other half.

## ENGINE OWNER MUST DO

1. **arduino-pico core: W6300 board entry.** Without a compile target the
   W6300 carrier cannot be booted from a sketch. (Proof in flight on
   `lane/net-6300`; the runner side already selects the engine board via the
   `ethChip` attr and calls `_picoemu_board_eth6300` + `_picoemu_w6300_gw_enable(1)`.)
2. **W5500 at the 200 MHz arch default never completes DHCP.**
   `begin()` does not return because the guest outruns the wall DHCP timers;
   the cells therefore pass the `tickMHz 125` attr. Engine-side quirk,
   flagged upstream (same on M0 and M33).
3. **`_picoemu_board_eth(1, live=0, spi)` stalls DHCP** in our runner even
   though the owner demo uses `live=0`; we run `live=1` (proven green
   twice). The demo's extra proxy-socket/upload path likely covers the
   difference — flagged upstream.
4. **`softAPConfig` is not honoured**: the SoftAP netif is hardcoded to
   `192.168.4.1`. Guests that try to move the AP subnet get the hardcoded
   address anyway (this is why `pico-wifi-ap.spec.js` had to be repointed).
   Not fatal, but it is a deviation from the Arduino API.
5. **W5500 INTn**: expose the interrupt path so a W5500 that raises INTn can
   be proven (the gateway path itself is already proven for polling guests).

> Trade-off worth knowing (gateway side, already shipped): a room whose
> member claims `192.168.4.1` as a **soft AP** makes the gateway yield that
> address (room-aware ARP arbitration, gateway `main@151927d`). In such a
> room the gateway's own `.1` services — including the resolver it
> advertises in the DHCP lease — are **not reachable** from that room.

## What the runner needs (OpenHW side — DONE)

- [x] Decide UF2 source for Arduino sketches: arduino-pico core in compiler image?
      Dockerfile.compiler already installs `rp2040:rp2040` core — confirm it emits `.uf2`.
- [x] Decide micropython UF2 distribution: bundle `micropython_rp2040.uf2` (~650K)
      in frontend `public/firmware/` or fetch from backend `/compile/pico/micropython-uf2`?
- [x] Confirm ADC pin mapping GP26/27/28 + PWM slice mapping for runner GPIO bridge.
- [x] Confirm 2nd UART (uart1) pins used by default Arduino Serial1 config.
- [x] **WiFi (CYW43)**: `_picoemu_wifi_enable(1)` for Pico W / Pico 2 W
      (`openhw-pico-w`, `openhw-pico-2-w`, FQBN rpipicow/rpipico2w). The
      **fake in-emulator DHCP/DNS is gone** — DHCP is served by the unified
      gateway and DNS by the gateway resolver.
- [x] **Ethernet (W5500)**: `_picoemu_board_eth(1, live=1, spi)` for
      `openhw-pico-eth` / `openhw-pico-2-eth` (FQBN wiznet_5500_evb_pico[_2],
      CSn17/RSTn20/INTn21, `boardSpi` attr 0/1). The live gateway socket is
      **no longer deferred** — it is the only path.
- [ ] BLE: `_bt_hci_enable` stays deferred (no HCI peer plumbing).
- [ ] W6300 (pico-w6300): engine board exists, arduino-pico has NO W6300
      board entry → no compile target → no `openhw-pico-w6300` shell yet.

## Package gaps (needs package author or workaround)

- [ ] No TypeScript types: `main: picoemu.wasm.js` has no `.d.ts`. Runner uses
      `any`-typed dynamic import (fine), but confirm `_picoemu_*` names are stable API.
- [ ] Multi-instance: verified 2× `Module()` isolated. Threads build
      (`picoemu.wasm.threads.js`) untested — runner uses single-thread build only.
- [ ] `_picoemu_load_elf` exists but CLI only accepts `.uf2`. Confirm ELF load path
      works for arduino-pico `.elf` (runner probes: UF2 first, ELF fallback).
- [ ] No `.bin/.hex` support — arduino-cli must output `.uf2`/`.elf` (it does).
- [ ] The engine has **no TS types for the net ABI** (`_wifi_enable`,
      `_board_eth`, `_w5500_gw_enable`, `_eth_set_uplink`, `_eth_push_rx`,
      `_eth_pop_tx`). We guard every call with `typeof` — a rename in the
      engine silently disables networking instead of failing loudly. Types
      (or a version constant) would make that loud.

## Wiring checklist (runner implements, no gaps)

`_picoemu_init(arch)` → `_malloc` + `HEAPU8.set` + `_picoemu_load_uf2/_load_elf` →
`_picoemu_reset` → loop `_picoemu_step(n)` + drain `_picoemu_read_uart(0)` →
`_picoemu_write_uart(b)` RX, `_picoemu_set_gpio/_get_gpio_out` GPIO,
`_picoemu_is_halted` stop, `_picoemu_get_core_state` pc/sp.

Network (post-init, pre-step — `startNetLink` / `pumpNetLink` / `stopNetLink`
in `src/worker/runners/pico-runner.ts`):

`_picoemu_wifi_enable(1)` **or** `_picoemu_board_eth(1, live=1, spi)` +
`_picoemu_w5500_gw_enable(1)` → `_picoemu_eth_set_uplink(1)` (asserted BEFORE
the first step, owner parity with `rp2350/Pico-emu web/cli.js`) → open
`GatewayLink(gatewayUrl, room)` → RX: `_malloc` + `HEAPU8.set` +
`_picoemu_eth_push_rx(ptr, len)` + `_free` → TX per tick: `_malloc(2048)` +
`_picoemu_eth_pop_tx(ptr, 2048)` (≤16 frames per tick) + `_free`.
