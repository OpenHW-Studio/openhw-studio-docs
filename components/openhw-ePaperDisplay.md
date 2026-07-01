---
title: "2.9\" e-Paper Display"
description: "A high-contrast, ultra-low power electrophoretic display module."
slug: /components/openhw-ePaperDisplay
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Displays">Displays</a> &gt; 
  <span>2.9" e-Paper Display</span>
</div>

# 2.9" e-Paper Display
<p class="subtitle">A high-contrast, ultra-low power electrophoretic display module that retains its image even when power is completely removed.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="10" width="80" height="100" rx="4" fill="#ffffff" stroke="#cbd5e1" stroke-width="4" />
      <rect x="25" y="15" width="70" height="70" fill="#f1f5f9" />
      <text x="60" y="45" fill="var(--vp-c-bg-soft)" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle">Hello</text>
      <text x="60" y="65" fill="var(--vp-c-bg-soft)" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle">World!</text>
      <rect x="25" y="90" width="70" height="15" fill="var(--vp-c-bg-soft)" />
      <circle cx="35" cy="97.5" r="2" fill="#eab308" />
      <circle cx="45" cy="97.5" r="2" fill="#eab308" />
      <circle cx="55" cy="97.5" r="2" fill="#eab308" />
      <circle cx="65" cy="97.5" r="2" fill="#eab308" />
      <circle cx="75" cy="97.5" r="2" fill="#eab308" />
      <circle cx="85" cy="97.5" r="2" fill="#eab308" />
    </svg>
    <span style="font-size:11px;color:var(--vp-c-text-2);">SPI e-Paper</span>
  </div>
  <div class="component-info">
    <p>This 2.9-inch E-Ink / e-Paper display is famous for its paper-like readability in direct sunlight and its ability to hold an image indefinitely with zero power. It communicates via SPI.</p>
    <div>
      <span class="tag">Displays</span>
      <span class="tag">SPI</span>
      <span class="tag">Low Power</span>
    </div>
  </div>
</div>

## Overview
Because of its unique physical properties, an e-Paper display does not emit light. Instead, it physically moves microscopic charged pigment particles to the surface. This means refreshing the screen is very slow (often taking a full second or two and flashing black/white to clear ghosting).

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">VCC</span></td><td><span class="pin-type power">power</span></td><td>Power supply (3.3V).</td></tr>
<tr><td><span class="pin-name">GND</span></td><td><span class="pin-type power">power</span></td><td>Ground.</td></tr>
<tr><td><span class="pin-name">DIN</span></td><td><span class="pin-type digital">digital</span></td><td>SPI MOSI (Data In). Connect to Arduino D11.</td></tr>
<tr><td><span class="pin-name">CLK</span></td><td><span class="pin-type digital">digital</span></td><td>SPI Clock. Connect to Arduino D13.</td></tr>
<tr><td><span class="pin-name">CS</span></td><td><span class="pin-type digital">digital</span></td><td>Chip Select. Connect to Arduino D10.</td></tr>
<tr><td><span class="pin-name">DC</span></td><td><span class="pin-type digital">digital</span></td><td>Data/Command control. Connect to Arduino D9.</td></tr>
<tr><td><span class="pin-name">RST</span></td><td><span class="pin-type digital">digital</span></td><td>Reset pin. Connect to Arduino D8.</td></tr>
<tr><td><span class="pin-name">BUSY</span></td><td><span class="pin-type digital">digital</span></td><td>Busy status output. Connect to Arduino D7.</td></tr>
</table>

## Configurable Attributes
*This component has no configurable attributes.*

## Working Principle
When an update command is sent over SPI, the display controller drives specific voltages across a grid of tiny microcapsules. Black particles (negatively charged) and white particles (positively charged) move up or down depending on the field. Because the particles are physically suspended in a viscous fluid, they stay exactly where they are left when power is cut.

## Wiring Diagram
1. Connect **VCC** to 3.3V and **GND** to Ground.
2. Connect **DIN** to D11 (MOSI).
3. Connect **CLK** to D13 (SCK).
4. Connect **CS** to D10.
5. Connect **DC** to D9.
6. Connect **RST** to D8.
7. Connect **BUSY** to D7.

## Example Arduino Code
*Install the **GxEPD2** library before running this example.*

```cpp
#include <SPI.h>
#include <GxEPD2_BW.h>

// Define pins
#define EPD_CS 10
#define EPD_DC 9
#define EPD_RST 8
#define EPD_BUSY 7

// Instantiate the display (using a common 2.9" profile)
GxEPD2_BW<GxEPD2_290_T94_V2, GxEPD2_290_T94_V2::HEIGHT> epd(GxEPD2_290_T94_V2(EPD_CS, EPD_DC, EPD_RST, EPD_BUSY));

void setup() {
  Serial.begin(9600);
  epd.init(115200);
  
  // Clear the screen
  epd.setFullWindow();
  epd.fillScreen(GxEPD_WHITE);
  
  // Draw text
  epd.setTextSize(2);
  epd.setTextColor(GxEPD_BLACK);
  epd.setCursor(20, 40);
  epd.println("Hello World!");
  
  // Push the buffer to the physical screen (this takes a moment)
  epd.display();
}

void loop() {
  // e-Paper doesn't need to be constantly refreshed!
  delay(10000);
}
```

## Simulation Notes
- The simulator mimics the slow visual update process of an e-Paper display, including the characteristic screen flashing that occurs during a full refresh cycle.
- In the simulator, the display acts as a true SPI device.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-ds18b20" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: DS18B20</a>
  </div>
  <div>
    <a href="/docs/components/openhw-esp32" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: ESP32 &rarr;</a>
  </div>
</div>
