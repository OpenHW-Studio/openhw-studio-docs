---
title: "PIR Motion Sensor"
description: "A Passive Infrared sensor used to detect human or animal movement."
slug: /components/openhw-pir-motion-sensor
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Sensors">Sensors</a> &gt; 
  <span>PIR Motion Sensor</span>
</div>

# PIR Motion Sensor
<p class="subtitle">Detects motion by measuring changes in the infrared (heat) levels emitted by surrounding objects.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <rect x="15" y="15" width="50" height="50" fill="#1e293b" />
      <circle cx="40" cy="40" r="22" fill="#f8fafc" />
      <path d="M 18 40 L 62 40 M 40 18 L 40 62 M 25 25 L 55 55 M 25 55 L 55 25" stroke="#e2e8f0" stroke-width="1" />
      <rect x="25" y="70" width="6" height="10" fill="#cbd5e1" />
      <rect x="37" y="70" width="6" height="10" fill="#cbd5e1" />
      <rect x="49" y="70" width="6" height="10" fill="#cbd5e1" />
    </svg>
    <span style="font-size:11px;color:#4a5568;">HC-SR501</span>
  </div>
  <div class="component-info">
    <p>A PIR (Passive Infrared) sensor consists of a pyroelectric crystal and a faceted Fresnel lens (the white dome). When a warm body like a human or animal moves across its field of view, it detects a sudden change in infrared radiation and pulls its output pin HIGH.</p>
    <div>
      <span class="tag">Sensors</span>
      <span class="tag">Infrared</span>
      <span class="tag">Motion</span>
    </div>
  </div>
</div>

## Overview
Reading a PIR sensor is exactly the same as reading a simple pushbutton. Because it outputs a clear digital signal, you just need to use `digitalRead()`. In real hardware, these modules often have trimpots to adjust sensitivity and hold-time.

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">VCC</span></td><td><span class="pin-type power">power</span></td><td>Power input. Connect to Arduino 5V.</td></tr>
<tr><td><span class="pin-name">OUT</span></td><td><span class="pin-type digital">digital</span></td><td>Digital signal output. HIGH = Motion Detected, LOW = No Motion.</td></tr>
<tr><td><span class="pin-name">GND</span></td><td><span class="pin-type power">power</span></td><td>Ground. Connect to Arduino GND.</td></tr>
</table>

## Configurable Attributes
<table class="attrs-table">
<tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr>
<tr><td><strong>delay</strong></td><td><code>number</code></td><td><code>500</code></td><td>The simulated hold time in milliseconds (how long OUT remains HIGH after motion stops).</td></tr>
</table>

## Wiring Diagram (Arduino Uno)
1. Connect **VCC** to **5V**.
2. Connect **GND** to **GND**.
3. Connect **OUT** to **D2**.

## Example Arduino Code
This code monitors the PIR sensor and turns on the built-in LED (Pin 13) when motion is detected.

```cpp
// Define the pin connections
const int pirPin = 2;     // The digital pin connected to the PIR sensor
const int ledPin = 13;    // The built-in LED on most Arduinos

int motionState = LOW;    // Variable to track the current motion state
int val = 0;              // Variable to read the pin status

void setup() {
  pinMode(pirPin, INPUT);     // Declare the PIR sensor as an INPUT
  pinMode(ledPin, OUTPUT);    // Declare the LED as an OUTPUT
  Serial.begin(9600);         
  Serial.println("System Ready. Waiting for motion...");
}

void loop() {
  val = digitalRead(pirPin);  // Read the current state of the sensor
  
  if (val == HIGH) {          // If the OUT pin is HIGH (motion detected)
    digitalWrite(ledPin, HIGH);  // Turn the LED ON
    
    if (motionState == LOW) {
      // We only want to print once when the motion starts
      Serial.println("🚨 Motion detected!");
      motionState = HIGH;        // Update the state
    }
  } 
  else {                      // If the OUT pin is LOW (no motion)
    digitalWrite(ledPin, LOW);   // Turn the LED OFF
    
    if (motionState == HIGH) {
      // We only want to print once when the motion stops
      Serial.println("Coast is clear.");
      motionState = LOW;         // Update the state
    }
  }
  
  // Small delay to prevent bouncing/jittering
  delay(100);
}
```

## Simulation Notes
- To simulate human motion in your OpenHW Studio circuit, click directly on the white dome of the PIR sensor in the grid during simulation.
- The sensor's internal red LED will light up, and the OUT pin will immediately go HIGH to trigger your Arduino code.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-photoresistor" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: Photoresistor (LDR)</a>
  </div>
  <div>
    <a href="/docs/components/openhw-potentiometer" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: Potentiometer &rarr;</a>
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
