# TS vs WASM components — which to write, how, and why

Rule (§4/§12.4): **JS stays first-class; WASM is opt-in for heavy parts.**
Most components are I/O-bound, not compute-bound. Port only when the
component's own `update()` cost dominates — bench via the sim monitor
(`lastComponentUpdateMs`). The bench gate is **≥2x on the component's own
update cost with flat board-loop cost** before flipping `sim.runtime` to
`'wasm'` (keep `'js'` until then).

## 1. At a glance

| | TS component (default, ~95% of parts) | WASM component (opt-in: heavy only) |
|---|---|---|
| Base class | `BaseComponent`, or a `*Protocol` for bus parts (`SPIProtocol`, `I2CProtocol`, `UARTProtocol`, `PWMProtocol`, `OneWireProtocol`, `I2SProtocol`, `PulseProtocol`, `TwoWireProtocol`, `DigitalProtocol`, `AnalogProtocol`, `NeoPixelProtocol`) | `WasmComponent` **directly** + an owned `*BusFramer` (composition — never a protocol base class; see §4) |
| Sim code | `update()` + bus hooks in `logic.ts` | `fallbackUpdate()` (REQUIRED slow-but-correct JS reference) + `afterWasmUpdate()` housekeeping + batched core calls; hot compute in `core-rs/` (Rust, C ABI) |
| Loader | none | `glue.ts` (separate file): dynamic `import('./core/<name>.js')` + `?url` wasm, ABI gate, returns bound `WasmCore` or `null` |
| Manifest | `sim: { runtime: 'js', validation: 'inline' }` | `sim: { runtime: 'wasm', ... }` + `wasm: { abi: 1, file, exports[], fallback: 'js' }` |
| Perf | JIT'd JS, zero boundary cost | ≥2x on heavy kernels (measured ILI9341: DMA 7.7x, fill 6.0x, CRC 3.0x), ~25ns idle gate, zero overhead when idle-gated |
| Failure mode | n/a | **always falls back to JS** (no core, ABI mismatch, throw) — simulation never breaks |

Good WASM candidates (self-contained + typed-array friendly): MAX30102
(PPG/FIFO), SSD1306 (descriptor path), ILI9341 (large VRAM), SD-card
(block counters), radios (frame CRC, state machines).
Bad candidates: pushbutton, LED, resistor, gates (JS ~ns; the ~25ns
boundary would dominate). LED ships a pure-JS smoke core only (proves
dispatch, no `.wasm`).

## 2. Creating a TS component

```sh
node scripts/new-component.mjs --type openhw-foo-sensor --runtime js \
  --pins VCC,GND,SDA,SCL --group Sensors --w 80 --h 60
```

Emits: `manifest.json` (+`sab`/`ui`/`sim` keys), `logic.ts`
(`extends BaseComponent` **or** the matching `*Protocol` — e.g.
`extends I2CProtocol` for an I2C sensor), `<name>.svg`,
`index.ts` (declarative registry record), `validation.ts` (shim).

`logic.ts` owns THREE things: sim (`update()` + bus hooks),
`validate(component, graph)`, and `uiState()` (SAB slot fields matching
`manifest.sab.fields`). Keep the tick allocation-free: no JSON/`Date` in
`update()` — `cpuCycles` is the ONLY clock.

## 3. Creating a WASM component

```sh
node scripts/new-component.mjs --type openhw-bar-display --runtime wasm \
  --protocol spi --pins VCC,GND,CS,DC,MOSI,SCK --group Displays \
  --slotKind 3 --fields f0:brightness,i0:enabled
```

`--protocol` (`spi|i2c|uart|pwm|onewire|i2s|pulse|twowire|digital|analog|
neopixel|none`) selects the composed `*BusFramer` + `route*()` wiring in
`logic.ts`. Emits everything the JS flavor emits, plus `glue.ts`,
`core-rs/` (Rust crate stub, C ABI), and `wasm.*` keys in the manifest.

Then:

1. Fill `core-rs/src/lib.rs`: state struct + `create/destroy/update/...`
   `extern "C"` fns. Pins+state via SAB views, no JSON. Cycles only —
   never `Date.now()`.
2. Build: `wasm-pack build core-rs --target web --out-dir ../core`
   (same toolchain as the grading engine; `vite-plugin-wasm` +
   `assetsInclude: ['**/*.wasm']` already configured).
3. Wire `glue.ts`: dynamic `import('./core/<name>.js')` + `?url` wasm,
   ABI gate vs `WASM_ABI_VERSION`, return the bound `WasmCore` (batched
   methods like `ramwrBlit/dmaBlit` do ONE crossing per frame) or `null`.
