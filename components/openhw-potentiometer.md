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
      <rect x="15" y="60" width="4" height="15" fill="var(--vp-c-text-2)" />
      <rect x="28" y="60" width="4" height="15" fill="var(--vp-c-text-2)" />
      <rect x="41" y="60" width="4" height="15" fill="var(--vp-c-text-2)" />
      <text x="17" y="85" fill="var(--vp-c-text-2)" font-family="monospace" font-size="8" text-anchor="middle">1</text>
      <text x="30" y="85" fill="var(--vp-c-text-2)" font-family="monospace" font-size="8" text-anchor="middle">S</text>
      <text x="43" y="85" fill="var(--vp-c-text-2)" font-family="monospace" font-size="8" text-anchor="middle">2</text>
    </svg>
    <span style="font-size:11px;color:var(--vp-c-text-2);">Rotary Pot</span>
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
