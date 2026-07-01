---
title: "SPI LED Driver (NLSF595)"
description: "A serial-in, parallel-out shift register specifically designed for driving LEDs."
slug: /components/openhw-nlsf595
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Logic Components">Logic Components</a> &gt; 
  <span>SPI LED Driver (NLSF595)</span>
</div>

# SPI LED Driver (NLSF595)
<p class="subtitle">A shift register similar to the 74HC595 but optimized with higher current capabilities for driving multiple LEDs directly without external transistors.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="80" height="100" viewBox="0 0 80 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="15" y="10" width="50" height="80" rx="4" fill="#1e293b" />
      <circle cx="22" cy="18" r="3" fill="#cbd5e1" />
      <rect x="5" y="15" width="10" height="4" fill="#cbd5e1" />
      <rect x="5" y="25" width="10" height="4" fill="#cbd5e1" />
      <rect x="5" y="35" width="10" height="4" fill="#cbd5e1" />
      <rect x="5" y="45" width="10" height="4" fill="#cbd5e1" />
      <rect x="5" y="55" width="10" height="4" fill="#cbd5e1" />
      <rect x="5" y="65" width="10" height="4" fill="#cbd5e1" />
      <rect x="5" y="75" width="10" height="4" fill="#cbd5e1" />
      <rect x="5" y="85" width="10" height="4" fill="#cbd5e1" />
      <rect x="65" y="15" width="10" height="4" fill="#cbd5e1" />
      <rect x="65" y="25" width="10" height="4" fill="#cbd5e1" />
      <rect x="65" y="35" width="10" height="4" fill="#cbd5e1" />
      <rect x="65" y="45" width="10" height="4" fill="#cbd5e1" />
      <rect x="65" y="55" width="10" height="4" fill="#cbd5e1" />
      <rect x="65" y="65" width="10" height="4" fill="#cbd5e1" />
      <rect x="65" y="75" width="10" height="4" fill="#cbd5e1" />
      <rect x="65" y="85" width="10" height="4" fill="#cbd5e1" />
      <text x="40" y="52" fill="#f8fafc" font-family="monospace" font-size="8" text-anchor="middle" transform="rotate(-90, 40, 52)">NLSF595</text>
    </svg>
    <span style="font-size:11px;color:#4a5568;">DIP-16 IC</span>
  </div>
  <div class="component-info">
    <p>The NLSF595 takes serial data in (via SPI or bit-banging) and outputs it in parallel across 8 pins. Unlike standard logic shift registers, it is designed to sink higher currents, making it ideal for directly driving LEDs or 7-segment displays.</p>
    <div>
      <span class="tag">Logic Components</span>
      <span class="tag">Shift Register</span>
      <span class="tag">SPI</span>
    </div>
  </div>
</div>

## Overview
Shift registers allow you to expand the number of output pins on your microcontroller. By using just 3 pins (Data, Clock, and Latch), you can control 8 outputs. Multiple NLSF595 chips can be daisy-chained together to control 16, 24, or more LEDs with those same 3 pins.

## Pin Reference
*(Note: As this represents a generic NLSF595 breakout module, the pinout is simplified compared to the raw IC).*
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">VCC</span></td><td><span class="pin-type power">power</span></td><td>Power Supply (5V).</td></tr>
<tr><td><span class="pin-name">GND</span></td><td><span class="pin-type power">power</span></td><td>Ground.</td></tr>
<tr><td><span class="pin-name">MOSI</span></td><td><span class="pin-type digital">digital</span></td><td>Serial Data In (connect to Arduino D11 for hardware SPI, or any digital pin for shiftOut).</td></tr>
<tr><td><span class="pin-name">SCK</span></td><td><span class="pin-type digital">digital</span></td><td>Serial Clock (connect to Arduino D13 for hardware SPI, or any digital pin for shiftOut).</td></tr>
<tr><td><span class="pin-name">CS</span></td><td><span class="pin-type digital">digital</span></td><td>Chip Select / Latch (connect to Arduino D10 or any digital pin).</td></tr>
<tr><td><span class="pin-name">R1</span></td><td><span class="pin-type output">output</span></td><td>Example output pin for Red LED.</td></tr>
<tr><td><span class="pin-name">G1</span></td><td><span class="pin-type output">output</span></td><td>Example output pin for Green LED.</td></tr>
<tr><td><span class="pin-name">B1</span></td><td><span class="pin-type output">output</span></td><td>Example output pin for Blue LED.</td></tr>
</table>

## Configurable Attributes
*This component has no standard configurable attributes.*

## Wiring Diagram
1. Connect **VCC** to 5V.
2. Connect **GND** to GND.
3. Connect **MOSI** to Arduino **D11**.
4. Connect **CS** to Arduino **D10**.
5. Connect **SCK** to Arduino **D13**.

## Example Arduino Code
This code uses the built-in `shiftOut()` function to send an 8-bit value to the shift register. The latch pin must be pulled LOW before shifting data and pulled HIGH to update the outputs.

```cpp
const int latchPin = 10;
const int dataPin = 11;
const int clockPin = 13;

void setup() {
  pinMode(latchPin, OUTPUT);
  pinMode(clockPin, OUTPUT);
  pinMode(dataPin, OUTPUT);
}

void loop() {
  // Turn all outputs ON (Binary 11111111 = 255)
  digitalWrite(latchPin, LOW);
  shiftOut(dataPin, clockPin, MSBFIRST, 255);
  digitalWrite(latchPin, HIGH);
  
  delay(1000);
  
  // Turn all outputs OFF (Binary 00000000 = 0)
  digitalWrite(latchPin, LOW);
  shiftOut(dataPin, clockPin, MSBFIRST, 0);
  digitalWrite(latchPin, HIGH);
  
  delay(1000);
}
```

## Simulation Notes
- The OpenHW Simulator treats the NLSF595 identically to the 74HC595 for logic simulation purposes. It will output logic HIGH/LOW based on the shifted data.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-neopixel-ring" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: NeoPixel Ring</a>
  </div>
  <div>
    <a href="/docs/components/openhw-nrf24l01" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: nRF24L01+ Transceiver &rarr;</a>
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
.pin-type.output { background: #4a1c40; color: #ed64a6; }
.pin-type.default { background: #2d3748; color: #a0aec0; }
.circuit-preview { background: #0d1117; border: 1px solid #2d3748; border-radius: 8px; padding: 20px; margin-top: 16px; display: flex; align-items: center; justify-content: center; min-height: 140px; }
:root { --vp-c-bg: #0f1117; }
@media (max-width: 640px) { .component-preview { flex-direction: column; align-items: center; } }
</style>
