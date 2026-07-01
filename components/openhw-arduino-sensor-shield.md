---
title: "Arduino Sensor Shield v5.0"
description: "An expansion board for Arduino Uno that brings out all I/O pins into VCC/GND/Signal triplets."
slug: /components/openhw-arduino-sensor-shield
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Logic%20Components">Logic Components</a> &gt; 
  <span>Arduino Sensor Shield v5.0</span>
</div>

# Arduino Sensor Shield v5.0
<p class="subtitle">A stacking expansion shield that converts Arduino pins into convenient 3-pin headers for rapid prototyping.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <rect x="15" y="15" width="90" height="90" rx="4" fill="#1d4ed8" stroke="#1e3a8a" stroke-width="2" />
      <rect x="25" y="30" width="70" height="15" fill="#1e293b" />
      <rect x="25" y="55" width="70" height="15" fill="#1e293b" />
      <rect x="25" y="80" width="70" height="15" fill="#1e293b" />
      <circle cx="30" cy="37.5" r="3" fill="#eab308" />
      <circle cx="40" cy="37.5" r="3" fill="#eab308" />
      <circle cx="50" cy="37.5" r="3" fill="#eab308" />
      <circle cx="60" cy="37.5" r="3" fill="#eab308" />
      <circle cx="70" cy="37.5" r="3" fill="#eab308" />
      <circle cx="80" cy="37.5" r="3" fill="#eab308" />
      <circle cx="90" cy="37.5" r="3" fill="#eab308" />
      <circle cx="30" cy="62.5" r="3" fill="#ef4444" />
      <circle cx="40" cy="62.5" r="3" fill="#ef4444" />
      <circle cx="50" cy="62.5" r="3" fill="#ef4444" />
      <circle cx="60" cy="62.5" r="3" fill="#ef4444" />
      <circle cx="70" cy="62.5" r="3" fill="#ef4444" />
      <circle cx="80" cy="62.5" r="3" fill="#ef4444" />
      <circle cx="90" cy="62.5" r="3" fill="#ef4444" />
      <circle cx="30" cy="87.5" r="3" fill="#22c55e" />
      <circle cx="40" cy="87.5" r="3" fill="#22c55e" />
      <circle cx="50" cy="87.5" r="3" fill="#22c55e" />
      <circle cx="60" cy="87.5" r="3" fill="#22c55e" />
      <circle cx="70" cy="87.5" r="3" fill="#22c55e" />
      <circle cx="80" cy="87.5" r="3" fill="#22c55e" />
      <circle cx="90" cy="87.5" r="3" fill="#22c55e" />
    </svg>
    <span style="font-size:11px;color:#4a5568;">Sensor Shield</span>
  </div>
  <div class="component-info">
    <p>The Sensor Shield simply sits on top of an Arduino Uno or Mega. It takes every single digital and analog pin from the underlying board and breaks it out into a "VCC, GND, Signal" 3-pin cluster. This allows you to plug servo motors and sensor modules directly into the board without needing a breadboard.</p>
    <div>
      <span class="tag">Logic Components</span>
      <span class="tag">Shield</span>
      <span class="tag">Breakout</span>
    </div>
  </div>
</div>

## Overview
When building robots or complex projects with many sensors, routing dozens of power wires across a breadboard can become a tangled mess. The Sensor Shield solves this by providing dedicated power and ground pins right next to every signal pin.

## Pin Reference (Simplified)
<table class="pin-table">
<tr><th>Pin Type</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">S_0 to S_13</span></td><td><span class="pin-type digital">digital</span></td><td>The Signal (S) pins correspond directly to Arduino Digital pins D0-D13.</td></tr>
<tr><td><span class="pin-name">S_A0 to S_A5</span></td><td><span class="pin-type analog">analog</span></td><td>The Signal (S) pins correspond directly to Arduino Analog pins A0-A5.</td></tr>
<tr><td><span class="pin-name">V_x</span></td><td><span class="pin-type power">power</span></td><td>The Voltage (V) row provides 5V power to every triplet block.</td></tr>
<tr><td><span class="pin-name">G_x</span></td><td><span class="pin-type power">power</span></td><td>The Ground (G) row provides Ground to every triplet block.</td></tr>
<tr><td><span class="pin-name">AREF, 3V3, 5V, GND</span></td><td><span class="pin-type power">power</span></td><td>Standard Arduino pass-through pins.</td></tr>
</table>

## Configurable Attributes
*This component acts purely as a physical routing interface and has no configurable attributes.*

## Working Principle
This shield contains no logic chips, microcontrollers, or active components. It is merely a carefully designed PCB that routes the Arduino's 5V and GND traces to dozens of header pins, pairing them with the standard I/O traces.

## Wiring Diagram
1. The Sensor Shield is meant to be stacked directly on top of an Arduino Uno.
2. Standard 3-pin modules (like a servo motor) come with a female cable that has Signal, VCC, and GND.
3. Plug the female cable directly into the vertical columns on the Sensor Shield. Pay attention to polarity: `G` is ground (black/brown wire), `V` is voltage (red wire), and `S` is signal (yellow/white wire).

## Example Arduino Code
Because the Sensor Shield is just a breakout board, you write code exactly as if you were interacting with a bare Arduino Uno.

```cpp
#include <Servo.h>

Servo myServo;

void setup() {
  // If a servo is plugged into the D9 triplet on the shield, 
  // it is effectively plugged into pin 9.
  myServo.attach(9);
}

void loop() {
  myServo.write(90);
  delay(1000);
  myServo.write(0);
  delay(1000);
}
```

## Simulation Notes
- In the simulator, the Sensor Shield provides a massive array of connection points. You can connect it to an Arduino Uno object to gain access to the easily routable triplet blocks.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-arduino-nano" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: Arduino Nano</a>
  </div>
  <div>
    <a href="/docs/components/openhw-arduino-uno" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: Arduino Uno &rarr;</a>
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
