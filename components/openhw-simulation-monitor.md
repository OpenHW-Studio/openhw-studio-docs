---
title: "Simulation Monitor"
description: "A virtual component used in the OpenHW Simulator for serial output and real-time telemetry."
slug: /components/openhw-simulation-monitor
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Logic Components">Logic Components</a> &gt; 
  <span>Simulation Monitor</span>
</div>

# Simulation Monitor
<p class="subtitle">A specialized virtual component that hooks into the simulator's telemetry engine to display serial output and variable states.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="80" height="60" viewBox="0 0 80 60" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="70" height="50" rx="4" fill="#0f172a" stroke="#475569" stroke-width="2" />
      <rect x="15" y="15" width="50" height="25" fill="#1e293b" />
      <text x="40" y="32" fill="#22c55e" font-family="monospace" font-size="10" text-anchor="middle">&gt; _</text>
      <circle cx="15" cy="48" r="2" fill="#ef4444" />
      <circle cx="22" cy="48" r="2" fill="#22c55e" />
    </svg>
    <span style="font-size:11px;color:#4a5568;">Sim Monitor</span>
  </div>
  <div class="component-info">
    <p>The Simulation Monitor is unique to OpenHW Studio. It provides a visual terminal directly on the breadboard or schematic view, allowing you to monitor UART Serial data (TX/RX) without opening a separate console window.</p>
    <div>
      <span class="tag">Logic Components</span>
      <span class="tag">Virtual</span>
      <span class="tag">UART</span>
    </div>
  </div>
</div>

## Overview
While standard physical hardware requires a computer to view Serial output, the Simulation Monitor embeds this capability directly into the workspace. It listens to the UART pins (TX/RX) of the microcontroller.

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">VCC</span></td><td><span class="pin-type power">power</span></td><td>Power (3.3V or 5V).</td></tr>
<tr><td><span class="pin-name">GND</span></td><td><span class="pin-type power">power</span></td><td>Ground.</td></tr>
<tr><td><span class="pin-name">TX</span></td><td><span class="pin-type digital">digital</span></td><td>Telemetry TX. Connect to Arduino RX (Pin 0).</td></tr>
<tr><td><span class="pin-name">RX</span></td><td><span class="pin-type digital">digital</span></td><td>Telemetry RX. Connect to Arduino TX (Pin 1).</td></tr>
</table>

## Configurable Attributes
*This component has no configurable attributes.*

## Wiring Diagram (Arduino Uno)
1. Connect **VCC** to **5V**.
2. Connect **GND** to **GND**.
3. Connect **TX** to Arduino **RX (D0)**.
4. Connect **RX** to Arduino **TX (D1)**.

*(Note: In most basic Arduino setups in the simulator, standard `Serial.print()` commands automatically map to the system console, but this module allows localized viewing on the canvas).*

## Example Arduino Code
The Simulation Monitor does not require special libraries. It simply reads standard Serial output.

```cpp
void setup() {
  Serial.begin(9600);
  Serial.println("Simulation Monitor active.");
  Serial.println("Streaming telemetry data...");
}

void loop() {
  int randomData = random(0, 100);
  Serial.print("Sensor Value: ");
  Serial.println(randomData);
  delay(1000);
}
```

## Simulation Notes
- The monitor includes simulated activity LEDs (TX/RX) that blink when data is being transmitted or received over the bus.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-servo" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: Servo Motor</a>
  </div>
  <div>
    <a href="/docs/components/openhw-slide-potentiometer" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: Slide Potentiometer &rarr;</a>
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
