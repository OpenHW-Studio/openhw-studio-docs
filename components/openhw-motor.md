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
    <svg width="80" height="120" viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg">
      <rect x="25" y="40" width="30" height="60" rx="4" fill="#cbd5e1" stroke="#94a3b8" stroke-width="2" />
      <rect x="20" y="35" width="40" height="10" rx="2" fill="#94a3b8" />
      <rect x="36" y="25" width="8" height="10" fill="#64748b" />
      <rect x="30" y="100" width="8" height="10" fill="#ef4444" />
      <rect x="42" y="100" width="8" height="10" fill="#1e293b" />
      <path d="M 40 40 L 40 90" stroke="#94a3b8" stroke-width="1" />
      <path d="M 30 40 L 30 90" stroke="#94a3b8" stroke-width="1" />
      <path d="M 50 40 L 50 90" stroke="#94a3b8" stroke-width="1" />
      <path d="M 34 110 Q 34 115 20 115" fill="none" stroke="#ef4444" stroke-width="2" />
      <path d="M 46 110 Q 46 120 60 120" fill="none" stroke="#1e293b" stroke-width="2" />
    </svg>
    <span style="font-size:11px;color:#4a5568;">DC Motor</span>
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
1. Connect Motor Terminal 1 to **OUT1** of an L298N.
2. Connect Motor Terminal 2 to **OUT2** of an L298N.
3. Wire the L298N driver to the Arduino as specified in the Motor Driver component documentation.

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
