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
    <svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="60" height="60" rx="4" fill="#334155" />
      <circle cx="40" cy="40" r="20" fill="#1e293b" />
      <circle cx="40" cy="40" r="15" fill="#475569" />
      <circle cx="40" cy="40" r="5" fill="#94a3b8" />
      <circle cx="15" cy="15" r="3" fill="#0f172a" />
      <circle cx="65" cy="15" r="3" fill="#0f172a" />
      <circle cx="15" cy="65" r="3" fill="#0f172a" />
      <circle cx="65" cy="65" r="3" fill="#0f172a" />
    </svg>
    <span style="font-size:11px;color:#4a5568;">NEMA 17 Style</span>
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
You cannot connect a bipolar stepper directly to an Arduino. You must use a driver.
1. Connect Motor **A-** to Driver **1A**.
2. Connect Motor **A+** to Driver **1B**.
3. Connect Motor **B+** to Driver **2A**.
4. Connect Motor **B-** to Driver **2B**.
5. Connect Driver **STEP** pin to Arduino **D3**.
6. Connect Driver **DIR** pin to Arduino **D4**.

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
