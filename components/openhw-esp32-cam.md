---
title: "ESP32-CAM"
description: "A small-size camera module based on the ESP32 chip with built-in Wi-Fi and Bluetooth."
slug: /components/openhw-esp32-cam
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Logic%20Components">Logic Components</a> &gt; 
  <span>ESP32-CAM</span>
</div>

# ESP32-CAM
<p class="subtitle">A highly competitive small-size camera module with Bluetooth, Wi-Fi, and an onboard microSD card slot.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <rect x="25" y="15" width="70" height="90" rx="4" fill="var(--vp-c-bg-soft)" stroke="#0f172a" stroke-width="2" />
      <rect x="35" y="30" width="50" height="30" rx="2" fill="#0f172a" />
      <circle cx="60" cy="45" r="10" fill="#3b82f6" />
      <circle cx="60" cy="45" r="6" fill="#1e40af" />
      <rect x="40" y="75" width="40" height="15" fill="var(--vp-c-text-2)" />
      <circle cx="60" cy="22" r="2" fill="#eab308" />
      <text x="60" y="100" fill="var(--vp-c-text-2)" font-family="monospace" font-size="8" font-weight="bold" text-anchor="middle">ESP32-CAM</text>
    </svg>
    <span style="font-size:11px;color:var(--vp-c-text-2);">Camera Module</span>
  </div>
  <div class="component-info">
    <p>The ESP32-CAM is based on the powerful ESP32-S chip and features an OV2640 camera, several GPIOs, and a microSD card slot to store images. It is extremely popular for IoT video streaming, facial recognition, and smart home projects.</p>
    <div>
      <span class="tag">Logic Components</span>
      <span class="tag">Wi-Fi</span>
      <span class="tag">Camera</span>
    </div>
  </div>
</div>

## Overview
Because the module packs so much into a tiny form factor, many of the ESP32's pins are internally wired to the camera and SD card reader. This means you have very few free GPIO pins available for external sensors or motors.

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">5V</span></td><td><span class="pin-type power">power</span></td><td>5V power input. (Must be a strong 5V source, min 2A).</td></tr>
<tr><td><span class="pin-name">3V3</span></td><td><span class="pin-type power">power</span></td><td>3.3V power output/input.</td></tr>
<tr><td><span class="pin-name">GND</span></td><td><span class="pin-type power">power</span></td><td>Ground. (Multiple GND pins are provided).</td></tr>
<tr><td><span class="pin-name">U0R / U0T</span></td><td><span class="pin-type digital">digital</span></td><td>Serial RX/TX. Connect to an FTDI programmer to upload code.</td></tr>
<tr><td><span class="pin-name">IO0</span></td><td><span class="pin-type digital">digital</span></td><td>Connect to GND to enter programming mode. Otherwise used for the camera clock.</td></tr>
<tr><td><span class="pin-name">IO4</span></td><td><span class="pin-type digital">digital</span></td><td>Connected to the onboard high-power Flash LED. Can also be used as a microSD data line.</td></tr>
<tr><td><span class="pin-name">IO2, IO12...</span></td><td><span class="pin-type digital">digital</span></td><td>Various other pins multiplexed with the SD Card and Camera.</td></tr>
</table>

> [!WARNING]
> **Programming:** The ESP32-CAM does NOT have a built-in USB port! You must wire an FTDI adapter to the U0R, U0T, 5V, and GND pins, and jumper IO0 to GND when booting to upload code.

## Configurable Attributes
*This component currently has no configurable simulation attributes.*

## Working Principle
The OV2640 camera streams JPEG-compressed image data directly to the ESP32's internal memory via a parallel interface. The ESP32 then uses its built-in Wi-Fi radio to host a web server, allowing you to view the video stream from any web browser on the same network.

## Example Arduino Code
*Because the camera initialization code is extremely long and complex, we recommend using the built-in Arduino IDE example: **File > Examples > ESP32 > Camera > CameraWebServer**.*

Below is a simplified pseudo-code structure to demonstrate how the camera is typically started:

```cpp
#include "esp_camera.h"
#include <WiFi.h>

// Select camera model
#define CAMERA_MODEL_AI_THINKER

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

void setup() {
  Serial.begin(115200);

  camera_config_t config;
  // ... (long list of pin definitions here) ...
  config.pixel_format = PIXFORMAT_JPEG;
  config.frame_size = FRAMESIZE_QVGA;
  config.jpeg_quality = 12;
  config.fb_count = 1;

  // Initialize the camera
  esp_err_t err = esp_camera_init(&config);
  if (err != ESP_OK) {
    Serial.printf("Camera init failed with error 0x%x", err);
    return;
  }

  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.print("Camera Stream Ready! Go to: http://");
  Serial.println(WiFi.localIP());
  
  // (Start the web server to host the stream here)
}

void loop() {
  // Web server runs asynchronously in the background
}
```

## Simulation Notes
- True video capture and Wi-Fi streaming are highly demanding tasks. The OpenHW Simulator provides an abstract model of the ESP32-CAM where you can mock image data rather than rendering a true 3D scene.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-ePaperDisplay" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: ePaper Display</a>
  </div>
  <div>
    <a href="/docs/components/openhw-esp32" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: ESP32 &rarr;</a>
  </div>
</div>
