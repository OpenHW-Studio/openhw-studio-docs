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
    <img src="/images/components/openhw-ds18b20.svg" alt="DS18B20 Sensor" style="width:60px; height:90px;" />
    <span style="font-size:11px;color:var(--vp-c-text-2);">TO-92 Package</span>
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

<p align="center">
  <img src="/images/components/openhw-ds18b20_wiring.png" alt="Wiring Diagram" style="max-width: 100%; border-radius: 8px; margin: 20px 0;" />
</p>

<TryInSimulator />

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
