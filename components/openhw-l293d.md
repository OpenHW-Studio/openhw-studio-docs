---
title: "Motor Driver (L293D)"
description: "A popular dual H-bridge motor driver IC for controlling DC motors."
slug: /components/openhw-l293d
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Actuators">Actuators</a> &gt; 
  <span>Motor Driver (L293D)</span>
</div>

# Motor Driver (L293D)
<p class="subtitle">A dual H-bridge motor driver IC capable of driving two DC motors bidirectionally or one bipolar stepper motor.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <rect x="25" y="20" width="70" height="80" rx="3" fill="var(--vp-c-bg-soft)" />
      <circle cx="60" cy="30" r="4" fill="#0f172a" />
      <path d="M 50 20 Q 60 30 70 20" fill="#0f172a" />
      <text x="60" y="65" fill="var(--vp-c-text-2)" font-family="monospace" font-size="12" font-weight="bold" transform="rotate(90, 60, 60)" text-anchor="middle">L293D</text>
      <rect x="15" y="25" width="10" height="4" fill="var(--vp-c-text-2)" />
      <rect x="15" y="35" width="10" height="4" fill="var(--vp-c-text-2)" />
      <rect x="15" y="45" width="10" height="4" fill="var(--vp-c-text-2)" />
      <rect x="15" y="55" width="10" height="4" fill="var(--vp-c-text-2)" />
      <rect x="15" y="65" width="10" height="4" fill="var(--vp-c-text-2)" />
      <rect x="15" y="75" width="10" height="4" fill="var(--vp-c-text-2)" />
      <rect x="15" y="85" width="10" height="4" fill="var(--vp-c-text-2)" />
      <rect x="15" y="95" width="10" height="4" fill="var(--vp-c-text-2)" />
      <rect x="95" y="25" width="10" height="4" fill="var(--vp-c-text-2)" />
      <rect x="95" y="35" width="10" height="4" fill="var(--vp-c-text-2)" />
      <rect x="95" y="45" width="10" height="4" fill="var(--vp-c-text-2)" />
      <rect x="95" y="55" width="10" height="4" fill="var(--vp-c-text-2)" />
      <rect x="95" y="65" width="10" height="4" fill="var(--vp-c-text-2)" />
      <rect x="95" y="75" width="10" height="4" fill="var(--vp-c-text-2)" />
      <rect x="95" y="85" width="10" height="4" fill="var(--vp-c-text-2)" />
      <rect x="95" y="95" width="10" height="4" fill="var(--vp-c-text-2)" />
    </svg>
    <span style="font-size:11px;color:var(--vp-c-text-2);">L293D IC</span>
  </div>
  <div class="component-info">
    <p>The L293D is an integrated circuit motor driver that can be used for simultaneous, bidirectional control of two DC motors. It contains two built-in H-bridges and internal flyback diodes to protect your microcontroller.</p>
    <div>
      <span class="tag">Actuators</span>
      <span class="tag">Driver</span>
      <span class="tag">IC</span>
    </div>
  </div>
</div>

## Overview
Microcontrollers like the Arduino cannot output enough current to drive motors directly. The L293D acts as an amplifier: it takes low-current control signals from the Arduino and uses them to switch a higher-current power supply dedicated to the motors.

## Pin Reference
*(Note: Pin numbering starts top-left at the notch and goes down, then up the right side).*

