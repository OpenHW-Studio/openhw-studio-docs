# gapStm32f4.md — stm32f4-emu integration gaps (owner fills in)

Probed 2026-10-02: `stm32f4-emu@1.5.0` (`STM32F4` facade via `index.mjs`, full `.d.ts`).
Verified live: 2× `STM32F4.create({})` isolated via package entry
(note: `site/stm32f4.js` direct import fails — `bindings` undefined —
must import via `index.mjs` which injects SVD + WASM).

**Updated 2026-10-20** — three stale claims in this file were wrong and are
now corrected: (a) "Ethernet deferred" is false, the on-chip MAC is proven
against the unified gateway; (b) "IWDG/HASH unproven" is false, both are
honest and green; (c) the `tickMHz` pace claim was retracted — the divider is
**not** inert.

Engine bytes: F4 still runs the **npm pair** (`stm32f4-emu`) — the owner's
local folder is mid-rebuild and its glue/wasm differ from npm by hundreds of
lines, so folder-first is suspended for F4 only (`resolve.alias` in
`OpenHW-studio-frontend/vite.config.js`, "STM32F4: folder-first SUSPENDED
2026-10-15"). **The engine repos are READ-ONLY for us** — engine changes are
delivered as patch files under `patches/` in the frontend repo, never applied
in place.

## PROVEN (live e2e cells, all green)

Ethernet — the on-chip MAC rides the **unified gateway**
(`openhw-unified-gateway`, Go) at `ws://127.0.0.1:5030/api/network-gateway`:

| What | Cell | Evidence |
|---|---|---|
| F407 bare-metal DHCP DORA through the gateway | `tests/e2e/stm32f4-eth-gateway.spec.js` | `DHCP Offer: IP=192.168.x` (the owner's `eth_dhcp.bin`) |
| F407VE — same port on the sibling die | `tests/e2e/stm32f4-eth-gateway-ve.spec.js` | `DHCP Offer: IP=192.168.x` |
| F429 — needs its own `_f429` build | `tests/e2e/stm32f4-eth-gateway-429.spec.js` | `DHCP Offer: IP=192.168.x` |
| F407 HTTP client through the gateway NAT | `tests/e2e/stm32f4-http-gateway.spec.js` | `TCP connected` + `HTTP/1.1 200 OK` (the owner's `eth_http.bin`; polling firmware, no `ethIrq`) |

F4 runner net path: **create-time `onTx`** taps the MAC's TX frames, RX goes
in through **`ethInject`**, and **`ethSetLink(true)`** is driven at boot so
BMSR/PHYSTS report carrier (silicon: external PHY). `irq_eth` is an
**opt-in** asset (`withAssets.irq_eth = true`) for firmware that waits on the
ETH interrupt; the polling HTTP image must NOT set it.

System cells — now honest and green (md@4756774c, 16/16 over F407/407VE/429):

| What | Cell | Evidence |
|---|---|---|
| IWDG armed/reloaded while petted, then fires when petting stops | `tests/e2e/stm32f4-sys.spec.js` | "IWDG stays alive while it is petted" + "IWDG fires after peting stops" — asserted in **guest-time units**, so host-throughput independent |
| HASH computes standard digests | `tests/e2e/stm32f4-sys.spec.js` | "HASH computes standard SHA-256 and SHA-1 digests" — FIPS 180-4 vector for SHA-256(""), plus SHA-256("abcd") and SHA-1("abcd") against `sha256sum`/`sha1sum` |
| Pace / clock honesty | `tests/e2e/stm32f4-clock.spec.js`, `tests/e2e/stm32f4-pace.spec.js` | the guest-time facts: consecutive prints exactly one `delay(2000)` apart (50/50 sample pairs exactly +2000 guest-ms) |

Also wired with green cells: USB CDC (`stm32f4-usb.spec.js`,
`stm32f4-usb-ve.spec.js` — `usbInjectSetup` / `usbInjectOut`) and bxCAN
(`stm32f4-can.spec.js`, `stm32f4-can-x.spec.js` — the engine's own
silent-loopback model; `canInject` exists on the facade but is NOT wired by
the runner).

### Two corrections to the record

1. **The `tickMHz` divider is NOT inert.** The old "PROVEN INERT" claim came
   from a *step-counted* pace pill, which was divider-independent by
   construction — it could never have shown the truth. Measurement:
   `div=7` → **489..1267 guest-ms/wall-s**, `div=1` → **106..158**, i.e. the
   divider really does accelerate the guest clock (4.4×..8.0×). The pace
   cell now asserts the clock fact in the sketch's own guest-time unit
   (exact +2000 guest-ms steps) and only *logs* the host coverage.
2. **A real runner bug was found and fixed**: the `tickMHz` write receipt was
   emitted on a **private serial source** (`'f4clk'`), which flipped the
   page's serial arbitration (one source per board per 240 ms) and silently
   dropped the board's own output. The receipt is now emitted on the board's
   own source `'uart0'` (md@4756774c).

## STILL OPEN (engine-side, delivered as patches)

Four HASH deviations remain in the engine. They are **not** silently worked
around — the patch is delivered in the frontend repo for the engine owner:

1. **`HASH_CR.INIT` is modelled at bit 0; RM0090 puts it at bit 2.** Silicon
   firmware does `HASH_CR = HASH_CR | HASH_INIT` (0x4); the model only reacts
   to bit 0, so the message buffer is not cleared and the digest covers the
   concatenation of the old and the new message.
2. **`HASH_SR` writes SET `DINIS`/`DCIS`; on silicon they are rc_w1** (write
   1 clears). Firmware that acknowledges a flag re-asserts it and can never
   leave the completion path.
3. **The SHA-256 digest is mirrored into `HR0..HR3` only**, so the main
   bank's `HR4` (`0x5006041C`) reads 0 instead of digest word 4.
4. **The HASH completion interrupt is never raised**: `check_interrupt()`
   tests `sr & 0x08` (BUSY) and `cr & 0x20` (a `HASH_CR` bit that does not
   exist) instead of `HASH_IMR.DCIE` (bit 1) and `HASH_SR.DCIS`.

**Where the patches are** (frontend repo, branch `lane/docs-hooks`):

- `patches/README-f4-hash.md` — the full write-up, the measured register map,
  the verified digests, and the apply/rebuild steps.
- `patches/f4-hash-silicon-fixes.patch` — deviations 1–3.
- `patches/f4-hash-completion-interrupt.patch` — deviation 4 (separate
  because it changes interrupt behaviour and no cell depends on it).

Measured against the **deployed** bytes: glue
`public/vendor/board-engines/stm32f4-emu/site/vendor/stm32_periph_wasm.js`
md5 `19a9630`, wasm `public/wasm/stm32_periph_wasm_bg.wasm` md5 `9455e31c`.
(The owner folder's wasm is a third, dirty build — **do not mix them**.)

Also open:

- **IWDG timing model** (no change requested, but the cell depends on it):
  `iwdg.rs` counts **retired instructions**, not wall time
  (`timeout = RLR * 128 * prescaler_div(PR)`, RLR truncated to 12 bits), so
  the maximal window (RLR=0xFFF, PR=0) is 2,096,640 instructions ≈ **13
  GUEST ms**, roughly 1000× shorter than real silicon's ~13 s at the same
  RLR/PR (LSI 40 kHz). If the IWDG ever becomes wall/LSI-timed, the cell's
  delays have to grow with it.
- The F4 engine folder must be rebuilt and re-landed before folder-first can
  be re-enabled (see ENGINE SOURCING above).

## ENGINE OWNER MUST DO

1. **Apply `patches/f4-hash-silicon-fixes.patch`** to
   `stm32-periph-wasm/src/peripherals/hash.rs` (apply the completion
   interrupt patch separately if wanted), then rebuild the wasm and refresh
   the vendored bytes. `git apply --check` passes against the owner's working
   copy as of 2026-10-20.
2. **Land a clean owner-folder F4 build** so `resolve.alias` can point at the
   folder again (glue + wasm must version-match; they are a matched pair).
3. **Type the facade net API**: `ethInject`, `ethSetLink`, `onTx` and
   `withAssets.irq_eth` are used by the runner through `any` casts. A rename
   is silent — the ETH cells would fail as "no DHCP offer" instead of a
   missing-hook error.

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
- [x] **Ethernet (on-chip MAC)**: create-time `onTx` tap + `ethInject` RX +
      `ethSetLink` + `irq_eth` opt-in, against the unified gateway — PROVEN
      on F407 / 407VE / 429 (DORA) and F407 (HTTP through NAT).
- [x] USB CDC (`usbInjectSetup`/`usbInjectOut`) — PROVEN.
- [x] bxCAN — PROVEN through the engine's silent-loopback model.
- [ ] `canInject` (external CAN bus injection) — exists on the facade, not wired.

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

Ethernet: `withAssets.onTx` (create-time TX tap) [+ `withAssets.irq_eth = true`
for interrupt-driven guests] → `ethSetLink(true)` at boot → per drain:
`ethInject(frame)` for RX (≤8 frames) and the TX queue → `GatewayLink`.
