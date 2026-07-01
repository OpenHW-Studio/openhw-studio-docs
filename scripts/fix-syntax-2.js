const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../components');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md') && f !== 'index.md' && f !== 'catalog.md');

let numFixed = 0;
files.forEach(f => {
  let p = path.join(dir, f);
  let text = fs.readFileSync(p, 'utf8');
  
  if (text.includes('<div class="legacy-component-wrapper">')) {
    text = text.replace('<div class="legacy-component-wrapper">\n', '');
    
    // The closing div is before <style scoped>
    // In our generate script we had:
    // </div>
    // 
    // <style scoped>
    
    // Replace the last </div> before <style scoped>
    const parts = text.split('<style scoped>');
    if (parts.length > 1) {
      let mainContent = parts[0];
      const lastDivIndex = mainContent.lastIndexOf('</div>');
      if (lastDivIndex !== -1) {
        mainContent = mainContent.substring(0, lastDivIndex) + mainContent.substring(lastDivIndex + 6);
        text = mainContent + '<style scoped>' + parts[1];
        if (parts.length > 2) {
          text += '<style scoped>' + parts[2]; // handle the two scoped style blocks
        }
      }
    }

    // Vue also throws errors if there are unescaped < and > inside markdown text that looks like a tag.
    // For example, #include <Wire.h> is still technically unescaped if outside a ```cpp block.
    // Wait, the previous script replaced all <pre> blocks with ```cpp blocks!
    // Since it's now inside ```cpp, Vue will ignore it IF it's correctly recognized as a Markdown codeblock.
    // And to be recognized as Markdown, it must NOT be inside an HTML block tag!
    // By removing <div class="legacy-component-wrapper">, the Markdown parser will correctly process the codeblocks.

    fs.writeFileSync(p, text);
    numFixed++;
  }
});

console.log('Removed wrapper from', numFixed, 'files');
