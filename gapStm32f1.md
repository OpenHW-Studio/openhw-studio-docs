# gapStm32f1.md — stm32f1-emu@3.2.0 integration gaps (owner fills in)

Probed 2026-10-02: `stm32f1-emu@3.2.0` (`STM32F1` facade, `pkg/stm32f1.js` + `.d.ts`).
Verified live: 2× `STM32F1.create()` isolated, `execute/step/uartRx/uartOutput/
usart1.send/gpio.pin().read/setInput/on/readInput` all work.

## What the runner needs (OpenHW side implements)

- [ ] Decide Arduino `.bin/.hex/.elf` source: STM32duino core in compiler image?
      Dockerfile.compiler currently installs only `arduino:avr` + `rp2040:rp2040`.
      Add STM32 core (e.g. `STMicroelectronics:stm32`) + confirm output format
      (runner accepts bin + hex-string + ELF magic — whichever the core emits).
- [ ] Confirm Blue Pill UART1 pins (PA9 TX / PA10 RX) + LED pin (PC13) mapping
      for runner GPIO/pin-watch bridge.
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
