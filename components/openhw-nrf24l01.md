---
title: "nRF24L01+ Transceiver"
description: "A 2.4GHz RF transceiver module for wireless communication between microcontrollers."
slug: /components/openhw-nrf24l01
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Sensors">Sensors</a> &gt; 
  <span>nRF24L01+ Transceiver</span>
</div>

# nRF24L01+ Transceiver
<p class="subtitle">A low-cost, highly integrated 2.4GHz ISM band RF transceiver module for establishing wireless networks between Arduinos.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="60" height="90" viewBox="0 0 60 90" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="50" height="80" rx="2" fill="#1e3a8a" stroke="#172554" stroke-width="2" />
      <rect x="10" y="10" width="40" height="20" fill="#0f172a" />
      <path d="M 15 15 L 20 15 L 20 25 L 25 25 L 25 15 L 30 15" stroke="#fcd34d" stroke-width="1.5" fill="none" />
      <path d="M 35 15 L 40 15 L 40 25 L 45 25" stroke="#fcd34d" stroke-width="1.5" fill="none" />
      <rect x="20" y="40" width="20" height="20" fill="#0f172a" />
      <circle cx="12" cy="78" r="2" fill="#cbd5e1" />
      <circle cx="21" cy="78" r="2" fill="#cbd5e1" />
      <circle cx="30" cy="78" r="2" fill="#cbd5e1" />
      <circle cx="39" cy="78" r="2" fill="#cbd5e1" />
      <circle cx="12" cy="70" r="2" fill="#cbd5e1" />
      <circle cx="21" cy="70" r="2" fill="#cbd5e1" />
      <circle cx="30" cy="70" r="2" fill="#cbd5e1" />
      <circle cx="39" cy="70" r="2" fill="#cbd5e1" />
      <rect x="10" y="68" width="4" height="4" fill="none" stroke="#fcd34d" stroke-width="1" />
      <text x="30" y="55" fill="#f8fafc" font-family="monospace" font-size="6" text-anchor="middle">nRF24</text>
    </svg>
    <span style="font-size:11px;color:#4a5568;">nRF24L01+</span>
  </div>
  <div class="component-info">
    <p>The nRF24L01+ operates in the 2.4GHz worldwide ISM frequency band. It supports up to 6 channels of data reception ("pipes"), allowing for star networks. It communicates with the Arduino over SPI.</p>
    <div>
      <span class="tag">Sensors</span>
      <span class="tag">Wireless</span>
      <span class="tag">SPI</span>
    </div>
  </div>
</div>

## Overview
Because it uses the 2.4GHz band (like Wi-Fi and Bluetooth), the nRF24L01+ can transmit data at high speeds (up to 2 Mbps) over short distances, making it ideal for remote control cars, wireless sensor networks, and smart home devices.

> [!CAUTION]
> **Voltage Warning:** The nRF24L01+ module requires **3.3V power**. Connecting its VCC pin to 5V will permanently damage the chip! (The logic pins are 5V tolerant, but the power pin is strictly 3.3V).

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">GND</span></td><td><span class="pin-type power">power</span></td><td>Ground. Connect to Arduino GND.</td></tr>
<tr><td><span class="pin-name">VCC</span></td><td><span class="pin-type power">power</span></td><td>3.3V Power Supply. (DO NOT CONNECT TO 5V).</td></tr>
<tr><td><span class="pin-name">CE</span></td><td><span class="pin-type digital">digital</span></td><td>Chip Enable. Used to activate RX or TX mode. Connect to Arduino D7 (or any digital pin).</td></tr>
<tr><td><span class="pin-name">CSN</span></td><td><span class="pin-type digital">digital</span></td><td>SPI Chip Select. Connect to Arduino D8 (or any digital pin).</td></tr>
<tr><td><span class="pin-name">SCK</span></td><td><span class="pin-type digital">digital</span></td><td>SPI Clock. Connect to Arduino D13.</td></tr>
<tr><td><span class="pin-name">MOSI</span></td><td><span class="pin-type digital">digital</span></td><td>SPI Master Out Slave In. Connect to Arduino D11.</td></tr>
<tr><td><span class="pin-name">MISO</span></td><td><span class="pin-type digital">digital</span></td><td>SPI Master In Slave Out. Connect to Arduino D12.</td></tr>
<tr><td><span class="pin-name">IRQ</span></td><td><span class="pin-type digital">digital</span></td><td>Interrupt Request. Can optionally trigger when data is sent/received.</td></tr>
</table>

## Configurable Attributes
<table class="attrs-table">
<tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr>
<tr><td><strong>magicInterop</strong></td><td><code>boolean</code></td><td><code>false</code></td><td>When enabled in the simulator, allows automatic bridging of data streams without configuring exact pipe addresses.</td></tr>
</table>

## Wiring Diagram (Arduino Uno)
1. Connect **VCC** to **3.3V**.
2. Connect **GND** to **GND**.
3. Connect **CE** to **D7**.
4. Connect **CSN** to **D8**.
5. Connect **SCK** to **D13**.
6. Connect **MOSI** to **D11**.
7. Connect **MISO** to **D12**.

## Example Arduino Code
Install the `RF24` library by TMRh20 before running. This example sets up a simple transmitter.

```cpp
#include <SPI.h>
#include <nRF24L01.h>
#include <RF24.h>

// CE, CSN pins
RF24 radio(7, 8); 
const byte address[6] = "00001";

void setup() {
  Serial.begin(9600);
  
  if (!radio.begin()) {
    Serial.println("nRF24L01 not responding!");
    while (1);
  }
  
  // Set the address we are transmitting to
  radio.openWritingPipe(address);
  
  // Set the PA Level low for testing close together
  radio.setPALevel(RF24_PA_MIN);
  
  // Set the module as transmitter
  radio.stopListening();
  
  Serial.println("nRF24 Transmitter Ready.");
}

void loop() {
  const char text[] = "Hello World";
  
  // Send data
  if (radio.write(&text, sizeof(text))) {
    Serial.println("Message Sent successfully.");
  } else {
    Serial.println("Message Failed.");
  }
  
  delay(1000);
}
```

## Simulation Notes
- In the OpenHW Simulator, you need at least two Arduinos (each with an nRF24L01+) to demonstrate communication. One must be set as a transmitter (`stopListening`) and the other as a receiver (`startListening`).
- Ensure both modules are configured to the same pipe address.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-nlsf595" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: NLSF595</a>
  </div>
  <div>
    <a href="/docs/components/openhw-photoresistor" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: Photoresistor (LDR) &rarr;</a>
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
