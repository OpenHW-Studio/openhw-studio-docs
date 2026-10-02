# gapStm32f1.md — stm32f1-emu@3.2.0 integration gaps (owner fills in)

Probed 2026-10-02: `stm32f1-emu@3.2.0` (`STM32F1` facade, `pkg/stm32f1.js` + `.d.ts`).
Verified live: 2× `STM32F1.create()` isolated, `execute/step/uartRx/uartOutput/
usart1.send/gpio.pin().read/setInput/on/readInput` all work.
Re-probed 2026-10-03: full 8-key CHIPS table (c8/cb/maple_mini/nucleo_f103rb/
rc/gd32c8/gd32cb/gd32rb) + facade `usart1/2/3` + `usart{1,2,3}` confirmed in
`pkg/stm32f1.js`; local `arduino-cli board details` confirms compile FQBNs
(GenF1 pnums incl. MAPLEMINI_F103CB, Nucleo_64/NUCLEO_F103RB, GENERIC_F103RCTX).

## What the runner needs (OpenHW side implements — DONE this change)

- [x] All 8 chips wired: 7 new shells (`openhw-stm32f103cb`,
      `openhw-stm32-maple-mini`, `openhw-stm32-nucleo-f103rb`,
      `openhw-stm32f103rc`, `openhw-stm32-gd32f103c8/cb/rb`) + existing
      `openhw-stm32-bluepill`, each with `chip` manifest attr, per-board FQBN
      (GenF1 pnums / Nucleo_64), `chip` opt passthrough + board-type-derived
      fallback, `execute.ts` routing for maple/nucleo/gd32 aliases.
- [x] Per-variant LEDs (c8/cb/rc/gd32→PC13, maple→PB1, nucleo→PA5) +
      USART2 (PA2/PA3 Nucleo ST-Link VCP) drains alongside USART1.
- [x] GD32 compile: NO arduino-core board entry for GD32 (probed `listall` —
      empty) → GD32 shells compile as the closest STM32F103 part (C8→
      BLUEPILL_F103C8, CB→BLUEPILL_F103CB, RB→GENERIC_F103RBTX); the runner
      still applies the GD32 IDCODE via the chip opt. Needs owner decision
      if a real GD32 core/board package should replace the alias.
- [ ] Confirm ADC pin mapping (PA0..PA7 → ADC1 ch0..7) for analog bridge.
- [ ] WiFi/BLE/Ethernet: N/A on F103 (no radio) — nothing deferred.

## Package gaps (needs package author or workaround)

- [ ] `.d.ts` says `SPI ch: 1..6`, implementation loops `1..3` — confirm real SPI count.
- [ ] `execute()` returns `{totalSteps, instCount, stopped}` (not the documented
      `{instCount, stopped}`) — runner reads `instCount ?? totalSteps`, confirm shape.
- [ ] Multi-instance: verified 2× `create()` isolated. `ws-server.mjs`/`serveGdb`
      single-firmware-per-process pattern — confirm no shared WASM heap across instances.
- [ ] No `.map`-based symbol debug wired yet (`setSymbols/resolveSymbol` exist,
      runner passes backend `map` artifact through — confirm format).

## Wiring checklist (runner implements, no gaps)

`STM32F1.fromBin/fromHex/fromELF` (auto-detect) → `usart1.onData` TX hook →
loop `execute(n)` → `usart1.send(str)`/`uartRx(byte)` RX, `gpio.pin('A'..'G', n).
on('change')/setInput/setAnalog` GPIO → `reset()`/`close()`.
USART2/3 + SPI/I2C/DMA/CAN/USB taps (`spi.injectMiso`, `i2c.injectRx`, `onExtiEdge`,
`onAdcDone`, `onTimUpdate`, ...) wired as component callbacks.
