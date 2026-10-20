# Network bring-up (unified gateway) — 2026-10-20

**Status: SHIPPED and PROVEN.** This is the reference for the next agent who
has to wire a new engine or board to the network. Everything below was
verified live on 2026-10-20 against the unified gateway
(`github.com/OpenHW-Studio/openhw-studio-gateway`, `main@151927d`).

> Superseded world: the in-emulator WiFi/IP stack (`picow-net` ARP/DHCP/DNS/
> ICMP/TCP/UDP NAT, `wifi-environment`, `wifi-status-parser`,
> `network-worker-proxy`, the frontend Network Worker +
> NetworkComponentOverlay, the `wifi-ap` component, the `wirelessMode` /
> `ethLive` attrs) was **DELETED**. The curriculum content that referenced
> WiFi (guided projects) was deliberately **kept**. There is exactly ONE
> network path now, and it is not inside the emulator.

## 1. The design in one paragraph

`openhw-unified-gateway` is a single Go binary that owns the emulated
network. Each board is a **station on a raw-Ethernet bus**; frames are
carried over a WebSocket as binary frames
(`dst[0:6] src[6:12] ethertype-BE[12:14]`, 14..1522 bytes). The gateway
holds a **gVisor virtual network** per room:

| Thing | Value |
|---|---|
| Endpoint | `ws://127.0.0.1:5030/api/network-gateway` |
| Room | `?sessionId=<room>` (the query string, not a header) |
| Virtual net | `192.168.4.0/24` |
| Gateway address | `192.168.4.1` (also the DNS resolver) |
| DHCP | served by the gateway (gVisor) — the pool starts at `.2` and is **presence-based**, never count-based |
| DNS | the gateway resolver at `192.168.4.1:53` (answers through the host resolver) + `8.8.8.8` reachable only via the host's internet path |
| NAT | the gateway's NAT map (e.g. guest `10.150.211.85` → host `127.0.0.1:8092`) |

One room = one L2 hub = one shared DHCP pool. Two boards that must talk to
each other must use the **same room**; two boards in different rooms are
isolated by the gateway.

## 2. Two link styles — pick per engine

### 2a. The runner owns the link (Pico, STM32F4)

`src/worker/net/gateway-link.ts` (`GatewayLink`) is the single owner of the
socket:

* opens `base + '?sessionId=' + encodeURIComponent(room)`;
* binary frames in → `onFrame(frame)`, binary frames out → `send(frame)`;
* text frames are gateway control: `BOARD_IP:<ip>` sets the board IP and
  raises the status;
* TX frames queued before the socket opens (cap 256 frames, oldest dropped);
* default URL `ws://127.0.0.1:5030/api/network-gateway`, overridable with
  `VITE_GATEWAY_URL` (alias `VITE_NET_GATEWAY_URL`) at build time, or per
  board via the `gatewayUrl` board attr / run option.

The runner then drives the engine's own net API.

### 2b. The engine dials the gateway itself (ESP32)

The ESP32 engine's worker entry opens the WebSocket itself at boot
(`connectGateway`, pre-open buffered) and speaks raw Ethernet inside the
engine. The runner therefore only passes the **config** and reads the
**status**:

```
init('ESP32', { ..., wifi: { ssid, bssid, channel, room, gatewayUrl } }, flash)
```

and polls `getWifiStats()` (throttled, gated on first UART flow) for
`netUp` / `netIp` telemetry. There is no `GatewayLink` in the ESP32 runner.

> Host-side trap, already hit once: the stats poll posts
> `CMD_GET_WIFI_STATS`; if the engine only services that command in
> `commandLoop` (which never turns while `RUN=1`) the **board worker
> wedges** — the guest looks dead. The ESP32 engine must service that
> command inline while running (engine branch `wifi-fix`, commit `a0684ef`).

## 3. Per-engine net entry points (current contract)

