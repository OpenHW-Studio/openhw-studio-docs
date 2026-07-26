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
    <img src="/images/components/openhw-adxl345.svg" alt="ADXL345" style="width:94.5px; height:135px;" />
    <span style="font-size:11px;color:var(--vp-c-text-2);">ADXL345 Module</span>
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

<p align="center">
  <img src="/images/components/openhw-adxl345_wiring.png" alt="Wiring Diagram" style="max-width: 100%; border-radius: 8px; margin: 20px 0;" />
</p>

<TryInSimulator />

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
