const fs = require('fs');
const path = require('path');

const EMULATOR_COMPONENTS_DIR = path.join(__dirname, '../../openhw-studio-emulator', 'src', 'components');
const DOCS_OUTPUT_DIR = path.join(__dirname, '../components');

// Ensure output directory exists
if (!fs.existsSync(DOCS_OUTPUT_DIR)) {
    fs.mkdirSync(DOCS_OUTPUT_DIR, { recursive: true });
}

function getSafeString(str) {
    return str ? str.toString().replace(/</g, '&lt;').replace(/>/g, '&gt;') : '';
}

function generateComponentDoc(componentDir, manifest) {
    const compId = manifest.type || path.basename(componentDir);
    const title = manifest.label || compId;
    const subtitle = manifest.description || 'OpenHW Studio Simulator Component';
    
    // Group/Category mapping
    let category = manifest.group || 'Miscellaneous';
    if (category === 'Digital') category = 'Digital Components';
    if (category === 'Analog') category = 'Sensors';
    if (category === 'Logic') category = 'Logic Components';
    if (category === 'Motors') category = 'Motors & Drivers';
    if (category === 'Displays') category = 'Displays';
    if (category === 'Power') category = 'Power Components';
    if (category === 'Comm') category = 'Communication Modules';

    // Tags
    const tags = [category];
    if (manifest.tags) tags.push(...manifest.tags);

    let pinsSection = '';
    if (manifest.pins && manifest.pins.length > 0) {
        let rows = manifest.pins.map(pin => {
            const typeClass = pin.type ? pin.type.toLowerCase() : 'default';
            return '<tr>' +
                '<td><span class="pin-name">' + getSafeString(pin.id) + '</span></td>' +
                '<td><span class="pin-type ' + typeClass + '">' + getSafeString(pin.type || 'Pin') + '</span></td>' +
                '<td>' + getSafeString(pin.description || '') + '</td>' +
            '</tr>';
        }).join('\n');
        
        pinsSection = '<h2>Pin Reference</h2>\n' +
        '<table class="pin-table">\n' +
          '<tr><th>Pin</th><th>Type</th><th>Description</th></tr>\n' +
          rows + '\n' +
        '</table>\n';
    }
    
    let attrsSection = '';
    if (manifest.attrs && Object.keys(manifest.attrs).length > 0) {
        let rows = Object.entries(manifest.attrs).map(([key, defaultVal]) => {
            return '<tr>' +
                '<td><code>' + getSafeString(key) + '</code></td>' +
                '<td><code>' + getSafeString(defaultVal) + '</code></td>' +
                '<td>Configuration attribute for ' + key + '</td>' +
            '</tr>';
        }).join('\n');
        
        attrsSection = '<h2>Attributes</h2>\n' +
        '<table class="attrs-table">\n' +
          '<tr><th>Attribute</th><th>Default</th><th>Description</th></tr>\n' +
          rows + '\n' +
        '</table>\n';
    }
    
    let exampleCodeSection = '';
    let codeStr = '';
    if (manifest.autocoding && manifest.autocoding.arduino) {
        const arduino = manifest.autocoding.arduino;
        let libs = '';
        if (manifest.autocoding.libraries && manifest.autocoding.libraries.length > 0) {
            libs = manifest.autocoding.libraries.map(l => '#include <' + l + '.h>').join('\n') + '\n\n';
        }
        
        let globals = arduino.globals ? arduino.globals.replace(/\$\{COMP_SUFFIX\}/g, '1') : '';
        let setup = arduino.setup ? arduino.setup.replace(/\$\{COMP_SUFFIX\}/g, '1') : '';
        let loop = arduino.loop ? arduino.loop.replace(/\$\{COMP_SUFFIX\}/g, '1') : '';
        
        if (manifest.pins) {
            manifest.pins.forEach((pin, index) => {
                const defaultPin = String(index + 2);
                const regex = new RegExp('\\$\\{' + pin.id + '\\}', 'g');
                globals = globals.replace(regex, defaultPin);
                setup = setup.replace(regex, defaultPin);
                loop = loop.replace(regex, defaultPin);
            });
        }
        
        codeStr = libs + globals + '\n\nvoid setup() {\n  ' + setup.split('\n').join('\n  ') + '\n}\n\nvoid loop() {\n  ' + loop.split('\n').join('\n  ') + '\n}';
    } else {
        codeStr = 'void setup() {\n  // Put your setup code here\n}\n\nvoid loop() {\n  // Put your main code here\n}';
    }

    exampleCodeSection = '<h2>Example Code</h2>\n\n```cpp\n' + codeStr + '\n```\n';
    
    const payload = {
        board: "arduino_uno",
        components: [
            { id: "uno", type: "openhw-arduino-uno", x: -100, y: 50 },
            { id: "comp1", type: compId, x: 250, y: 80 }
        ],
        connections: [],
        code: codeStr
    };
    
    if (manifest.autowiring && manifest.autowiring.connections) {
        manifest.autowiring.connections.forEach(conn => {
            const toParts = conn.to.split(':');
            let toPin = toParts.length > 1 ? toParts[1] : conn.to;
            if (toPin === 'GND') toPin = 'gnd_1';
            else if (toPin === '3.3V') toPin = '3v3';
            else if (toPin.startsWith('D') && !isNaN(toPin.substring(1))) toPin = toPin.substring(1);
            
            payload.connections.push([ 'uno:' + toPin, 'comp1:' + conn.from, conn.color || "green", [] ]);
        });
    }

    const payloadEncoded = encodeURIComponent(JSON.stringify(payload));
    const tryBtn = `
<button class="try-btn" data-payload="${payloadEncoded}">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
  Try in Simulator
</button>
`;
    
    let extraContent = '';
    const possiblePaths = [
        path.join(componentDir, 'doc', 'index.html'),
        path.join(componentDir, 'docs', 'index.html'),
        path.join(componentDir, 'doc', 'content.html')
    ];
    let customDocPath = possiblePaths.find(p => fs.existsSync(p));
    
    if (customDocPath) {
        extraContent = fs.readFileSync(customDocPath, 'utf8');
        // Extract inner content from legacy HTML if it has full body tags
        const bodyMatch = extraContent.match(/<div class="content">([\s\S]*?)<\/div>\s*<\/body>/);
        if (bodyMatch) {
            extraContent = bodyMatch[1];
            extraContent = extraContent.replace(/<h1>.*?<\/h1>/, ''); // Remove duplicate h1
            extraContent = extraContent.replace(/<p class="subtitle">.*?<\/p>/, ''); // Remove duplicate subtitle
        } else {
            const bodyOnly = extraContent.match(/<body>([\s\S]*?)<\/body>/);
            if (bodyOnly) extraContent = bodyOnly[1];
        }
        
        // Sanitize the HTML using Cheerio in standard HTML mode
        const cheerio = require('cheerio');
        const $ = cheerio.load(extraContent);
        
        // Find and copy any relative images
        $('img').each(function() {
            let src = $(this).attr('src');
            if (src && !src.startsWith('http') && !src.startsWith('data:')) {
                // Resolve path relative to doc directory
                const imgSourcePath = path.resolve(path.dirname(customDocPath), src);
                if (fs.existsSync(imgSourcePath)) {
                    const imgName = path.basename(src);
                    const publicImagesDir = path.join(__dirname, '../public/images/components', path.basename(componentDir));
                    if (!fs.existsSync(publicImagesDir)) {
                        fs.mkdirSync(publicImagesDir, { recursive: true });
                    }
                    fs.copyFileSync(imgSourcePath, path.join(publicImagesDir, imgName));
                    $(this).attr('src', '/images/components/' + path.basename(componentDir) + '/' + imgName);
                }
            }
        });
        
        extraContent = $('body').html() || extraContent;
    }
    
    let svgIcon = "<svg width='100' height='100'><circle cx='50' cy='50' r='40' fill='#333'/></svg>";
    /*
    const uiPath = path.join(componentDir, 'ui.tsx');
    if (fs.existsSync(uiPath)) {
        let uiContent = fs.readFileSync(uiPath, 'utf8');
        let svgMatch = uiContent.match(/<svg[\s\S]*?<\/svg>/);
        if (svgMatch) {
            let svg = svgMatch[0];
            svg = svg.replace(/\{\/\*[\s\S]*?\*\/\}/g, '');
            // Strip complex template literals in attributes e.g. d={`...`}
            svg = svg.replace(/=\{`[\s\S]*?`\}/g, '=""');
            
            svg = svg.replace(/stroke=\{wireColor\}/g, 'stroke="#1e1e1e"');
            svg = svg.replace(/stroke=\{gateColor\}/g, 'stroke="#a855f7"');
            svg = svg.replace(/fill=\{[\s\S]*?\}/g, 'fill="currentColor"');
            svg = svg.replace(/style=\{\{.*?\}\}/g, '');
            svg = svg.replace(/=\{([^{}]+)\}/g, '="$1"');
            
            // Strip {array.map(...)} blocks to prevent them from emitting broken JSX elements
            svg = svg.replace(/\{[a-zA-Z0-9_]+\.map[\s\S]*?\}\s*\)\s*;\s*\}\)}/g, '');
            // A more generic catch-all for remaining JSX blocks that might emit broken tags
            // If the SVG still contains `.map(`, just fallback to a generic shape to avoid breaking the build.
            if (svg.includes('.map(')) {
                svg = "<svg width='100' height='100' viewBox='0 0 100 100'><rect width='100' height='100' fill='#222' rx='10'/><text x='50' y='55' fill='#888' text-anchor='middle' font-family='sans-serif' font-size='12'>Dynamic UI</text></svg>";
            }

            // Remove blank lines to prevent Markdown-It from splitting the HTML block into paragraphs
            svg = svg.replace(/^\s*[\r\n]/gm, '');
            svgIcon = svg;
        }
    }
    */
    
    // Breadcrumb logic
    const breadcrumb = `
<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=${encodeURIComponent(category)}">${getSafeString(category)}</a> &gt; 
  <span>${getSafeString(title)}</span>
</div>
`;

    // Wrapping in markdown
    const mdContent = `---
title: "${title.replace(/"/g, '\\"')}"
---

${breadcrumb}

<div class="component-header">
  <div class="component-visual" v-pre>
    ${svgIcon}
  </div>
  <div class="component-meta">
    <h1>${title}</h1>
    <p class="subtitle">${subtitle}</p>
  </div>
</div>

<div v-pre>
${extraContent.replace(/\n\s*\n/g, '\n')}
</div>

${pinsSection}

${attrsSection}

${exampleCodeSection}

<style scoped>
.custom-breadcrumb {
  margin-bottom: 2rem;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}
.custom-breadcrumb a {
  color: var(--vp-c-brand);
  text-decoration: none;
}
.custom-breadcrumb a:hover {
  text-decoration: underline;
}
.custom-breadcrumb span { color: var(--vp-c-text-1); font-weight: 600; }

.component-header {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  align-items: center;
}

.component-visual {
  width: 150px;
  height: 150px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.component-meta {
  flex: 1;
}

.pin-table, .attrs-table {
  width: 100%;
  margin-top: 1rem;
}

.pin-table th, .attrs-table th {
  text-align: left;
}

.pin-name {
  font-family: monospace;
  font-weight: bold;
}

.pin-type {
  display: inline-block;
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  font-size: 0.8rem;
  text-transform: uppercase;
}

.pin-type.digital { background: #3b82f622; color: #3b82f6; }
.pin-type.analog { background: #10b98122; color: #10b981; }
.pin-type.power { background: #ef444422; color: #ef4444; }

.badge {
  display: inline-block;
  padding: 0.2rem 0.5rem;
  background: var(--vp-c-brand-dimm);
  color: var(--vp-c-brand);
  border-radius: 12px;
  font-size: 0.8rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
}

  .subtitle { font-size: 16px; color: #718096; margin-bottom: 36px; border-bottom: 1px solid #2d3748; padding-bottom: 24px; }
  .component-preview { display: flex; gap: 40px; align-items: flex-start; margin-bottom: 40px; background: #1a1f2e; border: 1px solid #2d3748; border-radius: 12px; padding: 32px; }
  .component-svg-wrap { flex-shrink: 0; display: flex; flex-direction: column; align-items: center; gap: 12px; background: #111318; border: 1px solid #2d3748; border-radius: 8px; padding: 20px; }
  .component-info p { color: #a0aec0; font-size: 15px; margin-bottom: 16px; }
  
  .pin-table, .attrs-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px; }
  .pin-table th, .attrs-table th { background: #1a1f2e; color: #63b3ed; padding: 10px 14px; text-align: left; border: 1px solid #2d3748; }
  .pin-table td, .attrs-table td { padding: 10px 14px; border: 1px solid #2d3748; color: #a0aec0; }
  .pin-table tr:nth-child(even) td, .attrs-table tr:nth-child(even) td { background: #141824; }
  .pin-name { font-family: monospace; color: #68d391; font-weight: 600; }
  .pin-type { font-size: 11px; padding: 2px 8px; border-radius: 10px; font-weight: 600; }
  .pin-type.input  { background: #1a365d; color: #63b3ed; }
  .pin-type.output { background: #1c3d27; color: #68d391; }
  .pin-type.power { background: #4a1a1a; color: #fc8181; }
  .pin-type.analog { background: #4a3a1a; color: #f6ad55; }
  .pin-type.digital { background: #1a365d; color: #63b3ed; }
  .pin-type.pwm { background: #4a2a4a; color: #f687b3; }
  
  .code-block { background: #141824; border: 1px solid #2d3748; border-radius: 8px; padding: 20px 24px; font-family: 'Courier New', monospace; font-size: 13px; color: #e2e8f0; overflow-x: auto; margin-bottom: 20px; position: relative; }
  .copy-btn { position: absolute; top: 10px; right: 10px; background: #2d3748; border: none; color: #a0aec0; padding: 4px 10px; border-radius: 4px; font-size: 11px; cursor: pointer; }
  .copy-btn:hover { background: #4a5568; color: #fff; }
  
  .try-btn { display: inline-flex; align-items: center; gap: 8px; background: #2b6cb0; color: #fff; border: none; padding: 12px 24px; border-radius: 8px; font-size: 15px; font-weight: 600; cursor: pointer; transition: background 0.2s; margin-top: 16px; }
  .try-btn:hover { background: #3182ce; }
  .try-btn svg { width: 18px; height: 18px; }
  
  .note { background: #1a2a1a; border-left: 4px solid #68d391; padding: 14px 18px; border-radius: 0 8px 8px 0; margin-bottom: 20px; font-size: 14px; color: #9ae6b4; }
  .warn { background: #2a1a00; border-left: 4px solid #f6ad55; padding: 14px 18px; border-radius: 0 8px 8px 0; margin-bottom: 20px; font-size: 14px; color: #fbd38d; }
  
  .circuit-preview { background: #0d1117; border: 1px solid #2d3748; border-radius: 8px; padding: 20px; margin-top: 16px; display: flex; align-items: center; justify-content: center; min-height: 140px; }
</style>
`;
    
    return {
      compId,
      title,
      category,
      description: subtitle,
      tags,
      svgIcon,
      mdContent
    };
}

