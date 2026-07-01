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
    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="30" width="100" height="40" rx="4" fill="#1e40af" />
      <circle cx="35" cy="50" r="15" fill="#94a3b8" />
      <circle cx="35" cy="50" r="10" fill="#cbd5e1" />
      <circle cx="85" cy="50" r="15" fill="#94a3b8" />
      <circle cx="85" cy="50" r="10" fill="#cbd5e1" />
      <text x="35" y="40" fill="#1e293b" font-family="sans-serif" font-size="8" font-weight="bold" text-anchor="middle">T</text>
      <text x="85" y="40" fill="#1e293b" font-family="sans-serif" font-size="8" font-weight="bold" text-anchor="middle">R</text>
      <rect x="42" y="70" width="6" height="15" fill="#94a3b8" />
      <rect x="54" y="70" width="6" height="15" fill="#94a3b8" />
      <rect x="66" y="70" width="6" height="15" fill="#94a3b8" />
      <rect x="78" y="70" width="6" height="15" fill="#94a3b8" />
      <text x="60" y="25" fill="#1e40af" font-family="monospace" font-size="10" font-weight="bold" text-anchor="middle">HC-SR04</text>
    </svg>
    <span style="font-size:11px;color:#4a5568;">Ultrasonic Sensor</span>
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
