import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(defineConfig({
  base: '/docs/',
  ignoreDeadLinks: true,
  title: "OpenHW Studio",
  description: "Advanced Arduino & Hardware Simulation Documentation",
  themeConfig: {
    logo: '/logo.png',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guides/deployment' },
      { text: 'Architecture', link: '/architecture/overview' }
    ],

    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Deployment Guide', link: '/guides/deployment' },
          { text: 'Implementation Guide v2.5', link: '/guides/implementation-v2-5' },
          { text: 'Quick Reference', link: '/guides/quick-reference' },
          { text: 'Keyboard Shortcuts', link: '/guides/shortcuts' },
          { text: 'Hardware Flashing', link: '/guides/hardware-flashing' },
          { text: 'Migration Guide', link: '/guides/migration' },
          { text: 'Page Validation', link: '/guides/page-validation' },
        ]
      },
      {
        text: 'Architecture',
        items: [
          { text: 'System Overview', link: '/architecture/overview' },
          { text: 'Autofix Engine', link: '/architecture/autofix' },
          { text: 'Autofix Improvements', link: '/architecture/autofix-improvements' },
          { text: 'Autofix Plan', link: '/architecture/autofix-plan' },
          { text: 'Autowiring System', link: '/architecture/autowiring' },
          { text: 'Autowiring v2', link: '/architecture/autowiring-v2' },
          { text: 'Board Compatibility', link: '/architecture/board-compatibility' },
          { text: 'Compiler Backend', link: '/architecture/compiler-backend' },
          { text: 'Compilation Caching', link: '/architecture/compilation-caching' },
          { text: 'Compiled Backend', link: '/architecture/compiled-backend' },
          { text: 'Library Management', link: '/architecture/libaray_management.md' },
          { text: 'Frontend Engine', link: '/architecture/frontend-engine' },
          { text: 'Block Coding', link: '/architecture/block-coding' },
          { text: 'ESP32 Architecture', link: '/architecture/esp32' },
          { text: 'STM32 Architecture', link: '/architecture/stm32' },
          { text: 'Universal Grid Migration', link: '/architecture/universal_1x_grid_migration' },
          { text: 'Implementation Plan', link: '/architecture/implementation_plan' },
          { text: 'ESP and STM32 Overview', link: '/esp and stm32' },
          { text: 'Display Worker', link: '/display worker' },
        ]
      },
      {
        text: 'Grading Engine',
        items: [
          { text: 'Grading Overview', link: '/grading/overview' },
          { text: 'Engine Status', link: '/grading/engine-status' },
          { text: 'Scoring Guide', link: '/grading/scoring-guide' },
          { text: 'Compatibility Audit', link: '/grading/audit' },
          { text: 'Grading Analysis', link: '/grading/analysis' },
        ]
      },
      {
        text: 'Classroom System',
        items: [
          { text: 'Data Architecture', link: '/classroom/data-architecture' },
          { text: 'API Routing', link: '/classroom/api-routing' },
          { text: 'API & Core Workflows', link: '/classroom/api-workflows' },
          { text: 'Live & Shared Simulation', link: '/classroom/live-simulation' },
          { text: 'Teacher Dashboard', link: '/classroom/teacher-dashboard' },
          { text: 'Student Dashboard', link: '/classroom/student-dashboard' },
        ]
      },
      {
        text: 'Telemetry & Data',
        items: [
          { text: 'Telemetry Overview', link: '/telemetry/overview' },
          { text: 'API Reference', link: '/telemetry/api' },
          { text: 'Pin Telemetry', link: '/telemetry/pin-telemetry' },
          { text: 'Telemetry Architecture', link: '/telemetry/telemetry-architecture' },
          { text: 'Component Telemetry', link: '/telemetry/component-telemetry-reference' },
          { text: 'Component Fixes', link: '/telemetry/component-fixes' },
          { text: 'Telemetry Summary', link: '/telemetry/summary' },
        ]
      },
      {
        text: 'Components',
        items: [
          { text: 'Frontend', link: '/components/frontend' },
          { text: 'Backend', link: '/components/backend' },
          { text: 'Emulator', link: '/components/emulator' },
          { text: 'CLI', link: '/components/cli' },
          { text: 'Component Lab', link: '/components/component-lab' },
          { text: 'Component Catalog', link: '/components/catalog' },
// AUTO-GENERATED-COMPONENTS-START
          {
            text: 'Sensors',
            collapsed: true,
            items: [{"text":"6mm Push Button","link":"/components/openhw-pushbutton-6mm"},{"text":"ADXL345 Accelerometer","link":"/components/openhw-adxl345"},{"text":"Analog Joystick","link":"/components/openhw-analog-joystick"},{"text":"Arduino Sensor Shield v5.0","link":"/components/openhw-arduino-sensor-shield"},{"text":"BMP180 Pressure Sensor Breakout","link":"/components/openhw-bmp180-breakout"},{"text":"DHT22","link":"/components/openhw-dht22"},{"text":"DS18B20 Temperature Sensor","link":"/components/openhw-ds18b20"},{"text":"HX711 Load Cell (50kg)","link":"/components/openhw-hx711_50"},{"text":"HX711 Load Cell (5kg)","link":"/components/openhw-hx711_5"},{"text":"I2S MEMS Microphone (INMP441)","link":"/components/openhw-inmp441"},{"text":"I2S MEMS Microphone (SPH0645)","link":"/components/openhw-sph0645"},{"text":"IR Receiver","link":"/components/openhw-ir-receiver"},{"text":"IR Remote","link":"/components/openhw-ir-remote"},{"text":"LDR Sensor Module (4-pin)","link":"/components/openhw-ldr-module"},{"text":"Linear Potentiometer","link":"/components/openhw-slide-potentiometer"},{"text":"MAX30102 Heart Rate","link":"/components/max30102"},{"text":"Membrane Keypad (4x4)","link":"/components/openhw-membrane-keypad"},{"text":"MFRC522 RFID Reader","link":"/components/openhw-mfrc522"},{"text":"MPU6050 IMU Sensor","link":"/components/openhw-mpu6050"},{"text":"MQ-2 Gas Sensor","link":"/components/openhw-mq2-gas-sensor"},{"text":"NTC Thermistor Module","link":"/components/openhw-ntc-thermistor"},{"text":"Photodiode","link":"/components/openhw-photodiode"},{"text":"Photoresistor (LDR)","link":"/components/openhw-photoresistor"},{"text":"PIR Motion Sensor","link":"/components/wokwi-pir-motion-sensor"},{"text":"Push Button","link":"/components/openhw-pushbutton"},{"text":"Rain Sensor Pad","link":"/components/openhw-raindrop-pad"},{"text":"Raindrop Module","link":"/components/openhw-raindrop-module"},{"text":"Rotary Encoder","link":"/components/openhw-rotary-encoder"},{"text":"Rotary Potentiometer","link":"/components/openhw-potentiometer"},{"text":"Simulation Monitor","link":"/components/openhw-simulation-monitor"},{"text":"Slide Switch","link":"/components/openhw-slide-switch"},{"text":"Temperature Sensor (NTC)","link":"/components/openhw-ntc-temperature-sensor"},{"text":"Ultrasonic Sensor","link":"/components/openhw-hc-sr04"}]
          },
          {
            text: 'Displays',
            collapsed: true,
            items: [{"text":"2.9\\\" e-Paper Display (beta)","link":"/components/openhw-ePaperDisplay"},{"text":"7-Segment Display","link":"/components/openhw-7segment"},{"text":"ILI9341 2.8\\\" TFT LCD","link":"/components/openhw-ili9341"},{"text":"ILI9341 2.8\\\" Touch Screen LCD","link":"/components/openhw-ili9341-touch"},{"text":"LCD 16x2 (I2C)","link":"/components/openhw-lcd1602-i2c"},{"text":"LCD 16x2 (Parallel)","link":"/components/openhw-lcd1602"},{"text":"LED","link":"/components/openhw-led"},{"text":"MAX7219 Dot Matrix","link":"/components/openhw-max7219"},{"text":"NeoPixel Matrix","link":"/components/openhw-neopixel-matrix"},{"text":"NeoPixel Ring","link":"/components/openhw-neopixel-ring"},{"text":"Nokia 5110 Screen","link":"/components/openhw-nokia-5110"},{"text":"openhw-lcd2004","link":"/components/openhw-lcd2004"},{"text":"openhw-lcd2004-i2c","link":"/components/openhw-lcd2004-i2c"},{"text":"RGB LED (4-pin)","link":"/components/openhw-rgb-led"},{"text":"Seven Segment Display (TM1637)","link":"/components/openhw-tm1637-7segment"},{"text":"SPI LED Driver (NLSF595)","link":"/components/openhw-nlsf595"},{"text":"SSD1306 OLED 128x64","link":"/components/openhw-ssd1306-oled"}]
          },
          {
            text: 'Actuators',
            collapsed: true,
            items: [{"text":"5W Audio Speaker","link":"/components/openhw-5w-speaker"},{"text":"A4988 Stepper Driver","link":"/components/openhw-a4988"},{"text":"Biaxial Stepper Motor","link":"/components/openhw-biaxial-stepper"},{"text":"Buzzer","link":"/components/openhw-buzzer"},{"text":"DC Motor","link":"/components/openhw-motor"},{"text":"MAX98357 I2S Amp","link":"/components/openhw-max98357"},{"text":"Motor Driver","link":"/components/openhw-motor-driver"},{"text":"Motor Driver (L293D)","link":"/components/openhw-l293d"},{"text":"PCM5102 I2S DAC","link":"/components/openhw-pcm5102"},{"text":"Servo Motor","link":"/components/openhw-servo"},{"text":"Servo Pi HAT","link":"/components/openhw-pca9685"},{"text":"Stepper Motor (Bipolar)","link":"/components/openhw-stepper-motor"}]
          },
          {
            text: 'Power Components',
            collapsed: true,
            items: [{"text":"Breadboard (Full)","link":"/components/openhw-breadboard"},{"text":"Breadboard (Half)","link":"/components/openhw-breadboard-half"},{"text":"Breadboard (Mini)","link":"/components/openhw-breadboard-mini"},{"text":"Diode","link":"/components/openhw-diode"},{"text":"DPDT Relay","link":"/components/openhw-ks2e-m-dc5"},{"text":"Li-ion Battery","link":"/components/openhw-battery"},{"text":"Li-ion Charger","link":"/components/openhw-charger"},{"text":"NPN Transistor","link":"/components/openhw-npn-transistor"},{"text":"Power Supply","link":"/components/openhw-power-supply"},{"text":"Relay Module","link":"/components/openhw-relay-module"},{"text":"Resistor","link":"/components/openhw-resistor"}]
          },
          {
            text: 'Logic Components',
            collapsed: true,
            items: [{"text":"16-Channel Mux (HP4067)","link":"/components/openhw-hp4067"},{"text":"16-Channel PWM Module (PCA9865)","link":"/components/openhw-pca9865"},{"text":"74HC165 Input Shift Register (PISO)","link":"/components/openhw-74hc165"},{"text":"74HC595 Shift Register","link":"/components/openhw-74hc595"},{"text":"8-Ch Logic Analyzer","link":"/components/openhw-logic-analyzer"},{"text":"AND Gate","link":"/components/logic-and-gate"},{"text":"Arduino Mega 2560","link":"/components/openhw-arduino-mega"},{"text":"Arduino Nano Type-C","link":"/components/openhw-arduino-nano"},{"text":"Arduino Uno","link":"/components/openhw-arduino-uno"},{"text":"ATtiny85 Board","link":"/components/openhw-attiny85"},{"text":"Buffer Gate","link":"/components/logic-buffer-gate"},{"text":"CC1101","link":"/components/openhw-cc1101"},{"text":"Clock","link":"/components/logic-clock-generator"},{"text":"D Flip-Flop","link":"/components/logic-d-flipflop"},{"text":"D Flip-Flop (Reset)","link":"/components/logic-d-flipflop-r"},{"text":"D Flip-Flop (Set/Reset)","link":"/components/logic-d-flipflop-dsr"},{"text":"DS1307 RTC Module","link":"/components/openhw-ds1307-rtc"},{"text":"ESP32-CAM","link":"/components/openhw-esp32-cam"},{"text":"Logic IC","link":"/components/logic-ic-74xx"},{"text":"MicroSD Card","link":"/components/openhw-sd-card"},{"text":"MUX 2:1","link":"/components/logic-mux-2to1"},{"text":"NAND Gate","link":"/components/logic-nand-gate"},{"text":"NOR Gate","link":"/components/logic-nor-gate"},{"text":"NOT Gate","link":"/components/logic-not-gate"},{"text":"nRF24L01+","link":"/components/openhw-nrf24l01"},{"text":"openhw-esp32","link":"/components/openhw-esp32"},{"text":"OR Gate","link":"/components/logic-or-gate"},{"text":"Raspberry Pi Pico","link":"/components/openhw-pico"},{"text":"Raspberry Pi Pico W","link":"/components/openhw-pico-w"},{"text":"Soil Moisture","link":"/components/openhw-soil-moisture-sensor"},{"text":"STM32 Blue Pill","link":"/components/openhw-stm32-bluepill"},{"text":"WiFi Access Point","link":"/components/openhw-wifi-ap"},{"text":"XNOR Gate","link":"/components/logic-xnor-gate"},{"text":"XOR Gate","link":"/components/logic-xor-gate"}]
          },
          // AUTO-GENERATED-COMPONENTS-END
        ]
      },
      {
        text: 'Circuit Validation',
        items: [
          { text: 'Validation Framework', link: '/components/validation' }
        ]
      },
      {
        text: 'References',
        items: [
          { text: 'Overview', link: '/references/index' },
          { text: 'Simulation Engine', link: '/references/simulation-engine' },
          { text: 'Hardware Emulation', link: '/references/hardware-emulation' },
          { text: 'Arduino Ecosystem', link: '/references/arduino-ecosystem' },
          { text: 'UI & Frontend Libraries', link: '/references/ui-frontend' },
          { text: 'Backend Technologies', link: '/references/backend-technologies' },
          { text: 'CLI & Integration', link: '/references/cli-and-ai' },
          { text: 'Documentation References', link: '/references/documentation' },
          { text: 'Open Source Licenses', link: '/references/licenses' },
          { text: 'External Resources', link: '/references/external-resources' }
        ]
      },
      {
        text: 'Releases',
        items: [
          { text: 'Changelog', link: '/releases/changelog' },
          { text: 'Latest Changes', link: '/releases/latest-changes' },
          { text: 'Code Patches', link: '/releases/code-patches' },
          { text: 'Critical Issues', link: '/releases/critical-issues' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/OpenHW-Studio' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present OpenHW'
    },

    search: {
      provider: 'local'
    }
  }
}))
