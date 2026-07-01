---
title: "Simulation Engine"
---

# Simulation Engine

OpenHW Studio relies on powerful open-source emulation engines to accurately execute compiled microcontroller firmware in the browser. These engines simulate CPU instructions, registers, and memory space in real time.

<div class="ref-card">
  <div class="ref-header">
    <div class="ref-icon">⚙️</div>
    <h2 class="ref-title">avr8js</h2>
    <span class="ref-license">MIT License</span>
  </div>
  <div class="ref-desc">
    avr8js is an AVR 8-bit architecture simulator written in TypeScript. It provides a robust, cycle-accurate execution engine for Arduino Uno and Nano (ATmega328p) compiled firmware natively within the browser context.
  </div>
  <div class="ref-usage">
    <strong>Usage in OpenHW Studio:</strong> Serves as the core runtime for executing Arduino firmware, simulating instruction cycles, timers, and CPU registers.
  </div>
  <div class="ref-actions">
    <a href="https://github.com/wokwi/avr8js" target="_blank" class="ref-btn">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
      GitHub
    </a>
    <a href="https://wokwi.com" target="_blank" class="ref-btn">
      🌐 Official Website
    </a>
  </div>
</div>

<div class="ref-card">
  <div class="ref-header">
    <div class="ref-icon">🚀</div>
    <h2 class="ref-title">rp2040js</h2>
    <span class="ref-license">MIT License</span>
  </div>
  <div class="ref-desc">
    rp2040js is an emulator for the Raspberry Pi RP2040 microcontroller. It supports ARM Cortex-M0+ instruction execution, memory-mapped I/O, and specialized PIO features.
  </div>
  <div class="ref-usage">
    <strong>Usage in OpenHW Studio:</strong> Used to emulate the Raspberry Pi Pico and other RP2040-based development boards, executing compiled ARM Cortex binaries in the browser.
  </div>
  <div class="ref-actions">
    <a href="https://github.com/wokwi/rp2040js" target="_blank" class="ref-btn">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
      GitHub
    </a>
  </div>
</div>

<div class="ref-card">
  <div class="ref-header">
    <div class="ref-icon">⚡</div>
    <h2 class="ref-title">LittleFS</h2>
    <span class="ref-license">BSD 3-Clause</span>
  </div>
  <div class="ref-desc">
    LittleFS is a little fail-safe filesystem designed for microcontrollers. We use a compiled WASM version to simulate local flash storage for microcontrollers.
  </div>
  <div class="ref-usage">
    <strong>Usage in OpenHW Studio:</strong> Provides virtual flash file system support (reading and writing files) within the RP2040 and ESP32 simulation runtimes.
  </div>
  <div class="ref-actions">
    <a href="https://github.com/littlefs-project/littlefs" target="_blank" class="ref-btn">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
      GitHub
    </a>
  </div>
</div>
