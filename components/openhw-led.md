---
title: "LED"
description: "A standard light-emitting diode. Emits light when current flows through it."
slug: /components/openhw-led
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Displays">Displays</a> &gt; 
  <span>LED</span>
</div>

# LED
<p class="subtitle">A basic Light Emitting Diode used as a visual indicator in electronic circuits.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="60" height="120" viewBox="0 0 60 120" xmlns="http://www.w3.org/2000/svg">
      <path d="M 15 45 Q 15 15 30 15 Q 45 15 45 45 L 45 55 L 15 55 Z" fill="#ef4444" opacity="0.8" />
      <rect x="13" y="55" width="34" height="5" rx="2" fill="#dc2626" />
      <rect x="22" y="60" width="2" height="40" fill="#94a3b8" />
      <rect x="36" y="60" width="2" height="50" fill="#94a3b8" />
      <path d="M 28 55 L 28 35 L 23 35 L 28 35 Z" fill="#94a3b8" stroke="#cbd5e1" stroke-width="1" />
      <path d="M 32 55 L 32 40 Z" fill="none" stroke="#cbd5e1" stroke-width="2" />
    </svg>
    <span style="font-size:11px;color:#4a5568;">5mm LED</span>
  </div>
  <div class="component-info">
    <p>A standard light-emitting diode (LED). It emits light when sufficient current flows from the Anode to the Cathode. The color can be configured in the component attributes. <b>Always use a current-limiting resistor</b> (typically 220Ω for 5V) in series to prevent damage to the component.</p>
    <div>
      <span class="tag">Displays</span>
      <span class="tag">Visual</span>
      <span class="tag">Diode</span>
    </div>
  </div>
</div>

## Overview
LEDs are polarized components, meaning they only allow current to flow in one direction. The long leg is the **Anode** (positive), and the short leg is the **Cathode** (negative). If you connect them backwards, the LED will not light up.

### Current Limiting
Unlike incandescent bulbs, LEDs have very little internal resistance once they turn on. If connected directly to a 5V power source, they will draw too much current and burn out. You must always place a resistor in series with the LED. A **220 Ω or 330 Ω resistor** is standard for 5V circuits.

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">A</span></td><td><span class="pin-type input">input</span></td><td>Anode (+). The longer leg. Connect through a resistor to a digital output pin or VCC.</td></tr>
<tr><td><span class="pin-name">K</span></td><td><span class="pin-type input">input</span></td><td>Cathode (-). The shorter leg. Connect to Ground (GND).</td></tr>
</table>

## Configurable Attributes
<table class="attrs-table">
<tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr>
<tr><td><strong>color</strong></td><td><code>string</code></td><td><code>red</code></td><td>The color of the LED (`red`, `green`, `blue`, `yellow`, `white`, `orange`, `purple`).</td></tr>
</table>

> [!TIP]
> **Simulator Tip:** Use `analogWrite(pin, value)` on a PWM-capable pin (e.g., pins 3, 5, 6, 9, 10, 11 on the Arduino Uno) to control the brightness of the LED smoothly between 0 and 255.

## Wiring Diagram
1. Connect the **Cathode (K)** directly to Arduino GND.
2. Connect one end of a **220Ω Resistor** to the **Anode (A)**.
3. Connect the other end of the resistor to **Arduino D13**.

## Example Arduino Code
This classic "Blink" example demonstrates how to turn an LED on and off by setting a digital pin `HIGH` and `LOW`.

```cpp
// Define the pin the LED is connected to
const int ledPin = 13;

void setup() {
  // Configure the pin as an output
  pinMode(ledPin, OUTPUT);
}

void loop() {
  digitalWrite(ledPin, HIGH);  // Turn the LED on
  delay(1000);                 // Wait for 1 second
  
  digitalWrite(ledPin, LOW);   // Turn the LED off
  delay(1000);                 // Wait for 1 second
}
```

## Simulation Notes
- The LED will appear instantly "blown" (shattered icon) if you apply 5V across it without a resistor in the simulator.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-ldr-module" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: LDR Module</a>
  </div>
  <div>
    <a href="/docs/components/openhw-logic-analyzer" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: Logic Analyzer &rarr;</a>
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
