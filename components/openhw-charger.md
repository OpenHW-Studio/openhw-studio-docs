---
title: "Li-ion Charger Module"
description: "A TP4056-based charging module for single-cell lithium batteries."
slug: /components/openhw-charger
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Power%20Components">Power Components</a> &gt; 
  <span>Li-ion Charger Module</span>
</div>

# Li-ion Charger Module
<p class="subtitle">A complete constant-current/constant-voltage linear charger for single-cell lithium-ion batteries.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <img src="/images/components/openhw-charger.svg" alt="Li-ion Charger" style="width:160px; height:100px; max-width: 200px; max-height: 150px" />
    <span style="font-size:11px;color:var(--vp-c-text-2);">TP4056 Module</span>
  </div>
  <div class="component-info">
    <p>This module typically uses the TP4056 chip to safely charge a standard 3.7V Li-ion or Li-Po battery. It takes 5V power (either from a USB input or direct wire) and carefully manages the charging curve up to a maximum of 4.2V, cutting off automatically when full.</p>
    <div>
      <span class="tag">Power Components</span>
      <span class="tag">Charging</span>
      <span class="tag">TP4056</span>
    </div>
  </div>
</div>

## Overview
Rechargeable batteries require precise charging curves to prevent overheating or explosion. You cannot simply attach 5V to a Li-ion battery. This module acts as the middleman to handle the complex charging logic safely.

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">IN+</span></td><td><span class="pin-type power">power</span></td><td>Power input. Connect to a 5V source (like a solar panel or wall adapter).</td></tr>
<tr><td><span class="pin-name">IN-</span></td><td><span class="pin-type power">power</span></td><td>Ground input. Connect to the power source ground.</td></tr>
<tr><td><span class="pin-name">BAT+</span></td><td><span class="pin-type power">power</span></td><td>Battery positive terminal. Connect to the VCC pin of a Li-ion Battery component.</td></tr>
<tr><td><span class="pin-name">B-</span></td><td><span class="pin-type power">power</span></td><td>Connects to the negative terminal of the Li-ion battery.</td></tr>
</table>

## Wiring Diagram

<p align="center">
  <img src="/images/components/openhw-charger_wiring.png" alt="Wiring Diagram" style="max-width: 100%; border-radius: 8px; margin: 20px 0;" />
</p>

<TryInSimulator />

## Configurable Attributes
<table class="attrs-table">
<tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr>
<tr><td><strong>chargeCurrentMa</strong></td><td><code>number</code></td><td><code>1000</code></td><td>The simulated charging rate in mA. Defaults to 1A (1000mA).</td></tr>
</table>

## Working Principle
In the simulator, when 5V is applied to `IN+`/`IN-`, the module will output a charging voltage to `BAT+`/`BAT-`. If connected to a simulated Li-ion battery, the battery's `currentChargeMah` will steadily increase over time based on the `chargeCurrentMa` rate, until it reaches its maximum capacity.

## Wiring Diagram
1. Connect a 5V power source (e.g., from a simulated wall adapter or generator) to `IN+` and `IN-`.
2. Connect a simulated **Li-ion Battery** to `BAT+` and `BAT-`.
3. If the battery supports a load (like an ESP32), connect the ESP32 directly to the battery in parallel with the charger.

## Example Arduino Code
*The charger is entirely self-contained and operates purely via hardware physics. It does not require code to run.*

If you wish to monitor it using an Arduino, you can read the battery voltage via an analog pin:

```cpp
const int monitorPin = A0;

void setup() {
  Serial.begin(9600);
}

void loop() {
  // Simple voltage divider assuming 5V logic
  float voltage = analogRead(monitorPin) * (5.0 / 1023.0);
  
  if (voltage > 4.15) {
    Serial.println("Battery Fully Charged!");
  } else if (voltage < 3.2) {
    Serial.println("Battery Low!");
  } else {
    Serial.println("Battery Charging...");
  }
  
  delay(2000);
}
```

## Simulation Notes
- The physical module often features red (charging) and green/blue (full) LEDs. In the simulator, the module tracks the battery state and updates its visual LEDs appropriately.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-cc1101" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: CC1101</a>
  </div>
  <div>
    <a href="/docs/components/openhw-dht22" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: DHT22 &rarr;</a>
  </div>
</div>
