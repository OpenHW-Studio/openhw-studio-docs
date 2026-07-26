---
title: "16-Channel PWM Module (PCA9865)"
description: "16-Channel PWM Module (PCA9865) Component."
slug: /components/openhw-pca9865
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Logic%20Components">Logic Components</a> &gt; 
  <span>16-Channel PWM Module (PCA9865)</span>
</div>

# 16-Channel PWM Module (PCA9865)
<p class="subtitle">A standard 16-channel pwm module (pca9865) used for electronic prototyping.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <img src="/images/components/openhw-pca9865.svg" alt="PCA9685 Module" style="width:160px; height:80px; max-width: 100%; max-height: 200px" />
    <span style="font-size:11px;color:var(--vp-c-text-2);">Module</span>
  </div>
  <div class="component-info">
    <p>This is the 16-Channel PWM Module (PCA9865) component available in the OpenHW Studio Simulator.</p>
    <div>
      <span class="tag">Logic Components</span>
      <span class="tag">Component</span>
    </div>
  </div>
</div>

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">GND</span></td><td><span class="pin-type power">power</span></td><td>Ground.</td></tr>
<tr><td><span class="pin-name">OE</span></td><td><span class="pin-type input">input</span></td><td>Output Enable. Active low. Connect to GND to enable outputs.</td></tr>
<tr><td><span class="pin-name">SCL</span></td><td><span class="pin-type input">input</span></td><td>I2C Clock line.</td></tr>
<tr><td><span class="pin-name">SDA</span></td><td><span class="pin-type input">input</span></td><td>I2C Data line.</td></tr>
<tr><td><span class="pin-name">VCC</span></td><td><span class="pin-type power">power</span></td><td>Logic Power Supply (usually 5V).</td></tr>
<tr><td><span class="pin-name">V+</span></td><td><span class="pin-type power">power</span></td><td>Motor/Servo Power Supply (often 5V to 6V).</td></tr>
</table>

## Wiring Diagram

<p align="center">
  <img src="/images/components/openhw-pca9865_wiring.png" alt="Wiring Diagram" style="max-width: 100%; border-radius: 8px; margin: 20px 0;" />
</p>

<TryInSimulator />

## Example Arduino Code

```cpp
#include <Wire.h>
#include <Adafruit_PWMServoDriver.h>

Adafruit_PWMServoDriver pwm = Adafruit_PWMServoDriver();

void setup() {
  Serial.begin(9600);
  pwm.begin();
  pwm.setPWMFreq(50); // Typical for servos
}

void loop() {
  // Drive channel 0 to minimum pulse
  pwm.setPWM(0, 0, 150);
  delay(1000);
  
  // Drive channel 0 to maximum pulse
  pwm.setPWM(0, 0, 600);
  delay(1000);
}
```
