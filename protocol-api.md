# Component Signal API (stable ABI — Phase 1 freeze)

Source of truth: `OpenHW-studio-frontend/src/worker/registries/component-registry.ts`
(`ComponentSignalAPI`, ~line 510). This doc freezes the method names and
call shapes both JS (`BaseComponent` subclasses) and WASM (`WasmComponent`
cores via `glue.ts`) implement. Runners call `inst.update(...)` unchanged
for either runtime.

## Update (hot path — batched, never per-instruction)

```ts
update(cpuCycles: number, wires: Wire[], instances: Map<string, BaseComponent> | BaseComponent[]): void
```

- Called once per component per CPU chunk (≈32k cycles AVR / 250k RP2040),
  NOT per instruction (§5: per-instruction WASM calls would cost ~100-300ns
  each at 16MHz — FATAL).
- `cpuCycles` is the ONLY clock (never `Date.now()` in tick).
- `instances` may be a `Map` (fast path) or `Array` (legacy) — use
  `this.findInstance(instances, id)` for O(1)-when-Map lookup.
- Components PUBLISH numerics to SAB via `uiState()`; they never TALK
  through SAB (intra-worker traffic stays direct calls).

## Numeric state (SAB river)

```ts
uiState(): { f?: Record<string, number>; i?: Record<string, number> }
validate(component: any, graph: Map<string, string[]>, validator?: any): unknown
```

- `uiState()` keys MUST match `manifest.json → sab.fields`
  (`f0/f1/...` numeric, `i0/i1/...` boolean-as-0/1). Runners write slots
  from this — no `getSyncState` spreads, no JSON in tick.
- `validate()` ports the original `validation.ts` check bodies verbatim
  (graph-first, `validator?.` fallback inside). `validation.ts` remains as
  a delegating shim so `FullCircuitValidator` keeps working unchanged.

## Signal callbacks (all optional — implement only what you handle)

GPIO: `setState({voltage?, digital?, value?})`, `onVoltageChange(pinId, voltage)`,
`onPinStateChange(pinId, isHigh, cpuCycles)` (edge-coalesced by runners).
Analog/DAC: `onAnalogVoltage(pinId, voltage)`.
PWM: `onPwmDuty(pinId, duty01)`, `onPWM(pinId, payload)`, `onPWMSignal(pinId, freqHz, duty, pulseUs)`.
Tone: `onTone(pin, frequency, duration)` (0 = noTone).
I2C: `onI2CWrite(addr, data[])`, `onI2CRead(addr, qty)`,
legacy aliases `onI2CStart/onI2CByte/onI2CStop/onI2CReadByte/readByte`.
SPI: `onSPIByte(byte) → MISO byte`, `onSPIBuffer(frame)`.
UART: `onUartByte(byte)`, serial via `serialRx(str)` on runners.
1-Wire: `onOneWireWriteBit/onOneWireSlot`, `onOnewireWriteBit/onOnewireSlot`.
I2S/PIO/CAN: `onI2SFrame`, `onPIO`, `onCanFrame`.
UI events: `onEvent(event)` (`press`/`release`/`set_1`/sliders/...).
Physics: `getConductance()`, `getMnaPins()`, `getMnaStamps()`.
Telemetry (gated, never in tick): `onCustomTelemetry()`, `getSyncState()`,
`getRawMetrics/getDeltaMetrics/getTelemetrySummary/getTelemetryData`.

## WASM mapping (same ABI, one call per update)

`WasmComponent extends BaseComponent` keeps every call site unchanged.
Per placement: `create() → handle u32`; per tick: `update(handle, cycles)`;
pins: `on_pin(handle, pinIdx u32, high, cycles)` (ids→u32 once at create);
state: `get_state_ptr(handle)` → 12B block `f32[2]+i32[1]`, pulled into the
cached JS mirror only on diff (`pullWasmState`). Bus machines (I2C
registers/FIFO) stay in JS for the pilot; the core owns DSP numerics.
`manifest.wasm = { abi: 1, file, exports[], fallback: 'js' }`;
`sim.runtime: 'js' | 'wasm'`; mismatch/absence → JS reference (never break).

## Versioning

- `manifest.wasm.abi` vs `WASM_ABI_VERSION` (`WasmComponent.ts`) — mismatch
  logs a warning and uses JS.
- SAB layout: `SAB_LAYOUT_VERSION` (`worker/sab/layout.ts`) handshake at
  START; mismatch = clean error.
- `AGENT_TOOLS_VERSION` (`src/agent/tools.schema.ts` ↔ relay `schema.ts`).
