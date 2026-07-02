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
    <img src="/images/components/openhw-pushbutton.svg" alt="Push Button" style="width:75px; height:60px;" />
    <span style="font-size:11px;color:var(--vp-c-text-2);">Tactile Button</span>
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

## Wiring Diagram

Example of connecting the Push Button (Active-LOW) to an Arduino Uno.

<p align="center">
  <img src="/images/components/openhw-pushbutton_wiring.png" alt="Wiring Diagram" style="max-width: 100%; border-radius: 8px; margin: 20px 0;" />
</p>

<TryInSimulator />

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
