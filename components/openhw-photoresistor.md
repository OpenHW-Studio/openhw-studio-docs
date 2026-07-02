---
title: "Photoresistor (LDR)"
description: "A simple Light Dependent Resistor component."
slug: /components/openhw-photoresistor
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Sensors">Sensors</a> &gt; 
  <span>Photoresistor (LDR)</span>
</div>

# Photoresistor (LDR)
<p class="subtitle">A classic Light Dependent Resistor whose resistance decreases when exposed to light.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <img src="/images/components/openhw-photoresistor.svg" alt="Photoresistor" style="width:45px; height:45px; max-width: 45px; max-height: 45px" />
    <span style="font-size:11px;color:var(--vp-c-text-2);">LDR</span>
  </div>
  <div class="component-info">
    <p>A Photoresistor (also known as a Light Dependent Resistor or LDR) is a passive electronic component that is sensitive to light. When placed in a voltage divider circuit with a fixed resistor, it allows a microcontroller to easily read the ambient light level as an analog voltage.</p>
    <div>
      <span class="tag">Sensors</span>
      <span class="tag">Light</span>
      <span class="tag">Passive</span>
    </div>
  </div>
</div>

## Overview
LDRs are commonly used in night-lights, outdoor street lamps, and simple alarm systems to detect the presence or absence of ambient light. The most common type is made of Cadmium Sulfide (CdS), which creates the characteristic orange zigzag track visible on the sensor face. Because they are resistors, they do not have polarity (anode/cathode) and can be connected in either direction.

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">Pin 1</span></td><td><span class="pin-type passive">passive</span></td><td>Leg 1. Connects to the voltage divider.</td></tr>
<tr><td><span class="pin-name">Pin 2</span></td><td><span class="pin-type passive">passive</span></td><td>Leg 2. Connects to the voltage divider.</td></tr>
</table>

## Configurable Attributes
<table class="attrs-table">
<tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr>
<tr><td><strong>lux</strong></td><td><code>number</code></td><td><code>500</code></td><td>The simulated ambient light level in Lux (0-1000).</td></tr>
</table>

## Wiring Diagram (Voltage Divider)
To measure light, wire the LDR in a voltage divider with a fixed resistor (e.g., 10k&Omega;).
1. Connect **Pin 1** of the LDR to Arduino **5V**.
2. Connect **Pin 2** of the LDR to Arduino **A0**.
3. Connect a 10k&Omega; resistor from **A0** to Arduino **GND**.

<p align="center">
  <img src="/images/components/openhw-photoresistor_wiring.png" alt="Wiring Diagram" style="max-width: 100%; border-radius: 8px; margin: 20px 0;" />
</p>

<TryInSimulator />

## Example Arduino Code

```cpp
const int ldrPin = A0;

void setup() {
  Serial.begin(9600);
}

void loop() {
  int lightLevel = analogRead(ldrPin);
  
  Serial.print("Ambient Light (0-1023): ");
  Serial.println(lightLevel);
  
  if (lightLevel < 300) {
    Serial.println(" --> It's getting dark!");
  }
  
  delay(250);
}
```

## Simulation Notes
- In the simulator, right-click the photoresistor to open its context menu and adjust the `lux` attribute.
- As the simulated lux level increases, a subtle visual glow will appear behind the LDR head to represent the ambient light source.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-photodiode" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: Photodiode</a>
  </div>
  <div>
    <a href="/docs/components/openhw-piezo-buzzer" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: Piezo Buzzer &rarr;</a>
  </div>
</div>
