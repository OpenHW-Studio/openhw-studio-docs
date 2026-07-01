---
title: "Soil Moisture Sensor"
description: "An analog sensor that measures the volumetric water content in soil."
slug: /components/openhw-soil-moisture-sensor
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Sensors">Sensors</a> &gt; 
  <span>Soil Moisture Sensor</span>
</div>

# Soil Moisture Sensor
<p class="subtitle">A resistive or capacitive sensor that outputs an analog voltage corresponding to the moisture level of the soil it is inserted into.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="60" height="90" viewBox="0 0 60 90" xmlns="http://www.w3.org/2000/svg">
      <path d="M 20 20 L 40 20 L 40 70 L 30 90 L 20 70 Z" fill="#1e293b" />
      <path d="M 23 25 L 23 68 L 29 80" fill="none" stroke="#fcd34d" stroke-width="2" />
      <path d="M 37 25 L 37 68 L 31 80" fill="none" stroke="#fcd34d" stroke-width="2" />
      <rect x="25" y="10" width="10" height="10" fill="#0f172a" />
      <rect x="20" y="5" width="4" height="5" fill="#cbd5e1" />
      <rect x="28" y="5" width="4" height="5" fill="#cbd5e1" />
      <rect x="36" y="5" width="4" height="5" fill="#cbd5e1" />
    </svg>
    <span style="font-size:11px;color:#4a5568;">Moisture Probe</span>
  </div>
  <div class="component-info">
    <p>Soil moisture sensors are widely used in automated plant watering systems and smart agriculture. They work by measuring the electrical resistance or capacitance of the soil. Wet soil is more conductive than dry soil, resulting in a changing analog voltage output.</p>
    <div>
      <span class="tag">Sensors</span>
      <span class="tag">Analog Input</span>
      <span class="tag">Environment</span>
    </div>
  </div>
</div>

## Overview
While there are digital threshold versions available, the simulated model provides a direct analog read. The output voltage changes based on how much moisture is detected. 
*(Note: Real resistive sensors are prone to corrosion over time, so capacitive sensors are often preferred in permanent installations).*

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">GND</span></td><td><span class="pin-type power">power</span></td><td>Ground.</td></tr>
<tr><td><span class="pin-name">VCC</span></td><td><span class="pin-type power">power</span></td><td>Power Supply (typically 3.3V or 5V).</td></tr>
<tr><td><span class="pin-name">SIG</span></td><td><span class="pin-type analog">analog</span></td><td>Analog Output Signal. Connect to an Arduino analog pin.</td></tr>
</table>

## Configurable Attributes
*This component has no configurable attributes.*

## Wiring Diagram (Arduino Uno)
1. Connect **VCC** to **5V**.
2. Connect **GND** to **GND**.
3. Connect **SIG** to **A0**.

## Example Arduino Code
This standard sketch reads the analog value and prints it to the Serial Monitor. Note that depending on the specific physical module, a higher analog reading might mean *drier* soil, while a lower reading means *wetter* soil (or vice versa).

```cpp
const int sensorPin = A0;

void setup() {
  Serial.begin(9600);
  Serial.println("Soil Moisture Sensor Ready.");
}

void loop() {
  // Read the analog value (0 - 1023)
  int moistureValue = analogRead(sensorPin);
  
  Serial.print("Moisture Level: ");
  Serial.println(moistureValue);
  
  // Basic threshold example
  if(moistureValue < 300) {
    Serial.println("-> Status: Very Dry (Water needed!)");
  } else if (moistureValue > 700) {
    Serial.println("-> Status: Very Wet");
  }
  
  delay(1000);
}
```

## Simulation Notes
- In the simulator, you can interact with the sensor by clicking on it and dragging the slider to simulate different soil moisture levels (dry to wet).

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-slide-switch" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: Slide Switch</a>
  </div>
  <div>
    <a href="/docs/components/openhw-sph0645" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: SPH0645 I2S Microphone &rarr;</a>
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
