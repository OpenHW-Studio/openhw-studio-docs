---
title: "Motor Driver (L298N)"
description: "Dual H-bridge L298N motor driver module for controlling DC or stepper motors."
slug: /components/openhw-motor-driver
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Actuators">Actuators</a> &gt; 
  <span>Motor Driver (L298N)</span>
</div>

# Motor Driver (L298N)
<p class="subtitle">A robust dual H-bridge motor driver capable of controlling the speed and direction of two DC motors simultaneously.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <img src="/images/components/openhw-motor-driver.svg" alt="L298N Motor Driver" style="width:100px; height:100px; max-width: 150px; max-height: 150px" />
    <span style="font-size:11px;color:var(--vp-c-text-2);">L298N Module</span>
  </div>
  <div class="component-info">
    <p>The L298N is a high-current dual H-bridge motor driver. It allows an Arduino (which can only output tiny amounts of current) to control the heavy current required to drive two DC motors or one bipolar stepper motor in both forward and reverse directions.</p>
    <div>
      <span class="tag">Actuators</span>
      <span class="tag">Motor Control</span>
      <span class="tag">H-Bridge</span>
    </div>
  </div>
</div>

## Overview
Because microcontrollers cannot provide enough current to drive motors directly, you must use a driver. The L298N acts as a heavy-duty switch, toggling the motor power supply on and off based on low-current signals from the Arduino. It also supports PWM input to control motor speed.

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">ENA</span></td><td><span class="pin-type digital">digital</span></td><td>Enable A. Connect to a PWM pin to control the speed of Motor A.</td></tr>
<tr><td><span class="pin-name">IN1</span></td><td><span class="pin-type digital">digital</span></td><td>Input 1 for Motor A direction control.</td></tr>
<tr><td><span class="pin-name">IN2</span></td><td><span class="pin-type digital">digital</span></td><td>Input 2 for Motor A direction control.</td></tr>
<tr><td><span class="pin-name">IN3</span></td><td><span class="pin-type digital">digital</span></td><td>Input 3 for Motor B direction control.</td></tr>
<tr><td><span class="pin-name">IN4</span></td><td><span class="pin-type digital">digital</span></td><td>Input 4 for Motor B direction control.</td></tr>
<tr><td><span class="pin-name">ENB</span></td><td><span class="pin-type digital">digital</span></td><td>Enable B. Connect to a PWM pin to control the speed of Motor B.</td></tr>
<tr><td><span class="pin-name">OUT1</span></td><td><span class="pin-type power">power</span></td><td>Motor A output terminal 1.</td></tr>
<tr><td><span class="pin-name">OUT2</span></td><td><span class="pin-type power">power</span></td><td>Motor A output terminal 2.</td></tr>
<tr><td><span class="pin-name">OUT3</span></td><td><span class="pin-type power">power</span></td><td>Motor B output terminal 1.</td></tr>
<tr><td><span class="pin-name">OUT4</span></td><td><span class="pin-type power">power</span></td><td>Motor B output terminal 2.</td></tr>
<tr><td><span class="pin-name">12V</span></td><td><span class="pin-type power">power</span></td><td>External motor power supply (typically 6V to 12V).</td></tr>
<tr><td><span class="pin-name">GND</span></td><td><span class="pin-type power">power</span></td><td>Ground. Connect to external battery GND and Arduino GND.</td></tr>
<tr><td><span class="pin-name">5V</span></td><td><span class="pin-type power">power</span></td><td>5V Out. Can be used to power the Arduino if the 12V supply is active.</td></tr>
</table>

## Configurable Attributes
*This component has no standard configurable attributes.*

## Wiring Diagram (Single Motor)

This diagram shows how to wire a single DC motor to the L298N.

<p align="center">
  <img src="/images/components/openhw-motor-driver_wiring.png" alt="Wiring Diagram" style="max-width: 100%; border-radius: 8px; margin: 20px 0;" />
</p>

<TryInSimulator />

## Example Arduino Code
This code accelerates a DC Motor on channel A forward, stops it, and runs it in reverse.

```cpp
// Motor A connections
int enA = 9;
int in1 = 8;
int in2 = 7;

void setup() {
  // Set all the motor control pins to outputs
  pinMode(enA, OUTPUT);
  pinMode(in1, OUTPUT);
  pinMode(in2, OUTPUT);
  
  // Turn off motor initially
  digitalWrite(in1, LOW);
  digitalWrite(in2, LOW);
}

void loop() {
  // Set Motor A forward
  digitalWrite(in1, HIGH);
  digitalWrite(in2, LOW);
  
  // Set speed out of possible range 0~255
  analogWrite(enA, 200);
  delay(2000);
  
  // Stop the motor
  digitalWrite(in1, LOW);
  digitalWrite(in2, LOW);
  delay(1000);
  
  // Set Motor A reverse
  digitalWrite(in1, LOW);
  digitalWrite(in2, HIGH);
  
  // Set speed
  analogWrite(enA, 200);
  delay(2000);
  
  // Stop again
  digitalWrite(in1, LOW);
  digitalWrite(in2, LOW);
  delay(1000);
}
```

## Simulation Notes
- In the simulator, the physical rotation of attached DC motors will visually reflect the PWM duty cycle applied to `ENA` / `ENB`.
- It is critical to share a common GND between the Arduino and the L298N module.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-mfrc522" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: MFRC522 RFID</a>
  </div>
  <div>
    <a href="/docs/components/openhw-motor" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: DC Motor &rarr;</a>
  </div>
</div>
