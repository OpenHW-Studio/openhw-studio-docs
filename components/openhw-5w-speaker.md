---
title: "5W Audio Speaker"
description: "A standard 5W audio speaker for outputting sound, music, and tones in your circuits."
slug: /components/openhw-5w-speaker
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Actuators">Actuators</a> &gt; 
  <span>5W Audio Speaker</span>
</div>

# 5W Audio Speaker
<p class="subtitle">A basic 5W electromagnetic speaker used to convert electrical audio signals into sound waves.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="50" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-border)" stroke-width="4" />
      <circle cx="60" cy="60" r="40" fill="#0f172a" stroke="#1e293b" stroke-width="2" />
      <circle cx="60" cy="60" r="15" fill="#334155" stroke="#475569" stroke-width="2" />
      <rect x="35" y="105" width="20" height="10" fill="#ef4444" />
      <rect x="65" y="105" width="20" height="10" fill="#000000" />
    </svg>
    <span style="font-size:11px;color:var(--vp-c-text-2);">5W Speaker</span>
  </div>
  <div class="component-info">
    <p>This component simulates a standard 5-watt electromagnetic speaker. It is typically driven by an audio amplifier (like the MAX98357 I2S DAC) rather than directly from a microcontroller pin to produce rich audio or tones.</p>
    <div>
      <span class="tag">Actuators</span>
      <span class="tag">Audio</span>
      <span class="tag">Analog Output</span>
    </div>
  </div>
</div>

## Overview
Speakers are the primary method of generating audio feedback, music, or speech in electronics projects. Because microcontrollers cannot output enough current to drive a 5W speaker directly, you must use an amplifier circuit in between.

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">IN+</span></td><td><span class="pin-type analog">analog</span></td><td>Positive audio input terminal. Connect to amplifier output (+).</td></tr>
<tr><td><span class="pin-name">IN-</span></td><td><span class="pin-type analog">analog</span></td><td>Negative audio input terminal. Connect to amplifier output (-).</td></tr>
</table>

## Configurable Attributes
*This basic speaker currently has no configurable attributes in the simulator.*

## Working Principle
A speaker consists of a permanent magnet and an electromagnet (voice coil) attached to a flexible cone. When alternating current (your audio signal) passes through the voice coil, it creates a fluctuating magnetic field. This field pushes and pulls against the permanent magnet, vibrating the cone and creating sound waves.

## Wiring Diagram
1. Connect the **IN+** pin of the speaker to the positive output terminal of your audio amplifier (e.g., MAX98357).
2. Connect the **IN-** pin of the speaker to the negative output terminal of your audio amplifier.
3. Do not connect the speaker directly to a microcontroller digital pin; it may draw too much current and damage the pin.

## Example Arduino Code
In the simulator, the speaker is typically driven by the MAX98357 I2S DAC, which receives I2S digital audio from an ESP32.

```cpp
#include "Audio.h" // Requires ESP8266Audio library

Audio audio;

void setup() {
  Serial.begin(115200);
  
  // Set up I2S audio output
  audio.setPinout(26, 25, 22); // BCLK, LRC, DOUT for MAX98357
  audio.setVolume(15);
  
  // Connect to a streaming internet radio station
  audio.connecttohost("http://stream.radioreklama.bg/radio1.mp3");
}

void loop() {
  // Process the audio stream constantly
  audio.loop();
}
```

## Simulation Notes
- To hear audio output from the speaker in the simulator, ensure your browser has permission to play audio.
- The speaker in the simulator will visually vibrate when audio is actively being played.

## Notes / Warnings
- **Real-World Warning:** Driving a 5W speaker directly from a 3.3V or 5V logic pin will quickly burn out the microcontroller pin due to overcurrent. Always use an appropriate amplifier.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/logic-mux-2to1" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: 2-to-1 Multiplexer</a>
  </div>
  <div>
    <a href="/docs/components/openhw-a4988" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: A4988 Stepper Driver &rarr;</a>
  </div>
</div>
