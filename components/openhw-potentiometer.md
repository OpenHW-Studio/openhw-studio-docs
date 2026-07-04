---
title: "Rotary Potentiometer"
description: "An adjustable resistor module with a rotary dial."
slug: /components/openhw-potentiometer
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Sensors">Sensors</a> &gt; 
  <span>Rotary Potentiometer</span>
</div>

# Rotary Potentiometer
<p class="subtitle">A classic adjustable resistor module that outputs a variable analog voltage.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <img src="/images/components/openhw-potentiometer.svg" alt="Potentiometer" style="width:120px; height:120px; max-width: 120px; max-height: 120px" />
    <span style="font-size:11px;color:var(--vp-c-text-2);">Rotary Potentiometer</span>
  </div>
  <div class="component-info">
    <p>A potentiometer is a three-terminal resistor with a sliding or rotating contact that forms an adjustable voltage divider. This module is pre-mounted on a breakout board with clearly labeled pins, making it incredibly easy to wire up to an Arduino for analog input reading, such as for volume control or adjusting motor speed.</p>
    <div>
      <span class="tag">Sensors</span>
      <span class="tag">Analog</span>
      <span class="tag">Input</span>
    </div>
  </div>
</div>

## Overview
Inside the potentiometer is a resistive track. The middle pin connects to a wiper that slides along this track when you turn the knob. By connecting the outer pins to Power and Ground, the wiper outputs a voltage proportional to its position, which can be read using `analogRead()`.

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">GND</span></td><td><span class="pin-type power">power</span></td><td>Ground. Connect to Arduino GND.</td></tr>
<tr><td><span class="pin-name">SIG</span></td><td><span class="pin-type analog">analog</span></td><td>Signal output. Connect to an analog input (e.g., A0).</td></tr>
<tr><td><span class="pin-name">VCC</span></td><td><span class="pin-type power">power</span></td><td>Power input. Connect to Arduino 5V.</td></tr>
</table>

## Configurable Attributes
<table class="attrs-table">
<tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr>
<tr><td><strong>value</strong></td><td><code>number</code></td><td><code>50</code></td><td>The simulated knob position percentage (0-100).</td></tr>
</table>

## Wiring Diagram (Arduino Uno)
1. Connect **VCC** to Arduino **5V**.
2. Connect **GND** to Arduino **GND**.
3. Connect **SIG** to Arduino **A0**.

<p align="center">
  <img src="/images/components/openhw-potentiometer_wiring.png" alt="Wiring Diagram" style="max-width: 100%; border-radius: 8px; margin: 20px 0;" />
</p>

<TryInSimulator />

## Example Arduino Code
This simple sketch reads the analog value from the potentiometer and prints it to the Serial Monitor.

```cpp
const int potPin = A0;

void setup() {
  Serial.begin(9600);
}

void loop() {
  // Read the analog value (0-1023)
  int potValue = analogRead(potPin);
  
  // Calculate percentage
  int percentage = map(potValue, 0, 1023, 0, 100);
  
  Serial.print("Raw Value: ");
  Serial.print(potValue);
  Serial.print(" | Percentage: ");
  Serial.print(percentage);
  Serial.println("%");
  
  delay(100);
}
```

## Simulation Notes
- In the simulator, click and drag the gray knob in a circular motion to adjust the value. 
- A glowing yellow halo will appear when the knob is active.
- Turning the knob changes the simulated resistance instantly, updating the voltage on the `SIG` pin.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-pir-motion-sensor" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: PIR Motion Sensor</a>
  </div>
  <div>
    <a href="/docs/components/openhw-relay-module" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: Relay Module &rarr;</a>
  </div>
</div>
