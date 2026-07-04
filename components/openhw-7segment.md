---
title: "7-Segment Display"
description: "A classic 7-segment LED display for showing numerical digits."
slug: /components/openhw-7segment
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Displays">Displays</a> &gt; 
  <span>7-Segment Display</span>
</div>

# 7-Segment Display
<p class="subtitle">A classic single-digit LED indicator used to display numerals and basic characters in retro electronics.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <img src="/images/components/openhw-7segment.svg" alt="7-Segment Display" style="width:76px; height:113px; max-width: 100%; max-height: 150px" />
    <span style="font-size:11px;color:var(--vp-c-text-2);">7-Segment</span>
  </div>
  <div class="component-info">
    <p>The 7-segment display is an arrangement of 7 distinct LEDs in a figure-8 pattern (plus a decimal point). By selectively turning on specific combinations of these segments, you can display any number from 0 to 9, as well as several alphabetical characters. It comes in Common Anode and Common Cathode variants.</p>
    <div>
      <span class="tag">Displays</span>
      <span class="tag">LED</span>
      <span class="tag">Numerical</span>
    </div>
  </div>
</div>

## Overview
Before LCDs and OLEDs became ubiquitous, 7-segment displays were the primary way devices communicated numeric information to users. They are still widely used today due to their low cost, high visibility, and simplicity.

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">A</span></td><td><span class="pin-type digital">digital</span></td><td>Controls the top horizontal segment.</td></tr>
<tr><td><span class="pin-name">B</span></td><td><span class="pin-type digital">digital</span></td><td>Controls the top-right vertical segment.</td></tr>
<tr><td><span class="pin-name">C</span></td><td><span class="pin-type digital">digital</span></td><td>Controls the bottom-right vertical segment.</td></tr>
<tr><td><span class="pin-name">D</span></td><td><span class="pin-type digital">digital</span></td><td>Controls the bottom horizontal segment.</td></tr>
<tr><td><span class="pin-name">E</span></td><td><span class="pin-type digital">digital</span></td><td>Controls the bottom-left vertical segment.</td></tr>
<tr><td><span class="pin-name">F</span></td><td><span class="pin-type digital">digital</span></td><td>Controls the top-left vertical segment.</td></tr>
<tr><td><span class="pin-name">G</span></td><td><span class="pin-type digital">digital</span></td><td>Controls the middle horizontal segment.</td></tr>
<tr><td><span class="pin-name">DP</span></td><td><span class="pin-type digital">digital</span></td><td>Controls the Decimal Point (dot) at the bottom right.</td></tr>
<tr><td><span class="pin-name">COM.1</span></td><td><span class="pin-type power">power</span></td><td>Common pin (connects to VCC for Anode, GND for Cathode).</td></tr>
<tr><td><span class="pin-name">COM.2</span></td><td><span class="pin-type power">power</span></td><td>Second Common pin (internally connected to COM.1).</td></tr>
</table>

## Configurable Attributes
<table class="attrs-table">
<tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr>
<tr><td><strong>color</strong></td><td><code>string</code></td><td><code>"red"</code></td><td>The color of the illuminated segments.</td></tr>
<tr><td><strong>common</strong></td><td><code>string</code></td><td><code>"cathode"</code></td><td>Sets the display type. Use <code>"anode"</code> or <code>"cathode"</code>.</td></tr>
<tr><td><strong>digits</strong></td><td><code>number</code></td><td><code>1</code></td><td>Number of digits (if multi-digit component is used).</td></tr>
<tr><td><strong>colon</strong></td><td><code>boolean</code></td><td><code>false</code></td><td>Enables a colon (:) between digits, usually for clocks.</td></tr>
</table>

## Working Principle
- **Common Cathode**: All 8 LEDs share a single Ground (`COM`). To turn a segment ON, you supply `HIGH` logic to its respective pin (`A`-`G`).
- **Common Anode**: All 8 LEDs share a single VCC (`COM`). To turn a segment ON, you supply `LOW` logic to its respective pin, allowing current to sink into the microcontroller.

## Wiring Diagram

<p align="center">
  <img src="/images/components/openhw-7segment_wiring.png" alt="Wiring Diagram" style="max-width: 100%; border-radius: 8px; margin: 20px 0;" />
</p>

<TryInSimulator />

## Example Arduino Code
To simplify wiring and logic, the `SevSeg` library is highly recommended.

```cpp
#include "SevSeg.h"
SevSeg sevseg;

void setup() {
  byte numDigits = 1;
  byte digitPins[] = {10}; // Connect COM to pin 10 if multiplexing, otherwise ignore
  // Pins in order: A, B, C, D, E, F, G, DP
  byte segmentPins[] = {2, 3, 4, 5, 6, 7, 8, 9};
  bool resistorsOnSegments = true;
  
  // Initialize as Common Cathode
  sevseg.begin(COMMON_CATHODE, numDigits, digitPins, segmentPins, resistorsOnSegments);
  sevseg.setBrightness(90);
}

void loop() {
  // Display the number 4
  sevseg.setNumber(4);
  sevseg.refreshDisplay(); // Must run repeatedly if multiplexing
}
```

## Simulation Notes
- The simulator models both common anode and common cathode behaviors based on the `common` attribute.
- Multi-digit displays use multiplexing, which requires rapid switching in the Arduino `loop()`. If the simulation stutters, the display may appear to flicker just as it would in real life if the refresh rate is too low.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-74hc595" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: 74HC595 Shift Register</a>
  </div>
  <div>
    <a href="/docs/components/openhw-a4988" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: A4988 Stepper Driver (Actuators) &rarr;</a>
  </div>
</div>
