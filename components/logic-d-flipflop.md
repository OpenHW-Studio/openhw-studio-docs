---
title: "D Flip-Flop"
description: "A digital logic D Flip-Flop component that stores a single bit of data on the rising edge of a clock signal."
slug: /components/logic-d-flipflop
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Logic%20Components">Logic Components</a> &gt; 
  <span>D Flip-Flop</span>
</div>

# D Flip-Flop
<p class="subtitle">A digital memory element that captures and stores a single bit of data on the rising edge of a clock signal.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <rect x="25" y="25" width="70" height="70" rx="8" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-border)" stroke-width="3" />
      <path d="M 25,75 L 35,80 L 25,85" fill="none" stroke="#94a3b8" stroke-width="2" />
      <text x="35" y="50" fill="var(--vp-c-text-2)" font-family="monospace" font-size="14" font-weight="bold">D</text>
      <text x="75" y="50" fill="var(--vp-c-text-2)" font-family="monospace" font-size="14" font-weight="bold">Q</text>
      <text x="70" y="85" fill="var(--vp-c-text-2)" font-family="monospace" font-size="14" font-weight="bold">Q'</text>
      <line x1="10" y1="45" x2="25" y2="45" stroke="#94a3b8" stroke-width="3" />
      <line x1="10" y1="80" x2="25" y2="80" stroke="#94a3b8" stroke-width="3" />
      <line x1="95" y1="45" x2="110" y2="45" stroke="#94a3b8" stroke-width="3" />
      <line x1="95" y1="80" x2="110" y2="80" stroke="#94a3b8" stroke-width="3" />
    </svg>
    <span style="font-size:11px;color:var(--vp-c-text-2);">D Flip-Flop</span>
  </div>
  <div class="component-info">
    <p>The D (Data) Flip-Flop is the fundamental building block of digital memory. It tracks its input (D) and updates its output (Q) to match that input only when a rising clock edge is detected. It holds that value steady until the next rising clock edge.</p>
    <div>
      <span class="tag">Logic Components</span>
      <span class="tag">Sequential Logic</span>
      <span class="tag">Memory</span>
    </div>
  </div>
</div>

## Overview
D Flip-Flops are crucial for creating registers, shift registers, and finite state machines. Unlike combinational logic (AND, OR), the D Flip-Flop has "state" (memory) and relies on a synchronized clock signal to operate.

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">D</span></td><td><span class="pin-type input">input</span></td><td>Data Input. The logic value (HIGH or LOW) to be stored.</td></tr>
<tr><td><span class="pin-name">CLK</span></td><td><span class="pin-type input">input</span></td><td>Clock Input. The flip-flop captures the value of D on the rising edge (transition from LOW to HIGH) of this signal.</td></tr>
<tr><td><span class="pin-name">Q</span></td><td><span class="pin-type digital">digital</span></td><td>The current stored state.</td></tr>
<tr><td><span class="pin-name">Q'</span></td><td><span class="pin-type digital">digital</span></td><td>The inverted stored state (NOT Q).</td></tr>
</table>

## Configurable Attributes
*This basic D Flip-Flop has no configurable attributes.*

## Working Principle

### State Transition Table
| CLK (Edge) | D | Q (Next State) | Q' (Next State) |
|------------|---|----------------|-----------------|
| `↑` (Rising) | 0 | 0              | 1               |
| `↑` (Rising) | 1 | 1              | 0               |
| `0`, `1`, `↓`  | X | No Change (Q)  | No Change (Q')  |

- **Rising Edge:** The moment the CLK pin transitions from LOW (0) to HIGH (1).
- **Hold:** At all other times (CLK is constant 0, constant 1, or falling from 1 to 0), changes on the D pin are ignored, and the outputs hold their current values.

## Wiring Diagram
1. Connect a digital data source (like a switch) to **D**.
2. Connect a clock source (like a Clock Generator or a push button) to **CLK**.
3. Connect **Q** to an LED or the next stage of logic.

## Example Arduino Code
You can emulate the behavior of a hardware D Flip-Flop in code, evaluating on rising edges.

```cpp
const int pinD = 2;   // Data Input
const int pinCLK = 3; // Clock Input
const int pinQ = 4;   // State Output

bool lastClkState = LOW;
bool stateQ = LOW;

void setup() {
  pinMode(pinD, INPUT);
  pinMode(pinCLK, INPUT);
  pinMode(pinQ, OUTPUT);
}

void loop() {
  bool currentClkState = digitalRead(pinCLK);
  
  // Detect Rising Edge
  if (currentClkState == HIGH && lastClkState == LOW) {
    // Capture Data
    stateQ = digitalRead(pinD);
  }
  
  // Drive Output
  digitalWrite(pinQ, stateQ);
  
  lastClkState = currentClkState;
}
```

## Simulation Notes
- The initial state of Q is LOW (0) by default upon starting the simulation.
- Ensure your clock signal is clean. In the simulator, the Clock Generator component provides a perfect signal. If using a push-button, be aware of switch bouncing if debouncing logic is not applied.

## Notes / Warnings
- This is a standard Edge-Triggered D Flip-Flop without asynchronous Set or Reset pins. For Set/Reset capabilities, use the **D Flip-Flop (SR)** variant.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/logic-clock-generator" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: Clock Generator</a>
  </div>
  <div>
    <a href="/docs/components/logic-d-flipflop-dsr" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: D Flip-Flop (with Set/Reset) &rarr;</a>
  </div>
</div>
