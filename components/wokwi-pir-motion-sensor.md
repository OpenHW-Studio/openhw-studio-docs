---
title: "PIR Motion Sensor"
description: "Passive Infrared sensor for detecting motion."
slug: /components/wokwi-pir-motion-sensor
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Sensors">Sensors</a> &gt; 
  <span>PIR Motion Sensor</span>
</div>

# PIR Motion Sensor
<p class="subtitle">A standard Passive Infrared sensor for detecting motion of humans or animals.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <img src="/images/components/openhw-pir-motion-sensor.svg" alt="PIR Motion Sensor" style="width:140px; height:142px; max-width: 100%; max-height: 200px" />
    <span style="font-size:11px;color:var(--vp-c-text-2);">PIR Sensor</span>
  </div>
  <div class="component-info">
    <p>The PIR (Passive Infrared) motion sensor detects changes in infrared radiation, typically caused by a moving person or animal. When motion is detected, the sensor's output pin goes HIGH.</p>
    <div>
      <span class="tag">Sensors</span>
      <span class="tag">Digital Input</span>
      <span class="tag">Motion</span>
    </div>
  </div>
</div>

## Overview
PIR sensors are commonly used in security systems, automatic lighting, and smart home applications. They are easy to interface with microcontrollers as they provide a simple digital signal (HIGH when motion is detected, LOW otherwise).

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">VCC</span></td><td><span class="pin-type power">power</span></td><td>Power supply (5V).</td></tr>
<tr><td><span class="pin-name">OUT</span></td><td><span class="pin-type digital">digital</span></td><td>Digital output (HIGH = motion detected).</td></tr>
<tr><td><span class="pin-name">GND</span></td><td><span class="pin-type power">power</span></td><td>Ground.</td></tr>
</table>

## Configurable Attributes
<table class="attrs-table">
<tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr>
<tr><td><strong>delay</strong></td><td><code>number</code></td><td><code>500</code></td><td>The time (in milliseconds) the OUT pin stays HIGH after motion stops.</td></tr>
</table>

## Wiring Diagram

<p align="center">
  <img src="/images/components/openhw-pir-motion-sensor_wiring.png" alt="Wiring Diagram" style="max-width: 100%; border-radius: 8px; margin: 20px 0;" />
</p>

<TryInSimulator />

1. Connect **VCC** to 5V.
2. Connect **OUT** to a digital input pin on the Arduino (e.g., D2).
3. Connect **GND** to Ground.

## Example Arduino Code
This example reads the sensor and turns on the built-in LED (pin 13) when motion is detected.

```cpp
#define PIR_PIN 2
#define LED_PIN 13

void setup() {
  pinMode(PIR_PIN, INPUT);
  pinMode(LED_PIN, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int motionState = digitalRead(PIR_PIN);
  
  if (motionState == HIGH) {
    digitalWrite(LED_PIN, HIGH);
    Serial.println("Motion detected!");
  } else {
    digitalWrite(LED_PIN, LOW);
  }
  
  delay(100);
}
```

## Simulation Notes
- In the simulator, click on the PIR sensor to reveal its detection cone. 
- You can drag the blue dot to simulate movement inside the detection zone.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-photoresistor" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: Photoresistor (LDR)</a>
  </div>
  <div>
    <a href="/docs/components/openhw-pushbutton" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: Push Button &rarr;</a>
  </div>
</div>
