---
title: "DPDT Relay"
description: "A Double Pole Double Throw (DPDT) electromechanical relay."
slug: /components/openhw-ks2e-m-dc5
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Actuators">Actuators</a> &gt; 
  <span>DPDT Relay</span>
</div>

# DPDT Relay
<p class="subtitle">A Double Pole Double Throw (DPDT) electromechanical switch for controlling high-power circuits using a low-power control signal.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <rect x="25" y="30" width="70" height="60" rx="4" fill="#fbbf24" stroke="#b45309" stroke-width="2" />
      <text x="60" y="55" fill="#78350f" font-family="monospace" font-size="10" font-weight="bold" text-anchor="middle">RELAY</text>
      <text x="60" y="75" fill="#78350f" font-family="monospace" font-size="8" font-weight="bold" text-anchor="middle">DPDT 5V</text>
      <circle cx="35" cy="40" r="3" fill="#b45309" />
      <circle cx="85" cy="40" r="3" fill="#b45309" />
      <circle cx="35" cy="80" r="3" fill="#b45309" />
      <circle cx="85" cy="80" r="3" fill="#b45309" />
      <circle cx="50" cy="80" r="3" fill="#b45309" />
      <circle cx="70" cy="80" r="3" fill="#b45309" />
      <circle cx="50" cy="40" r="3" fill="#b45309" />
      <circle cx="70" cy="40" r="3" fill="#b45309" />
    </svg>
    <span style="font-size:11px;color:var(--vp-c-text-2);">DPDT Relay</span>
  </div>
  <div class="component-info">
    <p>This is a standard 5V DPDT relay (like the KS2E-M-DC5). When the coil is energized, an electromagnet pulls two internal mechanical switches, allowing you to route two separate electrical signals simultaneously.</p>
    <div>
      <span class="tag">Actuators</span>
      <span class="tag">Electromechanical</span>
      <span class="tag">Switch</span>
    </div>
  </div>
</div>

## Overview
A relay is a switch operated by an electromagnet. Because the control circuit (the coil) is physically isolated from the switched circuit (the poles), it is perfectly safe to use a 5V Arduino to switch much higher voltages.

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">COIL1</span></td><td><span class="pin-type input">input</span></td><td>Relay Coil Terminal 1.</td></tr>
<tr><td><span class="pin-name">COIL2</span></td><td><span class="pin-type input">input</span></td><td>Relay Coil Terminal 2. Provide 5V across COIL1/2 to switch the relay.</td></tr>
<tr><td><span class="pin-name">P1</span></td><td><span class="pin-type passive">passive</span></td><td>Pole 1 (Common 1).</td></tr>
<tr><td><span class="pin-name">NC1</span></td><td><span class="pin-type passive">passive</span></td><td>Normally Closed 1. Connected to P1 when coil is OFF.</td></tr>
<tr><td><span class="pin-name">NO1</span></td><td><span class="pin-type passive">passive</span></td><td>Normally Open 1. Connected to P1 when coil is ON.</td></tr>
<tr><td><span class="pin-name">P2</span></td><td><span class="pin-type passive">passive</span></td><td>Pole 2 (Common 2).</td></tr>
<tr><td><span class="pin-name">NC2</span></td><td><span class="pin-type passive">passive</span></td><td>Normally Closed 2. Connected to P2 when coil is OFF.</td></tr>
<tr><td><span class="pin-name">NO2</span></td><td><span class="pin-type passive">passive</span></td><td>Normally Open 2. Connected to P2 when coil is ON.</td></tr>
</table>

## Configurable Attributes
<table class="attrs-table">
<tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr>
<tr><td><strong>energised</strong></td><td><code>boolean</code></td><td><code>false</code></td><td>The initial state of the relay (whether the coil starts energized).</td></tr>
</table>

## Working Principle
When a sufficient voltage difference (usually 5V) is applied across the `COIL1` and `COIL2` pins, the electromagnet engages. 
- The `P1` switch moves from `NC1` to `NO1`.
- The `P2` switch moves from `NC2` to `NO2`.

## Wiring Diagram (via Transistor)
> [!WARNING]
> **Do not power relay coils directly from Arduino digital pins.** Relays draw more current than an Arduino pin can supply and cause flyback voltage spikes. Always use a transistor (like a 2N2222) and a flyback diode.

1. Connect **COIL1** to Arduino 5V.
2. Connect **COIL2** to the Collector of an NPN Transistor.
3. Connect the Emitter of the Transistor to Ground.
4. Connect the Base of the Transistor to an Arduino Digital Pin (via a 1k resistor).
5. Add a Diode in reverse across COIL1 and COIL2.

## Example Arduino Code
This code simply turns the relay on and off every second (assuming you wired a transistor to pin 8).

```cpp
const int RELAY_CTRL_PIN = 8;

void setup() {
  pinMode(RELAY_CTRL_PIN, OUTPUT);
}

void loop() {
  // Energize the relay coil
  digitalWrite(RELAY_CTRL_PIN, HIGH);
  delay(1000);
  
  // De-energize the relay coil
  digitalWrite(RELAY_CTRL_PIN, LOW);
  delay(1000);
}
```

## Simulation Notes
- The simulator mimics the internal mechanical switching. If you wire an LED to the `NO` (Normally Open) pin, it will only light up when the relay is energized.
- Unlike real life, the simulator won't literally destroy your virtual Arduino if you forget the flyback diode, but it's good practice to wire circuits correctly!

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-ir-remote" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: IR Remote</a>
  </div>
  <div>
    <a href="/docs/components/openhw-l293d" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: L293D Motor Driver &rarr;</a>
  </div>
</div>
