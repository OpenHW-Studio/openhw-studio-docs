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
    <svg width="80" height="40" viewBox="0 0 80 40" xmlns="http://www.w3.org/2000/svg">
      <path d="M 5 20 L 25 20" stroke="#94a3b8" stroke-width="2" />
      <path d="M 55 20 L 75 20" stroke="#94a3b8" stroke-width="2" />
      <rect x="25" y="10" width="30" height="20" rx="3" fill="#fcd34d" />
      <rect x="28" y="10" width="3" height="20" fill="#ef4444" />
      <rect x="34" y="10" width="3" height="20" fill="#ef4444" />
      <rect x="40" y="10" width="3" height="20" fill="#78350f" />
      <rect x="48" y="10" width="3" height="20" fill="#ca8a04" />
    </svg>
    <span style="font-size:11px;color:#4a5568;">Resistor (220Ω)</span>
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
A resistor is usually placed in series with the component it is protecting.
1. Connect Arduino **D2** to Resistor **Terminal 1**.
2. Connect Resistor **Terminal 2** to the Anode (long leg) of an **LED**.
3. Connect the Cathode (short leg) of the **LED** to **GND**.

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
