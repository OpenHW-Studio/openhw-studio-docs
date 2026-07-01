const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '../components');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md') && f !== 'index.md' && f !== 'catalog.md');

files.forEach(f => {
  let p = path.join(dir, f);
  let text = fs.readFileSync(p, 'utf8');
  
  // Add newlines around <h2> and <table> to prevent Markdown-It from wrapping them in <p>
  text = text.replace(/(<\/h2>|<\/h3>|<\/table>|<\/div>|<div[^>]*>)/g, '$1\n\n');
  text = text.replace(/(<table[^>]*>|<h2>|<h3>|<div[^>]*>|<\/div>)/g, '\n\n$1');
  
  // Clean up excessive newlines
  text = text.replace(/\n{3,}/g, '\n\n');
  
  fs.writeFileSync(p, text);
});
console.log('Added newlines around block tags in', files.length, 'files');
