---
title: "I2S MEMS Microphone (INMP441)"
description: "A high performance, low power, omnidirectional, I2S port MEMS microphone."
slug: /components/openhw-inmp441
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Sensors">Sensors</a> &gt; 
  <span>I2S MEMS Microphone (INMP441)</span>
</div>

# I2S MEMS Microphone (INMP441)
<p class="subtitle">A digital microphone with an I2S interface, providing high signal-to-noise ratio and wide frequency response.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="40" fill="#1e293b" stroke="#0f172a" stroke-width="2" />
      <circle cx="60" cy="60" r="30" fill="#0f172a" />
      <circle cx="60" cy="60" r="5" fill="#facc15" />
      <circle cx="60" cy="60" r="2" fill="#000000" />
      <rect x="35" y="25" width="10" height="4" fill="#cbd5e1" />
      <rect x="55" y="20" width="10" height="4" fill="#cbd5e1" />
      <rect x="75" y="25" width="10" height="4" fill="#cbd5e1" />
      <rect x="35" y="91" width="10" height="4" fill="#cbd5e1" />
      <rect x="55" y="96" width="10" height="4" fill="#cbd5e1" />
      <rect x="75" y="91" width="10" height="4" fill="#cbd5e1" />
      <text x="60" y="80" fill="#94a3b8" font-family="monospace" font-size="8" font-weight="bold" text-anchor="middle">INMP441</text>
    </svg>
    <span style="font-size:11px;color:#4a5568;">I2S Microphone</span>
  </div>
  <div class="component-info">
    <p>Unlike standard analog microphones that require an ADC, the INMP441 outputs a digital I2S audio stream directly. This allows microcontrollers like the ESP32 to record high-quality audio directly from the sensor without noise degradation.</p>
    <div>
      <span class="tag">Sensors</span>
      <span class="tag">Audio</span>
      <span class="tag">I2S</span>
    </div>
  </div>
</div>

## Overview
The I2S (Inter-IC Sound) interface is an electrical serial bus interface standard used for connecting digital audio devices together. The INMP441 requires three data/clock lines to operate, making it ideal for voice recognition or audio recording projects.

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">VDD</span></td><td><span class="pin-type power">power</span></td><td>Power supply (1.8V to 3.3V).</td></tr>
<tr><td><span class="pin-name">GND</span></td><td><span class="pin-type power">power</span></td><td>Ground connection.</td></tr>
<tr><td><span class="pin-name">L/R</span></td><td><span class="pin-type digital">digital</span></td><td>Left/Right Channel Select. Connect to GND for Left, VDD for Right.</td></tr>
<tr><td><span class="pin-name">WS</span></td><td><span class="pin-type digital">digital</span></td><td>Word Select (Left-Right Clock). Indicates the channel currently being transmitted.</td></tr>
<tr><td><span class="pin-name">SCK</span></td><td><span class="pin-type digital">digital</span></td><td>Serial Data Clock.</td></tr>
<tr><td><span class="pin-name">SD</span></td><td><span class="pin-type digital">digital</span></td><td>Serial Data Output. The actual audio bitstream.</td></tr>
</table>

## Configurable Attributes
*This component has no standard configurable attributes in the simulator. The simulator feeds pre-recorded noise or sine waves to emulate audio input.*

## Working Principle
The INMP441 converts sound waves into a continuous stream of digital audio samples. The host microcontroller (e.g., ESP32) generates the `SCK` (clock) and `WS` (word select) signals to read the data from the `SD` pin exactly in sync with the audio sampling rate.

## Wiring Diagram (ESP32)
1. Connect **VDD** to 3.3V and **GND** to Ground.
2. Connect **L/R** to Ground (sets it to the Left channel).
3. Connect **WS** to GPIO 15.
4. Connect **SCK** to GPIO 14.
5. Connect **SD** to GPIO 32.

## Example Arduino Code (ESP32)
This code uses the ESP32's built-in I2S peripheral to read data from the microphone.

```cpp
#include <driver/i2s.h>

const i2s_port_t I2S_PORT = I2S_NUM_0;

void setup() {
  Serial.begin(115200);
  
  i2s_config_t i2s_config = {
    .mode = (i2s_mode_t)(I2S_MODE_MASTER | I2S_MODE_RX),
    .sample_rate = 16000,
    .bits_per_sample = I2S_BITS_PER_SAMPLE_32BIT,
    .channel_format = I2S_CHANNEL_FMT_ONLY_LEFT,
    .communication_format = I2S_COMM_FORMAT_STAND_I2S,
    .intr_alloc_flags = ESP_INTR_FLAG_LEVEL1,
    .dma_buf_count = 8,
    .dma_buf_len = 64,
    .use_apll = false,
    .tx_desc_auto_clear = false,
    .fixed_mclk = 0
  };
  
  i2s_pin_config_t pin_config = {
    .bck_io_num = 14,   // SCK
    .ws_io_num = 15,    // WS
    .data_out_num = I2S_PIN_NO_CHANGE,
    .data_in_num = 32   // SD
  };
  
  i2s_driver_install(I2S_PORT, &i2s_config, 0, NULL);
  i2s_set_pin(I2S_PORT, &pin_config);
  
  Serial.println("I2S Microphone Ready");
}

void loop() {
  int32_t sample = 0;
  size_t bytesRead = 0;
  
  // Read a single 32-bit sample from the microphone
  esp_err_t result = i2s_read(I2S_PORT, &sample, sizeof(int32_t), &bytesRead, portMAX_DELAY);
  
  if (result == ESP_OK && bytesRead > 0) {
    // The data is 24-bit, stored in the upper 24 bits of the 32-bit integer
    sample = sample >> 8; 
    
    // Print it so the Serial Plotter can graph the audio wave
    Serial.println(sample); 
  }
}
```

## Simulation Notes
- Because browsers don't expose raw I2S bitstreams easily, the simulator injects a mathematically generated sine wave into the emulated I2S peripheral of the microcontroller, allowing your code to "hear" audio data.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-ili9341" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: ILI9341 TFT</a>
  </div>
  <div>
    <a href="/docs/components/openhw-ir-receiver" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: IR Receiver &rarr;</a>
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
