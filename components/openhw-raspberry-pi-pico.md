---
title: "Raspberry Pi Pico"
description: "A fast, versatile, and highly affordable microcontroller board built using the RP2040 chip."
slug: /components/openhw-raspberry-pi-pico
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Boards">Boards</a> &gt; 
  <span>Raspberry Pi Pico</span>
</div>

# Raspberry Pi Pico
<p class="subtitle">The first microcontroller board from Raspberry Pi, powered by their custom RP2040 silicon.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <img src="/images/boards/openhw-raspberry-pi-pico.svg" alt="Raspberry Pi Pico" style="width:250px; height:450px; max-width: 250px; max-height: 450px" />
    <span style="font-size:11px;color:var(--vp-c-text-2);">Raspberry Pi Pico (RP2040)</span>
  </div>
  <div class="component-info">
    <p>The Raspberry Pi Pico is a flexible, low-cost microcontroller board built around the RP2040 chip designed by Raspberry Pi. It features a dual-core Arm Cortex-M0+ processor, 264KB of internal RAM, and support for up to 16MB of off-chip flash. It is designed to be easily programmable via C/C++ or MicroPython.</p>
    <div>
      <span class="tag">Boards</span>
      <span class="tag">Microcontroller</span>
      <span class="tag">RP2040</span>
    </div>
  </div>
</div>

## Overview
Operating at **3.3V** logic levels, the Pico offers a rich set of I/O options including 26 multi-function GPIO pins. It stands out with its unique Programmable I/O (PIO) subsystem, allowing you to create custom hardware interfaces. It features a micro-USB port for power and data, and a physical `BOOTSEL` button used for programming.

<br>

> [!CAUTION]
> **3.3V Logic Level:** The Raspberry Pi Pico operates strictly at 3.3V. Providing 5V to any GPIO pin (other than VBUS) will damage the RP2040 chip. Use logic level shifters when connecting 5V components.

## Pin Reference
The Pico has 40 pins configured in a dual in-line package (DIP) style.

<table class="pin-table">
<tr><th>Pin Group</th><th>Description</th></tr>
<tr><td><span class="pin-name">GP0 - GP28</span></td><td>26 General Purpose I/O pins (3.3V logic only). All can be used for digital I/O and PWM.</td></tr>
<tr><td><span class="pin-name">ADC0 - ADC2</span></td><td>3 of the GPIO pins (GP26, GP27, GP28) have hardware Analog-to-Digital Converter capabilities.</td></tr>
<tr><td><span class="pin-name">VBUS</span></td><td>Micro-USB input voltage (typically 5V). Used for powering 5V peripherals.</td></tr>
<tr><td><span class="pin-name">VSYS</span></td><td>Main system input voltage (1.8V to 5.5V). Used to power the Pico from an external battery.</td></tr>
<tr><td><span class="pin-name">3V3(OUT)</span></td><td>Regulated 3.3V output for powering external 3.3V sensors.</td></tr>
<tr><td><span class="pin-name">GND</span></td><td>Multiple ground pins distributed around the board.</td></tr>
<tr><td><span class="pin-name">RUN</span></td><td>Reset pin. Pulling this low resets the RP2040.</td></tr>
</table>

## Configurable Attributes
*(Currently, microcontroller boards in the simulator do not have configurable graphical attributes. You upload code to them directly via the editor.)*

## Wiring Diagram (Blink Example)
A typical configuration for testing digital output.
1. Connect a 220-ohm resistor to pin **GP18**.
2. Connect the other end of the resistor to the **Anode** of an LED.
3. Connect the **Cathode** of the LED to **GND**.

<p align="center">
  <img src="/images/boards/openhw-raspberry-pi-pico_wiring.png" alt="Wiring Diagram" style="max-width: 100%; border-radius: 8px; margin: 20px 0;" />
</p>

<TryInSimulator />

## Example Code
This code demonstrates a standard LED blink routine. In OpenHW Studio's autocoding blocks, the board's setup configuration defines `GP18` as the target for `led_1`.

```cpp
void setup() {
  // autocoding for led_1 start
  pinMode(18, OUTPUT);
  // autocoding for led_1 end

  // put your setup code here, to run once:
}

void loop() {
  // autocoding for led_1 start
  digitalWrite(18, HIGH);
  delay(1000);
  digitalWrite(18, LOW);
  delay(1000);
  // autocoding for led_1 end

  // put your main code here, to run repeatedly:
}
```

## Simulation Notes
- To use the Raspberry Pi Pico in the OpenHW Studio editor, ensure you select the "Raspberry Pi Pico" board from the environment dropdown menu.
- The simulator models the standard `delay()` function to block execution accurately.
- While the physical Pico features an onboard LED connected to `GP25`, you can use external LEDs connected to pins like `GP18` (as shown in the code above) to test basic I/O functionality.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-esp32-cam" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: ESP32-CAM</a>
  </div>
  <div>
    <a href="/docs/components/openhw-stepper-motor" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: Stepper Motor &rarr;</a>
  </div>
</div>
