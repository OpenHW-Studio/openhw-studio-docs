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
    <img src="/images/components/openhw-cc1101.svg" alt="CC1101" style="width:150px; height:75px;" />
    <span style="font-size:11px;color:var(--vp-c-text-2);">RF Module</span>
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

Example of wiring the CC1101 module to a microcontroller via SPI.

<p align="center">
  <img src="/images/components/openhw-cc1101_wiring.png" alt="Wiring Diagram" style="max-width: 100%; border-radius: 8px; margin: 20px 0;" />
</p>

<TryInSimulator />

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
