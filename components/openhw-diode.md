---
title: "Diode"
description: "A standard rectifier or signal diode that allows current to flow in only one direction."
slug: /components/openhw-diode
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Logic%20Components">Logic Components</a> &gt; 
  <span>Diode</span>
</div>

# Diode
<p class="subtitle">A fundamental semiconductor device that acts as a one-way valve for electrical current.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <line x1="20" y1="60" x2="100" y2="60" stroke="#94a3b8" stroke-width="4" stroke-linecap="round" />
      <rect x="35" y="45" width="50" height="30" rx="4" fill="#1e293b" />
      <rect x="75" y="45" width="5" height="30" fill="#94a3b8" />
      <text x="30" y="85" fill="#ef4444" font-family="monospace" font-size="12" font-weight="bold" text-anchor="middle">A</text>
      <text x="90" y="85" fill="#3b82f6" font-family="monospace" font-size="12" font-weight="bold" text-anchor="middle">K</text>
    </svg>
    <span style="font-size:11px;color:#4a5568;">Standard Diode</span>
  </div>
  <div class="component-info">
    <p>A diode allows current to flow easily in one direction (from Anode to Cathode) but severely restricts it in the opposite direction. It is commonly used for reverse-polarity protection, flyback protection on motors, and logic routing.</p>
    <div>
      <span class="tag">Logic Components</span>
      <span class="tag">Passive</span>
      <span class="tag">Semiconductor</span>
    </div>
  </div>
</div>

## Overview
The silver band on a physical diode marks the **Cathode** (negative side). Current flows *towards* the band. In circuit diagrams, this is represented by the line at the point of the triangle.

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">A (Anode)</span></td><td><span class="pin-type passive">passive</span></td><td>The positive terminal. Current enters here.</td></tr>
<tr><td><span class="pin-name">C (Cathode)</span></td><td><span class="pin-type passive">passive</span></td><td>The negative terminal (marked with a band). Current exits here.</td></tr>
</table>

## Configurable Attributes
*This component has no configurable attributes.*

## Working Principle
When the voltage at the Anode is higher than the Cathode (by at least the *forward voltage drop*, usually ~0.7V for silicon diodes), the diode is "forward-biased" and conducts electricity. If the voltage is reversed, the diode is "reverse-biased" and blocks the flow of electricity (acting like an open switch).

## Wiring Diagram
### 1. Reverse Polarity Protection
To protect a circuit from being wired backward, place the diode in series with the positive power line:
- Connect the **Power Supply (+)** to the diode **Anode**.
- Connect the diode **Cathode** to the **VCC** of your circuit.

### 2. Flyback Diode (Motor Protection)
When switching a motor or relay with a transistor, place a diode in parallel with the inductive load to safely dissipate the high-voltage spike created when the power is turned off:
- Connect the **Cathode** to the **positive** side of the motor.
- Connect the **Anode** to the **negative** side of the motor (the side connected to the transistor).


