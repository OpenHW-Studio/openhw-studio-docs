---
title: "Li-ion Battery"
description: "A standard rechargeable 3.7V Lithium-ion cell."
slug: /components/openhw-battery
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Power%20Components">Power Components</a> &gt; 
  <span>Li-ion Battery</span>
</div>

# Li-ion Battery
<p class="subtitle">A standard 3.7V Lithium-ion battery cell used for powering portable and high-current projects.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <rect x="35" y="25" width="50" height="70" rx="4" fill="#1d4ed8" stroke="#1e3a8a" stroke-width="2" />
      <rect x="50" y="15" width="20" height="10" rx="2" fill="#94a3b8" />
      <rect x="35" y="40" width="50" height="40" fill="#e2e8f0" />
      <text x="60" y="55" fill="#000000" font-family="monospace" font-size="12" font-weight="bold" text-anchor="middle">3.7V</text>
      <text x="60" y="70" fill="#000000" font-family="monospace" font-size="10" text-anchor="middle">Li-ion</text>
      <circle cx="60" cy="32" r="3" fill="#e2e8f0" />
      <circle cx="60" cy="88" r="3" fill="#e2e8f0" />
      <path d="M 57 32 L 63 32 M 60 29 L 60 35" stroke="#1d4ed8" stroke-width="1.5" />
      <path d="M 57 88 L 63 88" stroke="#1e3a8a" stroke-width="1.5" />
    </svg>
    <span style="font-size:11px;color:#4a5568;">18650 Cell</span>
  </div>
  <div class="component-info">
    <p>Lithium-ion batteries offer incredible energy density, making them the standard choice for portable robotics, drones, and IoT devices. A single cell operates nominally at 3.7V, peaking at 4.2V when fully charged and dropping to around 3.0V when empty.</p>
    <div>
      <span class="tag">Power Components</span>
      <span class="tag">Energy</span>
      <span class="tag">Portable</span>
    </div>
  </div>
</div>

## Overview
Unlike standard 1.5V alkaline AA batteries, Li-ion cells provide enough voltage (3.7V) to power 3.3V logic systems natively (like ESP32 or 3.3V Arduino boards) using a simple linear regulator, and they can deliver massive amounts of current for motors.

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">VCC (+)</span></td><td><span class="pin-type power">power</span></td><td>Positive terminal. Outputs the current battery voltage (3.0V - 4.2V).</td></tr>
<tr><td><span class="pin-name">GND (-)</span></td><td><span class="pin-type power">power</span></td><td>Negative terminal. Ground reference.</td></tr>
</table>

## Configurable Attributes
<table class="attrs-table">
<tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr>
<tr><td><strong>capacityMah</strong></td><td><code>number</code></td><td><code>2000</code></td><td>Total maximum charge capacity of the battery in mAh.</td></tr>
<tr><td><strong>currentChargeMah</strong></td><td><code>number</code></td><td><code>2000</code></td><td>The current remaining charge in the battery in mAh.</td></tr>
<tr><td><strong>nominalVoltage</strong></td><td><code>number</code></td><td><code>3.7</code></td><td>The nominal voltage rating of the cell.</td></tr>
</table>

## Working Principle
In the simulator, the Li-ion battery acts as an ideal voltage source that drops its voltage dynamically as the `currentChargeMah` depletes, matching a typical Li-ion discharge curve. If it drops below 3.0V, it stops providing useful power until recharged.

## Wiring Diagram
1. Connect **VCC** to the `VIN` or power input of your microcontroller or motor driver.
2. Connect **GND** to the ground of your circuit.
3. *Warning: Do not connect a 3.7V Li-ion battery directly to the 5V pin of an Arduino Uno, as the Uno requires 5V to run stably. You must use a boost converter, or power the Uno via the VIN pin with two cells in series (7.4V).*

## Example Arduino Code
```cpp
// Reading the battery voltage via a voltage divider (assuming a 1:2 divider on A0)
const int batteryPin = A0;

void setup() {
  Serial.begin(9600);
}

void loop() {
  int rawADC = analogRead(batteryPin);
  
  // Calculate voltage: (ADC / 1023) * 5.0V * 2 (multiplier for the 1:2 divider)
  float voltage = (rawADC / 1023.0) * 5.0 * 2.0; 
  
  Serial.print("Battery Voltage: ");
  Serial.print(voltage);
  Serial.println(" V");
  
  if(voltage < 3.2) {
    Serial.println("WARNING: Low Battery!");
  }
  
  delay(1000);
}
```

## Simulation Notes
- You can simulate a charging circuit by providing a higher voltage to the VCC pin (e.g., via the `TP4056` charger module component), which will slowly increase `currentChargeMah` over time.
- The battery tracks the current draw of all components connected to it and depletes appropriately in real time.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-attiny85" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: ATtiny85 Board</a>
  </div>
  <div>
    <a href="/docs/components/openhw-biaxial-stepper" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: Biaxial Stepper &rarr;</a>
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
