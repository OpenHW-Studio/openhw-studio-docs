---
title: "Photodiode"
description: "A photodiode component used for precise light sensing."
slug: /components/openhw-photodiode
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Sensors">Sensors</a> &gt; 
  <span>Photodiode</span>
</div>

# Photodiode
<p class="subtitle">A fast-acting semiconductor device that converts light into electrical current.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <img src="/images/components/openhw-photodiode.svg" alt="Photodiode" style="width:20px; height:60px; max-width: 20px; max-height: 60px" />
    <span style="font-size:11px;color:var(--vp-c-text-2);">Photodiode</span>
  </div>
  <div class="component-info">
    <p>Unlike a standard Photoresistor (LDR) which changes resistance, a Photodiode generates a small reverse current when exposed to light (often infrared or visible depending on the tint). It has a significantly faster response time than an LDR, making it suitable for optical communication and precise pulse detection.</p>
    <div>
      <span class="tag">Sensors</span>
      <span class="tag">Light</span>
    </div>
  </div>
</div>

## Overview
Photodiodes are directional, meaning they have an Anode and a Cathode. They are typically used in reverse-bias mode (cathode to positive voltage, anode to ground through a resistor), where the small leakage current increases proportionally with light intensity. The dark plastic casing helps filter out ambient visible light, often making it highly sensitive to infrared (IR).

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">A</span></td><td><span class="pin-type analog">analog</span></td><td>Anode. The longer leg. Typically connected to an analog pin or ground.</td></tr>
<tr><td><span class="pin-name">C</span></td><td><span class="pin-type power">power</span></td><td>Cathode. The shorter leg (indicated by the flat edge on the package).</td></tr>
</table>

## Configurable Attributes
<table class="attrs-table">
<tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr>
<tr><td><strong>light</strong></td><td><code>number</code></td><td><code>0</code></td><td>The simulated light level (0-100) hitting the sensor.</td></tr>
</table>

## Wiring Diagram (Reverse Bias)
To measure the light, connect the Photodiode in reverse bias with a load resistor (e.g., 10k&Omega;).
1. Connect **Cathode (C)** to Arduino **5V**.
2. Connect **Anode (A)** to Arduino **A0**.
3. Connect a 10k&Omega; resistor from **Anode (A)** to **GND**.

<p align="center">
  <img src="/images/components/openhw-photodiode_wiring.png" alt="Wiring Diagram" style="max-width: 100%; border-radius: 8px; margin: 20px 0;" />
</p>

<TryInSimulator />

## Example Arduino Code

```cpp
const int sensorPin = A0;

void setup() {
  Serial.begin(9600);
}

void loop() {
  // Read the voltage drop across the load resistor
  int sensorValue = analogRead(sensorPin);
  
  Serial.print("Light intensity reading: ");
  Serial.println(sensorValue);
  
  delay(100);
}
```

## Simulation Notes
- In the simulator, right-click the photodiode to open its context menu and adjust the `light` attribute.
- As the simulated light level increases, a subtle glow appears on the internal silicon die.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-pcm5102" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: PCM5102 I2S DAC</a>
  </div>
  <div>
    <a href="/docs/components/openhw-photoresistor" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: Photoresistor (LDR) &rarr;</a>
  </div>
</div>