| Engine | Enable | TX out | RX in | Notes |
|---|---|---|---|---|
| **pico-emu** (CYW43 WiFi) | `_picoemu_wifi_enable(1)` | `_picoemu_eth_pop_tx(ptr, max)` | `_picoemu_eth_push_rx(ptr, len)` | uplink asserted with `_picoemu_eth_set_uplink(1)` **before the first step**; ≤16 TX pops per tick; RX via `_malloc` + `HEAPU8.set` + `_free` |
| **pico-emu** (W5500 ETH) | `_picoemu_board_eth(1, live=1, spiBus)` + `_picoemu_w5500_gw_enable(1)` | same | same | `boardSpi` attr picks SPI0/SPI1; `live=1` (live=0 stalls DHCP in our runner); W5500 needs `tickMHz 125` |
| **pico-emu** (W6300 ETH, in progress) | `_picoemu_board_eth6300` + `_picoemu_w6300_gw_enable(1)` | same | same | same room/pool/pump; engine board `pico-w6300` (CSn16/RSTn22/INTn15); no arduino-pico compile target yet |
| **esp32-emu** | engine dials the gateway at boot from `config.wifi` | engine-internal | engine-internal | runner only supplies config + reads `getWifiStats()` |
| **stm32f4-emu** | create-time `withAssets.onTx` (TX tap) + `ethSetLink(true)` at boot | via the `onTx` queue | `ethInject(frame)` (≤8 per drain) | `withAssets.irq_eth = true` is an **opt-in** for interrupt-driven guests; the polling HTTP image must NOT set it |

## 4. How to wire a NEW engine/board to the gateway

