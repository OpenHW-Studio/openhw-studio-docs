---
title: "BMP180 Barometric Sensor"
description: "High-precision digital pressure sensor that can measure atmospheric pressure and temperature."
slug: /components/openhw-bmp180-breakout
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Sensors">Sensors</a> &gt; 
  <span>BMP180 Barometric Sensor</span>
</div>

# BMP180 Pressure Sensor Breakout
<p class="subtitle">An I2C barometric pressure and temperature sensor that can measure pressure (300–1100 hPa) and calculate altitude.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <rect x="35" y="25" width="50" height="70" rx="4" fill="#6d28d9" stroke="#4c1d95" stroke-width="2" />
      <circle cx="60" cy="55" r="10" fill="#a78bfa" />
      <circle cx="60" cy="55" r="8" fill="#4c1d95" />
      <circle cx="45" cy="35" r="2" fill="#c4b5fd" />
      <circle cx="75" cy="35" r="2" fill="#c4b5fd" />
      <rect x="42" y="85" width="36" height="10" fill="#eab308" />
      <line x1="42" y1="85" x2="42" y2="95" stroke="#ca8a04" stroke-width="1" />
      <line x1="51" y1="85" x2="51" y2="95" stroke="#ca8a04" stroke-width="1" />
      <line x1="60" y1="85" x2="60" y2="95" stroke="#ca8a04" stroke-width="1" />
      <line x1="69" y1="85" x2="69" y2="95" stroke="#ca8a04" stroke-width="1" />
      <line x1="78" y1="85" x2="78" y2="95" stroke="#ca8a04" stroke-width="1" />
      <text x="60" y="78" fill="#ffffff" font-family="monospace" font-size="10" font-weight="bold" text-anchor="middle">BMP180</text>
    </svg>
    <span style="font-size:11px;color:var(--vp-c-text-2);">BMP180 Breakout</span>
  </div>
  <div class="component-info">
    <p>The BMP180 is a high-precision digital pressure sensor that can measure atmospheric pressure and temperature. Because atmospheric pressure changes with altitude, you can also use it as an altimeter.</p>
    <div>
      <span class="tag">Sensors</span>
      <span class="tag">I2C</span>
      <span class="tag">Environmental</span>
    </div>
  </div>
</div>

## Overview
The BMP180 uses the standard barometric formula to derive altitude from pressure. Sea level pressure (101325 Pa) gives altitude = 0m. At the top of Mount Everest (~30000 Pa), altitude is approximately 8848m.

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">VIN</span></td><td><span class="pin-type power">power</span></td><td>Power supply. Connect to Arduino 3.3V (preferred) or 5V.</td></tr>
<tr><td><span class="pin-name">GND</span></td><td><span class="pin-type power">power</span></td><td>Ground. Connect to Arduino GND.</td></tr>
<tr><td><span class="pin-name">SCL</span></td><td><span class="pin-type input">input</span></td><td>I2C Clock. Connect to Arduino A5.</td></tr>
<tr><td><span class="pin-name">SDA</span></td><td><span class="pin-type digital">digital</span></td><td>I2C Data. Connect to Arduino A4.</td></tr>
</table>

## Configurable Attributes
<table class="attrs-table">
<tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr>
<tr><td><strong>temperature</strong></td><td><code>number</code></td><td><code>25.0</code></td><td>Temperature in °C (-40 to 85). Adjustable live.</td></tr>
<tr><td><strong>pressure</strong></td><td><code>number</code></td><td><code>1013.25</code></td><td>Pressure in hPa. Sea level = 1013.25 hPa. Adjustable live.</td></tr>
</table>

## Working Principle
The BMP180 communicates over the I2C bus using fixed address `0x77`. If another I2C device on your bus also uses `0x77`, there will be a conflict.

## Wiring Diagram
1. Connect **VIN** to 3.3V (or 5V if the breakout has a regulator).
2. Connect **GND** to Ground.
3. Connect **SCL** to the Arduino's SCL pin (A5).
4. Connect **SDA** to the Arduino's SDA pin (A4).

## Example Arduino Code
```cpp
#include <Wire.h>
#include <Adafruit_BMP085.h>

Adafruit_BMP085 bmp;

void setup() {
  Serial.begin(9600);
  if (!bmp.begin()) {
    Serial.println("BMP180 not found!");
    while (1) {}
  }
  Serial.println("BMP180 Ready");
}

void loop() {
  float temp     = bmp.readTemperature();
  long  pressure = bmp.readPressure();
  float altitude = bmp.readAltitude();

  Serial.print("Temp: ");     Serial.print(temp);     Serial.println(" °C");
  Serial.print("Pressure: "); Serial.print(pressure); Serial.println(" Pa");
  Serial.print("Altitude: "); Serial.print(altitude); Serial.println(" m");
  Serial.println("---");

  delay(1000);
}
```

## Simulation Notes
- Right-click the BMP180 during simulation to change temperature and pressure. The altitude is calculated automatically using the barometric formula.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-biaxial-stepper" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: Biaxial Stepper</a>
  </div>
  <div>
    <a href="/docs/components/openhw-breadboard" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: Breadboard &rarr;</a>
  </div>
</div>