<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">EN1,2</span></td><td><span class="pin-type digital">digital</span></td><td>Enable pin for Motor 1. High = ON, Low = OFF. (PWM for speed control).</td></tr>
<tr><td><span class="pin-name">IN1</span></td><td><span class="pin-type digital">digital</span></td><td>Input 1 for Motor 1 direction control.</td></tr>
<tr><td><span class="pin-name">OUT1</span></td><td><span class="pin-type digital">digital</span></td><td>Output 1. Connect to motor 1 terminal A.</td></tr>
<tr><td><span class="pin-name">GND1/2</span></td><td><span class="pin-type power">power</span></td><td>Ground. Connect to Arduino GND and battery GND.</td></tr>
<tr><td><span class="pin-name">OUT2</span></td><td><span class="pin-type digital">digital</span></td><td>Output 2. Connect to motor 1 terminal B.</td></tr>
<tr><td><span class="pin-name">IN2</span></td><td><span class="pin-type digital">digital</span></td><td>Input 2 for Motor 1 direction control.</td></tr>
<tr><td><span class="pin-name">VCC2</span></td><td><span class="pin-type power">power</span></td><td>Motor Power (Vs). Connect to battery positive (up to 36V).</td></tr>
<tr><td><span class="pin-name">VCC1</span></td><td><span class="pin-type power">power</span></td><td>Logic Power (Vss). Connect to Arduino 5V.</td></tr>
<tr><td><span class="pin-name">IN4</span></td><td><span class="pin-type digital">digital</span></td><td>Input 4 for Motor 2 direction control.</td></tr>
<tr><td><span class="pin-name">OUT4</span></td><td><span class="pin-type digital">digital</span></td><td>Output 4. Connect to motor 2 terminal B.</td></tr>
<tr><td><span class="pin-name">GND3/4</span></td><td><span class="pin-type power">power</span></td><td>Ground. Connect to Arduino GND and battery GND.</td></tr>
<tr><td><span class="pin-name">OUT3</span></td><td><span class="pin-type digital">digital</span></td><td>Output 3. Connect to motor 2 terminal A.</td></tr>
<tr><td><span class="pin-name">IN3</span></td><td><span class="pin-type digital">digital</span></td><td>Input 3 for Motor 2 direction control.</td></tr>
<tr><td><span class="pin-name">EN3,4</span></td><td><span class="pin-type digital">digital</span></td><td>Enable pin for Motor 2. (PWM for speed control).</td></tr>
</table>

## Configurable Attributes
*This component has no standard configurable attributes.*

## Working Principle (H-Bridge)
An H-Bridge allows voltage to be applied across a load in either direction. 
- If `IN1` is HIGH and `IN2` is LOW, the motor spins Forward.
- If `IN1` is LOW and `IN2` is HIGH, the motor spins Backward.
- If both are LOW, the motor stops.
- Applying a PWM signal to `EN1,2` pulses the power rapidly, changing the motor's average speed.

## Wiring Diagram (Single Motor)
1. Connect **VCC1** to Arduino 5V and **GNDs** to Ground.
2. Connect **VCC2** to a 9V Battery Positive (+).
3. Connect **EN1,2** to Arduino D9 (PWM).
4. Connect **IN1** to Arduino D8.
5. Connect **IN2** to Arduino D7.
6. Connect **OUT1** and **OUT2** to the two terminals of your DC motor.

## Example Arduino Code
This code drives a single motor forward, then backward, then stops.

```cpp
const int enA = 9;
const int in1 = 8;
const int in2 = 7;

void setup() {
  pinMode(enA, OUTPUT);
  pinMode(in1, OUTPUT);
  pinMode(in2, OUTPUT);
}

void loop() {
  // Full speed forward
  digitalWrite(in1, HIGH);
  digitalWrite(in2, LOW);
  analogWrite(enA, 255); 
  delay(2000);
  
  // Full speed backward
  digitalWrite(in1, LOW);
  digitalWrite(in2, HIGH);
  analogWrite(enA, 255);
  delay(2000);
  
  // Stop
  digitalWrite(in1, LOW);
  digitalWrite(in2, LOW);
  delay(2000);
}
```

## Simulation Notes
- The L293D perfectly simulates H-bridge logic. If you wire the VCC2 pin incorrectly, the motors will not spin.
- The motors in the simulation will display their RPM, allowing you to visually verify speed control via PWM.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-ks2e-m-dc5" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: KS2E-M Relay</a>
  </div>
  <div>
    <a href="/docs/components/openhw-lcd1602" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: LCD 16x2 &rarr;</a>
  </div>
</div>
