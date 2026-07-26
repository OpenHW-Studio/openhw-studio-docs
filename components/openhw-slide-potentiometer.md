---
title: "Linear Slide Potentiometer"
description: "A linear adjustable resistor module with a sliding fader."
slug: /components/openhw-slide-potentiometer
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Sensors">Sensors</a> &gt; 
  <span>Linear Slide Potentiometer</span>
</div>

# Linear Slide Potentiometer
<p class="subtitle">An adjustable resistor module that outputs a variable analog voltage based on linear position.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <img src="/images/components/openhw-slide-potentiometer.svg" alt="Linear Slide Potentiometer" style="width:150px; height:70px; max-width: 150px; max-height: 70px" />
    <span style="font-size:11px;color:var(--vp-c-text-2);">Slide Potentiometer</span>
  </div>
  <div class="component-info">
    <p>A slide potentiometer (often called a fader or slider) works exactly like a rotary potentiometer, but features a straight linear track instead of a circular one. Moving the knob left or right along the track adjusts the resistance linearly, changing the output voltage on the signal pin.</p>
    <div>
      <span class="tag">Sensors</span>
      <span class="tag">Analog</span>
      <span class="tag">Input</span>
    </div>
  </div>
</div>

## Overview
Because this slider provides analog output, it's perfect for projects requiring precise, continuous linear control like audio mixing desks, robotic arm positioning, or adjusting the brightness of an LED strip. The outer pins connect to Power and Ground, while the middle pin acts as the wiper.

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">VCC</span></td><td><span class="pin-type power">power</span></td><td>Power input. Connect to Arduino 5V.</td></tr>
<tr><td><span class="pin-name">GND</span></td><td><span class="pin-type power">power</span></td><td>Ground. Connect to Arduino GND.</td></tr>
<tr><td><span class="pin-name">SIG</span></td><td><span class="pin-type analog">analog</span></td><td>Signal output. Connect to an analog input (e.g., A0).</td></tr>
</table>

## Configurable Attributes
<table class="attrs-table">
<tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr>
<tr><td><strong>value</strong></td><td><code>number</code></td><td><code>50</code></td><td>The simulated knob position percentage (0-100).</td></tr>
</table>

## Wiring Diagram (Arduino Uno)
1. Connect the **VCC** pin on the slider to Arduino **5V**.
2. Connect the **GND** pin to Arduino **GND**.
3. Connect the **SIG** (Wiper) pin to Arduino **A0**.

<p align="center">
  <img src="/images/components/openhw-slide-potentiometer_wiring.png" alt="Wiring Diagram" style="max-width: 100%; border-radius: 8px; margin: 20px 0;" />
</p>

<TryInSimulator />

## Example Arduino Code
This sketch reads the analog value from the slide potentiometer and maps it to a 0-100% scale for easy reading.

```cpp
const int slidePin = A0;

void setup() {
  Serial.begin(9600);
}

void loop() {
  // Read the analog value (0-1023)
  int slideValue = analogRead(slidePin);
  
  // Calculate percentage
  int percentage = map(slideValue, 0, 1023, 0, 100);
  
  Serial.print("Raw Slider Value: ");
  Serial.print(slideValue);
  Serial.print(" | Position: ");
  Serial.print(percentage);
  Serial.println("%");
  
  delay(100);
}
```

## Simulation Notes
- In the simulator, click and drag the dark grey fader knob left and right to adjust the value. 
- Moving the knob changes the simulated resistance instantly, updating the voltage on the `SIG` pin in real-time.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-sd-card" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: MicroSD Card Module</a>
  </div>
  <div>
    <a href="/docs/components/openhw-servo-motor" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: Servo Motor &rarr;</a>
  </div>
</div>
