---
title: "WiFi Access Point"
description: "A simulated virtual WiFi access point allowing network connections in OpenHW Studio."
slug: /components/openhw-wifi-ap
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Logic Components">Logic Components</a> &gt; 
  <span>WiFi Access Point</span>
</div>

# WiFi Access Point
<p class="subtitle">A virtual component that provides a simulated wireless network for Wi-Fi capable microcontrollers (like the ESP32) to connect to.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
      <path d="M 30 10 A 25 25 0 0 1 55 35 M 5 35 A 25 25 0 0 1 30 10" fill="none" stroke="#60a5fa" stroke-width="4" stroke-linecap="round" />
      <path d="M 30 20 A 15 15 0 0 1 45 35 M 15 35 A 15 15 0 0 1 30 20" fill="none" stroke="#93c5fd" stroke-width="4" stroke-linecap="round" />
      <path d="M 30 30 A 5 5 0 0 1 35 35 M 25 35 A 5 5 0 0 1 30 30" fill="none" stroke="#bfdbfe" stroke-width="4" stroke-linecap="round" />
      <circle cx="30" cy="45" r="4" fill="#3b82f6" />
    </svg>
    <span style="font-size:11px;color:#4a5568;">Virtual AP</span>
  </div>
  <div class="component-info">
    <p>Unlike physical components, the WiFi Access Point exists solely to emulate a network environment in the simulator. By adding this to your project, microcontrollers can scan for its SSID and connect to it, simulating real-world IoT behavior without requiring physical hardware.</p>
    <div>
      <span class="tag">Logic Components</span>
      <span class="tag">Virtual</span>
      <span class="tag">Networking</span>
    </div>
  </div>
</div>

## Overview
Because this is a virtual networking element, it does not have physical pins. You configure its SSID and password in the `diagram.json` attributes. Once running, ESP32 or ESP8266 code can connect to it using standard Wi-Fi libraries.

## Pin Reference
*This component is virtual and does not have any physical pins.*

## Configurable Attributes
<table class="attrs-table">
<tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr>
<tr><td><strong>ssid</strong></td><td><code>string</code></td><td><code>"Wokwi-GUEST"</code></td><td>The network name broadcasted by the AP.</td></tr>
<tr><td><strong>password</strong></td><td><code>string</code></td><td><code>""</code></td><td>The password required to connect (leave empty for open networks).</td></tr>
<tr><td><strong>channel</strong></td><td><code>number</code></td><td><code>6</code></td><td>The simulated Wi-Fi channel (1-14).</td></tr>
<tr><td><strong>internet</strong></td><td><code>boolean</code></td><td><code>true</code></td><td>If true, the simulated AP provides routed access to the public internet.</td></tr>
</table>

## Example ESP32 Code
This sketch demonstrates how to connect to the simulated access point.

```cpp
#include <WiFi.h>

// Match these with the AP attributes in your diagram.json
const char* ssid = "Wokwi-GUEST";
const char* password = "";

void setup() {
  Serial.begin(115200);
  Serial.println("Connecting to WiFi...");

  // Begin connection
  WiFi.begin(ssid, password);

  // Wait until connected
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected!");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  // Your internet-connected code here
  delay(1000);
}
```

## Simulation Notes
- The OpenHW Simulator intercepts Wi-Fi requests from the ESP32 and routes them through the browser's networking stack, allowing you to fetch real data from external APIs via the simulated `internet: true` property. (Subject to CORS restrictions).

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-tm1637-7segment" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: TM1637 Display</a>
  </div>
  <div>
    <a href="/docs/components/openhw-wifi-sta" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: WiFi Station &rarr;</a>
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
