---
title: "MAX98357 I2S Amp"
description: "A class D audio amplifier that receives digital I2S audio data and drives a speaker directly."
slug: /components/openhw-max98357
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Actuators">Actuators</a> &gt; 
  <span>MAX98357 I2S Amp</span>
</div>

# MAX98357 I2S Amp
<p class="subtitle">A digital-to-analog converter (DAC) and class D amplifier combined into one module, using the I2S digital audio standard.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="80" height="120" viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="60" height="100" rx="3" fill="#831843" stroke="#4c0519" stroke-width="2" />
      <rect x="25" y="40" width="30" height="30" rx="2" fill="#0f172a" />
      <circle cx="30" cy="45" r="2" fill="#334155" />
      <circle cx="20" cy="20" r="4" fill="#cbd5e1" stroke="#64748b" stroke-width="1" />
      <circle cx="60" cy="20" r="4" fill="#cbd5e1" stroke="#64748b" stroke-width="1" />
      <circle cx="20" cy="100" r="4" fill="#cbd5e1" stroke="#64748b" stroke-width="1" />
      <circle cx="60" cy="100" r="4" fill="#cbd5e1" stroke="#64748b" stroke-width="1" />
      <rect x="25" y="10" width="10" height="5" fill="#f59e0b" />
      <rect x="45" y="10" width="10" height="5" fill="#f59e0b" />
      <text x="30" y="30" fill="#f8fafc" font-family="monospace" font-size="8" text-anchor="middle">OUT+</text>
      <text x="50" y="30" fill="#f8fafc" font-family="monospace" font-size="8" text-anchor="middle">OUT-</text>
      <rect x="15" y="105" width="4" height="5" fill="#cbd5e1" />
      <rect x="23" y="105" width="4" height="5" fill="#cbd5e1" />
      <rect x="31" y="105" width="4" height="5" fill="#cbd5e1" />
      <rect x="39" y="105" width="4" height="5" fill="#cbd5e1" />
      <rect x="47" y="105" width="4" height="5" fill="#cbd5e1" />
      <rect x="55" y="105" width="4" height="5" fill="#cbd5e1" />
      <rect x="63" y="105" width="4" height="5" fill="#cbd5e1" />
      <text x="17" y="95" fill="#f8fafc" font-family="monospace" font-size="7" font-weight="bold" text-anchor="middle" transform="rotate(-90, 17, 95)">LRC</text>
      <text x="25" y="95" fill="#f8fafc" font-family="monospace" font-size="7" font-weight="bold" text-anchor="middle" transform="rotate(-90, 25, 95)">BCLK</text>
      <text x="33" y="95" fill="#f8fafc" font-family="monospace" font-size="7" font-weight="bold" text-anchor="middle" transform="rotate(-90, 33, 95)">DIN</text>
      <text x="41" y="95" fill="#f8fafc" font-family="monospace" font-size="7" font-weight="bold" text-anchor="middle" transform="rotate(-90, 41, 95)">GAIN</text>
      <text x="49" y="95" fill="#f8fafc" font-family="monospace" font-size="7" font-weight="bold" text-anchor="middle" transform="rotate(-90, 49, 95)">SD</text>
      <text x="57" y="95" fill="#f8fafc" font-family="monospace" font-size="7" font-weight="bold" text-anchor="middle" transform="rotate(-90, 57, 95)">GND</text>
      <text x="65" y="95" fill="#f8fafc" font-family="monospace" font-size="7" font-weight="bold" text-anchor="middle" transform="rotate(-90, 65, 95)">VIN</text>
    </svg>
    <span style="font-size:11px;color:#4a5568;">MAX98357A</span>
  </div>
  <div class="component-info">
    <p>Unlike simple buzzers or analog amplifiers, the MAX98357A accepts a pure digital I2S audio stream. It converts this digital stream internally to analog and amplifies it to drive a 4Ω to 8Ω speaker directly, providing much cleaner audio than PWM-based approaches.</p>
    <div>
      <span class="tag">Actuators</span>
      <span class="tag">Audio</span>
      <span class="tag">I2S</span>
    </div>
  </div>
</div>

