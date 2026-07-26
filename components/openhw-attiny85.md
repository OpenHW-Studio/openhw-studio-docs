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
    <img src="/images/components/openhw-attiny85.svg" alt="ATtiny85 Board" style="width:120px; height:110px; max-width: 100%; max-height: 150px" />
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

<p align="center">
  <img src="/images/components/openhw-attiny85_wiring.png" alt="Wiring Diagram" style="max-width: 100%; border-radius: 8px; margin: 20px 0;" />
</p>

<TryInSimulator />

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
