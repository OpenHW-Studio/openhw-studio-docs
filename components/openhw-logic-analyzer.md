---
title: "8-Ch Logic Analyzer"
description: "A virtual 8-channel logic analyzer for debugging digital signals."
slug: /components/openhw-logic-analyzer
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Logic Components">Logic Components</a> &gt; 
  <span>8-Ch Logic Analyzer</span>
</div>

# 8-Ch Logic Analyzer
<p class="subtitle">A built-in diagnostic tool to visualize up to 8 digital signals simultaneously on a virtual oscilloscope interface.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="120" height="80" viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="110" height="70" rx="4" fill="#1e293b" stroke="#0f172a" stroke-width="2" />
      <rect x="15" y="15" width="90" height="40" fill="#020617" />
      <path d="M 15 25 L 30 25 L 30 15 L 45 15 L 45 25 L 60 25 L 60 15 L 75 15 L 75 25 L 90 25" fill="none" stroke="#10b981" stroke-width="2" />
      <path d="M 15 45 L 35 45 L 35 35 L 55 35 L 55 45 L 75 45 L 75 35 L 95 35" fill="none" stroke="#3b82f6" stroke-width="2" />
      <circle cx="15" cy="65" r="2" fill="#ef4444" />
      <circle cx="30" cy="65" r="2" fill="#eab308" />
      <circle cx="45" cy="65" r="2" fill="#eab308" />
      <circle cx="60" cy="65" r="2" fill="#eab308" />
      <circle cx="75" cy="65" r="2" fill="#eab308" />
      <circle cx="90" cy="65" r="2" fill="#eab308" />
      <circle cx="105" cy="65" r="2" fill="#eab308" />
    </svg>
    <span style="font-size:11px;color:#4a5568;">Logic Analyzer</span>
  </div>
  <div class="component-info">
    <p>The Logic Analyzer is not a physical part of your final circuit, but rather a powerful virtual diagnostic tool. By connecting its pins to data lines (like I2C, SPI, or PWM outputs), you can visually graph the high/low state transitions over time.</p>
    <div>
      <span class="tag">Logic Components</span>
      <span class="tag">Diagnostic</span>
      <span class="tag">Virtual</span>
    </div>
  </div>
</div>

## Overview
When a circuit isn't behaving as expected, a logic analyzer lets you "see" the invisible digital pulses. The OpenHW Studio logic analyzer supports 8 concurrent channels, perfect for debugging 8-bit shift registers or complex communication buses.

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">GND</span></td><td><span class="pin-type power">power</span></td><td>Ground reference. Connect to Arduino GND.</td></tr>
<tr><td><span class="pin-name">D0</span></td><td><span class="pin-type digital">digital</span></td><td>Channel 0 Input.</td></tr>
<tr><td><span class="pin-name">D1</span></td><td><span class="pin-type digital">digital</span></td><td>Channel 1 Input.</td></tr>
<tr><td><span class="pin-name">D2</span></td><td><span class="pin-type digital">digital</span></td><td>Channel 2 Input.</td></tr>
<tr><td><span class="pin-name">D3</span></td><td><span class="pin-type digital">digital</span></td><td>Channel 3 Input.</td></tr>
<tr><td><span class="pin-name">D4</span></td><td><span class="pin-type digital">digital</span></td><td>Channel 4 Input.</td></tr>
<tr><td><span class="pin-name">D5</span></td><td><span class="pin-type digital">digital</span></td><td>Channel 5 Input.</td></tr>
<tr><td><span class="pin-name">D6</span></td><td><span class="pin-type digital">digital</span></td><td>Channel 6 Input.</td></tr>
<tr><td><span class="pin-name">D7</span></td><td><span class="pin-type digital">digital</span></td><td>Channel 7 Input.</td></tr>
</table>

## Configurable Attributes
*This component has no standard configurable attributes.*

## Working Principle
The analyzer continuously samples the voltage on pins D0-D7. If the voltage is above a certain threshold (logic HIGH), it draws a high line. If below (logic LOW), it draws a low line. In the simulator, the timing is perfectly synchronized with the virtual clock.

## Wiring Diagram
1. Connect **GND** to your circuit's ground.
2. Connect **D0** to the data line you want to monitor (e.g., Arduino D9 for a PWM signal).
3. Connect **D1-D7** to any other signals of interest.

## Example Arduino Code
You do not write code *for* the logic analyzer. Instead, you write code for your microcontroller and use the analyzer to verify the output. For example, to verify a PWM signal:

```cpp
void setup() {
  pinMode(9, OUTPUT);
}

void loop() {
  // Generate a 25% duty cycle PWM signal on pin 9
  // Connect D0 of the Logic Analyzer to pin 9 to see the waveform!
  analogWrite(9, 64);
}
```

## Simulation Notes
- In the simulator, click on the Logic Analyzer component during runtime to open the graphical waveform viewer.
- You can zoom in and out of the timeline to measure pulse widths in milliseconds or microseconds.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-led" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: LED</a>
  </div>
  <div>
    <a href="/docs/components/openhw-max7219" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: MAX7219 Matrix &rarr;</a>
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
