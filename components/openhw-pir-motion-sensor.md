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
    <img src="/images/components/openhw-pir-motion-sensor.svg" alt="PIR Motion Sensor" style="width:100px; height:100px; max-width: 100px; max-height: 100px" />
    <span style="font-size:11px;color:var(--vp-c-text-2);">HC-SR501</span>
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
<tr><td><span class="pin-name">+ (VCC)</span></td><td><span class="pin-type power">power</span></td><td>Power input. Connect to Arduino 5V.</td></tr>
<tr><td><span class="pin-name">D (OUT)</span></td><td><span class="pin-type digital">digital</span></td><td>Digital signal output. HIGH = Motion Detected, LOW = No Motion.</td></tr>
<tr><td><span class="pin-name">- (GND)</span></td><td><span class="pin-type power">power</span></td><td>Ground. Connect to Arduino GND.</td></tr>
</table>

## Configurable Attributes
<table class="attrs-table">
<tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr>
<tr><td><strong>delay</strong></td><td><code>number</code></td><td><code>500</code></td><td>The simulated hold time in milliseconds (how long OUT remains HIGH after motion stops).</td></tr>
</table>

## Wiring Diagram (Arduino Uno)
1. Connect **+** to Arduino **5V**.
2. Connect **-** to Arduino **GND**.
3. Connect **D** to Arduino **D2**.

<p align="center">
  <img src="/images/components/openhw-pir-motion-sensor_wiring.png" alt="Wiring Diagram" style="max-width: 100%; border-radius: 8px; margin: 20px 0;" />
</p>

<TryInSimulator />

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
- To simulate human motion in your OpenHW Studio circuit, click directly on the white dome of the PIR sensor and drag around the simulation area. A green/red cone will visualize the motion range and detection status.
- The sensor's OUT pin will go HIGH to trigger your Arduino code as long as motion is detected within its field of view.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-photoresistor" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: Photoresistor (LDR)</a>
  </div>
  <div>
    <a href="/docs/components/openhw-potentiometer" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: Potentiometer &rarr;</a>
  </div>
</div>
