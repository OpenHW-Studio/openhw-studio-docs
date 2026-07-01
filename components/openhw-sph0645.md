---
title: "SPH0645 I2S Microphone"
description: "A MEMS digital microphone that outputs high-quality audio data over the I2S bus."
slug: /components/openhw-sph0645
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Sensors">Sensors</a> &gt; 
  <span>SPH0645 Microphone</span>
</div>

# SPH0645 I2S Microphone
<p class="subtitle">A tiny, low-power MEMS microphone that converts sound waves directly into a digital I2S audio stream.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="60" height="80" viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="40" height="50" rx="3" fill="#1e293b" />
      <circle cx="30" cy="35" r="8" fill="#0f172a" />
      <circle cx="30" cy="35" r="3" fill="#334155" />
      <text x="30" y="55" fill="#94a3b8" font-family="monospace" font-size="7" text-anchor="middle">SPH0645</text>
      <rect x="13" y="60" width="3" height="15" fill="#cbd5e1" />
      <rect x="19" y="60" width="3" height="15" fill="#cbd5e1" />
      <rect x="25" y="60" width="3" height="15" fill="#cbd5e1" />
      <rect x="32" y="60" width="3" height="15" fill="#cbd5e1" />
      <rect x="38" y="60" width="3" height="15" fill="#cbd5e1" />
      <rect x="44" y="60" width="3" height="15" fill="#cbd5e1" />
    </svg>
    <span style="font-size:11px;color:#4a5568;">I2S Mic</span>
  </div>
  <div class="component-info">
    <p>Unlike standard analog microphones, the SPH0645 outputs a digital I2S signal. This means you don't need a separate ADC on your microcontroller, resulting in much cleaner, noise-free audio recordings. It is ideal for voice recognition, audio recording, and sound reactivity projects.</p>
    <div>
      <span class="tag">Sensors</span>
      <span class="tag">Audio</span>
      <span class="tag">I2S</span>
    </div>
  </div>
</div>

## Overview
The I2S (Inter-IC Sound) bus is a standard for transmitting digital audio between devices. It requires three main lines: Data, Bit Clock (BCLK), and Left/Right Clock (LRCLK or WS). The SPH0645 operates typically at 3.3V logic levels.

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">3V</span></td><td><span class="pin-type power">power</span></td><td>Power Supply (1.62V to 3.6V).</td></tr>
<tr><td><span class="pin-name">GND</span></td><td><span class="pin-type power">power</span></td><td>Ground.</td></tr>
<tr><td><span class="pin-name">BCLK</span></td><td><span class="pin-type digital">digital</span></td><td>Bit Clock (Serial Clock).</td></tr>
<tr><td><span class="pin-name">DOUT</span></td><td><span class="pin-type digital">digital</span></td><td>Serial Data Output.</td></tr>
<tr><td><span class="pin-name">LRCL</span></td><td><span class="pin-type digital">digital</span></td><td>Left/Right Clock (Word Select).</td></tr>
<tr><td><span class="pin-name">SEL</span></td><td><span class="pin-type digital">digital</span></td><td>Channel Select (Left or Right channel).</td></tr>
</table>

## Configurable Attributes
*This component has no configurable attributes.*

## Wiring Diagram (ESP32 Example)
I2S requires a microcontroller with hardware I2S support (like an ESP32 or advanced ARM chips). Standard Arduino Unos do not have hardware I2S.
1. Connect **3V** to ESP32 **3V3**.
2. Connect **GND** to **GND**.
3. Connect **BCLK** to ESP32 **GPIO 14**.
4. Connect **LRCL** to ESP32 **GPIO 15**.
5. Connect **DOUT** to ESP32 **GPIO 32**.
6. Connect **SEL** to **GND** (to select Left channel).

## Example ESP32 Code
This basic snippet initializes the ESP32's I2S peripheral to read from the microphone.

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
    .communication_format = i2s_comm_format_t(I2S_COMM_FORMAT_I2S | I2S_COMM_FORMAT_I2S_MSB),
    .intr_alloc_flags = ESP_INTR_FLAG_LEVEL1,
    .dma_buf_count = 8,
    .dma_buf_len = 64,
    .use_apll = false,
    .tx_desc_auto_clear = false,
    .fixed_mclk = 0
  };

  i2s_pin_config_t pin_config = {
    .bck_io_num = 14,   // BCLK
    .ws_io_num = 15,    // LRCL
    .data_out_num = -1, // Not used
    .data_in_num = 32   // DOUT
  };

  i2s_driver_install(I2S_PORT, &i2s_config, 0, NULL);
  i2s_set_pin(I2S_PORT, &pin_config);
  
  Serial.println("I2S Microphone Ready");
}

void loop() {
  int32_t sample = 0;
  size_t bytesRead = 0;
  
  i2s_read(I2S_PORT, &sample, sizeof(sample), &bytesRead, portMAX_DELAY);
  
  if (bytesRead > 0) {
    // Process audio sample here...
  }
}
```

## Simulation Notes
- In the simulator, providing real audio to the I2S microphone may depend on browser microphone permissions. By default, it will generate a simulated sine wave test tone.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-soil-moisture-sensor" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: Soil Moisture Sensor</a>
  </div>
  <div>
    <a href="/docs/components/openhw-ssd1306-oled" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: SSD1306 OLED Display &rarr;</a>
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
