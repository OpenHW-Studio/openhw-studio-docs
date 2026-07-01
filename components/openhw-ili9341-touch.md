---
title: "ILI9341 2.8\" Touch Screen LCD"
description: "A popular 320x240 pixel TFT LCD with a resistive touch overlay."
slug: /components/openhw-ili9341-touch
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Displays">Displays</a> &gt; 
  <span>ILI9341 2.8" Touch Screen LCD</span>
</div>

# ILI9341 2.8" Touch Screen LCD
<p class="subtitle">A fast, bright 320x240 full-color TFT display featuring a resistive touch screen and an SPI interface.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="120" height="150" viewBox="0 0 120 150" xmlns="http://www.w3.org/2000/svg">
      <rect x="15" y="10" width="90" height="130" rx="4" fill="#ef4444" />
      <rect x="25" y="20" width="70" height="95" fill="#1e293b" stroke="#0f172a" stroke-width="2" />
      <rect x="35" y="45" width="50" height="45" rx="2" fill="#3b82f6" />
      <path d="M 45 60 L 55 70 L 75 50" stroke="#f8fafc" stroke-width="4" fill="none" />
      <text x="60" y="135" fill="#f8fafc" font-family="monospace" font-size="8" font-weight="bold" text-anchor="middle">2.8" TFT SPI</text>
    </svg>
    <span style="font-size:11px;color:#4a5568;">ILI9341 Touch</span>
  </div>
  <div class="component-info">
    <p>This module combines a beautiful 2.8" LCD with an ILI9341 driver and an XPT2046 resistive touch controller. Because both use the SPI bus, you can share the clock and data pins, reducing the number of wires required.</p>
    <div>
      <span class="tag">Displays</span>
      <span class="tag">SPI</span>
      <span class="tag">Touch</span>
    </div>
  </div>
</div>

## Overview
The ILI9341 is extremely fast and well-supported by libraries like `Adafruit_GFX` and `TFT_eSPI`. The resistive touch overlay lets users interact with UI elements like buttons, sliders, and menus directly on the screen.

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">VCC</span></td><td><span class="pin-type power">power</span></td><td>Power supply (3.3V or 5V depending on board regulator).</td></tr>
<tr><td><span class="pin-name">GND</span></td><td><span class="pin-type power">power</span></td><td>Common ground.</td></tr>
<tr><td><span class="pin-name">CS</span></td><td><span class="pin-type digital">digital</span></td><td>TFT Chip Select. Active LOW.</td></tr>
<tr><td><span class="pin-name">RESET</span></td><td><span class="pin-type digital">digital</span></td><td>Hardware Reset. Connect to an Arduino pin or 3.3V.</td></tr>
<tr><td><span class="pin-name">DC</span></td><td><span class="pin-type digital">digital</span></td><td>Data/Command. Tells the screen if the incoming bytes are data or commands.</td></tr>
<tr><td><span class="pin-name">MOSI</span></td><td><span class="pin-type digital">digital</span></td><td>SPI Data In. (Shared with touch controller).</td></tr>
<tr><td><span class="pin-name">SCK</span></td><td><span class="pin-type digital">digital</span></td><td>SPI Clock. (Shared with touch controller).</td></tr>
<tr><td><span class="pin-name">LED</span></td><td><span class="pin-type power">power</span></td><td>Backlight power. Usually connected to 3.3V.</td></tr>
<tr><td><span class="pin-name">MISO</span></td><td><span class="pin-type digital">digital</span></td><td>SPI Data Out. Needed to read from the display or touch controller.</td></tr>
<tr><td><span class="pin-name">T_CLK</span></td><td><span class="pin-type digital">digital</span></td><td>Touch SPI Clock (Can share SCK).</td></tr>
<tr><td><span class="pin-name">T_CS</span></td><td><span class="pin-type digital">digital</span></td><td>Touch Chip Select. Must be a unique pin.</td></tr>
<tr><td><span class="pin-name">T_DIN</span></td><td><span class="pin-type digital">digital</span></td><td>Touch SPI MOSI (Can share MOSI).</td></tr>
<tr><td><span class="pin-name">T_DO</span></td><td><span class="pin-type digital">digital</span></td><td>Touch SPI MISO (Can share MISO).</td></tr>
<tr><td><span class="pin-name">T_IRQ</span></td><td><span class="pin-type digital">digital</span></td><td>Touch Interrupt. Goes LOW when the screen is pressed.</td></tr>
</table>

## Configurable Attributes
*This component has no standard configurable attributes.*

## Working Principle
The display expects a continuous stream of RGB pixel data over the SPI bus. The touch controller works by measuring resistance changes when two transparent, conductive layers are pressed together. 

## Wiring Diagram (Arduino Uno)
Because this is an SPI device, it's highly recommended to use the hardware SPI pins for maximum speed.
- **SCK/T_CLK** -> D13
- **MISO/T_DO** -> D12
- **MOSI/T_DIN** -> D11
- **TFT_CS** -> D10
- **TFT_DC** -> D9
- **TOUCH_CS** -> D8

## Example Arduino Code
This code requires the `Adafruit_ILI9341` and `URTouch` (or `Adafruit_FT6206` / `XPT2046`) libraries. This snippet demonstrates basic touch drawing.

```cpp
#include <SPI.h>
#include <Adafruit_GFX.h>
#include <Adafruit_ILI9341.h>
#include <XPT2046_Touchscreen.h>

#define TFT_CS 10
#define TFT_DC 9
#define TOUCH_CS 8

Adafruit_ILI9341 tft = Adafruit_ILI9341(TFT_CS, TFT_DC);
XPT2046_Touchscreen ts(TOUCH_CS);

void setup() {
  Serial.begin(9600);
  
  tft.begin();
  tft.setRotation(1);
  tft.fillScreen(ILI9341_BLACK);
  
  if (!ts.begin()) {
    Serial.println("Touch controller not found");
  }
  ts.setRotation(1);

  tft.setTextColor(ILI9341_WHITE);
  tft.setTextSize(2);
  tft.setCursor(10, 10);
  tft.println("Draw on the screen!");
}

void loop() {
  if (ts.touched()) {
    TS_Point p = ts.getPoint();
    
    // You may need to map raw coordinates to screen pixels!
    // Example (values depend on calibration):
    // int x = map(p.x, 200, 3800, 0, 320);
    // int y = map(p.y, 200, 3800, 0, 240);
    
    // For this example, we just assume they are somewhat mapped:
    int x = p.x / 12; // Rough scale
    int y = p.y / 16;
    
    tft.fillCircle(x, y, 3, ILI9341_RED);
  }
}
```

## Simulation Notes
- In the simulator, clicking and dragging on the LCD area immediately fires touch interrupts and updates the X/Y coordinates readable by the microcontroller.
- Frame rates in the browser may differ from actual hardware depending on your computer's performance, but the logic behaves identically.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-hx711_50" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: HX711 (50kg)</a>
  </div>
  <div>
    <a href="/docs/components/openhw-ili9341" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: ILI9341 TFT &rarr;</a>
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
