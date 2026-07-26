---
title: "Raspberry Pi Pico W"
description: "The wireless-enabled variant of the Raspberry Pi Pico, featuring the RP2040 chip and CYW43439 Wi-Fi module."
slug: /components/openhw-pico-w
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Boards">Boards</a> &gt; 
  <span>Raspberry Pi Pico W</span>
</div>

# Raspberry Pi Pico W
<p class="subtitle">The RP2040 microcontroller you love, now upgraded with fully certified 2.4GHz Wi-Fi capabilities.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <img src="/images/boards/openhw-pico-w.svg" alt="Raspberry Pi Pico W" style="width:250px; height:450px; max-width: 250px; max-height: 450px" />
    <span style="font-size:11px;color:var(--vp-c-text-2);">Raspberry Pi Pico W</span>
  </div>
  <div class="component-info">
    <p>The Raspberry Pi Pico W retains all the power and flexibility of the original Pico (including the RP2040 dual-core processor and PIO subsystem) but adds an Infineon CYW43439 wireless chip. This allows it to connect to 2.4GHz Wi-Fi networks, making it the perfect platform for IoT projects, smart home devices, and remote data logging.</p>
    <div>
      <span class="tag">Boards</span>
      <span class="tag">Microcontroller</span>
      <span class="tag">RP2040</span>
      <span class="tag">Wi-Fi</span>
    </div>
  </div>
</div>

## Overview
Because the Pico W shares the exact same form factor and pinout as the original Pico, it is a drop-in replacement for existing hardware projects. The wireless chip is connected internally via SPI to the RP2040. 

<br>

> [!NOTE]
> **Onboard LED Difference:** On the standard Pico, the onboard LED is connected directly to `GP25`. On the Pico W, the onboard LED is connected to the `WL_GPIO0` pin of the wireless chip. You must use specific wireless library functions (like `cyw43_arch_gpio_put`) to toggle the onboard LED.

## Pin Reference
The Pico W has 40 pins configured in a dual in-line package (DIP) style, identical to the standard Pico.

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
A typical configuration for testing digital output. Note that the layout is identical to the standard Pico.
1. Connect a 220-ohm resistor to pin **18**.
2. Connect the other end of the resistor to the **Anode** of an LED.
3. Connect the **Cathode** of the LED to **GND**.

<p align="center">
  <img src="/images/boards/openhw-pico-w_wiring.png" alt="Wiring Diagram" style="max-width: 100%; border-radius: 8px; margin: 20px 0;" />
</p>

<TryInSimulator />

## Example Code
This code demonstrates a standard LED blink routine. In OpenHW Studio's autocoding blocks, the board's setup configuration defines `18` as the target for `led_1`.

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
- The OpenHW Studio simulator provides a virtual Wi-Fi environment for the Pico W. However, you must use the appropriate Pico W SDK or Arduino Core libraries to interact with the simulated wireless chip.
- Standard digital I/O, PWM, and I2C/SPI functions work identically to the standard Raspberry Pi Pico.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-raspberry-pi-pico" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: Raspberry Pi Pico</a>
  </div>
  <div>
    <a href="/docs/components/openhw-soil-moisture-sensor" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: Soil Moisture Sensor &rarr;</a>
  </div>
</div>
