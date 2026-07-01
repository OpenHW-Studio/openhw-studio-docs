---
title: "Arduino Uno R3"
description: "The most popular, beginner-friendly microcontroller board in the world."
slug: /components/openhw-arduino-uno
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Logic%20Components">Logic Components</a> &gt; 
  <span>Arduino Uno R3</span>
</div>

# Arduino Uno R3
<p class="subtitle">The standard flagship board of the Arduino ecosystem, built around the ATmega328P microcontroller.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="20" width="80" height="80" rx="4" fill="#005c5f" stroke="#003b3d" stroke-width="2" />
      <rect x="45" y="45" width="30" height="30" rx="2" fill="var(--vp-c-bg-soft)" />
      <circle cx="60" cy="60" r="5" fill="#475569" />
      <rect x="25" y="15" width="20" height="15" fill="#e2e8f0" />
      <rect x="25" y="90" width="15" height="15" fill="var(--vp-c-bg-soft)" />
      <circle cx="95" cy="30" r="3" fill="#eab308" />
      <circle cx="95" cy="40" r="3" fill="#eab308" />
      <circle cx="95" cy="50" r="3" fill="#eab308" />
      <circle cx="95" cy="60" r="3" fill="#eab308" />
      <circle cx="95" cy="70" r="3" fill="#eab308" />
      <circle cx="95" cy="80" r="3" fill="#eab308" />
      <circle cx="95" cy="90" r="3" fill="#eab308" />
      <circle cx="25" cy="30" r="3" fill="#eab308" />
      <circle cx="25" cy="40" r="3" fill="#eab308" />
      <circle cx="25" cy="50" r="3" fill="#eab308" />
      <circle cx="25" cy="60" r="3" fill="#eab308" />
      <circle cx="25" cy="70" r="3" fill="#eab308" />
      <circle cx="25" cy="80" r="3" fill="#eab308" />
      <text x="60" y="105" fill="#ffffff" font-family="monospace" font-size="12" font-weight="bold" text-anchor="middle">UNO</text>
    </svg>
    <span style="font-size:11px;color:var(--vp-c-text-2);">Arduino Uno</span>
  </div>
  <div class="component-info">
    <p>The Arduino Uno is a microcontroller board based on the ATmega328P. It has 14 digital input/output pins, 6 analog inputs, a 16 MHz ceramic resonator, a USB connection, a power jack, an ICSP header, and a reset button. It contains everything needed to support the microcontroller.</p>
    <div>
      <span class="tag">Logic Components</span>
      <span class="tag">Microcontroller</span>
      <span class="tag">ATmega328P</span>
    </div>
  </div>
</div>

## Overview
If you are learning electronics, the Uno is exactly where you should start. It is robust, well-documented, and almost all third-party libraries and shields are designed specifically to work with its physical pin layout and memory constraints.

## Pin Reference (Simplified)
<table class="pin-table">
<tr><th>Pin Range</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">0 (RX), 1 (TX)</span></td><td><span class="pin-type digital">digital</span></td><td>Hardware serial communication. (Usually reserved for USB to PC).</td></tr>
<tr><td><span class="pin-name">2 - 13</span></td><td><span class="pin-type digital">digital</span></td><td>Standard digital I/O pins. Pins 3, 5, 6, 9, 10, and 11 support PWM output.</td></tr>
<tr><td><span class="pin-name">A0 - A5</span></td><td><span class="pin-type analog">analog</span></td><td>Analog input pins. Can also be used as standard digital I/O pins (D14-D19).</td></tr>
<tr><td><span class="pin-name">5V, 3.3V</span></td><td><span class="pin-type power">power</span></td><td>Regulated voltage outputs for powering small sensors.</td></tr>
<tr><td><span class="pin-name">GND</span></td><td><span class="pin-type power">power</span></td><td>Ground references (3 pins total).</td></tr>
<tr><td><span class="pin-name">VIN</span></td><td><span class="pin-type power">power</span></td><td>Input voltage to the board when using an external power source (7-12V).</td></tr>
<tr><td><span class="pin-name">SDA (A4), SCL (A5)</span></td><td><span class="pin-type digital">digital</span></td><td>I2C Communication pins (duplicated near the AREF pin).</td></tr>
<tr><td><span class="pin-name">AREF</span></td><td><span class="pin-type power">power</span></td><td>Reference voltage for the analog inputs.</td></tr>
</table>

## Configurable Attributes
*This component acts as the main execution unit in the simulator and has no standard configurable attributes.*

## Working Principle
The Uno executes C++ code uploaded to it, reading inputs (like buttons or light sensors) and controlling outputs (like LEDs or motors). It runs continuously in a `loop()` as long as power is applied.

## Wiring Diagram
1. Supply power via USB or the 5V/VIN pins.
2. Connect standard sensors and LEDs to any digital pin (2-13).
3. Connect analog sensors (like potentiometers) to A0-A5.
4. *Remember: A standard Uno I/O pin can only supply ~20mA of continuous current. Do not try to drive a motor directly from a data pin.*

## Example Arduino Code
```cpp
// Blinking the built-in LED (Pin 13)
void setup() {
  pinMode(13, OUTPUT);
  Serial.begin(9600);
  Serial.println("Uno Initialized!");
}

void loop() {
  digitalWrite(13, HIGH);
  delay(1000); 
  digitalWrite(13, LOW);
  delay(1000);
}
```

## Simulation Notes
- In the simulator, the Uno executes standard Arduino C/C++ natively.
- It is the default controller for most standard example circuits.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-arduino-sensor-shield" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: Arduino Sensor Shield</a>
  </div>
  <div>
    <a href="/docs/components/openhw-attiny85" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: ATtiny85 &rarr;</a>
  </div>
</div>
