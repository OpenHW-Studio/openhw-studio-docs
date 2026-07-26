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
    <img src="/images/components/openhw-led.svg" alt="LED" style="width:65px; height:72px; max-width: 100%; max-height: 150px" />
    <span style="font-size:11px;color:var(--vp-c-text-2);">5mm LED</span>
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

<p align="center">
  <img src="/images/components/openhw-led_wiring.png" alt="Wiring Diagram" style="max-width: 100%; border-radius: 8px; margin: 20px 0;" />
</p>

<TryInSimulator />

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
