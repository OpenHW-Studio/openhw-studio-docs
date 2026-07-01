---
title: "LCD 16x2 (I2C)"
description: "A standard 16x2 character LCD with an I2C backpack."
slug: /components/openhw-lcd1602-i2c
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Displays">Displays</a> &gt; 
  <span>LCD 16x2 (I2C)</span>
</div>

# LCD 16x2 (I2C)
<p class="subtitle">A classic 16-column by 2-row alphanumeric LCD, simplified with an I2C backpack to require only four wires.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="120" height="60" viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="110" height="50" fill="#15803d" />
      <rect x="15" y="15" width="90" height="30" fill="#3b82f6" stroke="#1e3a8a" stroke-width="2" />
      <text x="60" y="35" fill="#f8fafc" font-family="monospace" font-size="12" font-weight="bold" text-anchor="middle">Hello World</text>
      <circle cx="10" cy="10" r="2" fill="#0f172a" />
      <circle cx="110" cy="10" r="2" fill="#0f172a" />
      <circle cx="10" cy="50" r="2" fill="#0f172a" />
      <circle cx="110" cy="50" r="2" fill="#0f172a" />
      <rect x="5" y="20" width="5" height="4" fill="#0f172a" />
      <rect x="5" y="26" width="5" height="4" fill="#0f172a" />
      <rect x="5" y="32" width="5" height="4" fill="#0f172a" />
      <rect x="5" y="38" width="5" height="4" fill="#0f172a" />
    </svg>
    <span style="font-size:11px;color:#4a5568;">I2C 16x2 LCD</span>
  </div>
  <div class="component-info">
    <p>This is a standard HD44780-compatible 16x2 LCD that has a PCF8574 I2C adapter pre-soldered to its back. Instead of needing 6 to 10 digital pins to drive the screen, it only requires the I2C bus (SDA/SCL).</p>
    <div>
      <span class="tag">Displays</span>
      <span class="tag">I2C</span>
      <span class="tag">Text</span>
    </div>
  </div>
</div>

## Overview
By converting parallel data to serial I2C data, the backpack module dramatically reduces wiring clutter. It operates at 5V and relies on standard I2C communication to receive characters and commands from the Arduino.

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">GND</span></td><td><span class="pin-type power">power</span></td><td>Ground. Connect to Arduino GND.</td></tr>
<tr><td><span class="pin-name">VCC</span></td><td><span class="pin-type power">power</span></td><td>Power (5V). Connect to Arduino 5V.</td></tr>
<tr><td><span class="pin-name">SDA</span></td><td><span class="pin-type analog">bidi</span></td><td>I2C Data. Connect to Arduino A4 (or SDA).</td></tr>
<tr><td><span class="pin-name">SCL</span></td><td><span class="pin-type analog">bidi</span></td><td>I2C Clock. Connect to Arduino A5 (or SCL).</td></tr>
</table>

## Configurable Attributes
<table class="attrs-table">
<tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr>
<tr><td><strong>i2cAddress</strong></td><td><code>string</code></td><td><code>0x27</code></td><td>The I2C address of the backpack. Common addresses are 0x27 or 0x3F.</td></tr>
<tr><td><strong>color</strong></td><td><code>string</code></td><td><code>blue</code></td><td>The backlight color in the simulator (e.g., blue or green).</td></tr>
</table>

## Working Principle
The PCF8574 chip on the backpack receives I2C commands from the microcontroller and expands them into parallel 8-bit outputs that drive the LCD pins. The LiquidCrystal_I2C library handles all of this translation automatically.

## Wiring Diagram
1. Connect **GND** to Ground.
2. Connect **VCC** to 5V.
3. Connect **SDA** to Arduino A4 (or SDA).
4. Connect **SCL** to Arduino A5 (or SCL).

## Example Arduino Code
Install the `LiquidCrystal I2C` library via the Library Manager before running this sketch.

```cpp
#include <Wire.h>
#include <LiquidCrystal_I2C.h>

// Set the LCD address to 0x27 for a 16 chars and 2 line display
LiquidCrystal_I2C lcd(0x27, 16, 2);

void setup() {
  // Initialize the LCD
  lcd.init();
  
  // Turn on the backlight
  lcd.backlight();
  
  // Print a message
  lcd.setCursor(0, 0);
  lcd.print("OpenHW Studio!");
}

void loop() {
  unsigned long timeInSeconds = millis() / 1000;
  
  // Set cursor to the second row, first column
  lcd.setCursor(0, 1);
  lcd.print("Timer: ");
  lcd.print(timeInSeconds);
  lcd.print(" s   ");
  
  delay(500);
}
```

## Simulation Notes
- The default I2C address in the simulator is `0x27`. If your code uses `0x3F` and the screen remains blank, check the component properties and update the address.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-l293d" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: L293D Motor Driver</a>
  </div>
  <div>
    <a href="/docs/components/openhw-lcd1602" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: LCD 16x2 (Parallel) &rarr;</a>
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
