---
title: "DS1307 RTC Module"
description: "An I2C real-time clock (RTC) module with battery backup for keeping track of time."
slug: /components/openhw-ds1307-rtc
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Logic%20Components">Logic Components</a> &gt; 
  <span>DS1307 RTC Module</span>
</div>

# DS1307 RTC Module
<p class="subtitle">An I2C real-time clock (RTC) that maintains the current date and time even when the microcontroller is powered off.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <rect x="25" y="25" width="70" height="70" rx="4" fill="#0f172a" stroke="#1e293b" stroke-width="2" />
      <circle cx="60" cy="60" r="22" fill="#94a3b8" />
      <circle cx="60" cy="60" r="18" fill="#e2e8f0" />
      <text x="60" y="64" fill="#475569" font-family="sans-serif" font-size="10" font-weight="bold" text-anchor="middle">CR2032</text>
      <rect x="35" y="30" width="10" height="15" fill="#1e293b" />
      <rect x="75" y="30" width="10" height="15" fill="#1e293b" />
      <circle cx="35" cy="85" r="2" fill="#eab308" />
      <circle cx="45" cy="85" r="2" fill="#eab308" />
      <circle cx="55" cy="85" r="2" fill="#eab308" />
      <circle cx="65" cy="85" r="2" fill="#eab308" />
      <circle cx="75" cy="85" r="2" fill="#eab308" />
      <circle cx="85" cy="85" r="2" fill="#eab308" />
    </svg>
    <span style="font-size:11px;color:#4a5568;">DS1307 RTC</span>
  </div>
  <div class="component-info">
    <p>The DS1307 maintains date and time data in BCD (Binary Coded Decimal) format. It communicates with microcontrollers using the I2C bus at address <code>0x68</code>. The onboard CR2032 battery ensures the clock continues ticking even when main power is removed.</p>
    <div>
      <span class="tag">Logic Components</span>
      <span class="tag">I2C (0x68)</span>
      <span class="tag">Time</span>
    </div>
  </div>
</div>

## Overview
Microcontrollers like the Arduino do not inherently know the current time, and their internal `millis()` counter resets to 0 every time they lose power. The RTC module solves this by providing a permanent time reference.

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">VCC</span></td><td><span class="pin-type power">power</span></td><td>Power supply. Connect to 5V.</td></tr>
<tr><td><span class="pin-name">GND</span></td><td><span class="pin-type power">power</span></td><td>Ground. Connect to Arduino GND.</td></tr>
<tr><td><span class="pin-name">SDA</span></td><td><span class="pin-type digital">digital</span></td><td>I2C Data line. Connect to Arduino A4 (or SDA).</td></tr>
<tr><td><span class="pin-name">SCL</span></td><td><span class="pin-type digital">digital</span></td><td>I2C Clock line. Connect to Arduino A5 (or SCL).</td></tr>
<tr><td><span class="pin-name">SQ</span></td><td><span class="pin-type digital">digital</span></td><td>Optional square wave output (1Hz, 4kHz, 8kHz, 32kHz).</td></tr>
</table>
*(Note: Some DS1307 modules have a second set of identical pins on the opposite side to allow daisy-chaining multiple I2C devices).*

## Configurable Attributes
<table class="attrs-table">
<tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr>
<tr><td><strong>datetime</strong></td><td><code>string</code></td><td><code>2024-01-01T00:00:00</code></td><td>The starting date and time for the simulation clock. You can change this dynamically during simulation by right-clicking the module.</td></tr>
<tr><td><strong>i2cAddress</strong></td><td><code>string</code></td><td><code>0x68</code></td><td>Internal I2C address. Generally fixed at 0x68 for the DS1307.</td></tr>
</table>

## Working Principle
The DS1307 contains 64 bytes of NVRAM, the first 8 of which are reserved for timekeeping registers (Seconds, Minutes, Hours, Day, Date, Month, Year, Control). To read or write the time, you request specific register addresses over I2C. 

## Wiring Diagram
1. Connect **VCC** to 5V.
2. Connect **GND** to GND.
3. Connect **SDA** to Arduino analog pin A4.
4. Connect **SCL** to Arduino analog pin A5.

## Example Arduino Code
*Install the **RTClib** library by Adafruit before running this code.*

```cpp
#include <Wire.h>
#include <RTClib.h>

RTC_DS1307 rtc;

void setup() {
  Serial.begin(9600);
  Wire.begin();
  
  if (!rtc.begin()) {
    Serial.println("Couldn't find RTC");
    while (1);
  }
  
  if (!rtc.isrunning()) {
    Serial.println("RTC is NOT running, let's set the time!");
    // Set the RTC to the date & time this sketch was compiled
    rtc.adjust(DateTime(F(__DATE__), F(__TIME__)));
  }
}

void loop() {
  DateTime now = rtc.now();
  
  Serial.print(now.year(), DEC);
  Serial.print('/');
  Serial.print(now.month(), DEC);
  Serial.print('/');
  Serial.print(now.day(), DEC);
  Serial.print(" ");
  Serial.print(now.hour(), DEC);
  Serial.print(':');
  Serial.print(now.minute(), DEC);
  Serial.print(':');
  Serial.print(now.second(), DEC);
  Serial.println();
  
  delay(1000);
}
```

## Simulation Notes
- In OpenHW Studio, the DS1307 simulates its internal clock oscillator. The clock automatically ticks in real-time as long as the simulation is playing.
- If you stop and restart the simulation, the clock will reset to the value specified in the `datetime` attribute unless you write new values to it via I2C code.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-diode" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: Diode</a>
  </div>
  <div>
    <a href="/docs/components/openhw-ds18b20" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: DS18B20 &rarr;</a>
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
