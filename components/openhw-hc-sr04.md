---
title: "HC-SR04 Ultrasonic Sensor"
description: "A popular ultrasonic distance sensor that measures distances from 2cm to 400cm."
slug: /components/openhw-hc-sr04
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Sensors">Sensors</a> &gt; 
  <span>HC-SR04 Ultrasonic Sensor</span>
</div>

# HC-SR04 Ultrasonic Sensor
<p class="subtitle">A highly accurate non-contact distance measurement module using 40kHz ultrasound.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <img src="/images/components/openhw-hc-sr04.svg" alt="HC-SR04 Sensor" style="width:172.5px; height:114px; max-width: 172.5px; max-height: 114px" />
    <span style="font-size:11px;color:var(--vp-c-text-2);">Ultrasonic Sensor</span>
  </div>
  <div class="component-info">
    <p>The HC-SR04 uses sonar to determine distance to an object like bats do. It offers excellent non-contact range detection with high accuracy and stable readings in an easy-to-use package.</p>
    <div>
      <span class="tag">Sensors</span>
      <span class="tag">Ultrasonic</span>
      <span class="tag">Digital</span>
    </div>
  </div>
</div>

## Overview
The HC-SR04 operates by sending a 40kHz ultrasound signal and measuring the time it takes for the echo to return. It has a range of 2cm to 400cm and requires two digital pins (one for Trigger, one for Echo).

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">VCC</span></td><td><span class="pin-type power">power</span></td><td>5V Power Supply.</td></tr>
<tr><td><span class="pin-name">Trig</span></td><td><span class="pin-type digital">digital</span></td><td>Trigger input. Needs a 10µs HIGH pulse to start a measurement.</td></tr>
<tr><td><span class="pin-name">Echo</span></td><td><span class="pin-type digital">digital</span></td><td>Echo output. Pulses HIGH for a duration proportional to the distance.</td></tr>
<tr><td><span class="pin-name">GND</span></td><td><span class="pin-type power">power</span></td><td>Ground.</td></tr>
</table>

## Configurable Attributes
<table class="attrs-table">
<tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr>
<tr><td><strong>distance</strong></td><td><code>number</code></td><td><code>100</code></td><td>The simulated distance in centimeters. Adjustable via the context menu.</td></tr>
</table>

## Working Principle
1. You apply a 10 microsecond HIGH pulse to the **Trig** pin.
2. The module automatically sends eight 40kHz acoustic bursts and forces the **Echo** pin HIGH.
3. When the acoustic signal reflects back and is detected by the receiver, the **Echo** pin goes LOW.
4. Your code measures how long the **Echo** pin remained HIGH and calculates the distance using the speed of sound.

## Wiring Diagram
1. Connect **VCC** to 5V.
2. Connect **GND** to Ground.
3. Connect **Trig** to a digital output pin (e.g., D3).
4. Connect **Echo** to a digital input pin (e.g., D4).

<p align="center">
  <img src="/images/components/openhw-hc-sr04_wiring.png" alt="Wiring Diagram" style="max-width: 100%; border-radius: 8px; margin: 20px 0;" />
</p>

<TryInSimulator />

## Example Arduino Code
This standard code block initializes the HC-SR04, triggers a pulse, measures the echo, and calculates the distance.

```cpp
#define TRIG_PIN 3
#define ECHO_PIN 4

void setup() {
  Serial.begin(9600);
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  Serial.println("HC-SR04 Sensor Ready");
}

void loop() {
  // Clear the trigger
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  
  // Send 10 microsecond pulse
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);
  
  // Read echo duration
  long duration = pulseIn(ECHO_PIN, HIGH);
  
  // Calculate distance in cm and inches
  // Speed of sound = 340 m/s or 29 microseconds per cm
  // We divide by 2 because the sound travels out and back
  float cm = (duration / 2.0) / 29.1;
  float inch = (duration / 2.0) / 74.0;
  
  Serial.print("Distance: ");
  Serial.print(cm, 1);
  Serial.print(" cm | ");
  Serial.print(inch, 1);
  Serial.println(" in");
  
  delay(500);
}
```

## Simulation Notes
- In OpenHW Studio, you can right-click the sensor during simulation to drag a slider and change the distance in real-time. The simulator instantly adjusts the `pulseIn` echo duration based on the simulated distance.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-esp32" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: ESP32</a>
  </div>
  <div>
    <a href="/docs/components/openhw-hp4067" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: HP4067 Multiplexer &rarr;</a>
  </div>
</div>
