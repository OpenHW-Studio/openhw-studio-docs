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
      <circle cx="20" cy="20" r="3" fill="#cbd5e1" />
      <rect x="15" y="100" width="10" height="15" fill="#94a3b8" />
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
    <span style="font-size:11px;color:#4a5568;">STM32 Board</span>
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
