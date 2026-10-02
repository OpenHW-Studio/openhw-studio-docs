# gapStm32f4.md — stm32f4-emu@1.5.0 integration gaps (owner fills in)

Probed 2026-10-02: `stm32f4-emu@1.5.0` (`STM32F4` facade via `index.mjs`, full `.d.ts`).
Verified live: 2× `STM32F4.create({})` isolated via package entry
(note: `site/stm32f4.js` direct import fails — `bindings` undefined —
must import via `index.mjs` which injects SVD + WASM).

## What the runner needs (OpenHW side implements)

- [ ] New board component needed: no `openhw-stm32f4` exists yet (only bluepill).
      Owner to confirm board choice: STM32F407 Discovery vs Nucleo-F401RE vs
      generic F407VE? Runner defaults `chip: 'stm32f407'`, attrs may override.
- [ ] Decide Arduino `.bin/.hex/.elf` source: STM32duino core covers F4?
      Confirm FQBN (e.g. `STMicroelectronics:stm32:GenF4`) + output format.
- [ ] Confirm UART1 pins for chosen board (PA9 TX / PA10 RX typical) + LED pin
      (PD12–PD15 on Discovery, PA5 on Nucleo) for GPIO/pin-watch bridge.
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
