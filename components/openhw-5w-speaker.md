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
      <circle cx="60" cy="60" r="50" fill="#1e293b" stroke="#334155" stroke-width="4" />
      <circle cx="60" cy="60" r="40" fill="#0f172a" stroke="#1e293b" stroke-width="2" />
      <circle cx="60" cy="60" r="15" fill="#334155" stroke="#475569" stroke-width="2" />
      <rect x="35" y="105" width="20" height="10" fill="#ef4444" />
      <rect x="65" y="105" width="20" height="10" fill="#000000" />
    </svg>
    <span style="font-size:11px;color:#4a5568;">5W Speaker</span>
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
