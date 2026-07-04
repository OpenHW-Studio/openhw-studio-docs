---
title: "2-to-1 Multiplexer"
description: "A digital logic multiplexer that routes one of two input signals to a single output based on a select line."
slug: /components/logic-mux-2to1
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Logic%20Components">Logic Components</a> &gt; 
  <span>2-to-1 Multiplexer</span>
</div>

# 2-to-1 Multiplexer
<p class="subtitle">A digital switch that routes one of two input signals to a single output line based on a selector pin.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <img src="/images/components/logic-mux-2to1.svg" alt="2-to-1 Multiplexer" style="width:90px; height:75px; max-width: 100%; max-height: 150px" />
    <span style="font-size:11px;color:var(--vp-c-text-2);">2-to-1 MUX</span>
  </div>
  <div class="component-info">
    <p>A Multiplexer (MUX) acts like a digitally-controlled railway switch. It takes multiple data inputs (D0, D1) and routes exactly one of them to the output (Y). Which input is chosen is determined by the binary value of the Select (S) pin.</p>
    <div>
      <span class="tag">Logic Components</span>
      <span class="tag">Combinational Logic</span>
      <span class="tag">Routing</span>
    </div>
  </div>
</div>

## Overview
Multiplexers are vital for data routing, memory addressing, and time-division multiplexing. They allow multiple signals to share a single communication line or logic path, reducing the physical wiring required in complex systems.

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">D0</span></td><td><span class="pin-type input">input</span></td><td>Data Input 0. Routed to Y when S = LOW.</td></tr>
<tr><td><span class="pin-name">D1</span></td><td><span class="pin-type input">input</span></td><td>Data Input 1. Routed to Y when S = HIGH.</td></tr>
<tr><td><span class="pin-name">S</span></td><td><span class="pin-type input">input</span></td><td>Select Input. Controls which data line connects to the output.</td></tr>
<tr><td><span class="pin-name">Y</span></td><td><span class="pin-type digital">digital</span></td><td>The Output signal. Mirrors the selected data input.</td></tr>
</table>

## Configurable Attributes
*This basic multiplexer currently has no configurable attributes.*

## Working Principle

### Truth Table
| S (Select) | D1 (Input 1) | D0 (Input 0) | Y (Output) |
|------------|--------------|--------------|------------|
| **0**      | X            | 0            | **0**      |
| **0**      | X            | 1            | **1**      |
| **1**      | 0            | X            | **0**      |
| **1**      | 1            | X            | **1**      |

- **S = 0:** The output Y mirrors whatever signal is present on **D0**. (D1 is ignored).
- **S = 1:** The output Y mirrors whatever signal is present on **D1**. (D0 is ignored).

## Wiring Diagram

<p align="center">
  <img src="/images/components/logic-mux-2to1_wiring.png" alt="Wiring Diagram" style="max-width: 100%; border-radius: 8px; margin: 20px 0;" />
</p>

<TryInSimulator />

## Example Arduino Code
A 2-to-1 Multiplexer can be easily simulated using an `if-else` statement or the ternary operator in C++.

```cpp
const int pinD0 = 2; // Data Input 0
const int pinD1 = 3; // Data Input 1
const int pinS = 4;  // Select Input
const int pinY = 5;  // Output

void setup() {
  pinMode(pinD0, INPUT);
  pinMode(pinD1, INPUT);
  pinMode(pinS, INPUT);
  pinMode(pinY, OUTPUT);
}

void loop() {
  bool sState = digitalRead(pinS);
  bool outputState = LOW;
  
  if (sState == LOW) {
    // Route D0 to Output
    outputState = digitalRead(pinD0);
  } else {
    // Route D1 to Output
    outputState = digitalRead(pinD1);
  }
  
  digitalWrite(pinY, outputState);
}
```

## Simulation Notes
- The simulator updates the output instantly upon a change to the S, D0, or D1 pins (no propagation delay is simulated).
- Ensure all inputs are driven. Floating a data input while it is selected will result in an undefined output state (typically evaluated as LOW in the simulator).

## Notes / Warnings
- Multiplexers are purely combinational logic; they do not store data. For data storage, combine a MUX with a D Flip-Flop.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/logic-ic-74xx" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: 74xx Series ICs</a>
  </div>
  <div>
    <a href="/docs/components/openhw-a4988" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: A4988 Stepper Driver (Actuators) &rarr;</a>
  </div>
</div>
