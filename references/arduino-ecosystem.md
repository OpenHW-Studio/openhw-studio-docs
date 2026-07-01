---
title: "Arduino Ecosystem"
---

# Arduino Ecosystem

OpenHW Studio's ability to seamlessly compile and run code originally meant for physical hardware is built heavily around the standards established by the Arduino ecosystem.

<div class="ref-card">
  <div class="ref-header">
    <div class="ref-icon">♾️</div>
    <h2 class="ref-title">Arduino Core & Libraries</h2>
    <span class="ref-license">LGPL / GPL</span>
  </div>
  <div class="ref-desc">
    The Arduino core software provides the foundational API (like `digitalWrite`, `Serial.print`, etc.) that simplifies microcontroller programming.
  </div>
  <div class="ref-usage">
    <strong>Usage in OpenHW Studio:</strong> We utilize compiled versions of the Arduino Core (for AVR and RP2040) so that user-written sketches run exactly as they would on physical Arduino boards. Furthermore, the studio integrates with popular open-source Arduino libraries to interface with sensors and displays.
  </div>
  <div class="ref-actions">
    <a href="https://github.com/arduino/ArduinoCore-avr" target="_blank" class="ref-btn">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
      GitHub (AVR Core)
    </a>
    <a href="https://www.arduino.cc/" target="_blank" class="ref-btn">
      🌐 Official Website
    </a>
  </div>
</div>

<style>
.ref-card {
  display: flex;
  flex-direction: column;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 24px;
}
.ref-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}
.ref-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: var(--vp-c-bg-alt);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}
.ref-title {
  margin: 0 !important;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}
.ref-license {
  font-size: 0.75rem;
  padding: 2px 8px;
  border-radius: 12px;
  background: var(--vp-c-brand-dimm);
  color: var(--vp-c-brand-1);
  font-weight: 600;
  margin-left: auto;
}
.ref-desc {
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
  margin-bottom: 16px;
  line-height: 1.5;
}
.ref-usage {
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
  margin-bottom: 16px;
  background: var(--vp-c-bg-alt);
  padding: 12px;
  border-radius: 6px;
}
.ref-usage strong {
  color: var(--vp-c-brand);
}
.ref-actions {
  display: flex;
  gap: 12px;
  margin-top: auto;
}
.ref-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  text-decoration: none !important;
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
  transition: all 0.2s;
}
.ref-btn:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}
</style>
