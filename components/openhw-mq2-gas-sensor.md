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
    <img src="/images/components/openhw-mq2-gas-sensor.svg" alt="MQ-2 Gas Sensor" style="width:137px; height:60px; max-width: 137px; max-height: 60px" />
    <span style="font-size:11px;color:var(--vp-c-text-2);">MQ-2 Module</span>
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

<p align="center">
  <img src="/images/components/openhw-mq2-gas-sensor_wiring.png" alt="Wiring Diagram" style="max-width: 100%; border-radius: 8px; margin: 20px 0;" />
</p>

<TryInSimulator />

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
