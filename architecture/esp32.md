# ESP32 Emulation Architecture

This document explains the internal workings of the ESP32 emulation pipeline in the OpenHW Studio.

> **Read this first (2026-10-20).** The pipeline described below is the
> **legacy QEMU-era plan** (`qemu-system-xtensa` + injected
> `SimulatorBridge` shim headers). The shipped ESP32 path is different: the
> board runs on the **`esp32-emu` WASM engine** inside the frontend board
> worker (`src/worker/runners/esp32-runner.ts`), with no QEMU subprocess and
> no shim headers. This file is kept for the historical design; the current
> per-engine contract lives in the frontend repo at
> `vendor/emulator-hook-specs/esp32-emu.md`, and the current networking
> design in [`./network-bringup.md`](./network-bringup.md).
>
> **Networking correction:** the "mocked WiFi interface that proxies network
> requests to the host Node.js environment" described in §4 below is **not**
> how networking works any more. There is no host-side HTTP proxy and no
> in-emulator IP stack: the ESP32 engine dials the **unified gateway**
> (`openhw-unified-gateway`) itself at boot and speaks raw Ethernet in the
> virtual net `192.168.4.0/24`. See [`./network-bringup.md`](./network-bringup.md).

## Overview

The ESP32 emulation relies on QEMU (`qemu-system-xtensa`) running in a Python subprocess, wrapped by Node.js controllers. It features a custom `SimulatorBridge` to intercept hardware calls and forward them to the frontend via WebSockets.

### Pipeline

1. **Compilation**
   - User submits code targeting ESP32 via `POST /api/compile`.
   - `compileController.js` processes the request and compiles the sketch using `arduino-cli`.
   - `esptool.py` (or equivalent scripts) merges the resulting `.bin` with a bootloader and partition table into a `merged-flash.bin`.

2. **Runner & QEMU Initialization**
   - `qemuRunner.js` spawns a Python worker process (`esp32_worker.py`).
   - The worker loads the QEMU machine (`libqemu-xtensa` or equivalent binary wrapper) and mounts the merged binary.
   - A UART TCP bridge is established between QEMU and the Node.js runner to stream serial data out of the emulated chip.

3. **Protocol & Shim Injection**
   - At compile-time, custom shim headers are injected:
     - `SimulatorBridge.h/.cpp`: Intercepts `digitalWrite`, `digitalRead`, `analogRead`, etc.
     - `SimulatorWire.h/.cpp`: Intercepts I2C transactions.
     - `SimulatorSPI.h/.cpp`: Intercepts SPI transactions.
   - When a hardware function is called in user code (e.g., `digitalWrite(2, HIGH)`), the shim formats a string frame (e.g., `>GPIO:2:1<`) and prints it to the hardware Serial (UART0).

4. **WebSocket Manager (`websocketManager.js`)**
   - `qemuRunner.js` parses the UART stream for these `>GPIO:pin:val<` formatted frames.
   - It forwards parsed events to `websocketManager.js`.
   - `websocketManager.js` emits WebSocket events like `GPIO_SYNC` to the frontend session connected to this build.

5. **Frontend Proxy Runner**
   - The frontend's `BackendProxyRunner` listens to the WebSocket connection.
   - Upon receiving `GPIO_SYNC` or other events, it applies the state to the virtual pins in the browser.
   - The React UI (SVG canvas) updates at 60fps to reflect the state (e.g., lighting up an LED).

## Supported Protocols

The ESP32 emulation framework currently intercepts and supports several hardware protocols by injecting custom shim libraries:

1. **GPIO & ADC (`SimulatorBridge.h`)**
   - Intercepts `digitalWrite`, `digitalRead`, `analogRead`.
   - Formats frames like `>GPIO:pin:val<` and `<GPIO:pin:val>`.

2. **I2C (`SimulatorWire.h` / `.cpp`)**
   - Overrides the standard `Wire` library.
   - Intercepts transactions and emits frames like `>I2C:address:hex_data<`.
   - Allows frontend I2C components (e.g., OLED displays, sensors) to respond to emulated bus transactions.

3. **SPI (`SimulatorSPI.h` / `.cpp`)**
   - Overrides the standard `SPI` library.
   - Intercepts SPI transfers and emits frames like `>SPI:hex_data<`.

4. **WiFi / Networking (`SimulatorWiFi.h`, `SimulatorWiFiClient.h`)**
   - *Legacy plan only — not the shipped path.* The plan was a mocked WiFi
     interface that proxied network requests from the emulated ESP32 to the
     host Node.js environment, translating emulated HTTP requests into
     requests performed by the backend server.
   - **Shipped path (2026-10-20):** the engine opens a WebSocket to the
     unified gateway at boot and speaks raw Ethernet inside the virtual net.
     The runner only passes `config.wifi {ssid, bssid, channel, room,
     gatewayUrl}` and reads `getWifiStats()` back. Proof cells:
     `tests/e2e/esp32-wifi-gateway.spec.js` (STA join + gateway DHCP:
     `STATUS=3`, `IP=192.168.4.2`) and
     `tests/e2e/esp32-cam-wifi-gateway.spec.js` (ESP32-CAM preset).

5. **UART / Serial**
   - The standard `Serial.print()` is used as the underlying transport layer for the simulation protocol via UART0.
   - `Serial` output not matching the protocol frames (e.g., normal user logs) is forwarded directly to the frontend's Serial Monitor.

## Interactivity (Input)

Input flows in reverse:
1. User clicks a button in the frontend SVG.
2. `BackendProxyRunner` sends a WebSocket message (e.g., `SET_GPIO`).
3. `websocketManager.js` receives it and tells `qemuRunner.js` to inject data.
4. `qemuRunner.js` sends `<GPIO:pin:val>\n` over the TCP UART bridge to QEMU.
5. The `SimulatorBridge` running inside QEMU polls for incoming serial data, parses the `<GPIO:...>` frame, and updates its internal virtual pin state.
6. The next `digitalRead()` by the user's Arduino code will return this updated virtual state.

## Caching and Performance
- The backend utilizes hot-pooling and binary caching to reuse existing built binaries and warmed-up QEMU processes, reducing boot time significantly.
