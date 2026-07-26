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
    <img src="/images/components/openhw-relay-module.svg" alt="Relay Module" style="width:72px; height:50px; max-width: 120px; max-height: 120px" />
    <span style="font-size:11px;color:var(--vp-c-text-2);">5V Relay</span>
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

## Wiring Diagram

Connect the Relay Module to the Arduino to control high-power loads safely.

<p align="center">
  <img src="/images/components/openhw-relay-module_wiring.png" alt="Wiring Diagram" style="max-width: 100%; border-radius: 8px; margin: 20px 0;" />
</p>

<TryInSimulator />

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
