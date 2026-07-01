---
title: "LDR Sensor Module (4-pin)"
description: "A Light Dependent Resistor module with both analog and digital outputs."
slug: /components/openhw-ldr-module
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Sensors">Sensors</a> &gt; 
  <span>LDR Sensor Module (4-pin)</span>
</div>

# LDR Sensor Module (4-pin)
<p class="subtitle">A photoresistor module with an onboard LM393 comparator, providing both an analog brightness reading and a digital threshold trigger.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="100" height="120" viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
      <rect x="25" y="20" width="50" height="70" rx="3" fill="#1e40af" stroke="#1e3a8a" stroke-width="2" />
      <circle cx="50" cy="35" r="10" fill="var(--vp-c-text-2)" stroke="#94a3b8" stroke-width="2" />
      <path d="M 43 35 C 47 30 53 40 57 35" fill="none" stroke="#dc2626" stroke-width="1.5" />
      <rect x="35" y="55" width="10" height="15" rx="1" fill="#0f172a" />
      <circle cx="65" cy="55" r="2" fill="#eab308" />
      <circle cx="65" cy="65" r="2" fill="#ef4444" />
      <rect x="35" y="90" width="5" height="10" fill="var(--vp-c-text-2)" />
      <rect x="45" y="90" width="5" height="10" fill="var(--vp-c-text-2)" />
      <rect x="55" y="90" width="5" height="10" fill="var(--vp-c-text-2)" />
      <rect x="65" y="90" width="5" height="10" fill="var(--vp-c-text-2)" />
      <text x="37.5" y="85" fill="var(--vp-c-text-1)" font-family="monospace" font-size="8" font-weight="bold" text-anchor="middle" transform="rotate(-90, 37.5, 85)">AO</text>
      <text x="47.5" y="85" fill="var(--vp-c-text-1)" font-family="monospace" font-size="8" font-weight="bold" text-anchor="middle" transform="rotate(-90, 47.5, 85)">DO</text>
      <text x="57.5" y="85" fill="var(--vp-c-text-1)" font-family="monospace" font-size="8" font-weight="bold" text-anchor="middle" transform="rotate(-90, 57.5, 85)">GND</text>
      <text x="67.5" y="85" fill="var(--vp-c-text-1)" font-family="monospace" font-size="8" font-weight="bold" text-anchor="middle" transform="rotate(-90, 67.5, 85)">VCC</text>
    </svg>
    <span style="font-size:11px;color:var(--vp-c-text-2);">LDR Module</span>
  </div>
  <div class="component-info">
    <p>This module uses a Light Dependent Resistor (LDR). Its resistance decreases as light intensity increases. The onboard LM393 comparator compares the analog voltage against a potentiometer-set threshold, driving the Digital Output (DO) HIGH when it gets dark.</p>
    <div>
      <span class="tag">Sensors</span>
      <span class="tag">Light</span>
      <span class="tag">Analog/Digital</span>
    </div>
  </div>
</div>

## Overview
Unlike a bare photoresistor, this 4-pin module provides dual outputs. The Analog Output (`AO`) gives you a varying voltage that represents ambient light intensity, while the Digital Output (`DO`) acts as a simple day/night switch. 

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">AO</span></td><td><span class="pin-type analog">analog</span></td><td>Analog Output. Outputs a voltage proportional to light intensity. Connect to A0.</td></tr>
<tr><td><span class="pin-name">DO</span></td><td><span class="pin-type digital">digital</span></td><td>Digital Output. Goes HIGH when light falls below the threshold. Connect to D4.</td></tr>
<tr><td><span class="pin-name">GND</span></td><td><span class="pin-type power">power</span></td><td>Ground. Connect to Arduino GND.</td></tr>
<tr><td><span class="pin-name">VCC</span></td><td><span class="pin-type power">power</span></td><td>Power Supply. Connect to Arduino 5V.</td></tr>
</table>

## Configurable Attributes
*This component has no standard configurable attributes.*

## Working Principle
1. **Analog**: A voltage divider is formed by the LDR and a fixed resistor. As light increases, LDR resistance drops, and `AO` voltage increases.
2. **Digital**: The LM393 chip compares `AO` with a reference voltage. When `AO` drops below the reference (indicating it is dark), the comparator flips `DO` to a HIGH state.

## Wiring Diagram
1. Connect **VCC** to 5V.
2. Connect **GND** to GND.
3. Connect **AO** to Arduino A0.
4. Connect **DO** to Arduino D4.

## Example Arduino Code
This code reads both the analog light level and the digital threshold trigger simultaneously.

```cpp
const int ldrDigitalPin = 4;
const int ldrAnalogPin = A0;

void setup() {
  Serial.begin(9600);
  pinMode(ldrDigitalPin, INPUT);
  Serial.println("LDR Sensor Ready");
}

void loop() {
  // Read both pins
  int analogVal = analogRead(ldrAnalogPin);
  int digitalVal = digitalRead(ldrDigitalPin);
  
  // Calculate a rough lux approximation (for simulation/demo purposes)
  float lux = (1023.0 - analogVal) / 1023.0 * 1000.0;
  
  Serial.print("Analog (0-1023): ");
  Serial.print(analogVal);
  Serial.print(" | Lux (Approx): ");
  Serial.print(lux, 0);
  
  // DO is HIGH when it is dark
  if (digitalVal == HIGH) {
    Serial.println(" | Status: DARK");
  } else {
    Serial.println(" | Status: LIGHT");
  }
  
  delay(500);
}
```

## Simulation Notes
- In the simulator, clicking on the LDR module brings up an interactive "Lux" slider to simulate ambient light changing.
- Sliding it to the far left (0 Lux) will trigger the `DO` pin to go HIGH.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-lcd2004" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: LCD 20x4 (Parallel)</a>
  </div>
  <div>
    <a href="/docs/components/openhw-led" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: LED &rarr;</a>
  </div>
</div>
