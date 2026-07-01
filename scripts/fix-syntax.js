const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../components');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md') && f !== 'index.md' && f !== 'catalog.md');

files.forEach(f => {
  let p = path.join(dir, f);
  let text = fs.readFileSync(p, 'utf8');
  
  // Clean up <pre> blocks to markdown code blocks
  text = text.replace(/<pre>([\s\S]*?)<\/pre>/g, (match, inner) => {
    // strip HTML tags
    let clean = inner.replace(/<[^>]*>/g, '');
    // unescape basic HTML entities
    clean = clean.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '\"');
    return '\n```cpp\n' + clean.trim() + '\n```\n';
  });

  // Vue compiler chokes on {{ and }} inside text, let's wrap them in v-pre if needed
  text = text.replace(/\{\{/g, '<span v-pre>{{</span>');
  
  // Also fix any unclosed span tags if they still exist outside pre blocks
  // Though realistically most were inside pre blocks.

  fs.writeFileSync(p, text);
});
console.log('Fixed syntax in', files.length, 'files');
