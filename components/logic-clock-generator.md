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
    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <rect x="25" y="25" width="70" height="70" rx="8" fill="#1e293b" stroke="#334155" stroke-width="3" />
      <path d="M 40,65 L 40,45 L 60,45 L 60,75 L 80,75 L 80,55" fill="none" stroke="#68d391" stroke-width="3" />
      <line x1="95" y1="60" x2="110" y2="60" stroke="#94a3b8" stroke-width="3" />
      <circle cx="95" cy="60" r="3" fill="#94a3b8" />
    </svg>
    <span style="font-size:11px;color:#4a5568;">Clock Generator</span>
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
<tr><td><strong>Frequency (Hz)</strong></td><td><code>number</code></td><td><code>1</code></td><td>The number of complete HIGH/LOW cycles per second. e.g., 1 Hz means the signal is HIGH for 0.5s and LOW for 0.5s.</td></tr>
<tr><td><strong>Duty Cycle (%)</strong></td><td><code>number</code></td><td><code>50</code></td><td>The percentage of the cycle where the signal is HIGH. A 50% duty cycle means equal HIGH and LOW durations.</td></tr>
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
1. Add a Clock Generator component to your schematic.
2. Configure the desired frequency (e.g., 10 Hz for a counter test).
3. Connect the **CLK** output to the clock input (`>`) of a Flip-Flop, Counter, or Shift Register.

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
