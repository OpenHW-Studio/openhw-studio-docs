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
    <img src="/images/components/openhw-battery.svg" alt="Li-ion Battery" style="width:120px; height:120px; max-width: 150px; max-height: 150px" />
    <span style="font-size:11px;color:var(--vp-c-text-2);">18650 Cell</span>
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

<p align="center">
  <img src="/images/components/openhw-battery_wiring.png" alt="Wiring Diagram" style="max-width: 100%; border-radius: 8px; margin: 20px 0;" />
</p>

<TryInSimulator />

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
