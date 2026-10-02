# gapPico.md — pico-emu@1.0.3 integration gaps (owner fills in)

Probed 2026-10-02: `pico-emu@1.0.3` (`picoemu.wasm.js` Emscripten, `_picoemu_*` × ~90).
Verified live: init/step/load_uf2/load_elf/write_uart/read_uart/set_gpio/get_gpio_out/is_halted/set_clock,
2× Module instances isolated, hello_world.uf2 boots (37B UART), micropython_rp2040.uf2 REPL works
(`print(1+2)` → `3`).

## What the runner needs (OpenHW side implements)

- [ ] Decide UF2 source for Arduino sketches: arduino-pico core in compiler image?
      Dockerfile.compiler already installs `rp2040:rp2040` core — confirm it emits `.uf2`.
- [ ] Decide micropython UF2 distribution: bundle `micropython_rp2040.uf2` (~650K)
      in frontend `public/firmware/` or fetch from backend `/compile/pico/micropython-uf2`?
- [ ] Confirm ADC pin mapping GP26/27/28 + PWM slice mapping for runner GPIO bridge.
- [ ] Confirm 2nd UART (uart1) pins used by default Arduino Serial1 config.
- [ ] WiFi/BLE/Ethernet: deferred — `_wifi_enable/_bt_hci_enable/_w5500_*` stay unwired.

## Package gaps (needs package author or workaround)

- [ ] No TypeScript types: `main: picoemu.wasm.js` has no `.d.ts`. Runner uses
      `any`-typed dynamic import (fine), but confirm `_picoemu_*` names are stable API.
- [ ] Multi-instance: verified 2× `Module()` isolated. Threads build
      (`picoemu.wasm.threads.js`) untested — runner uses single-thread build only.
- [ ] `_picoemu_load_elf` exists but CLI only accepts `.uf2`. Confirm ELF load path
      works for arduino-pico `.elf` (runner probes: UF2 first, ELF fallback).
- [ ] No `.bin/.hex` support — arduino-cli must output `.uf2`/`.elf` (it does).

## Wiring checklist (runner implements, no gaps)

`_picoemu_init(arch)` → `_malloc` + `HEAPU8.set` + `_picoemu_load_uf2/_load_elf` →
`_picoemu_reset` → loop `_picoemu_step(n)` + drain `_picoemu_read_uart(0)` →
`_picoemu_write_uart(b)` RX, `_picoemu_set_gpio/_get_gpio_out` GPIO,
`_picoemu_is_halted` stop, `_picoemu_get_core_state` pc/sp.
