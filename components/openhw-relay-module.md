---
title: "Relay Module"
description: "An electrically operated switch used to control high-power circuits with a low-power signal."
slug: /components/openhw-relay-module
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Actuators">Actuators</a> &gt; 
  <span>Relay Module</span>
</div>

# Relay Module
<p class="subtitle">An electrically controlled mechanical switch that allows an Arduino to safely control high-power loads like motors and lights.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="60" height="60" rx="4" fill="#0f172a" stroke="#334155" stroke-width="2" />
      <rect x="15" y="15" width="30" height="40" fill="#3b82f6" />
      <rect x="50" y="20" width="15" height="15" fill="#1e293b" />
      <rect x="50" y="45" width="15" height="15" fill="#1e293b" />
      <circle cx="20" cy="70" r="3" fill="#cbd5e1" />
      <circle cx="30" cy="70" r="3" fill="#cbd5e1" />
      <circle cx="40" cy="70" r="3" fill="#cbd5e1" />
      <text x="30" y="40" fill="#f8fafc" font-family="monospace" font-size="8" text-anchor="middle">RELAY</text>
    </svg>
    <span style="font-size:11px;color:#4a5568;">5V Relay</span>
  </div>
  <div class="component-info">
    <p>The relay module acts as an electrically controlled switch. It contains a coil that, when energized, magnetically pulls a switch contact. This completely isolates the low-power Arduino circuitry from the high-power load circuit.</p>
    <div>
      <span class="tag">Actuators</span>
      <span class="tag">Switch</span>
      <span class="tag">Isolation</span>
    </div>
  </div>
</div>

## Overview
A relay has two sides:
- **Low Power Side (Input):** Connected to the Arduino. It takes a small 5V logic signal to energize the coil.
- **High Power Side (Output):** Connected to the load (e.g., a lamp or motor). It acts as a mechanical switch capable of handling high voltage/current (like 250VAC at 10A).

By default, many relay modules are **Active LOW**, meaning the relay energizes (turns ON) when the IN pin is pulled to GND (LOW).

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">VCC</span></td><td><span class="pin-type power">power</span></td><td>Relay coil power. Connect to 5V.</td></tr>
<tr><td><span class="pin-name">GND</span></td><td><span class="pin-type power">power</span></td><td>Ground. Connect to Arduino GND.</td></tr>
<tr><td><span class="pin-name">IN</span></td><td><span class="pin-type digital">digital</span></td><td>Control signal. Connect to Arduino digital pin.</td></tr>
<tr><td><span class="pin-name">NC</span></td><td><span class="pin-type passive">passive</span></td><td>Normally Closed. Connected to COM when relay is OFF.</td></tr>
<tr><td><span class="pin-name">COM</span></td><td><span class="pin-type passive">passive</span></td><td>Common terminal. Power source for the load connects here.</td></tr>
<tr><td><span class="pin-name">NO</span></td><td><span class="pin-type passive">passive</span></td><td>Normally Open. Connected to COM when relay is ON.</td></tr>
</table>

## Configurable Attributes
<table class="attrs-table">
<tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr>
<tr><td><strong>triggerLevel</strong></td><td><code>string</code></td><td><code>"low"</code></td><td>Set to <code>"low"</code> for Active-LOW, or <code>"high"</code> for Active-HIGH trigger.</td></tr>
<tr><td><strong>state</strong></td><td><code>string</code></td><td><code>"off"</code></td><td>Initial simulated mechanical state (<code>"off"</code> or <code>"on"</code>).</td></tr>
</table>

## Wiring Diagram (Load Control)
1. Connect **VCC** to **5V**.
2. Connect **GND** to **GND**.
3. Connect **IN** to **D7**.
4. Connect an external power source to the **COM** terminal.
5. Connect your device (e.g. motor) to the **NO** terminal. 

## Example Arduino Code
This code assumes an Active-LOW relay module.

```cpp
const int relayPin = 7;

void setup() {
  pinMode(relayPin, OUTPUT);
  // Active LOW: HIGH = relay OFF (safe default on startup)
  digitalWrite(relayPin, HIGH);
}

void loop() {
  // Turn Relay ON
  digitalWrite(relayPin, LOW);
  delay(2000);
  
  // Turn Relay OFF
  digitalWrite(relayPin, HIGH);
  delay(2000);
}
```

## Simulation Notes
- In OpenHW Studio, right-click the relay during simulation to toggle between Active LOW and Active HIGH trigger modes dynamically.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-raindrop-module" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: Raindrop Module</a>
  </div>
  <div>
    <a href="/docs/components/openhw-resistor" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: Resistor &rarr;</a>
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
