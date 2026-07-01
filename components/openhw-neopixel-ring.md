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
    <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="45" fill="none" stroke="#1e293b" stroke-width="15" />
      <circle cx="50" cy="15" r="4" fill="#a855f7" />
      <circle cx="63" cy="17" r="4" fill="#ec4899" />
      <circle cx="75" cy="25" r="4" fill="#f43f5e" />
      <circle cx="83" cy="37" r="4" fill="#ef4444" />
      <circle cx="85" cy="50" r="4" fill="#f97316" />
      <circle cx="83" cy="63" r="4" fill="#f59e0b" />
      <circle cx="75" cy="75" r="4" fill="#eab308" />
      <circle cx="63" cy="83" r="4" fill="#84cc16" />
      <circle cx="50" cy="85" r="4" fill="#22c55e" />
      <circle cx="37" cy="83" r="4" fill="#10b981" />
      <circle cx="25" cy="75" r="4" fill="#14b8a6" />
      <circle cx="17" cy="63" r="4" fill="#06b6d4" />
      <circle cx="15" cy="50" r="4" fill="#0ea5e9" />
      <circle cx="17" cy="37" r="4" fill="#3b82f6" />
      <circle cx="25" cy="25" r="4" fill="#6366f1" />
      <circle cx="37" cy="17" r="4" fill="#8b5cf6" />
    </svg>
    <span style="font-size:11px;color:#4a5568;">NeoPixel Ring</span>
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
1. Connect **VCC** to 5V.
2. Connect **GND** to GND.
3. Connect **DIN** to Arduino **D6**.

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
