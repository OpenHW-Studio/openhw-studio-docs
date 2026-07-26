---
title: "References & Acknowledgements"
---

# References & Acknowledgements

OpenHW Studio is a complex, modern electronics simulation platform that stands on the shoulders of giants. We are deeply committed to the open-source ethos and recognize that building this ecosystem from scratch would not have been possible without the tireless work of developers, maintainers, and researchers across the globe.

In this section, we professionally acknowledge all third-party open-source projects, simulators, libraries, frameworks, emulators, and technologies that OpenHW Studio builds upon or integrates.

## Our Open Source Commitment

We believe in giving back to the community that makes our work possible. By leveraging mature, reliable open-source components, we ensure that OpenHW Studio remains performant, extensible, and accessible. Every piece of software listed in this section has been carefully chosen and integrated into our stack, and we deeply appreciate the communities maintaining these projects.

## What You Will Find Here

Use the sidebar navigation to explore the different technologies powering OpenHW Studio:

* **Simulation Engine:** Core execution environments for AVR, RP2040, and other architectures.
* **Hardware Emulation:** Libraries providing cycle-accurate emulation of hardware peripherals.
* **Arduino Ecosystem:** How we integrate with official Arduino tools and libraries.
* **UI & Frontend Libraries:** The reactive frontend frameworks and component libraries powering the Studio interface.
* **Backend Technologies:** The scalable server-side stack that handles simulation synchronization, storage, and telemetry.
* **Documentation References:** The datasheets, manuals, and specifications we referenced to ensure accuracy.
* **Open Source Licenses:** A consolidated list of licenses for our dependencies.
* **External Resources:** Curated links for further reading, tutorials, and standards.

---

> "If I have seen further it is by standing on the shoulders of Giants." — Isaac Newton

## Open Source Dependencies

OpenHW Studio heavily relies on the following incredible open-source projects for core functionality. We gratefully acknowledge their contributions to the open-source hardware and emulation ecosystem.

### ESP Emulator
**Repository:** [https://github.com/espressif/esp-emulator](https://github.com/espressif/esp-emulator)

**Description:** Used as the ESP32/ESP-C3/ESP-C6/ESP32-P4 emulation backend for supported ESP-based microcontrollers within OpenHW Studio. This project provides the essential hardware-level CPU and peripheral emulation required for running ESP-IDF and Arduino-ESP32 firmwares.

### Renode
**Repository:** [https://github.com/renode/renode](https://github.com/renode/renode)

**Description:** Used as the simulation backend for STM32-based microcontrollers. Renode provides extensive hardware-level emulation, allowing us to accurately simulate Cortex-M processors and intricate peripherals for STM32 targets.
