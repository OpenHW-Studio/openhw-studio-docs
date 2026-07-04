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
    <img src="/images/components/openhw-ili9341.svg" alt="ILI9341 TFT LCD" style="width:240px; height:360px; max-width: 100%; max-height: 250px" />
    <span style="font-size:11px;color:var(--vp-c-text-2);">ILI9341 TFT</span>
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

<p align="center">
  <img src="/images/components/openhw-ili9341_wiring.png" alt="Wiring Diagram" style="max-width: 100%; border-radius: 8px; margin: 20px 0;" />
</p>

<TryInSimulator />

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
