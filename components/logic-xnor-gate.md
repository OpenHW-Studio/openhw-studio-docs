---
title: "XNOR Gate"
description: "A digital logic XNOR gate that outputs HIGH when its inputs are equal."
slug: /components/logic-xnor-gate
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Logic%20Components">Logic Components</a> &gt; 
  <span>XNOR Gate</span>
</div>

# XNOR Gate
<p class="subtitle">A digital logic gate that outputs HIGH when its inputs are equal (both HIGH or both LOW).</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <path d="M 35,30 Q 55,60 35,90 Q 75,90 90,60 Q 75,30 35,30 Z" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-border)" stroke-width="3" />
      <path d="M 28,30 Q 48,60 28,90" fill="none" stroke="var(--vp-c-border)" stroke-width="3" />
      <circle cx="97" cy="60" r="7" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-border)" stroke-width="3" />
      <line x1="10" y1="45" x2="35" y2="45" stroke="#94a3b8" stroke-width="3" />
      <line x1="10" y1="75" x2="35" y2="75" stroke="#94a3b8" stroke-width="3" />
      <line x1="104" y1="60" x2="110" y2="60" stroke="#94a3b8" stroke-width="3" />
      <text x="50" y="65" fill="var(--vp-c-text-2)" font-family="monospace" font-size="16" font-weight="bold">=1</text>
    </svg>
    <span style="font-size:11px;color:var(--vp-c-text-2);">XNOR Gate</span>
  </div>
  <div class="component-info">
    <p>A digital logic gate that implements logical Exclusive-NOR. It acts as an equality detector, producing a HIGH output only when both inputs are identical (either both HIGH or both LOW).</p>
    <div>
      <span class="tag">Logic Components</span>
      <span class="tag">Digital Logic</span>
    </div>
  </div>
</div>

## Overview
The XNOR (Exclusive-NOR) gate is commonly used in parity generation, digital comparators, and encryption circuits. It checks for equality between two digital signals.

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">IN1</span></td><td><span class="pin-type input">input</span></td><td>First digital logic input. Expects HIGH (1) or LOW (0).</td></tr>
<tr><td><span class="pin-name">IN2</span></td><td><span class="pin-type input">input</span></td><td>Second digital logic input. Expects HIGH (1) or LOW (0).</td></tr>
<tr><td><span class="pin-name">OUT</span></td><td><span class="pin-type digital">digital</span></td><td>Digital logic output. Driven HIGH when IN1 equals IN2. Driven LOW otherwise.</td></tr>
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
| 1 (HIGH) | 1 (HIGH) | 1 (HIGH) |

The XNOR function evaluates if two logic inputs are equal.

## Wiring Diagram
1. Connect a digital signal source to **IN1**.
2. Connect a second digital signal source to **IN2**.
3. Connect **OUT** to the next logic stage or an indicator LED.

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
  Serial.println("XNOR Gate Truth Table Test:");
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
    <a href="/docs/components/logic-or-gate" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: OR Gate</a>
  </div>
  <div>
    <a href="/docs/components/logic-xor-gate" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: XOR Gate &rarr;</a>
  </div>
</div>
