---
title: "NAND Gate"
description: "A digital logic NAND gate that outputs LOW only when both of its inputs are HIGH."
slug: /components/logic-nand-gate
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Logic%20Components">Logic Components</a> &gt; 
  <span>NAND Gate</span>
</div>

# NAND Gate
<p class="subtitle">A digital logic NAND gate that outputs LOW only when both of its inputs are HIGH.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <img src="/images/components/logic-nand-gate.svg" alt="NAND Gate" style="width:75px; height:60px; max-width: 100%; max-height: 150px" />
    <span style="font-size:11px;color:var(--vp-c-text-2);">NAND Gate</span>
  </div>
  <div class="component-info">
    <p>A fundamental digital logic gate that implements logical NAND (NOT-AND). It produces a LOW output only when all of its inputs are HIGH. If any input is LOW, the output is HIGH.</p>
    <div>
      <span class="tag">Logic Components</span>
      <span class="tag">Digital Logic</span>
    </div>
  </div>
</div>

## Overview
The NAND Gate is a universal logic gate (meaning any other logic function can be constructed using only NAND gates). It evaluates to false (LOW) strictly when all input conditions are true (HIGH).

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">IN1</span></td><td><span class="pin-type input">input</span></td><td>First digital logic input. Expects HIGH (1) or LOW (0).</td></tr>
<tr><td><span class="pin-name">IN2</span></td><td><span class="pin-type input">input</span></td><td>Second digital logic input. Expects HIGH (1) or LOW (0).</td></tr>
<tr><td><span class="pin-name">OUT</span></td><td><span class="pin-type digital">digital</span></td><td>Digital logic output. Driven LOW only when both IN1 and IN2 are HIGH.</td></tr>
</table>

## Configurable Attributes
*This component currently has no configurable attributes.*

## Working Principle

### Truth Table
| IN1 | IN2 | OUT |
|-----|-----|-----|
| 0 (LOW)  | 0 (LOW)  | 1 (HIGH) |
| 0 (LOW)  | 1 (HIGH) | 1 (HIGH) |
| 1 (HIGH) | 0 (LOW)  | 1 (HIGH) |
| 1 (HIGH) | 1 (HIGH) | 0 (LOW)  |

The NAND Gate physically models the inverted result of Boolean multiplication: Y = (A * B)'.

## Wiring Diagram

<p align="center">
  <img src="/images/components/logic-nand-gate_wiring.png" alt="Wiring Diagram" style="max-width: 100%; border-radius: 8px; margin: 20px 0;" />
</p>

<TryInSimulator />

## Example Arduino Code
```cpp
const int pinIn1 = 2; // Connect to IN1
const int pinIn2 = 3; // Connect to IN2
const int pinOut = 4; // Connect to OUT

void setup() {
  Serial.begin(9600);
  pinMode(pinIn1, OUTPUT);
  pinMode(pinIn2, OUTPUT);
  pinMode(pinOut, INPUT);
  Serial.println("NAND Gate Truth Table Test:");
}

void loop() {
  for (int state = 0; state < 4; state++) {
    bool val1 = (state & 1);
    bool val2 = (state & 2) >> 1;

    digitalWrite(pinIn1, val1 ? HIGH : LOW);
    digitalWrite(pinIn2, val2 ? HIGH : LOW);
    delay(10);
    
    int result = digitalRead(pinOut);
    
    Serial.print("IN1: ");
    Serial.print(val1);
    Serial.print(" | IN2: ");
    Serial.print(val2);
    Serial.print(" => OUT: ");
    Serial.println(result);
    delay(1000);
  }
}
```

## Simulation Notes
- Evaluates logic instantaneously.
- Floating inputs may cause undefined behavior. Tie unused inputs to Ground.

## Notes / Warnings
- **Voltage Levels:** The simulator treats standard logic signals as valid inputs. Do not apply analog voltages.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/logic-mux-2to1" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: 2-to-1 Multiplexer</a>
  </div>
  <div>
    <a href="/docs/components/logic-nor-gate" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: NOR Gate &rarr;</a>
  </div>
</div>
