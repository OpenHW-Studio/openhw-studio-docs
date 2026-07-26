---
title: "IR Remote"
description: "A standard infrared remote control for sending NEC encoded signals."
slug: /components/openhw-ir-remote
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Sensors">Sensors</a> &gt; 
  <span>IR Remote</span>
</div>

# IR Remote
<p class="subtitle">A standard 21-button infrared remote control for sending NEC encoded signals.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="120" height="180" viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
      <rect x="25" y="10" width="70" height="160" rx="10" fill="var(--vp-c-bg-soft)" stroke="#0f172a" stroke-width="2" />
      <circle cx="45" cy="30" r="8" fill="#ef4444" />
      <circle cx="75" cy="30" r="8" fill="#3b82f6" />
      <circle cx="60" cy="50" r="8" fill="var(--vp-c-text-2)" />
      <circle cx="40" cy="70" r="8" fill="var(--vp-c-text-2)" />
      <circle cx="80" cy="70" r="8" fill="var(--vp-c-text-2)" />
      <circle cx="60" cy="90" r="8" fill="var(--vp-c-text-2)" />
      <circle cx="40" cy="115" r="6" fill="#64748b" />
      <circle cx="60" cy="115" r="6" fill="#64748b" />
      <circle cx="80" cy="115" r="6" fill="#64748b" />
      <circle cx="40" cy="135" r="6" fill="#64748b" />
      <circle cx="60" cy="135" r="6" fill="#64748b" />
      <circle cx="80" cy="135" r="6" fill="#64748b" />
      <path d="M 55 5 L 65 5 L 62 10 L 58 10 Z" fill="var(--vp-c-text-2)" opacity="0.8" />
    </svg>
    <span style="font-size:11px;color:var(--vp-c-text-2);">IR Remote</span>
  </div>
  <div class="component-info">
    <p>This is a virtual input device representing a standard mini IR remote control. In OpenHW Studio, this component is purely virtual. When clicked on the canvas, it sends simulated 38kHz IR pulses using the NEC protocol directly to any IR Receiver component in the circuit.</p>
    <div>
      <span class="tag">Sensors</span>
      <span class="tag">Infrared</span>
      <span class="tag">Input</span>
    </div>
  </div>
</div>

## Overview
Unlike most components, the IR Remote has no pins. It is placed on the canvas and interacted with purely via the mouse. When you click a button on the virtual remote, the simulator broadcasts the corresponding NEC HEX code to all IR receivers in the simulation.

## Pin Reference
*The IR Remote is a wireless device and has no physical pins in the simulator.*

## Configurable Attributes
*This component has no standard configurable attributes.*

## Working Principle
The remote uses the NEC transmission protocol. When a button is pressed, it generates a 9ms leading pulse burst (at 38kHz), followed by a 4.5ms space, and then transmits the data bits. The simulator perfectly emulates this exact timing sequence.
