---
title: "D Flip-Flop (with Reset)"
description: "A digital logic D Flip-Flop component with an asynchronous reset input."
slug: /components/logic-d-flipflop-r
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Logic%20Components">Logic Components</a> &gt; 
  <span>D Flip-Flop (with Reset)</span>
</div>

# D Flip-Flop (with Reset)
<p class="subtitle">A digital memory element that captures data on a clock edge, featuring an asynchronous reset pin to force the state to LOW.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <img src="/images/components/logic-d-flipflop-r.svg" alt="D Flip-Flop (Reset)" style="width:90px; height:90px; max-width: 100%; max-height: 150px" />
    <span style="font-size:11px;color:var(--vp-c-text-2);">D Flip-Flop (R)</span>
  </div>
  <div class="component-info">
    <p>This variant of the D Flip-Flop includes an asynchronous Reset (R) pin. When the Reset pin is activated, the flip-flop immediately clears its stored data (forcing Q to LOW), regardless of the clock signal.</p>
    <div>
      <span class="tag">Logic Components</span>
      <span class="tag">Sequential Logic</span>
      <span class="tag">Memory</span>
    </div>
  </div>
</div>

## Overview
The D Flip-Flop with Reset is essential for initializing digital circuits to a known state upon power-up, or for clearing error states without waiting for a clock cycle.

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">D</span></td><td><span class="pin-type input">input</span></td><td>Data Input. The logic value to be stored on a clock edge.</td></tr>
<tr><td><span class="pin-name">CLK</span></td><td><span class="pin-type input">input</span></td><td>Clock Input. Triggers data capture on the rising edge.</td></tr>
<tr><td><span class="pin-name">R</span></td><td><span class="pin-type input">input</span></td><td>Asynchronous Reset. When HIGH, immediately forces Q to LOW.</td></tr>
<tr><td><span class="pin-name">Q</span></td><td><span class="pin-type digital">digital</span></td><td>The current stored state.</td></tr>
<tr><td><span class="pin-name">Q'</span></td><td><span class="pin-type digital">digital</span></td><td>The inverted stored state (NOT Q).</td></tr>
</table>

## Configurable Attributes
*This component currently has no configurable attributes.*

## Working Principle

### State Transition Table
| R (Reset) | CLK (Edge) | D | Q (Next State) | Q' (Next State) |
|-----------|------------|---|----------------|-----------------|
| 1 (HIGH)  | X          | X | **0**          | **1**           |
| 0 (LOW)   | `↑` (Rising) | 0 | 0              | 1               |
| 0 (LOW)   | `↑` (Rising) | 1 | 1              | 0               |
| 0 (LOW)   | `0`, `1`, `↓`  | X | No Change (Q)  | No Change (Q')  |

- **Asynchronous Priority:** The Reset pin overrides the Clock and Data inputs. As long as R is HIGH, the flip-flop cannot store new data.

## Wiring Diagram

<p align="center">
  <img src="/images/components/logic-d-flipflop-r_wiring.png" alt="Wiring Diagram" style="max-width: 100%; border-radius: 8px; margin: 20px 0;" />
</p>

<TryInSimulator />

## Example Arduino Code
```cpp
const int pinD = 2;   // Data Input
const int pinCLK = 3; // Clock Input
const int pinR = 4;   // Reset Input
const int pinQ = 5;   // State Output

bool lastClkState = LOW;
bool stateQ = LOW;

void setup() {
  pinMode(pinD, INPUT);
  pinMode(pinCLK, INPUT);
  pinMode(pinR, INPUT);
  pinMode(pinQ, OUTPUT);
}

void loop() {
  bool currentClkState = digitalRead(pinCLK);
  bool resetState = digitalRead(pinR);
  
  // Asynchronous Reset has highest priority
  if (resetState == HIGH) {
    stateQ = LOW;
  } 
  // Detect Rising Edge
  else if (currentClkState == HIGH && lastClkState == LOW) {
    stateQ = digitalRead(pinD);
  }
  
  // Drive Output
  digitalWrite(pinQ, stateQ);
  
  lastClkState = currentClkState;
}
```

## Simulation Notes
- The Reset pin acts immediately in the simulation without waiting for the next physics tick.
- Floating the Reset pin may lead to unpredictable resets. Always tie it to Ground if not in use.

## Notes / Warnings
- **Active HIGH Reset:** By default, the reset function is triggered when the R pin receives a HIGH signal.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/logic-d-flipflop" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: D Flip-Flop</a>
  </div>
  <div>
    <a href="/docs/components/logic-d-flipflop-dsr" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: D Flip-Flop (Set/Reset) &rarr;</a>
  </div>
</div>
