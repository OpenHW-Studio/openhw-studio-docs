---
title: "ATtiny85 Board"
description: "A tiny, bare-minimum development board built around the 8-pin ATtiny85 microcontroller."
slug: /components/openhw-attiny85
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Logic%20Components">Logic Components</a> &gt; 
  <span>ATtiny85 Board</span>
</div>

# ATtiny85 Board
<p class="subtitle">When an Arduino Uno is too big for your project, the ATtiny85 steps in to provide just enough logic for simple tasks.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <rect x="35" y="30" width="50" height="60" rx="4" fill="#111827" stroke="#000000" stroke-width="2" />
      <rect x="45" y="30" width="30" height="15" fill="#e2e8f0" />
      <rect x="42.5" y="55" width="35" height="25" rx="2" fill="var(--vp-c-bg-soft)" />
      <circle cx="47.5" cy="60" r="2" fill="#64748b" />
      <circle cx="40" cy="45" r="2" fill="#eab308" />
      <circle cx="40" cy="55" r="2" fill="#eab308" />
      <circle cx="40" cy="65" r="2" fill="#eab308" />
      <circle cx="40" cy="75" r="2" fill="#eab308" />
      <circle cx="80" cy="45" r="2" fill="#eab308" />
      <circle cx="80" cy="55" r="2" fill="#eab308" />
      <circle cx="80" cy="65" r="2" fill="#eab308" />
      <circle cx="80" cy="75" r="2" fill="#eab308" />
      <text x="60" y="85" fill="#ffffff" font-family="monospace" font-size="8" font-weight="bold" text-anchor="middle">ATtiny85</text>
    </svg>
    <span style="font-size:11px;color:var(--vp-c-text-2);">ATtiny85 Module</span>
  </div>
  <div class="component-info">
    <p>This is a Digispark-style development board for the ATtiny85. It features an integrated USB connector for easy programming and exposes 6 I/O pins. It only has 8KB of flash memory, making it ideal for extremely lightweight scripts.</p>
    <div>
      <span class="tag">Logic Components</span>
      <span class="tag">Microcontroller</span>
      <span class="tag">ATtiny</span>
    </div>
  </div>
</div>

## Overview
Sometimes you just need to blink an LED, read a button, or control a single servo. Using an entire ATmega328P is overkill. The ATtiny85 is cheap, consumes very little power, and can still be programmed using standard Arduino code.

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">VIN</span></td><td><span class="pin-type power">power</span></td><td>Voltage In (7-12V if using the onboard regulator).</td></tr>
<tr><td><span class="pin-name">5V</span></td><td><span class="pin-type power">power</span></td><td>5V out (or 5V in, if bypassing the regulator).</td></tr>
<tr><td><span class="pin-name">GND</span></td><td><span class="pin-type power">power</span></td><td>Ground reference.</td></tr>
<tr><td><span class="pin-name">P0 (PB0)</span></td><td><span class="pin-type digital">digital</span></td><td>I2C SDA / SPI MOSI / PWM.</td></tr>
<tr><td><span class="pin-name">P1 (PB1)</span></td><td><span class="pin-type digital">digital</span></td><td>PWM / SPI MISO. (Also tied to the onboard LED).</td></tr>
<tr><td><span class="pin-name">P2 (PB2)</span></td><td><span class="pin-type digital">digital</span></td><td>I2C SCL / SPI SCK / Analog In A1.</td></tr>
<tr><td><span class="pin-name">P3 (PB3)</span></td><td><span class="pin-type digital">digital</span></td><td>Analog In A3 / USB D-.</td></tr>
<tr><td><span class="pin-name">P4 (PB4)</span></td><td><span class="pin-type digital">digital</span></td><td>Analog In A2 / PWM / USB D+.</td></tr>
<tr><td><span class="pin-name">P5 (PB5)</span></td><td><span class="pin-type digital">digital</span></td><td>Analog In A0 / Reset. (If used as I/O, you cannot reprogram the chip easily).</td></tr>
</table>

## Configurable Attributes
*This component acts as the main execution unit in the simulator and has no standard configurable attributes.*

## Working Principle
The ATtiny85 contains an 8-bit AVR RISC-based microcontroller. It operates identically to larger Arduino boards but with fewer hardware peripherals (no hardware UART, limited timers). It can emulate UART (SoftwareSerial) and I2C via its Universal Serial Interface (USI).

## Wiring Diagram
1. Connect power to the **5V** and **GND** pins.
2. Note that `P3` and `P4` are used for USB communication on Digispark boards. If you use them in your circuit, it might interfere with USB programming in the real world.
3. Use `P0`, `P1`, and `P2` as your primary digital/analog I/O pins.

## Example Arduino Code
```cpp
// Blinking the onboard LED attached to Pin 1
void setup() {
  pinMode(1, OUTPUT);
}

void loop() {
  digitalWrite(1, HIGH);
  delay(1000);
  digitalWrite(1, LOW);
  delay(1000);
}
```

## Simulation Notes
- In the simulator, the ATtiny85 runs the same C++ toolchain as the Uno.
- Hardware-specific libraries that rely on ATmega328P timers will fail to compile for the ATtiny85. You must use TinyWire for I2C and SoftwareSerial for serial communication.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-arduino-uno" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: Arduino Uno</a>
  </div>
  <div>
    <a href="/docs/components/openhw-battery" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: Battery &rarr;</a>
  </div>
</div>
