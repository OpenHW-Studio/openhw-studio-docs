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
      <rect x="5" y="10" width="90" height="20" rx="4" fill="var(--vp-c-bg-soft)" />
      <rect x="15" y="18" width="70" height="4" rx="2" fill="#0f172a" />
      <rect x="50" y="5" width="10" height="30" rx="2" fill="var(--vp-c-text-2)" />
      <line x1="55" y1="10" x2="55" y2="30" stroke="#94a3b8" stroke-width="2" />
    </svg>
    <span style="font-size:11px;color:var(--vp-c-text-2);">Slide Potentiometer</span>
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
