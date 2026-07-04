---
title: "Arduino Mega 2560"
description: "The ultimate microcontroller board based on the ATmega2560, offering extensive I/O for large projects."
slug: /components/openhw-arduino-mega
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Boards">Boards</a> &gt; 
  <span>Arduino Mega 2560</span>
</div>

# Arduino Mega 2560
<p class="subtitle">Designed for your most ambitious projects. With 54 digital I/O pins, 16 analog inputs, and 4 UARTs, the Mega gives you all the room you need.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <img src="/images/boards/openhw-arduino-mega.svg" alt="Arduino Mega 2560" style="width:450px; height:250px; max-width: 450px; max-height: 250px" />
    <span style="font-size:11px;color:var(--vp-c-text-2);">MEGA 2560 R3</span>
  </div>
  <div class="component-info">
    <p>The Arduino Mega 2560 is a powerhouse microcontroller board based on the ATmega2560. It offers significantly more memory and I/O pins than the Uno, making it the go-to choice for complex projects like 3D printers, robotics, and extensive automation systems. It maintains compatibility with most shields designed for the Uno.</p>
    <div>
      <span class="tag">Boards</span>
      <span class="tag">Microcontroller</span>
      <span class="tag">AVR</span>
    </div>
  </div>
</div>

## Overview
The Mega operates at 5V and features 54 digital input/output pins (15 of which can be used as PWM outputs), 16 analog inputs, 4 UARTs (hardware serial ports), a 16 MHz crystal oscillator, a USB connection, a power jack, an ICSP header, and a reset button.

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">D0-D53</span></td><td><span class="pin-type digital">digital</span></td><td>54 Digital I/O pins. Pins 2-13 and 44-46 support PWM output.</td></tr>
<tr><td><span class="pin-name">A0-A15</span></td><td><span class="pin-type analog">analog</span></td><td>16 Analog input pins. These can also act as digital I/O.</td></tr>
<tr><td><span class="pin-name">Serial 0-3</span></td><td><span class="pin-type digital">digital</span></td><td>4 Hardware UARTs. Serial: 0 (RX) and 1 (TX); Serial 1: 19 (RX) and 18 (TX); Serial 2: 17 (RX) and 16 (TX); Serial 3: 15 (RX) and 14 (TX).</td></tr>
<tr><td><span class="pin-name">+5V</span></td><td><span class="pin-type power">power</span></td><td>Regulated 5V output (or input if not powered via USB/VIN).</td></tr>
<tr><td><span class="pin-name">3.3V</span></td><td><span class="pin-type power">power</span></td><td>Regulated 3.3V output (provided by the on-board regulator).</td></tr>
<tr><td><span class="pin-name">Vin</span></td><td><span class="pin-type power">power</span></td><td>Input voltage (7V - 12V) when using an external power source.</td></tr>
<tr><td><span class="pin-name">GND</span></td><td><span class="pin-type power">power</span></td><td>Ground pins.</td></tr>
</table>

## Configurable Attributes
*(Currently, microcontroller boards in the simulator do not have configurable graphical attributes. You upload code to them directly via the editor.)*

## Wiring Diagram (Multiple LEDs Example)
This setup demonstrates controlling an LED on an arbitrary digital pin, capitalizing on the Mega's vast I/O capabilities.
1. Connect a 220-ohm resistor to pin **D12**.
2. Connect the other end of the resistor to the **Anode** of an LED.
3. Connect the **Cathode** of the LED to **GND**.

<p align="center">
  <img src="/images/boards/openhw-arduino-mega_wiring.png" alt="Wiring Diagram" style="max-width: 100%; border-radius: 8px; margin: 20px 0;" />
</p>

<TryInSimulator />

## Example Arduino Code
Because the Mega features multiple hardware serial ports, you can easily communicate with sensors (like GPS or Bluetooth modules) on `Serial1` while simultaneously sending debug information to the computer over `Serial`.

```cpp
void setup() {
  // Initialize communication with the computer
  Serial.begin(9600);
  
  // Initialize communication with a peripheral on pins 18/19
  Serial1.begin(115200);
  
  Serial.println("Mega 2560 Multi-Serial Test Started");
}

void loop() {
  // Read from the peripheral and print to the computer
  if (Serial1.available()) {
    char inByte = Serial1.read();
    Serial.write(inByte);
  }
  
  // Read from the computer and print to the peripheral
  if (Serial.available()) {
    char outByte = Serial.read();
    Serial1.write(outByte);
  }
}
```

## Simulation Notes
- In OpenHW Studio, select "Arduino Mega 2560" in the board dropdown menu of the editor to access its extended pin definitions.
- The built-in LED (marked `L` on the board) is linked to pin 13.
- The extended double-row header on the right side corresponds to pins D22 through D53, plus additional power and ground lines.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-arduino-uno" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: Arduino Uno</a>
  </div>
  <div>
    <a href="/docs/components/openhw-stepper-motor" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: Stepper Motor &rarr;</a>
  </div>
</div>
