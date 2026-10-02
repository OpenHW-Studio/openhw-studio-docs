# gapStm32f4.md — stm32f4-emu@1.5.0 integration gaps (owner fills in)

Probed 2026-10-02: `stm32f4-emu@1.5.0` (`STM32F4` facade via `index.mjs`, full `.d.ts`).
Verified live: 2× `STM32F4.create({})` isolated via package entry
(note: `site/stm32f4.js` direct import fails — `bindings` undefined —
must import via `index.mjs` which injects SVD + WASM).

## What the runner needs (OpenHW side implements — DONE this change)

- [x] All 5 chips wired: 4 new shells (`openhw-stm32f401`, `openhw-stm32f411`,
      `openhw-stm32f407ve`, `openhw-stm32f429`) + existing `openhw-stm32f4`
      (F407 Discovery default), each with `chip` manifest attr, per-board FQBN
      (GenF4 BLACKPILL_F401CE/F411CE, BLACK_F407VE, Disco DISCO_F429ZI —
      probed via `arduino-cli board details`), `chip` opt passthrough +
      board-type-derived fallback, `execute.ts` routing for 401/411/429 aliases.
- [x] Per-chip LEDs follow the package BOARD_LED map (401/411→PC13,
      407→PD12, 407ve→PA6, 429→PG13 incl. explicit G-bank watch).
- [x] Per-chip SVD vendored under
      `public/vendor/board-engines/stm32f4-emu/site/vendor/` (401/407/411/429;
      407ve shares the 407 SVD); runner fetches per-chip with F407 fallback.
- [ ] WiFi/BLE/Ethernet: deferred — `ethInject`, `usb*`, `canInject` stay unwired.

## Package gaps (needs package author or workaround)

- [ ] Import path: `site/stm32f4.js` cannot be imported directly (throws on
      `bindings`). Package entry `index.mjs` works. Runner dynamic-imports the
      package entry — confirm this stays the supported path (browser/WW build?).
- [ ] TX is a single shared model buffer — only `usart1.onData/output` fire
      (per `.d.ts` header). Runner routes uart0→usart1 only; uart1+ need package
      support or a second buffer.
- [ ] 5-chip table (F401/F411/F407/F407VE/F429): runner passes `chip` opt through;
      confirm per-chip USART/GPIO layouts for pin bridge (currently F407 map).
- [ ] No `stepCycles`-style cycle counter exposed on facade (`execute(n)` takes
      instruction budget; `instCount` returned) — runner treats instCount as cycles.

## Wiring checklist (runner implements, no gaps)

`STM32F4.create({chip})` / `fromBin/fromHex/fromELF` → `usart1.onData` TX hook →
loop `execute(n)` → `usart1.send(str)`/`uartRx(byte)` RX, `gpio.pin(port, n).
on('change')/setInput/setAnalog` GPIO → `reset()`/`close()`.
SPI/I2C/DMA/Display/CAN/USB taps mirror the F1 runner.
