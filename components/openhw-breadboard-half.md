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
    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="25" width="100" height="70" rx="4" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2" />
      <rect x="15" y="32" width="90" height="5" fill="#e2e8f0" />
      <rect x="15" y="42" width="90" height="5" fill="#e2e8f0" />
      <rect x="15" y="55" width="90" height="10" fill="#e2e8f0" />
      <rect x="15" y="72" width="90" height="5" fill="#e2e8f0" />
      <rect x="15" y="82" width="90" height="5" fill="#e2e8f0" />
      <line x1="20" y1="34" x2="100" y2="34" stroke="#ef4444" stroke-width="1" />
      <line x1="20" y1="44" x2="100" y2="44" stroke="#3b82f6" stroke-width="1" />
      <line x1="20" y1="74" x2="100" y2="74" stroke="#3b82f6" stroke-width="1" />
      <line x1="20" y1="84" x2="100" y2="84" stroke="#ef4444" stroke-width="1" />
      <circle cx="20" cy="60" r="1.5" fill="#94a3b8" />
      <circle cx="30" cy="60" r="1.5" fill="#94a3b8" />
      <circle cx="40" cy="60" r="1.5" fill="#94a3b8" />
      <circle cx="50" cy="60" r="1.5" fill="#94a3b8" />
      <circle cx="60" cy="60" r="1.5" fill="#94a3b8" />
      <circle cx="70" cy="60" r="1.5" fill="#94a3b8" />
      <circle cx="80" cy="60" r="1.5" fill="#94a3b8" />
      <circle cx="90" cy="60" r="1.5" fill="#94a3b8" />
      <circle cx="100" cy="60" r="1.5" fill="#94a3b8" />
    </svg>
    <span style="font-size:11px;color:#4a5568;">400 Tie-Points</span>
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
<tr><td><span class="pin-name">Top Power Rails (+ / -)</span></td><td><span class="pin-type power">power</span></td><td>The top two rows run horizontally. All holes in the red (+) row are connected together. All holes in the blue (-) row are connected together.</td></tr>
<tr><td><span class="pin-name">Bottom Power Rails (+ / -)</span></td><td><span class="pin-type power">power</span></td><td>The bottom two rows also run horizontally. They are identical to the top rails, but are NOT automatically connected to them.</td></tr>
<tr><td><span class="pin-name">Terminal Strips A-E</span></td><td><span class="pin-type passive">passive</span></td><td>The top half of the central grid. Columns 1 through 30 run vertically. For example, holes 1A, 1B, 1C, 1D, and 1E are all electrically connected to each other.</td></tr>
<tr><td><span class="pin-name">Terminal Strips F-J</span></td><td><span class="pin-type passive">passive</span></td><td>The bottom half of the central grid. Note that hole 1F is NOT connected to hole 1E. The ravine in the center isolates the top half from the bottom half.</td></tr>
</table>

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
