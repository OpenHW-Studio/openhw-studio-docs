---
title: "Photoresistor (LDR)"
description: "A light-dependent resistor whose resistance decreases as light intensity increases."
slug: /components/openhw-photoresistor
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Sensors">Sensors</a> &gt; 
  <span>Photoresistor (LDR)</span>
</div>

# Photoresistor (LDR)
<p class="subtitle">A passive two-terminal component (Light Dependent Resistor) used to detect light levels in the environment.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="60" height="90" viewBox="0 0 60 90" xmlns="http://www.w3.org/2000/svg">
      <circle cx="30" cy="30" r="20" fill="#f8fafc" stroke="#94a3b8" stroke-width="2" />
      <path d="M 15 30 Q 20 20 30 25 T 45 30" fill="none" stroke="#ef4444" stroke-width="2" />
      <path d="M 15 35 Q 20 25 30 30 T 45 35" fill="none" stroke="#ef4444" stroke-width="2" />
      <path d="M 22 50 L 22 90" stroke="#94a3b8" stroke-width="2" />
      <path d="M 38 50 L 38 90" stroke="#94a3b8" stroke-width="2" />
    </svg>
    <span style="font-size:11px;color:#4a5568;">LDR</span>
  </div>
  <div class="component-info">
    <p>A photoresistor (or LDR) changes its electrical resistance based on the amount of light falling on its surface. In total darkness, it has a very high resistance (often >1MΩ), while in bright light, its resistance drops significantly. It is commonly used in voltage divider circuits to measure ambient light levels.</p>
    <div>
      <span class="tag">Sensors</span>
      <span class="tag">Passive</span>
      <span class="tag">Analog</span>
    </div>
  </div>
</div>

## Overview
Because it is a passive resistor, the LDR has no polarity (it can be plugged in either way). To read it with an Arduino, you must build a **voltage divider** circuit by pairing it with a standard fixed resistor (typically 10kΩ).

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">P1</span></td><td><span class="pin-type passive">passive</span></td><td>Terminal 1. Connects to 5V (or GND).</td></tr>
<tr><td><span class="pin-name">P2</span></td><td><span class="pin-type passive">passive</span></td><td>Terminal 2. Connects to the analog pin and the pull-down resistor.</td></tr>
</table>

## Configurable Attributes
<table class="attrs-table">
<tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr>
<tr><td><strong>lux</strong></td><td><code>number</code></td><td><code>100</code></td><td>The initial simulated light intensity in lux.</td></tr>
<tr><td><strong>gamma</strong></td><td><code>number</code></td><td><code>0.7</code></td><td>Logarithmic characteristic of the LDR material.</td></tr>
<tr><td><strong>r10</strong></td><td><code>number</code></td><td><code>10000</code></td><td>Resistance (in ohms) of the LDR at 10 lux.</td></tr>
</table>

## Wiring Diagram (Voltage Divider)
1. Connect **Terminal 1** of the LDR to Arduino **5V**.
2. Connect **Terminal 2** of the LDR to Arduino **A0**.
3. Connect a **10kΩ Resistor** from Arduino **A0** to Arduino **GND**.

*(This creates a voltage divider where the voltage at A0 rises as the light gets brighter).*

## Example Arduino Code
This code reads the analog voltage from the divider circuit.

```cpp
const int ldrPin = A0;

void setup() {
  Serial.begin(9600);
  Serial.println("Starting LDR reading...");
}

void loop() {
  // Read the analog value (0-1023)
  int sensorValue = analogRead(ldrPin);
  
  Serial.print("Light Level: ");
  Serial.print(sensorValue);
  
  // Basic threshold logic
  if (sensorValue < 300) {
    Serial.println(" (Dark)");
  } else if (sensorValue < 700) {
    Serial.println(" (Moderate)");
  } else {
    Serial.println(" (Bright)");
  }
  
  delay(500);
}
```

## Simulation Notes
- You can manually change the simulated light intensity (`lux`) by right-clicking the LDR on the breadboard during simulation. 

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-nrf24l01" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: nRF24L01+ Transceiver</a>
  </div>
  <div>
    <a href="/docs/components/openhw-pir-sensor" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: PIR Motion Sensor &rarr;</a>
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
