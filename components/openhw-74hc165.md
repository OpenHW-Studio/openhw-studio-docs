---
title: "74HC165 Shift Register"
description: "An 8-bit parallel-in/serial-out (PISO) shift register."
slug: /components/openhw-74hc165
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Logic%20Components">Logic Components</a> &gt; 
  <span>74HC165 Shift Register</span>
</div>

# 74HC165 Shift Register
<p class="subtitle">An 8-bit parallel-in, serial-out shift register used to expand digital inputs on a microcontroller.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <rect x="25" y="20" width="70" height="80" rx="4" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-border)" stroke-width="3" />
      <circle cx="35" cy="30" r="3" fill="#64748b" />
      <line x1="10" y1="30" x2="25" y2="30" stroke="#94a3b8" stroke-width="3" />
      <line x1="10" y1="40" x2="25" y2="40" stroke="#94a3b8" stroke-width="3" />
      <line x1="10" y1="50" x2="25" y2="50" stroke="#94a3b8" stroke-width="3" />
      <line x1="10" y1="60" x2="25" y2="60" stroke="#94a3b8" stroke-width="3" />
      <line x1="10" y1="70" x2="25" y2="70" stroke="#94a3b8" stroke-width="3" />
      <line x1="10" y1="80" x2="25" y2="80" stroke="#94a3b8" stroke-width="3" />
      <line x1="10" y1="90" x2="25" y2="90" stroke="#94a3b8" stroke-width="3" />
      <line x1="10" y1="100" x2="25" y2="100" stroke="#94a3b8" stroke-width="3" />
      <line x1="95" y1="30" x2="110" y2="30" stroke="#94a3b8" stroke-width="3" />
      <line x1="95" y1="40" x2="110" y2="40" stroke="#94a3b8" stroke-width="3" />
      <line x1="95" y1="50" x2="110" y2="50" stroke="#94a3b8" stroke-width="3" />
      <line x1="95" y1="60" x2="110" y2="60" stroke="#94a3b8" stroke-width="3" />
      <line x1="95" y1="70" x2="110" y2="70" stroke="#94a3b8" stroke-width="3" />
      <line x1="95" y1="80" x2="110" y2="80" stroke="#94a3b8" stroke-width="3" />
      <line x1="95" y1="90" x2="110" y2="90" stroke="#94a3b8" stroke-width="3" />
      <line x1="95" y1="100" x2="110" y2="100" stroke="#94a3b8" stroke-width="3" />
    </svg>
    <span style="font-size:11px;color:var(--vp-c-text-2);">74HC165</span>
  </div>
  <div class="component-info">
    <p>The 74HC165 is an 8-bit parallel-in/serial-out shift register. It takes up to 8 individual digital inputs (like 8 buttons or switches) and allows a microcontroller to read all 8 states using only 3 digital pins. Multiple 74HC165 chips can be daisy-chained to read an almost unlimited number of inputs.</p>
    <div>
      <span class="tag">Logic Components</span>
      <span class="tag">Shift Register</span>
      <span class="tag">Input Expansion</span>
    </div>
  </div>
</div>

## Overview
When you run out of input pins on an Arduino, the 74HC165 is the standard solution. By parallel-loading the inputs into the chip's internal memory and then serially shifting them out one bit at a time, you can massively expand your input capabilities.

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">VCC</span></td><td><span class="pin-type power">power</span></td><td>Power supply (3V to 5V).</td></tr>
<tr><td><span class="pin-name">GND</span></td><td><span class="pin-type power">power</span></td><td>Ground reference.</td></tr>
<tr><td><span class="pin-name">D0-D7</span></td><td><span class="pin-type input">input</span></td><td>8 parallel digital inputs to be sampled (e.g., buttons, sensors).</td></tr>
<tr><td><span class="pin-name">PL</span></td><td><span class="pin-type input">input</span></td><td>Parallel Load (SH/LD). Active LOW. When LOW, loads the states of D0-D7 into the shift register. When HIGH, data can be shifted.</td></tr>
<tr><td><span class="pin-name">CP</span></td><td><span class="pin-type input">input</span></td><td>Serial Clock (CLK). On the rising edge, data shifts one position.</td></tr>
<tr><td><span class="pin-name">CE</span></td><td><span class="pin-type input">input</span></td><td>Clock Enable. Active LOW. Usually tied to GND permanently.</td></tr>
<tr><td><span class="pin-name">Q7</span></td><td><span class="pin-type digital">digital</span></td><td>Serial Output (QH). Outputs the final bit. Connect to the MCU to read data.</td></tr>
<tr><td><span class="pin-name">Q7_N</span></td><td><span class="pin-type digital">digital</span></td><td>Inverted Serial Output (QH'). Rarely used.</td></tr>
<tr><td><span class="pin-name">DS</span></td><td><span class="pin-type input">input</span></td><td>Serial Input (SER). Used for cascading. Connect to Q7 of a preceding chip.</td></tr>
</table>

## Configurable Attributes
*This component currently has no configurable attributes in the simulator.*

## Working Principle
1. **Load Phase**: By pulling the Parallel Load (`PL`) pin `LOW`, the chip takes a snapshot of the digital states currently on pins `D0` through `D7` and stores them internally.
2. **Shift Phase**: When `PL` is brought `HIGH`, the data is locked in. The first bit (D7) appears on the `Q7` pin.
3. Every time the Clock (`CP`) pin goes from `LOW` to `HIGH`, all stored bits shift over by one position, allowing the microcontroller to read each bit sequentially from the `Q7` pin.

## Wiring Diagram
1. Connect **VCC** to 5V and **GND** to Ground.
2. Tie **CE** (Clock Enable) to Ground to keep the clock active.
3. Connect **PL**, **CP**, and **Q7** to three separate digital pins on your Arduino.
4. Wire your buttons or switches to the **D0-D7** pins (remembering to use pull-up or pull-down resistors for your buttons).
5. If daisy-chaining, connect the **Q7** of the first chip to the **DS** of the second chip.

## Example Arduino Code
```cpp
const int plPin = 8;  // Parallel Load pin
const int cePin = 9;  // Clock Enable pin (can also just tie to GND)
const int q7Pin = 11; // Data Out pin
const int cpPin = 12; // Clock pin

void setup() {
  Serial.begin(9600);
  pinMode(plPin, OUTPUT);
  pinMode(cePin, OUTPUT);
  pinMode(cpPin, OUTPUT);
  pinMode(q7Pin, INPUT);
  
  // Initialize pins
  digitalWrite(cpPin, LOW);
  digitalWrite(plPin, HIGH);
}

void loop() {
  // Step 1: Sample the inputs by pulsing PL low
  digitalWrite(plPin, LOW);
  delayMicroseconds(5);
  digitalWrite(plPin, HIGH);

  // Step 2: Read the 8 bits from the shift register
  byte incomingData = shiftIn(q7Pin, cpPin, MSBFIRST);

  // Print the binary representation to the Serial Monitor
  Serial.print("Data: ");
  Serial.println(incomingData, BIN);
  
  delay(500);
}
```

## Simulation Notes
- The simulator updates the output instantly upon clock edges and load commands.
- If you notice bouncing or inconsistent reads, verify that your virtual buttons have proper pull-up/pull-down configurations in your circuit layout.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-5w-speaker" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: 5W Audio Speaker</a>
  </div>
  <div>
    <a href="/docs/components/openhw-74hc595" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: 74HC595 Shift Register &rarr;</a>
  </div>
</div>
