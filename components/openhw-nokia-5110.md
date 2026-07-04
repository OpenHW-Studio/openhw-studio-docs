---
title: "Nokia 5110 Screen"
description: "A monochrome 84x48 graphic LCD display."
slug: /components/openhw-nokia-5110
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Displays">Displays</a> &gt; 
  <span>Nokia 5110 Screen</span>
</div>

# Nokia 5110 Screen
<p class="subtitle">A classic 84x48 pixel monochrome LCD screen, originally used in the iconic Nokia 5110 mobile phone.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <img src="/images/components/openhw-nokia5110.svg" alt="Nokia 5110 Screen" style="width:200px; height:240px; max-width: 100%; max-height: 200px" />
    <span style="font-size:11px;color:var(--vp-c-text-2);">Nokia 5110</span>
  </div>
  <div class="component-info">
    <p>The Nokia 5110 is a basic graphic LCD screen for lots of applications. It uses the PCD8544 controller, which is the same one used in the Nokia 3310 LCD. The PCD8544 is a low power CMOS LCD controller/driver, designed to drive a graphic display of 48 rows and 84 columns.</p>
    <div>
      <span class="tag">Displays</span>
      <span class="tag">Monochrome</span>
      <span class="tag">SPI</span>
    </div>
  </div>
</div>

## Overview
This display is inexpensive, easy to use, requires only a few digital I/O pins, and consumes very little power. It interfaces to microcontrollers through a serial SPI-like protocol.

> [!WARNING]
> **Voltage Limits:** The physical Nokia 5110 is typically a 3.3V device. Supplying 5V to the VCC or logic pins on real hardware might damage it. (The simulator tolerates 5V logic for convenience, but you should still wire VCC to 3.3V).

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">VCC</span></td><td><span class="pin-type power">power</span></td><td>Power Supply (3.3V).</td></tr>
<tr><td><span class="pin-name">GND</span></td><td><span class="pin-type power">power</span></td><td>Ground. Connect to Arduino GND.</td></tr>
<tr><td><span class="pin-name">SCE</span></td><td><span class="pin-type digital">digital</span></td><td>Chip Enable (Active Low).</td></tr>
<tr><td><span class="pin-name">RST</span></td><td><span class="pin-type digital">digital</span></td><td>Reset.</td></tr>
<tr><td><span class="pin-name">DC</span></td><td><span class="pin-type digital">digital</span></td><td>Data / Command selection.</td></tr>
<tr><td><span class="pin-name">DN</span></td><td><span class="pin-type digital">digital</span></td><td>Data In (MOSI).</td></tr>
<tr><td><span class="pin-name">SCLK</span></td><td><span class="pin-type digital">digital</span></td><td>Serial Clock.</td></tr>
<tr><td><span class="pin-name">LED</span></td><td><span class="pin-type power">power</span></td><td>Backlight Power (3.3V).</td></tr>
</table>

## Wiring Diagram

<p align="center">
  <img src="/images/components/openhw-nokia5110_wiring.png" alt="Wiring Diagram" style="max-width: 100%; border-radius: 8px; margin: 20px 0;" />
</p>

<TryInSimulator />

1. Connect **VCC** and **LED** to **3.3V**.
2. Connect **GND** to **GND**.
3. Connect **SCE** to Arduino **D7**.
4. Connect **RST** to Arduino **D6**.
5. Connect **DC** to Arduino **D5**.
6. Connect **DN (MOSI)** to Arduino **D11**.
7. Connect **SCLK** to Arduino **D13**.

## Example Arduino Code
You can use the Adafruit PCD8544 and Adafruit GFX libraries to easily draw text and shapes on this screen.

```cpp
#include <SPI.h>
#include <Adafruit_GFX.h>
#include <Adafruit_PCD8544.h>

// Software SPI (slower updates, more flexible pinout):
// pin 13 - Serial clock out (SCLK)
// pin 11 - Serial data out (DIN)
// pin 5 - Data/Command select (D/C)
// pin 7 - LCD chip select (CS)
// pin 6 - LCD reset (RST)
Adafruit_PCD8544 display = Adafruit_PCD8544(13, 11, 5, 7, 6);

void setup() {
  display.begin();
  
  // You can change the contrast around to adapt the display
  // for the best viewing!
  display.setContrast(50);
  
  display.clearDisplay();
  
  display.setTextSize(1);
  display.setTextColor(BLACK);
  display.setCursor(0,0);
  display.println("OpenHW Studio!");
  display.display();
}

void loop() {
  // Main code
}
```

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-neopixel-ring" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: NeoPixel Ring</a>
  </div>
  <div>
    <a href="/docs/components/openhw-nlsf595" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: NLSF595 Shift Register &rarr;</a>
  </div>
</div>
