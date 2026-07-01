---
title: "Analog Joystick"
description: "A 2-axis analog thumbstick with a built-in push button."
slug: /components/openhw-analog-joystick
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Sensors">Sensors</a> &gt; 
  <span>Analog Joystick</span>
</div>

# Analog Joystick
<p class="subtitle">A thumb-operated two-axis joystick module with a built-in push button, ideal for controlling movement or navigating menus.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <rect x="25" y="25" width="70" height="70" rx="4" fill="#0f172a" stroke="var(--vp-c-border)" stroke-width="2" />
      <circle cx="60" cy="60" r="28" fill="var(--vp-c-bg-soft)" stroke="#000000" stroke-width="4" />
      <circle cx="60" cy="60" r="22" fill="#334155" />
      <circle cx="60" cy="60" r="14" fill="#475569" />
      <circle cx="60" cy="60" r="5" fill="var(--vp-c-bg-soft)" />
      <circle cx="33" cy="33" r="3" fill="#fbbf24" />
      <circle cx="87" cy="33" r="3" fill="#fbbf24" />
      <circle cx="33" cy="87" r="3" fill="#fbbf24" />
      <circle cx="87" cy="87" r="3" fill="#fbbf24" />
      <rect x="25" y="15" width="10" height="10" fill="var(--vp-c-text-2)" />
      <rect x="37" y="15" width="10" height="10" fill="var(--vp-c-text-2)" />
      <rect x="49" y="15" width="10" height="10" fill="var(--vp-c-text-2)" />
      <rect x="61" y="15" width="10" height="10" fill="var(--vp-c-text-2)" />
      <rect x="73" y="15" width="10" height="10" fill="var(--vp-c-text-2)" />
    </svg>
    <span style="font-size:11px;color:var(--vp-c-text-2);">Analog Joystick</span>
  </div>
  <div class="component-info">
    <p>This module consists of two independent 10k potentiometers (one for the X-axis and one for the Y-axis) and a tactile push button for the Z-axis. It is electrically identical to the thumbsticks found on console game controllers.</p>
    <div>
      <span class="tag">Sensors</span>
      <span class="tag">Analog Input</span>
      <span class="tag">Human Interface</span>
    </div>
  </div>
</div>

## Overview
By measuring the resistance of the two potentiometers, a microcontroller can determine the exact position of the thumbstick across a 2D plane. When resting in the center, both the X and Y axes output exactly half of the supply voltage.

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">GND</span></td><td><span class="pin-type power">power</span></td><td>Ground reference.</td></tr>
<tr><td><span class="pin-name">VCC</span></td><td><span class="pin-type power">power</span></td><td>Power supply (usually 5V or 3.3V, matching your MCU's logic level).</td></tr>
<tr><td><span class="pin-name">VRx / HORZ</span></td><td><span class="pin-type analog">analog</span></td><td>X-axis output. Outputs an analog voltage based on horizontal position.</td></tr>
<tr><td><span class="pin-name">VRy / VERT</span></td><td><span class="pin-type analog">analog</span></td><td>Y-axis output. Outputs an analog voltage based on vertical position.</td></tr>
<tr><td><span class="pin-name">SW / SEL</span></td><td><span class="pin-type digital">digital</span></td><td>Switch output. Connects to GND when the joystick is pressed down.</td></tr>
</table>

## Configurable Attributes
*This component currently has no configurable attributes in the simulator. You can interact with it directly using your mouse.*

## Working Principle
1. **X and Y Axes**: The `VCC` and `GND` pins apply a voltage across two 10kΩ potentiometers. Moving the stick turns the wipers, changing the voltage at the `VRx` and `VRy` pins from 0V (one extreme) to VCC (the opposite extreme). The center position outputs VCC / 2.
2. **Button (SW)**: The `SW` pin is a simple tactile switch that connects to `GND` when pressed. It requires an internal or external pull-up resistor to function correctly.

## Wiring Diagram
1. Connect **VCC** to 5V (or 3.3V) and **GND** to Ground.
2. Connect **VRx** (HORZ) to an Analog Input pin (e.g., A0).
3. Connect **VRy** (VERT) to another Analog Input pin (e.g., A1).
4. Connect **SW** (SEL) to a Digital Input pin (e.g., 2).

## Example Arduino Code
```cpp
const int xPin = A0; // VRx
const int yPin = A1; // VRy
const int swPin = 2; // SW

void setup() {
  // The switch connects to ground, so we MUST enable the internal pull-up resistor.
  pinMode(swPin, INPUT_PULLUP);
  Serial.begin(9600);
}

void loop() {
  int xVal = analogRead(xPin);
  int yVal = analogRead(yPin);
  
  // Note: Because of the pull-up, the switch reads LOW (0) when pressed!
  int swVal = digitalRead(swPin); 
  
  Serial.print("X: "); Serial.print(xVal);
  Serial.print(" | Y: "); Serial.print(yVal);
  
  if (swVal == LOW) {
    Serial.println(" | Button: PRESSED");
  } else {
    Serial.println(" | Button: Released");
  }
  
  delay(100);
}
```

## Simulation Notes
- In the simulator, click and drag the joystick head to move it.
- To simulate pressing the button, click the center of the joystick without dragging.
- The resting value of the analog pins in the simulator will be exactly 512 (on a 10-bit ADC). Real joysticks usually rest anywhere between 490 and 530, so you should always implement a "deadzone" in your code.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-adxl345" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: ADXL345 Accelerometer</a>
  </div>
  <div>
    <a href="/docs/components/openhw-arduino-mega" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: Arduino Mega &rarr;</a>
  </div>
</div>
