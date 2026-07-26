---
title: "Power Supply"
description: "A standalone regulated DC power supply component."
slug: /components/openhw-power-supply
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Power Components">Power Components</a> &gt; 
  <span>Power Supply</span>
</div>

# Power Supply
<p class="subtitle">Provides a stable regulated DC voltage to the circuit with a configurable output (3.3V, 5V, or custom).</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <img src="/images/components/openhw-power-supply.svg" alt="Power Supply" style="width:60px; height:60px;" />
    <span style="font-size:11px;color:var(--vp-c-text-2);">Bench Power Supply</span>
  </div>
  <div class="component-info">
    <p>A standalone regulated DC power supply component. Use it to power components (sensors, displays, motors) that need a dedicated voltage rail independent of the Arduino. The output voltage is configurable via the component attributes.</p>
    <div>
      <span class="tag">Power Components</span>
      <span class="tag">DC</span>
      <span class="tag">Voltage</span>
    </div>
  </div>
</div>

## Overview
A dedicated power supply is necessary when simulating components that draw more current than the Arduino can safely provide (such as motors and relays), or components that require a different voltage level (like 12V or 3.3V).

### Typical Use Cases
- **3.3V**: ESP-series modules, modern sensors, logic level translation.
- **5.0V**: Servo motors, NeoPixels, relay modules, most Arduino shields.
- **12.0V**: DC motors, solenoids, LED strips (non-addressable).

> [!CAUTION]
> **Common Ground:** Always share a common GND between the Power Supply and the Arduino. If they do not share the same ground potential, the circuit signals will be meaningless and the circuit will behave unpredictably.

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">5V</span></td><td><span class="pin-type power">power</span></td><td>Positive voltage output (configurable value, despite the "5V" name).</td></tr>
<tr><td><span class="pin-name">GND</span></td><td><span class="pin-type power">power</span></td><td>Ground reference.</td></tr>
</table>

## Configurable Attributes
<table class="attrs-table">
<tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr>
<tr><td><strong>voltage</strong></td><td><code>number</code></td><td><code>5.0</code></td><td>The output voltage of the supply (e.g., 3.3, 5, 12).</td></tr>
</table>

## Wiring Diagram

Example of connecting the Power Supply to share a common ground with an Arduino Uno while independently powering an external circuit.

<p align="center">
  <img src="/images/components/openhw-power-supply_wiring.png" alt="Wiring Diagram" style="max-width: 100%; border-radius: 8px; margin: 20px 0;" />
</p>

<TryInSimulator />

## Example Arduino Code
A power supply does not require code to function, as it is a passive power source. Your code must simply account for the fact that external components are powered independently.

```cpp
void setup() {
  // A standalone power supply requires no Arduino initialization.
  Serial.begin(9600);
  Serial.println("Circuit powered up.");
}

void loop() {
  // External components powered by this supply can be controlled normally.
}
```

## Simulation Notes
- In the simulator, the text display on the component will update to reflect the `voltage` attribute you set in `diagram.json`.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-potentiometer" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: Rotary Potentiometer</a>
  </div>
  <div>
    <a href="/docs/components/openhw-pushbutton-6mm" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: Pushbutton (6mm) &rarr;</a>
  </div>
</div>
