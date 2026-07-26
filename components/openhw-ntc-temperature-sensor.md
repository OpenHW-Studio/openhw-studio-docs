---
title: "NTC Temperature Sensor"
description: "A simple NTC thermistor module for basic temperature sensing."
slug: /components/openhw-ntc-temperature-sensor
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Sensors">Sensors</a> &gt; 
  <span>NTC Temperature Sensor</span>
</div>

# NTC Temperature Sensor
<p class="subtitle">A basic 3-pin NTC thermistor module for measuring ambient temperature.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <img src="/images/components/openhw-ntc-temperature-sensor.svg" alt="NTC Temperature Sensor" style="width:135px; height:71px; max-width: 135px; max-height: 71px" />
    <span style="font-size:11px;color:var(--vp-c-text-2);">NTC Module</span>
  </div>
  <div class="component-info">
    <p>This simple module uses an NTC (Negative Temperature Coefficient) thermistor. Its resistance decreases as the temperature rises. When connected as a voltage divider, it provides an analog voltage output that can be read by a microcontroller to determine the temperature.</p>
    <div>
      <span class="tag">Sensors</span>
      <span class="tag">Temperature</span>
      <span class="tag">Analog</span>
    </div>
  </div>
</div>

## Overview
Unlike more complex modules with onboard comparators, this is a straightforward analog sensor. It's perfect for simple climate monitoring applications where you only need to read the ambient temperature using an analog pin (ADC).

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">S</span></td><td><span class="pin-type analog">analog</span></td><td>Signal Output. Outputs an analog voltage proportional to temperature.</td></tr>
<tr><td><span class="pin-name">(Center)</span></td><td><span class="pin-type power">power</span></td><td>Power Supply. Connect to Arduino 5V.</td></tr>
<tr><td><span class="pin-name">-</span></td><td><span class="pin-type power">power</span></td><td>Ground. Connect to Arduino GND.</td></tr>
</table>

## Configurable Attributes
<table class="attrs-table">
<tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr>
<tr><td><strong>temperature</strong></td><td><code>number</code></td><td><code>25</code></td><td>The simulated environmental temperature in Celsius.</td></tr>
</table>

## Wiring Diagram (Arduino Uno)
1. Connect **S** to Arduino **A0**.
2. Connect the **center pin** to Arduino **5V**.
3. Connect **-** to Arduino **GND**.

<p align="center">
  <img src="/images/components/openhw-ntc-temperature-sensor_wiring.png" alt="Wiring Diagram" style="max-width: 100%; border-radius: 8px; margin: 20px 0;" />
</p>

<TryInSimulator />

## Example Arduino Code

```cpp
const int analogPin = A0;

void setup() {
  Serial.begin(9600);
}

void loop() {
  int sensorValue = analogRead(analogPin);
  Serial.print("Analog Reading: ");
  Serial.println(sensorValue);
  delay(500);
}
```

## Simulation Notes
- In the simulator, right-click the sensor to open its context menu and adjust the simulated temperature.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-mq2-gas-sensor" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: MQ-2 Gas Sensor</a>
  </div>
  <div>
    <a href="/docs/components/openhw-ntc-thermistor" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: NTC Thermistor Module &rarr;</a>
  </div>
</div>