4. `logic.ts`: `setGlueLoader(...)` in ctor; `fallbackUpdate()` = the
   existing tick renamed; `afterWasmUpdate()` = cheap mirror/sync only;
   bus events decode in TS and route via `route*()`; `uiState()` unchanged.
5. `manifest.json`: `sim.runtime: 'wasm'` + `wasm: { abi: 1, file,
   exports[], fallback: 'js' }` — `exports[]` MUST list every bound fn
   (including the `on_<bus>` hook you use).

Contracts: `index.ts` stays import-safe (no fs/process) — grading imports
logic without instantiating WASM (same `LOGIC_REGISTRY`, no fork).
`WasmComponent` dispatch runs core `update()` per tick (or skips it via
`shouldRunWasmUpdate()` when idle), `pullWasmState()` refreshes the cached
mirror only on diff; any failure → JS fallback, never break. ABI:
`manifest.wasm.abi` vs worker capability at START; mismatch = JS.

## 4. Architecture rule: composition, not protocol inheritance, on the WASM path

A WASM-heavy component MUST extend `WasmComponent` **directly** and own a
`*BusFramer` (`SpiBusFramer`, `I2cBusFramer`, `UartBusFramer`,
`PwmBusFramer`, `OneWireBusFramer`, `I2sBusFramer`, `PulseBusFramer`,
`TwoWireBusFramer`, `DigitalBusFramer`, `AnalogBusFramer`,
`NeoPixelBusFramer` — all in `src/protocol-handlers/`).

The under-designed alternative — `class XLogic extends SPIProtocol
extends WasmComponent` — stacks TWO dispatch owners over the same runner
events: the protocol base (CS/frame engine, its own `_frame`/`_csActive`)
AND the WASM adapter (guarded `onPin`/`onSPIByte` routing). Bytes get
counted twice and CS edges can run the core AND the JS reference on the
same tick. Composition (framer as a field: pure framing, no
update()/WASM knowledge) gives exactly ONE owner per event:

- runner → `onSPIByte()/onPinStateChange()` (component, once) →
  framer → private decode → JS reference and/or core batch call.
- `*Protocol` base classes stay pure-TS for the ~30 bus components that
  never touch WASM (zero involvement, zero overhead).
- Shared statics (`TwoWireBusFramer.clockByte`,
  `DigitalBusFramer.checkEdge`, `AnalogBusFramer.average/adc`,
  `I2SProtocol.normalizeSample`, `NeoPixelBusFramer.packPixels/
  clockEdge`) keep the protocol base and the framer bit-identical, so
  JS and WASM paths can never drift.

`WasmComponent` exposes one guarded `route*()` per family
(`routeSPIByte`, `routeI2CByte`, `routeUARTByte`, `routePWM`,
`routeOneWire`, `routeI2SFrame`, `routePulse`, `routeTwoWire`,
`routeDigitalEdge`, `routeAnalog`, `routeNeoPixel` — plus `onPin`
dispatch and `callCore()`), all funneling through a single failure point
that self-heals to the JS reference. Live examples: ILI9341
(`SpiBusFramer` + `ramwrBlit/dmaBlit`), SSD1306 (`I2cBusFramer`),
SD-card (`SpiBusFramer`, full-duplex MISO), MAX30102 (`WasmComponent`
direct, DSP core).

## 5. Benefits vs disadvantages

Benefits of WASM (when the gate passes):

- 4–8x on tight numeric loops over typed arrays (no JIT warmup cliffs,
  no GC pauses in the kernel); one boundary crossing per frame/batch
  amortizes the ~25ns call cost to noise.
- Deterministic `update(handle, cycles)` core — same codegen in every
  browser; cycles-only (no `Date`) keeps replay/pause intact.
- Idle gating (`shouldRunWasmUpdate()`) makes the steady state cheaper
  than the JS equivalent (a polled display costs ~0 when clean).

Disadvantages (why most components stay TS):

- Boundary + toolchain tax: every crossing costs ~25ns; `.wasm` build
  (`wasm-pack`), ABI handshake, and `exports[]` bookkeeping are real
  maintenance. Small components get SLOWER, not faster.
- Two implementations to keep in parity (Rust kernel + JS reference) —
  every new bus quirk must land in both, with parity tests to prove it.
- Debugging is harder (wasm stack traces, linear-memory views) and the
  JS fallback must still be maintained forever (non-isolated contexts,
  load failure, grading without WASM).
- Framer duplication risk: shared statics mitigate it, but a protocol
  change still needs the base AND the framer updated together.
