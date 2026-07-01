---
title: "ESP32 Development Board"
description: "A powerful dual-core microcontroller with built-in Wi-Fi and Bluetooth."
slug: /components/openhw-esp32
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Logic%20Components">Logic Components</a> &gt; 
  <span>ESP32 Development Board</span>
</div>

# ESP32 Development Board
<p class="subtitle">A low-cost, low-power system on a chip microcontroller with integrated Wi-Fi and dual-mode Bluetooth.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <rect x="25" y="10" width="70" height="100" rx="4" fill="#0f172a" stroke="#1e293b" stroke-width="2" />
      <rect x="35" y="25" width="50" height="40" rx="2" fill="var(--vp-c-bg-soft)" />
      <rect x="50" y="5" width="20" height="10" rx="1" fill="var(--vp-c-text-2)" />
      <rect x="20" y="25" width="5" height="70" fill="var(--vp-c-text-2)" />
      <rect x="95" y="25" width="5" height="70" fill="var(--vp-c-text-2)" />
      <rect x="35" y="80" width="10" height="6" rx="1" fill="var(--vp-c-text-2)" />
      <rect x="75" y="80" width="10" height="6" rx="1" fill="var(--vp-c-text-2)" />
      <text x="60" y="45" fill="var(--vp-c-text-2)" font-family="monospace" font-size="8" font-weight="bold" text-anchor="middle">ESP-WROOM-32</text>
    </svg>
    <span style="font-size:11px;color:var(--vp-c-text-2);">ESP32 NodeMCU</span>
  </div>
  <div class="component-info">
    <p>The ESP32 supersedes the popular ESP8266 by offering significantly more processing power, more I/O pins, and built-in Bluetooth. It operates at 3.3V logic and is highly popular for IoT and connected device projects.</p>
    <div>
      <span class="tag">Logic Components</span>
      <span class="tag">Wi-Fi / BT</span>
      <span class="tag">Dual Core</span>
    </div>
  </div>
</div>

## Overview
Built around a dual-core Tensilica Xtensa LX6 microprocessor running at 160 or 240 MHz, the ESP32 is a powerhouse. It features capacitive touch, ADCs, DACs, I2C, SPI, UART, I2S, and PWM on almost any pin through its internal GPIO matrix.

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">3V3</span></td><td><span class="pin-type power">power</span></td><td>3.3V Power Output.</td></tr>
<tr><td><span class="pin-name">GND</span></td><td><span class="pin-type power">power</span></td><td>Common ground connection.</td></tr>
<tr><td><span class="pin-name">VIN / 5V</span></td><td><span class="pin-type power">power</span></td><td>5V Power Input (connected to USB power).</td></tr>
<tr><td><span class="pin-name">GPIO 0-33</span></td><td><span class="pin-type digital">digital</span></td><td>Standard General Purpose I/O pins. Support PWM, I2C, SPI, etc.</td></tr>
<tr><td><span class="pin-name">GPIO 34-39</span></td><td><span class="pin-type input">input</span></td><td>Input-only pins. No internal pull-ups/pull-downs.</td></tr>
<tr><td><span class="pin-name">EN</span></td><td><span class="pin-type control">control</span></td><td>Reset pin. Pull LOW to reset the board.</td></tr>
</table>

> [!WARNING]
> **Input-Only Pins:** Pins **34, 35, 36 (VP), and 39 (VN)** are input-only pins. They do not have internal pull-up or pull-down resistors, and they cannot be used as outputs.
> **Logic Level:** The ESP32 operates at 3.3V. Applying 5V directly to most GPIO pins may damage real hardware.

## Configurable Attributes
*This component has no standard configurable attributes.*

## Working Principle
You program the ESP32 via its micro-USB port, which is connected to a USB-to-Serial converter chip. Code is executed directly on the dual-core processor. The built-in radio allows connection to 2.4GHz Wi-Fi networks and Bluetooth devices.

## Wiring Diagram
A simple example of connecting an LED:
1. Connect **GND** on the ESP32 to the ground rail.
2. Connect **GPIO 2** to a 220Ω resistor.
3. Connect the other end of the resistor to the **Anode (+)** of an LED.
4. Connect the **Cathode (-)** of the LED to **GND**.

## Example Arduino Code
This example blinks an LED on GPIO 2 (the built-in blue LED on most boards) and connects to a virtual Wi-Fi network.

```cpp
#include <WiFi.h>

const int ledPin = 2; // Built-in LED on most ESP32 boards

void setup() {
  Serial.begin(115200);
  pinMode(ledPin, OUTPUT);
  
  Serial.println("Connecting to WiFi...");
  // Standard simulator WiFi network
  WiFi.begin("Wokwi-GUEST", "", 6); 

  while (WiFi.status() != WL_CONNECTED) {
    delay(100);
    Serial.print(".");
  }
  
  Serial.println("\nWiFi Connected!");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  digitalWrite(ledPin, HIGH);
  delay(1000);
  digitalWrite(ledPin, LOW);
  delay(1000);
}
```

## Simulation Notes
- **Wi-Fi Simulation:** When you include the `WiFi.h` library and connect to the `"Wokwi-GUEST"` network, OpenHW Studio bridges the simulator to your real internet connection via a specialized gateway. Your virtual ESP32 can fetch live weather data, publish to cloud IoT platforms, and communicate with external APIs just like real hardware!
- The OpenHW Studio ESP32 core supports the standard `analogWrite()` function for convenience, even though older physical ESP32 Arduino cores used the `ledc` API.
- Ensure your `Serial.begin(115200);` matches the simulator's Serial Monitor settings (which defaults to 115200 for ESP32 boards).

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-esp32-cam" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: ESP32-CAM</a>
  </div>
  <div>
    <a href="/docs/components/openhw-esp32-s2" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: ESP32-S2 &rarr;</a>
  </div>
</div>
