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
    <img src="/images/components/openhw-inmp441.svg" alt="INMP441 Microphone" style="width:60px; height:60px; max-width: 120px; max-height: 120px" />
    <span style="font-size:11px;color:var(--vp-c-text-2);">I2S Microphone</span>
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

<p align="center">
  <img src="/images/components/openhw-inmp441_wiring.png" alt="Wiring Diagram" style="max-width: 100%; border-radius: 8px; margin: 20px 0;" />
</p>

<TryInSimulator />

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
