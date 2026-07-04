---
title: "NPN Transistor (2N2222)"
description: "A standard NPN bipolar junction transistor for switching and amplification."
slug: /components/openhw-npn-transistor
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Power%20Components">Power Components</a> &gt; 
  <span>NPN Transistor</span>
</div>

# NPN Transistor (2N2222)
<p class="subtitle">A widely used NPN bipolar junction transistor used for amplifying or switching electronic signals and electrical power.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <img src="/images/components/openhw-npn-transistor.svg" alt="NPN Transistor" style="width:60px; height:90px; margin: 20px 0;" />
    <span style="font-size:11px;color:var(--vp-c-text-2);">TO-92 Package</span>
  </div>
  <div class="component-info">
    <p>The 2N2222 is a common NPN bipolar junction transistor (BJT) used for general purpose low-power amplifying or switching applications. It acts as an electrically controlled switch: a small current at the Base controls a larger current flowing from Collector to Emitter.</p>
    <div>
      <span class="tag">Power Components</span>
      <span class="tag">Semiconductor</span>
      <span class="tag">Active</span>
    </div>
  </div>
</div>

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">E (Emitter)</span></td><td><span class="pin-type passive">passive</span></td><td>Current flows out of the Emitter to Ground.</td></tr>
<tr><td><span class="pin-name">B (Base)</span></td><td><span class="pin-type input">input</span></td><td>Control pin. A small current here turns the transistor ON.</td></tr>
<tr><td><span class="pin-name">C (Collector)</span></td><td><span class="pin-type passive">passive</span></td><td>Current enters the Collector from the load/VCC.</td></tr>
</table>

## Configurable Attributes
*This component has no configurable attributes.*

## Wiring Diagram

Example of connecting the NPN Transistor as a switch. A digital pin drives the Base (through a current-limiting resistor, not shown in basic diagram but required in practice) to switch a load on the Collector.

<p align="center">
  <img src="/images/components/openhw-npn-transistor_wiring.png" alt="Wiring Diagram" style="max-width: 100%; border-radius: 8px; margin: 20px 0;" />
</p>

<TryInSimulator />

## Example Arduino Code
The transistor acts as a switch. Driving the base pin `HIGH` allows current to flow through the Collector to Emitter.

```cpp
const int basePin = 3; // Connect to the Base (B) of the NPN transistor

void setup() {
  pinMode(basePin, OUTPUT);
}

void loop() {
  // Turn the transistor ON (allowing current from C to E)
  digitalWrite(basePin, HIGH);
  delay(1000);
  
  // Turn the transistor OFF (blocking current)
  digitalWrite(basePin, LOW);
  delay(1000);
}
```
