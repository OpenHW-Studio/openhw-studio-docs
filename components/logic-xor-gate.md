---
title: "XOR Gate"
description: "A digital logic XOR gate that outputs HIGH when its inputs are different."
slug: /components/logic-xor-gate
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Logic%20Components">Logic Components</a> &gt; 
  <span>XOR Gate</span>
</div>

# XOR Gate
<p class="subtitle">A digital logic gate that outputs HIGH when its inputs are different (one HIGH, one LOW).</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="75" height="60" viewBox="0 0 75 60" xmlns="http://www.w3.org/2000/svg">
      <line x1="0" y1="15" x2="17" y2="15" stroke="#1e1e1e" stroke-width="2" stroke-linecap="round" />
      <line x1="0" y1="45" x2="17" y2="45" stroke="#1e1e1e" stroke-width="2" stroke-linecap="round" />
      <path d="M 16 10 Q 21 30 16 50" fill="none" stroke="#a855f7" stroke-width="2" stroke-linecap="round" />
      <defs>
          <linearGradient id="xorGateFill" x1="22" y1="10" x2="57" y2="30" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#c084fc" stop-opacity="0.15" />
              <stop offset="100%" stop-color="#a855f7" stop-opacity="0.05" />
          </linearGradient>
      </defs>
      <path d="M 22 10 Q 27 30 22 50 Q 47 50 62 30 Q 47 10 22 10 Z" fill="url(#xorGateFill)" stroke="#a855f7" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" />
      <line x1="62" y1="30" x2="75" y2="30" stroke="#1e1e1e" stroke-width="2" stroke-linecap="round" />
    </svg>
    <span style="font-size:11px;color:var(--vp-c-text-2);">XOR Gate</span>
  </div>
  <div class="component-info">
    <p>A digital logic gate that implements logical Exclusive-OR. It acts as an inequality detector, producing a HIGH output only when the inputs are different from each other.</p>
    <div>
      <span class="tag">Logic Components</span>
      <span class="tag">Digital Logic</span>
    </div>
  </div>
</div>

## Overview
The XOR (Exclusive-OR) gate is a fundamental component used in arithmetic circuits (like adders and subtractors) and error-checking logic. It evaluates if two logic states are unequal.

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">IN1</span></td><td><span class="pin-type input">input</span></td><td>First digital logic input. Expects HIGH (1) or LOW (0).</td></tr>
<tr><td><span class="pin-name">IN2</span></td><td><span class="pin-type input">input</span></td><td>Second digital logic input. Expects HIGH (1) or LOW (0).</td></tr>
<tr><td><span class="pin-name">OUT</span></td><td><span class="pin-type digital">digital</span></td><td>Digital logic output. Driven HIGH when IN1 is not equal to IN2.</td></tr>
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
| 1 (HIGH) | 1 (HIGH) | 0 (LOW)  |

The XOR function models Boolean addition without carry.

## Wiring Diagram

Example of a logic XOR gate wired to an Arduino Uno and an LED (with a resistor).

<p align="center">
  <img src="/images/components/logic-xor-gate_wiring.png" alt="Wiring Diagram" style="max-width: 100%; border-radius: 8px; margin: 20px 0;" />
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
  Serial.println("XOR Gate Truth Table Test:");
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
    <a href="/docs/components/logic-xnor-gate" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: XNOR Gate</a>
  </div>
  <div>
    <a href="/docs/components/max30102" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: MAX30102 &rarr;</a>
  </div>
</div>
