---
title: "A4988 Stepper Motor Driver"
description: "A popular microstepping driver for controlling bipolar stepper motors."
slug: /components/openhw-a4988
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Actuators">Actuators</a> &gt; 
  <span>A4988 Stepper Driver</span>
</div>

# A4988 Stepper Motor Driver
<p class="subtitle">A widely-used microstepping driver module for controlling bipolar stepper motors precisely.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <img src="/images/components/openhw-a4988.svg" alt="A4988 Stepper Driver" style="width:120px; height:75px; max-width: 150px; max-height: 150px" />
    <span style="font-size:11px;color:var(--vp-c-text-2);">A4988 Module</span>
  </div>
  <div class="component-info">
    <p>The A4988 is a microstepping motor driver with a built-in translator. It allows you to control a complex bipolar stepper motor using just two pins from your microcontroller: one for controlling rotational direction, and one for stepping.</p>
    <div>
      <span class="tag">Actuators</span>
      <span class="tag">Motor Driver</span>
      <span class="tag">Stepper</span>
    </div>
  </div>
</div>

## Overview
Stepper motors require specific sequences of high-current pulses to rotate. The A4988 driver handles this heavy lifting. By providing it with a motor power supply and logic signals, it safely drives the motor coils and even allows for "microstepping" (subdividing a single step into smaller steps for smoother motion).

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">VMOT</span></td><td><span class="pin-type power">power</span></td><td>Motor power supply (8V - 35V).</td></tr>
<tr><td><span class="pin-name">GND_MOT</span></td><td><span class="pin-type power">power</span></td><td>Motor ground.</td></tr>
<tr><td><span class="pin-name">VDD</span></td><td><span class="pin-type power">power</span></td><td>Logic power supply (3.3V or 5V).</td></tr>
<tr><td><span class="pin-name">GND_LOGIC</span></td><td><span class="pin-type power">power</span></td><td>Logic ground. (Should be tied to Motor ground).</td></tr>
<tr><td><span class="pin-name">1A, 1B</span></td><td><span class="pin-type analog">analog</span></td><td>Connect to Coil 1 of the stepper motor.</td></tr>
<tr><td><span class="pin-name">2A, 2B</span></td><td><span class="pin-type analog">analog</span></td><td>Connect to Coil 2 of the stepper motor.</td></tr>
<tr><td><span class="pin-name">STEP</span></td><td><span class="pin-type digital">digital</span></td><td>Step input. A LOW-to-HIGH transition advances the motor one step.</td></tr>
<tr><td><span class="pin-name">DIR</span></td><td><span class="pin-type digital">digital</span></td><td>Direction input. HIGH = Clockwise, LOW = Counter-Clockwise.</td></tr>
<tr><td><span class="pin-name">ENABLE</span></td><td><span class="pin-type digital">digital</span></td><td>Active LOW. Enables the driver outputs. Usually tied to GND or left floating (internal pull-down).</td></tr>
<tr><td><span class="pin-name">RESET</span></td><td><span class="pin-type digital">digital</span></td><td>Active LOW. Resets the internal logic. Usually tied to SLEEP.</td></tr>
<tr><td><span class="pin-name">SLEEP</span></td><td><span class="pin-type digital">digital</span></td><td>Active LOW. Puts the driver to sleep. Usually tied to RESET.</td></tr>
<tr><td><span class="pin-name">MS1, MS2, MS3</span></td><td><span class="pin-type digital">digital</span></td><td>Microstepping resolution pins.</td></tr>
</table>

## Configurable Attributes
*This component currently has no configurable attributes in the simulator.*

## Working Principle
The A4988 reads the `DIR` pin to determine which way to sequence the coils. Every time the `STEP` pin receives a rising edge (goes from `LOW` to `HIGH`), the internal translator advances the motor's coils to the next position in the sequence, rotating the motor shaft by a small, precise angle.

## Wiring Diagram

Connect the A4988 to the Arduino, your stepper motor, and an external power supply.

<p align="center">
  <img src="/images/components/openhw-a4988_wiring.png" alt="Wiring Diagram" style="max-width: 100%; border-radius: 8px; margin: 20px 0;" />
</p>

<TryInSimulator />

## Example Arduino Code
```cpp
const int dirPin = 8;
const int stepPin = 9;

void setup() {
  pinMode(dirPin, OUTPUT);
  pinMode(stepPin, OUTPUT);
}

void loop() {
  // Move 200 steps Clockwise (1 full revolution for standard steppers)
  digitalWrite(dirPin, HIGH);
  for (int i = 0; i < 200; i++) {
    digitalWrite(stepPin, HIGH);
    delayMicroseconds(1000); // Speed of the step
    digitalWrite(stepPin, LOW);
    delayMicroseconds(1000);
  }
  
  delay(1000); // Pause for 1 second
  
  // Move 200 steps Counter-Clockwise
  digitalWrite(dirPin, LOW);
  for (int i = 0; i < 200; i++) {
    digitalWrite(stepPin, HIGH);
    delayMicroseconds(1000);
    digitalWrite(stepPin, LOW);
    delayMicroseconds(1000);
  }
  
  delay(1000);
}
```

## Simulation Notes
- In the simulator, the A4988 operates instantly without thermal limits.
- If you pair this driver with a Stepper Motor component in the simulator, you will see the motor shaft rotate visually based on your pulse timings.

## Notes / Warnings
- **Real-World Warning:** Never disconnect or connect a stepper motor while the driver is powered. This causes a massive voltage spike that will instantly destroy the A4988 chip.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-7segment" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: 7-Segment Display</a>
  </div>
  <div>
    <a href="/docs/components/openhw-adxl345" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: ADXL345 Accelerometer &rarr;</a>
  </div>
</div>
