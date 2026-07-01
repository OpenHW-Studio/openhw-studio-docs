---
title: "LCD 20x4 (I2C)"
description: "A larger 20x4 character LCD display with an I2C backpack."
slug: /components/openhw-lcd2004-i2c
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Displays">Displays</a> &gt; 
  <span>LCD 20x4 (I2C)</span>
</div>

# LCD 20x4 (I2C)
<p class="subtitle">A spacious 20-column by 4-row alphanumeric LCD, simplified with an I2C backpack for minimal wiring.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="150" height="90" viewBox="0 0 150 90" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="140" height="80" fill="#15803d" />
      <rect x="15" y="15" width="120" height="60" fill="#3b82f6" stroke="#1e3a8a" stroke-width="2" />
      <text x="75" y="30" fill="var(--vp-c-text-1)" font-family="monospace" font-size="10" font-weight="bold" text-anchor="middle">OpenHW Studio 20x4</text>
      <text x="75" y="45" fill="var(--vp-c-text-1)" font-family="monospace" font-size="10" font-weight="bold" text-anchor="middle">Line 2 text...</text>
      <text x="75" y="60" fill="var(--vp-c-text-1)" font-family="monospace" font-size="10" font-weight="bold" text-anchor="middle">Line 3 text...</text>
      <text x="75" y="75" fill="var(--vp-c-text-1)" font-family="monospace" font-size="10" font-weight="bold" text-anchor="middle">Line 4 text...</text>
      <circle cx="10" cy="10" r="2" fill="#0f172a" />
      <circle cx="140" cy="10" r="2" fill="#0f172a" />
      <circle cx="10" cy="80" r="2" fill="#0f172a" />
      <circle cx="140" cy="80" r="2" fill="#0f172a" />
      <rect x="5" y="25" width="5" height="4" fill="#0f172a" />
      <rect x="5" y="35" width="5" height="4" fill="#0f172a" />
      <rect x="5" y="45" width="5" height="4" fill="#0f172a" />
      <rect x="5" y="55" width="5" height="4" fill="#0f172a" />
    </svg>
    <span style="font-size:11px;color:var(--vp-c-text-2);">I2C 20x4 LCD</span>
  </div>
  <div class="component-info">
    <p>This module provides 80 total characters of display real estate (20 chars per line, 4 lines). Like its smaller 16x2 sibling, it uses a PCF8574 I2C adapter to reduce the required wiring down to just power and two data lines.</p>
    <div>
      <span class="tag">Displays</span>
      <span class="tag">I2C</span>
      <span class="tag">Text</span>
    </div>
  </div>
</div>

## Overview
By converting parallel data to serial I2C data, the backpack module dramatically reduces wiring clutter while supporting a large display. It operates at 5V and relies on standard I2C communication to receive characters and commands from the Arduino.

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
The PCF8574 chip on the backpack receives I2C commands from the microcontroller and expands them into parallel outputs that drive the LCD pins. The LiquidCrystal_I2C library handles this translation seamlessly. Because it has 4 rows, the memory mapping in the HD44780 controller is slightly different from the 16x2, but the library abstractions hide this complexity.

## Wiring Diagram
1. Connect **GND** to Ground.
2. Connect **VCC** to 5V.
3. Connect **SDA** to Arduino A4 (or SDA).
4. Connect **SCL** to Arduino A5 (or SCL).

## Example Arduino Code
Install the `LiquidCrystal I2C` library via the Library Manager before running this sketch. Note that the initialization specifies `20, 4`.

```cpp
#include <Wire.h>
#include <LiquidCrystal_I2C.h>

// Set the LCD address to 0x27 for a 20 chars and 4 line display
LiquidCrystal_I2C lcd(0x27, 20, 4);

void setup() {
  // Initialize the LCD
  lcd.init();
  
  // Turn on the backlight
  lcd.backlight();
  
  // Print messages on all 4 lines
  lcd.setCursor(0, 0);
  lcd.print("OpenHW Studio!");
  
  lcd.setCursor(0, 1);
  lcd.print("20x4 I2C Display");
  
  lcd.setCursor(0, 2);
  lcd.print("Line 3 is here");
  
  lcd.setCursor(0, 3);
  lcd.print("Line 4 is at bottom");
}

void loop() {
  // Do nothing
}
```

## Simulation Notes
- The default I2C address in the simulator is `0x27`. 
- Ensure you pass `20, 4` to the library constructor instead of `16, 2`. If you pass `16, 2`, the text on rows 3 and 4 may render incorrectly or not at all.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-lcd1602" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: LCD 16x2 (Parallel)</a>
  </div>
  <div>
    <a href="/docs/components/openhw-lcd2004" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: LCD 20x4 (Parallel) &rarr;</a>
  </div>
</div>
