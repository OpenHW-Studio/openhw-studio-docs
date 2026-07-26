---
title: "NOR Gate"
description: "A digital logic NOR gate that outputs LOW when at least one input is HIGH."
slug: /components/logic-nor-gate
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Logic%20Components">Logic Components</a> &gt; 
  <span>NOR Gate</span>
</div>

# NOR Gate
<p class="subtitle">A digital logic NOR gate that outputs LOW when at least one of its inputs is HIGH.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <img src="/images/components/logic-nor-gate.svg" alt="NOR Gate" style="width:75px; height:60px; max-width: 100%; max-height: 150px" />
    <span style="font-size:11px;color:var(--vp-c-text-2);">NOR Gate</span>
  </div>
  <div class="component-info">
    <p>A digital logic gate that implements logical NOR (NOT-OR). It produces a HIGH output only when all of its inputs are LOW. If any input is HIGH, the output is LOW.</p>
    <div>
      <span class="tag">Logic Components</span>
      <span class="tag">Digital Logic</span>
    </div>
  </div>
</div>

## Overview
The NOR Gate is a universal logic gate (meaning any other logic function can be constructed using only NOR gates). It evaluates multiple digital signals and returns true (HIGH) only if all conditions are false (LOW).

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">IN1</span></td><td><span class="pin-type input">input</span></td><td>First digital logic input. Expects HIGH (1) or LOW (0).</td></tr>
<tr><td><span class="pin-name">IN2</span></td><td><span class="pin-type input">input</span></td><td>Second digital logic input. Expects HIGH (1) or LOW (0).</td></tr>
<tr><td><span class="pin-name">OUT</span></td><td><span class="pin-type digital">digital</span></td><td>Digital logic output. Driven LOW if IN1 or IN2 is HIGH. Driven HIGH only if both are LOW.</td></tr>
</table>

## Configurable Attributes
*This component currently has no configurable attributes.*

## Working Principle

### Truth Table
| IN1 | IN2 | OUT |
|-----|-----|-----|
| 0 (LOW)  | 0 (LOW)  | 1 (HIGH) |
| 0 (LOW)  | 1 (HIGH) | 0 (LOW)  |
| 1 (HIGH) | 0 (LOW)  | 0 (LOW)  |
| 1 (HIGH) | 1 (HIGH) | 0 (LOW)  |

The NOR Gate models the inverted result of Boolean addition: Y = (A + B)'.

## Wiring Diagram

<p align="center">
  <img src="/images/components/logic-nor-gate_wiring.png" alt="Wiring Diagram" style="max-width: 100%; border-radius: 8px; margin: 20px 0;" />
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
  Serial.println("NOR Gate Truth Table Test:");
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
    <a href="/docs/components/logic-nand-gate" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: NAND Gate</a>
  </div>
  <div>
    <a href="/docs/components/logic-not-gate" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: NOT Gate &rarr;</a>
  </div>
</div>
