---
title: "Arduino Mega 2560"
description: "A powerful microcontroller board based on the ATmega2560 with 54 digital I/O pins."
slug: /components/openhw-arduino-mega
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Logic%20Components">Logic Components</a> &gt; 
  <span>Arduino Mega 2560</span>
</div>

# Arduino Mega 2560
<p class="subtitle">The big brother to the Arduino Uno, featuring vastly more I/O pins, memory, and hardware serial ports.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="20" width="100" height="80" rx="4" fill="#005c5f" stroke="#003b3d" stroke-width="2" />
      <rect x="10" y="20" width="20" height="80" rx="4" fill="#004a4c" />
      <rect x="40" y="45" width="25" height="25" rx="2" fill="#1e293b" />
      <circle cx="52.5" cy="57.5" r="5" fill="#475569" />
      <rect x="15" y="15" width="20" height="10" fill="#e2e8f0" />
      <circle cx="95" cy="30" r="3" fill="#eab308" />
      <circle cx="95" cy="40" r="3" fill="#eab308" />
      <circle cx="95" cy="50" r="3" fill="#eab308" />
      <circle cx="95" cy="60" r="3" fill="#eab308" />
      <circle cx="95" cy="70" r="3" fill="#eab308" />
      <circle cx="95" cy="80" r="3" fill="#eab308" />
      <circle cx="95" cy="90" r="3" fill="#eab308" />
      <line x1="20" y1="20" x2="100" y2="20" stroke="#000000" stroke-width="4" stroke-dasharray="2, 4" />
      <line x1="20" y1="100" x2="100" y2="100" stroke="#000000" stroke-width="4" stroke-dasharray="2, 4" />
      <text x="55" y="95" fill="#ffffff" font-family="monospace" font-size="12" font-weight="bold" text-anchor="middle">MEGA</text>
    </svg>
    <span style="font-size:11px;color:#4a5568;">Arduino Mega</span>
  </div>
  <div class="component-info">
    <p>The Arduino Mega 2560 is designed for complex projects. It boasts 54 digital input/output pins (15 can be used as PWM outputs), 16 analog inputs, 4 UARTs (hardware serial ports), a 16 MHz crystal oscillator, a USB connection, a power jack, an ICSP header, and a reset button.</p>
    <div>
      <span class="tag">Logic Components</span>
      <span class="tag">Microcontroller</span>
      <span class="tag">ATmega2560</span>
    </div>
  </div>
</div>

## Overview
When your project runs out of pins or memory on a standard Arduino Uno, the Mega is the primary upgrade path. The code translates seamlessly, but you gain access to 256 KB of flash memory (compared to the Uno's 32 KB) and dozens of extra control pins.

## Pin Reference (Simplified)
<table class="pin-table">
<tr><th>Pin Range</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">0-13, 14-53</span></td><td><span class="pin-type digital">digital</span></td><td>54 Digital I/O pins. Pins 2-13 and 44-46 support PWM.</td></tr>
<tr><td><span class="pin-name">A0 - A15</span></td><td><span class="pin-type analog">analog</span></td><td>16 Analog Input pins. (Can also be used as digital I/O).</td></tr>
<tr><td><span class="pin-name">RX0-3, TX0-3</span></td><td><span class="pin-type digital">digital</span></td><td>4 Hardware Serial Ports (UART).</td></tr>
<tr><td><span class="pin-name">SDA (20), SCL (21)</span></td><td><span class="pin-type digital">digital</span></td><td>I2C Communication pins.</td></tr>
<tr><td><span class="pin-name">50-53</span></td><td><span class="pin-type digital">digital</span></td><td>SPI Communication pins (MISO, MOSI, SCK, SS).</td></tr>
<tr><td><span class="pin-name">5V, 3.3V, GND</span></td><td><span class="pin-type power">power</span></td><td>Power and Ground connections.</td></tr>
<tr><td><span class="pin-name">VIN</span></td><td><span class="pin-type power">power</span></td><td>Input voltage to the board when using an external power source.</td></tr>
</table>
*(Note: Refer to the simulator for the exact pin coordinates.)*

## Configurable Attributes
*This component acts as the main execution unit in the simulator and has no standard configurable attributes.*

## Working Principle
The Mega is built around the ATmega2560 microcontroller. It executes uploaded C++ code iteratively in a loop, reading the states of sensors connected to its inputs, processing logic, and controlling components connected to its outputs.

## Wiring Diagram
1. Connect sensors to **A0-A15** (for analog sensors) or **D2-D53** (for digital sensors).
2. Connect actuators (motors, LEDs) to **D2-D53**.
3. Use the **5V** and **GND** pins to power small peripheral modules.
4. *Do not exceed 40mA per I/O pin, or 200mA total across all pins.*

## Example Arduino Code
```cpp
// Blinking the built-in LED (Pin 13)
void setup() {
  pinMode(13, OUTPUT);
  Serial.begin(9600);
  Serial.println("Mega 2560 Initialized!");
}

void loop() {
  digitalWrite(13, HIGH);
  delay(1000);
  digitalWrite(13, LOW);
  delay(1000);
}
```

## Simulation Notes
- In the simulator, the Mega executes standard Arduino code natively via the WebAssembly AVR toolchain.
- The Mega is fully compatible with almost all Uno code, provided the libraries don't rely on specific hardware timers unique to the ATmega328P.
- The simulator provides full access to all 4 UARTs via `Serial`, `Serial1`, `Serial2`, and `Serial3`.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-analog-joystick" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: Analog Joystick</a>
  </div>
  <div>
    <a href="/docs/components/openhw-arduino-nano" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: Arduino Nano &rarr;</a>
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
