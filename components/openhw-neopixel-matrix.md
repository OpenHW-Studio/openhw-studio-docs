---
title: "NeoPixel Matrix"
description: "Addressable RGB LED matrix for displaying colorful animations and text."
slug: /components/openhw-neopixel-matrix
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Displays">Displays</a> &gt; 
  <span>NeoPixel Matrix</span>
</div>

# NeoPixel Matrix
<p class="subtitle">A fully addressable 8x8 WS2812B RGB LED matrix capable of vibrant animations and colorful text using just one data pin.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <img src="/images/components/openhw-neopixel-matrix.svg" alt="NeoPixel Matrix" style="width:100px; height:100px; max-width: 100%; max-height: 150px" />
    <span style="font-size:11px;color:var(--vp-c-text-2);">RGB Matrix</span>
  </div>
  <div class="component-info">
    <p>A standard 8x8 matrix of WS2812B "NeoPixel" LEDs. Each of the 64 pixels can be set to any 24-bit color independently. The pixels are daisy-chained internally, meaning the microcontroller only needs one digital output pin to control the entire display.</p>
    <div>
      <span class="tag">Displays</span>
      <span class="tag">RGB</span>
      <span class="tag">Addressable</span>
    </div>
  </div>
</div>

## Overview
NeoPixels (WS2812B LEDs) contain a tiny integrated circuit inside each LED package. The first LED takes the first 24 bits of color data from the data stream and passes the rest down the line. Because of the strict timing requirements, a library like `FastLED` or `Adafruit_NeoPixel` is necessary to drive them.

> [!WARNING]
> **Power Constraints:** 64 LEDs at full white brightness can draw over 3 Amps of current. Do NOT power a full matrix directly from the Arduino's 5V pin in real life; use a dedicated 5V power supply. The simulator handles this automatically.

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">VCC</span></td><td><span class="pin-type power">power</span></td><td>5V Power Supply.</td></tr>
<tr><td><span class="pin-name">GND</span></td><td><span class="pin-type power">power</span></td><td>Ground. Connect to Arduino GND.</td></tr>
<tr><td><span class="pin-name">DIN</span></td><td><span class="pin-type digital">digital</span></td><td>Data In. Connect to a digital pin on the Arduino (e.g., D6).</td></tr>
<tr><td><span class="pin-name">DOUT</span></td><td><span class="pin-type digital">digital</span></td><td>Data Out. Used to chain another matrix or NeoPixel strip.</td></tr>
</table>

## Configurable Attributes
<table class="attrs-table">
<tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr>
<tr><td><strong>rows</strong></td><td><code>number</code></td><td><code>1</code></td><td>Multiplier for matrix layout in the simulator (number of 8x8 blocks vertically).</td></tr>
<tr><td><strong>cols</strong></td><td><code>number</code></td><td><code>1</code></td><td>Multiplier for matrix layout in the simulator (number of 8x8 blocks horizontally).</td></tr>
</table>

## Wiring Diagram

<p align="center">
  <img src="/images/components/openhw-neopixel-matrix_wiring.png" alt="Wiring Diagram" style="max-width: 100%; border-radius: 8px; margin: 20px 0;" />
</p>

<TryInSimulator />

## Example Arduino Code
Install the `FastLED` library from the Library Manager to run this code. It fills the matrix with blue, then black.

```cpp
#include <FastLED.h>

// Define the data pin and number of LEDs in the matrix (8x8 = 64)
#define DATA_PIN    6
#define NUM_LEDS    64

// Create an array to hold the color data for each pixel
CRGB leds[NUM_LEDS];

void setup() {
  // Initialize the FastLED library
  FastLED.addLeds<WS2812B, DATA_PIN, GRB>(leds, NUM_LEDS);
  
  // Limit brightness for safety/power reasons (0-255)
  FastLED.setBrightness(50);
}

void loop() {
  // Fill the entire matrix with solid blue
  fill_solid(leds, NUM_LEDS, CRGB::Blue);
  FastLED.show();
  delay(500);
  
  // Turn off all LEDs
  fill_solid(leds, NUM_LEDS, CRGB::Black);
  FastLED.show();
  delay(500);
}
```

## Simulation Notes
- The simulator performs well with matrices up to roughly 256 LEDs. Beyond that, the frame rate may drop depending on your computer's processing power.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-mq2-gas-sensor" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: MQ-2 Gas Sensor</a>
  </div>
  <div>
    <a href="/docs/components/openhw-neopixel-ring" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: NeoPixel Ring &rarr;</a>
  </div>
</div>
