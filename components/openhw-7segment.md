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
    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <rect x="30" y="20" width="60" height="80" rx="4" fill="#1e293b" stroke="#334155" stroke-width="3" />
      <path d="M 45,30 L 75,30 L 70,35 L 50,35 Z" fill="#ef4444" opacity="0.9" />
      <path d="M 77,32 L 77,53 L 72,50 L 72,35 Z" fill="#ef4444" opacity="0.9" />
      <path d="M 77,57 L 77,78 L 72,75 L 72,60 Z" fill="#ef4444" opacity="0.9" />
      <path d="M 45,80 L 75,80 L 70,75 L 50,75 Z" fill="#ef4444" opacity="0.9" />
      <path d="M 43,57 L 43,78 L 48,75 L 48,60 Z" fill="#ef4444" opacity="0.9" />
      <path d="M 43,32 L 43,53 L 48,50 L 48,35 Z" fill="#ef4444" opacity="0.9" />
      <path d="M 45,55 L 75,55 L 70,52 L 50,52 Z" fill="#ef4444" opacity="0.9" />
      <circle cx="82" cy="80" r="3" fill="#ef4444" opacity="0.2" />
    </svg>
    <span style="font-size:11px;color:#4a5568;">7-Segment</span>
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
1. Connect **COM.1** (or COM.2) to **GND** (for common cathode) or **5V** (for common anode).
2. Connect pins **A** through **G** (and optionally **DP**) to digital pins on your Arduino. 
3. *Note: In a physical circuit, you must use current-limiting resistors (e.g., 220Ω or 330Ω) on either the common pin or the individual segment pins to prevent burning out the LEDs.*

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
