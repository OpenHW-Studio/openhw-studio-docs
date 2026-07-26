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
    <img src="/images/components/openhw-logic-analyzer.svg" alt="8-Ch Logic Analyzer" style="width:150px; height:90px; max-width: 150px; max-height: 90px" />
    <span style="font-size:11px;color:var(--vp-c-text-2);">Logic Analyzer</span>
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

<p align="center">
  <img src="/images/components/openhw-logic-analyzer_wiring.png" alt="Wiring Diagram" style="max-width: 100%; border-radius: 8px; margin: 20px 0;" />
</p>

<TryInSimulator />

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
