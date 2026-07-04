---
title: "MPU6050 IMU Sensor"
description: "A 6-axis Inertial Measurement Unit (IMU) featuring an accelerometer and gyroscope."
slug: /components/openhw-mpu6050
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Sensors">Sensors</a> &gt; 
  <span>MPU6050 IMU Sensor</span>
</div>

# MPU6050 IMU Sensor
<p class="subtitle">A 6-axis motion tracking device that combines a 3-axis gyroscope and a 3-axis accelerometer on the same silicon die.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <img src="/images/components/openhw-mpu6050.svg" alt="MPU6050 IMU Sensor" style="width:135px; height:105px; max-width: 135px; max-height: 105px" />
    <span style="font-size:11px;color:var(--vp-c-text-2);">MPU-6050</span>
  </div>
  <div class="component-info">
    <p>The MPU6050 tracks linear acceleration and angular velocity. The on-board Digital Motion Processor (DMP) can fuse this data to provide precise roll, pitch, and yaw angles. In OpenHW Studio, the sensor features a Live Data HUD where you can manipulate forces and orientation in real-time.</p>
    <div>
      <span class="tag">Sensors</span>
      <span class="tag">IMU</span>
      <span class="tag">I2C</span>
    </div>
  </div>
</div>

## Overview
IMU stands for Inertial Measurement Unit. The MPU6050 measures acceleration in three axes (X, Y, Z) and rotation (gyroscope) in three axes (roll, pitch, yaw). It communicates using the I2C protocol, meaning it only requires two data pins.

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">VCC</span></td><td><span class="pin-type power">power</span></td><td>Power supply (3.3V or 5V; breakout board has a regulator).</td></tr>
<tr><td><span class="pin-name">GND</span></td><td><span class="pin-type power">power</span></td><td>Ground. Connect to Arduino GND.</td></tr>
<tr><td><span class="pin-name">SCL</span></td><td><span class="pin-type input">input</span></td><td>I2C Clock. Connect to Arduino A5 (or dedicated SCL).</td></tr>
<tr><td><span class="pin-name">SDA</span></td><td><span class="pin-type input">input</span></td><td>I2C Data. Connect to Arduino A4 (or dedicated SDA).</td></tr>
<tr><td><span class="pin-name">XDA</span></td><td><span class="pin-type input">input</span></td><td>Auxiliary I2C Data (used to connect an external magnetometer).</td></tr>
<tr><td><span class="pin-name">XCL</span></td><td><span class="pin-type input">input</span></td><td>Auxiliary I2C Clock.</td></tr>
<tr><td><span class="pin-name">AD0</span></td><td><span class="pin-type input">input</span></td><td>I2C Address Select. LOW = 0x68 (Default). HIGH = 0x69.</td></tr>
<tr><td><span class="pin-name">INT</span></td><td><span class="pin-type output">output</span></td><td>Interrupt pin. Used when DMP data is ready (optional).</td></tr>
</table>

## Configurable Attributes
<table class="attrs-table">
<tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr>
<tr><td><strong>accelX</strong></td><td><code>number</code></td><td><code>0</code></td><td>Initial acceleration in the X axis.</td></tr>
<tr><td><strong>accelY</strong></td><td><code>number</code></td><td><code>0</code></td><td>Initial acceleration in the Y axis.</td></tr>
<tr><td><strong>accelZ</strong></td><td><code>number</code></td><td><code>1</code></td><td>Initial acceleration in the Z axis (gravity).</td></tr>
<tr><td><strong>gyroX</strong></td><td><code>number</code></td><td><code>0</code></td><td>Initial rotation in the X axis.</td></tr>
<tr><td><strong>gyroY</strong></td><td><code>number</code></td><td><code>0</code></td><td>Initial rotation in the Y axis.</td></tr>
<tr><td><strong>gyroZ</strong></td><td><code>number</code></td><td><code>0</code></td><td>Initial rotation in the Z axis.</td></tr>
<tr><td><strong>temperature</strong></td><td><code>number</code></td><td><code>25</code></td><td>Initial temperature in Celsius.</td></tr>
</table>

## Wiring Diagram (Arduino Uno)
1. Connect **VCC** to Arduino **5V**.
2. Connect **GND** to Arduino **GND**.
3. Connect **SDA** to Arduino **A4**.
4. Connect **SCL** to Arduino **A5**.

<p align="center">
  <img src="/images/components/openhw-mpu6050_wiring.png" alt="Wiring Diagram" style="max-width: 100%; border-radius: 8px; margin: 20px 0;" />
</p>

<TryInSimulator />

## Example Arduino Code
Install the `Adafruit_MPU6050` library via the Library Manager before running this sketch.

```cpp
#include <Adafruit_MPU6050.h>
#include <Adafruit_Sensor.h>
#include <Wire.h>

Adafruit_MPU6050 mpu;

void setup() {
  Serial.begin(115200);
  
  if (!mpu.begin()) {
    Serial.println("Failed to find MPU6050 chip");
    while (1) {
      delay(10);
    }
  }
  
  Serial.println("MPU6050 Found!");
  
  // Basic configuration
  mpu.setAccelerometerRange(MPU6050_RANGE_8_G);
  mpu.setGyroRange(MPU6050_RANGE_500_DEG);
  mpu.setFilterBandwidth(MPU6050_BAND_21_HZ);
}

void loop() {
  /* Get new sensor events with the readings */
  sensors_event_t a, g, temp;
  mpu.getEvent(&a, &g, &temp);

  /* Print out the values */
  Serial.print("Acceleration X: ");
  Serial.print(a.acceleration.x);
  Serial.print(", Y: ");
  Serial.print(a.acceleration.y);
  Serial.print(", Z: ");
  Serial.print(a.acceleration.z);
  Serial.println(" m/s^2");

  Serial.print("Rotation X: ");
  Serial.print(g.gyro.x);
  Serial.print(", Y: ");
  Serial.print(g.gyro.y);
  Serial.print(", Z: ");
  Serial.print(g.gyro.z);
  Serial.println(" rad/s");

  Serial.print("Temperature: ");
  Serial.print(temp.temperature);
  Serial.println(" degC");
  
  Serial.println("");
  delay(500);
}
```

## Simulation Notes
- In the simulator, right-click on the MPU6050 module to open its interactive 3D control panel. This allows you to smoothly adjust pitch, roll, and yaw during runtime to test your code's response to movement.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-motor" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: DC Motor</a>
  </div>
  <div>
    <a href="/docs/components/openhw-mq2-gas-sensor" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: MQ-2 Gas Sensor &rarr;</a>
  </div>
</div>
