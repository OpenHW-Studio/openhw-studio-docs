---
title: "Soil Moisture Sensor"
description: "A capacitive sensor for measuring the moisture level in soil."
slug: /components/openhw-soil-moisture-sensor
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Sensors">Sensors</a> &gt; 
  <span>Soil Moisture Sensor</span>
</div>

# Capacitive Soil Moisture Sensor
<p class="subtitle">An analog sensor that measures the dielectric constant of the surrounding soil to determine its moisture content.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <img src="/images/components/openhw-soil-moisture-sensor.svg" alt="Soil Moisture Sensor" style="width:220px; height:70px; max-width: 220px; max-height: 70px" />
    <span style="font-size:11px;color:var(--vp-c-text-2);">Capacitive Sensor</span>
  </div>
  <div class="component-info">
    <p>Unlike resistive sensors that are prone to corrosion, a capacitive soil moisture sensor uses capacitance changes to measure water content. It has no exposed metal on the probe itself, making it highly durable for long-term plant monitoring and automated irrigation systems.</p>
    <div>
      <span class="tag">Sensors</span>
      <span class="tag">Analog</span>
      <span class="tag">Environmental</span>
    </div>
  </div>
</div>

## Overview
The sensor outputs an analog voltage on its `AOUT` pin. As the moisture level in the soil increases, the capacitance of the sensor increases, which typically results in a *lower* voltage output. Conversely, dry soil results in a *higher* voltage output.

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">GND</span></td><td><span class="pin-type power">power</span></td><td>Ground connection. Connect to Arduino GND.</td></tr>
<tr><td><span class="pin-name">VCC</span></td><td><span class="pin-type power">power</span></td><td>Power input. Supports 3.3V to 5V.</td></tr>
<tr><td><span class="pin-name">AOUT</span></td><td><span class="pin-type analog">analog</span></td><td>Analog output voltage. Connect to an analog pin (e.g., A0).</td></tr>
</table>

## Configurable Attributes
<table class="attrs-table">
<tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr>
<tr><td><strong>moisture</strong></td><td><code>number</code></td><td><code>50</code></td><td>The simulated soil moisture percentage (0 = completely dry, 100 = completely submerged).</td></tr>
</table>

## Wiring Diagram (Arduino Uno)
1. Connect **VCC** to Arduino **5V**.
2. Connect **GND** to Arduino **GND**.
3. Connect **AOUT** to Arduino **A0**.

<p align="center">
  <img src="/images/components/openhw-soil-moisture-sensor_wiring.png" alt="Wiring Diagram" style="max-width: 100%; border-radius: 8px; margin: 20px 0;" />
</p>

<TryInSimulator />

## Example Arduino Code
This sketch reads the analog value and maps it to a human-readable 0-100% moisture scale. Note that the raw values for "dry" and "wet" might need calibration based on your specific sensor module in real life.

```cpp
const int sensorPin = A0;

// Calibration values (you may need to tweak these for your physical sensor)
const int dryValue = 850;  // Value in completely dry air/soil
const int wetValue = 400;  // Value when fully submerged in water

void setup() {
  Serial.begin(9600);
}

void loop() {
  int rawValue = analogRead(sensorPin);
  
  // Constrain the value just in case it drifts outside our calibration limits
  int clampedValue = constrain(rawValue, wetValue, dryValue);
  
  // Map the raw value to a percentage (inverted, because lower value = wetter)
  int moisturePercent = map(clampedValue, dryValue, wetValue, 0, 100);
  
  Serial.print("Raw: ");
  Serial.print(rawValue);
  Serial.print("  |  Moisture: ");
  Serial.print(moisturePercent);
  Serial.println("%");
  
  delay(1000);
}
```

## Simulation Notes
- In the simulator, a visual blue overlay on the probe head indicates the current moisture level setting.
- You can right-click the component and use the slider in the context menu to adjust the simulated moisture level from 0% (Dry) to 100% (Submerged).
- As the moisture increases, the output voltage on the `AOUT` pin decreases.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-slide-potentiometer" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: Linear Slide Potentiometer</a>
  </div>
  <div>
    <a href="/docs/components/openhw-sound-sensor" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: Sound Sensor &rarr;</a>
  </div>
</div>
