---
title: "MQ-2 Gas Sensor"
description: "A sensitive gas sensor module capable of detecting LPG, smoke, and combustible gases."
slug: /components/openhw-mq2-gas-sensor
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Sensors">Sensors</a> &gt; 
  <span>MQ-2 Gas Sensor</span>
</div>

# MQ-2 Gas Sensor
<p class="subtitle">An analog and digital gas sensor module used for detecting smoke and combustible gases in the air.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="80" height="100" viewBox="0 0 80 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="15" y="40" width="50" height="40" rx="4" fill="#1e293b" />
      <circle cx="40" cy="30" r="20" fill="#94a3b8" />
      <circle cx="40" cy="30" r="16" fill="#0f172a" />
      <path d="M 28 22 L 52 38 M 28 38 L 52 22 M 28 30 L 52 30 M 40 18 L 40 42" stroke="#475569" stroke-width="1" />
      <rect x="25" y="80" width="4" height="15" fill="#cbd5e1" />
      <rect x="35" y="80" width="4" height="15" fill="#cbd5e1" />
      <rect x="45" y="80" width="4" height="15" fill="#cbd5e1" />
      <rect x="55" y="80" width="4" height="15" fill="#cbd5e1" />
      <text x="27" y="75" fill="#f8fafc" font-family="monospace" font-size="6" text-anchor="middle" transform="rotate(-90, 27, 75)">VCC</text>
      <text x="37" y="75" fill="#f8fafc" font-family="monospace" font-size="6" text-anchor="middle" transform="rotate(-90, 37, 75)">GND</text>
      <text x="47" y="75" fill="#f8fafc" font-family="monospace" font-size="6" text-anchor="middle" transform="rotate(-90, 47, 75)">D0</text>
      <text x="57" y="75" fill="#f8fafc" font-family="monospace" font-size="6" text-anchor="middle" transform="rotate(-90, 57, 75)">A0</text>
    </svg>
    <span style="font-size:11px;color:#4a5568;">MQ-2 Module</span>
  </div>
  <div class="component-info">
    <p>The MQ-2 is a versatile gas sensor capable of detecting LPG, smoke, alcohol, propane, hydrogen, methane and carbon monoxide concentrations anywhere from 200 to 10000 ppm. It provides both an analog output (proportional to gas concentration) and a digital output (triggered when a threshold is exceeded).</p>
    <div>
      <span class="tag">Sensors</span>
      <span class="tag">Gas</span>
      <span class="tag">Analog</span>
    </div>
  </div>
</div>

## Overview
Inside the MQ-2 is a small heater that must warm up before the sensor can take accurate readings (in real life, this takes a few minutes). The electrical resistance of the sensor drops in the presence of target gases. The breakout board includes an LM393 comparator to provide a clean boolean digital output.

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">VCC</span></td><td><span class="pin-type power">power</span></td><td>Power Supply. Connect to Arduino 5V.</td></tr>
<tr><td><span class="pin-name">GND</span></td><td><span class="pin-type power">power</span></td><td>Ground. Connect to Arduino GND.</td></tr>
<tr><td><span class="pin-name">D0</span></td><td><span class="pin-type digital">digital</span></td><td>Digital Output. Goes LOW when gas concentration exceeds the set threshold.</td></tr>
<tr><td><span class="pin-name">A0</span></td><td><span class="pin-type analog">analog</span></td><td>Analog Output. Outputs a voltage (0-5V) proportional to the gas concentration.</td></tr>
</table>

## Configurable Attributes
<table class="attrs-table">
<tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr>
<tr><td><strong>threshold</strong></td><td><code>number</code></td><td><code>300</code></td><td>The internal comparator threshold (0-1023) at which D0 goes LOW.</td></tr>
</table>

## Wiring Diagram
1. Connect **VCC** to Arduino **5V**.
2. Connect **GND** to Arduino **GND**.
3. Connect **A0** to Arduino **A0** (to read concentration).
4. Connect **D0** to Arduino **D2** (to read the trigger state).

## Example Arduino Code
This sketch reads both the analog and digital outputs simultaneously. The analog output provides a raw concentration value, while the digital output acts as a simple boolean trigger.

```cpp
// Define Sensor Pins
const int analogPin = A0;  // Analog pin for raw reading
const int digitalPin = 2;  // Digital pin for threshold reading

void setup() {
  pinMode(digitalPin, INPUT); // Set digital pin as input
  Serial.begin(9600);         // Start serial monitor
  Serial.println("MQ-2 Heating up... (Wait 20s in real life)");
}

void loop() {
  // Read the raw analog gas concentration value (0 to 1023)
  int gasLevel = analogRead(analogPin);
  
  // Read the boolean digital threshold state
  // LOW means the gas concentration is above the danger threshold!
  int dangerLevel = digitalRead(digitalPin);
  
  Serial.print("Raw Gas PPM Value: ");
  Serial.print(gasLevel);
  
  if (dangerLevel == LOW) {
    Serial.println(" --- ⚠️ DANGER: HIGH GAS DETECTED!");
  } else {
    Serial.println(" --- Environment Safe.");
  }
  
  delay(1000); // Read every second
}
```

## Simulation Notes
- The analog value generated in the simulator will default to a clean "air" reading. You can adjust the simulated gas concentration using the sensor's context menu.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-mpu6050" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: MPU6050 IMU</a>
  </div>
  <div>
    <a href="/docs/components/openhw-neopixel-matrix" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: NeoPixel Matrix &rarr;</a>
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