## Overview
I2S (Inter-IC Sound) is a standardized serial bus used for connecting digital audio devices. It is completely different from I2C. The ESP32 and other advanced microcontrollers have dedicated I2S hardware peripherals that can stream high-quality audio files directly to this module.

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">LRC</span></td><td><span class="pin-type input">input</span></td><td>Left/Right Clock (Word Select). Tells the DAC whether the current data is for the left or right channel.</td></tr>
<tr><td><span class="pin-name">BCLK</span></td><td><span class="pin-type input">input</span></td><td>Bit Clock. The clock signal that synchronizes the data bits.</td></tr>
<tr><td><span class="pin-name">DIN</span></td><td><span class="pin-type input">input</span></td><td>Data In. The actual digital audio data stream.</td></tr>
<tr><td><span class="pin-name">GAIN</span></td><td><span class="pin-type analog">analog</span></td><td>Gain Select. Leaves floating for 9dB gain. Connect to GND for 12dB.</td></tr>
<tr><td><span class="pin-name">SD</span></td><td><span class="pin-type input">input</span></td><td>Shutdown / Channel Select. Used to configure mono mixing or shut down the amp.</td></tr>
<tr><td><span class="pin-name">GND</span></td><td><span class="pin-type power">power</span></td><td>Ground.</td></tr>
<tr><td><span class="pin-name">VIN</span></td><td><span class="pin-type power">power</span></td><td>Power Supply (2.5V - 5.5V). Connect to 3.3V or 5V.</td></tr>
<tr><td><span class="pin-name">OUT+</span></td><td><span class="pin-type output">output</span></td><td>Positive terminal for speaker connection.</td></tr>
<tr><td><span class="pin-name">OUT-</span></td><td><span class="pin-type output">output</span></td><td>Negative terminal for speaker connection.</td></tr>
</table>

## Configurable Attributes
*This component has no standard configurable attributes.*

## Wiring Diagram (ESP32 Example)
1. Connect **VIN** to ESP32 5V (or 3.3V).
2. Connect **GND** to ESP32 GND.
3. Connect **LRC** to ESP32 GPIO 25.
4. Connect **BCLK** to ESP32 GPIO 26.
5. Connect **DIN** to ESP32 GPIO 22.
6. Connect **OUT+** and **OUT-** to a speaker.

## Example Arduino Code (ESP32)
This example uses the ESP32's built-in I2S driver to stream a basic sine wave or read from an SD card.

```cpp
#include <driver/i2s.h>

// I2S Pins
#define I2S_BCLK 26
#define I2S_LRC  25
#define I2S_DOUT 22

void setup() {
  Serial.begin(115200);

  // Configure I2S peripheral
  i2s_config_t i2s_config = {
    .mode = (i2s_mode_t)(I2S_MODE_MASTER | I2S_MODE_TX),
    .sample_rate = 44100,
    .bits_per_sample = I2S_BITS_PER_SAMPLE_16BIT,
    .channel_format = I2S_CHANNEL_FMT_ONLY_LEFT,
    .communication_format = I2S_COMM_FORMAT_STAND_I2S,
    .intr_alloc_flags = ESP_INTR_FLAG_LEVEL1,
    .dma_buf_count = 8,
    .dma_buf_len = 64,
    .use_apll = false
  };

  i2s_pin_config_t pin_config = {
    .bck_io_num = I2S_BCLK,
    .ws_io_num = I2S_LRC,
    .data_out_num = I2S_DOUT,
    .data_in_num = I2S_PIN_NO_CHANGE
  };

  i2s_driver_install(I2S_NUM_0, &i2s_config, 0, NULL);
  i2s_set_pin(I2S_NUM_0, &pin_config);
  i2s_set_clk(I2S_NUM_0, 44100, I2S_BITS_PER_SAMPLE_16BIT, I2S_CHANNEL_MONO);
}

void loop() {
  // Generate a simple square wave tone manually for demonstration
  int16_t sample = 10000;
  size_t bytes_written;
  
  for (int i = 0; i < 50; i++) {
    i2s_write(I2S_NUM_0, &sample, sizeof(sample), &bytes_written, portMAX_DELAY);
  }
  
  sample = -10000;
  for (int i = 0; i < 50; i++) {
    i2s_write(I2S_NUM_0, &sample, sizeof(sample), &bytes_written, portMAX_DELAY);
  }
}
```

## Simulation Notes
- Audio playback inside the simulator depends on your browser's audio policies. You may need to interact with the canvas (click a button) before sound is allowed to play.
- Performance varies based on how demanding the I2S decoding is; ESP32 is generally required for smooth audio emulation.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-max7219" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: MAX7219 Dot Matrix</a>
  </div>
  <div>
    <a href="/docs/components/openhw-membrane-keypad" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: Membrane Keypad &rarr;</a>
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
.pin-type.output { background: #4a1c40; color: #ed64a6; }
.pin-type.default { background: #2d3748; color: #a0aec0; }
.circuit-preview { background: #0d1117; border: 1px solid #2d3748; border-radius: 8px; padding: 20px; margin-top: 16px; display: flex; align-items: center; justify-content: center; min-height: 140px; }
:root { --vp-c-bg: #0f1117; }
@media (max-width: 640px) { .component-preview { flex-direction: column; align-items: center; } }
</style>
