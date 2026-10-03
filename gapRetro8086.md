# gapRetro8086.md — 8086emu@1.5.1 integration gaps (owner fills in)

Probed 2026-10-03: `8086emu@1.5.1` (wasm-bindgen `Emulator` class, single
`multi_cpu_emu_bg.wasm` ~575K, zero-dep). Verified live in Node:
6/6 ISAs construct (`8086/8085/8051/6502/Z80/rv32`), hello programs
assemble via in-WASM `assemble()`, `run()` executes, `out()` drains the
expected text (8085/Z80 immediate; 8086 text offset-padded — drain trims it).
`snapshot()/restore()/set_pc()/reset()` verified round-trip.
Full API surface: `/home/danish1075/Documents/8086/8086api.md` (source repo,
same version).

## What the runner needs (OpenHW side implements — DONE this change)

- [x] 7 board shells (`openhw-8086/8088/8085/8051/6502/z80/rv32`, 15px pitch,
      `isa` manifest attr, console TX/RX dots) + `RetroRunner` + `execute.ts`
      routing + `retro:*` FQBNs + backend `retro` registry entry (asm
      passthrough, no compiler call) + `.asm` default files/templates.
- [x] Vendored glue + wasm (`public/vendor/board-engines/8086emu/`,
      `public/wasm/multi_cpu_emu_bg.wasm`); `initSync({module})` worker
      pattern (same class of fix as pico-emu glue).
- [x] Console contract per ISA (INT 21h / OUT 01h / SBUF / STA $01 /
      OUT (01h) / ECALL → single `out()` drain); RX inject
      (`push_key` / `serial_rx` / SID / `usart_rx`).

## Package gaps (needs package author or workaround)

- [ ] No TypeScript subpath types beyond `multi_cpu_emu.d.ts` root (fine —
      runner uses `any`-typed dynamic import, like pico-emu).
- [ ] `cycles()` returns 0 on 6502/Z80/rv32 (T-states only counted on
      8086/8085/8051) — sim-time falls back to wall clock there.
- [ ] Multi-instance isolation assumed from facade shape (one `Emulator`
      per runner); not yet stress-proven with 6 concurrent boards the way
      pico 2×Module was. Owner: run the 6-board soak if this matters.
- [ ] 8086 `out()` drain includes leading NUL padding before the real text
      (observed live) — runner trims ASCII NULs; confirm stable across builds.
- [ ] rv32 ECALL semihosting verified at API level only (a7=64/93); no
      end-to-end rv32 hello run yet — owner to confirm with a real program.

## Wiring checklist (runner implements, no gaps)

`initSync({module})` → `new Emulator(isa)` → `assemble(src)` →
`load(code, origin)` → loop `run(budget)` + drain `out()` →
`push_key`/`serial_rx`/`set_sid`/`usart_rx` RX, `port_write`/`port_read`
GPIO kit, `pc()` debug → `reset()`/`free()`.
Inter-board UART rides the standard `routeUartByte` path (TX/RX aliases).
WiFi/BLE/Ethernet: N/A (pre-network era) — nothing deferred.
