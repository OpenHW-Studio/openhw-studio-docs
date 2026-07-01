---
title: "DS18B20 Temperature Sensor"
description: "A digital thermometer that communicates over a single data wire using the 1-Wire protocol."
slug: /components/openhw-ds18b20
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Sensors">Sensors</a> &gt; 
  <span>DS18B20 Temperature Sensor</span>
</div>

# DS18B20 Temperature Sensor
<p class="subtitle">A highly precise digital thermometer that communicates over a single data wire using the 1-Wire protocol.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <path d="M 30 50 Q 60 20 90 50 L 90 70 L 30 70 Z" fill="#1e293b" />
      <rect x="30" y="70" width="60" height="15" fill="#1e293b" />
      <rect x="40" y="85" width="4" height="25" fill="#94a3b8" />
      <rect x="58" y="85" width="4" height="25" fill="#94a3b8" />
      <rect x="76" y="85" width="4" height="25" fill="#94a3b8" />
      <text x="60" y="65" fill="#94a3b8" font-family="monospace" font-size="10" font-weight="bold" text-anchor="middle">DS18B20</text>
    </svg>
    <span style="font-size:11px;color:#4a5568;">TO-92 Package</span>
  </div>
  <div class="component-info">
    <p>The DS18B20 uses the 1-Wire protocol, meaning multiple sensors can share exactly the same data pin on your microcontroller. Each sensor has a unique 64-bit serial code burned in at the factory, allowing the master to address them individually.</p>
    <div>
      <span class="tag">Sensors</span>
      <span class="tag">1-Wire</span>
      <span class="tag">Temperature</span>
    </div>
  </div>
</div>

## Overview
Unlike analog thermistors, the DS18B20 provides digital temperature readings with up to 12 bits of resolution (accurate to ±0.5°C). It is extremely common in waterproof probes for measuring liquid temperature.

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">GND</span></td><td><span class="pin-type power">power</span></td><td>Ground. Connect to Arduino GND.</td></tr>
<tr><td><span class="pin-name">DQ</span></td><td><span class="pin-type digital">digital</span></td><td>1-Wire data line. Connect to any Arduino digital pin. Requires a 4.7kΩ pull-up resistor to VCC.</td></tr>
<tr><td><span class="pin-name">VCC</span></td><td><span class="pin-type power">power</span></td><td>Power supply. Connect to Arduino 5V or 3.3V.</td></tr>
</table>

> [!WARNING]
> A **4.7kΩ pull-up resistor** between DQ and VCC is required for reliable 1-Wire communication. Without it, readings will fail or be incorrect.

## Configurable Attributes
<table class="attrs-table">
<tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr>
<tr><td><strong>temperature</strong></td><td><code>number</code></td><td><code>25</code></td><td>Initial temperature in °C. Range: −55 to +125. Can be changed live during simulation via the context menu.</td></tr>
<tr><td><strong>resolution</strong></td><td><code>number</code></td><td><code>12</code></td><td>Sensor resolution bits. Options: 9, 10, 11, 12.</td></tr>
</table>

## Working Principle
The Arduino pulls the DQ line LOW for at least 480µs to reset all devices on the bus, then releases it. It then sends `0xCC` (Skip ROM) to address all sensors, or `0x55` followed by a 64-bit address to target a specific sensor. It sends `0x44` (Convert T) to trigger a measurement, and then reads the scratchpad.

## Wiring Diagram
1. Connect **VCC** to 5V.
2. Connect **GND** to Ground.
3. Connect **DQ** to a digital pin (e.g., D2).
4. Place a **4.7kΩ Resistor** connecting **DQ** and **VCC**.

## Example Arduino Code
*Install the **OneWire** and **DallasTemperature** libraries via the Library Manager before running.*

