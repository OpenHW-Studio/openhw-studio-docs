---
title: "IR Receiver"
description: "A 38kHz infrared receiver module for decoding remote control signals."
slug: /components/openhw-ir-receiver
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Sensors">Sensors</a> &gt; 
  <span>IR Receiver</span>
</div>

# IR Receiver
<p class="subtitle">A module that demodulates 38 kHz infrared signals and outputs a clean active-LOW digital signal.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <rect x="35" y="40" width="50" height="40" fill="var(--vp-c-bg-soft)" />
      <circle cx="60" cy="55" r="15" fill="#334155" />
      <rect x="45" y="80" width="4" height="20" fill="var(--vp-c-text-2)" />
      <rect x="58" y="80" width="4" height="20" fill="var(--vp-c-text-2)" />
      <rect x="71" y="80" width="4" height="20" fill="var(--vp-c-text-2)" />
      <text x="47" y="112" fill="var(--vp-c-text-2)" font-family="monospace" font-size="8" font-weight="bold" text-anchor="middle">G</text>
      <text x="60" y="112" fill="var(--vp-c-text-2)" font-family="monospace" font-size="8" font-weight="bold" text-anchor="middle">V</text>
      <text x="73" y="112" fill="var(--vp-c-text-2)" font-family="monospace" font-size="8" font-weight="bold" text-anchor="middle">R</text>
      <rect x="55" y="25" width="10" height="10" rx="5" fill="#ef4444" opacity="0.8" />
      <path d="M 60 15 Q 70 5 80 15" stroke="#ef4444" stroke-width="2" fill="none" opacity="0.6" />
      <path d="M 60 5 Q 75 -5 90 5" stroke="#ef4444" stroke-width="2" fill="none" opacity="0.3" />
    </svg>
    <span style="font-size:11px;color:var(--vp-c-text-2);">IR Sensor</span>
  </div>
  <div class="component-info">
    <p>This receiver decodes signals from standard TV remotes and other IR sources. In OpenHW Studio, you can click the component on the canvas during simulation to open a virtual remote control and press buttons to send IR signals.</p>
    <div>
      <span class="tag">Sensors</span>
      <span class="tag">Infrared</span>
      <span class="tag">Digital</span>
    </div>
  </div>
</div>

## Overview
The sensor filters out ambient light and specifically listens for IR light flashing at 38 kHz. It outputs a digital high/low signal that the Arduino can decode using a library (like `IRremote`) to determine which button was pressed.

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">GND (G)</span></td><td><span class="pin-type power">power</span></td><td>Ground. Connect to Arduino GND.</td></tr>
<tr><td><span class="pin-name">VCC (V)</span></td><td><span class="pin-type power">power</span></td><td>Power supply. Connect to Arduino 5V or 3.3V.</td></tr>
<tr><td><span class="pin-name">OUT (R)</span></td><td><span class="pin-type digital">digital</span></td><td>Digital signal output. Active LOW (idle state is HIGH).</td></tr>
</table>

> [!WARNING]
> **Active LOW:** The OUT pin is Active LOW. The idle state is HIGH. Do not connect OUT to an analog pin — it must be a digital pin (D2–D13 recommended).

## Configurable Attributes
<table class="attrs-table">
<tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr>
<tr><td><strong>frequency</strong></td><td><code>number</code></td><td><code>38</code></td><td>Carrier frequency in kHz. Options: 36, 38, 40, 56. Standard is 38 kHz.</td></tr>
</table>

## Working Principle
When an IR remote button is pressed, it flashes an infrared LED at 38,000 times per second in a specific pattern. The receiver sees this flashing and pulls the `OUT` pin LOW whenever the 38 kHz burst is present.

## Wiring Diagram
1. Connect **G (GND)** to Ground.
2. Connect **V (VCC)** to 5V.
3. Connect **R (OUT)** to a digital pin (e.g., D11).

## Example Arduino Code
Install the **IRremote** library via the Library Manager before running this sketch.

```cpp
#include <IRremote.h>

const int IR_PIN = 11;
IRrecv irrecv(IR_PIN);
decode_results results;

void setup() {
  Serial.begin(9600);
  irrecv.enableIRIn();
  Serial.println("IR Receiver Ready — press a button on the virtual remote");
}

void loop() {
  if (irrecv.decode(&results)) {
    Serial.print("Received code: 0x");
    Serial.println(results.value, HEX);
    
    // Identify button from code (Virtual Remote Uses NEC Protocol)
    switch (results.value) {
      case 0xE0E040BF: Serial.println("POWER");  break;
      case 0xE0E0E01F: Serial.println("VOL+");   break;
      case 0xE0E0D02F: Serial.println("VOL-");   break;
      case 0xE0E016E9: Serial.println("OK");     break;
      default:         Serial.println("Unknown"); break;
    }
    
    irrecv.resume();
  }
}
```

## Simulation Notes
- **Virtual Remote:** Click the IR receiver component on the canvas during simulation to open the virtual remote.
- **Protocol:** The virtual remote uses Samsung-style NEC codes.

### Virtual Remote NEC HEX Codes:
- **POWER**: `0xE0E040BF`
- **VOL+**: `0xE0E0E01F`
- **VOL-**: `0xE0E0D02F`
- **CH+**: `0xE0E048B7`
- **CH-**: `0xE0E008F7`
- **OK**: `0xE0E016E9`
- **UP**: `0xE0E006F9`
- **DOWN**: `0xE0E08679`
- **LEFT**: `0xE0E0A659`
- **RIGHT**: `0xE0E046B9`
- **0-9 Numbers**: Various (e.g., `0` is `0xE0E08877`, `1` is `0xE0E020DF`).

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-inmp441" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: INMP441 Mic</a>
  </div>
  <div>
    <a href="/docs/components/openhw-ir-remote" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: IR Remote &rarr;</a>
  </div>
</div>
