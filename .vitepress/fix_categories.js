const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, 'config.mts');
let content = fs.readFileSync(configPath, 'utf8');

const rx = /\/\/ AUTO-GENERATED-COMPONENTS-START[\s\S]*?\/\/ AUTO-GENERATED-COMPONENTS-END/;
const match = content.match(rx);

if (!match) {
    console.error("Could not find auto-generated block");
    process.exit(1);
}

const block = match[0];
const itemRegex = /"text":"(.*?)","link":"(.*?)"/g;
let items = [];
let execRes;
while ((execRes = itemRegex.exec(block)) !== null) {
    items.push({ text: execRes[1], link: execRes[2] });
}

// Eliminate duplicate or bad ones
items = items.filter(i => i.text !== 'STM32 Blue Pill (frontend)' && !i.link.includes('frontend'));

// Make sure we have unique links
const uniqueItems = [];
const seenLinks = new Set();
for (const item of items) {
    if (!seenLinks.has(item.link)) {
        seenLinks.add(item.link);
        uniqueItems.push(item);
    }
}
items = uniqueItems;

const categories = {
    'Sensors': [],
    'Displays': [],
    'Actuators': [],
    'Power Components': [],
    'Logic Components': []
};

function assignCategory(item) {
    const text = item.text.toLowerCase();
    
    // Actuators
    if (text.includes('motor') || text.includes('servo') || text.includes('speaker') || text.includes('buzzer') || text.includes('amp') || text.includes('dac') || text.includes('a4988') || text.includes('l293d')) {
        return 'Actuators';
    }
    
    // Displays
    if (text.includes('display') || text.includes('lcd') || text.includes('oled') || text.includes('led') || text.includes('screen') || text.includes('matrix') || text.includes('neopixel') || text.includes('nlsf595') || text.includes('epaper')) {
        return 'Displays';
    }
    
    // Power Components
    if (text.includes('power') || text.includes('battery') || text.includes('charger') || text.includes('breadboard') || text.includes('diode') || text.includes('transistor') || text.includes('relay') || text.includes('resistor')) {
        // photodiode / photoresistor are sensors
        if (text.includes('photo')) return 'Sensors';
        return 'Power Components';
    }
    
    // Sensors
    if (text.includes('sensor') || text.includes('accelerometer') || text.includes('joystick') || text.includes('breakout') || text.includes('ultrasonic') || text.includes('receiver') || text.includes('ldr') || text.includes('rfid') || text.includes('imu') || text.includes('thermistor') || text.includes('potentiometer') || text.includes('motion') || text.includes('raindrop') || text.includes('load cell') || text.includes('microphone') || text.includes('remote') || text.includes('keypad') || text.includes('push button') || text.includes('encoder') || text.includes('switch') || text.includes('dht22') || text.includes('max30102') || text.includes('ds18b20')) {
        return 'Sensors';
    }
    
    // Default to Logic Components for the rest (gates, ICs, shields, microcontrollers, wifi, sd card, RTC, etc)
    return 'Logic Components';
}

for (const item of items) {
    const cat = assignCategory(item);
    categories[cat].push(item);
}

// Sort alphabetically within categories
for (const cat in categories) {
    categories[cat].sort((a, b) => a.text.localeCompare(b.text));
}

let generatedItems = '';
for (const cat of ['Sensors', 'Displays', 'Actuators', 'Power Components', 'Logic Components']) {
    const catItems = categories[cat];
    if (catItems.length > 0) {
        generatedItems += `          {\n            text: '${cat}',\n            collapsed: true,\n            items: ${JSON.stringify(catItems)}\n          },\n`;
    }
}

content = content.replace(rx, '// AUTO-GENERATED-COMPONENTS-START\n' + generatedItems + '          // AUTO-GENERATED-COMPONENTS-END');
fs.writeFileSync(configPath, content, 'utf8');

console.log("Successfully rebuilt categories into 5 main groups.");
