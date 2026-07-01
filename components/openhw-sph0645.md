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
      <rect x="10" y="10" width="40" height="50" rx="3" fill="var(--vp-c-bg-soft)" />
      <circle cx="30" cy="35" r="8" fill="#0f172a" />
      <circle cx="30" cy="35" r="3" fill="#334155" />
      <text x="30" y="55" fill="var(--vp-c-text-2)" font-family="monospace" font-size="7" text-anchor="middle">SPH0645</text>
      <rect x="13" y="60" width="3" height="15" fill="var(--vp-c-text-2)" />
      <rect x="19" y="60" width="3" height="15" fill="var(--vp-c-text-2)" />
      <rect x="25" y="60" width="3" height="15" fill="var(--vp-c-text-2)" />
      <rect x="32" y="60" width="3" height="15" fill="var(--vp-c-text-2)" />
      <rect x="38" y="60" width="3" height="15" fill="var(--vp-c-text-2)" />
      <rect x="44" y="60" width="3" height="15" fill="var(--vp-c-text-2)" />
    </svg>
    <span style="font-size:11px;color:var(--vp-c-text-2);">I2S Mic</span>
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
