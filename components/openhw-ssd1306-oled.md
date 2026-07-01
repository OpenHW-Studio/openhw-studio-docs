---
title: "SSD1306 OLED Display"
description: "A small, high-contrast monochrome OLED display that communicates over I2C."
slug: /components/openhw-ssd1306-oled
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Displays">Displays</a> &gt; 
  <span>SSD1306 OLED</span>
</div>

# SSD1306 OLED (128x64)
<p class="subtitle">A widely used 0.96" monochrome graphic display that produces bright text and shapes without needing a backlight.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="10" width="70" height="60" rx="3" fill="#1a365d" stroke="#1e40af" stroke-width="2" />
      <rect x="15" y="20" width="50" height="35" rx="1" fill="#0f172a" />
      <text x="40" y="40" fill="#60a5fa" font-family="monospace" font-size="10" font-weight="bold" text-anchor="middle">OLED</text>
      <rect x="25" y="5" width="4" height="5" fill="#fcd34d" />
      <rect x="35" y="5" width="4" height="5" fill="#fcd34d" />
      <rect x="45" y="5" width="4" height="5" fill="#fcd34d" />
      <rect x="55" y="5" width="4" height="5" fill="#fcd34d" />
    </svg>
    <span style="font-size:11px;color:var(--vp-c-text-2);">0.96" OLED</span>
  </div>
  <div class="component-info">
    <p>The SSD1306 is a very popular display driver. Because it is an OLED (Organic Light Emitting Diode), every pixel generates its own light, leading to infinite contrast and low power consumption. It typically communicates via I2C, requiring only two data wires.</p>
    <div>
      <span class="tag">Displays</span>
      <span class="tag">I2C</span>
      <span class="tag">Screen</span>
    </div>
  </div>
</div>

## Overview
This module has a resolution of 128x64 pixels. To draw on it, you must use a library (like Adafruit_GFX combined with Adafruit_SSD1306) which maintains a buffer of the screen in the microcontroller's RAM, and then pushes that buffer to the screen using `display()`.

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">GND</span></td><td><span class="pin-type power">power</span></td><td>Ground.</td></tr>
<tr><td><span class="pin-name">VCC</span></td><td><span class="pin-type power">power</span></td><td>Power Supply (3.3V or 5V, depending on module regulator).</td></tr>
<tr><td><span class="pin-name">SCL</span></td><td><span class="pin-type digital">digital</span></td><td>I2C Clock. Connect to Arduino SCL (A5 on Uno).</td></tr>
<tr><td><span class="pin-name">SDA</span></td><td><span class="pin-type digital">digital</span></td><td>I2C Data. Connect to Arduino SDA (A4 on Uno).</td></tr>
</table>

## Configurable Attributes
<table class="attrs-table">
<tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr>
<tr><td><strong>i2cAddress</strong></td><td><code>string</code></td><td><code>"0x3C"</code></td><td>I2C address of the display (typically 0x3C or 0x3D).</td></tr>
</table>

## Wiring Diagram (Arduino Uno)
1. Connect **VCC** to **5V**.
2. Connect **GND** to **GND**.
3. Connect **SCL** to Arduino **A5** (or dedicated SCL pin).
4. Connect **SDA** to Arduino **A4** (or dedicated SDA pin).

## Example Arduino Code
This code uses the Adafruit SSD1306 library to display text and a simple counter.

```cpp
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64

// Declaration for an SSD1306 display connected to I2C (SDA, SCL pins)
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);

void setup() {
  Serial.begin(9600);

  // Initialize with the I2C addr 0x3C
  if(!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
    Serial.println(F("SSD1306 allocation failed"));
    for(;;); // Don't proceed, loop forever
  }

  // Clear the buffer
  display.clearDisplay();
  
  display.setTextSize(2);
  display.setTextColor(SSD1306_WHITE);
  display.setCursor(8, 24);
  display.println("Hello!");
  display.display();
  delay(2000);
}

void loop() {
  display.clearDisplay();
  
  display.setTextSize(1);
  display.setCursor(0, 0);
  display.println("SSD1306 OLED");
  
  display.setTextSize(2);
  display.setCursor(20, 30);
  display.print(millis() / 1000);
  display.println(" s");
  
  display.display();
  delay(1000);
}
```

## Simulation Notes
- The OpenHW Simulator fully supports the Adafruit GFX library, allowing you to draw lines, circles, text, and bitmaps directly to the virtual screen.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-sph0645" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: SPH0645 Microphone</a>
  </div>
  <div>
    <a href="/docs/components/openhw-stepper-motor" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: Stepper Motor &rarr;</a>
  </div>
</div>
