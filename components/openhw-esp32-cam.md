---
title: "ESP32-CAM"
description: "A compact ESP32 module with a built-in camera and microSD card slot."
slug: /components/openhw-esp32-cam
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Boards">Boards</a> &gt; 
  <span>ESP32-CAM</span>
</div>

# ESP32-CAM
<p class="subtitle">A highly integrated, ultra-small IoT camera module based on the ESP32.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <img src="/images/boards/openhw-esp32-cam.svg" alt="ESP32-CAM" style="width:250px; height:350px; max-width: 250px; max-height: 350px" />
    <span style="font-size:11px;color:var(--vp-c-text-2);">AI-Thinker ESP32-CAM</span>
  </div>
  <div class="component-info">
    <p>The ESP32-CAM is a tiny camera module featuring the ESP32-S chip alongside an OV2640 camera and an onboard TF (microSD) card slot. It's incredibly popular for building wireless security cameras, smart doorbells, face recognition systems, and machine learning vision projects. It also features a bright onboard LED flash.</p>
    <div>
      <span class="tag">Boards</span>
      <span class="tag">Camera</span>
      <span class="tag">IoT</span>
      <span class="tag">Wi-Fi</span>
    </div>
  </div>
</div>

## Overview
Because the camera and microSD card slot monopolize many of the ESP32's internal GPIO pins, the ESP32-CAM breaks out far fewer user-accessible pins than a standard ESP32 development board. It also **lacks a built-in USB-to-Serial converter**, meaning you must use an FTDI programmer (connected to the RX, TX, and GND pins) and temporarily jump pin `IO0` to `GND` to upload code.

<br>

> [!WARNING]
> **Power Requirements:** The ESP32-CAM is notorious for power brownouts, particularly when initializing the Wi-Fi radio and camera sensor simultaneously. Ensure you provide a robust 5V power supply (at least 2 Amps) to the `5V` pin.

## Pin Reference

<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">5V</span></td><td><span class="pin-type power">power</span></td><td>5V Power Input (Recommended over 3.3V to prevent brownouts).</td></tr>
<tr><td><span class="pin-name">3V3</span></td><td><span class="pin-type power">power</span></td><td>3.3V Power Input / Output.</td></tr>
<tr><td><span class="pin-name">GND</span></td><td><span class="pin-type power">power</span></td><td>Common Ground (There are 3 GND pins available).</td></tr>
<tr><td><span class="pin-name">IO0 (0)</span></td><td><span class="pin-type digital">digital</span></td><td>Strapping pin. Must be connected to GND during boot to enter flashing mode.</td></tr>
<tr><td><span class="pin-name">U0R (RX)</span></td><td><span class="pin-type digital">digital</span></td><td>UART Receive. Connects to FTDI TX for programming.</td></tr>
<tr><td><span class="pin-name">U0T (TX)</span></td><td><span class="pin-type digital">digital</span></td><td>UART Transmit. Connects to FTDI RX for programming.</td></tr>
<tr><td><span class="pin-name">IO4 (4)</span></td><td><span class="pin-type digital">digital</span></td><td>Connected internally to the bright Flash LED.</td></tr>
<tr><td><span class="pin-name">IO33 (Internal)</span></td><td><span class="pin-type digital">digital</span></td><td>Not broken out. Connected internally to the small red status LED on the back.</td></tr>
<tr><td><span class="pin-name">IO12, IO13, IO14, IO15, IO2, IO16</span></td><td><span class="pin-type digital">digital</span></td><td>General purpose I/O, but note that many are shared with the SD card interface.</td></tr>
</table>

## Configurable Attributes
*(Currently, microcontroller boards in the simulator do not have configurable graphical attributes. You upload code to them directly via the editor.)*

## Wiring Diagram (Flash LED Control)
A simple setup demonstrating that you can use the ESP32-CAM to drive external components while maintaining standard Wi-Fi operations. Here, an external LED is connected to `IO12`. Note the bright internal Flash LED is mapped to `IO4`.
1. Connect a 220-ohm resistor to pin **12**.
2. Connect the other end of the resistor to the **Anode** of an LED.
3. Connect the **Cathode** of the LED to **GND**.

<p align="center">
  <img src="/images/boards/openhw-esp32-cam_wiring.png" alt="Wiring Diagram" style="max-width: 100%; border-radius: 8px; margin: 20px 0;" />
</p>

<TryInSimulator />

## Example Code (Blinking the Flash LED)
This code demonstrates how to control the ultra-bright onboard flash LED (connected to `IO4`). Be careful, it is very bright!

```cpp
// The flash LED is connected to GPIO 4
const int flashLedPin = 4;

void setup() {
  pinMode(flashLedPin, OUTPUT);
  Serial.begin(115200);
}

void loop() {
  Serial.println("Flash ON");
  // Turn the flash LED on
  digitalWrite(flashLedPin, HIGH);
  delay(200); // Only leave it on briefly!

  Serial.println("Flash OFF");
  // Turn the flash LED off
  digitalWrite(flashLedPin, LOW);
  delay(2000);
}
```

## Simulation Notes
- The OpenHW Studio simulator currently provides a simulated "dummy" camera feed for testing basic image capture and streaming scripts.
- To program the ESP32-CAM in reality, you need an external USB-to-Serial adapter. In the simulator, this flashing step is handled virtually and instantly when you press "Upload".
- In the simulator environment, `IO4` is fully modeled and will illuminate the graphical flash LED component on the board SVG.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-esp32" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: ESP32</a>
  </div>
  <div>
    <a href="/docs/components/openhw-stepper-motor" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: Stepper Motor &rarr;</a>
  </div>
</div>
