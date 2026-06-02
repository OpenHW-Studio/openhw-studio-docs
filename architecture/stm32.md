# STM32 Emulation Architecture

This document explains the internal workings of the STM32 emulation pipeline in the OpenHW Studio. The architecture is heavily inspired by the ESP32 implementation, ensuring seamless frontend integration via the `BackendProxyRunner`.

## Overview

The STM32 emulation relies on Renode running in a subprocess, wrapped by Node.js controllers. It uses a custom `STM32SimulatorBridge` to intercept hardware calls and forward them to the frontend via WebSockets.

### Pipeline

1. **Compilation**
   - User submits code targeting STM32 via `POST /api/compile {target: 'stm32'}`.
   - `compileController.js` (stm32 specific) processes the request and compiles the sketch using `arduino-cli` with an STM32 FQBN.
   - The output is a `.elf` binary artifact. Unlike ESP32, esptool is not required because Renode directly loads the ELF file.

2. **Runner & Renode Initialization**
   - `renodeRunner.js` spawns the Renode executable.
   - It generates a dynamic `.resc` script that creates a machine (`stm32`), loads the `.repl` platform description, and mounts the ELF binary.
   - A critical difference from QEMU: Renode is configured via the script to create a TCP server on `sysbus.uart1` (`CreateTcpServer`).
   - The Node.js runner (`renodeRunner.js`) connects as a *client* to Renode's TCP server.

3. **Protocol & Shim Injection**
   - Similar to ESP32, shim headers are injected at compile-time:
     - `STM32SimulatorBridge.h/.cpp`: Intercepts GPIO and standard functions.
     - `STM32SimulatorWire.h/.cpp`: Intercepts I2C transactions.
     - `STM32SimulatorSPI.h/.cpp`: Intercepts SPI transactions.
   - When a hardware function is called (e.g., `digitalWrite(PA5, HIGH)`), the shim formats a string frame (e.g., `>GPIO:PA5:1<`) and prints it to the hardware Serial1 (USART1), which is bridged to Renode's UART1.

4. **WebSocket Manager (`websocketManager.js`)**
   - The Node.js `renodeRunner.js` parses the UART stream coming from the TCP connection for `>GPIO:pin:val<` frames.
   - It forwards parsed events to the shared `websocketManager.js`.
   - `websocketManager.js` emits WebSocket events like `GPIO_SYNC` to the frontend session connected to this build.

5. **Frontend Proxy Runner**
   - The frontend `BackendProxyRunner` (the same one used by ESP32) listens to the WebSocket connection.
   - It applies the state to the STM32 virtual pins in the browser, driving the React SVG components.

## Supported Protocols

The STM32 emulation framework intercepts and supports several hardware protocols by injecting custom shim libraries:

1. **GPIO & ADC (`STM32SimulatorBridge.h`)**
   - Intercepts `digitalWrite`, `digitalRead`, `analogRead`.
   - Formats frames like `>GPIO:pin:val<` and `<GPIO:pin:val>`.
   - Maps STM32 hardware pin names (e.g., `PA5`, `PC13`) to the frontend simulation state.

2. **I2C (`STM32SimulatorWire.h` / `.cpp`)**
   - Overrides the standard `TwoWire` library used in STM32 Arduino core.
   - Intercepts transactions and emits frames like `>I2C:address:hex_data<`.
   - Allows frontend I2C components (e.g., OLED displays, sensors) to respond to emulated bus transactions.

3. **SPI (`STM32SimulatorSPI.h` / `.cpp`)**
   - Overrides the standard `SPIClass` library.
   - Intercepts SPI transfers and emits frames like `>SPI:hex_data<`.

4. **UART / Serial**
   - The primary simulation protocol frames are transmitted over `Serial1` (USART1).
   - This UART port is configured in Renode to act as a TCP Server which the Node.js runner connects to.
   - Standard user logs on `Serial` are transmitted and bridged to the frontend's Serial Monitor.

## Interactivity (Input)

Input works identically to ESP32, flowing in reverse:
1. User interacts with a component connected to the STM32 board on the UI.
2. `BackendProxyRunner` sends a WebSocket message.
3. `websocketManager.js` forwards it to `renodeRunner.js`.
4. `renodeRunner.js` formats the message as `<GPIO:pin:val>\n` and sends it over the TCP socket to Renode's UART1.
5. The `STM32SimulatorBridge` inside the running Renode instance reads `Serial1`, parses the `<GPIO:...>` frame, and updates the virtual state.
6. The next `digitalRead()` by the user's Arduino code returns this updated state.

## Core Differences from ESP32
- **Emulator:** Renode instead of QEMU.
- **Connection:** Renode acts as the TCP Server, Node.js acts as the TCP Client.
- **Pin Naming:** Uses STM32 pin naming conventions (`PA0`, `PC13`) instead of numeric IDs.
- **RTOS:** STM32 Arduino core typically uses a bare superloop, unlike ESP32 which relies on FreeRTOS.
