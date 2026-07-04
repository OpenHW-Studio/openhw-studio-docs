---
title: "NeoPixel Ring"
description: "A circular arrangement of addressable RGB LEDs."
slug: /components/openhw-neopixel-ring
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Displays">Displays</a> &gt; 
  <span>NeoPixel Ring</span>
</div>

# NeoPixel Ring
<p class="subtitle">A stunning circular display of fully addressable WS2812B RGB LEDs, perfect for clocks, dials, and radial animations.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <img src="/images/components/openhw-neopixel-ring.svg" alt="NeoPixel Ring" style="width:100px; height:100px; max-width: 100%; max-height: 150px" />
    <span style="font-size:11px;color:var(--vp-c-text-2);">NeoPixel Ring</span>
  </div>
  <div class="component-info">
    <p>Similar to the NeoPixel matrix, the NeoPixel Ring consists of daisy-chained WS2812B LEDs arranged in a circle. You only need a single microcontroller pin to control the color and brightness of every single LED in the ring.</p>
    <div>
      <span class="tag">Displays</span>
      <span class="tag">RGB</span>
      <span class="tag">Radial</span>
    </div>
  </div>
</div>

## Overview
NeoPixel rings come in various sizes (e.g., 12, 16, 24 pixels). The OpenHW Simulator defaults to a 16-pixel ring. Because the LEDs are in a circle, you can easily create spinner animations, loading dials, or clock faces using simple math in your Arduino code.

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">VCC</span></td><td><span class="pin-type power">power</span></td><td>5V Power Supply.</td></tr>
<tr><td><span class="pin-name">GND</span></td><td><span class="pin-type power">power</span></td><td>Ground. Connect to Arduino GND.</td></tr>
<tr><td><span class="pin-name">DIN</span></td><td><span class="pin-type digital">digital</span></td><td>Data In. Connect to a digital pin on the Arduino.</td></tr>
<tr><td><span class="pin-name">DOUT</span></td><td><span class="pin-type digital">digital</span></td><td>Data Out. Used to chain to another NeoPixel ring or strip.</td></tr>
</table>

## Configurable Attributes
<table class="attrs-table">
<tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr>
<tr><td><strong>pixels</strong></td><td><code>number</code></td><td><code>16</code></td><td>The number of LEDs in the ring. Note: Extremely large numbers may render awkwardly in the simulator.</td></tr>
</table>

## Wiring Diagram

<p align="center">
  <img src="/images/components/openhw-neopixel-ring_wiring.png" alt="Wiring Diagram" style="max-width: 100%; border-radius: 8px; margin: 20px 0;" />
</p>

<TryInSimulator />

## Example Arduino Code
Install the `FastLED` library from the Library Manager. This code creates a chasing rainbow effect around the ring.

```cpp
#include <FastLED.h>

#define DATA_PIN    6
#define NUM_LEDS    16

CRGB leds[NUM_LEDS];
uint8_t hue = 0; // Global hue value

void setup() {
  FastLED.addLeds<WS2812B, DATA_PIN, GRB>(leds, NUM_LEDS);
  FastLED.setBrightness(50);
}

void loop() {
  // Fill the ring with a rainbow gradient
  fill_rainbow(leds, NUM_LEDS, hue, 255 / NUM_LEDS);
  
  FastLED.show();
  
  // Slowly shift the starting hue
  hue++;
  
  delay(20); // Control the speed of rotation
}
```

## Simulation Notes
- The physical layout in the simulator dynamically scales based on the `pixels` attribute. Rings larger than 60 pixels may clip outside standard breadboard bounds.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-neopixel-matrix" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: NeoPixel Matrix</a>
  </div>
  <div>
    <a href="/docs/components/openhw-nlsf595" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: NLSF595 Shift Register &rarr;</a>
  </div>
</div>
