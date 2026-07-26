---
title: "MicroSD Card Module"
description: "A data logging and storage module using SPI communication."
slug: /components/openhw-sd-card
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Storage">Storage</a> &gt; 
  <span>MicroSD Card Module</span>
</div>

# MicroSD Card Module
<p class="subtitle">A module for reading and writing data to a standard MicroSD card via SPI.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <img src="/images/components/openhw-sd-card.svg" alt="MicroSD Card Module" style="width:100px; height:120px; max-width: 100px; max-height: 120px" />
    <span style="font-size:11px;color:var(--vp-c-text-2);">MicroSD SPI</span>
  </div>
  <div class="component-info">
    <p>The MicroSD Card Module allows your microcontroller to easily read from and write to MicroSD memory cards. It uses the SPI protocol for communication and is ideal for data logging applications, reading configuration files, or serving web pages over a network.</p>
    <div>
      <span class="tag">Storage</span>
      <span class="tag">SPI</span>
      <span class="tag">Digital</span>
    </div>
  </div>
</div>

## Overview
Because it communicates over SPI, the SD Card module requires 4 data lines (MISO, MOSI, SCK, CS) plus power and ground. The module often includes an onboard voltage regulator and level shifter, meaning it can safely interface with a 5V Arduino Uno even though SD cards operate at 3.3V.

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">CD</span></td><td><span class="pin-type digital">digital</span></td><td>Card Detect. (Optional) Goes LOW when a card is inserted.</td></tr>
<tr><td><span class="pin-name">DO</span></td><td><span class="pin-type digital">digital</span></td><td>SPI MISO (Master In Slave Out). Connect to Arduino D12.</td></tr>
<tr><td><span class="pin-name">GND</span></td><td><span class="pin-type power">power</span></td><td>Ground. Connect to Arduino GND.</td></tr>
<tr><td><span class="pin-name">SCK</span></td><td><span class="pin-type digital">digital</span></td><td>SPI Clock. Connect to Arduino D13.</td></tr>
<tr><td><span class="pin-name">VCC</span></td><td><span class="pin-type power">power</span></td><td>Power input. Connect to Arduino 5V.</td></tr>
<tr><td><span class="pin-name">DI</span></td><td><span class="pin-type digital">digital</span></td><td>SPI MOSI (Master Out Slave In). Connect to Arduino D11.</td></tr>
<tr><td><span class="pin-name">CS</span></td><td><span class="pin-type digital">digital</span></td><td>SPI Chip Select. Connect to Arduino D10 (or any digital pin).</td></tr>
</table>

## Configurable Attributes
*(No configurable attributes are currently exposed for this component in the simulator. It behaves as an inserted, formatted FAT32 drive.)*

## Wiring Diagram (Arduino Uno)
The SPI pins on the Arduino Uno are hardwired to specific pins (11, 12, 13). The CS (Chip Select) pin can technically be any digital pin, but standard libraries use pin 10 or 4 by default.

1. Connect **VCC** to Arduino **5V**.
2. Connect **GND** to Arduino **GND**.
3. Connect **DI (MOSI)** to Arduino **D11**.
4. Connect **DO (MISO)** to Arduino **D12**.
5. Connect **SCK (Clock)** to Arduino **D13**.
6. Connect **CS (Chip Select)** to Arduino **D10**.
7. Connect **CD (Card Detect)** to Arduino **D2** (Optional, for interrupt-based detection).

<p align="center">
  <img src="/images/components/openhw-sd-card_wiring.png" alt="Wiring Diagram" style="max-width: 100%; border-radius: 8px; margin: 20px 0;" />
</p>

<TryInSimulator />

## Example Arduino Code
This sketch uses the built-in Arduino `SD` library to initialize the card and create a simple `test.txt` file.

```cpp
#include <SPI.h>
#include <SD.h>

const int chipSelect = 10;

void setup() {
  Serial.begin(9600);
  while (!Serial) { ; } // wait for serial port to connect

  Serial.print("Initializing SD card...");

  // Initialize the SD card
  if (!SD.begin(chipSelect)) {
    Serial.println("initialization failed!");
    return;
  }
  Serial.println("initialization done.");

  // Open the file. Note that only one file can be open at a time
  File dataFile = SD.open("test.txt", FILE_WRITE);

  // If the file is available, write to it:
  if (dataFile) {
    dataFile.println("Hello from OpenHW Studio!");
    dataFile.close();
    Serial.println("Successfully wrote to test.txt");
  } else {
    // If the file isn't open, pop up an error:
    Serial.println("error opening test.txt");
  }
}

void loop() {
  // Nothing to do here
}
```

## Simulation Notes
- In OpenHW Studio, the SD card is simulated as a virtual filesystem. 
- You can write and read files from the simulated card using the standard Arduino SD library, just like physical hardware.
- The virtual SD card resets its contents when the simulation restarts, unless persistent storage is enabled in your project settings.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-relay-module" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: Relay Module</a>
  </div>
  <div>
    <a href="/docs/components/openhw-servo-motor" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: Servo Motor &rarr;</a>
  </div>
</div>
