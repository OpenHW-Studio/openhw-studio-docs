---
title: "ILI9341 2.8\" TFT LCD"
description: "A popular 320x240 pixel full-color TFT LCD."
slug: /components/openhw-ili9341
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Displays">Displays</a> &gt; 
  <span>ILI9341 2.8" TFT LCD</span>
</div>

# ILI9341 2.8" TFT LCD
<p class="subtitle">A fast, bright 320x240 full-color TFT display featuring an SPI interface.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="120" height="150" viewBox="0 0 120 150" xmlns="http://www.w3.org/2000/svg">
      <rect x="15" y="10" width="90" height="130" rx="4" fill="#ef4444" />
      <rect x="25" y="20" width="70" height="95" fill="#1e293b" stroke="#0f172a" stroke-width="2" />
      <rect x="35" y="45" width="50" height="45" rx="2" fill="#10b981" />
      <text x="60" y="135" fill="#f8fafc" font-family="monospace" font-size="8" font-weight="bold" text-anchor="middle">2.8" TFT SPI</text>
    </svg>
    <span style="font-size:11px;color:#4a5568;">ILI9341 TFT</span>
  </div>
  <div class="component-info">
    <p>This module provides a beautiful 2.8" LCD with an ILI9341 driver. Because it uses the SPI bus, it requires very few pins to draw complex, full-color graphics.</p>
    <div>
      <span class="tag">Displays</span>
      <span class="tag">SPI</span>
      <span class="tag">Color</span>
    </div>
  </div>
</div>

## Overview
The ILI9341 is extremely fast and well-supported by libraries like `Adafruit_GFX` and `TFT_eSPI`. Note that this specific component model does *not* include a resistive touch overlay.

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">VCC</span></td><td><span class="pin-type power">power</span></td><td>Power supply (3.3V or 5V depending on board regulator).</td></tr>
<tr><td><span class="pin-name">GND</span></td><td><span class="pin-type power">power</span></td><td>Common ground.</td></tr>
<tr><td><span class="pin-name">CS</span></td><td><span class="pin-type digital">digital</span></td><td>TFT Chip Select. Active LOW.</td></tr>
<tr><td><span class="pin-name">RESET</span></td><td><span class="pin-type digital">digital</span></td><td>Hardware Reset. Connect to an Arduino pin or 3.3V.</td></tr>
<tr><td><span class="pin-name">DC</span></td><td><span class="pin-type digital">digital</span></td><td>Data/Command. Tells the screen if the incoming bytes are data or commands.</td></tr>
<tr><td><span class="pin-name">MOSI</span></td><td><span class="pin-type digital">digital</span></td><td>SPI Data In.</td></tr>
<tr><td><span class="pin-name">SCK</span></td><td><span class="pin-type digital">digital</span></td><td>SPI Clock.</td></tr>
<tr><td><span class="pin-name">LED</span></td><td><span class="pin-type power">power</span></td><td>Backlight power. Usually connected to 3.3V.</td></tr>
<tr><td><span class="pin-name">MISO</span></td><td><span class="pin-type digital">digital</span></td><td>SPI Data Out. Needed to read from the display.</td></tr>
</table>

## Configurable Attributes
*This component has no standard configurable attributes.*

## Working Principle
The display expects a continuous stream of RGB pixel data over the SPI bus.

## Wiring Diagram (Arduino Uno)
Because this is an SPI device, it's highly recommended to use the hardware SPI pins for maximum speed.
- **SCK** -> D13
- **MISO** -> D12
- **MOSI** -> D11
- **CS** -> D10
- **DC** -> D9

## Example Arduino Code
This code requires the `Adafruit_ILI9341` and `Adafruit_GFX` libraries.

```cpp
#include <SPI.h>
#include <Adafruit_GFX.h>
#include <Adafruit_ILI9341.h>

#define TFT_CS 10
#define TFT_DC 9

Adafruit_ILI9341 tft = Adafruit_ILI9341(TFT_CS, TFT_DC);

void setup() {
  tft.begin();
  tft.setRotation(1);
  tft.fillScreen(ILI9341_BLACK);
  
  tft.setCursor(20, 100);
  tft.setTextColor(ILI9341_WHITE);
  tft.setTextSize(3);
  tft.println("OpenHW Studio");
  
  tft.setCursor(20, 140);
  tft.setTextSize(2);
  tft.println("TFT Ready");
  
  delay(2000);
  tft.fillScreen(ILI9341_BLACK);
}

void loop() {
  tft.setCursor(35, 140);
  tft.setTextSize(2);
  tft.setTextColor(ILI9341_WHITE, ILI9341_BLACK);
  tft.print("Time: ");
  tft.print(millis() / 1000);
  tft.print("s  ");
  delay(500);
}
```

## Simulation Notes
- The simulator updates the display directly from the emulated SPI traffic.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-ili9341-touch" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: ILI9341 Touch</a>
  </div>
  <div>
    <a href="/docs/components/openhw-inmp441" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: INMP441 Mic &rarr;</a>
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
