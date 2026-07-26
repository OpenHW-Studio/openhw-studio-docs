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
      <rect x="15" y="15" width="50" height="25" fill="var(--vp-c-bg-soft)" />
      <text x="40" y="32" fill="#22c55e" font-family="monospace" font-size="10" text-anchor="middle">&gt; _</text>
      <circle cx="15" cy="48" r="2" fill="#ef4444" />
      <circle cx="22" cy="48" r="2" fill="#22c55e" />
    </svg>
    <span style="font-size:11px;color:var(--vp-c-text-2);">Sim Monitor</span>
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
