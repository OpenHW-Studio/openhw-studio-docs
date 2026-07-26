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
    <img src="/images/components/openhw-lcd1602-i2c.svg" alt="LCD 16x2 I2C" style="width:315px; height:135px; max-width: 100%; max-height: 150px" />
    <span style="font-size:11px;color:var(--vp-c-text-2);">I2C 16x2 LCD</span>
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

<p align="center">
  <img src="/images/components/openhw-lcd1602-i2c_wiring.png" alt="Wiring Diagram" style="max-width: 100%; border-radius: 8px; margin: 20px 0;" />
</p>

<TryInSimulator />

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
