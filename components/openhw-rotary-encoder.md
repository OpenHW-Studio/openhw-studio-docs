---
title: "Rotary Encoder"
description: "An electro-mechanical device that converts the angular position or motion of a shaft to digital output signals."
slug: /components/openhw-rotary-encoder
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Sensors">Sensors</a> &gt; 
  <span>Rotary Encoder</span>
</div>

# Rotary Encoder
<p class="subtitle">An incremental rotary encoder that outputs digital pulses as it is turned, often featuring a built-in pushbutton.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="60" height="90" viewBox="0 0 60 90" xmlns="http://www.w3.org/2000/svg">
      <rect x="15" y="10" width="30" height="35" rx="4" fill="#1e293b" />
      <circle cx="30" cy="27" r="10" fill="#0f172a" stroke="#475569" stroke-width="2" />
      <path d="M 30 17 L 30 27" stroke="#cbd5e1" stroke-width="2" />
      <rect x="18" y="45" width="4" height="15" fill="#cbd5e1" />
      <rect x="24" y="45" width="4" height="15" fill="#cbd5e1" />
      <rect x="30" y="45" width="4" height="15" fill="#cbd5e1" />
      <rect x="36" y="45" width="4" height="15" fill="#cbd5e1" />
      <rect x="42" y="45" width="4" height="15" fill="#cbd5e1" />
      <text x="30" y="70" fill="#94a3b8" font-family="monospace" font-size="8" text-anchor="middle">KY-040</text>
    </svg>
    <span style="font-size:11px;color:#4a5568;">Encoder Module</span>
  </div>
  <div class="component-info">
    <p>Unlike a potentiometer, a rotary encoder has no end stops and can spin infinitely. As it spins, it outputs two digital square waves (CLK and DT) that are out of phase. By comparing these two signals, a microcontroller can determine both the speed and direction of rotation. It also includes a momentary pushbutton on the shaft.</p>
    <div>
      <span class="tag">Sensors</span>
      <span class="tag">Digital Input</span>
      <span class="tag">Rotation</span>
    </div>
  </div>
</div>

## Overview
The most common rotary encoder module for Arduino is the KY-040. It provides three main signals:
- **CLK (Clock):** Generates a pulse every time the knob clicks to a new position.
- **DT (Data):** Generates a similar pulse, but shifted in time. The phase difference between CLK and DT tells you the direction (clockwise vs counter-clockwise).
- **SW (Switch):** An active-low digital output from the built-in pushbutton (activated by pressing down on the knob).

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">CLK</span></td><td><span class="pin-type digital">digital</span></td><td>Clock pulse output. Connect to an Arduino digital pin.</td></tr>
<tr><td><span class="pin-name">DT</span></td><td><span class="pin-type digital">digital</span></td><td>Direction output. Connect to an Arduino digital pin.</td></tr>
<tr><td><span class="pin-name">SW</span></td><td><span class="pin-type digital">digital</span></td><td>Pushbutton switch (active LOW). Connect to an Arduino digital pin.</td></tr>
<tr><td><span class="pin-name">VCC</span></td><td><span class="pin-type power">power</span></td><td>Power Supply (5V).</td></tr>
<tr><td><span class="pin-name">GND</span></td><td><span class="pin-type power">power</span></td><td>Ground.</td></tr>
</table>

## Configurable Attributes
*This component has no configurable attributes.*

## Wiring Diagram (Arduino Uno)
1. Connect **VCC** to **5V**.
2. Connect **GND** to **GND**.
3. Connect **CLK** to **D2**.
4. Connect **DT** to **D3**.
5. Connect **SW** to **D4**.

## Example Arduino Code
This basic polling example checks the state of the CLK and DT pins to determine rotation, and reads the pushbutton.

```cpp
const int clkPin = 2;
const int dtPin = 3;
const int swPin = 4;

int lastClk = HIGH;

void setup() {
  pinMode(clkPin, INPUT_PULLUP);
  pinMode(dtPin, INPUT_PULLUP);
  pinMode(swPin, INPUT_PULLUP);
  
  Serial.begin(9600);
  Serial.println("Rotary Encoder Ready.");
}

void loop() {
  // Read current CLK state
  int currentClk = digitalRead(clkPin);
  
  // If CLK has changed, a rotation occurred
  if (currentClk != lastClk && currentClk == LOW) {
    // Check DT to determine direction
    if (digitalRead(dtPin) != currentClk) {
      Serial.println("Rotated Clockwise ↻");
    } else {
      Serial.println("Rotated Counter-Clockwise ↺");
    }
  }
  
  lastClk = currentClk; // Save state
  
  // Check if button is pressed
  if (digitalRead(swPin) == LOW) {
    Serial.println("Button PRESSED!");
    delay(200); // Debounce
  }
}
```

## Simulation Notes
- In the simulator, you can interact with the encoder by hovering over it and using the mouse scroll wheel, or by using the provided UI buttons/slider. Clicking the knob simulates pressing the SW button.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-rgb-led" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: RGB LED</a>
  </div>
  <div>
    <a href="/docs/components/openhw-sd-card" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: SD Card Module &rarr;</a>
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
