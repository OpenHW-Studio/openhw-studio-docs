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
    <img src="/images/components/openhw-pushbutton-6mm.svg" alt="Pushbutton (6mm)" style="width:45px; height:60px;" />
    <span style="font-size:11px;color:var(--vp-c-text-2);">Tact Switch</span>
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
<table class="attrs-table">
<tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr>
<tr><td><strong>color</strong></td><td><code>string</code></td><td><code>blue</code></td><td>Visual button cap color (e.g., `blue`, `red`, `green`, `yellow`, `white`, `black`, `orange`).</td></tr>
</table>

## Wiring Diagram

Example of connecting the Pushbutton (6mm) to an Arduino Uno using the internal pull-up resistor.

<p align="center">
  <img src="/images/components/openhw-pushbutton-6mm_wiring.png" alt="Wiring Diagram" style="max-width: 100%; border-radius: 8px; margin: 20px 0;" />
</p>

<TryInSimulator />

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
