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
    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <path d="M 30,30 L 75,60 L 30,90 Z" fill="#1e293b" stroke="#334155" stroke-width="3" />
      <circle cx="82" cy="60" r="7" fill="#1e293b" stroke="#334155" stroke-width="3" />
      <line x1="10" y1="60" x2="30" y2="60" stroke="#94a3b8" stroke-width="3" />
      <line x1="89" y1="60" x2="110" y2="60" stroke="#94a3b8" stroke-width="3" />
    </svg>
    <span style="font-size:11px;color:#4a5568;">NOT Gate</span>
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
1. Connect the output of a switch or digital pin to **IN**.
2. Connect **OUT** to an LED (with a resistor) or an Arduino input pin to read the inverted logic state.

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
