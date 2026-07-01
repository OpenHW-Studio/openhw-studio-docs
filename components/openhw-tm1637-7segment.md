---
title: "TM1637 4-Digit Display"
description: "A 4-digit 7-segment display module driven by the TM1637 chip, requiring only two digital pins."
slug: /components/openhw-tm1637-7segment
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Displays">Displays</a> &gt; 
  <span>TM1637 Display</span>
</div>

# TM1637 4-Digit Display
<p class="subtitle">A classic 7-segment display module containing four digits and a center colon, perfect for digital clocks and counters.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="100" height="40" viewBox="0 0 100 40" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="90" height="30" fill="#1e293b" />
      <rect x="10" y="8" width="80" height="24" fill="#0f172a" />
      <text x="50" y="26" fill="#ef4444" font-family="monospace" font-size="16" font-weight="bold" text-anchor="middle">12:34</text>
    </svg>
    <span style="font-size:11px;color:#4a5568;">TM1637 Module</span>
  </div>
  <div class="component-info">
    <p>Driving four 7-segment digits directly would require 12+ pins on a microcontroller. The TM1637 driver chip simplifies this by handling all the LED multiplexing internally, allowing you to control the entire display using just two standard digital pins (CLK and DIO).</p>
    <div>
      <span class="tag">Displays</span>
      <span class="tag">7-Segment</span>
      <span class="tag">I2C-Like</span>
    </div>
  </div>
</div>

## Overview
While the protocol looks similar to I2C (using a clock and data line), it is actually a proprietary serial protocol. You cannot connect it to a standard I2C bus with other I2C devices; you must use dedicated digital pins.

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">CLK</span></td><td><span class="pin-type digital">digital</span></td><td>Clock Input. Connect to any digital pin.</td></tr>
<tr><td><span class="pin-name">DIO</span></td><td><span class="pin-type digital">digital</span></td><td>Data I/O. Connect to any digital pin.</td></tr>
<tr><td><span class="pin-name">VCC</span></td><td><span class="pin-type power">power</span></td><td>5V Power Supply.</td></tr>
<tr><td><span class="pin-name">GND</span></td><td><span class="pin-type power">power</span></td><td>Ground.</td></tr>
</table>

## Configurable Attributes
<table class="attrs-table">
<tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr>
<tr><td><strong>color</strong></td><td><code>string</code></td><td><code>"red"</code></td><td>Color of the LED segments (e.g., "red", "green", "blue").</td></tr>
</table>

## Wiring Diagram (Arduino Uno)
1. Connect **VCC** to **5V**.
2. Connect **GND** to **GND**.
3. Connect **CLK** to **D2**.
4. Connect **DIO** to **D3**.

## Example Arduino Code
This code uses the popular `TM1637Display` library to show numbers and toggle the center colon.

```cpp
#include <TM1637Display.h>

// Module connection pins (Digital Pins)
#define CLK 2
#define DIO 3

TM1637Display display(CLK, DIO);

void setup() {
  Serial.begin(9600);
  
  // Set the brightness (0 = min, 7 = max)
  display.setBrightness(0x0f);
  
  Serial.println("TM1637 Display Ready.");
}

void loop() {
  // Display a number without the center colon
  display.showNumberDec(1234, false); // Expect: "1234"
  delay(1000);
  
  // Display a time-like number with the center colon ON
  // The second parameter 'true' enables leading zeros
  // The third parameter '2' is the length, fourth is the position
  // To simply turn on the colon (0x40 is the colon bitmask in some libraries)
  display.showNumberDecEx(1234, 0b01000000, true); // Expect "12:34"
  delay(1000);
  
  // Clear the display
  display.clear();
  delay(500);
}
```

## Simulation Notes
- The OpenHW Simulator fully models the TM1637 internal registers. It behaves exactly like the real hardware when driven by standard Arduino libraries.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-stm32-bluepill" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: STM32 Blue Pill</a>
  </div>
  <div>
    <a href="/docs/components/openhw-wifi-ap" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: WiFi Access Point &rarr;</a>
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
