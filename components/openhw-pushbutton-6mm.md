---
title: "Pushbutton (6mm)"
description: "A standard 6mm tactile momentary pushbutton switch."
slug: /components/openhw-pushbutton-6mm
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Sensors">Sensors</a> &gt; 
  <span>Pushbutton (6mm)</span>
</div>

# Pushbutton (6mm)
<p class="subtitle">A classic, normally-open momentary tactile switch used for user input.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="40" height="40" rx="4" fill="#1e293b" />
      <circle cx="30" cy="30" r="12" fill="#0f172a" stroke="#334155" stroke-width="2" />
      <rect x="5" y="15" width="5" height="4" fill="#cbd5e1" />
      <rect x="5" y="41" width="5" height="4" fill="#cbd5e1" />
      <rect x="50" y="15" width="5" height="4" fill="#cbd5e1" />
      <rect x="50" y="41" width="5" height="4" fill="#cbd5e1" />
    </svg>
    <span style="font-size:11px;color:#4a5568;">Tact Switch</span>
  </div>
  <div class="component-info">
    <p>The standard 6x6mm tactile switch is a momentary button. When pressed, it completes the circuit between its pins. When released, the connection is broken. It is essential for creating user interfaces, resets, and simple triggers.</p>
    <div>
      <span class="tag">Sensors</span>
      <span class="tag">Input</span>
      <span class="tag">Momentary</span>
    </div>
  </div>
</div>

## Overview
This button has 4 pins, but internally they are connected in pairs. Pins 1A and 1B are permanently connected to each other, as are pins 2A and 2B. Pressing the button bridges the gap between the '1' side and the '2' side. To avoid "floating" logic states, always use a pull-up or pull-down resistor (or use Arduino's internal `INPUT_PULLUP`).

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">1A</span></td><td><span class="pin-type passive">passive</span></td><td>Terminal 1A (connected to 1B).</td></tr>
<tr><td><span class="pin-name">1B</span></td><td><span class="pin-type passive">passive</span></td><td>Terminal 1B (connected to 1A).</td></tr>
<tr><td><span class="pin-name">2A</span></td><td><span class="pin-type passive">passive</span></td><td>Terminal 2A (connected to 2B).</td></tr>
<tr><td><span class="pin-name">2B</span></td><td><span class="pin-type passive">passive</span></td><td>Terminal 2B (connected to 2A).</td></tr>
</table>

## Configurable Attributes
*This component has no configurable attributes.*

## Wiring Diagram (Internal Pull-Up)
1. Connect **Pin 1A** to Arduino **GND**.
2. Connect **Pin 2A** to Arduino **D2**.
*(You can use either the 'A' or 'B' side).*

## Example Arduino Code
This code uses the `INPUT_PULLUP` mode, meaning the button will read `HIGH` normally, and `LOW` when pressed.

```cpp
const int buttonPin = 2;

void setup() {
  Serial.begin(9600);
  // Enable the internal pull-up resistor
  pinMode(buttonPin, INPUT_PULLUP);
}

void loop() {
  // Read the button state
  int buttonState = digitalRead(buttonPin);
  
  // Check if button is pressed (it will be LOW due to INPUT_PULLUP)
  if (buttonState == LOW) {
    Serial.println("Button is PRESSED!");
  } else {
    Serial.println("Button is RELEASED.");
  }
  
  // Add a small delay to debounce
  delay(100);
}
```

## Simulation Notes
- In the OpenHW Simulator, you can simply click the button on the breadboard to simulate a press. It acts as a momentary switch (it releases when you let go of the mouse).

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-power-supply" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: Power Supply</a>
  </div>
  <div>
    <a href="/docs/components/openhw-pushbutton" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: Pushbutton (Standard) &rarr;</a>
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
