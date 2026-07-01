---
title: "Photoresistor (LDR)"
description: "A light-dependent resistor whose resistance decreases as light intensity increases."
slug: /components/openhw-photoresistor
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Sensors">Sensors</a> &gt; 
  <span>Photoresistor (LDR)</span>
</div>

# Photoresistor (LDR)
<p class="subtitle">A passive two-terminal component (Light Dependent Resistor) used to detect light levels in the environment.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="60" height="90" viewBox="0 0 60 90" xmlns="http://www.w3.org/2000/svg">
      <circle cx="30" cy="30" r="20" fill="var(--vp-c-text-1)" stroke="#94a3b8" stroke-width="2" />
      <path d="M 15 30 Q 20 20 30 25 T 45 30" fill="none" stroke="#ef4444" stroke-width="2" />
      <path d="M 15 35 Q 20 25 30 30 T 45 35" fill="none" stroke="#ef4444" stroke-width="2" />
      <path d="M 22 50 L 22 90" stroke="#94a3b8" stroke-width="2" />
      <path d="M 38 50 L 38 90" stroke="#94a3b8" stroke-width="2" />
    </svg>
    <span style="font-size:11px;color:var(--vp-c-text-2);">LDR</span>
  </div>
  <div class="component-info">
    <p>A photoresistor (or LDR) changes its electrical resistance based on the amount of light falling on its surface. In total darkness, it has a very high resistance (often >1MΩ), while in bright light, its resistance drops significantly. It is commonly used in voltage divider circuits to measure ambient light levels.</p>
    <div>
      <span class="tag">Sensors</span>
      <span class="tag">Passive</span>
      <span class="tag">Analog</span>
    </div>
  </div>
</div>

## Overview
Because it is a passive resistor, the LDR has no polarity (it can be plugged in either way). To read it with an Arduino, you must build a **voltage divider** circuit by pairing it with a standard fixed resistor (typically 10kΩ).

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">P1</span></td><td><span class="pin-type passive">passive</span></td><td>Terminal 1. Connects to 5V (or GND).</td></tr>
<tr><td><span class="pin-name">P2</span></td><td><span class="pin-type passive">passive</span></td><td>Terminal 2. Connects to the analog pin and the pull-down resistor.</td></tr>
</table>

## Configurable Attributes
<table class="attrs-table">
<tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr>
<tr><td><strong>lux</strong></td><td><code>number</code></td><td><code>100</code></td><td>The initial simulated light intensity in lux.</td></tr>
<tr><td><strong>gamma</strong></td><td><code>number</code></td><td><code>0.7</code></td><td>Logarithmic characteristic of the LDR material.</td></tr>
<tr><td><strong>r10</strong></td><td><code>number</code></td><td><code>10000</code></td><td>Resistance (in ohms) of the LDR at 10 lux.</td></tr>
</table>

## Wiring Diagram (Voltage Divider)
1. Connect **Terminal 1** of the LDR to Arduino **5V**.
2. Connect **Terminal 2** of the LDR to Arduino **A0**.
3. Connect a **10kΩ Resistor** from Arduino **A0** to Arduino **GND**.

*(This creates a voltage divider where the voltage at A0 rises as the light gets brighter).*

## Example Arduino Code
This code reads the analog voltage from the divider circuit.

```cpp
const int ldrPin = A0;

void setup() {
  Serial.begin(9600);
  Serial.println("Starting LDR reading...");
}

void loop() {
  // Read the analog value (0-1023)
  int sensorValue = analogRead(ldrPin);
  
  Serial.print("Light Level: ");
  Serial.print(sensorValue);
  
  // Basic threshold logic
  if (sensorValue < 300) {
    Serial.println(" (Dark)");
  } else if (sensorValue < 700) {
    Serial.println(" (Moderate)");
  } else {
    Serial.println(" (Bright)");
  }
  
  delay(500);
}
```

## Simulation Notes
- You can manually change the simulated light intensity (`lux`) by right-clicking the LDR on the breadboard during simulation. 

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-nrf24l01" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: nRF24L01+ Transceiver</a>
  </div>
  <div>
    <a href="/docs/components/openhw-pir-sensor" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: PIR Motion Sensor &rarr;</a>
  </div>
</div>
