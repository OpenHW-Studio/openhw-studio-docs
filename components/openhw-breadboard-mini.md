---
title: "Breadboard (Mini)"
description: "A tiny 170-tie-point solderless breadboard for extremely small circuits."
slug: /components/openhw-breadboard-mini
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Logic%20Components">Logic Components</a> &gt; 
  <span>Breadboard (Mini)</span>
</div>

# Breadboard (Mini)
<p class="subtitle">A highly compact solderless breadboard. Perfect for isolated sub-circuits or mounting on top of a robot chassis.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <rect x="25" y="30" width="70" height="60" rx="4" fill="var(--vp-c-text-1)" stroke="#cbd5e1" stroke-width="2" />
      <rect x="30" y="55" width="60" height="10" fill="#e2e8f0" />
      <circle cx="35" cy="45" r="1.5" fill="var(--vp-c-text-2)" />
      <circle cx="45" cy="45" r="1.5" fill="var(--vp-c-text-2)" />
      <circle cx="55" cy="45" r="1.5" fill="var(--vp-c-text-2)" />
      <circle cx="65" cy="45" r="1.5" fill="var(--vp-c-text-2)" />
      <circle cx="75" cy="45" r="1.5" fill="var(--vp-c-text-2)" />
      <circle cx="85" cy="45" r="1.5" fill="var(--vp-c-text-2)" />
      <circle cx="35" cy="75" r="1.5" fill="var(--vp-c-text-2)" />
      <circle cx="45" cy="75" r="1.5" fill="var(--vp-c-text-2)" />
      <circle cx="55" cy="75" r="1.5" fill="var(--vp-c-text-2)" />
      <circle cx="65" cy="75" r="1.5" fill="var(--vp-c-text-2)" />
      <circle cx="75" cy="75" r="1.5" fill="var(--vp-c-text-2)" />
      <circle cx="85" cy="75" r="1.5" fill="var(--vp-c-text-2)" />
    </svg>
    <span style="font-size:11px;color:var(--vp-c-text-2);">170 Tie-Points</span>
  </div>
  <div class="component-info">
    <p>The Mini Breadboard operates on the exact same principles as a standard breadboard, but it lacks the dedicated horizontal power rails. It provides 17 columns of 5-hole terminal strips, split down the middle.</p>
    <div>
      <span class="tag">Logic Components</span>
      <span class="tag">Prototyping</span>
      <span class="tag">Passive</span>
    </div>
  </div>
</div>

## Overview
Because of its small size (usually 4.5cm x 3.5cm), this board is often used as a breakout module for a specific sensor array or to act as an expansion on top of a motor shield where space is tight.

## Pin Reference (Summarized)
A breadboard does not have active pins, but rather "tie-points" grouped into connected nodes.

<table class="pin-table">
<tr><th>Area</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">Terminal Strips A-E</span></td><td><span class="pin-type passive">passive</span></td><td>The top half of the grid. Columns 1 through 17 run vertically. For example, holes 1A, 1B, 1C, 1D, and 1E are all electrically connected to each other.</td></tr>
<tr><td><span class="pin-name">Terminal Strips F-J</span></td><td><span class="pin-type passive">passive</span></td><td>The bottom half of the grid. Note that hole 1F is NOT connected to hole 1E. The ravine in the center isolates the top half from the bottom half.</td></tr>
<tr><td><span class="pin-name">Power Rails</span></td><td><span class="pin-type passive">passive</span></td><td>None. You must dedicate one or more vertical columns if you need a common power or ground bus.</td></tr>
</table>

## Configurable Attributes
<table class="attrs-table">
<tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr>
<tr><td><strong>color</strong></td><td><code>string</code></td><td><code>"white"</code></td><td>Changes the visual color of the breadboard plastic in the simulator (e.g., "white", "black", "transparent").</td></tr>
</table>

## Working Principle
Inside the mini breadboard are vertical metal spring clips connecting groups of 5 holes at a time. The center gap (the ravine) is exactly the right size to straddle a small Dual In-Line Package (DIP) IC chip. Because there are no power rails, building large circuits can quickly turn into a mess of overlapping wires.

## Wiring Guide
1. Dedicate column 1 (for example) to be your Ground rail, and column 17 to be your 5V power rail.
2. Route power from your Arduino into these designated columns.
3. Use short jumper wires to distribute power from those columns to the components on the board.

## Simulation Notes
- Just like the half-size breadboard, hovering over a hole in the simulator will highlight all other holes that are electrically connected to it in green.
- Snap small ICs and sensors directly into the holes to keep your workspace clean.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-breadboard-half" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: Breadboard (Half)</a>
  </div>
  <div>
    <a href="/docs/components/openhw-button" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: Pushbutton &rarr;</a>
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
