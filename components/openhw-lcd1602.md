---
title: "LCD 16x2 (Parallel)"
description: "A 16x2 character LCD display using a parallel interface, common in many Arduino projects."
slug: /components/openhw-lcd1602
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Displays">Displays</a> &gt; 
  <span>LCD 16x2 (Parallel)</span>
</div>

# LCD 16x2 (Parallel)
<p class="subtitle">Standard 16-character by 2-line alphanumeric display utilizing the classic Hitachi HD44780 parallel interface.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="140" height="60" viewBox="0 0 140 60" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="130" height="50" fill="#15803d" />
      <rect x="15" y="15" width="110" height="30" fill="#3b82f6" stroke="#1e3a8a" stroke-width="2" />
      <text x="70" y="35" fill="#f8fafc" font-family="monospace" font-size="12" font-weight="bold" text-anchor="middle">Hello World</text>
      <circle cx="10" cy="10" r="2" fill="#0f172a" />
      <circle cx="130" cy="10" r="2" fill="#0f172a" />
      <circle cx="10" cy="50" r="2" fill="#0f172a" />
      <circle cx="130" cy="50" r="2" fill="#0f172a" />
      <rect x="15" y="5" width="110" height="4" fill="#fbbf24" />
      <rect x="20" y="5" width="4" height="4" fill="#0f172a" />
      <rect x="26" y="5" width="4" height="4" fill="#0f172a" />
      <rect x="32" y="5" width="4" height="4" fill="#0f172a" />
      <rect x="38" y="5" width="4" height="4" fill="#0f172a" />
      <rect x="44" y="5" width="4" height="4" fill="#0f172a" />
      <rect x="50" y="5" width="4" height="4" fill="#0f172a" />
      <rect x="56" y="5" width="4" height="4" fill="#0f172a" />
      <rect x="62" y="5" width="4" height="4" fill="#0f172a" />
      <rect x="68" y="5" width="4" height="4" fill="#0f172a" />
      <rect x="74" y="5" width="4" height="4" fill="#0f172a" />
      <rect x="80" y="5" width="4" height="4" fill="#0f172a" />
      <rect x="86" y="5" width="4" height="4" fill="#0f172a" />
      <rect x="92" y="5" width="4" height="4" fill="#0f172a" />
      <rect x="98" y="5" width="4" height="4" fill="#0f172a" />
      <rect x="104" y="5" width="4" height="4" fill="#0f172a" />
      <rect x="110" y="5" width="4" height="4" fill="#0f172a" />
    </svg>
    <span style="font-size:11px;color:#4a5568;">16x2 LCD</span>
  </div>
  <div class="component-info">
    <p>A classic alphanumeric liquid crystal display based on the HD44780 controller. It can display 16 characters per line across 2 lines. This version uses a parallel interface requiring at least 6 digital pins.</p>
    <div>
      <span class="tag">Displays</span>
      <span class="tag">Parallel</span>
      <span class="tag">Text</span>
    </div>
  </div>
</div>

## Overview
The **LCD 16x2** is one of the most common display modules for microcontrollers. Because it doesn't use an I2C backpack, you must wire 6 digital lines (in 4-bit mode) directly to the Arduino, plus power and contrast lines.

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">VSS</span></td><td><span class="pin-type power">power</span></td><td>Ground (GND).</td></tr>
<tr><td><span class="pin-name">VDD</span></td><td><span class="pin-type power">power</span></td><td>Power (5V).</td></tr>
<tr><td><span class="pin-name">V0</span></td><td><span class="pin-type analog">analog</span></td><td>Contrast Adjustment. Usually connected to a potentiometer.</td></tr>
<tr><td><span class="pin-name">RS</span></td><td><span class="pin-type digital">digital</span></td><td>Register Select (0 = Instruction, 1 = Data).</td></tr>
<tr><td><span class="pin-name">RW</span></td><td><span class="pin-type digital">digital</span></td><td>Read/Write. Tie to GND for Write-only.</td></tr>
<tr><td><span class="pin-name">E</span></td><td><span class="pin-type digital">digital</span></td><td>Enable signal.</td></tr>
<tr><td><span class="pin-name">D0-D3</span></td><td><span class="pin-type digital">digital</span></td><td>Lower data pins (not used in standard 4-bit mode).</td></tr>
<tr><td><span class="pin-name">D4-D7</span></td><td><span class="pin-type digital">digital</span></td><td>Higher data pins (used for both 4-bit and 8-bit modes).</td></tr>
<tr><td><span class="pin-name">A</span></td><td><span class="pin-type power">power</span></td><td>Backlight Anode (+5V).</td></tr>
<tr><td><span class="pin-name">K</span></td><td><span class="pin-type power">power</span></td><td>Backlight Cathode (GND).</td></tr>
</table>

## Configurable Attributes
<table class="attrs-table">
<tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr>
<tr><td><strong>color</strong></td><td><code>string</code></td><td><code>blue</code></td><td>The backlight color in the simulator (e.g., blue or green).</td></tr>
</table>

## Wiring Diagram (4-bit Mode)
1. Connect **VSS**, **RW**, and **K** to Ground.
2. Connect **VDD** and **A** to 5V.
3. Connect **V0** to Ground (for max contrast).
4. Connect **RS** to Arduino D12.
5. Connect **E** to Arduino D11.
6. Connect **D4** to Arduino D5.
7. Connect **D5** to Arduino D4.
8. Connect **D6** to Arduino D3.
9. Connect **D7** to Arduino D2.

## Example Arduino Code
This uses the standard Arduino `LiquidCrystal` library built into the IDE.

```cpp
#include <LiquidCrystal.h>

// Initialize the library with the numbers of the interface pins
// LiquidCrystal(rs, enable, d4, d5, d6, d7)
LiquidCrystal lcd(12, 11, 5, 4, 3, 2);

void setup() {
  // Set up the LCD's number of columns and rows:
  lcd.begin(16, 2);
  
  // Print a message to the LCD.
  lcd.print("Hello World!");
}

void loop() {
  // Set the cursor to column 0, line 1
  // (note: line 1 is the second row, since counting begins with 0):
  lcd.setCursor(0, 1);
  
  // Print the number of seconds since reset:
  lcd.print(millis() / 1000);
}
```

## Simulation Notes
- The simulator automatically assumes max contrast if `V0` is wired directly to ground.
- You can leave `D0-D3` completely disconnected in the simulator when using 4-bit mode.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-lcd1602-i2c" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: LCD 16x2 (I2C)</a>
  </div>
  <div>
    <a href="/docs/components/openhw-lcd2004-i2c" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: LCD 20x4 (I2C) &rarr;</a>
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
