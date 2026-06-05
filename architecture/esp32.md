# ESP32 Emulation Architecture

This document explains the internal workings of the ESP32 emulation pipeline in the OpenHW Studio.

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
   - Provides a mocked WiFi interface that proxies network requests from the emulated ESP32 to the host Node.js environment.
   - Translates emulated HTTP requests to actual requests performed by the backend server.

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