```cpp
#include <OneWire.h>
#include <DallasTemperature.h>

// DS18B20 DQ pin connected to Arduino pin 2
OneWire oneWire(2);
DallasTemperature sensors(&oneWire);

void setup() {
  Serial.begin(9600);
  sensors.begin();
  Serial.println("DS18B20 Ready");
}

void loop() {
  sensors.requestTemperatures();
  
  float tempC = sensors.getTempCByIndex(0);
  float tempF = sensors.getTempFByIndex(0);
  
  Serial.print("Temperature: ");
  Serial.print(tempC);
  Serial.print(" °C  /  ");
  Serial.print(tempF);
  Serial.println(" °F");
  
  delay(1000);
}
```

## Simulation Notes
- In OpenHW Studio, the DS18B20 is simulated at the library abstraction level. The DallasTemperature library calls are intercepted and the simulated temperature value is returned directly — making simulation fast and accurate without bit-level 1-Wire timing overhead.
- Features like Parasite Power Mode and Alarm functions are not currently simulated.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-ds1307-rtc" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: DS1307 RTC</a>
  </div>
  <div>
    <a href="/docs/components/openhw-ePaperDisplay" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: ePaper Display &rarr;</a>
  </div>
</div>

<style>
/* Base overrides for VitePress layout */
.custom-breadcrumb { margin-bottom: 2rem; font-size: 0.9rem; color: var(--vp-c-text-2); }
.custom-breadcrumb a { color: var(--vp-c-brand); text-decoration: none; }
.custom-breadcrumb a:hover { text-decoration: underline; }
.custom-breadcrumb span { color: var(--vp-c-text-1); font-weight: 600; }
h1 { font-size: 36px !important; font-weight: 800 !important; color: var(--vp-c-text-1) !important; margin-bottom: 8px !important; }
.subtitle { font-size: 16px; color: #718096; margin-bottom: 36px; border-bottom: 1px solid var(--vp-c-divider); padding-bottom: 24px; }
.component-preview { display: flex; gap: 40px; align-items: flex-start; margin-bottom: 40px; background: #1a1f2e; border: 1px solid #2d3748; border-radius: 12px; padding: 32px; }
.component-svg-wrap { flex-shrink: 0; display: flex; flex-direction: column; align-items: center; gap: 12px; }
.component-info p { color: #a0aec0; font-size: 15px; margin-bottom: 16px; line-height: 1.7; }
.tag { display: inline-block; background: #1a2035; border: 1px solid #2d4a8a; color: #63b3ed; padding: 3px 10px; border-radius: 20px; font-size: 12px; margin-right: 6px; margin-bottom: 6px; }
.pin-table, .attrs-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px; }
.pin-table th, .attrs-table th { background: #1a1f2e; color: #63b3ed; padding: 10px 14px; text-align: left; border: 1px solid #2d3748; }
.pin-table td, .attrs-table td { padding: 10px 14px; border: 1px solid #2d3748; color: #a0aec0; }
.pin-table tr:nth-child(even) td, .attrs-table tr:nth-child(even) td { background: #141824; }
.pin-name { font-family: monospace; color: #68d391; font-weight: 600; }
.pin-type { font-size: 11px; padding: 2px 8px; border-radius: 10px; font-weight: 600; text-transform: none; }
.pin-type.power { background: #3d0000; color: #f56565; }
.pin-type.digital { background: #1a365d; color: #63b3ed; }
.pin-type.passive { background: #4a4a4a; color: #a0aec0; }
.pin-type.input { background: #1c3d27; color: #68d391; }
.pin-type.analog { background: #4a3a1a; color: #f6ad55; }
.pin-type.default { background: #2d3748; color: #a0aec0; }
.circuit-preview { background: #0d1117; border: 1px solid #2d3748; border-radius: 8px; padding: 20px; margin-top: 16px; display: flex; align-items: center; justify-content: center; min-height: 140px; }
:root { --vp-c-bg: #0f1117; }
@media (max-width: 640px) { .component-preview { flex-direction: column; align-items: center; } }
</style>
