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
    <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="90" height="90" fill="#0f172a" rx="4" />
      <circle cx="15" cy="15" r="3" fill="#a855f7" />
      <circle cx="25" cy="15" r="3" fill="#ec4899" />
      <circle cx="35" cy="15" r="3" fill="#3b82f6" />
      <circle cx="45" cy="15" r="3" fill="#10b981" />
      <circle cx="55" cy="15" r="3" fill="#f59e0b" />
      <circle cx="65" cy="15" r="3" fill="#ef4444" />
      <circle cx="75" cy="15" r="3" fill="#8b5cf6" />
      <circle cx="85" cy="15" r="3" fill="#6366f1" />
      <circle cx="15" cy="25" r="3" fill="#3b82f6" />
      <circle cx="25" cy="25" r="3" fill="var(--vp-c-bg-soft)" />
      <circle cx="35" cy="25" r="3" fill="var(--vp-c-bg-soft)" />
      <circle cx="45" cy="25" r="3" fill="var(--vp-c-bg-soft)" />
      <circle cx="55" cy="25" r="3" fill="var(--vp-c-bg-soft)" />
      <circle cx="65" cy="25" r="3" fill="var(--vp-c-bg-soft)" />
      <circle cx="75" cy="25" r="3" fill="var(--vp-c-bg-soft)" />
      <circle cx="85" cy="25" r="3" fill="#10b981" />
      <circle cx="15" cy="35" r="3" fill="#ec4899" />
      <circle cx="25" cy="35" r="3" fill="var(--vp-c-bg-soft)" />
      <circle cx="35" cy="35" r="3" fill="#f43f5e" />
      <circle cx="45" cy="35" r="3" fill="#f43f5e" />
      <circle cx="55" cy="35" r="3" fill="#f43f5e" />
      <circle cx="65" cy="35" r="3" fill="var(--vp-c-bg-soft)" />
      <circle cx="75" cy="35" r="3" fill="var(--vp-c-bg-soft)" />
      <circle cx="85" cy="35" r="3" fill="#f59e0b" />
      <circle cx="15" cy="45" r="3" fill="#a855f7" />
      <circle cx="25" cy="45" r="3" fill="var(--vp-c-bg-soft)" />
      <circle cx="35" cy="45" r="3" fill="#f43f5e" />
      <circle cx="45" cy="45" r="3" fill="#eab308" />
      <circle cx="55" cy="45" r="3" fill="#f43f5e" />
      <circle cx="65" cy="45" r="3" fill="var(--vp-c-bg-soft)" />
      <circle cx="75" cy="45" r="3" fill="var(--vp-c-bg-soft)" />
      <circle cx="85" cy="45" r="3" fill="#ef4444" />
      <circle cx="15" cy="55" r="3" fill="#a855f7" />
      <circle cx="25" cy="55" r="3" fill="var(--vp-c-bg-soft)" />
      <circle cx="35" cy="55" r="3" fill="#f43f5e" />
      <circle cx="45" cy="55" r="3" fill="#f43f5e" />
      <circle cx="55" cy="55" r="3" fill="#f43f5e" />
      <circle cx="65" cy="55" r="3" fill="var(--vp-c-bg-soft)" />
      <circle cx="75" cy="55" r="3" fill="var(--vp-c-bg-soft)" />
      <circle cx="85" cy="55" r="3" fill="#ef4444" />
      <circle cx="15" cy="65" r="3" fill="#ec4899" />
      <circle cx="25" cy="65" r="3" fill="var(--vp-c-bg-soft)" />
      <circle cx="35" cy="65" r="3" fill="var(--vp-c-bg-soft)" />
      <circle cx="45" cy="65" r="3" fill="var(--vp-c-bg-soft)" />
      <circle cx="55" cy="65" r="3" fill="var(--vp-c-bg-soft)" />
      <circle cx="65" cy="65" r="3" fill="var(--vp-c-bg-soft)" />
      <circle cx="75" cy="65" r="3" fill="var(--vp-c-bg-soft)" />
      <circle cx="85" cy="65" r="3" fill="#f59e0b" />
      <circle cx="15" cy="75" r="3" fill="#3b82f6" />
      <circle cx="25" cy="75" r="3" fill="var(--vp-c-bg-soft)" />
      <circle cx="35" cy="75" r="3" fill="var(--vp-c-bg-soft)" />
      <circle cx="45" cy="75" r="3" fill="var(--vp-c-bg-soft)" />
      <circle cx="55" cy="75" r="3" fill="var(--vp-c-bg-soft)" />
      <circle cx="65" cy="75" r="3" fill="var(--vp-c-bg-soft)" />
      <circle cx="75" cy="75" r="3" fill="var(--vp-c-bg-soft)" />
      <circle cx="85" cy="75" r="3" fill="#10b981" />
      <circle cx="15" cy="85" r="3" fill="#a855f7" />
      <circle cx="25" cy="85" r="3" fill="#ec4899" />
      <circle cx="35" cy="85" r="3" fill="#3b82f6" />
      <circle cx="45" cy="85" r="3" fill="#10b981" />
      <circle cx="55" cy="85" r="3" fill="#f59e0b" />
      <circle cx="65" cy="85" r="3" fill="#ef4444" />
      <circle cx="75" cy="85" r="3" fill="#8b5cf6" />
      <circle cx="85" cy="85" r="3" fill="#6366f1" />
    </svg>
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
1. Connect **VCC** to 5V.
2. Connect **GND** to GND.
3. Connect **DIN** to Arduino **D6**.

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
