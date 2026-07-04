---
title: "Raindrop Module"
description: "A rain and moisture detection module featuring an LM393 comparator."
slug: /components/openhw-raindrop-module
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Sensors">Sensors</a> &gt; 
  <span>Raindrop Module</span>
</div>

# Raindrop Module
<p class="subtitle">A sensor that detects water droplets and outputs both analog and digital signals.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <img src="/images/components/openhw-raindrop-module.svg" alt="Raindrop Module" style="width:60px; height:120px; max-width: 60px; max-height: 120px" />
    <span style="font-size:11px;color:var(--vp-c-text-2);">LM393 Module</span>
  </div>
  <div class="component-info">
    <p>The Raindrop sensor consists of two parts: a large exposed pad that catches water droplets, and a control module powered by an LM393 comparator. When water touches the pad, it lowers the resistance between its interlaced tracks. The module offers an Analog Output (AO) representing the moisture level, and a Digital Output (DO) that triggers when a specific threshold is reached.</p>
    <div>
      <span class="tag">Sensors</span>
      <span class="tag">Liquid</span>
      <span class="tag">Weather</span>
    </div>
  </div>
</div>

## Overview
This module is frequently used in smart weather stations or automatic window closers. The blue trimpot allows you to manually adjust the threshold for the Digital Output (DO). In real life, the DO pin goes LOW when water is detected and HIGH when dry.

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">AO</span></td><td><span class="pin-type analog">analog</span></td><td>Analog output. Voltage decreases as more water is detected.</td></tr>
<tr><td><span class="pin-name">DO</span></td><td><span class="pin-type digital">digital</span></td><td>Digital output. Goes LOW (0V) when the rain level exceeds the threshold.</td></tr>
<tr><td><span class="pin-name">GND</span></td><td><span class="pin-type power">power</span></td><td>Ground connection. Connect to Arduino GND.</td></tr>
<tr><td><span class="pin-name">VCC</span></td><td><span class="pin-type power">power</span></td><td>Power input. Connect to Arduino 5V.</td></tr>
</table>

## Configurable Attributes
<table class="attrs-table">
<tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr>
<tr><td><strong>threshold</strong></td><td><code>number</code></td><td><code>300</code></td><td>The internal comparator threshold (0-1023) to trigger the DO pin.</td></tr>
</table>

## Wiring Diagram (Arduino Uno)
1. Connect **VCC** to Arduino **5V**.
2. Connect **GND** to Arduino **GND**.
3. Connect **AO** to Arduino **A0** (to measure the rain level).
4. Connect **DO** to Arduino **D2** (to trigger an interrupt or digital read).
5. Ensure the Raindrop Pad is connected to the top pins of the module.

<p align="center">
  <img src="/images/components/openhw-raindrop-module_wiring.png" alt="Wiring Diagram" style="max-width: 100%; border-radius: 8px; margin: 20px 0;" />
</p>

<TryInSimulator />

## Example Arduino Code
This sketch reads the analog rain level and checks the digital threshold pin to trigger a simple alert.

```cpp
const int analogPin = A0;   // AO pin
const int digitalPin = 2;   // DO pin

void setup() {
  pinMode(digitalPin, INPUT);
  Serial.begin(9600);
}

void loop() {
  int analogValue = analogRead(analogPin);
  int digitalValue = digitalRead(digitalPin);
  
  Serial.print("Analog Rain Level: ");
  Serial.print(analogValue);
  
  // Remember: DO is active LOW
  if (digitalValue == LOW) {
    Serial.println(" --> 🌧️ Rain detected!");
  } else {
    Serial.println(" --> ☀️ Dry");
  }
  
  delay(500);
}
```

## Simulation Notes
- The simulator provides an interactive UI panel for the module. Click on it to adjust the simulated `rainLevel` using the slider.
- As the rain level crosses your configured `threshold`, the **DO LED** will turn bright blue, and the **DO** pin will immediately drop to `0V` (LOW).
- You can right-click the module to set the `threshold` via the context menu.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-potentiometer" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: Rotary Potentiometer</a>
  </div>
  <div>
    <a href="/docs/components/openhw-relay-module" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: Relay Module &rarr;</a>
  </div>
</div>
