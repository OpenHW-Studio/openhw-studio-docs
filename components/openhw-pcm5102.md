---
title: "PCM5102 I2S DAC"
description: "A high-fidelity I2S digital-to-analog audio converter."
slug: /components/openhw-pcm5102
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Actuators">Actuators</a> &gt; 
  <span>PCM5102 I2S DAC</span>
</div>

# PCM5102 I2S DAC
<p class="subtitle">A high-fidelity stereo Digital-to-Analog Converter module using the I2S protocol.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <img src="/images/components/openhw-pcm5102.svg" alt="PCM5102 I2S DAC" style="width:90px; height:60px; max-width: 90px; max-height: 60px" />
    <span style="font-size:11px;color:var(--vp-c-text-2);">PCM5102 Module</span>
  </div>
  <div class="component-info">
    <p>The PCM5102 module takes a digital audio stream over the I2S (Inter-IC Sound) bus and converts it into a clean, line-level stereo analog signal. It features high signal-to-noise ratio and eliminates the need for an external master clock by automatically generating it internally from the bit clock.</p>
    <div>
      <span class="tag">Actuators</span>
      <span class="tag">Audio</span>
      <span class="tag">I2S</span>
    </div>
  </div>
</div>

## Overview
This module is frequently used alongside advanced microcontrollers like the ESP32 or specialized Audio Shields to play high-quality sound, music, and sound effects. By wiring up the I2S pins (BCK, DIN, LCK), the microcontroller can stream raw PCM audio directly to the DAC.

## Pin Reference

### Power & Ground
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">VCC</span></td><td><span class="pin-type power">power</span></td><td>Power supply. Typically 3.3V or 5V depending on module variant.</td></tr>
<tr><td><span class="pin-name">GND</span></td><td><span class="pin-type power">power</span></td><td>Ground connection.</td></tr>
</table>

### Configuration Pins (Top Header)
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">FLT</span></td><td><span class="pin-type digital">digital</span></td><td>Filter select (Normal / Low Latency). Usually tied to GND or VCC.</td></tr>
<tr><td><span class="pin-name">DMP</span></td><td><span class="pin-type digital">digital</span></td><td>De-emphasis control. Usually tied to GND.</td></tr>
<tr><td><span class="pin-name">XMT</span></td><td><span class="pin-type digital">digital</span></td><td>Mute control. High = Play, Low = Mute. Connect to VCC to unmute.</td></tr>
<tr><td><span class="pin-name">FMT</span></td><td><span class="pin-type digital">digital</span></td><td>Audio format select (I2S vs Left Justified). Usually tied to GND for I2S.</td></tr>
</table>

### I2S Interface & Audio (Bottom Header)
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">SCK</span></td><td><span class="pin-type digital">digital</span></td><td>System Clock. Usually tied to GND as the PCM5102 generates it internally.</td></tr>
<tr><td><span class="pin-name">BCK</span></td><td><span class="pin-type digital">digital</span></td><td>Bit Clock line. Connect to the MCU's I2S BCLK pin.</td></tr>
<tr><td><span class="pin-name">DIN</span></td><td><span class="pin-type digital">digital</span></td><td>Data In line. Connect to the MCU's I2S DOUT pin.</td></tr>
<tr><td><span class="pin-name">LCK</span></td><td><span class="pin-type digital">digital</span></td><td>Left/Right Clock (Word Select). Connect to the MCU's I2S LRC or WS pin.</td></tr>
<tr><td><span class="pin-name">OUTL</span></td><td><span class="pin-type analog">analog</span></td><td>Left channel analog audio output.</td></tr>
<tr><td><span class="pin-name">OUTR</span></td><td><span class="pin-type analog">analog</span></td><td>Right channel analog audio output.</td></tr>
</table>

## Configurable Attributes
<table class="attrs-table">
<tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr>
<tr><td><strong>volume</strong></td><td><code>number</code></td><td><code>100</code></td><td>Simulated playback volume percentage (0-100).</td></tr>
</table>

## Wiring Diagram
A typical I2S wiring setup. Often you also need to bridge `XMT` to `VCC`, and `SCK`, `FMT`, `DMP`, `FLT` to `GND` depending on the specific breakout board requirements.

<p align="center">
  <img src="/images/components/openhw-pcm5102_wiring.png" alt="Wiring Diagram" style="max-width: 100%; border-radius: 8px; margin: 20px 0;" />
</p>

<TryInSimulator />

## Example Arduino Code (ESP32)

Standard Arduinos (like the Uno) do not have native I2S hardware support. Below is an example using the ESP32 to generate a simple sine wave over I2S.

```cpp
#include <I2S.h>

const int sampleRate = 44100;

void setup() {
  Serial.begin(115200);
  
  // Initialize I2S peripheral
  // SCK = 14 (BCK), FS = 15 (LCK/WS), SD = 22 (DIN)
  I2S.begin(I2S_PHILIPS_MODE, sampleRate, 16);
}

void loop() {
  // Generate a simple 440Hz sine wave tone
  for (int i = 0; i < sampleRate; i++) {
    int16_t sample = (int16_t)(32767.0 * sin(2.0 * PI * 440.0 * i / sampleRate));
    
    // Write sample to both left and right channels
    I2S.write(sample);
    I2S.write(sample);
  }
}
```

## Simulation Notes
- The green Activity LED flashes proportionally to the peak amplitude of the incoming simulated audio stream.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-passive-buzzer" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: Passive Buzzer</a>
  </div>
  <div>
    <a href="/docs/components/openhw-photoresistor" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: Photoresistor (LDR) &rarr;</a>
  </div>
</div>
