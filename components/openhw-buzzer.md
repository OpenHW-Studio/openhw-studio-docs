---
title: "Buzzer"
description: "A piezoelectric buzzer that generates audio tones when driven by PWM or toggled digital signals."
slug: /components/openhw-buzzer
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Actuators">Actuators</a> &gt; 
  <span>Buzzer</span>
</div>

# Buzzer
<p class="subtitle">A passive piezoelectric buzzer that generates audio tones when driven by a rapidly oscillating digital signal.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="50" r="30" fill="var(--vp-c-bg-soft)" stroke="#0f172a" stroke-width="2" />
      <circle cx="60" cy="50" r="10" fill="#0f172a" />
      <path d="M 40 20 Q 60 5 80 20" fill="none" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" />
      <path d="M 30 10 Q 60 -10 90 10" fill="none" stroke="#60a5fa" stroke-width="2" stroke-linecap="round" opacity="0.5" />
      <rect x="45" y="80" width="5" height="20" fill="var(--vp-c-text-2)" />
      <rect x="70" y="80" width="5" height="20" fill="var(--vp-c-text-2)" />
      <text x="47.5" y="115" fill="#ef4444" font-family="monospace" font-size="14" font-weight="bold" text-anchor="middle">+</text>
      <text x="72.5" y="115" fill="#3b82f6" font-family="monospace" font-size="14" font-weight="bold" text-anchor="middle">-</text>
    </svg>
    <span style="font-size:11px;color:var(--vp-c-text-2);">Piezo Buzzer</span>
  </div>
  <div class="component-info">
    <p>Unlike an active buzzer (which beeps at a fixed frequency when given 5V), this is a passive buzzer. It requires a rapidly oscillating signal (like a PWM wave) to produce sound. Changing the frequency of the signal changes the pitch of the sound.</p>
    <div>
      <span class="tag">Actuators</span>
      <span class="tag">Audio Output</span>
      <span class="tag">Piezoelectric</span>
    </div>
  </div>
</div>

## Overview
The OpenHW Simulator plays the sound through your computer's speakers using the Web Audio API. Use the standard Arduino `tone()` function for easy frequency control.

### Musical Note Frequencies
Here are some common frequencies you can use with the `tone()` function:

| Note | Frequency |
|---|---|
| **C4** (Middle C) | 262 Hz |
| **D4** | 294 Hz |
| **E4** | 330 Hz |
| **F4** | 349 Hz |
| **G4** | 392 Hz |
| **A4** | 440 Hz |

## Pin Reference
<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">GND (-)</span></td><td><span class="pin-type power">power</span></td><td>Negative terminal — connect to GND.</td></tr>
<tr><td><span class="pin-name">SIG (+)</span></td><td><span class="pin-type digital">digital</span></td><td>Positive terminal — connect to a digital/PWM pin.</td></tr>
</table>

## Configurable Attributes
<table class="attrs-table">
<tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr>
<tr><td><strong>volume</strong></td><td><code>number</code></td><td><code>50</code></td><td>Master volume for this buzzer in the simulator (0-100).</td></tr>
<tr><td><strong>frequency</strong></td><td><code>number</code></td><td><code>440</code></td><td>Default resonant frequency configuration (internal).</td></tr>
</table>

## Working Principle
A piezoelectric disc physically deforms when voltage is applied across it. By rapidly applying and removing voltage (e.g., 440 times per second), the disc vibrates and creates a sound wave (440 Hz pitch, or the note A4).

## Wiring Diagram
1. Connect the negative pin (`-`) to Arduino GND.
2. Connect the positive pin (`+`) to a digital output pin (e.g., Pin 3).

## Example Arduino Code
```cpp
const int buzzerPin = 3;

// Frequencies for C4, D4, E4, F4, G4, A4, B4, C5
int notes[] = {262, 294, 330, 349, 392, 440, 494, 523};
int durations[] = {200, 200, 200, 200, 200, 200, 200, 400};

void setup() {
  pinMode(buzzerPin, OUTPUT);
}

void loop() {
  for (int i = 0; i < 8; i++) {
    tone(buzzerPin, notes[i], durations[i]);
    delay(durations[i] + 30); // Add a slight pause between notes
  }
  
  noTone(buzzerPin);
  delay(1000);
}
```

## Simulation Notes
- Ensure your browser tab is not muted. Modern browsers block audio playback until the user clicks on the page, so you must interact with the simulator before audio will play.
- **Hardware Conflict:** The `tone()` function uses Timer 2 on the ATmega328P (Arduino Uno). This conflicts with PWM output on pins 3 and 11. You cannot use `analogWrite()` on pins 3 or 11 while a tone is playing.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-breadboard-mini" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: Breadboard (Mini)</a>
  </div>
  <div>
    <a href="/docs/components/openhw-cc1101" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: CC1101 &rarr;</a>
  </div>
</div>
