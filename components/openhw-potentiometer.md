---
title: "Rotary Potentiometer"
description: "A rotary potentiometer (variable resistor) that outputs an analog voltage proportional to rotation angle."
slug: /components/openhw-potentiometer
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Sensors">Sensors</a> &gt; 
  <span>Rotary Potentiometer</span>
</div>

# Rotary Potentiometer
<p class="subtitle">A classic knob that acts as an adjustable voltage divider, outputting an analog voltage between 0V and VCC.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="60" height="90" viewBox="0 0 60 90" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="25" width="40" height="35" rx="4" fill="#334155" />
      <circle cx="30" cy="40" r="14" fill="#0f172a" />
      <path d="M 30 40 L 30 28" stroke="#f8fafc" stroke-width="2" />
      <rect x="15" y="60" width="4" height="15" fill="#cbd5e1" />
      <rect x="28" y="60" width="4" height="15" fill="#cbd5e1" />
      <rect x="41" y="60" width="4" height="15" fill="#cbd5e1" />
      <text x="17" y="85" fill="#94a3b8" font-family="monospace" font-size="8" text-anchor="middle">1</text>
      <text x="30" y="85" fill="#94a3b8" font-family="monospace" font-size="8" text-anchor="middle">S</text>
      <text x="43" y="85" fill="#94a3b8" font-family="monospace" font-size="8" text-anchor="middle">2</text>
    </svg>
    <span style="font-size:11px;color:#4a5568;">Rotary Pot</span>
  </div>
  <div class="component-info">
    <p>A rotary potentiometer (pot) is a variable resistor. By connecting the two outer pins to VCC and GND, the middle pin outputs a voltage proportional to the knob's physical rotation. Read it using Arduino's `analogRead()` function to get a digital value from 0 to 1023.</p>
    <div>
      <span class="tag">Sensors</span>
      <span class="tag">Analog Input</span>
      <span class="tag">Variable Resistor</span>
    </div>
  </div>
</div>

## Overview
Inside the potentiometer is a resistive track. As you turn the knob, a "wiper" moves along this track, changing the resistance between the middle pin and the two outer pins. It functions effectively as an adjustable voltage divider.

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">1</span></td><td><span class="pin-type power">power</span></td><td>Terminal 1. Connect to Arduino GND (or 5V).</td></tr>
<tr><td><span class="pin-name">SIG</span></td><td><span class="pin-type analog">analog</span></td><td>Wiper output. Connect to an Arduino analog pin (e.g., A0).</td></tr>
<tr><td><span class="pin-name">2</span></td><td><span class="pin-type power">power</span></td><td>Terminal 2. Connect to Arduino 5V (or GND).</td></tr>
</table>
*(Note: Swapping pins 1 and 2 simply reverses the direction of the knob).*

## Configurable Attributes
<table class="attrs-table">
<tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr>
<tr><td><strong>value</strong></td><td><code>number</code></td><td><code>50</code></td><td>Initial knob position as a percentage (0 = GND end, 100 = VCC end).</td></tr>
</table>

## Wiring Diagram
1. Connect **Pin 1** to Arduino **GND**.
2. Connect **Pin 2** to Arduino **5V**.
3. Connect **SIG** to Arduino **A0**.

## Example Arduino Code
This standard code block initializes the analog pin, reads the raw 10-bit value, and maps it to a percentage and voltage.

```cpp
const int potPin = A0;

void setup() {
  Serial.begin(9600);
  Serial.println("Potentiometer Ready");
}

void loop() {
  // Read the raw analog value (0 - 1023)
  int rawValue = analogRead(potPin);
  
  // Calculate voltage (assuming 5V reference)
  float voltage = rawValue * (5.0 / 1023.0);
  
  // Map to a percentage
  int percent = map(rawValue, 0, 1023, 0, 100);
  
  Serial.print("Raw: "); 
  Serial.print(rawValue);
  Serial.print("\tVoltage: "); 
  Serial.print(voltage, 2);
  Serial.print("V\tPosition: "); 
  Serial.print(percent);
  Serial.println("%");
  
  delay(200);
}
```

## Simulation Notes
- During simulation in OpenHW Studio, click and drag the knob on the canvas to rotate it, or right-click the potentiometer and use the context menu slider to precisely set the knob position in real time.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-pir-sensor" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: PIR Motion Sensor</a>
  </div>
  <div>
    <a href="/docs/components/openhw-power-supply" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: Power Supply &rarr;</a>
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