function run() {
    console.log("Starting component docs automated generation...");
    const components = fs.readdirSync(EMULATOR_COMPONENTS_DIR, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    const catalogData = [];
    const categoriesMap = {};

    // Remove old html files if any
    const oldHtmls = fs.readdirSync(DOCS_OUTPUT_DIR).filter(f => f.endsWith('.html') && f !== 'index.html' && f !== 'template.html');
    oldHtmls.forEach(f => fs.unlinkSync(path.join(DOCS_OUTPUT_DIR, f)));

    components.forEach((comp, index) => {
        const compDir = path.join(EMULATOR_COMPONENTS_DIR, comp);
        const manifestPath = path.join(compDir, 'manifest.json');
        
        if (fs.existsSync(manifestPath)) {
            try {
                const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
                const result = generateComponentDoc(compDir, manifest);
                
                const outName = result.compId + '.md';
                const outPath = path.join(DOCS_OUTPUT_DIR, outName);
                
                fs.writeFileSync(outPath, result.mdContent, 'utf8');
                
                catalogData.push({
                    id: result.compId,
                    name: result.title,
                    category: result.category,
                    description: result.description,
                    tags: result.tags,
                    svgIcon: result.svgIcon
                });
                
                if (!categoriesMap[result.category]) categoriesMap[result.category] = [];
                categoriesMap[result.category].push({ text: result.title, link: '/components/' + result.compId });
                
            } catch (err) {
                console.error('Error processing ' + comp + ':', err.message);
            }
        }
    });

    // Write components-data.json
    fs.writeFileSync(path.join(DOCS_OUTPUT_DIR, 'components-data.json'), JSON.stringify(catalogData, null, 2), 'utf8');
    
    // Update config.mts sidebar dynamically
    const configPath = path.join(__dirname, '../.vitepress/config.mts');
    let configContent = fs.readFileSync(configPath, 'utf8');
    
    // Find Components sidebar block and replace its items array
    // Since regex replacement of JS objects is brittle, we'll replace the predefined categories section
    const orderedCategories = ['Digital Components', 'Sensors', 'Actuators', 'Displays', 'Motors & Drivers', 'Communication Modules', 'Power Components', 'Logic Components', 'Miscellaneous'];
    
    const rx = /\/\/ AUTO-GENERATED-COMPONENTS-START[\s\S]*?\/\/ AUTO-GENERATED-COMPONENTS-END/;
    let generatedItems = '';
    orderedCategories.forEach(cat => {
      const items = categoriesMap[cat] || [];
      if (items.length > 0) {
        generatedItems += `          {\n            text: '${cat}',\n            collapsed: true,\n            items: ${JSON.stringify(items)}\n          },\n`;
      }
    });
    configContent = configContent.replace(rx, '// AUTO-GENERATED-COMPONENTS-START\n' + generatedItems + '          // AUTO-GENERATED-COMPONENTS-END');
    
    fs.writeFileSync(configPath, configContent, 'utf8');
    
    console.log("Successfully generated", catalogData.length, "markdown component pages.");
    console.log("Updated components-data.json and VitePress sidebar config.");
}

run();
