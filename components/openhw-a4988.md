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
    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <rect x="25" y="10" width="70" height="100" fill="#22c55e" stroke="#166534" stroke-width="2" />
      <rect x="40" y="45" width="40" height="40" rx="2" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-border)" stroke-width="2" />
      <circle cx="60" cy="25" r="8" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1" />
      <line x1="56" y1="25" x2="64" y2="25" stroke="#94a3b8" stroke-width="2" />
      <line x1="60" y1="21" x2="60" y2="29" stroke="#94a3b8" stroke-width="2" />
      <circle cx="33" cy="20" r="2" fill="#fbbf24" />
      <circle cx="33" cy="30" r="2" fill="#fbbf24" />
      <circle cx="33" cy="40" r="2" fill="#fbbf24" />
      <circle cx="33" cy="50" r="2" fill="#fbbf24" />
      <circle cx="33" cy="60" r="2" fill="#fbbf24" />
      <circle cx="33" cy="70" r="2" fill="#fbbf24" />
      <circle cx="33" cy="80" r="2" fill="#fbbf24" />
      <circle cx="33" cy="90" r="2" fill="#fbbf24" />
      <circle cx="87" cy="20" r="2" fill="#fbbf24" />
      <circle cx="87" cy="30" r="2" fill="#fbbf24" />
      <circle cx="87" cy="40" r="2" fill="#fbbf24" />
      <circle cx="87" cy="50" r="2" fill="#fbbf24" />
      <circle cx="87" cy="60" r="2" fill="#fbbf24" />
      <circle cx="87" cy="70" r="2" fill="#fbbf24" />
      <circle cx="87" cy="80" r="2" fill="#fbbf24" />
      <circle cx="87" cy="90" r="2" fill="#fbbf24" />
      <text x="60" y="105" fill="#14532d" font-family="monospace" font-size="10" font-weight="bold" text-anchor="middle">A4988</text>
    </svg>
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
1. Connect **VDD** and **GND_LOGIC** to your Arduino's 5V and GND.
2. Connect **VMOT** and **GND_MOT** to a separate power supply suitable for your motor (e.g., 12V). *Never power a stepper motor directly from the Arduino.*
3. Connect **1A, 1B** to one coil of the stepper motor, and **2A, 2B** to the other coil.
4. Tie **RESET** and **SLEEP** together (this is a standard trick to keep the driver active).
5. Connect **STEP** and **DIR** to two digital pins on your Arduino.

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
