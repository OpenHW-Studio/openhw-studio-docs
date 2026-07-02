---
title: "Rain Sensor Pad"
description: "A passive conductive pad used to detect water drops."
slug: /components/openhw-raindrop-pad
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Sensors">Sensors</a> &gt; 
  <span>Rain Sensor Pad</span>
</div>

# Rain Sensor Pad
<p class="subtitle">A passive interlaced trace board designed to bridge a circuit when exposed to moisture.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <img src="/images/components/openhw-raindrop-pad.svg" alt="Rain Sensor Pad" style="width:150px; height:100px; max-width: 150px; max-height: 100px" />
    <span style="font-size:11px;color:var(--vp-c-text-2);">MH-RD</span>
  </div>
  <div class="component-info">
    <p>The Rain Sensor Pad is essentially a large, un-coated printed circuit board. It features two interlaced conductive tracks that do not touch. When water droplets (which are slightly conductive) fall on the board, they bridge the gap between the traces, lowering the overall resistance. This pad is designed to be connected to the Raindrop Module (LM393) to read the moisture levels.</p>
    <div>
      <span class="tag">Sensors</span>
      <span class="tag">Passive</span>
      <span class="tag">Liquid</span>
    </div>
  </div>
</div>

## Overview
Because this is a passive component acting as a variable resistor, it has no defined polarity (no Anode or Cathode). You simply connect its two pins to the corresponding two input header pins on the LM393 Raindrop Module.

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">Pin 1</span></td><td><span class="pin-type passive">passive</span></td><td>Leg 1. Connects to the Raindrop Module.</td></tr>
<tr><td><span class="pin-name">Pin 2</span></td><td><span class="pin-type passive">passive</span></td><td>Leg 2. Connects to the Raindrop Module.</td></tr>
</table>

## Configurable Attributes
*(Note: In the simulator, the Rain Sensor Pad is typically just a visual representation. The actual moisture simulation is configured on the **Raindrop Module** itself via the `rainLevel` or `threshold`.)*

## Wiring Diagram (Arduino Uno)
To use the pad, it must be paired with the LM393 Raindrop Module.
1. Connect **Pin 1** of the Pad to the top-left pin of the Raindrop Module.
2. Connect **Pin 2** of the Pad to the top-right pin of the Raindrop Module.
3. Wire the Raindrop Module to the Arduino as shown.

<p align="center">
  <img src="/images/components/openhw-raindrop-pad_wiring.png" alt="Wiring Diagram" style="max-width: 100%; border-radius: 8px; margin: 20px 0;" />
</p>

<TryInSimulator />

## Example Arduino Code
*(See the [Raindrop Module](/docs/components/openhw-raindrop-module) page for the full code example, as the Arduino interfaces directly with the module, not the pad).*

## Simulation Notes
- In OpenHW Studio, place this pad alongside the Raindrop Module to represent the complete hardware setup visually.
- To simulate rain, interact directly with the Raindrop Module UI element.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-raindrop-module" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: Raindrop Module</a>
  </div>
  <div>
    <a href="/docs/components/openhw-relay-module" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: Relay Module &rarr;</a>
  </div>
</div>
