---
title: "Power Supply"
description: "A standalone regulated DC power supply component."
slug: /components/openhw-power-supply
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Power Components">Power Components</a> &gt; 
  <span>Power Supply</span>
</div>

# Power Supply
<p class="subtitle">Provides a stable regulated DC voltage to the circuit with a configurable output (3.3V, 5V, or custom).</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="80" height="60" viewBox="0 0 80 60" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="70" height="50" rx="4" fill="#cbd5e1" stroke="#94a3b8" stroke-width="2" />
      <rect x="15" y="15" width="50" height="20" rx="2" fill="#0f172a" />
      <text x="40" y="29" fill="#22c55e" font-family="monospace" font-size="12" text-anchor="middle">5.00V</text>
      <circle cx="25" cy="45" r="4" fill="#ef4444" />
      <text x="25" y="55" fill="#ef4444" font-family="monospace" font-size="8" text-anchor="middle">+</text>
      <circle cx="55" cy="45" r="4" fill="#1e293b" />
      <text x="55" y="55" fill="#1e293b" font-family="monospace" font-size="8" text-anchor="middle">-</text>
    </svg>
    <span style="font-size:11px;color:#4a5568;">Bench Power Supply</span>
  </div>
  <div class="component-info">
    <p>A standalone regulated DC power supply component. Use it to power components (sensors, displays, motors) that need a dedicated voltage rail independent of the Arduino. The output voltage is configurable via the component attributes.</p>
    <div>
      <span class="tag">Power Components</span>
      <span class="tag">DC</span>
      <span class="tag">Voltage</span>
    </div>
  </div>
</div>

## Overview
A dedicated power supply is necessary when simulating components that draw more current than the Arduino can safely provide (such as motors and relays), or components that require a different voltage level (like 12V or 3.3V).

### Typical Use Cases
- **3.3V**: ESP-series modules, modern sensors, logic level translation.
- **5.0V**: Servo motors, NeoPixels, relay modules, most Arduino shields.
- **12.0V**: DC motors, solenoids, LED strips (non-addressable).

> [!CAUTION]
> **Common Ground:** Always share a common GND between the Power Supply and the Arduino. If they do not share the same ground potential, the circuit signals will be meaningless and the circuit will behave unpredictably.

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">5V</span></td><td><span class="pin-type power">power</span></td><td>Positive voltage output (configurable value, despite the "5V" name).</td></tr>
<tr><td><span class="pin-name">GND</span></td><td><span class="pin-type power">power</span></td><td>Ground reference.</td></tr>
</table>

## Configurable Attributes
<table class="attrs-table">
<tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr>
<tr><td><strong>voltage</strong></td><td><code>number</code></td><td><code>5.0</code></td><td>The output voltage of the supply (e.g., 3.3, 5, 12).</td></tr>
</table>

## Wiring Diagram
1. Connect **GND** to the Arduino **GND** and your circuit's ground rail.
2. Connect **5V** to your external component's VCC/VIN pin.

## Example Arduino Code
A power supply does not require code to function, as it is a passive power source. Your code must simply account for the fact that external components are powered independently.

```cpp
void setup() {
  // A standalone power supply requires no Arduino initialization.
  Serial.begin(9600);
  Serial.println("Circuit powered up.");
}

void loop() {
  // External components powered by this supply can be controlled normally.
}
```

## Simulation Notes
- In the simulator, the text display on the component will update to reflect the `voltage` attribute you set in `diagram.json`.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-potentiometer" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: Rotary Potentiometer</a>
  </div>
  <div>
    <a href="/docs/components/openhw-pushbutton-6mm" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: Pushbutton (6mm) &rarr;</a>
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
