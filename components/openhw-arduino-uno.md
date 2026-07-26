---
title: "Arduino Uno"
description: "The classic, industry-standard microcontroller board based on the ATmega328P."
slug: /components/openhw-arduino-uno
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Boards">Boards</a> &gt; 
  <span>Arduino Uno</span>
</div>

# Arduino Uno
<p class="subtitle">The quintessential microcontroller board that launched the maker revolution, based on the reliable ATmega328P.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <img src="/images/boards/openhw-arduino-uno.svg" alt="Arduino Uno" style="width:350px; height:250px; max-width: 350px; max-height: 250px" />
    <span style="font-size:11px;color:var(--vp-c-text-2);">UNO R3</span>
  </div>
  <div class="component-info">
    <p>The Arduino Uno is a microcontroller board based on the ATmega328P. It is the most used and documented board of the whole Arduino family. It has 14 digital input/output pins, 6 analog inputs, a 16 MHz ceramic resonator, a USB connection, a power jack, an ICSP header, and a reset button.</p>
    <div>
      <span class="tag">Boards</span>
      <span class="tag">Microcontroller</span>
      <span class="tag">AVR</span>
    </div>
  </div>
</div>

## Overview
The Uno operates at 5V. It can be powered via the USB connection or with an external power supply via the DC barrel jack. The power source is selected automatically.

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">D0-D13</span></td><td><span class="pin-type digital">digital</span></td><td>Digital I/O pins. Pins 3, 5, 6, 9, 10, 11 support PWM output.</td></tr>
<tr><td><span class="pin-name">A0-A5</span></td><td><span class="pin-type analog">analog</span></td><td>Analog input pins. These can also act as digital I/O.</td></tr>
<tr><td><span class="pin-name">+5V</span></td><td><span class="pin-type power">power</span></td><td>Regulated 5V output (or input if not powered via USB/VIN).</td></tr>
<tr><td><span class="pin-name">3.3V</span></td><td><span class="pin-type power">power</span></td><td>Regulated 3.3V output (provided by the on-board regulator).</td></tr>
<tr><td><span class="pin-name">Vin</span></td><td><span class="pin-type power">power</span></td><td>Input voltage (7V - 12V) when using an external power source.</td></tr>
<tr><td><span class="pin-name">GND</span></td><td><span class="pin-type power">power</span></td><td>Ground pins.</td></tr>
<tr><td><span class="pin-name">RESET</span></td><td><span class="pin-type digital">digital</span></td><td>Reset pin. Bring this line LOW to reset the microcontroller.</td></tr>
<tr><td><span class="pin-name">AREF</span></td><td><span class="pin-type analog">analog</span></td><td>Analog Reference pin. Used to set the reference voltage for analog inputs.</td></tr>
</table>

## Configurable Attributes
*(Currently, microcontroller boards in the simulator do not have configurable graphical attributes. You upload code to them directly via the editor.)*

## Wiring Diagram (Analog Read Example)
A standard setup to read an analog value from a slide potentiometer and indicate its state via an LED.
1. Connect the slide potentiometer's **VCC** to **5V**, **GND** to **GND**, and **OUT** to **A0**.
2. Connect a 220-ohm resistor to **~5**.
3. Connect the other end of the resistor to the **Anode** of an LED.
4. Connect the **Cathode** of the LED to **GND**.

<p align="center">
  <img src="/images/boards/openhw-arduino-uno_wiring.png" alt="Wiring Diagram" style="max-width: 100%; border-radius: 8px; margin: 20px 0;" />
</p>

<TryInSimulator />

## Example Arduino Code
This code maps the analog value from the potentiometer (0-1023) to a PWM value (0-255) to fade the LED on pin 5.

```cpp
const int potPin = A0;  // Analog pin for potentiometer
const int ledPin = 5;   // PWM pin for LED

void setup() {
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int sensorValue = analogRead(potPin);
  
  // Map 0-1023 to 0-255 for PWM
  int brightness = map(sensorValue, 0, 1023, 0, 255);
  
  analogWrite(ledPin, brightness);
  
  Serial.print("Analog: ");
  Serial.print(sensorValue);
  Serial.print(" | Brightness: ");
  Serial.println(brightness);
  
  delay(10);
}
```

## Simulation Notes
- In OpenHW Studio, the Arduino Uno acts as the "brain" of your project. 
- The built-in LED (marked `L` on the board) is linked to pin 13 and will visually toggle when that pin is driven HIGH or LOW.
- Make sure you select "Arduino Uno" in the board dropdown menu of the editor before compiling your code.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-arduino-nano" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: Arduino Nano Type-C</a>
  </div>
  <div>
    <a href="/docs/components/openhw-stepper-motor" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: Stepper Motor &rarr;</a>
  </div>
</div>
