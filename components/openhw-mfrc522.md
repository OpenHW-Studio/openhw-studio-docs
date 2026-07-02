---
title: "MFRC522 RFID Reader"
description: "A 13.56MHz RFID reader module capable of reading Mifare Classic cards and keyfobs."
slug: /components/openhw-mfrc522
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Sensors">Sensors</a> &gt; 
  <span>MFRC522 RFID Reader</span>
</div>

# MFRC522 RFID Reader
<p class="subtitle">A popular SPI-based module for reading and writing 13.56MHz contactless smart cards and tags.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <img src="/images/components/openhw-mfrc522.svg" alt="MFRC522 RFID Reader" style="width:165px; height:135px; max-width: 165px; max-height: 135px" />
    <span style="font-size:11px;color:var(--vp-c-text-2);">RC522</span>
  </div>
  <div class="component-info">
    <p>The MFRC522 communicates over SPI and reads the unique UID from Mifare Classic RFID cards and key fobs. Each card has a different UID that your sketch can use to grant or deny access. In OpenHW Studio, right-click the component during simulation to configure card presence and edit the UID.</p>
    <div>
      <span class="tag">Sensors</span>
      <span class="tag">RFID</span>
      <span class="tag">SPI</span>
    </div>
  </div>
</div>

## Overview
Radio Frequency Identification (RFID) uses electromagnetic fields to automatically identify and track tags attached to objects. The MFRC522 operates at 13.56 MHz.

> [!CAUTION]
> **Voltage Warning:** The MFRC522 requires **3.3V power**. Connecting its VCC pin to 5V will permanently damage the chip! (The logic pins are generally 5V tolerant, but the power pin is not).

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">3V3</span></td><td><span class="pin-type power">power</span></td><td>Power Supply (3.3V ONLY).</td></tr>
<tr><td><span class="pin-name">RST</span></td><td><span class="pin-type digital">digital</span></td><td>Reset Pin. Connect to Arduino D9.</td></tr>
<tr><td><span class="pin-name">GND</span></td><td><span class="pin-type power">power</span></td><td>Ground. Connect to Arduino GND.</td></tr>
<tr><td><span class="pin-name">IRQ</span></td><td><span class="pin-type digital">digital</span></td><td>Interrupt Request. Usually left unconnected.</td></tr>
<tr><td><span class="pin-name">MISO</span></td><td><span class="pin-type digital">digital</span></td><td>SPI Master In Slave Out. Connect to Arduino D12.</td></tr>
<tr><td><span class="pin-name">MOSI</span></td><td><span class="pin-type digital">digital</span></td><td>SPI Master Out Slave In. Connect to Arduino D11.</td></tr>
<tr><td><span class="pin-name">SCK</span></td><td><span class="pin-type digital">digital</span></td><td>SPI Clock. Connect to Arduino D13.</td></tr>
<tr><td><span class="pin-name">SDA</span></td><td><span class="pin-type digital">digital</span></td><td>SPI Chip Select (SS). Connect to Arduino D10.</td></tr>
</table>

## Configurable Attributes
<table class="attrs-table">
<tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr>
<tr><td><strong>cardUID</strong></td><td><code>string</code></td><td><code>DE AD BE EF</code></td><td>The UID returned when a card is presented. Format as space-separated hex bytes.</td></tr>
<tr><td><strong>cardPresent</strong></td><td><code>boolean</code></td><td><code>false</code></td><td>Toggle card presence during simulation. You can also do this via the right-click menu.</td></tr>
</table>

## Wiring Diagram (Arduino Uno)
1. Connect **3V3** to Arduino **3.3V** (NOT 5V).
2. Connect **GND** to Arduino **GND**.
3. Connect **RST** to Arduino **D9**.
4. Connect **SDA** to Arduino **D10**.
5. Connect **MOSI** to Arduino **D11**.
6. Connect **MISO** to Arduino **D12**.
7. Connect **SCK** to Arduino **D13**.

<p align="center">
  <img src="/images/components/openhw-mfrc522_wiring.png" alt="Wiring Diagram" style="max-width: 100%; border-radius: 8px; margin: 20px 0;" />
</p>

<TryInSimulator />

## Example Arduino Code
Install the `MFRC522` library by GithubCommunity before running this code.

```cpp
#include <SPI.h>
#include <MFRC522.h>

#define RST_PIN  9
#define SS_PIN   10

MFRC522 rfid(SS_PIN, RST_PIN);

void setup() {
  Serial.begin(9600);
  SPI.begin();
  
  // Initialize the MFRC522 module
  rfid.PCD_Init();
  
  Serial.println("Hold card near reader...");
}

void loop() {
  // Look for new cards
  if (!rfid.PICC_IsNewCardPresent()) {
    return;
  }
  
  // Select one of the cards
  if (!rfid.PICC_ReadCardSerial()) {
    return;
  }
  
  // Print the UID
  Serial.print("UID:");
  for (byte i = 0; i < rfid.uid.size; i++) {
    Serial.print(rfid.uid.uidByte[i] < 0x10 ? " 0" : " ");
    Serial.print(rfid.uid.uidByte[i], HEX);
  }
  Serial.println();
  
  // Halt PICC to stop reading the same card repeatedly
  rfid.PICC_HaltA();
}
```

## Simulation Notes
- In OpenHW Studio, right-click the component during simulation to configure card presence and edit the UID. A glowing ripple animation on the module indicates when a card is actively being detected.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-membrane-keypad" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: Membrane Keypad</a>
  </div>
  <div>
    <a href="/docs/components/openhw-motor-driver" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: Motor Driver (L298N) &rarr;</a>
  </div>
</div>
