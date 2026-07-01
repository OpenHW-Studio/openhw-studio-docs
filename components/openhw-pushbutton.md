---
title: "Push Button"
description: "A momentary tactile push button for providing digital input."
slug: /components/openhw-pushbutton
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Sensors">Sensors</a> &gt; 
  <span>Push Button</span>
</div>

# Push Button
<p class="subtitle">A classic 12mm momentary tactile switch for providing digital input signals to the microcontroller.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <rect x="15" y="15" width="50" height="50" rx="2" fill="#1e293b" />
      <circle cx="40" cy="40" r="16" fill="#3b82f6" stroke="#2563eb" stroke-width="2" />
      <rect x="5" y="20" width="10" height="4" fill="#cbd5e1" />
      <rect x="5" y="56" width="10" height="4" fill="#cbd5e1" />
      <rect x="65" y="20" width="10" height="4" fill="#cbd5e1" />
      <rect x="65" y="56" width="10" height="4" fill="#cbd5e1" />
    </svg>
    <span style="font-size:11px;color:#4a5568;">Tactile Button</span>
  </div>
  <div class="component-info">
    <p>A momentary tactile push button. When pressed, the circuit is closed, allowing current to flow between its terminals. When released, the connection is broken. It is fundamental for user interfaces and basic digital input.</p>
    <div>
      <span class="tag">Sensors</span>
      <span class="tag">Digital Input</span>
      <span class="tag">Switch</span>
    </div>
  </div>
</div>

## Overview
Push buttons are fundamental input devices. This standard 4-pin tactile switch has two pairs of connected legs. 
- Legs on the same side (e.g., Top Left and Top Right) are permanently connected internally. 
- Legs across from each other (e.g., Top and Bottom) are disconnected until the button is pressed.

### Pull-Up vs Pull-Down
To use a button reliably with a microcontroller, the input pin must not "float". It must be explicitly pulled HIGH or LOW when the button is not pressed.
- **Active-LOW (Recommended):** Connect the button between the digital pin and Ground (GND). Enable the internal pull-up resistor using `pinMode(pin, INPUT_PULLUP)`. The pin reads `HIGH` when idle, and `LOW` when pressed.
- **Active-HIGH:** Connect the button between the digital pin and 5V, and add a 10kΩ external pull-down resistor from the digital pin to Ground. The pin reads `LOW` when idle, and `HIGH` when pressed.

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">1L</span></td><td><span class="pin-type passive">passive</span></td><td>Terminal 1 Left. Connected to 1R internally.</td></tr>
<tr><td><span class="pin-name">2L</span></td><td><span class="pin-type passive">passive</span></td><td>Terminal 2 Left. Connected to 2R internally.</td></tr>
<tr><td><span class="pin-name">1R</span></td><td><span class="pin-type passive">passive</span></td><td>Terminal 1 Right. Connected to 1L internally.</td></tr>
<tr><td><span class="pin-name">2R</span></td><td><span class="pin-type passive">passive</span></td><td>Terminal 2 Right. Connected to 2L internally.</td></tr>
</table>

## Configurable Attributes
<table class="attrs-table">
<tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr>
<tr><td><strong>color</strong></td><td><code>string</code></td><td><code>green</code></td><td>Visual button cap color (e.g., `red`, `blue`, `green`, `yellow`, `black`).</td></tr>
</table>

## Wiring Diagram (Active-LOW with Internal Pull-Up)
1. Connect **Pin 1L** to Arduino **GND**.
2. Connect **Pin 2L** to Arduino **D2**.

## Example Arduino Code
This example demonstrates the recommended Active-LOW wiring using the internal pull-up resistor. No external resistors are required.

```cpp
const int buttonPin = 2;

void setup() {
  Serial.begin(9600);
  
  // Enable internal pull-up resistor. 
  // Pin will be HIGH when button is NOT pressed.
  pinMode(buttonPin, INPUT_PULLUP);
  
  Serial.println("Push Button Ready");
}

void loop() {
  // Read the button state
  int buttonState = digitalRead(buttonPin);
  
  // Since we use INPUT_PULLUP, LOW means the button is pressed
  if (buttonState == LOW) {
    Serial.println("Button is PRESSED!");
  } else {
    Serial.println("Button is released.");
  }
  
  delay(100);
}
```

## Simulation Notes
- In the OpenHW Simulator, you can simply click the button on the canvas while the simulation is running to toggle the signal and observe the input behavior immediately.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-pushbutton-6mm" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: Pushbutton (6mm)</a>
  </div>
  <div>
    <a href="/docs/components/openhw-raindrop-module" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: Raindrop Module &rarr;</a>
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
