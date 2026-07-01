---
title: "LCD 20x4 (Parallel)"
description: "A large 20x4 character LCD display using a parallel interface."
slug: /components/openhw-lcd2004
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Displays">Displays</a> &gt; 
  <span>LCD 20x4 (Parallel)</span>
</div>

# LCD 20x4 (Parallel)
<p class="subtitle">A spacious 20-column by 4-row alphanumeric display utilizing the classic Hitachi HD44780 parallel interface.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="150" height="90" viewBox="0 0 150 90" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="140" height="80" fill="#15803d" />
      <rect x="15" y="15" width="120" height="60" fill="#3b82f6" stroke="#1e3a8a" stroke-width="2" />
      <text x="75" y="30" fill="var(--vp-c-text-1)" font-family="monospace" font-size="10" font-weight="bold" text-anchor="middle">OpenHW Studio 20x4</text>
      <text x="75" y="45" fill="var(--vp-c-text-1)" font-family="monospace" font-size="10" font-weight="bold" text-anchor="middle">Line 2 text...</text>
      <text x="75" y="60" fill="var(--vp-c-text-1)" font-family="monospace" font-size="10" font-weight="bold" text-anchor="middle">Line 3 text...</text>
      <text x="75" y="75" fill="var(--vp-c-text-1)" font-family="monospace" font-size="10" font-weight="bold" text-anchor="middle">Line 4 text...</text>
      <circle cx="10" cy="10" r="2" fill="#0f172a" />
      <circle cx="140" cy="10" r="2" fill="#0f172a" />
      <circle cx="10" cy="80" r="2" fill="#0f172a" />
      <circle cx="140" cy="80" r="2" fill="#0f172a" />
      <rect x="15" y="5" width="120" height="4" fill="#fbbf24" />
      <rect x="22" y="5" width="4" height="4" fill="#0f172a" />
      <rect x="28" y="5" width="4" height="4" fill="#0f172a" />
      <rect x="34" y="5" width="4" height="4" fill="#0f172a" />
      <rect x="40" y="5" width="4" height="4" fill="#0f172a" />
      <rect x="46" y="5" width="4" height="4" fill="#0f172a" />
      <rect x="52" y="5" width="4" height="4" fill="#0f172a" />
      <rect x="58" y="5" width="4" height="4" fill="#0f172a" />
      <rect x="64" y="5" width="4" height="4" fill="#0f172a" />
      <rect x="70" y="5" width="4" height="4" fill="#0f172a" />
      <rect x="76" y="5" width="4" height="4" fill="#0f172a" />
      <rect x="82" y="5" width="4" height="4" fill="#0f172a" />
      <rect x="88" y="5" width="4" height="4" fill="#0f172a" />
      <rect x="94" y="5" width="4" height="4" fill="#0f172a" />
      <rect x="100" y="5" width="4" height="4" fill="#0f172a" />
      <rect x="106" y="5" width="4" height="4" fill="#0f172a" />
      <rect x="112" y="5" width="4" height="4" fill="#0f172a" />
    </svg>
    <span style="font-size:11px;color:var(--vp-c-text-2);">20x4 LCD</span>
  </div>
  <div class="component-info">
    <p>A classic alphanumeric liquid crystal display based on the HD44780 controller. It can display 20 characters per line across 4 lines. This version uses a parallel interface requiring at least 6 digital pins.</p>
    <div>
      <span class="tag">Displays</span>
      <span class="tag">Parallel</span>
      <span class="tag">Text</span>
    </div>
  </div>
</div>

## Overview
Because this module doesn't use an I2C backpack, you must wire 6 digital lines (in 4-bit mode) directly to the Arduino, plus power and contrast lines. It offers more screen real estate (80 chars total) than the 16x2 version but uses the same underlying HD44780 controller commands.

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
This uses the standard Arduino `LiquidCrystal` library built into the IDE. Notice the `lcd.begin(20, 4)` initialization.

```cpp
#include <LiquidCrystal.h>

// Initialize the library with the numbers of the interface pins
// LiquidCrystal(rs, enable, d4, d5, d6, d7)
LiquidCrystal lcd(12, 11, 5, 4, 3, 2);

void setup() {
  // Set up the LCD's number of columns and rows (20x4):
  lcd.begin(20, 4);
  
  lcd.setCursor(0, 0);
  lcd.print("OpenHW Studio!");
  
  lcd.setCursor(0, 1);
  lcd.print("20x4 LCD Display");
}

void loop() {
  lcd.setCursor(0, 2);
  lcd.print("Timer: ");
  lcd.print(millis() / 1000);
  
  lcd.setCursor(0, 3);
  lcd.print("Running smoothly...");
}
```

## Simulation Notes
- The simulator automatically assumes max contrast if `V0` is wired directly to ground.
- You can leave `D0-D3` completely disconnected in the simulator when using 4-bit mode.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-lcd2004-i2c" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: LCD 20x4 (I2C)</a>
  </div>
  <div>
    <a href="/docs/components/openhw-ldr-module" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: LDR Module &rarr;</a>
  </div>
</div>
