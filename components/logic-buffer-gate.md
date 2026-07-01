---
title: "Buffer Gate"
description: "A digital logic buffer gate that outputs the same logic level as its input."
slug: /components/logic-buffer-gate
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Logic%20Components">Logic Components</a> &gt; 
  <span>Buffer Gate</span>
</div>

# Buffer Gate
<p class="subtitle">A digital logic buffer gate that outputs the exact logic level of its input, providing electrical isolation or signal drive strength.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <path d="M 30,30 L 90,60 L 30,90 Z" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-border)" stroke-width="3" />
      <line x1="10" y1="60" x2="30" y2="60" stroke="#94a3b8" stroke-width="3" />
      <line x1="90" y1="60" x2="110" y2="60" stroke="#94a3b8" stroke-width="3" />
      <text x="45" y="65" fill="var(--vp-c-text-2)" font-family="monospace" font-size="16" font-weight="bold">1</text>
    </svg>
    <span style="font-size:11px;color:var(--vp-c-text-2);">Buffer Gate</span>
  </div>
  <div class="component-info">
    <p>A logic gate that performs no logical operation on the input signal. It simply passes the HIGH or LOW state through. It is typically used in hardware to boost signal strength, isolate circuits, or add a small propagation delay.</p>
    <div>
      <span class="tag">Logic Components</span>
      <span class="tag">Digital Logic</span>
    </div>
  </div>
</div>

## Overview
The Buffer Gate (also known as a non-inverting buffer) is a single-input, single-output digital component. In the OpenHW Studio simulator, it is useful for separating different segments of a logic circuit or simply acting as a pass-through wire with gate-like properties.

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">IN</span></td><td><span class="pin-type input">input</span></td><td>Digital logic input. Expects HIGH (1) or LOW (0).</td></tr>
<tr><td><span class="pin-name">OUT</span></td><td><span class="pin-type digital">digital</span></td><td>Digital logic output. Driven to the exact same state as IN.</td></tr>
</table>

## Configurable Attributes
*This component currently has no configurable attributes.*

## Working Principle

### Truth Table
| IN | OUT |
|----|-----|
| 0 (LOW)  | 0 (LOW)  |
| 1 (HIGH) | 1 (HIGH) |

The Boolean expression for a buffer is simply Y = A. Whatever logic level is applied to the input is mirrored on the output.

## Wiring Diagram
1. Connect the output of a switch, sensor, or digital pin to **IN**.
2. Connect **OUT** to the next stage of your logic circuit, an LED (with resistor), or an Arduino input pin.

## Example Arduino Code
To test the Buffer gate using an Arduino, apply a signal to the input and read it back from the output.

```cpp
const int pinIn = 2;  // Connect to IN of Buffer Gate
const int pinOut = 3; // Connect to OUT of Buffer Gate

void setup() {
  Serial.begin(9600);
  pinMode(pinIn, OUTPUT);
  pinMode(pinOut, INPUT);
  Serial.println("Buffer Gate Truth Table Test:");
}

void loop() {
  // Test LOW state
  digitalWrite(pinIn, LOW);
  delay(10); // Propagation delay
  Serial.print("IN: 0 => OUT: ");
  Serial.println(digitalRead(pinOut));
  delay(1000);

  // Test HIGH state
  digitalWrite(pinIn, HIGH);
  delay(10);
  Serial.print("IN: 1 => OUT: ");
  Serial.println(digitalRead(pinOut));
  delay(1000);
}
```

## Simulation Notes
- The Buffer gate component in the simulator evaluates the logic state instantaneously.
- If the input is left floating (disconnected), the output state may be undefined or default to LOW depending on the simulation engine settings.

## Notes / Warnings
- **Voltage Levels:** The simulator treats standard logic signals as valid inputs. Do not apply analog voltages between logic thresholds, as this is purely a digital component.
- **Drive Strength:** In real hardware, buffers increase current drive capability. In simulation, all digital outputs have infinite drive strength by default unless specified otherwise by the pin configuration.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/logic-and-gate" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: AND Gate</a>
  </div>
  <div>
    <a href="/docs/components/logic-clock-generator" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: Clock Generator &rarr;</a>
  </div>
</div>
