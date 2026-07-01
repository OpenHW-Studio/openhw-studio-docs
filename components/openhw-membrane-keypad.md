---
title: "Membrane Keypad (4x4)"
description: "A 16-button matrix keypad for numerical data entry."
slug: /components/openhw-membrane-keypad
---

<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=Sensors">Sensors</a> &gt; 
  <span>Membrane Keypad (4x4)</span>
</div>

# Membrane Keypad (4x4)
<p class="subtitle">A thin, flexible 16-button keypad arranged in a 4x4 matrix, ideal for user input interfaces.</p>

## Component Preview

<div class="component-preview">
  <div class="component-svg-wrap">
    <svg width="100" height="120" viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="5" width="80" height="100" rx="2" fill="#0f172a" />
      <rect x="15" y="10" width="15" height="15" fill="#334155" />
      <rect x="35" y="10" width="15" height="15" fill="#334155" />
      <rect x="55" y="10" width="15" height="15" fill="#334155" />
      <rect x="75" y="10" width="15" height="15" fill="#334155" />
      <rect x="15" y="30" width="15" height="15" fill="#334155" />
      <rect x="35" y="30" width="15" height="15" fill="#334155" />
      <rect x="55" y="30" width="15" height="15" fill="#334155" />
      <rect x="75" y="30" width="15" height="15" fill="#334155" />
      <rect x="15" y="50" width="15" height="15" fill="#334155" />
      <rect x="35" y="50" width="15" height="15" fill="#334155" />
      <rect x="55" y="50" width="15" height="15" fill="#334155" />
      <rect x="75" y="50" width="15" height="15" fill="#334155" />
      <rect x="15" y="70" width="15" height="15" fill="#334155" />
      <rect x="35" y="70" width="15" height="15" fill="#334155" />
      <rect x="55" y="70" width="15" height="15" fill="#334155" />
      <rect x="75" y="70" width="15" height="15" fill="#334155" />
      <rect x="30" y="105" width="40" height="15" fill="var(--vp-c-text-1)" />
      <rect x="32" y="105" width="2" height="15" fill="var(--vp-c-text-2)" />
      <rect x="37" y="105" width="2" height="15" fill="var(--vp-c-text-2)" />
      <rect x="42" y="105" width="2" height="15" fill="var(--vp-c-text-2)" />
      <rect x="47" y="105" width="2" height="15" fill="var(--vp-c-text-2)" />
      <rect x="52" y="105" width="2" height="15" fill="var(--vp-c-text-2)" />
      <rect x="57" y="105" width="2" height="15" fill="var(--vp-c-text-2)" />
      <rect x="62" y="105" width="2" height="15" fill="var(--vp-c-text-2)" />
      <rect x="67" y="105" width="2" height="15" fill="var(--vp-c-text-2)" />
    </svg>
    <span style="font-size:11px;color:var(--vp-c-text-2);">4x4 Keypad</span>
  </div>
  <div class="component-info">
    <p>This membrane keypad provides 16 keys (0-9, A-D, *, #) wired in a 4-row by 4-column matrix. This clever wiring arrangement means you only need 8 microcontroller pins to read 16 individual buttons, rather than 16 pins.</p>
    <div>
      <span class="tag">Sensors</span>
      <span class="tag">Input</span>
      <span class="tag">Matrix</span>
    </div>
  </div>
</div>

## Overview
Inside the keypad, pressing a button connects one of the Row pins to one of the Column pins. By rapidly scanning through the rows (setting one LOW at a time) and reading the columns, a microcontroller can determine exactly which button is pressed.

## Pin Reference
The ribbon cable has 8 pins, typically mapped left-to-right (when looking at the front of the pad) as R1-R4, then C1-C4.

<table class="pin-table">
<tr><th>Pin</th><th>Type</th><th>Description</th></tr>
<tr><td><span class="pin-name">R1</span></td><td><span class="pin-type passive">passive</span></td><td>Row 1 (Top row: 1, 2, 3, A).</td></tr>
<tr><td><span class="pin-name">R2</span></td><td><span class="pin-type passive">passive</span></td><td>Row 2 (Second row: 4, 5, 6, B).</td></tr>
<tr><td><span class="pin-name">R3</span></td><td><span class="pin-type passive">passive</span></td><td>Row 3 (Third row: 7, 8, 9, C).</td></tr>
<tr><td><span class="pin-name">R4</span></td><td><span class="pin-type passive">passive</span></td><td>Row 4 (Bottom row: *, 0, #, D).</td></tr>
<tr><td><span class="pin-name">C1</span></td><td><span class="pin-type passive">passive</span></td><td>Column 1 (Left column: 1, 4, 7, *).</td></tr>
<tr><td><span class="pin-name">C2</span></td><td><span class="pin-type passive">passive</span></td><td>Column 2 (Second column: 2, 5, 8, 0).</td></tr>
<tr><td><span class="pin-name">C3</span></td><td><span class="pin-type passive">passive</span></td><td>Column 3 (Third column: 3, 6, 9, #).</td></tr>
<tr><td><span class="pin-name">C4</span></td><td><span class="pin-type passive">passive</span></td><td>Column 4 (Right column: A, B, C, D).</td></tr>
</table>

## Configurable Attributes
*This component has no standard configurable attributes.*

## Wiring Diagram
Connect the 8 pins in order to 8 consecutive digital pins on the Arduino. For example:
1. Connect **R1** to D9
2. Connect **R2** to D8
3. Connect **R3** to D7
4. Connect **R4** to D6
5. Connect **C1** to D5
6. Connect **C2** to D4
7. Connect **C3** to D3
8. Connect **C4** to D2

## Example Arduino Code
The `Keypad` library handles the complex matrix scanning automatically. Install it via the Library Manager.

```cpp
#include <Keypad.h>

const byte ROWS = 4; // Four rows
const byte COLS = 4; // Four columns

// Define the Keymap
char keys[ROWS][COLS] = {
  {'1','2','3','A'},
  {'4','5','6','B'},
  {'7','8','9','C'},
  {'*','0','#','D'}
};

// Connect keypad ROW1, ROW2, ROW3 and ROW4 to these Arduino pins.
byte rowPins[ROWS] = {9, 8, 7, 6};

// Connect keypad COL1, COL2, COL3 and COL4 to these Arduino pins.
byte colPins[COLS] = {5, 4, 3, 2}; 

// Create the Keypad object
Keypad keypad = Keypad(makeKeymap(keys), rowPins, colPins, ROWS, COLS);

void setup() {
  Serial.begin(9600);
  Serial.println("Keypad Test Started");
}

void loop() {
  char key = keypad.getKey();

  // If a key was pressed, print it
  if (key) {
    Serial.print("Key Pressed: ");
    Serial.println(key);
  }
}
```

## Simulation Notes
- In the simulator, you can click on the buttons of the keypad directly with your mouse to trigger keypresses.
- There is no need for external pull-up resistors; the Arduino's internal pull-ups (handled by the `Keypad` library) are sufficient.

---

<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider);">
  <div>
    <a href="/docs/components/openhw-max7219" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">&larr; Previous: MAX7219 Matrix</a>
  </div>
  <div>
    <a href="/docs/components/openhw-mic" style="text-decoration: none; color: var(--vp-c-brand); font-weight: 600;">Next: Microphone Module &rarr;</a>
  </div>
</div>
