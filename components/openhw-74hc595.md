---
title: "74HC595 Shift Register"
description: "An 8-bit serial-in/parallel-out (SIPO) shift register used to expand digital outputs."
slug: /components/openhw-74hc595
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Logic%20Components">Logic Components</a> &gt; 
  <span>74HC595 Shift Register</span>
</div>

# 74HC595 Shift Register
<p class="subtitle">An 8-bit serial-in, parallel-out shift register primarily used to massively expand the number of digital outputs on a microcontroller.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="135" height="45" viewBox="0 0 135 45" xmlns="http://www.w3.org/2000/svg">
      <g>
          <rect x="11" y="0" width="8" height="6" fill="#cccccc" />
          <rect x="26" y="0" width="8" height="6" fill="#cccccc" />
          <rect x="41" y="0" width="8" height="6" fill="#cccccc" />
          <rect x="56" y="0" width="8" height="6" fill="#cccccc" />
          <rect x="71" y="0" width="8" height="6" fill="#cccccc" />
          <rect x="86" y="0" width="8" height="6" fill="#cccccc" />
          <rect x="101" y="0" width="8" height="6" fill="#cccccc" />
          <rect x="116" y="0" width="8" height="6" fill="#cccccc" />
          <rect x="11" y="39" width="8" height="6" fill="#cccccc" />
          <rect x="26" y="39" width="8" height="6" fill="#cccccc" />
          <rect x="41" y="39" width="8" height="6" fill="#cccccc" />
          <rect x="56" y="39" width="8" height="6" fill="#cccccc" />
          <rect x="71" y="39" width="8" height="6" fill="#cccccc" />
          <rect x="86" y="39" width="8" height="6" fill="#cccccc" />
          <rect x="101" y="39" width="8" height="6" fill="#cccccc" />
          <rect x="116" y="39" width="8" height="6" fill="#cccccc" />
          <rect x="0" y="4" width="135" height="37" fill="#222222" />
          <path d="M 0 16 A 6 6 0 0 0 0 28" fill="#111111" />
          <circle cx="9" cy="35" r="3.5" fill="#444444" />
          <text x="67.5" y="20.5" fill="#999900" font-size="14" font-family="sans-serif" font-weight="bold" text-anchor="middle" dominant-baseline="middle">74HC</text>
          <text x="67.5" y="34.5" fill="#999900" font-size="14" font-family="sans-serif" font-weight="bold" text-anchor="middle" dominant-baseline="middle">595</text>
      </g>
    </svg>
    <span style="font-size:11px;color:var(--vp-c-text-2);">74HC595</span>
  </div>
  <div class="component-info">
    <p>The 74HC595 is one of the most famous ICs in the maker community. It allows you to control 8 separate outputs (like LEDs, relays, or 7-segment displays) using just 3 pins on your microcontroller. Like the 165, multiple 595 chips can be daisy-chained together to control 16, 24, or even 100+ outputs from those same 3 pins.</p>
    <div>
      <span class="tag">Logic Components</span>
      <span class="tag">Shift Register</span>
      <span class="tag">Output Expansion</span>
    </div>
  </div>
</div>

## Overview
Where the 74HC165 takes multiple inputs and collapses them into one serial line, the 74HC595 does the exact reverse: it takes a single serial line and expands it into 8 parallel outputs. It contains both a shift register (which receives data bit by bit) and a storage register (which holds the data steady on the output pins).

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">VCC</span></td><td><span class="pin-type power">power</span></td><td>Power supply (3V to 5V).</td></tr>
<tr><td><span class="pin-name">GND</span></td><td><span class="pin-type power">power</span></td><td>Ground reference.</td></tr>
<tr><td><span class="pin-name">Q0-Q7</span></td><td><span class="pin-type digital">digital</span></td><td>The 8 parallel outputs. (Pins 15, and 1-7).</td></tr>
<tr><td><span class="pin-name">SER</span></td><td><span class="pin-type input">input</span></td><td>Serial Input (DS). The pin where you send data bits one at a time.</td></tr>
<tr><td><span class="pin-name">SRCLK</span></td><td><span class="pin-type input">input</span></td><td>Shift Register Clock (SHCP). Shifts data from SER into the internal memory on the rising edge.</td></tr>
<tr><td><span class="pin-name">RCLK</span></td><td><span class="pin-type input">input</span></td><td>Storage Register Clock (STCP or Latch). Transfers data from the internal shift register to the output pins (Q0-Q7) on the rising edge.</td></tr>
<tr><td><span class="pin-name">SRCLR</span></td><td><span class="pin-type input">input</span></td><td>Master Reclear (MR). Active LOW. Clears the shift register when tied to GND. Usually tied to VCC.</td></tr>
<tr><td><span class="pin-name">OE</span></td><td><span class="pin-type input">input</span></td><td>Output Enable. Active LOW. Disables all outputs (high impedance) when HIGH. Usually tied to GND.</td></tr>
<tr><td><span class="pin-name">Q7S</span></td><td><span class="pin-type digital">digital</span></td><td>Serial Output. Used for daisy-chaining. Connect to the SER pin of the next 74HC595.</td></tr>
</table>

## Configurable Attributes
*This component currently has no configurable attributes in the simulator.*

## Working Principle
1. **Shift Phase**: You present a bit (HIGH or LOW) on the `SER` pin and pulse the `SRCLK` pin HIGH then LOW. The bit enters the shift register. You repeat this 8 times for all 8 bits.
2. **Latch Phase**: Once all 8 bits are in the shift register, you pulse the `RCLK` (Latch) pin HIGH then LOW. This copies the 8 bits simultaneously to the visible output pins (`Q0`-`Q7`).
3. **Daisy Chaining**: As you shift more than 8 bits into a single chip, the oldest bits "spill out" of the `Q7S` pin. By connecting `Q7S` to the `SER` pin of a second 595, the bits automatically flow into the second chip!

## Wiring Diagram

Example of connecting a 74HC595 Shift Register to an Arduino Uno.

<p align="center">
  <img src="/images/components/openhw-74hc595_wiring.png" alt="Wiring Diagram" style="max-width: 100%; border-radius: 8px; margin: 20px 0;" />
</p>

<TryInSimulator />

## Example Arduino Code
The Arduino `shiftOut` function is designed specifically for this chip.

```cpp
const int dataPin  = 11; // SER
const int clockPin = 12; // SRCLK
const int latchPin = 8;  // RCLK

void setup() {
  pinMode(dataPin, OUTPUT);
  pinMode(clockPin, OUTPUT);
  pinMode(latchPin, OUTPUT);
}

void loop() {
  // We will count from 0 to 255 and display it in binary on the outputs
  for (int i = 0; i < 256; i++) {
    // 1. Pull latch LOW to keep outputs steady while shifting
    digitalWrite(latchPin, LOW);
    
    // 2. Shift all 8 bits in
    shiftOut(dataPin, clockPin, MSBFIRST, i);
    
    // 3. Pull latch HIGH to push the bits to the outputs
    digitalWrite(latchPin, HIGH);
    
    delay(100);
  }
}
```

## Simulation Notes
- The simulator visually represents the state of the internal registers and outputs instantly.
- If you cascade multiple 595s in the simulator, simply use `shiftOut` multiple times before pulling the latch pin high. (e.g., call `shiftOut` twice to control 16 LEDs).

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-74hc165" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: 74HC165 Shift Register</a>
  </div>
  <div>
    <a href="/docs/components/openhw-7segment" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: 7-Segment Display (Displays) &rarr;</a>
  </div>
</div>
