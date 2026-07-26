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
    <img src="/images/components/openhw-max98357.svg" alt="MAX98357 I2S Amp" style="width:75px; height:105px; max-width: 75px; max-height: 105px" />
    <span style="font-size:11px;color:var(--vp-c-text-2);">MAX98357A</span>
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

<p align="center">
  <img src="/images/components/openhw-max98357_wiring.png" alt="Wiring Diagram" style="max-width: 100%; border-radius: 8px; margin: 20px 0;" />
</p>

<TryInSimulator />

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
