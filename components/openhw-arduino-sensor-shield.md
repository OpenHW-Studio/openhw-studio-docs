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
      <rect x="25" y="30" width="70" height="15" fill="var(--vp-c-bg-soft)" />
      <rect x="25" y="55" width="70" height="15" fill="var(--vp-c-bg-soft)" />
      <rect x="25" y="80" width="70" height="15" fill="var(--vp-c-bg-soft)" />
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
    <span style="font-size:11px;color:var(--vp-c-text-2);">Sensor Shield</span>
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
