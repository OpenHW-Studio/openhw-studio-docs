---
title: "Raindrop Module"
description: "A sensor module for detecting rain or moisture levels."
slug: /components/openhw-raindrop-module
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Sensors">Sensors</a> &gt; 
  <span>Raindrop Module</span>
</div>

# Raindrop Module
<p class="subtitle">Detects water droplets and moisture on its sensing pad, providing both analog and digital outputs.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="60" height="90" viewBox="0 0 60 90" xmlns="http://www.w3.org/2000/svg">
      <rect x="15" y="10" width="30" height="40" rx="2" fill="#1e293b" />
      <circle cx="23" cy="20" r="3" fill="#cbd5e1" />
      <rect x="25" y="25" width="10" height="10" fill="#0f172a" />
      <rect x="18" y="50" width="4" height="10" fill="#cbd5e1" />
      <rect x="26" y="50" width="4" height="10" fill="#cbd5e1" />
      <rect x="34" y="50" width="4" height="10" fill="#cbd5e1" />
      <rect x="42" y="50" width="4" height="10" fill="#cbd5e1" />
      <path d="M 50 15 L 60 15" stroke="#475569" stroke-width="2" />
      <path d="M 50 45 L 60 45" stroke="#475569" stroke-width="2" />
    </svg>
    <span style="font-size:11px;color:#4a5568;">Rain Sensor</span>
  </div>
  <div class="component-info">
    <p>The Raindrop module consists of a control board (LM393 comparator) and a separate sensor pad. When water droplets bridge the traces on the sensor pad, the resistance drops. The control board reads this resistance and outputs both a raw analog value and a threshold-triggered digital signal.</p>
    <div>
      <span class="tag">Sensors</span>
      <span class="tag">Analog Input</span>
      <span class="tag">Water</span>
    </div>
  </div>
</div>

## Overview
Because this module provides dual outputs, you have two ways to use it:
- **Analog Output (AO):** Read an exact moisture level (0-1023). Dry is typically HIGH (1023), and very wet approaches LOW (0).
- **Digital Output (DO):** Outputs LOW when the moisture exceeds a specific threshold (adjustable via a potentiometer on the real hardware), and HIGH when dry.

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">VCC</span></td><td><span class="pin-type power">power</span></td><td>Power Supply (5V).</td></tr>
<tr><td><span class="pin-name">GND</span></td><td><span class="pin-type power">power</span></td><td>Ground.</td></tr>
<tr><td><span class="pin-name">DO</span></td><td><span class="pin-type digital">digital</span></td><td>Digital Output (LOW when rain detected, HIGH when dry).</td></tr>
<tr><td><span class="pin-name">AO</span></td><td><span class="pin-type analog">analog</span></td><td>Analog Output (Value drops as water increases).</td></tr>
<tr><td><span class="pin-name">PAD+</span></td><td><span class="pin-type analog">analog</span></td><td>Connection to the external sensing pad.</td></tr>
<tr><td><span class="pin-name">PAD-</span></td><td><span class="pin-type power">power</span></td><td>Ground connection for the external sensing pad.</td></tr>
</table>

## Configurable Attributes
<table class="attrs-table">
<tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr>
<tr><td><strong>threshold</strong></td><td><code>number</code></td><td><code>512</code></td><td>The simulated analog threshold at which the Digital Output (DO) flips from HIGH to LOW.</td></tr>
</table>

## Wiring Diagram (Arduino Uno)
1. Connect **VCC** to **5V**.
2. Connect **GND** to **GND**.
3. Connect **AO** to **A0**.
4. Connect **DO** to **D4** (Optional, if you only need analog, you can leave this disconnected).

## Example Arduino Code
This code reads both the analog level and the digital threshold trigger.

```cpp
#define RAIN_AO_PIN A0
#define RAIN_DO_PIN 4

void setup() {
  pinMode(RAIN_DO_PIN, INPUT);
  Serial.begin(9600);
  Serial.println("Raindrop Module ready.");
}

void loop() {
  int rainLevel = analogRead(RAIN_AO_PIN);
  int doVal = digitalRead(RAIN_DO_PIN);
  
  Serial.print("Analog Level (0-1023): ");
  Serial.print(rainLevel);
  
  Serial.print("\t Digital Status: ");
  // DO goes LOW when rain is detected past the threshold
  if (doVal == LOW) {
    Serial.println("RAIN DETECTED 🌧️");
  } else {
    Serial.println("Dry ☀️");
  }
  
  delay(1000);
}
```

## Simulation Notes
- In the simulator, the moisture level on the pad can often be adjusted via a right-click context menu or by interacting with the pad element directly.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-pushbutton" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: Push Button</a>
  </div>
  <div>
    <a href="/docs/components/openhw-relay-module" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: Relay Module &rarr;</a>
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
