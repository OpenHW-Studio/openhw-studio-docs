const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const dir = path.join(__dirname, '../components');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md') && f !== 'index.md' && f !== 'catalog.md');

let numFixed = 0;
files.forEach(f => {
  let p = path.join(dir, f);
  let text = fs.readFileSync(p, 'utf8');
  
  // Extract frontmatter
  const fmMatch = text.match(/^---[\s\S]*?---\n/);
  const fm = fmMatch ? fmMatch[0] : '';
  text = text.replace(fm, '');

  // Extract script setup
  const scriptMatch = text.match(/<script setup>[\s\S]*?<\/script>\n/);
  const script = scriptMatch ? scriptMatch[0] : '';
  text = text.replace(script, '');

  // Extract style scoped
  // Note: there might be multiple <style scoped> blocks.
  const styles = [];
  let styleMatch;
  while ((styleMatch = text.match(/<style scoped>[\s\S]*?<\/style>\n?/))) {
    styles.push(styleMatch[0]);
    text = text.replace(styleMatch[0], '');
  }

  // Now 'text' is just the HTML content (plus maybe some markdown code blocks)
  // Wait, if it contains ```cpp, Cheerio will mess it up!
  // It will encode ``` as text, but it will strip newlines inside pre blocks if not careful!
  // Let's replace ```cpp blocks with a placeholder before passing to Cheerio.
  const codeBlocks = [];
  text = text.replace(/```cpp[\s\S]*?```/g, match => {
    codeBlocks.push(match);
    return `<!-- CODEBLOCK_${codeBlocks.length - 1} -->`;
  });

  // Load into cheerio to fix unclosed tags
  const $ = cheerio.load(text, null, false);
  let fixedHtml = $.html();

  // Restore codeblocks
  codeBlocks.forEach((block, index) => {
    fixedHtml = fixedHtml.replace(`<!-- CODEBLOCK_${index} -->`, block);
  });

  // Reassemble
  const finalMd = fm + script + fixedHtml + '\n' + styles.join('\n');
  
  fs.writeFileSync(p, finalMd);
  numFixed++;
});

console.log('Cheerio fixed HTML in', numFixed, 'files');
