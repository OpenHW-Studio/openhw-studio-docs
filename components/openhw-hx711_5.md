---
title: "HX711 Load Cell (5kg)"
description: "A 24-bit analog-to-digital converter paired with a 5kg load cell for measuring weight."
slug: /components/openhw-hx711_5
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Sensors">Sensors</a> &gt; 
  <span>HX711 Load Cell (5kg)</span>
</div>

# HX711 Load Cell (5kg)
<p class="subtitle">A high-precision 24-bit analog-to-digital converter designed specifically for weigh scales and industrial control applications.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <rect x="25" y="45" width="70" height="30" rx="2" fill="var(--vp-c-text-2)" stroke="#94a3b8" stroke-width="2" />
      <rect x="45" y="55" width="30" height="10" rx="5" fill="var(--vp-c-text-1)" stroke="#94a3b8" />
      <circle cx="35" cy="60" r="2" fill="var(--vp-c-text-2)" />
      <circle cx="85" cy="60" r="2" fill="var(--vp-c-text-2)" />
      <rect x="45" y="80" width="30" height="20" rx="2" fill="#0f172a" />
      <text x="60" y="92" fill="var(--vp-c-text-2)" font-family="monospace" font-size="8" font-weight="bold" text-anchor="middle">HX711</text>
      <path d="M 60 75 L 60 80" stroke="#ef4444" stroke-width="1" />
      <path d="M 55 75 L 55 80" stroke="#10b981" stroke-width="1" />
      <path d="M 65 75 L 65 80" stroke="#facc15" stroke-width="1" />
      <path d="M 50 75 L 50 80" stroke="#3b82f6" stroke-width="1" />
    </svg>
    <span style="font-size:11px;color:var(--vp-c-text-2);">Load Cell & Amp</span>
  </div>
  <div class="component-info">
    <p>This module consists of a physical aluminum load cell (strain gauge) capable of measuring up to 5kg, pre-wired to an HX711 amplifier breakout board. The amplifier translates the microscopic analog voltage changes into a digital signal.</p>
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

Example of connecting the HX711 Load Cell to an Arduino Uno.

<p align="center">
  <img src="/images/components/openhw-hx711_5_wiring.png" alt="Wiring Diagram" style="max-width: 100%; border-radius: 8px; margin: 20px 0;" />
</p>

<TryInSimulator />

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
    <a href="/docs/components/openhw-hp4067" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: HP4067</a>
  </div>
  <div>
    <a href="/docs/components/openhw-hx711_50" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: HX711 (50kg) &rarr;</a>
  </div>
</div>
