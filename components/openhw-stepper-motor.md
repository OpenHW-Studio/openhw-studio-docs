---
title: "Stepper Motor (Bipolar)"
description: "A standard 4-wire bipolar stepper motor for precise rotational positioning."
slug: /components/openhw-stepper-motor
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Actuators">Actuators</a> &gt; 
  <span>Stepper Motor</span>
</div>

# Stepper Motor (Bipolar)
<p class="subtitle">A brushless DC electric motor that divides a full rotation into a number of equal steps, ideal for 3D printers and CNC machines.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <img src="/images/components/openhw-stepper-motor.svg" alt="Stepper Motor" style="width:135px; height:165px; max-width: 150px; max-height: 200px" />
    <span style="font-size:11px;color:var(--vp-c-text-2);">NEMA 17 Style</span>
  </div>
  <div class="component-info">
    <p>A bipolar stepper motor has two internal coils. By energizing these coils in a specific sequence, the motor shaft turns one precise "step" at a time. It requires a dedicated stepper motor driver (like the A4988) to handle the complex sequencing and high currents.</p>
    <div>
      <span class="tag">Actuators</span>
      <span class="tag">Motor</span>
      <span class="tag">Positioning</span>
    </div>
  </div>
</div>

## Overview
Unlike a standard DC motor which spins continuously when power is applied, a stepper motor is commanded to move a specific number of steps. Standard hobby steppers often have 200 steps per revolution (1.8° per step).

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">A-</span></td><td><span class="pin-type digital">digital</span></td><td>Coil A End. Connects to stepper driver Output 1A.</td></tr>
<tr><td><span class="pin-name">A+</span></td><td><span class="pin-type digital">digital</span></td><td>Coil A Start. Connects to stepper driver Output 1B.</td></tr>
<tr><td><span class="pin-name">B+</span></td><td><span class="pin-type digital">digital</span></td><td>Coil B Start. Connects to stepper driver Output 2A.</td></tr>
<tr><td><span class="pin-name">B-</span></td><td><span class="pin-type digital">digital</span></td><td>Coil B End. Connects to stepper driver Output 2B.</td></tr>
</table>

## Configurable Attributes
<table class="attrs-table">
<tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr>
<tr><td><strong>step_angle</strong></td><td><code>number</code></td><td><code>1.8</code></td><td>Degrees of rotation per single step (e.g., 1.8 for 200 steps/rev).</td></tr>
</table>

## Wiring Diagram (With A4988 Driver)

You cannot connect a bipolar stepper directly to an Arduino. You must use a driver module like the A4988.

<p align="center">
  <img src="/images/components/openhw-stepper-motor_wiring.png" alt="Wiring Diagram" style="max-width: 100%; border-radius: 8px; margin: 20px 0;" />
</p>

<TryInSimulator />

## Example Arduino Code
This example uses the popular `AccelStepper` library to control an A4988 driver, which in turn controls the bipolar stepper motor.

```cpp
#include <AccelStepper.h>

// Define stepper motor connections and motor interface type
// Interface type 1 means a stepper driver (with Step and Direction pins)
#define dirPin 4
#define stepPin 3
#define motorInterfaceType 1

AccelStepper stepper(motorInterfaceType, stepPin, dirPin);

void setup() {
  Serial.begin(9600);
  
  // Set the maximum speed in steps per second
  stepper.setMaxSpeed(1000);
  // Set acceleration in steps per second per second
  stepper.setAcceleration(500);
  
  Serial.println("Stepper Motor Ready.");
}

void loop() {
  // If the motor has reached its target position
  if (stepper.distanceToGo() == 0) {
    // If it's at the starting point, go to position 200 (1 full rotation if 1.8 deg/step)
    if (stepper.currentPosition() == 0) {
      Serial.println("Moving Forward...");
      stepper.moveTo(200);
    } 
    // Otherwise, return to starting point
    else {
      Serial.println("Moving Backward...");
      stepper.moveTo(0);
    }
    delay(1000); // Wait a second before moving again
  }
  
  // This must be called frequently to make the motor move
  stepper.run();
}
```

## Simulation Notes
- In the simulator, the stepper motor visually rotates to match the calculated physical position based on the coil energization sequences. You can combine it with the A4988 driver module for a realistic CNC/3D-printer simulation stack.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-ssd1306-oled" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: SSD1306 OLED</a>
  </div>
  <div>
    <a href="/docs/components/openhw-stm32-bluepill" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: STM32 Blue Pill &rarr;</a>
  </div>
</div>
