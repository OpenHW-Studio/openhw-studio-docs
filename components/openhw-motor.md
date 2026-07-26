---
title: "DC Motor"
description: "A standard DC motor that converts electrical energy into rotational mechanical motion."
slug: /components/openhw-motor
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Actuators">Actuators</a> &gt; 
  <span>DC Motor</span>
</div>

# DC Motor
<p class="subtitle">Converts electrical energy to rotational motion. Can be driven forwards or backwards depending on polarity.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <img src="/images/components/openhw-motor.svg" alt="DC Motor" style="width:200px; height:100px; max-width: 200px; max-height: 100px" />
    <span style="font-size:11px;color:var(--vp-c-text-2);">DC Motor</span>
  </div>
  <div class="component-info">
    <p>A DC motor converts electrical energy into rotational mechanical motion. The direction of spin is determined by current polarity across its terminals. It requires an H-bridge motor driver (e.g., L298N) for safe operation from an Arduino — never connect directly to an Arduino pin.</p>
    <div>
      <span class="tag">Actuators</span>
      <span class="tag">Motor</span>
      <span class="tag">Output</span>
    </div>
  </div>
</div>

## Overview
The DC Motor requires an external power source and a motor driver to be controlled by a microcontroller. It uses a simple two-wire connection. Depending on which wire is positive and which is negative, the motor will spin either forward or backward.

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">1</span></td><td><span class="pin-type power">power</span></td><td>Motor Terminal 1 (usually Red wire).</td></tr>
<tr><td><span class="pin-name">2</span></td><td><span class="pin-type power">power</span></td><td>Motor Terminal 2 (usually Black wire).</td></tr>
</table>

## Configurable Attributes
*This component has no standard configurable attributes.*

## Wiring Diagram

Typical wiring for a DC Motor using an L298N motor driver module with an Arduino Uno. Note that the OpenHW Simulator handles basic autowiring for this module.

<p align="center">
  <img src="/images/components/openhw-motor_wiring.png" alt="Wiring Diagram" style="max-width: 100%; border-radius: 8px; margin: 20px 0;" />
</p>

<TryInSimulator />

> [!TIP]
> **Real Hardware Tip:** Always add a flyback diode (e.g., 1N4007) across motor terminals to protect against inductive voltage spikes when building physical circuits.

## Example Arduino Code
This basic sketch demonstrates how to control the DC motor's direction and speed using an L298N driver.

```cpp
// Define driver pins
#define ENA 5   // PWM speed control
#define IN1 6   // Direction pin 1
#define IN2 7   // Direction pin 2

void setup() {
  // Set all motor control pins to outputs
  pinMode(ENA, OUTPUT);
  pinMode(IN1, OUTPUT);
  pinMode(IN2, OUTPUT);
}

void loop() {
  // Move Forward at 50% speed (128 out of 255)
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);
  analogWrite(ENA, 128);
  delay(2000);
  
  // Coast (Brake)
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, LOW);
  analogWrite(ENA, 0);
  delay(1000);
  
  // Move Reverse at 100% speed
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, HIGH);
  analogWrite(ENA, 255);
  delay(2000);
  
  // Coast (Brake)
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, LOW);
  analogWrite(ENA, 0);
  delay(1000);
}
```

## Simulation Notes
- The visual rotation of the motor shaft is proportional to the voltage applied across its terminals.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-motor-driver" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: Motor Driver (L298N)</a>
  </div>
  <div>
    <a href="/docs/components/openhw-mpu6050" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: MPU6050 IMU &rarr;</a>
  </div>
</div>
