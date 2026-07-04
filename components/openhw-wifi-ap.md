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
    <img src="/images/components/openhw-wifi-ap.svg" alt="WiFi Access Point" style="width:80px; height:60px; max-width: 100%; max-height: 150px" />
    <span style="font-size:11px;color:var(--vp-c-text-2);">Virtual AP</span>
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

<TryInSimulator />

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
