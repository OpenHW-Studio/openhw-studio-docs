---
title: "Resistor"
description: "A passive two-terminal electrical component that implements electrical resistance as a circuit element."
slug: /components/openhw-resistor
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Power Components">Power Components</a> &gt; 
  <span>Resistor</span>
</div>

# Resistor
<p class="subtitle">A fundamental passive component that limits electrical current flow and acts to divide voltages.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <img src="/images/components/openhw-resistor.svg" alt="Resistor" style="width:60px; height:15px; margin: 20px 0; transform: scale(2);" />
    <span style="font-size:11px;color:var(--vp-c-text-2);">Resistor (220Ω)</span>
  </div>
  <div class="component-info">
    <p>A resistor is a passive two-terminal component that opposes electrical current. It is described by Ohm's Law (V = I × R). It is essential for protecting sensitive components like LEDs from receiving too much current, and for pulling digital lines high or low to prevent floating states.</p>
    <div>
      <span class="tag">Power Components</span>
      <span class="tag">Passive</span>
      <span class="tag">Basic</span>
    </div>
  </div>
</div>

## Overview
Resistors are the most common component in electronic circuits. They are non-polarized, meaning you can plug them in in either direction.

### Common Values
- **220 Ω or 330 Ω**: Current-limiting for a standard 5V LED (≈10-15 mA).
- **1 kΩ**: Pull-up / pull-down for some digital inputs, base resistors for transistors.
- **10 kΩ**: Standard high-impedance pull-up for buttons, I2C lines, and sensors.

### LED Current-Limiting Formula
To calculate the ideal resistor for an LED, use Ohm's Law:
`R = (Vsupply - Vforward) / I_desired`

*Example (Red LED at 5V, wanting 20 mA):*
`R = (5V - 2V) / 0.02A = 150 Ω → use 220 Ω (next standard value)`

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">p1</span></td><td><span class="pin-type passive">passive</span></td><td>Terminal 1 (Polarity independent).</td></tr>
<tr><td><span class="pin-name">p2</span></td><td><span class="pin-type passive">passive</span></td><td>Terminal 2 (Polarity independent).</td></tr>
</table>

## Configurable Attributes
<table class="attrs-table">
<tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr>
<tr><td><strong>value</strong></td><td><code>string</code></td><td><code>"220"</code></td><td>Resistance value in Ohms (e.g., "1k" or "10k" can also be used depending on simulator support).</td></tr>
</table>

## Wiring Diagram

Example of connecting a Resistor in series to limit current for an LED.

<p align="center">
  <img src="/images/components/openhw-resistor_wiring.png" alt="Wiring Diagram" style="max-width: 100%; border-radius: 8px; margin: 20px 0;" />
</p>

<TryInSimulator />

## Example Arduino Code
Because a resistor is a passive physical component, it requires no specific code. It works entirely within the hardware domain.

```cpp
void setup() {
  // A resistor requires no code initialization.
}

void loop() {
  // The resistor limits current passively in the background.
}
```

## Simulation Notes
- In OpenHW Studio, right-click the resistor on the canvas during simulation to open the context menu and change the resistance value in real time. The color bands on the resistor graphic will update automatically!

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-relay-module" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: Relay Module</a>
  </div>
  <div>
    <a href="/docs/components/openhw-rgb-led" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: RGB LED &rarr;</a>
  </div>
</div>
