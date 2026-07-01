---
title: "CC1101 Transceiver"
description: "A low-power sub-1 GHz wireless transceiver module commonly used for 433MHz RF communication."
slug: /components/openhw-cc1101
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Logic%20Components">Logic Components</a> &gt; 
  <span>CC1101 Transceiver</span>
</div>

# CC1101 Transceiver
<p class="subtitle">A versatile sub-1 GHz wireless transceiver module that allows microcontrollers to communicate wirelessly over long distances.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <rect x="25" y="25" width="70" height="70" rx="4" fill="#065f46" stroke="#047857" stroke-width="2" />
      <rect x="45" y="45" width="30" height="30" rx="2" fill="#1e293b" />
      <path d="M 60 45 L 60 10" stroke="#f59e0b" stroke-width="4" stroke-linecap="round" />
      <path d="M 50 15 Q 60 5 70 15" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" />
      <path d="M 45 25 Q 60 10 75 25" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" opacity="0.6" />
      <circle cx="35" cy="85" r="2" fill="#eab308" />
      <circle cx="45" cy="85" r="2" fill="#eab308" />
      <circle cx="55" cy="85" r="2" fill="#eab308" />
      <circle cx="65" cy="85" r="2" fill="#eab308" />
      <circle cx="75" cy="85" r="2" fill="#eab308" />
      <circle cx="85" cy="85" r="2" fill="#eab308" />
      <text x="60" y="75" fill="#ffffff" font-family="monospace" font-size="8" font-weight="bold" text-anchor="middle">CC1101</text>
    </svg>
    <span style="font-size:11px;color:#4a5568;">RF Module</span>
  </div>
  <div class="component-info">
    <p>The CC1101 is a highly configurable radio transceiver designed for very low-power wireless applications. It typically operates in the 433 MHz or 868/915 MHz ISM bands, making it excellent for home automation, garage door openers, and custom remote controls.</p>
    <div>
      <span class="tag">Logic Components</span>
      <span class="tag">Wireless</span>
      <span class="tag">RF</span>
    </div>
  </div>
</div>

## Overview
Because the CC1101 uses sub-1 GHz frequencies (unlike Wi-Fi or Bluetooth which use 2.4 GHz), it offers significantly better wall-penetration and range, though at much lower data rates. It communicates with the Arduino via the SPI bus.

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">VCC</span></td><td><span class="pin-type power">power</span></td><td>Power supply. MUST be 3.3V. Do not connect to 5V!</td></tr>
<tr><td><span class="pin-name">GND</span></td><td><span class="pin-type power">power</span></td><td>Ground connection.</td></tr>
<tr><td><span class="pin-name">MOSI</span></td><td><span class="pin-type digital">digital</span></td><td>SPI Master Out Slave In. Connect to Arduino D11.</td></tr>
<tr><td><span class="pin-name">SCK</span></td><td><span class="pin-type digital">digital</span></td><td>SPI Clock. Connect to Arduino D13.</td></tr>
<tr><td><span class="pin-name">MISO</span></td><td><span class="pin-type digital">digital</span></td><td>SPI Master In Slave Out. Connect to Arduino D12.</td></tr>
<tr><td><span class="pin-name">CSN</span></td><td><span class="pin-type digital">digital</span></td><td>SPI Chip Select. Connect to Arduino D10.</td></tr>
<tr><td><span class="pin-name">GDO0</span></td><td><span class="pin-type digital">digital</span></td><td>General Digital Output 0. Often used for hardware interrupts (e.g., D2).</td></tr>
<tr><td><span class="pin-name">GDO2</span></td><td><span class="pin-type digital">digital</span></td><td>General Digital Output 2. Optional interrupt pin.</td></tr>
</table>

## Configurable Attributes
<table class="attrs-table">
<tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr>
<tr><td><strong>magicInterop</strong></td><td><code>boolean</code></td><td><code>false</code></td><td>When true in the simulator, allows the CC1101 to transparently capture basic RF packets from generic 433MHz remotes even without strict protocol matching.</td></tr>
</table>

## Working Principle
The module requires you to configure its registers via SPI before it can transmit or receive. You must specify the exact frequency, modulation scheme (e.g., ASK, FSK, OOK), and baud rate. Once configured, you can strobe the `TX` or `RX` commands to send or listen for data arrays over the air.

## Wiring Diagram
1. Connect **VCC** to 3.3V and **GND** to GND. *(Note: Using a 5V Arduino? Ensure your logic lines are level-shifted or verified to be 5V-tolerant, though many users risk direct connection for short-term prototyping).*
2. Connect **MOSI** to D11.
3. Connect **MISO** to D12.
4. Connect **SCK** to D13.
5. Connect **CSN** to D10.
6. Connect **GDO0** to D2 (useful for receiving data asynchronously via interrupts).

## Example Arduino Code
*This example uses the common ELECHOUSE CC1101 library.*

```cpp
#include <SPI.h>
#include <ELECHOUSE_cc1101.h>

void setup() {
  Serial.begin(9600);
  
  // Initialize and configure the radio
  ELECHOUSE_cc1101.Init();
  ELECHOUSE_cc1101.setCCMode(1);
  ELECHOUSE_cc1101.setModulation(0); // 2-FSK
  ELECHOUSE_cc1101.setMHZ(433.92);   // Standard 433MHz
  ELECHOUSE_cc1101.setSyncMode(2);
  ELECHOUSE_cc1101.Crc(1);
}

void loop() {
  // Transmit a message
  byte txBuffer[] = {0x48, 0x65, 0x6C, 0x6C, 0x6F}; // "Hello"
  ELECHOUSE_cc1101.SendData(txBuffer, 5);
  Serial.println("Transmitting: Hello");
  
  delay(1000);
  
  // Check for incoming messages
  if (ELECHOUSE_cc1101.CheckReceiveFlag()) {
    byte rxBuffer[61] = {0};
    int len = ELECHOUSE_cc1101.ReceiveData(rxBuffer);
    rxBuffer[len] = '\0';
    Serial.print("Received: ");
    Serial.println((char*)rxBuffer);
  }
  
  delay(1000);
}
```

## Simulation Notes
- In the simulator, RF modules broadcast messages globally across the simulated environment to any other matching RF modules tuned to the same frequency.
- The `magicInterop` attribute is useful if you are trying to intercept signals from a simulated standard RF Remote component.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-buzzer" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: Buzzer</a>
  </div>
  <div>
    <a href="/docs/components/openhw-charger" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: Charger Module &rarr;</a>
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
