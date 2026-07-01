---
title: "16-Channel Mux (HP4067)"
description: "A 16-channel analog/digital multiplexer based on the CD74HC4067 chip."
slug: /components/openhw-hp4067
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Logic%20Components">Logic Components</a> &gt; 
  <span>16-Channel Mux (HP4067)</span>
</div>

# 16-Channel Mux (HP4067)
<p class="subtitle">A 16-channel analog/digital multiplexer/demultiplexer for massively expanding your microcontroller's I/O pins.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <rect x="25" y="10" width="70" height="100" rx="2" fill="var(--vp-c-bg-soft)" />
      <rect x="35" y="30" width="50" height="60" rx="2" fill="#0f172a" />
      <text x="60" y="65" fill="var(--vp-c-text-2)" font-family="monospace" font-size="10" font-weight="bold" text-anchor="middle">CD74HC4067</text>
      <circle cx="35" cy="20" r="2" fill="#eab308" />
      <circle cx="45" cy="20" r="2" fill="#eab308" />
      <circle cx="55" cy="20" r="2" fill="#eab308" />
      <circle cx="65" cy="20" r="2" fill="#eab308" />
      <circle cx="75" cy="20" r="2" fill="#eab308" />
      <circle cx="85" cy="20" r="2" fill="#eab308" />
      <circle cx="35" cy="100" r="2" fill="#eab308" />
      <circle cx="45" cy="100" r="2" fill="#eab308" />
      <circle cx="55" cy="100" r="2" fill="#eab308" />
      <circle cx="65" cy="100" r="2" fill="#eab308" />
      <circle cx="75" cy="100" r="2" fill="#eab308" />
      <circle cx="85" cy="100" r="2" fill="#eab308" />
    </svg>
    <span style="font-size:11px;color:var(--vp-c-text-2);">HP4067 Module</span>
  </div>
  <div class="component-info">
    <p>This module acts like a 16-way rotary switch. Using four digital control pins, you can connect the single common signal pin (SIG) to any one of the 16 channel pins (C0-C15). It works with both digital and analog signals.</p>
    <div>
      <span class="tag">Logic Components</span>
      <span class="tag">Multiplexer</span>
      <span class="tag">Analog</span>
    </div>
  </div>
</div>

## Overview
If you run out of pins on your Arduino (especially analog inputs), the HP4067 allows you to read 16 analog sensors using only one analog pin and four digital pins. It operates bidirectionally, so it can also act as a demultiplexer (routing a single signal to 16 different destinations).

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">VCC</span></td><td><span class="pin-type power">power</span></td><td>Power supply (2V to 6V).</td></tr>
<tr><td><span class="pin-name">GND</span></td><td><span class="pin-type power">power</span></td><td>Common ground.</td></tr>
<tr><td><span class="pin-name">EN</span></td><td><span class="pin-type digital">digital</span></td><td>Enable pin. Active LOW (connect to GND to enable).</td></tr>
<tr><td><span class="pin-name">S0, S1, S2, S3</span></td><td><span class="pin-type digital">digital</span></td><td>Control pins. These 4 bits form a binary number (0-15) to select a channel.</td></tr>
<tr><td><span class="pin-name">SIG</span></td><td><span class="pin-type analog">analog</span></td><td>The common signal pin. Connects internally to the selected C0-C15 pin.</td></tr>
<tr><td><span class="pin-name">C0 to C15</span></td><td><span class="pin-type analog">analog</span></td><td>The 16 multiplexed channels.</td></tr>
</table>

## Configurable Attributes
*This component has no configurable attributes.*

## Working Principle
The four select pins (`S0`, `S1`, `S2`, `S3`) are treated as a 4-bit binary number. `S0` is the Least Significant Bit (LSB).
- `0000` (All LOW) connects `SIG` to `C0`.
- `0001` (S0 HIGH) connects `SIG` to `C1`.
- `1111` (All HIGH) connects `SIG` to `C15`.

## Wiring Diagram
To read 16 potentiometers:
1. Connect **VCC** to 5V and **GND** to Ground.
2. Connect **EN** to Ground.
3. Connect **S0, S1, S2, S3** to digital pins (e.g., D2, D3, D4, D5).
4. Connect **SIG** to an analog input (e.g., A0).
5. Connect your potentiometers to **C0-C15**.

## Example Arduino Code
This code loops through all 16 channels and reads their analog values.

```cpp
// Define the selection pins
const int s0 = 2;
const int s1 = 3;
const int s2 = 4;
const int s3 = 5;

// Define the signal pin
const int sigPin = A0;

void setup() {
  Serial.begin(9600);
  pinMode(s0, OUTPUT);
  pinMode(s1, OUTPUT);
  pinMode(s2, OUTPUT);
  pinMode(s3, OUTPUT);
}

void loop() {
  // Loop through all 16 channels
  for (int channel = 0; channel < 16; channel++) {
    // Write the binary value to the selection pins
    digitalWrite(s0, bitRead(channel, 0));
    digitalWrite(s1, bitRead(channel, 1));
    digitalWrite(s2, bitRead(channel, 2));
    digitalWrite(s3, bitRead(channel, 3));
    
    // Give the mux a tiny bit of time to switch (optional but good practice)
    delayMicroseconds(10);
    
    // Read the value from the selected channel
    int val = analogRead(sigPin);
    
    Serial.print("Channel ");
    Serial.print(channel);
    Serial.print(": ");
    Serial.println(val);
  }
  
  Serial.println("---");
  delay(1000);
}
```

## Simulation Notes
- In the simulator, the multiplexer accurately propagates analog voltages, PWM signals, and digital states bidirectionally between the `SIG` pin and the actively selected `C` channel.
- If `EN` is driven HIGH, the multiplexer disconnects `SIG` completely (high impedance state).

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-hc-sr04" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: HC-SR04</a>
  </div>
  <div>
    <a href="/docs/components/openhw-hx711_5" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: HX711 (5kg) &rarr;</a>
  </div>
</div>
