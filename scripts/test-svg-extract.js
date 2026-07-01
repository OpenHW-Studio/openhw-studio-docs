const fs = require('fs');
const path = require('path');

const uiPath = 'E:/FOSSEE/openhw-studio-emulator/src/components/logic-and-gate/ui.tsx';
let content = fs.readFileSync(uiPath, 'utf8');

let svgMatch = content.match(/<svg[\s\S]*?<\/svg>/);
if (svgMatch) {
    let svg = svgMatch[0];
    
    // Remove comments
    svg = svg.replace(/\{\/\*[\s\S]*?\*\/\}/g, '');
    
    // Replace standard colors and props
    svg = svg.replace(/stroke=\{wireColor\}/g, 'stroke="#1e1e1e"');
    svg = svg.replace(/stroke=\{gateColor\}/g, 'stroke="#a855f7"');
    svg = svg.replace(/fill=\{[\s\S]*?\}/g, 'fill="currentColor"');
    svg = svg.replace(/style=\{\{.*?\}\}/g, '');
    
    // Remove any remaining jsx curly braces if they contain basic variables (hacky but works for simple previews)
    svg = svg.replace(/=\{([^}]+)\}/g, '="$1"');
    
    console.log(svg);
}
