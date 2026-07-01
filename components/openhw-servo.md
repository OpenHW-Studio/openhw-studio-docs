---
title: "Servo Motor"
description: "A hobby servo motor that provides precise angular position control from 0° to 180°."
slug: /components/openhw-servo
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Actuators">Actuators</a> &gt; 
  <span>Servo Motor</span>
</div>

# Servo Motor
<p class="subtitle">An actuator that uses a feedback loop for precise angular position control, typically across a 180° range.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <rect x="15" y="20" width="50" height="40" rx="2" fill="#1e293b" stroke="#334155" stroke-width="2" />
      <rect x="5" y="30" width="10" height="20" fill="#334155" />
      <rect x="65" y="30" width="10" height="20" fill="#334155" />
      <circle cx="40" cy="40" r="15" fill="#0f172a" />
      <circle cx="40" cy="40" r="10" fill="#f8fafc" />
      <path d="M 40 40 L 40 20" stroke="#f8fafc" stroke-width="4" stroke-linecap="round" />
      <rect x="40" y="60" width="3" height="15" fill="#fb923c" />
      <rect x="45" y="60" width="3" height="15" fill="#ef4444" />
      <rect x="50" y="60" width="3" height="15" fill="#78350f" />
    </svg>
    <span style="font-size:11px;color:#4a5568;">Standard Servo</span>
  </div>
  <div class="component-info">
    <p>A hobby servo motor provides precise angular position control. The position is controlled by sending a specific PWM signal to the control wire. Using the Arduino Servo library simplifies this process down to passing an angle (0 to 180).</p>
    <div>
      <span class="tag">Actuators</span>
      <span class="tag">Motor</span>
      <span class="tag">PWM</span>
    </div>
  </div>
</div>

## Overview
The servo motor uses an internal potentiometer and control circuit to form a feedback loop. When you tell it to go to an angle, it turns the motor until the potentiometer reads the correct voltage for that angle.

### PWM Timing
The servo expects a pulse every 20ms (50Hz). The length of the pulse determines the position:
- **1.0 ms:** 0° (Minimum angle)
- **1.5 ms:** 90° (Center position)
- **2.0 ms:** 180° (Maximum angle)

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">GND</span></td><td><span class="pin-type power">power</span></td><td>Ground (Usually Brown or Black wire).</td></tr>
<tr><td><span class="pin-name">V+</span></td><td><span class="pin-type power">power</span></td><td>5V Supply (Usually Red wire).</td></tr>
<tr><td><span class="pin-name">PWM</span></td><td><span class="pin-type digital">digital</span></td><td>PWM Control Signal (Usually Orange, Yellow, or White wire).</td></tr>
</table>

## Configurable Attributes
<table class="attrs-table">
<tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr>
<tr><td><strong>angle</strong></td><td><code>number</code></td><td><code>0</code></td><td>Initial angle of the servo motor (0 to 180).</td></tr>
<tr><td><strong>horn-color</strong></td><td><code>string</code></td><td><code>"white"</code></td><td>Color of the servo horn.</td></tr>
</table>

## Wiring Diagram (Arduino Uno)
1. Connect **GND** (Brown) to Arduino **GND**.
2. Connect **V+** (Red) to Arduino **5V**.
3. Connect **PWM** (Orange) to Arduino **D9**.

*(Note: In real hardware, servos can draw significant current, so a dedicated external 5V power supply is often required if you are using multiple servos or a heavy load).*

## Example Arduino Code
This example uses the built-in `Servo` library to sweep the motor back and forth.

```cpp
#include <Servo.h>

Servo myServo;

void setup() {
  myServo.attach(9); // Attach servo to pin 9
  Serial.begin(9600);
  Serial.println("Servo Motor Ready");
}

void loop() {
  // Sweep from 0 to 180 degrees
  for (int pos = 0; pos <= 180; pos += 1) {
    myServo.write(pos);
    delay(15);
  }
  
  delay(1000);
  
  // Sweep from 180 to 0 degrees
  for (int pos = 180; pos >= 0; pos -= 1) {
    myServo.write(pos);
    delay(15);
  }
  
  delay(1000);
}
```

## Simulation Notes
- Right-click the servo on the canvas during simulation to manually set the angle via the context menu slider. This allows you to verify behavior without waiting for your code to sweep the full range.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-sd-card" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: MicroSD Card Module</a>
  </div>
  <div>
    <a href="/docs/components/openhw-simulation-monitor" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: Simulation Monitor &rarr;</a>
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
