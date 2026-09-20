# Write a WASM component

Rule: JS stays first-class; WASM is opt-in for heavy parts (§4/§12.4).
Most components are I/O-bound, not compute-bound — only port when the
component's own `update()` cost dominates (bench via sim-monitor
`lastComponentUpdateMs`).

## Good candidates

Self-contained + typed-array friendly: MAX30102 (PPG/FIFO), SSD1306
(small VRAM, validates the display-descriptor path), ILI9341 (large VRAM),
SD-card (block counters), radios (frame CRC, state machines).

Bad candidates: pushbutton, LED, resistor, gates (JS ~ns; boundary dominates).
LED ships a pure-JS smoke core only (proves dispatch, no `.wasm`).

## Scaffold

```sh
node scripts/new-component.mjs --type openhw-foo --runtime wasm \
  --pins VCC,GND,SDA,SCL --slotKind 4 --fields f0:value,i0:enabled
```

Emits: `manifest.json` (+`sab`/`ui`/`sim`/`wasm` keys), `logic.ts`
(`WasmComponent` subclass + REQUIRED slow-but-correct JS reference),
`glue.ts` (loader), `core-rs/` (Rust crate stub, C ABI), `index.ts`
(declarative), `validation.ts` (shim).

## Implement the core

1. Fill `core-rs/src/lib.rs`: state struct + `create/destroy/update/...`
   `extern "C"` fns. Pins+state via SAB views, no JSON.
   Cycles only — never `Date.now()` (enforced: no `js_sys::Date`).
2. Build: `wasm-pack build core-rs --target web --out-dir ../core`
   (same toolchain as the grading engine; `vite-plugin-wasm` +
   `assetsInclude: ['**/*.wasm']` already configured).
3. Wire `glue.ts`: dynamic `import('./core/<name>.js')` + `?url` wasm,
   ABI gate vs `WASM_ABI_VERSION`, return bound `WasmCore` or null.
4. `logic.ts`: `setGlueLoader(...)` in ctor; `fallbackUpdate()` = existing
   tick renamed (bus machines stay JS for pilots); `uiState()` unchanged.
5. `manifest.json`: `sim.runtime: 'wasm'` + `wasm: { abi: 1, file,
   exports[], fallback: 'js' }`.

## Contracts

- `index.ts` stays import-safe (no fs/process) — grading imports logic
  without instantiating WASM (same `LOGIC_REGISTRY`, no fork).
- `WasmComponent` dispatch: core `update()` per tick, `pullWasmState()`
  refreshes the cached mirror only on diff; failure → JS fallback, never break.
- ABI: `manifest.wasm.abi` vs worker capability at START; mismatch = JS.
- Bench gate: ≥2x on the component's own update cost with flat board-loop
  cost before flipping `sim.runtime` to `'wasm'` (keep `'js'` until then).
