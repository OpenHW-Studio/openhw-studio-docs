---
title: "Servo Motor"
description: "A hobby servo motor that provides precise angular position control from 0° to 180°."
slug: /components/openhw-servo
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Actuators">Actuators</a> &gt; 
  <span>Servo Motor</span>
</div>

# Servo Motor
<p class="subtitle">An actuator that uses a feedback loop for precise angular position control, typically across a 180° range.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <img src="/images/components/openhw-servo.svg" alt="Servo Motor" style="width:250px; height:150px; max-width: 250px; max-height: 150px" />
    <span style="font-size:11px;color:var(--vp-c-text-2);">Standard Servo</span>
  </div>
  <div class="component-info">
    <p>A hobby servo motor provides precise angular position control. The position is controlled by sending a specific PWM signal to the control wire. Using the Arduino Servo library simplifies this process down to passing an angle (0 to 180).</p>
    <div>
      <span class="tag">Actuators</span>
      <span class="tag">Motor</span>
      <span class="tag">PWM</span>
    </div>
  </div>
</div>

## Overview
The servo motor uses an internal potentiometer and control circuit to form a feedback loop. When you tell it to go to an angle, it turns the motor until the potentiometer reads the correct voltage for that angle.

### PWM Timing
The servo expects a pulse every 20ms (50Hz). The length of the pulse determines the position:
- **1.0 ms:** 0° (Minimum angle)
- **1.5 ms:** 90° (Center position)
- **2.0 ms:** 180° (Maximum angle)

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">GND</span></td><td><span class="pin-type power">power</span></td><td>Ground (Usually Brown or Black wire).</td></tr>
<tr><td><span class="pin-name">V+</span></td><td><span class="pin-type power">power</span></td><td>5V Supply (Usually Red wire).</td></tr>
<tr><td><span class="pin-name">PWM</span></td><td><span class="pin-type digital">digital</span></td><td>PWM Control Signal (Usually Orange, Yellow, or White wire).</td></tr>
</table>

## Configurable Attributes
<table class="attrs-table">
<tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr>
<tr><td><strong>angle</strong></td><td><code>number</code></td><td><code>0</code></td><td>Initial angle of the servo motor (0 to 180).</td></tr>
<tr><td><strong>horn-color</strong></td><td><code>string</code></td><td><code>"white"</code></td><td>Color of the servo horn.</td></tr>
</table>

## Wiring Diagram (Arduino Uno)

<p align="center">
  <img src="/images/components/openhw-servo_wiring.png" alt="Wiring Diagram" style="max-width: 100%; border-radius: 8px; margin: 20px 0;" />
</p>

<TryInSimulator />

*(Note: In real hardware, servos can draw significant current, so a dedicated external 5V power supply is often required if you are using multiple servos or a heavy load).*

## Example Arduino Code
This example uses the built-in `Servo` library to sweep the motor back and forth.

```cpp
#include <Servo.h>

Servo myServo;

void setup() {
  myServo.attach(9); // Attach servo to pin 9
  Serial.begin(9600);
  Serial.println("Servo Motor Ready");
}

void loop() {
  // Sweep from 0 to 180 degrees
  for (int pos = 0; pos <= 180; pos += 1) {
    myServo.write(pos);
    delay(15);
  }
  
  delay(1000);
  
  // Sweep from 180 to 0 degrees
  for (int pos = 180; pos >= 0; pos -= 1) {
    myServo.write(pos);
    delay(15);
  }
  
  delay(1000);
}
```

## Simulation Notes
- Right-click the servo on the canvas during simulation to manually set the angle via the context menu slider. This allows you to verify behavior without waiting for your code to sweep the full range.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-sd-card" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: MicroSD Card Module</a>
  </div>
  <div>
    <a href="/docs/components/openhw-simulation-monitor" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: Simulation Monitor &rarr;</a>
  </div>
</div>
