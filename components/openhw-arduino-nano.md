---
title: "Arduino Nano Type-C"
description: "A compact microcontroller board based on the ATmega328P with a modern USB Type-C interface."
slug: /components/openhw-arduino-nano
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Boards">Boards</a> &gt; 
  <span>Arduino Nano Type-C</span>
</div>

# Arduino Nano Type-C
<p class="subtitle">A small, complete, and breadboard-friendly board based on the ATmega328P, updated with a USB Type-C connector.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <img src="/images/components/openhw-arduino-nano.svg" alt="Arduino Nano Type-C" style="width:350px; height:120px; max-width: 350px; max-height: 120px" />
    <span style="font-size:11px;color:var(--vp-c-text-2);">Nano 328P</span>
  </div>
  <div class="component-info">
    <p>The Arduino Nano Type-C is a modern spin on the classic Arduino Nano. It retains the same reliable ATmega328P microcontroller, identical pinout, and breadboard compatibility, but upgrades the antiquated Mini-B USB port to a robust, reversible USB Type-C connector.</p>
    <div>
      <span class="tag">Boards</span>
      <span class="tag">Microcontroller</span>
      <span class="tag">AVR</span>
    </div>
  </div>
</div>

## Overview
Just like the Arduino Uno, the Nano features 14 digital input/output pins (of which 6 can be used as PWM outputs) and 8 analog inputs (A0-A7). It operates at 5V with a 16 MHz clock. Because it lacks a DC power jack, it is powered either via the USB Type-C connection or by supplying 7-12V to the `VIN` pin.

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">D0-D13</span></td><td><span class="pin-type digital">digital</span></td><td>Digital I/O pins. Pins 3, 5, 6, 9, 10, 11 support PWM output.</td></tr>
<tr><td><span class="pin-name">A0-A7</span></td><td><span class="pin-type analog">analog</span></td><td>Analog input pins. A0-A5 can also act as digital I/O.</td></tr>
<tr><td><span class="pin-name">+5V</span></td><td><span class="pin-type power">power</span></td><td>Regulated 5V output (or input if not powered via USB/VIN).</td></tr>
<tr><td><span class="pin-name">3V3</span></td><td><span class="pin-type power">power</span></td><td>Regulated 3.3V output (provided by the USB-to-serial chip).</td></tr>
<tr><td><span class="pin-name">VIN</span></td><td><span class="pin-type power">power</span></td><td>Input voltage (7V - 12V) when using an external power source.</td></tr>
<tr><td><span class="pin-name">GND</span></td><td><span class="pin-type power">power</span></td><td>Ground pins.</td></tr>
<tr><td><span class="pin-name">RST</span></td><td><span class="pin-type digital">digital</span></td><td>Reset pin. Bring this line LOW to reset the microcontroller.</td></tr>
</table>

## Configurable Attributes
*(Currently, microcontroller boards in the simulator do not have configurable graphical attributes. You upload code to them directly via the editor.)*

## Wiring Diagram (Blink Example)
A classic setup to blink an external LED using the Nano.
1. Connect a 220-ohm resistor to **D13**.
2. Connect the other end of the resistor to the **Anode** (longer leg) of an LED.
3. Connect the **Cathode** of the LED to **GND**.

<p align="center">
  <img src="/images/components/openhw-arduino-nano_wiring.png" alt="Wiring Diagram" style="max-width: 100%; border-radius: 8px; margin: 20px 0;" />
</p>

<TryInSimulator />

## Example Arduino Code
Since the Nano is essentially an Uno in a smaller form factor, standard sketches work without modification. 

```cpp
// The built-in LED on the Nano is connected to pin 13
const int ledPin = 13;

void setup() {
  pinMode(ledPin, OUTPUT);
}

void loop() {
  digitalWrite(ledPin, HIGH);   // Turn the LED on
  delay(1000);                  // Wait for a second
  digitalWrite(ledPin, LOW);    // Turn the LED off
  delay(1000);                  // Wait for a second
}
```

## Simulation Notes
- In OpenHW Studio, the Arduino Nano acts as the "brain" of your project. 
- The built-in LED (marked `L` on the board) is linked to pin 13 and will visually toggle when that pin is driven HIGH or LOW.
- Make sure you select "Arduino Nano" in the board dropdown menu of the editor before compiling your code.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-sph0645" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: I2S MEMS Microphone</a>
  </div>
  <div>
    <a href="/docs/components/openhw-stepper-motor" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: Stepper Motor &rarr;</a>
  </div>
</div>
