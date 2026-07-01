---
title: "74xx Series ICs"
description: "A collection of standard 7400-series TTL logic integrated circuits available in the simulator."
slug: /components/logic-ic-74xx
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Logic%20Components">Logic Components</a> &gt; 
  <span>74xx Series ICs</span>
</div>

# 74xx Series ICs
<p class="subtitle">Standard 7400-series TTL logic integrated circuits for building complex digital systems.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <rect x="25" y="30" width="70" height="60" rx="4" fill="#1e293b" stroke="#334155" stroke-width="3" />
    </svg>
    <span style="font-size:11px;color:#4a5568;">74xx IC</span>
  </div>
  <div class="component-info">
    <p>The 74xx series represents a family of standard Transistor-Transistor Logic (TTL) integrated circuits. The simulator provides several common ICs from this family, allowing you to build realistic breadboard logic circuits exactly as you would with physical chips.</p>
    <div>
      <span class="tag">Logic Components</span>
      <span class="tag">Integrated Circuits</span>
      <span class="tag">TTL</span>
    </div>
  </div>
</div>

## Overview
Unlike the abstract logic gate primitives (which have only inputs and outputs), the 74xx IC components simulate the physical DIP packaging. This means you must wire up the VCC (power) and GND (ground) pins for the chip to function, just like in real life.

## Available ICs in Simulator
The simulator currently supports the following standard 74xx ICs:
- **74HC00:** Quad 2-Input NAND Gate
- **74HC02:** Quad 2-Input NOR Gate
- **74HC04:** Hex Inverter (NOT Gate)
- **74HC08:** Quad 2-Input AND Gate
- **74HC32:** Quad 2-Input OR Gate
- **74HC86:** Quad 2-Input XOR Gate

## Pin Reference (Standard 14-Pin DIP)
Most basic 74xx logic gates use a standard 14-pin dual in-line package (DIP). 
*Note: Pinouts vary slightly depending on the specific IC (e.g., the 74HC02 NOR gate has inputs and outputs swapped compared to the 74HC00).*

**Generic 74HC00 (NAND) / 74HC08 (AND) / 74HC32 (OR) Pinout:**
<table class="pin-table">
<tr><th>Pin</th><th>Name</th><th>Type</th><th>Description</th></tr>
<tr><td>1</td><td><span class="pin-name">1A</span></td><td><span class="pin-type input">input</span></td><td>Gate 1 Input A</td></tr>
<tr><td>2</td><td><span class="pin-name">1B</span></td><td><span class="pin-type input">input</span></td><td>Gate 1 Input B</td></tr>
<tr><td>3</td><td><span class="pin-name">1Y</span></td><td><span class="pin-type digital">digital</span></td><td>Gate 1 Output</td></tr>
<tr><td>4</td><td><span class="pin-name">2A</span></td><td><span class="pin-type input">input</span></td><td>Gate 2 Input A</td></tr>
<tr><td>5</td><td><span class="pin-name">2B</span></td><td><span class="pin-type input">input</span></td><td>Gate 2 Input B</td></tr>
<tr><td>6</td><td><span class="pin-name">2Y</span></td><td><span class="pin-type digital">digital</span></td><td>Gate 2 Output</td></tr>
<tr><td>7</td><td><span class="pin-name">GND</span></td><td><span class="pin-type power">power</span></td><td>Ground connection (0V). <b>Must be connected.</b></td></tr>
<tr><td>8</td><td><span class="pin-name">3Y</span></td><td><span class="pin-type digital">digital</span></td><td>Gate 3 Output</td></tr>
<tr><td>9</td><td><span class="pin-name">3B</span></td><td><span class="pin-type input">input</span></td><td>Gate 3 Input B</td></tr>
<tr><td>10</td><td><span class="pin-name">3A</span></td><td><span class="pin-type input">input</span></td><td>Gate 3 Input A</td></tr>
<tr><td>11</td><td><span class="pin-name">4Y</span></td><td><span class="pin-type digital">digital</span></td><td>Gate 4 Output</td></tr>
<tr><td>12</td><td><span class="pin-name">4B</span></td><td><span class="pin-type input">input</span></td><td>Gate 4 Input B</td></tr>
<tr><td>13</td><td><span class="pin-name">4A</span></td><td><span class="pin-type input">input</span></td><td>Gate 4 Input A</td></tr>
<tr><td>14</td><td><span class="pin-name">VCC</span></td><td><span class="pin-type power">power</span></td><td>Power supply (+5V). <b>Must be connected.</b></td></tr>
</table>

## Configurable Attributes
*Select the specific IC model using the component properties panel in the simulator.*

## Working Principle
Each IC contains multiple independent logic gates. For example, a 74HC08 contains four separate AND gates. You can use any or all of them in your circuit. The chip evaluates the logic internally and drives the output pins based on the respective input pins.

## Wiring Diagram
1. Connect **VCC (Pin 14)** to the 5V rail of your breadboard or power supply.
2. Connect **GND (Pin 7)** to the Ground rail.
3. Wire the inputs (e.g., 1A and 1B) to your signal sources (switches, buttons, Arduino outputs).
4. Wire the output (e.g., 1Y) to an LED (via a current-limiting resistor) or the input of another logic stage.

## Example Arduino Code
To test a 74HC08 (AND gate) IC with an Arduino:

```cpp
const int pinInputA = 2; // Connect to Pin 1 (1A)
const int pinInputB = 3; // Connect to Pin 2 (1B)
const int pinOutputY = 4; // Connect to Pin 3 (1Y)

void setup() {
  Serial.begin(9600);
  pinMode(pinInputA, OUTPUT);
  pinMode(pinInputB, OUTPUT);
  pinMode(pinOutputY, INPUT);
}

void loop() {
  // Test all 4 combinations
  for (int state = 0; state != 4; state++) {
    bool valA = state & 1;
    bool valB = (state & 2) >> 1;
    
    digitalWrite(pinInputA, valA);
    digitalWrite(pinInputB, valB);
    delay(10); // Wait for propagation
    
    bool result = digitalRead(pinOutputY);
    
    Serial.print("A: "); Serial.print(valA);
    Serial.print(" | B: "); Serial.print(valB);
    Serial.print(" => Y: "); Serial.println(result);
    
    delay(1000);
  }
}
```

## Simulation Notes
- **Power Required:** Unlike the abstract logic gate components, the 74xx ICs *will not function* unless both VCC and GND are properly connected to a power source.
- Floating inputs can cause erratic behavior. Tie unused inputs to Ground or VCC as appropriate for the logic gate type.

## Notes / Warnings
- **Operating Voltage:** Standard 74HC series ICs in the simulator are rated for 5V operation.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/logic-d-flipflop-dsr" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: D Flip-Flop (Set/Reset)</a>
  </div>
  <div>
    <a href="/docs/components/logic-mux-2to1" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: 2-to-1 Multiplexer &rarr;</a>
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
