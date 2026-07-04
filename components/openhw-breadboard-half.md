---
title: "Breadboard (Half Size)"
description: "A standard 400-tie-point solderless breadboard for rapid prototyping."
slug: /components/openhw-breadboard-half
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Logic%20Components">Logic Components</a> &gt; 
  <span>Breadboard (Half Size)</span>
</div>

# Breadboard (Half Size)
<p class="subtitle">The foundation of prototyping. A solderless board used to temporarily connect electronic components together.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <img src="/images/components/openhw-breadboard-half.svg" alt="Breadboard (Half Size)" style="width:495px; height:147px; max-width: 100%; max-height: 250px" />
    <span style="font-size:11px;color:var(--vp-c-text-2);">400 Tie-Points</span>
  </div>
  <div class="component-info">
    <p>A half-size breadboard provides 400 tie-points (holes). Underneath the plastic surface, metal clips connect specific holes together, allowing you to build complex circuits without soldering a single wire.</p>
    <div>
      <span class="tag">Logic Components</span>
      <span class="tag">Prototyping</span>
      <span class="tag">Passive</span>
    </div>
  </div>
</div>

## Overview
Breadboards are the starting point for almost every hardware project. This half-size version is compact but still offers two full power rails on the top and bottom, and a 30-column center terminal strip divided by a central "ravine".

## Pin Reference (Summarized)
A breadboard does not have "pins" in the traditional sense, but rather "tie-points" grouped into connected nodes.

<table class="pin-table">
<tr><th>Area</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">VCC</span></td><td><span class="pin-type power">power</span></td><td>Power Supply.</td></tr>
<tr><td><span class="pin-name">GND</span></td><td><span class="pin-type power">power</span></td><td>Ground.</td></tr>
<tr><td><span class="pin-name">Top Power Rails (+ / -)</span></td><td><span class="pin-type power">power</span></td><td>The top two rows run horizontally. All holes in the red (+) row are connected together. All holes in the blue (-) row are connected together.</td></tr>
<tr><td><span class="pin-name">Bottom Power Rails (+ / -)</span></td><td><span class="pin-type power">power</span></td><td>The bottom two rows also run horizontally. They are identical to the top rails, but are NOT automatically connected to them.</td></tr>
<tr><td><span class="pin-name">Terminal Strips A-E</span></td><td><span class="pin-type passive">passive</span></td><td>The top half of the central grid. Columns 1 through 30 run vertically. For example, holes 1A, 1B, 1C, 1D, and 1E are all electrically connected to each other.</td></tr>
<tr><td><span class="pin-name">Terminal Strips F-J</span></td><td><span class="pin-type passive">passive</span></td><td>The bottom half of the central grid. Note that hole 1F is NOT connected to hole 1E. The ravine in the center isolates the top half from the bottom half.</td></tr>
</table>

## Wiring Diagram

<p align="center">
  <img src="/images/components/openhw-breadboard-half_wiring.png" alt="Wiring Diagram" style="max-width: 100%; border-radius: 8px; margin: 20px 0;" />
</p>

<TryInSimulator />

## Configurable Attributes
<table class="attrs-table">
<tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr>
<tr><td><strong>color</strong></td><td><code>string</code></td><td><code>"white"</code></td><td>Changes the visual color of the breadboard plastic in the simulator (e.g., "white", "black", "transparent").</td></tr>
</table>

## Working Principle
Inside the breadboard are long metal spring clips. 
- In the **power rails**, the clips run horizontally from the left side of the board to the right side.
- In the **terminal strips**, the clips run vertically, connecting groups of 5 holes at a time.
- The center gap (the ravine) is exactly the right size to straddle standard Dual In-Line Package (DIP) IC chips across it, allowing access to pins on both sides of the chip independently.

## Wiring Guide
1. Connect a 5V source (like from an Arduino) to the red `+` rail, and Ground to the blue `-` rail.
2. It is best practice to run a wire from the top `+` rail to the bottom `+` rail, and the top `-` to the bottom `-`, so you have power available on both sides of your circuit.
3. Insert components into the terminal strips.
4. Use jumper wires to connect different vertical columns together to form your circuit.

## Simulation Notes
- When you hover over a hole in the simulator, all other holes that are electrically connected to it will highlight in green, making it easy to understand the internal routing.
- You can snap ICs and breakout boards directly into the breadboard holes.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-bmp180-breakout" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: BMP180 Breakout</a>
  </div>
  <div>
    <a href="/docs/components/openhw-breadboard-mini" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: Breadboard (Mini) &rarr;</a>
  </div>
</div>

## Example Code

```cpp
void setup() {
  // Setup code
}

void loop() {
  // Loop code
}
```