1. **Get the engine to speak raw Ethernet.** Either (a) the engine owns the
   WebSocket itself (ESP32 style — simplest, the engine already has a net
   stack) or (b) the engine exposes a MACRAW-style frame tap and the runner
   pumps frames (Pico/F4 style). Option (b) needs these primitives on the
   engine:
   * a TX tap that hands the runner complete Ethernet frames;
   * an RX inject that accepts a complete Ethernet frame;
   * an "uplink/link" enable that must be asserted **before the first step**
     (the guest's first ARP/DHCP must not go into the void).
2. **Create the `GatewayLink` in the runner** (`src/worker/net/gateway-link.ts`):
   `new GatewayLink(gatewayUrl, room, { onFrame, onStatus })`, then `open()`.
   Use the run's `sessionId` as the room so two boards on the same canvas
   land in the same room; fall back to the board id.
3. **Route RX**: `onFrame` → engine RX inject (Pico: malloc + copy +
   `_picoemu_eth_push_rx`; F4: queue + `ethInject`).
4. **Route TX**: engine TX tap → `link.send(frame)`, drained **per tick**
   (≤16 frames per tick for Pico; a create-time queue for F4).
5. **Publish status**: `onStatus` → board instance `setState({ netUp, netIp })`
   so the page shows the lease.
6. **Write a proof cell** that asserts the gateway-side artefact, not a
   firmware self-report: a `192.168.4.x` address can only have come from the
   gateway's DHCP server; an HTTP body must match byte for byte.
7. **Run the cell serially** (`--workers=1`), with the gateway running
   (`curl localhost:5000/api/health` for the backend, the gateway on :5030).

### Expectations the gateway gives you

* **The lease carries a resolver.** DHCP leases advertise the **gateway
  resolver `192.168.4.1`** *alongside* `8.8.8.8`, so a lease-based lookup
  stays inside the virtual net and does not depend on the host's public
  resolver (gateway commit `3f8814b`, on `main`).
* **Static-IP guests have no lease and therefore no resolver.** They must
  set it explicitly — `WiFi.setDNS(192.168.4.1)` (proven on Pico W:
  `tests/e2e/pico-wifi-lan.spec.js`). This is the one DNS gap still open for
  other boards.
* **ARP arbitration for `.1` is room-aware.** If a room member claims
  `192.168.4.1` as a **soft AP**, the gateway stops answering `.1` ARP
  requests so the AP answers for itself (gateway `main@151927d`). This is
  what makes an AP-hosted server reachable from a joining STA.
  **Trade-off:** in such a room the gateway's own `.1` services — including
  the resolver it advertises — are **unreachable** from that room.
* **The DHCP pool is global and drifts.** Lease numbers advance across rooms
  and boards; never hardcode a lease number in a cell (use a static address
  or assert only the `192.168.4.` prefix).

## 5. Where the proofs live (frontend e2e cells)

| Capability | Cell |
|---|---|
| Pico W join + DHCP | `tests/e2e/pico-wifi-gateway.spec.js` |
| Pico 2 W join + DHCP | `tests/e2e/pico2-w-wifi-gateway.spec.js` |
| Pico W 2-board LAN TCP echo | `tests/e2e/pico-wifi-lan.spec.js` |
| Pico-W guest SoftAP serve + join (TCP both directions) | `tests/e2e/pico-wifi-ap-serve.spec.js`, `tests/e2e/pico-wifi-ap2.spec.js`, `tests/e2e/pico-wifi-ap.spec.js` |
| Pico-W HTTP client through the gateway NAT | `tests/e2e/pico-http-gateway.spec.js` |
| Pico-W DNS through the gateway | `tests/e2e/pico-wifi-dns.spec.js` |
| Pico IPv6 SLAAC (RA-OK) | `tests/e2e/pico-ping6-gateway.spec.js` |
| Pico-ETH / Pico 2 ETH (W5500) full DORA | `tests/e2e/pico-eth-gateway.spec.js`, `tests/e2e/pico2-eth-gateway.spec.js` |
| ESP32 / ESP32-CAM WiFi join + DHCP | `tests/e2e/esp32-wifi-gateway.spec.js`, `tests/e2e/esp32-cam-wifi-gateway.spec.js` |
| F407 / 407VE / F429 Ethernet DORA | `tests/e2e/stm32f4-eth-gateway.spec.js`, `...-ve.spec.js`, `...-429.spec.js` |
| F407 HTTP through the NAT | `tests/e2e/stm32f4-http-gateway.spec.js` |

Key commits: md@6a864e0e (DNS), md@f7777fb1 (SoftAP reachability),
md@4756774c (F4 honesty), md@49ed411c (micro:bit closure),
gateway `main@151927d` (ARP arbitration), engine `wifi-fix@a0684ef` (ESP32
stats-CMD proposal).

## 6. Engine sourcing (standing rule)

The engine repos are **READ-ONLY for us** — the owner/another agent is
actively making the engines faster. Engines run from the owner's local
folders in dev via `resolve.alias` in `OpenHW-studio-frontend/vite.config.js`
(Pico → `rp2350/Pico-emu/web`, ESP32 → `esp32 emu/dist/sab`; F4 stays on the
npm pair because the owner folder is mid-rebuild; F1 is mid-transition — dev
resolves npm while the deploy mirror serves the owner's 19:31 bytes
`d1e69c28`). npm-shaped import specifiers are preserved, so the future npm
flip is a root swap in two places only:

* `importEngine` in `src/worker/runners/arm-runner-base.ts`;
* the `resolve.alias` entries in `vite.config.js`.

**Never scatter deep relative imports to engine folders.** And **never apply
an engine change in place**: deliver it as a patch file (see
`patches/README-f4-hash.md` for the pattern) or as a branch/commit proposal
for the owner to merge.

## 7. Still open (keep honest)

* **W6300 boards** — proof in progress (lane `lane/net-6300`); no
  arduino-pico compile target yet.
* **W5500 INTn / GPIO21 interrupt path** — proof in progress; the proven
  W5500 cells are polling guests.
* **ESP32-CAM beyond WiFi** — no LAN, no HTTP.
* **v4 DNS via `setDNS` for static-IP guests** — proven on Pico W only.
* **ICMPv6 echo** — the ping6 guest targets a compiled-in peer
  (`fd00:4::64`); only `RA-OK` is asserted.
