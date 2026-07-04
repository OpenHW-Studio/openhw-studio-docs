---
title: "OR Gate"
description: "A digital logic OR gate that outputs HIGH when at least one input is HIGH."
slug: /components/logic-or-gate
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Logic%20Components">Logic Components</a> &gt; 
  <span>OR Gate</span>
</div>

# OR Gate
<p class="subtitle">A fundamental digital logic gate that outputs HIGH when at least one of its inputs is HIGH.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="75" height="60" viewBox="0 0 75 60" xmlns="http://www.w3.org/2000/svg">
      <line x1="0" y1="15" x2="22" y2="15" stroke="#1e1e1e" stroke-width="2" stroke-linecap="round" />
      <line x1="0" y1="45" x2="22" y2="45" stroke="#1e1e1e" stroke-width="2" stroke-linecap="round" />
      <defs>
          <linearGradient id="orGateFill" x1="20" y1="10" x2="55" y2="30" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#c084fc" stop-opacity="0.15" />
              <stop offset="100%" stop-color="#a855f7" stop-opacity="0.05" />
          </linearGradient>
      </defs>
      <path d="M 20 10 Q 25 30 20 50 Q 45 50 60 30 Q 45 10 20 10 Z" fill="url(#orGateFill)" stroke="#a855f7" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" />
      <line x1="60" y1="30" x2="75" y2="30" stroke="#1e1e1e" stroke-width="2" stroke-linecap="round" />
    </svg>
    <span style="font-size:11px;color:var(--vp-c-text-2);">OR Gate</span>
  </div>
  <div class="component-info">
    <p>A fundamental digital logic gate that implements logical disjunction. It produces a HIGH output if any of its inputs are HIGH. The output is LOW only when all inputs are LOW.</p>
    <div>
      <span class="tag">Logic Components</span>
      <span class="tag">Digital Logic</span>
    </div>
  </div>
</div>

## Overview
The OR Gate evaluates multiple digital signals and returns true (HIGH) if any single condition is met. It is widely used in control logic, alarm systems, and conditional branching in digital circuits.

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">IN1</span></td><td><span class="pin-type input">input</span></td><td>First digital logic input. Expects HIGH (1) or LOW (0).</td></tr>
<tr><td><span class="pin-name">IN2</span></td><td><span class="pin-type input">input</span></td><td>Second digital logic input. Expects HIGH (1) or LOW (0).</td></tr>
<tr><td><span class="pin-name">OUT</span></td><td><span class="pin-type digital">digital</span></td><td>Digital logic output. Driven HIGH if IN1 or IN2 is HIGH.</td></tr>
</table>

## Configurable Attributes
*This component currently has no configurable attributes.*

## Working Principle

### Truth Table
| IN1 | IN2 | OUT |
|-----|-----|-----|
| 0 (LOW)  | 0 (LOW)  | 0 (LOW)  |
| 0 (LOW)  | 1 (HIGH) | 1 (HIGH) |
| 1 (HIGH) | 0 (LOW)  | 1 (HIGH) |
| 1 (HIGH) | 1 (HIGH) | 1 (HIGH) |

The OR Gate models Boolean addition (A + B = Y).

## Wiring Diagram

Example of a logic OR gate wired to an Arduino Uno and an LED (with a resistor).

<p align="center">
  <img src="/images/components/logic-or-gate_wiring.png" alt="Wiring Diagram" style="max-width: 100%; border-radius: 8px; margin: 20px 0;" />
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
  Serial.println("OR Gate Truth Table Test:");
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
    <a href="/docs/components/logic-not-gate" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: NOT Gate</a>
  </div>
  <div>
    <a href="/docs/components/logic-xnor-gate" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: XNOR Gate &rarr;</a>
  </div>
</div>
