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
    <img src="/images/components/openhw-nlsf595.svg" alt="NLSF595 SPI LED Driver" style="width:128px; height:64px; max-width: 150px; max-height: 150px" />
    <span style="font-size:11px;color:var(--vp-c-text-2);">DIP-16 IC</span>
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

Connect the NLSF595 module to the Arduino via SPI pins.

<p align="center">
  <img src="/images/components/openhw-nlsf595_wiring.png" alt="Wiring Diagram" style="max-width: 100%; border-radius: 8px; margin: 20px 0;" />
</p>

<TryInSimulator />

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
