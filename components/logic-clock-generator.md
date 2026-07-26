---
title: "Clock Generator"
description: "A logic clock generator that produces a continuous square wave at a specified frequency for synchronous digital circuits."
slug: /components/logic-clock-generator
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Logic%20Components">Logic Components</a> &gt; 
  <span>Clock Generator</span>
</div>

# Clock Generator
<p class="subtitle">A digital logic component that produces a continuous square wave (clock signal) for synchronous circuits.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <img src="/images/components/logic-clock-generator.svg" alt="Clock Generator" style="width:100px; height:80px; max-width: 100%; max-height: 150px" />
    <span style="font-size:11px;color:var(--vp-c-text-2);">Clock Generator</span>
  </div>
  <div class="component-info">
    <p>A clock generator acts as the heartbeat of synchronous digital logic circuits. It produces a continuous, oscillating square wave that oscillates between HIGH and LOW states at a configurable frequency, triggering flip-flops, counters, and microcontrollers.</p>
    <div>
      <span class="tag">Logic Components</span>
      <span class="tag">Signal Generator</span>
    </div>
  </div>
</div>

## Overview
In the OpenHW Studio simulator, the Clock Generator is an essential tool for testing sequential logic (like shift registers and counters). Unlike physical crystals or 555 timers, this component provides a perfect, instantaneous clock signal without analog rise/fall times.

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">CLK</span></td><td><span class="pin-type digital">digital</span></td><td>The square wave output signal. Connect to the clock input of sequential logic components.</td></tr>
</table>

## Configurable Attributes
<table class="attrs-table">
<tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr>
<tr><td><strong>frequency</strong></td><td><code>number</code></td><td><code>10</code></td><td>The numeric frequency of the clock signal.</td></tr>
<tr><td><strong>units</strong></td><td><code>string</code></td><td><code>"KHz"</code></td><td>The unit for the frequency (Hz, KHz, MHz).</td></tr>
</table>

## Working Principle

### Timing Diagram (1 Hz, 50% Duty Cycle)
```
     ___     ___     ___     
CLK |   |   |   |   |   |   
    |   |___|   |___|   |___
    0   1   2   3   4   5   (Time in seconds)
```

The Clock Generator continuously toggles its output pin based on the simulated time. It is driven by the simulator's internal physics loop.

## Wiring Diagram

<p align="center">
  <img src="/images/components/logic-clock-generator_wiring.png" alt="Wiring Diagram" style="max-width: 100%; border-radius: 8px; margin: 20px 0;" />
</p>

<TryInSimulator />

## Example Arduino Code
While the Clock Generator is a simulation primitive, you can simulate a similar clock signal using an Arduino to drive other physical logic chips.

```cpp
const int clkOutPin = 3; // Connect to clock input of a logic chip
const int frequencyHz = 1; 

void setup() {
  pinMode(clkOutPin, OUTPUT);
}

void loop() {
  // Generate a 1 Hz, 50% duty cycle clock signal
  int halfPeriodMs = 1000 / (frequencyHz * 2);
  
  digitalWrite(clkOutPin, HIGH);
  delay(halfPeriodMs);
  
  digitalWrite(clkOutPin, LOW);
  delay(halfPeriodMs);
}
```

## Simulation Notes
- Higher frequencies (e.g., >1000 Hz) may be subject to the simulator's frame rate limitations. For visual debugging, 1-10 Hz is recommended.
- The clock automatically begins oscillating as soon as the simulation starts.

## Notes / Warnings
- **Simulator Performance:** Setting the frequency extremely high (e.g., >1MHz) in the simulator can cause UI lag. It is better to use the "Step" function for high-frequency logic analysis.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/logic-buffer-gate" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: Buffer Gate</a>
  </div>
  <div>
    <a href="/docs/components/logic-d-flipflop" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: D Flip-Flop &rarr;</a>
  </div>
</div>
