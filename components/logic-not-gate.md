---
title: "NOT Gate"
description: "A digital logic NOT gate (inverter) that outputs the opposite logic level of its input."
slug: /components/logic-not-gate
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Logic%20Components">Logic Components</a> &gt; 
  <span>NOT Gate</span>
</div>

# NOT Gate
<p class="subtitle">A digital logic NOT gate (inverter) that outputs the opposite logic level of its input.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="60" height="30" viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg">
      <line x1="0" y1="15" x2="20" y2="15" stroke="#1e1e1e" stroke-width="2" stroke-linecap="round" />
      <defs>
          <linearGradient id="notGateFill" x1="20" y1="0" x2="50" y2="15" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#c084fc" stop-opacity="0.15" />
              <stop offset="100%" stop-color="#a855f7" stop-opacity="0.05" />
          </linearGradient>
      </defs>
      <polygon points="20,0 50,15 20,30" fill="url(#notGateFill)" stroke="#a855f7" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" />
      <circle cx="53" cy="15" r="3" fill="transparent" stroke="#a855f7" stroke-width="2" />
      <line x1="56" y1="15" x2="60" y2="15" stroke="#1e1e1e" stroke-width="2" stroke-linecap="round" />
    </svg>
    <span style="font-size:11px;color:var(--vp-c-text-2);">NOT Gate</span>
  </div>
  <div class="component-info">
    <p>A logic gate that performs logical negation. If the input is HIGH, the output is LOW. If the input is LOW, the output is HIGH. This is commonly referred to as an inverter.</p>
    <div>
      <span class="tag">Logic Components</span>
      <span class="tag">Digital Logic</span>
    </div>
  </div>
</div>

## Overview
The NOT Gate is a fundamental logic component that reverses the logic state of its input. In OpenHW Studio, this component is essential for creating complex logic expressions and conditional inversions within simulated digital circuits.

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">IN</span></td><td><span class="pin-type input">input</span></td><td>Digital logic input. Expects HIGH (1) or LOW (0).</td></tr>
<tr><td><span class="pin-name">OUT</span></td><td><span class="pin-type digital">digital</span></td><td>Digital logic output. Driven to the opposite state of IN.</td></tr>
</table>

## Configurable Attributes
*This component currently has no configurable attributes.*

## Working Principle

### Truth Table
| IN | OUT |
|----|-----|
| 0 (LOW)  | 1 (HIGH) |
| 1 (HIGH) | 0 (LOW)  |

The Boolean expression for a NOT gate is Y = A' (or NOT A). It physically models logical negation.

## Wiring Diagram

Example of a logic NOT gate wired to an Arduino Uno and an LED (with a resistor).

<p align="center">
  <img src="/images/components/logic-not-gate_wiring.png" alt="Wiring Diagram" style="max-width: 100%; border-radius: 8px; margin: 20px 0;" />
</p>

<TryInSimulator />

## Example Arduino Code
To test the NOT gate using an Arduino, you can generate logic states on an output pin and read the inverted result on an input pin.

```cpp
const int pinIn = 2; // Connect to IN of NOT Gate
const int pinOut = 3; // Connect to OUT of NOT Gate

void setup() {
  Serial.begin(9600);
  pinMode(pinIn, OUTPUT);
  pinMode(pinOut, INPUT);
  Serial.println("NOT Gate Truth Table Test:");
}

void loop() {
  // Test LOW state
  digitalWrite(pinIn, LOW);
  delay(10);
  int resultLow = digitalRead(pinOut);
  Serial.print("IN: 0 => OUT: ");
  Serial.println(resultLow);
  delay(1000);

  // Test HIGH state
  digitalWrite(pinIn, HIGH);
  delay(10);
  int resultHigh = digitalRead(pinOut);
  Serial.print("IN: 1 => OUT: ");
  Serial.println(resultHigh);
  delay(1000);
}
```

## Simulation Notes
- The NOT gate component in the simulator evaluates the logic state instantaneously (zero propagation delay).
- Floating inputs (disconnected pins) may lead to undefined behavior. Always ensure the input is driven HIGH or LOW.

## Notes / Warnings
- **Voltage Levels:** The simulator treats standard 5V or 3.3V signals as logic HIGH.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/logic-nor-gate" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: NOR Gate</a>
  </div>
  <div>
    <a href="/docs/components/logic-or-gate" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: OR Gate &rarr;</a>
  </div>
</div>
