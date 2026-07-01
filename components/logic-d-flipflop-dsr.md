---
title: "D Flip-Flop (Set/Reset)"
description: "A digital logic D Flip-Flop component with asynchronous Set and Reset inputs."
slug: /components/logic-d-flipflop-dsr
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Logic%20Components">Logic Components</a> &gt; 
  <span>D Flip-Flop (Set/Reset)</span>
</div>

# D Flip-Flop (Set/Reset)
<p class="subtitle">A full-featured digital memory element that captures data on a clock edge, with asynchronous Set and Reset pins.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <rect x="25" y="25" width="70" height="70" rx="8" fill="#1e293b" stroke="#334155" stroke-width="3" />
      <path d="M 25,75 L 35,80 L 25,85" fill="none" stroke="#94a3b8" stroke-width="2" />
      <text x="35" y="50" fill="#94a3b8" font-family="monospace" font-size="14" font-weight="bold">D</text>
      <text x="75" y="50" fill="#94a3b8" font-family="monospace" font-size="14" font-weight="bold">Q</text>
      <text x="70" y="85" fill="#94a3b8" font-family="monospace" font-size="14" font-weight="bold">Q'</text>
      <text x="55" y="40" fill="#f56565" font-family="monospace" font-size="12" font-weight="bold">S</text>
      <text x="55" y="85" fill="#f56565" font-family="monospace" font-size="12" font-weight="bold">R</text>
      <line x1="10" y1="45" x2="25" y2="45" stroke="#94a3b8" stroke-width="3" />
      <line x1="10" y1="80" x2="25" y2="80" stroke="#94a3b8" stroke-width="3" />
      <line x1="60" y1="10" x2="60" y2="25" stroke="#f56565" stroke-width="3" />
      <line x1="60" y1="95" x2="60" y2="110" stroke="#f56565" stroke-width="3" />
      <line x1="95" y1="45" x2="110" y2="45" stroke="#94a3b8" stroke-width="3" />
      <line x1="95" y1="80" x2="110" y2="80" stroke="#94a3b8" stroke-width="3" />
    </svg>
    <span style="font-size:11px;color:#4a5568;">D Flip-Flop (SR)</span>
  </div>
  <div class="component-info">
    <p>This is a complete D Flip-Flop featuring both asynchronous Set (S) and Reset (R) pins. These pins allow you to force the flip-flop into a specific state independently of the clock signal.</p>
    <div>
      <span class="tag">Logic Components</span>
      <span class="tag">Sequential Logic</span>
      <span class="tag">Memory</span>
    </div>
  </div>
</div>

## Overview
The Set/Reset variant is commonly found in shift registers and state machines where the entire circuit must be initialized to a specific binary pattern (e.g., loading a starting value) before clocked operations begin.

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">D</span></td><td><span class="pin-type input">input</span></td><td>Data Input. The logic value to be stored on a clock edge.</td></tr>
<tr><td><span class="pin-name">CLK</span></td><td><span class="pin-type input">input</span></td><td>Clock Input. Triggers data capture on the rising edge.</td></tr>
<tr><td><span class="pin-name">S</span></td><td><span class="pin-type input">input</span></td><td>Asynchronous Set. When HIGH, forces Q to HIGH.</td></tr>
<tr><td><span class="pin-name">R</span></td><td><span class="pin-type input">input</span></td><td>Asynchronous Reset. When HIGH, forces Q to LOW.</td></tr>
<tr><td><span class="pin-name">Q</span></td><td><span class="pin-type digital">digital</span></td><td>The current stored state.</td></tr>
<tr><td><span class="pin-name">Q'</span></td><td><span class="pin-type digital">digital</span></td><td>The inverted stored state (NOT Q).</td></tr>
</table>

## Configurable Attributes
*This component currently has no configurable attributes.*

## Working Principle

