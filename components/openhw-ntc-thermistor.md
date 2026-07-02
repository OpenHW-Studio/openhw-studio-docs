---
title: "NTC Thermistor Module"
description: "An NTC thermistor module with an onboard LM393 comparator for analog and digital temperature readings."
slug: /components/openhw-ntc-thermistor
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Sensors">Sensors</a> &gt; 
  <span>NTC Thermistor</span>
</div>

# NTC Thermistor
<p class="subtitle">A versatile temperature sensor module featuring both analog measurements and a tunable digital threshold trigger.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <img src="/images/components/openhw-ntc-thermistor.svg" alt="NTC Thermistor Module" style="width:80px; height:160px; max-width: 80px; max-height: 160px" />
    <span style="font-size:11px;color:var(--vp-c-text-2);">Thermistor Module</span>
  </div>
  <div class="component-info">
    <p>This module uses a Negative Temperature Coefficient (NTC) thermistor where resistance drops as temperature increases. Coupled with an LM393 comparator, it provides both a raw analog output and a sharp digital output triggered at a specific temperature threshold.</p>
    <div>
      <span class="tag">Sensors</span>
      <span class="tag">Temperature</span>
      <span class="tag">Analog</span>
      <span class="tag">Digital</span>
    </div>
  </div>
</div>

## Overview
Ideal for thermostats, overheating alarms, and climate monitors, this sensor is incredibly easy to use. The onboard potentiometer allows you to dial in the exact temperature threshold at which the digital output (D0) triggers LOW, illuminating the onboard DO LED. 

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">A0</span></td><td><span class="pin-type analog">analog</span></td><td>Analog Output. Outputs a voltage proportional to the ambient temperature.</td></tr>
<tr><td><span class="pin-name">D0</span></td><td><span class="pin-type digital">digital</span></td><td>Digital Output. Goes LOW when the temperature exceeds the set threshold.</td></tr>
<tr><td><span class="pin-name">GND</span></td><td><span class="pin-type power">power</span></td><td>Ground. Connect to Arduino GND.</td></tr>
<tr><td><span class="pin-name">VCC</span></td><td><span class="pin-type power">power</span></td><td>Power Supply. Connect to Arduino 5V.</td></tr>
</table>

## Configurable Attributes
<table class="attrs-table">
<tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr>
<tr><td><strong>temperature</strong></td><td><code>number</code></td><td><code>25</code></td><td>The simulated environmental temperature in Celsius.</td></tr>
<tr><td><strong>threshold</strong></td><td><code>number</code></td><td><code>512</code></td><td>The comparator threshold (0-1023) at which D0 triggers.</td></tr>
</table>

## Wiring Diagram (Arduino Uno)
1. Connect **VCC** to Arduino **5V**.
2. Connect **GND** to Arduino **GND**.
3. Connect **A0** to Arduino **A0** to read the analog temperature.
4. Connect **D0** to Arduino **D2** for threshold monitoring.

<p align="center">
  <img src="/images/components/openhw-ntc-thermistor_wiring.png" alt="Wiring Diagram" style="max-width: 100%; border-radius: 8px; margin: 20px 0;" />
</p>

<TryInSimulator />

## Example Arduino Code

```cpp
const int analogPin = A0;
const int digitalPin = 2;

void setup() {
  pinMode(digitalPin, INPUT);
  Serial.begin(9600);
}

void loop() {
  int tempValue = analogRead(analogPin);
  int isHot = digitalRead(digitalPin);
  
  Serial.print("Raw Temp Value: ");
  Serial.print(tempValue);
  
  if (isHot == LOW) {
    Serial.println(" --- WARNING: High Temp!");
  } else {
    Serial.println(" --- Temp OK.");
  }
  
  delay(500);
}
```

## Simulation Notes
- In the simulator, right-click the sensor to open its context menu and adjust the simulated temperature or the comparator threshold. Clicking the onboard potentiometer dial will also cycle its rotation visually.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-ntc-temperature-sensor" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: NTC Temperature Sensor</a>
  </div>
  <div>
    <a href="/docs/components/openhw-oled-display" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: OLED Display &rarr;</a>
  </div>
</div>
