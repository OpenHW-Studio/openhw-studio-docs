---
title: "I2S MEMS Microphone (SPH0645)"
description: "A high-quality digital audio microphone module using the I2S protocol."
slug: /components/openhw-sph0645
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Audio">Audio</a> &gt; 
  <span>I2S MEMS Microphone</span>
</div>

# I2S MEMS Microphone (SPH0645)
<p class="subtitle">A digital microphone that outputs pristine audio directly over the I2S bus, bypassing analog noise.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <img src="/images/components/openhw-sph0645.svg" alt="I2S MEMS Microphone" style="width:100px; height:120px; max-width: 100px; max-height: 120px" />
    <span style="font-size:11px;color:var(--vp-c-text-2);">SPH0645</span>
  </div>
  <div class="component-info">
    <p>The SPH0645 is a tiny MEMS microphone that includes a built-in analog-to-digital converter (ADC) and an I2S interface. Instead of outputting a messy analog voltage that your microcontroller has to sample, it outputs a clean, digital stream of 24-bit audio data. It's perfect for microcontrollers with hardware I2S support, like the ESP32, Teensy, or Arduino Mega.</p>
    <div>
      <span class="tag">Audio</span>
      <span class="tag">I2S</span>
      <span class="tag">Input</span>
    </div>
  </div>
</div>

## Overview
Because this microphone uses I2S (Inter-IC Sound), it requires three dedicated data pins: Word Select (LRCL / WS), Bit Clock (BCLK), and Data Out (DOUT). The `SEL` pin determines whether the microphone outputs its data on the Left or Right channel of the stereo I2S stream (usually pulled to Ground for Left).

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">3V</span></td><td><span class="pin-type power">power</span></td><td>Power input. Connect to 3.3V.</td></tr>
<tr><td><span class="pin-name">GND</span></td><td><span class="pin-type power">power</span></td><td>Ground. Connect to GND.</td></tr>
<tr><td><span class="pin-name">BCLK</span></td><td><span class="pin-type digital">digital</span></td><td>I2S Bit Clock. Connect to the microcontroller's I2S clock pin.</td></tr>
<tr><td><span class="pin-name">DOUT</span></td><td><span class="pin-type digital">digital</span></td><td>I2S Data Out. Connect to the microcontroller's I2S data input pin.</td></tr>
<tr><td><span class="pin-name">LRCL</span></td><td><span class="pin-type digital">digital</span></td><td>I2S Word Select (Left/Right Clock). Connect to the I2S WS pin.</td></tr>
<tr><td><span class="pin-name">SEL</span></td><td><span class="pin-type digital">digital</span></td><td>Channel Select. Pull to GND for Left channel, or VCC for Right.</td></tr>
</table>

## Configurable Attributes
<table class="attrs-table">
<tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr>
<tr><td><strong>audioFile</strong></td><td><code>string</code></td><td><code>""</code></td><td>A URL to a `.wav` or `.mp3` file to use as the simulated audio source for the microphone.</td></tr>
</table>

## Wiring Diagram (Arduino Mega)
The Arduino Uno does not have hardware I2S, so for this example we are using the Arduino Mega (or typically an ESP32).

1. Connect **3V** to **3.3V**.
2. Connect **GND** to **GND**.
3. Connect **SEL** to **GND** (configuring the mic as the Left channel).
4. Connect **LRCL** to the I2S WS pin.
5. Connect **DOUT** to the I2S Data IN pin.
6. Connect **BCLK** to the I2S Clock pin.

<p align="center">
  <img src="/images/components/openhw-sph0645_wiring.png" alt="Wiring Diagram" style="max-width: 100%; border-radius: 8px; margin: 20px 0;" />
</p>

<TryInSimulator />

## Example Arduino Code
Reading from I2S requires an I2S library (such as the standard `I2S.h` for ESP32/SAMD architectures). Here is a standard configuration block.

```cpp
#include <I2S.h>

void setup() {
  Serial.begin(115200);
  while (!Serial) { ; }

  // Start I2S receiver
  // I2S.begin(mode, sampleRate, bitsPerSample)
  if (!I2S.begin(I2S_PHILIPS_MODE, 16000, 32)) {
    Serial.println("Failed to initialize I2S!");
    while (1); // halt
  }
}

void loop() {
  // Read a 32-bit sample from the I2S bus
  int sample = 0;
  if (I2S.available()) {
    I2S.read(&sample, sizeof(sample));
    
    // Convert 24-bit data to 16-bit by shifting
    sample >>= 14; 
    
    // Print for the Serial Plotter
    Serial.println(sample);
  }
}
```

## Simulation Notes
- The SPH0645 generates a simulated sine wave audio signal over the virtual I2S bus by default.
- You can override the default sine wave by specifying an `audioFile` attribute, which points to a remote audio file to "play" into the microphone.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-sound-sensor" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: Sound Sensor</a>
  </div>
  <div>
    <a href="/docs/components/openhw-stepper-motor" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: Stepper Motor &rarr;</a>
  </div>
</div>
