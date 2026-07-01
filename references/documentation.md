---
title: "Documentation References"
---

# Documentation References

Building a cycle-accurate hardware simulator requires deep technical knowledge of microcontrollers, electrical properties, and protocol standards. We acknowledge and reference the following technical documentation which was crucial to building OpenHW Studio.

## Silicon & Microcontroller Datasheets

### ATmega328P (Arduino Uno)
* **Publisher:** Microchip Technology
* **Usage:** Used to accurately implement AVR instructions, Timer/Counter configurations, and register-level I/O mapped memory in the simulation engine.
* [ATmega328P Official Datasheet](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf)

### Raspberry Pi RP2040
* **Publisher:** Raspberry Pi Foundation
* **Usage:** Core reference for ARM Cortex-M0+ implementation, PIO state machines, and dual-core symmetric multiprocessing emulation.
* [RP2040 Official Datasheet](https://datasheets.raspberrypi.com/rp2040/rp2040-datasheet.pdf)

## Component & Sensor References

### Bosch BMP180 / BMP280
* **Usage:** Referenced for modeling barometric pressure responses, I2C address mapping, and uncompensated temperature formulas to ensure accurate simulation against real-world Arduino libraries.

### DHT11 / DHT22 
* **Usage:** Used to model the proprietary single-wire timing protocol used by these temperature/humidity sensors down to the microsecond level.

## Communication Protocols

### I2C (Inter-Integrated Circuit)
* **Publisher:** NXP Semiconductors (originally Philips)
* **Usage:** Used to build the virtual I2C bus arbiter, simulating SDA/SCL lines, ACK/NACK responses, and clock stretching.

### SPI (Serial Peripheral Interface)
* **Usage:** Referenced for simulating full-duplex synchronous serial communication for components like the ILI9341 display.
