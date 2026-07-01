---
title: "Slide Switch"
description: "A simple mechanical SPDT (Single Pole Double Throw) slide switch for controlling circuit paths."
slug: /components/openhw-slide-switch
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Sensors">Sensors</a> &gt; 
  <span>Slide Switch</span>
</div>

# Slide Switch
<p class="subtitle">A mechanical switch with a sliding actuator that connects the common terminal to one of two other terminals.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="60" height="40" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="10" width="50" height="20" fill="#334155" stroke="#1e293b" stroke-width="2" />
      <rect x="15" y="15" width="30" height="10" fill="#0f172a" />
      <rect x="15" y="13" width="10" height="14" rx="2" fill="var(--vp-c-text-2)" />
      <line x1="20" y1="13" x2="20" y2="27" stroke="#cbd5e1" stroke-width="1" />
      <rect x="15" y="30" width="3" height="10" fill="var(--vp-c-text-2)" />
      <rect x="28" y="30" width="3" height="10" fill="var(--vp-c-text-2)" />
      <rect x="41" y="30" width="3" height="10" fill="var(--vp-c-text-2)" />
    </svg>
    <span style="font-size:11px;color:var(--vp-c-text-2);">Slide Switch</span>
  </div>
  <div class="component-info">
    <p>A slide switch physically connects its middle pin to either the left pin or the right pin, depending on the position of the slider. It is typically used for power switches, configuration toggles, or mode selection in projects.</p>
    <div>
      <span class="tag">Sensors</span>
      <span class="tag">Switch</span>
      <span class="tag">Mechanical</span>
    </div>
  </div>
</div>

## Overview
Unlike a momentary pushbutton which only stays connected while you press it, a slide switch is a "latching" switch. It remains in its current state until physically moved. This makes it perfect for persistent states (like ON / OFF).

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">1</span></td><td><span class="pin-type passive">passive</span></td><td>Left terminal.</td></tr>
<tr><td><span class="pin-name">2</span></td><td><span class="pin-type passive">passive</span></td><td>Common terminal (Middle).</td></tr>
<tr><td><span class="pin-name">3</span></td><td><span class="pin-type passive">passive</span></td><td>Right terminal.</td></tr>
</table>

## Configurable Attributes
<table class="attrs-table">
<tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr>
<tr><td><strong>value</strong></td><td><code>boolean</code></td><td><code>false</code></td><td>Initial state of the switch (false = left, true = right).</td></tr>
<tr><td><strong>bounce</strong></td><td><code>number</code></td><td><code>0</code></td><td>Simulated mechanical contact bounce time in milliseconds.</td></tr>
</table>

## Wiring Diagram (Arduino Uno)
To use a slide switch as a digital input:
1. Connect **Pin 1** (Left) to Arduino **5V**.
2. Connect **Pin 3** (Right) to Arduino **GND**.
3. Connect **Pin 2** (Middle) to Arduino **D3**.

*(Note: In this configuration, sliding left sends HIGH, and sliding right sends LOW. You can swap 5V and GND to reverse the logic.)*

## Example Arduino Code
This code reads the state of the slide switch and turns the built-in LED (Pin 13) on or off accordingly.

```cpp
const int switchPin = 3;
const int ledPin = 13;
bool lastSwitchState = false;

void setup() {
  Serial.begin(9600);
  pinMode(switchPin, INPUT); // Switch handles its own VCC/GND
  pinMode(ledPin, OUTPUT);
  Serial.println("Slide Switch Ready");
}

void loop() {
  bool currentSwitchState = digitalRead(switchPin);
  
  if (currentSwitchState != lastSwitchState) {
    Serial.print("Switch is now: ");
    if (currentSwitchState == HIGH) {
      Serial.println("ON");
      digitalWrite(ledPin, HIGH);
    } else {
      Serial.println("OFF");
      digitalWrite(ledPin, LOW);
    }
    lastSwitchState = currentSwitchState;
  }
  
  delay(50); // Small delay to handle debounce
}
```

## Simulation Notes
- Click the switch slider in the simulation to toggle its position.
- You can add mechanical bounce using the `bounce` attribute in `diagram.json` to test your software debouncing routines!

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-slide-potentiometer" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: Slide Potentiometer</a>
  </div>
  <div>
    <a href="/docs/components/openhw-soil-moisture-sensor" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: Soil Moisture Sensor &rarr;</a>
  </div>
</div>
