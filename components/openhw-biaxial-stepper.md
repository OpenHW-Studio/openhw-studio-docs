---
title: "Biaxial Stepper Motor"
description: "A dual-axis concentric stepper motor typically used for driving clock hands or dual-pointer gauges."
slug: /components/openhw-biaxial-stepper
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Actuators">Actuators</a> &gt; 
  <span>Biaxial Stepper Motor</span>
</div>

# Biaxial Stepper Motor
<p class="subtitle">A specialized concentric stepper motor that can independently drive two concentric shafts (like the hour and minute hands of a clock).</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <img src="/images/components/openhw-biaxial-stepper.svg" alt="Biaxial Stepper Motor" style="width:150px; height:200px; max-width: 150px; max-height: 200px" />
    <span style="font-size:11px;color:var(--vp-c-text-2);">Biaxial Stepper</span>
  </div>
  <div class="component-info">
    <p>This is a 2-in-1 motor commonly found in automotive dashboards and sophisticated analog clocks. It consists of two independent stepper motors mechanically geared to drive an outer tubular shaft and an inner solid shaft on exactly the same axis.</p>
    <div>
      <span class="tag">Actuators</span>
      <span class="tag">Motors</span>
      <span class="tag">Concentric</span>
    </div>
  </div>
</div>

## Overview
Because this component contains two independent stepper motors, it requires two independent motor drivers (like two A4988 modules) or a multi-channel driver board. It is perfect for creating analog dials that display two different metrics simultaneously.

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">A1-, A1+</span></td><td><span class="pin-type analog">analog</span></td><td>Coil A for Motor 1 (Inner Shaft).</td></tr>
<tr><td><span class="pin-name">B1-, B1+</span></td><td><span class="pin-type analog">analog</span></td><td>Coil B for Motor 1 (Inner Shaft).</td></tr>
<tr><td><span class="pin-name">A2-, A2+</span></td><td><span class="pin-type analog">analog</span></td><td>Coil A for Motor 2 (Outer Shaft).</td></tr>
<tr><td><span class="pin-name">B2-, B2+</span></td><td><span class="pin-type analog">analog</span></td><td>Coil B for Motor 2 (Outer Shaft).</td></tr>
</table>

## Configurable Attributes
<table class="attrs-table">
<tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr>
<tr><td><strong>outerHandLength</strong></td><td><code>number</code></td><td><code>30</code></td><td>Visual length of the outer shaft's pointer in the simulator.</td></tr>
<tr><td><strong>outerHandColor</strong></td><td><code>string</code></td><td><code>"gold"</code></td><td>Color of the outer shaft's pointer.</td></tr>
<tr><td><strong>outerHandShape</strong></td><td><code>string</code></td><td><code>"plain"</code></td><td>Shape style of the outer shaft's pointer.</td></tr>
<tr><td><strong>innerHandLength</strong></td><td><code>number</code></td><td><code>30</code></td><td>Visual length of the inner shaft's pointer in the simulator.</td></tr>
<tr><td><strong>innerHandColor</strong></td><td><code>string</code></td><td><code>"silver"</code></td><td>Color of the inner shaft's pointer.</td></tr>
<tr><td><strong>innerHandShape</strong></td><td><code>string</code></td><td><code>"plain"</code></td><td>Shape style of the inner shaft's pointer.</td></tr>
<tr><td><strong>step_angle</strong></td><td><code>number</code></td><td><code>1.8</code></td><td>Degrees rotated per full step (usually 1.8 for standard 200-step motors).</td></tr>
</table>

## Working Principle
Each of the two motors functions exactly like a standard bipolar stepper motor. By pulsing Coil A and Coil B in the correct sequence, the rotor turns. The mechanical housing aligns the rotors so that their output shafts are perfectly concentric.

## Wiring Diagram

You will need two A4988 (or similar) Stepper Drivers to run this motor. Connect each driver to one of the motor's coils.

<p align="center">
  <img src="/images/components/openhw-biaxial-stepper_wiring.png" alt="Wiring Diagram" style="max-width: 100%; border-radius: 8px; margin: 20px 0;" />
</p>

<TryInSimulator />

## Example Arduino Code
*This example requires the AccelStepper library and assumes you are using two A4988 drivers.*

```cpp
#include <AccelStepper.h>

const int innerStep = 2;
const int innerDir = 3;
const int outerStep = 4;
const int outerDir = 5;

// Define steppers and the pins they will use
AccelStepper stepperInner(AccelStepper::DRIVER, innerStep, innerDir);
AccelStepper stepperOuter(AccelStepper::DRIVER, outerStep, outerDir);

void setup() {
  stepperInner.setMaxSpeed(1000);
  stepperInner.setAcceleration(500);
  
  stepperOuter.setMaxSpeed(1000);
  stepperOuter.setAcceleration(500);
}

void loop() {
  // Move Inner pointer clockwise
  if (stepperInner.distanceToGo() == 0) {
    stepperInner.moveTo(stepperInner.currentPosition() + 200);
  }
  
  // Move Outer pointer counter-clockwise
  if (stepperOuter.distanceToGo() == 0) {
    stepperOuter.moveTo(stepperOuter.currentPosition() - 200);
  }
  
  stepperInner.run();
  stepperOuter.run();
}
```

## Simulation Notes
- The simulator visually renders two hands (pointers) extending from the center of the motor. You can customize their colors and lengths via the component attributes to easily tell them apart.
- The motors operate independently; running one will not mechanically interfere with the other.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-battery" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: Li-ion Battery</a>
  </div>
  <div>
    <a href="/docs/components/openhw-bmp180-breakout" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: BMP180 Barometric Sensor &rarr;</a>
  </div>
</div>
