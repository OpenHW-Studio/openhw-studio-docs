---
title: "RGB LED"
description: "A 4-pin LED capable of displaying any color by mixing Red, Green, and Blue light."
slug: /components/openhw-rgb-led
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Displays">Displays</a> &gt; 
  <span>RGB LED</span>
</div>

# RGB LED
<p class="subtitle">A versatile 4-pin LED that combines three separate LEDs (Red, Green, Blue) into a single package to produce millions of colors.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="60" height="90" viewBox="0 0 60 90" xmlns="http://www.w3.org/2000/svg">
      <path d="M 15 40 Q 30 10 45 40 L 45 50 L 15 50 Z" fill="#e2e8f0" opacity="0.8" />
      <rect x="15" y="47" width="30" height="5" fill="var(--vp-c-text-2)" />
      <rect x="20" y="52" width="2" height="30" fill="var(--vp-c-text-2)" />
      <rect x="26" y="52" width="2" height="38" fill="var(--vp-c-text-2)" />
      <rect x="32" y="52" width="2" height="30" fill="var(--vp-c-text-2)" />
      <rect x="38" y="52" width="2" height="30" fill="var(--vp-c-text-2)" />
    </svg>
    <span style="font-size:11px;color:var(--vp-c-text-2);">RGB LED</span>
  </div>
  <div class="component-info">
    <p>An RGB LED is essentially three separate LEDs housed in one bulb. By using PWM (Pulse Width Modulation) on the R, G, and B pins, you can independently adjust the brightness of each color channel, mixing them to create almost any color imaginable.</p>
    <div>
      <span class="tag">Displays</span>
      <span class="tag">Light</span>
      <span class="tag">PWM</span>
    </div>
  </div>
</div>

## Overview
RGB LEDs come in two internal wiring configurations:
- **Common Cathode:** All three internal LEDs share a single Ground pin (COM). You turn a color ON by sending a HIGH signal (or PWM) to its respective pin.
- **Common Anode:** All three internal LEDs share a single VCC/5V pin (COM). You turn a color ON by pulling its respective pin LOW.

*Note: You must use current-limiting resistors (usually 220Ω) on the R, G, and B pins, just like standard LEDs.*

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">R</span></td><td><span class="pin-type digital">digital</span></td><td>Red channel. Connect to a PWM pin (with resistor).</td></tr>
<tr><td><span class="pin-name">COM</span></td><td><span class="pin-type power">power</span></td><td>Common pin. Connect to GND (Cathode) or 5V (Anode).</td></tr>
<tr><td><span class="pin-name">G</span></td><td><span class="pin-type digital">digital</span></td><td>Green channel. Connect to a PWM pin (with resistor).</td></tr>
<tr><td><span class="pin-name">B</span></td><td><span class="pin-type digital">digital</span></td><td>Blue channel. Connect to a PWM pin (with resistor).</td></tr>
</table>

## Configurable Attributes
<table class="attrs-table">
<tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr>
<tr><td><strong>common</strong></td><td><code>string</code></td><td><code>"cathode"</code></td><td>Configuration of the common pin: <code>"cathode"</code> or <code>"anode"</code>.</td></tr>
</table>

## Wiring Diagram (Common Cathode)
1. Connect **COM** to Arduino **GND**.
2. Connect **R** through a 220Ω resistor to Arduino **D9** (PWM).
3. Connect **G** through a 220Ω resistor to Arduino **D10** (PWM).
4. Connect **B** through a 220Ω resistor to Arduino **D11** (PWM).

## Example Arduino Code
This code cycles through Red, Green, and Blue by writing PWM values (0-255) to a Common Cathode RGB LED.

```cpp
#define PIN_R 9
#define PIN_G 10
#define PIN_B 11

void setup() {
  pinMode(PIN_R, OUTPUT);
  pinMode(PIN_G, OUTPUT);
  pinMode(PIN_B, OUTPUT);
}

void loop() {
  // Pure Red
  setColor(255, 0, 0);
  delay(1000);
  
  // Pure Green
  setColor(0, 255, 0);
  delay(1000);
  
  // Pure Blue
  setColor(0, 0, 255);
  delay(1000);
  
  // Yellow (Red + Green)
  setColor(255, 255, 0);
  delay(1000);
}

// Helper function to set the color
void setColor(int redValue, int greenValue, int blueValue) {
  analogWrite(PIN_R, redValue);
  analogWrite(PIN_G, greenValue);
  analogWrite(PIN_B, blueValue);
}
```

## Simulation Notes
- The OpenHW Simulator fully supports PWM color mixing. Ensure you connect the R, G, and B pins to Arduino pins that have a `~` symbol (like 3, 5, 6, 9, 10, 11 on the Uno) to use `analogWrite()`.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-resistor" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: Resistor</a>
  </div>
  <div>
    <a href="/docs/components/openhw-rotary-dialer" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: Rotary Dialer &rarr;</a>
  </div>
</div>
