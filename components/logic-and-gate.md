---
title: "AND Gate"
description: "A fundamental digital logic gate that outputs HIGH only when both of its inputs are HIGH."
slug: /components/logic-and-gate
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Logic%20Components">Logic Components</a> &gt; 
  <span>AND Gate</span>
</div>

# AND Gate
<p class="subtitle">A fundamental digital logic gate that outputs HIGH only when both of its inputs are HIGH.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <path d="M 30,30 L 60,30 A 30 30 0 0 1 90 60 A 30 30 0 0 1 60 90 L 30,90 Z" fill="#1e293b" stroke="#334155" stroke-width="3" />
      <line x1="10" y1="45" x2="30" y2="45" stroke="#94a3b8" stroke-width="3" />
      <line x1="10" y1="75" x2="30" y2="75" stroke="#94a3b8" stroke-width="3" />
      <line x1="90" y1="60" x2="110" y2="60" stroke="#94a3b8" stroke-width="3" />
      <text x="55" y="65" fill="#94a3b8" font-family="monospace" font-size="16" font-weight="bold">&amp;</text>
    </svg>
    <span style="font-size:11px;color:#4a5568;">AND Gate</span>
  </div>
  <div class="component-info">
    <p>A fundamental digital logic gate that implements logical conjunction. It produces a HIGH output only when all of its inputs are HIGH. If any input is LOW, the output is LOW.</p>
    <div>
      <span class="tag">Logic Components</span>
      <span class="tag">Digital Logic</span>
    </div>
  </div>
</div>

## Overview
The AND Gate is one of the most basic building blocks of digital logic circuits. In OpenHW Studio, this component can be used to combine multiple digital signals. It evaluates to true (HIGH) strictly when all input conditions are met.

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">IN1</span></td><td><span class="pin-type input">input</span></td><td>First digital logic input. Expects HIGH (1) or LOW (0).</td></tr>
<tr><td><span class="pin-name">IN2</span></td><td><span class="pin-type input">input</span></td><td>Second digital logic input. Expects HIGH (1) or LOW (0).</td></tr>
<tr><td><span class="pin-name">OUT</span></td><td><span class="pin-type digital">digital</span></td><td>Digital logic output. Driven HIGH only when both IN1 and IN2 are HIGH.</td></tr>
</table>

## Configurable Attributes
*This component currently has no configurable attributes.*

## Working Principle

### Truth Table
| IN1 | IN2 | OUT |
|-----|-----|-----|
| 0 (LOW)  | 0 (LOW)  | 0 (LOW)  |
| 0 (LOW)  | 1 (HIGH) | 0 (LOW)  |
| 1 (HIGH) | 0 (LOW)  | 0 (LOW)  |
| 1 (HIGH) | 1 (HIGH) | 1 (HIGH) |

The AND Gate physically models the mathematical operation of multiplication in Boolean algebra (A * B = Y). 

## Wiring Diagram
1. Connect the output of a switch or digital pin to **IN1**.
2. Connect the output of a second switch or digital pin to **IN2**.
3. Connect **OUT** to an LED (with a resistor) or an Arduino input pin to read the evaluated logic state.

## Example Arduino Code
To test the AND gate using an Arduino, you can generate logic states on two output pins and read the result on an input pin.

```cpp
const int pinIn1 = 2; // Connect to IN1 of AND Gate
const int pinIn2 = 3; // Connect to IN2 of AND Gate
const int pinOut = 4; // Connect to OUT of AND Gate

void setup() {
  Serial.begin(9600);
  pinMode(pinIn1, OUTPUT);
  pinMode(pinIn2, OUTPUT);
  pinMode(pinOut, INPUT);
  Serial.println("AND Gate Truth Table Test:");
}

void loop() {
  // Loop through all 4 possible logic states
  for (int state = 0; state < 4; state++) {
    bool val1 = (state & 1);
    bool val2 = (state & 2) >> 1;

    digitalWrite(pinIn1, val1 ? HIGH : LOW);
    digitalWrite(pinIn2, val2 ? HIGH : LOW);
    
    // Give the gate a brief moment to propagate
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
- The AND gate component in the simulator evaluates the logic state instantaneously (zero propagation delay).
- Floating inputs (disconnected pins) may lead to undefined behavior in some simulator engines. Ensure both inputs are explicitly driven HIGH or LOW.

## Notes / Warnings
- **Voltage Levels:** The simulator treats standard 5V or 3.3V signals as logic HIGH.
- **Floating Pins:** Always pull unused inputs to ground (LOW) if using a multi-input gate where you don't need all inputs.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/catalog" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: Catalog</a>
  </div>
  <div>
    <a href="/docs/components/logic-buffer-gate" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: Buffer Gate &rarr;</a>
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
