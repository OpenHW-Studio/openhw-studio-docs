---
title: "MicroSD Card Module"
description: "An SPI-based module for reading and writing data to a MicroSD card."
slug: /components/openhw-sd-card
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Logic Components">Logic Components</a> &gt; 
  <span>MicroSD Card Module</span>
</div>

# MicroSD Card Module
<p class="subtitle">An SPI interface module that allows a microcontroller to read and write files to a MicroSD card.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="60" height="90" viewBox="0 0 60 90" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="40" height="50" rx="4" fill="#1e293b" />
      <rect x="15" y="15" width="30" height="40" rx="2" fill="#0f172a" />
      <polygon points="45,15 45,25 40,25 40,15" fill="#fcd34d" />
      <text x="30" y="35" fill="#94a3b8" font-family="monospace" font-size="8" text-anchor="middle">MicroSD</text>
      <rect x="14" y="60" width="3" height="15" fill="#cbd5e1" />
      <rect x="20" y="60" width="3" height="15" fill="#cbd5e1" />
      <rect x="26" y="60" width="3" height="15" fill="#cbd5e1" />
      <rect x="32" y="60" width="3" height="15" fill="#cbd5e1" />
      <rect x="38" y="60" width="3" height="15" fill="#cbd5e1" />
      <rect x="44" y="60" width="3" height="15" fill="#cbd5e1" />
    </svg>
    <span style="font-size:11px;color:#4a5568;">SD Module</span>
  </div>
  <div class="component-info">
    <p>The MicroSD Card module provides an easy way to add mass storage to your Arduino projects. Using the standard SPI bus, you can log sensor data, read configuration files, or store assets like images and audio.</p>
    <div>
      <span class="tag">Logic Components</span>
      <span class="tag">SPI</span>
      <span class="tag">Storage</span>
    </div>
  </div>
</div>

## Overview
This module acts as a bridge between the Arduino's SPI interface and the SD card's native interface. Because SD cards operate at 3.3V, many modules include a built-in voltage regulator and logic level shifter so they can be safely used with 5V boards like the Arduino Uno.

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">CD</span></td><td><span class="pin-type digital">digital</span></td><td>Card Detect. Goes LOW when a card is inserted.</td></tr>
<tr><td><span class="pin-name">MISO</span></td><td><span class="pin-type digital">digital</span></td><td>Master In Slave Out (SPI Data to Arduino). Connect to D12 (Uno).</td></tr>
<tr><td><span class="pin-name">GND</span></td><td><span class="pin-type power">power</span></td><td>Ground.</td></tr>
<tr><td><span class="pin-name">SCK</span></td><td><span class="pin-type digital">digital</span></td><td>SPI Clock. Connect to D13 (Uno).</td></tr>
<tr><td><span class="pin-name">VCC</span></td><td><span class="pin-type power">power</span></td><td>Power Supply (usually 5V, check module specs).</td></tr>
<tr><td><span class="pin-name">MOSI</span></td><td><span class="pin-type digital">digital</span></td><td>Master Out Slave In (SPI Data from Arduino). Connect to D11 (Uno).</td></tr>
<tr><td><span class="pin-name">CS</span></td><td><span class="pin-type digital">digital</span></td><td>Chip Select. Connect to any digital pin (often D4 or D8).</td></tr>
</table>

## Configurable Attributes
<table class="attrs-table">
<tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr>
<tr><td><strong>mounted</strong></td><td><code>boolean</code></td><td><code>true</code></td><td>Determines if an SD card is physically inserted into the module.</td></tr>
<tr><td><strong>capacityKB</strong></td><td><code>number</code></td><td><code>2048</code></td><td>Simulated capacity of the SD card in kilobytes.</td></tr>
</table>

## Wiring Diagram (Arduino Uno)
1. Connect **VCC** to **5V**.
2. Connect **GND** to **GND**.
3. Connect **MISO** to **D12**.
4. Connect **MOSI** to **D11**.
5. Connect **SCK** to **D13**.
6. Connect **CS** to **D8** (or your chosen Chip Select pin).

## Example Arduino Code
This standard example uses the built-in `SD.h` library to initialize the card and prepare for reading/writing.

```cpp
#include <SPI.h>
#include <SD.h>

const int chipSelect = 8;

void setup() {
  Serial.begin(9600);
  while (!Serial) {
    ; // wait for serial port to connect.
  }
  
  Serial.print("Initializing SD card...");
  
  // Initialize the SD card
  if (!SD.begin(chipSelect)) {
    Serial.println("initialization failed!");
    return;
  }
  Serial.println("initialization done.");
  
  // Example: Check if a file exists
  if (SD.exists("data.txt")) {
    Serial.println("data.txt exists.");
  } else {
    Serial.println("data.txt doesn't exist.");
  }
}

void loop() {
  // SD Card ready for datalogging.
}
```

## Simulation Notes
- In the OpenHW Simulator, file system operations are simulated in memory. You can use standard Arduino SD library functions like `SD.open()`, `file.print()`, and `file.read()`.
- You can toggle the `mounted` state via the context menu to simulate card removal or insertion during runtime.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-rotary-encoder" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: Rotary Encoder</a>
  </div>
  <div>
    <a href="/docs/components/openhw-servo" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: Servo Motor &rarr;</a>
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