### State Transition Table
| S (Set) | R (Reset) | CLK (Edge) | D | Q (Next State) | Q' (Next State) |
|---------|-----------|------------|---|----------------|-----------------|
| 1       | 0         | X          | X | **1**          | **0**           |
| 0       | 1         | X          | X | **0**          | **1**           |
| 1       | 1         | X          | X | **Invalid**    | **Invalid**     |
| 0       | 0         | `↑` (Rising) | 0 | 0              | 1               |
| 0       | 0         | `↑` (Rising) | 1 | 1              | 0               |
| 0       | 0         | `0`, `1`, `↓`  | X | No Change (Q)  | No Change (Q')  |

- **Asynchronous Overrides:** S and R override the clock. 
- **Invalid State:** Activating both Set and Reset simultaneously leads to an undefined or invalid state in physical hardware. The simulator will typically output LOW for both Q and Q' in this state, but it should be avoided.

## Wiring Diagram
1. Connect a digital data source to **D**.
2. Connect a clock source to **CLK**.
3. Connect logic inputs to **S** and **R** (tie to Ground if unused!).
4. Connect **Q** to an LED or the next logic stage.

## Example Arduino Code
```cpp
const int pinD = 2;   // Data Input
const int pinCLK = 3; // Clock Input
const int pinS = 4;   // Set Input
const int pinR = 5;   // Reset Input
const int pinQ = 6;   // State Output

bool lastClkState = LOW;
bool stateQ = LOW;

void setup() {
  pinMode(pinD, INPUT);
  pinMode(pinCLK, INPUT);
  pinMode(pinS, INPUT);
  pinMode(pinR, INPUT);
  pinMode(pinQ, OUTPUT);
}

void loop() {
  bool currentClkState = digitalRead(pinCLK);
  bool setState = digitalRead(pinS);
  bool resetState = digitalRead(pinR);
  
  // Asynchronous Priority
  if (setState == HIGH && resetState == LOW) {
    stateQ = HIGH;
  } 
  else if (resetState == HIGH && setState == LOW) {
    stateQ = LOW;
  }
  // Detect Rising Edge
  else if (setState == LOW && resetState == LOW && currentClkState == HIGH && lastClkState == LOW) {
    stateQ = digitalRead(pinD);
  }
  
  // Drive Output
  digitalWrite(pinQ, stateQ);
  
  lastClkState = currentClkState;
}
```

## Simulation Notes
- The Set and Reset pins act immediately.
- Floating pins cause unpredictable behavior. Connect unused Set/Reset pins to Ground.

## Notes / Warnings
- **Race Conditions:** Ensure S and R are not toggled simultaneously to prevent metastability.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/logic-d-flipflop-r" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: D Flip-Flop (Reset)</a>
  </div>
  <div>
    <a href="/docs/components/logic-ic-74xx" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: 74xx Series ICs &rarr;</a>
  </div>
</div>

<style>
/* Base overrides for VitePress layout */
.custom-breadcrumb { margin-bottom: 2rem; font-size: 0.9rem; color: var(--vp-c-text-2); }
.custom-breadcrumb a { color: var(--vp-c-brand); text-decoration: none; }
.custom-breadcrumb a:hover { text-decoration: underline; }
.custom-breadcrumb span { color: var(--vp-c-text-1); font-weight: 600; }
h1 { font-size: 36px !important; font-weight: 800 !important; color: var(--vp-c-text-1) !important; margin-bottom: 8px !important; }
.subtitle { font-size: 16px; color: #718096; margin-bottom: 36px; border-bottom: 1px solid var(--vp-c-divider); padding-bottom: 24px; }
.component-preview { display: flex; gap: 40px; align-items: flex-start; margin-bottom: 40px; background: #1a1f2e; border: 1px solid #2d3748; border-radius: 12px; padding: 32px; }
.component-svg-wrap { flex-shrink: 0; display: flex; flex-direction: column; align-items: center; gap: 12px; }
.component-info p { color: #a0aec0; font-size: 15px; margin-bottom: 16px; line-height: 1.7; }
.tag { display: inline-block; background: #1a2035; border: 1px solid #2d4a8a; color: #63b3ed; padding: 3px 10px; border-radius: 20px; font-size: 12px; margin-right: 6px; margin-bottom: 6px; }
.pin-table, .attrs-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px; }
.pin-table th, .attrs-table th { background: #1a1f2e; color: #63b3ed; padding: 10px 14px; text-align: left; border: 1px solid #2d3748; }
.pin-table td, .attrs-table td { padding: 10px 14px; border: 1px solid #2d3748; color: #a0aec0; }
.pin-table tr:nth-child(even) td, .attrs-table tr:nth-child(even) td { background: #141824; }
.pin-name { font-family: monospace; color: #68d391; font-weight: 600; }
.pin-type { font-size: 11px; padding: 2px 8px; border-radius: 10px; font-weight: 600; text-transform: none; }
.pin-type.power { background: #3d0000; color: #f56565; }
.pin-type.digital { background: #1a365d; color: #63b3ed; }
.pin-type.passive { background: #4a4a4a; color: #a0aec0; }
.pin-type.input { background: #1c3d27; color: #68d391; }
.pin-type.analog { background: #4a3a1a; color: #f6ad55; }
.pin-type.default { background: #2d3748; color: #a0aec0; }
.circuit-preview { background: #0d1117; border: 1px solid #2d3748; border-radius: 8px; padding: 20px; margin-top: 16px; display: flex; align-items: center; justify-content: center; min-height: 140px; }
:root { --vp-c-bg: #0f1117; }
@media (max-width: 640px) { .component-preview { flex-direction: column; align-items: center; } }
</style>
