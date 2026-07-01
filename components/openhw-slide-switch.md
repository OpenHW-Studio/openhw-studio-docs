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
      <rect x="15" y="13" width="10" height="14" rx="2" fill="#94a3b8" />
      <line x1="20" y1="13" x2="20" y2="27" stroke="#cbd5e1" stroke-width="1" />
      <rect x="15" y="30" width="3" height="10" fill="#94a3b8" />
      <rect x="28" y="30" width="3" height="10" fill="#94a3b8" />
      <rect x="41" y="30" width="3" height="10" fill="#94a3b8" />
    </svg>
    <span style="font-size:11px;color:#4a5568;">Slide Switch</span>
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

<style>
/* Base overrides for VitePress layout */
.custom-breadcrumb { margin-bottom: 2rem; font-size: 0.9rem; color: var(--vp-c-text-2); }
.custom-breadcrumb a { color: var(--vp-c-brand); text-decoration: none; }
.custom-breadcrumb a:hover { text-decoration: underline; }
.custom-breadcrumb span { color: var(--vp-c-text-1); font-weight: 600; }
h1 { font-size: 36px !important; font-weight: 800 !important; color: var(--vp-c-text-1) !important; margin-bottom: 8px !important; }
.subtitle { font-size: 16px; color: #718096; margin-bottom: 36px; border-bottom: 1px solid var(--vp-c-divider); padding-bottom: 24px; }
.component-preview { display: flex; gap: 40px; align-items: flex-start; margin-bottom: 40px; background: #1a1f2e; border: 1px solid #2d3748; border-radius: 12px; padding: 32px; }
.component-svg-wrap { flex-shrink: 0; display: flex; flex-direction: column; align-items: center; gap: 12px; }
.component-info p { color: #a0aec0; font-size: 15px; margin-bottom: 16px; line-height: 1.7; }
.tag { display: inline-block; background: #1a2035; border: 1px solid #2d4a8a; color: #63b3ed; padding: 3px 10px; border-radius: 20px; font-size: 12px; margin-right: 6px; margin-bottom: 6px; }
.pin-table, .attrs-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px; }
.pin-table th, .attrs-table th { background: #1a1f2e; color: #63b3ed; padding: 10px 14px; text-align: left; border: 1px solid #2d3748; }
.pin-table td, .attrs-table td { padding: 10px 14px; border: 1px solid #2d3748; color: #a0aec0; }
.pin-table tr:nth-child(even) td, .attrs-table tr:nth-child(even) td { background: #141824; }
.pin-name { font-family: monospace; color: #68d391; font-weight: 600; }
.pin-type { font-size: 11px; padding: 2px 8px; border-radius: 10px; font-weight: 600; text-transform: none; }
.pin-type.power { background: #3d0000; color: #f56565; }
.pin-type.digital { background: #1a365d; color: #63b3ed; }
.pin-type.passive { background: #4a4a4a; color: #a0aec0; }
.pin-type.input { background: #1c3d27; color: #68d391; }
.pin-type.analog { background: #4a3a1a; color: #f6ad55; }
.pin-type.default { background: #2d3748; color: #a0aec0; }
.circuit-preview { background: #0d1117; border: 1px solid #2d3748; border-radius: 8px; padding: 20px; margin-top: 16px; display: flex; align-items: center; justify-content: center; min-height: 140px; }
:root { --vp-c-bg: #0f1117; }
@media (max-width: 640px) { .component-preview { flex-direction: column; align-items: center; } }
</style>
