---
title: "Linear (Slide) Potentiometer"
description: "A linear slide potentiometer that outputs a variable analog voltage based on slider position."
slug: /components/openhw-slide-potentiometer
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Sensors">Sensors</a> &gt; 
  <span>Linear Potentiometer</span>
</div>

# Linear Potentiometer
<p class="subtitle">A linear slider that functions as a variable voltage divider, outputting an analog signal based on the slider's physical position.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="100" height="40" viewBox="0 0 100 40" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="10" width="90" height="20" rx="4" fill="#1e293b" />
      <rect x="15" y="18" width="70" height="4" rx="2" fill="#0f172a" />
      <rect x="50" y="5" width="10" height="30" rx="2" fill="#cbd5e1" />
      <line x1="55" y1="10" x2="55" y2="30" stroke="#94a3b8" stroke-width="2" />
    </svg>
    <span style="font-size:11px;color:#4a5568;">Slide Potentiometer</span>
  </div>
  <div class="component-info">
    <p>A linear slide potentiometer outputs a variable analog voltage as the slider moves along a linear track from one end (GND) to the other (VCC). It is commonly used for volume faders, position sensing, and Human-Machine Interface (HMI) controls.</p>
    <div>
      <span class="tag">Sensors</span>
      <span class="tag">Analog Input</span>
      <span class="tag">Variable Resistor</span>
    </div>
  </div>
</div>

## Overview
The slide potentiometer acts exactly like a rotary potentiometer, just in a linear physical format. By connecting the two outer pins to VCC and GND, the middle wiper pin outputs a voltage proportional to the slider's position.

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">VCC</span></td><td><span class="pin-type power">power</span></td><td>5V Power Supply.</td></tr>
<tr><td><span class="pin-name">SIG</span></td><td><span class="pin-type analog">analog</span></td><td>Analog output signal (Wiper). Connect to an Arduino analog pin.</td></tr>
<tr><td><span class="pin-name">GND</span></td><td><span class="pin-type power">power</span></td><td>Ground.</td></tr>
</table>
*(Note: VCC and GND are interchangeable, swapping them simply reverses the output direction).*

## Configurable Attributes
<table class="attrs-table">
<tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr>
<tr><td><strong>value</strong></td><td><code>number</code></td><td><code>50</code></td><td>Slider position as a percentage (0 = GND end, 100 = VCC end).</td></tr>
</table>

## Wiring Diagram (Arduino Uno)
1. Connect **VCC** to **5V**.
2. Connect **GND** to **GND**.
3. Connect **SIG** to **A0**.

## Example Arduino Code
This code initializes the analog pin, reads the raw 10-bit value, and converts it into a percentage for easier reading.

```cpp
const int slidePin = A0;

void setup() {
  Serial.begin(9600);
  Serial.println("Slide Potentiometer Ready");
}

void loop() {
  // Read the raw analog value (0 - 1023)
  int rawValue = analogRead(slidePin);
  
  // Convert to a percentage (0 - 100%)
  float percentage = (rawValue / 1023.0) * 100.0;
  
  Serial.print("Slider Position: ");
  Serial.print(percentage, 1);
  Serial.println("%");
  
  delay(100);
}
```

## Simulation Notes
- During simulation, drag the slider handle left/right on the canvas (while running) or use the right-click context menu to set the position numerically.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-simulation-monitor" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: Simulation Monitor</a>
  </div>
  <div>
    <a href="/docs/components/openhw-slide-switch" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: Slide Switch &rarr;</a>
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
