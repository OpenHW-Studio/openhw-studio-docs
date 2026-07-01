---
title: "HX711 Load Cell (50kg)"
description: "A 24-bit analog-to-digital converter paired with a 50kg load cell for measuring weight."
slug: /components/openhw-hx711_50
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Sensors">Sensors</a> &gt; 
  <span>HX711 Load Cell (50kg)</span>
</div>

# HX711 Load Cell (50kg)
<p class="subtitle">A high-precision 24-bit analog-to-digital converter designed specifically for weigh scales and industrial control applications.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <rect x="25" y="45" width="70" height="30" rx="2" fill="#cbd5e1" stroke="#94a3b8" stroke-width="2" />
      <rect x="45" y="55" width="30" height="10" rx="5" fill="#f8fafc" stroke="#94a3b8" />
      <circle cx="35" cy="60" r="2" fill="#94a3b8" />
      <circle cx="85" cy="60" r="2" fill="#94a3b8" />
      <rect x="45" y="80" width="30" height="20" rx="2" fill="#0f172a" />
      <text x="60" y="92" fill="#94a3b8" font-family="monospace" font-size="8" font-weight="bold" text-anchor="middle">HX711</text>
      <path d="M 60 75 L 60 80" stroke="#ef4444" stroke-width="1" />
      <path d="M 55 75 L 55 80" stroke="#10b981" stroke-width="1" />
      <path d="M 65 75 L 65 80" stroke="#facc15" stroke-width="1" />
      <path d="M 50 75 L 50 80" stroke="#3b82f6" stroke-width="1" />
    </svg>
    <span style="font-size:11px;color:#4a5568;">Load Cell & Amp</span>
  </div>
  <div class="component-info">
    <p>This module consists of a physical aluminum load cell (strain gauge) capable of measuring up to 50kg, pre-wired to an HX711 amplifier breakout board. The amplifier translates the microscopic analog voltage changes into a digital signal.</p>
    <div>
      <span class="tag">Sensors</span>
      <span class="tag">Weight</span>
      <span class="tag">ADC</span>
    </div>
  </div>
</div>

## Overview
A load cell is essentially a metal bar with strain gauges glued to it. When weight is applied, the bar bends slightly, changing the electrical resistance of the gauges. Because this change is incredibly small, the HX711 chip amplifies the signal and converts it to a 24-bit digital value.

## Pin Reference
*(Note: These are the pins connecting the HX711 board to the Arduino. The 4 wires connecting the load cell to the HX711 are internally managed).*

<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">VCC</span></td><td><span class="pin-type power">power</span></td><td>Power supply (2.7V to 5.5V).</td></tr>
<tr><td><span class="pin-name">DT</span></td><td><span class="pin-type digital">digital</span></td><td>Data Output. Connect to any digital pin.</td></tr>
<tr><td><span class="pin-name">SCK</span></td><td><span class="pin-type digital">digital</span></td><td>Clock Input. Connect to any digital pin.</td></tr>
<tr><td><span class="pin-name">GND</span></td><td><span class="pin-type power">power</span></td><td>Ground.</td></tr>
</table>

## Configurable Attributes
<table class="attrs-table">
<tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr>
<tr><td><strong>load</strong></td><td><code>number</code></td><td><code>0</code></td><td>The simulated weight (load) applied to the cell, usually in grams. Adjustable via the UI slider during simulation.</td></tr>
</table>

## Working Principle
The HX711 does not use I2C or SPI; it uses a custom two-wire protocol. The Arduino pulses the `SCK` pin to read the 24 bits of data out of the `DT` pin one by one. The number of clock pulses also dictates the gain (amplification) used for the next reading.

## Wiring Diagram
1. Connect **VCC** to 5V.
2. Connect **GND** to Ground.
3. Connect **DT** to D3.
4. Connect **SCK** to D2.

## Example Arduino Code
*Install the **HX711 by bodge** library via the Library Manager before running.*

```cpp
#include "HX711.h"

// HX711 circuit wiring
const int LOADCELL_DOUT_PIN = 3;
const int LOADCELL_SCK_PIN = 2;

HX711 scale;

void setup() {
  Serial.begin(9600);
  Serial.println("HX711 Demo");
  
  scale.begin(LOADCELL_DOUT_PIN, LOADCELL_SCK_PIN);
  
  // You must calibrate your scale! 
  // Set this to the value obtained from a calibration sketch.
  scale.set_scale(420.0983); 
  
  // Reset the scale to 0 (tare)
  scale.tare(); 
}

void loop() {
  if (scale.is_ready()) {
    // Read the weight (in units dictated by set_scale)
    float weight = scale.get_units(5); 
    
    Serial.print("Weight: ");
    Serial.print(weight, 1);
    Serial.println(" g");
  } else {
    Serial.println("HX711 not found.");
  }
  
  delay(1000);
}
```

## Simulation Notes
- You can dynamically adjust the weight on the load cell during simulation by clicking it and using the slider popup.
- The simulator provides raw ADC values directly proportional to the slider value.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-hx711_5" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: HX711 (5kg)</a>
  </div>
  <div>
    <a href="/docs/components/openhw-ili9341" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: ILI9341 TFT &rarr;</a>
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
