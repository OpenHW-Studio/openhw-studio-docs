---
title: "ESP32"
description: "A powerful microcontroller board with built-in Wi-Fi and Bluetooth capabilities."
slug: /components/openhw-esp32
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Boards">Boards</a> &gt; 
  <span>ESP32</span>
</div>

# ESP32
<p class="subtitle">A feature-rich, dual-core MCU equipped with Wi-Fi and dual-mode Bluetooth, ideal for IoT applications.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <img src="/images/boards/openhw-esp32.svg" alt="ESP32" style="width:250px; height:400px; max-width: 250px; max-height: 400px" />
    <span style="font-size:11px;color:var(--vp-c-text-2);">ESP32 Dev Module</span>
  </div>
  <div class="component-info">
    <p>The ESP32 is a low-cost, low-power system on a chip (SoC) microcontroller with integrated Wi-Fi and dual-mode Bluetooth. Developed by Espressif Systems, it boasts a dual-core Tensilica Xtensa LX6 microprocessor and is highly favored by makers and engineers for building robust Internet of Things (IoT) devices.</p>
    <div>
      <span class="tag">Boards</span>
      <span class="tag">Microcontroller</span>
      <span class="tag">IoT</span>
      <span class="tag">Wi-Fi</span>
    </div>
  </div>
</div>

## Overview
Unlike standard 8-bit AVR Arduinos, the ESP32 is a 32-bit microcontroller that operates at **3.3V**. It offers an incredible array of peripherals, including capacitive touch, ADCs, DACs, I2C, SPI, UART, and I2S interfaces. Its internal Wi-Fi stack allows you to connect to the internet, host web servers, or fetch APIs directly from the microcontroller.

<br>

> [!CAUTION]
> **3.3V Logic Level:** The ESP32 is not 5V-tolerant. Applying 5V to any of its GPIO pins can instantly damage the chip. Always use logic level converters when interfacing with 5V components.

## Pin Reference
The ESP32 has many pins with overlapping capabilities. Most pins can be assigned to different hardware functions via software.

<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">3V3</span></td><td><span class="pin-type power">power</span></td><td>Regulated 3.3V output.</td></tr>
<tr><td><span class="pin-name">VIN</span></td><td><span class="pin-type power">power</span></td><td>Input voltage (typically 5V via USB or external supply).</td></tr>
<tr><td><span class="pin-name">GND</span></td><td><span class="pin-type power">power</span></td><td>Ground pins.</td></tr>
<tr><td><span class="pin-name">EN</span></td><td><span class="pin-type digital">digital</span></td><td>Enable pin (Reset). Pulling this low resets the ESP32.</td></tr>
<tr><td><span class="pin-name">D0-D35</span></td><td><span class="pin-type digital">digital</span></td><td>General Purpose I/O pins (GPIO). Most support PWM.</td></tr>
<tr><td><span class="pin-name">VP / VN</span></td><td><span class="pin-type analog">analog</span></td><td>Analog inputs (ADC1). Often labeled GPIO36 (VP) and GPIO39 (VN). Note: Input only.</td></tr>
<tr><td><span class="pin-name">TX0 / RX0</span></td><td><span class="pin-type digital">digital</span></td><td>Hardware Serial 0 (used for USB programming/debugging).</td></tr>
<tr><td><span class="pin-name">TX2 / RX2</span></td><td><span class="pin-type digital">digital</span></td><td>Hardware Serial 2.</td></tr>
</table>

*(Note: Pins D34, D35, VP(36), and VN(39) are **input only** and cannot be used as outputs or have internal pull-ups.)*

## Configurable Attributes
*(Currently, microcontroller boards in the simulator do not have configurable graphical attributes. You upload code to them directly via the editor.)*

## Wiring Diagram (Blink Example)
A standard setup to blink an external LED using the ESP32.
1. Connect a 220-ohm resistor to pin **D13**.
2. Connect the other end of the resistor to the **Anode** of an LED.
3. Connect the **Cathode** of the LED to **GND**.

<p align="center">
  <img src="/images/boards/openhw-esp32_wiring.png" alt="Wiring Diagram" style="max-width: 100%; border-radius: 8px; margin: 20px 0;" />
</p>

<TryInSimulator />

## Example Code (Wi-Fi Scan)
This example demonstrates one of the ESP32's primary features: scanning for nearby Wi-Fi networks.

```cpp
#include "WiFi.h"

void setup() {
  Serial.begin(115200);

  // Set WiFi to station mode and disconnect from an AP if it was previously connected
  WiFi.mode(WIFI_STA);
  WiFi.disconnect();
  delay(100);

  Serial.println("Setup done");
}

void loop() {
  Serial.println("scan start");

  // WiFi.scanNetworks will return the number of networks found
  int n = WiFi.scanNetworks();
  Serial.println("scan done");
  
  if (n == 0) {
      Serial.println("no networks found");
  } else {
    Serial.print(n);
    Serial.println(" networks found");
    for (int i = 0; i < n; ++i) {
      // Print SSID and RSSI for each network found
      Serial.print(i + 1);
      Serial.print(": ");
      Serial.print(WiFi.SSID(i));
      Serial.print(" (");
      Serial.print(WiFi.RSSI(i));
      Serial.println(")");
      delay(10);
    }
  }
  Serial.println("");

  // Wait a bit before scanning again
  delay(5000);
}
```

## Simulation Notes
- In OpenHW Studio, ensure you select an "ESP32" board definition in the editor to use ESP32-specific libraries like `WiFi.h`.
- The simulator provides a virtual Wi-Fi environment, allowing code like `WiFi.scanNetworks()` to function and return simulated access points.
- Pay attention to the baud rate! The ESP32 standard debug baud rate is typically `115200`, whereas standard Arduinos often default to `9600`.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-arduino-mega" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: Arduino Mega 2560</a>
  </div>
  <div>
    <a href="/docs/components/openhw-stepper-motor" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: Stepper Motor &rarr;</a>
  </div>
</div>
