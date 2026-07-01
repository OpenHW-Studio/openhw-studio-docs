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
    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="50" fill="#334155" stroke="#1e293b" stroke-width="4" />
      <circle cx="60" cy="60" r="40" fill="#475569" />
      <circle cx="60" cy="60" r="30" fill="#64748b" />
      <circle cx="60" cy="60" r="10" fill="#94a3b8" />
      <circle cx="60" cy="60" r="5" fill="#f8fafc" />
      <line x1="60" y1="60" x2="60" y2="25" stroke="#fbbf24" stroke-width="4" stroke-linecap="round" />
      <line x1="60" y1="60" x2="85" y2="60" stroke="#f8fafc" stroke-width="2" stroke-linecap="round" />
      <rect x="20" y="10" width="10" height="10" rx="2" fill="#eab308" />
      <rect x="90" y="10" width="10" height="10" rx="2" fill="#eab308" />
      <rect x="20" y="100" width="10" height="10" rx="2" fill="#eab308" />
      <rect x="90" y="100" width="10" height="10" rx="2" fill="#eab308" />
    </svg>
    <span style="font-size:11px;color:#4a5568;">Biaxial Stepper</span>
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
1. You will need two A4988 (or similar) Stepper Drivers.
2. Connect `A1+`, `A1-`, `B1+`, and `B1-` to the 1A, 1B, 2A, 2B outputs of **Driver 1**.
3. Connect `A2+`, `A2-`, `B2+`, and `B2-` to the 1A, 1B, 2A, 2B outputs of **Driver 2**.
4. Wire the STEP and DIR pins of both drivers to your microcontroller.

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
