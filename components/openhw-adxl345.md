---
title: "ADXL345 Accelerometer"
description: "A small, thin, low power, 3-axis accelerometer with high resolution (13-bit) measurement up to ±16 g."
slug: /components/openhw-adxl345
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Sensors">Sensors</a> &gt; 
  <span>ADXL345 Accelerometer</span>
</div>

# ADXL345 Accelerometer
<p class="subtitle">A precise 3-axis digital accelerometer used to measure static acceleration of gravity in tilt-sensing applications, as well as dynamic acceleration resulting from motion or shock.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <rect x="25" y="20" width="70" height="80" rx="4" fill="#0f172a" stroke="#334155" stroke-width="2" />
      <rect x="40" y="45" width="40" height="30" rx="2" fill="#1e293b" stroke="#475569" stroke-width="1" />
      <circle cx="60" cy="60" r="4" fill="#64748b" />
      <circle cx="33" cy="28" r="3" fill="#fbbf24" />
      <circle cx="33" cy="40" r="3" fill="#fbbf24" />
      <circle cx="33" cy="52" r="3" fill="#fbbf24" />
      <circle cx="33" cy="64" r="3" fill="#fbbf24" />
      <circle cx="33" cy="76" r="3" fill="#fbbf24" />
      <circle cx="33" cy="88" r="3" fill="#fbbf24" />
      <circle cx="87" cy="28" r="3" fill="#fbbf24" />
      <circle cx="87" cy="40" r="3" fill="#fbbf24" />
      <circle cx="87" cy="52" r="3" fill="#fbbf24" />
      <circle cx="87" cy="64" r="3" fill="#fbbf24" />
      <circle cx="87" cy="76" r="3" fill="#fbbf24" />
      <circle cx="87" cy="88" r="3" fill="#fbbf24" />
      <text x="60" y="105" fill="#94a3b8" font-family="monospace" font-size="10" font-weight="bold" text-anchor="middle">ADXL345</text>
    </svg>
    <span style="font-size:11px;color:#4a5568;">ADXL345 Module</span>
  </div>
  <div class="component-info">
    <p>The ADXL345 is a popular digital accelerometer module. It communicates via I2C or SPI and provides highly accurate readings of acceleration across the X, Y, and Z axes. It is commonly used for step counting, tilt sensing in robotics, and game controllers.</p>
    <div>
      <span class="tag">Sensors</span>
      <span class="tag">I2C / SPI</span>
      <span class="tag">Motion</span>
    </div>
  </div>
</div>

## Overview
An accelerometer measures proper acceleration ("g-force"). Even when sitting completely still, the sensor will read roughly 1g (9.8 m/s²) straight down on the Z axis due to Earth's gravity. By analyzing the distribution of this 1g across the 3 axes, you can mathematically determine the module's exact orientation and tilt.

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">VCC</span></td><td><span class="pin-type power">power</span></td><td>Power supply (Typically 3.3V, but many modules have a 5V regulator).</td></tr>
<tr><td><span class="pin-name">GND</span></td><td><span class="pin-type power">power</span></td><td>Ground reference.</td></tr>
<tr><td><span class="pin-name">SCL</span></td><td><span class="pin-type input">input</span></td><td>Serial Clock (I2C SCL or SPI SCLK).</td></tr>
<tr><td><span class="pin-name">SDA</span></td><td><span class="pin-type digital">digital</span></td><td>Serial Data (I2C SDA or SPI MOSI).</td></tr>
<tr><td><span class="pin-name">SDO</span></td><td><span class="pin-type digital">digital</span></td><td>Serial Data Out (SPI MISO) / I2C Address Select (ALT ADDRESS).</td></tr>
<tr><td><span class="pin-name">CS</span></td><td><span class="pin-type input">input</span></td><td>Chip Select. Tie HIGH for I2C, use as standard CS for SPI.</td></tr>
<tr><td><span class="pin-name">INT1</span></td><td><span class="pin-type output">output</span></td><td>Programmable Interrupt 1 (e.g., tap detection, free-fall).</td></tr>
<tr><td><span class="pin-name">INT2</span></td><td><span class="pin-type output">output</span></td><td>Programmable Interrupt 2.</td></tr>
</table>

## Configurable Attributes
<table class="attrs-table">
<tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr>
<tr><td><strong>accelX</strong></td><td><code>number</code></td><td><code>0</code></td><td>Simulated acceleration on the X axis (in m/s²).</td></tr>
<tr><td><strong>accelY</strong></td><td><code>number</code></td><td><code>0</code></td><td>Simulated acceleration on the Y axis (in m/s²).</td></tr>
<tr><td><strong>accelZ</strong></td><td><code>number</code></td><td><code>9.8</code></td><td>Simulated acceleration on the Z axis (in m/s²). Default is 1g for gravity.</td></tr>
</table>

## Working Principle
Inside the silicon chip is a microscopic MEMS (Micro-Electro-Mechanical System) structure. A tiny mass is suspended by springs. When acceleration occurs, the mass shifts, changing the capacitance between it and fixed plates. This change is converted into a digital 13-bit value and sent over I2C/SPI.

## Wiring Diagram (I2C Mode)
1. Connect **VCC** to 3.3V (or 5V if the module supports it).
2. Connect **GND** to Ground.
3. Connect **SCL** to the Arduino's SCL pin (A5 on Uno).
4. Connect **SDA** to the Arduino's SDA pin (A4 on Uno).
5. Tie **CS** to VCC to select I2C mode.
6. Connect **SDO** to Ground to set the I2C address to `0x53`. (Connecting to VCC sets it to `0x1D`).

## Example Arduino Code
We highly recommend using the Adafruit Unified Sensor Library to handle the complex math required to convert raw data into standard SI units.

```cpp
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_ADXL345_U.h>

/* Assign a unique ID to this sensor at the same time */
Adafruit_ADXL345_Unified accel = Adafruit_ADXL345_Unified(12345);

void setup() {
  Serial.begin(9600);
  Serial.println("Accelerometer Test");
  
  if(!accel.begin()) {
    Serial.println("No ADXL345 detected, check your wiring!");
    while(1);
  }
  
  accel.setRange(ADXL345_RANGE_16_G);
}

void loop() {
  sensors_event_t event; 
  accel.getEvent(&event);
 
  // Display the results (acceleration is measured in m/s^2)
  Serial.print("X: "); Serial.print(event.acceleration.x); Serial.print("  ");
  Serial.print("Y: "); Serial.print(event.acceleration.y); Serial.print("  ");
  Serial.print("Z: "); Serial.print(event.acceleration.z); Serial.print("  ");
  Serial.println("m/s^2 ");
  
  delay(500);
}
```

## Simulation Notes
- In the simulator, the module operates in I2C mode by default at address `0x53`.
- You can manually set the X, Y, and Z acceleration variables via the part attributes to test your code's tilt/motion logic without physically moving the device.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-a4988" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: A4988 Stepper Driver</a>
  </div>
  <div>
    <a href="/docs/components/openhw-analog-joystick" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: Analog Joystick &rarr;</a>
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
.pin-type.output { background: #4a1c1c; color: #f56565; }
.pin-type.default { background: #2d3748; color: #a0aec0; }
.circuit-preview { background: #0d1117; border: 1px solid #2d3748; border-radius: 8px; padding: 20px; margin-top: 16px; display: flex; align-items: center; justify-content: center; min-height: 140px; }
:root { --vp-c-bg: #0f1117; }
@media (max-width: 640px) { .component-preview { flex-direction: column; align-items: center; } }
</style>
