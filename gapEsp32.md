# gapEsp32.md — esp32-emu@1.1.0 integration gaps (owner fills in)

Probed 2026-10-02: `esp32-emu@1.1.0` (`SimulatorWorker`, `dist/index.js` + `.d.ts`).
Verified live: 2× `SimulatorWorker.init()` isolated, `pollUart/setPinInput/sendUart/
step/terminate/pressResetButton` all functions.

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
- [ ] WiFi/BLE/Ethernet: deferred — `wifi` config, `getWifiStats/getPcapData`,
      `sendTwaiFrame` stay unwired. Network Worker port hooks later.

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

`new SimulatorWorker()` + `_onUART` → `init('ESP32', {flashSizeMB, mmuPages:64,
strapValue:0x13, budget}, flash)` → `run()` + timer `pollUart()` → `sendUart(str)`/
`setPinInput(pin, level)` → `pressResetButton()` reset, `terminate()` stop,
`readMemory/readMmio` debug, `step(n)` optional budget mode.
