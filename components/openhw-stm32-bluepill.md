---
title: "STM32 Blue Pill"
description: "A popular, low-cost ARM Cortex-M3 development board."
slug: /components/openhw-stm32-bluepill
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Logic Components">Logic Components</a> &gt; 
  <span>STM32 Blue Pill</span>
</div>

# STM32 Blue Pill
<p class="subtitle">A powerful 32-bit ARM Cortex-M3 microcontroller development board running at 72 MHz.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="80" height="120" viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="60" height="100" rx="3" fill="#1e3a8a" />
      <rect x="30" y="45" width="20" height="20" rx="1" fill="#0f172a" />
      <circle cx="20" cy="20" r="3" fill="var(--vp-c-text-2)" />
      <rect x="15" y="100" width="10" height="15" fill="var(--vp-c-text-2)" />
      <text x="40" y="80" fill="#bfdbfe" font-family="monospace" font-size="8" font-weight="bold" text-anchor="middle">STM32</text>
      <!-- Header Pins Left -->
      <circle cx="15" cy="40" r="1.5" fill="#fcd34d" />
      <circle cx="15" cy="45" r="1.5" fill="#fcd34d" />
      <circle cx="15" cy="50" r="1.5" fill="#fcd34d" />
      <circle cx="15" cy="55" r="1.5" fill="#fcd34d" />
      <!-- Header Pins Right -->
      <circle cx="65" cy="40" r="1.5" fill="#fcd34d" />
      <circle cx="65" cy="45" r="1.5" fill="#fcd34d" />
      <circle cx="65" cy="50" r="1.5" fill="#fcd34d" />
      <circle cx="65" cy="55" r="1.5" fill="#fcd34d" />
    </svg>
    <span style="font-size:11px;color:var(--vp-c-text-2);">STM32 Board</span>
  </div>
  <div class="component-info">
    <p>The STM32 "Blue Pill" is a development board for the STM32F103C8T6 microcontroller. It offers significantly more processing power (72 MHz), memory (20KB SRAM, 64KB Flash), and peripherals than standard 8-bit Arduino boards while remaining highly affordable.</p>
    <div>
      <span class="tag">Logic Components</span>
      <span class="tag">Microcontroller</span>
      <span class="tag">ARM Cortex-M3</span>
    </div>
  </div>
</div>

## Overview
The Blue Pill can be programmed using the official STM32Cube ecosystem, or via the Arduino IDE using the STM32duino core. It features advanced timers, 12-bit ADCs, CAN bus, and multiple UART/I2C/SPI interfaces.

## Pin Reference (Condensed)
*Because the Blue Pill has over 30 pins, this table highlights the most commonly used power and programming pins.*

<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">3V3</span></td><td><span class="pin-type power">power</span></td><td>3.3V Power Supply.</td></tr>
<tr><td><span class="pin-name">GND</span></td><td><span class="pin-type power">power</span></td><td>Ground.</td></tr>
<tr><td><span class="pin-name">5V</span></td><td><span class="pin-type power">power</span></td><td>5V input (passes through onboard regulator).</td></tr>
<tr><td><span class="pin-name">PC13</span></td><td><span class="pin-type digital">digital</span></td><td>Built-in LED (Active Low).</td></tr>
<tr><td><span class="pin-name">SWDIO</span></td><td><span class="pin-type digital">digital</span></td><td>SWD Data (for programming/debugging).</td></tr>
<tr><td><span class="pin-name">SWCLK</span></td><td><span class="pin-type digital">digital</span></td><td>SWD Clock (for programming/debugging).</td></tr>
<tr><td><span class="pin-name">PA0-PA7</span></td><td><span class="pin-type analog">analog</span></td><td>General Purpose I/O and 12-bit Analog Inputs.</td></tr>
</table>

## Configurable Attributes
*This component has no configurable attributes.*

## Example Arduino Code (STM32duino)
This standard blink sketch toggles the built-in LED on pin PC13. Note that on the Blue Pill, the LED is usually wired actively low (turns on when pin is LOW).

```cpp
// Built-in LED on the Blue Pill is connected to PC13
const int ledPin = PC13; 

void setup() {
  pinMode(ledPin, OUTPUT);
}

void loop() {
  digitalWrite(ledPin, LOW);  // Turn LED ON (Active Low)
  delay(1000);                
  digitalWrite(ledPin, HIGH); // Turn LED OFF
  delay(1000);                
}
```

## Simulation Notes
- The OpenHW Simulator provides an emulation layer for the ARM Cortex-M3 core and core peripherals (GPIO, basic timers). Advanced hardware peripherals (like CAN or complex DMA chains) might not be fully simulated depending on the current engine version.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-stepper-motor" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: Stepper Motor</a>
  </div>
  <div>
    <a href="/docs/components/openhw-tm1637-7segment" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: TM1637 4-Digit Display &rarr;</a>
  </div>
</div>
