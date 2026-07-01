---
title: "DHT22 Temperature & Humidity Sensor"
description: "A basic, low-cost digital temperature and humidity sensor."
slug: /components/openhw-dht22
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Sensors">Sensors</a> &gt; 
  <span>DHT22 Temperature & Humidity Sensor</span>
</div>

# DHT22 Temperature & Humidity Sensor
<p class="subtitle">A highly popular, low-cost digital temperature and humidity sensor using a custom single-wire protocol.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <rect x="35" y="15" width="50" height="60" rx="2" fill="var(--vp-c-text-1)" stroke="#cbd5e1" stroke-width="2" />
      <line x1="45" y1="25" x2="75" y2="25" stroke="#94a3b8" stroke-width="2" stroke-linecap="round" />
      <line x1="45" y1="35" x2="75" y2="35" stroke="#94a3b8" stroke-width="2" stroke-linecap="round" />
      <line x1="45" y1="45" x2="75" y2="45" stroke="#94a3b8" stroke-width="2" stroke-linecap="round" />
      <line x1="45" y1="55" x2="75" y2="55" stroke="#94a3b8" stroke-width="2" stroke-linecap="round" />
      <line x1="45" y1="65" x2="75" y2="65" stroke="#94a3b8" stroke-width="2" stroke-linecap="round" />
      <rect x="42" y="75" width="4" height="20" fill="var(--vp-c-text-2)" />
      <rect x="52" y="75" width="4" height="20" fill="var(--vp-c-text-2)" />
      <rect x="62" y="75" width="4" height="20" fill="var(--vp-c-text-2)" />
      <rect x="72" y="75" width="4" height="20" fill="var(--vp-c-text-2)" />
      <text x="60" y="110" fill="#ffffff" font-family="monospace" font-size="10" font-weight="bold" text-anchor="middle">AM2302</text>
    </svg>
    <span style="font-size:11px;color:var(--vp-c-text-2);">DHT22 Sensor</span>
  </div>
  <div class="component-info">
    <p>The DHT22 provides reliable temperature and humidity readings over a single digital line. While slower than modern I2C sensors (max 0.5 Hz sampling rate), it is extremely easy to wire and widely supported by community libraries.</p>
    <div>
      <span class="tag">Sensors</span>
      <span class="tag">Digital Output</span>
      <span class="tag">Environmental</span>
    </div>
  </div>
</div>

## Overview
Inside the slotted plastic casing are a capacitive humidity sensor, an NTC thermistor for temperature, and a small 8-bit microcontroller that converts the analog readings into a precise 40-bit digital pulse train.

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">VCC (1)</span></td><td><span class="pin-type power">power</span></td><td>Power supply. Connect to 5V or 3.3V.</td></tr>
<tr><td><span class="pin-name">SDA (2)</span></td><td><span class="pin-type digital">digital</span></td><td>Data signal. Connect to any digital pin. Requires a pull-up resistor in hardware (emulated internally in OpenHW Studio).</td></tr>
<tr><td><span class="pin-name">NC (3)</span></td><td><span class="pin-type passive">passive</span></td><td>Not Connected. Do not wire.</td></tr>
<tr><td><span class="pin-name">GND (4)</span></td><td><span class="pin-type power">power</span></td><td>Common ground connection.</td></tr>
</table>

## Configurable Attributes
<table class="attrs-table">
<tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr>
<tr><td><strong>temperature</strong></td><td><code>number</code></td><td><code>24.0</code></td><td>Temperature in °C (-40 to 80). Adjustable live.</td></tr>
<tr><td><strong>humidity</strong></td><td><code>number</code></td><td><code>50.0</code></td><td>Relative humidity in % (0 to 100). Adjustable live.</td></tr>
</table>

## Working Principle
::: warning Polling Frequency
The DHT22 is a slow sensor. You must wait at least 2 seconds between sequential reads (e.g., `delay(2000);`). Polling the sensor more frequently than 0.5Hz will cause the read functions to return `NaN` (Not a Number) or fail silently.
:::

## Wiring Diagram
1. Connect **VCC** to 5V.
2. Connect **GND** to Ground.
3. Connect **SDA** to a digital pin (e.g., D2).
4. Ignore the **NC** pin entirely.

## Example Arduino Code
*Install the **DHT sensor library by Adafruit** via the OpenHW Library Manager.*

```cpp
#include "DHT.h"

// Define the pin and type
#define DHTPIN 2        
#define DHTTYPE DHT22   

// Initialize DHT sensor module
DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(9600);
  Serial.println(F("DHT22 Starting..."));
  dht.begin();
}

void loop() {
  // Wait 2 seconds between measurements
  delay(2000);
  
  float h = dht.readHumidity();
  float t = dht.readTemperature(); 
  
  if (isnan(h) || isnan(t)) {
    Serial.println(F("Failed to read from DHT sensor!"));
    return;
  }
  
  Serial.print(F("Humidity: "));
  Serial.print(h);
  Serial.print(F("%  Temperature: "));
  Serial.print(t);
  Serial.println(F(" °C"));
}
```

## Simulation Notes
- In real hardware, the DATA pin requires a 10kΩ pull-up resistor connected to VCC. The simulator mathematically emulates this pull-up resistor, meaning you do not need to add one to the virtual canvas.
- Right-click the component to manually sweep the temperature and humidity values live during simulation.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-charger" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: Charger Module</a>
  </div>
  <div>
    <a href="/docs/components/openhw-diode" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: Diode &rarr;</a>
  </div>
</div>
