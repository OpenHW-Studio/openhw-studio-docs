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
    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <rect x="25" y="25" width="70" height="70" rx="4" fill="#004d40" stroke="#00251a" stroke-width="2" />
      <rect x="45" y="25" width="30" height="15" fill="#94a3b8" />
      <rect x="52" y="20" width="16" height="5" fill="#475569" />
      <rect x="40" y="60" width="20" height="20" fill="#1e293b" />
      <circle cx="75" cy="65" r="3" fill="#ef4444" />
      <circle cx="75" cy="75" r="3" fill="#22c55e" />
      <circle cx="35" cy="85" r="2.5" fill="#eab308" />
      <circle cx="85" cy="85" r="2.5" fill="#eab308" />
      <circle cx="35" cy="35" r="2.5" fill="#eab308" />
      <circle cx="85" cy="35" r="2.5" fill="#eab308" />
      <text x="60" y="105" fill="#ffffff" font-family="monospace" font-size="8" font-weight="bold" text-anchor="middle">TP4056</text>
    </svg>
    <span style="font-size:11px;color:#4a5568;">TP4056 Module</span>
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
<tr><td><span class="pin-name">BAT-</span></td><td><span class="pin-type power">power</span></td><td>Battery negative terminal. Connect to the GND pin of a Li-ion Battery component.</td></tr>
</table>

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
