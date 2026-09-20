# AGENT_LOOP — the local verify loop (for agents with repo + browser access)

Scope: LOCAL dev only (not deployed). You have the code AND the website
(`http://localhost:5173/simulator`), so you never guess — you build the
circuit, write the board code, run it, and read serial + pins + TELEMETRY
to decide pass/fail. Telemetry (board + component info) is the debugging
signal: it tells you WHY something failed, not just THAT it failed.

## 0. Boot (every session, in order)

1. Backend: `cd openhw-studio-backend && node src/server.js &` — wait for
   `OpenHW Studio Backend running on port 5000`
   (check: `curl -m 5 http://127.0.0.1:5000/api/public/maintenance-status` → 200).
   Without it the app gates on "maintenance mode" (blank `<main>` — looks
   like a React crash but isn't; check backend FIRST when `<main>` is empty).
2. Frontend: `cd OpenHW-studio-frontend && npx vite --port 5173 --host 127.0.0.1` —
   use `http://localhost:5173/` in scripts (vite binds `[::1]:5173`, so
   `127.0.0.1:5173` returns 000; always `localhost`).
3. arduino-cli lives at `~/bin/arduino-cli` (NOT on PATH); AVR core
   `arduino:avr@1.8.8` is installed. Real compile works:
   `POST /api/compile { fqbn: arduino:avr:uno }` returns hex.

## 1. The one-call loop: `window.OpenHWE2E` (ALWAYS mounted, no flags)

Open `http://localhost:5173/simulator`, then in `page.evaluate`:

```js
// 1. Setup: circuit + board code in ONE call (replaces canvas state).
await page.evaluate(({ components, wires, code }) =>
  window.OpenHWE2E.setupCircuit({ components, wires, code }),
  { components, wires, code });
// Minimal blink circuit: UNO + LED + resistor + wires UNO:13→resistor→LED→GND.
// Components: [{ id, type, attrs, x, y }], wires: [{ from: 'id:pin', to: 'id:pin' }].
// Code: full Arduino sketch string (goes to the editor, compiled at Run).

// 2. Run + verify: runs the sim, captures serial + pins + TELEMETRY, verdict.
const verdict = await page.evaluate(() =>
  window.OpenHWE2E.run({
    forMs: 8000,                       // wall time to let it run
    selectTelemetry: ['led1'],         // component IDs to watch (telemetry filter)
    serialNeedle: 'READY',             // required serial substring (optional)
    telemetryMode: 'detail',           // detail | delta | simple
  }));
// verdict = { ok, pass, reasons[], wallMs, running, serial (4k cap),
//   serialLines, pins {boardId: {...}}, telemetry [...50], telemetryCount }

// 3. Anytime snapshot (no run needed): canvas + serial + pins + telemetry.
const snap = await page.evaluate(() => window.OpenHWE2E.snapshot());

// 4. Stop.
await page.evaluate(() => window.OpenHWE2E.stop());
```

Pass rule inside `run()`: serial non-empty AND `serialNeedle` found (when
given). `reasons[]` tells you which failed. Telemetry/pins are ALWAYS
captured regardless of pass — that is the point (see §2).

## 2. Debugging with telemetry (the required signal)

`verdict.telemetry` is an array of formatted entries from
`window.OpenHWTelemetry.getLatestTelemetry()` (same data the human console
shows): `{ id, type, summary, details, status }` per SELECTED component.
`verdict.pins` is `{ boardId: { pin: bool|voltage } }` live pin state.
`verdict.serial` is raw monitor text (4k cap; `serialLines` = new row count).

Diagnosis order (do this, in this order, every failure):

1. `reasons[]` — what failed (no serial? needle missing?).
2. `telemetry` — per-component `summary`/`status`/`details`: wrong
   brightness/angle, error/warn status, heuristic messages. Select the
   suspect with `selectTelemetry: [...]` and re-run — unselected components
   cost nothing (pre-read filter) and are ABSENT from telemetry, so a missing
   entry means "not selected", not "not simulating".
3. `pins` — is the board pin actually driving? If telemetry says the LED
   should be lit but pins show `13: false`, the fault is wiring/firmware,
   not the component.
4. `serial` — firmware-level evidence (`READY`, sensor prints, errors).
5. Fix ONE thing (wiring, code, or component source), re-run `run()`,
   compare telemetry before/after. Never change two things between runs.

Telemetry modes: `detail` (full params, default), `delta` (only changes —
keeps the console clean), `simple` (summary only). The harness sets
`detail` unless you pass `telemetryMode`.

## 3. MCP path (optional, same loop through the relay)

When driving from outside the browser (opencode agent), the same loop is
available as MCP tools via the localhost relay — no backend, no deploy:

1. `cd openhw-studio-agent-relay && npm i && npm run build && npm run start`
   → `ws listening 127.0.0.1:8765, bridge connected: true`.
2. Register in opencode MCP config (stdio spawn):
   `{ "openhw-agent": { "command": "node",
   "args": ["../openhw-studio-agent-relay/dist/index.js"],
   "env": { "OPENHW_AGENT_ROOM": "dev1" } } }`.
3. Open `http://localhost:5173/simulator?agent=1` (same laptop) → panel dot
   green, console `bridge/hello acked room=dev1`.
4. Tools (same names as the contract in `src/agent/tools.schema.ts`):
   canvas `place/move/delete/setAttr/wire/unwire/getProject/validateCircuit`,
   source `readComponent/reloadComponents`, run
   `setFirmware/run/stop/interact/serialInput`, verify
   `startCapture/getTrace/assert/snapshot`, status `bridgeStatus`.
5. Bridge offline (tab closed) → `{ ok:false, code:'bridge-offline' }` in
   <1 s; reopen the URL → auto-rejoin, no relay restart.
6. File edits need NO MCP — the agent has repo access and edits
   `openhw-studio-emulator/src/components/<type>/…` directly, then
   `agent.reloadComponents({ types })` (fail fast: manifest/pin/contract
   check with file+line).

Spec files that pin this loop: `tests/e2e/sab-all-phases.spec.js`
(P1–P11), `tests/e2e/sab-reader.spec.js`, `tests/e2e/agent-relay.spec.js`
(WS hello/ack; skips cleanly when the relay is down).

## 4. Gotchas (learned the hard way)

- `127.0.0.1:5173` REFUSES (vite on `[::1]`); use `localhost:5173`.
- No backend → maintenance gate → blank `<main>` (not a React crash).
- Right panel starts CLOSED on fresh profiles; serial tab/plotter buttons
  don't exist until opened via Show-panel toggle.
- Import confirm-gate fires when canvas non-empty; fresh headless profile
  is empty so it's silent — reuse of a profile triggers `window.confirm`.
- `vite build` rewrites `public/version.json` every time — always
  `git checkout -- public/version.json` before committing.
- Telemetry only flows for SELECTED components; empty `telemetry[]` with a
  running sim almost always means `selectTelemetry` missed the IDs.
- Headless Playwright numbers are relative — compare before/after on the
  same machine, never against absolute 60 fps claims.
- Pre-existing console noise (NOT ours, do not chase): `Wokwi7SegmentUI`
  unique-key warning + 404s for `installed-libraries` on minimal stubs.
