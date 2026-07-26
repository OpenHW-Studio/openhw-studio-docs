const fs = require('fs');
const path = require('path');

const COMPONENTS_DIR = path.join(__dirname, '../components');

// Read dummy component data to get categories for breadcrumbs
const compDataPath = path.join(COMPONENTS_DIR, 'components-data.json');
let compData = [];
if (fs.existsSync(compDataPath)) {
    compData = JSON.parse(fs.readFileSync(compDataPath, 'utf8'));
}

const files = fs.readdirSync(COMPONENTS_DIR).filter(f => f.endsWith('.html') && f !== 'template.html');

files.forEach((file, index) => {
    const filePath = path.join(COMPONENTS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf8');

    // Extract title
    const titleMatch = content.match(/<title>(.*?)<\/title>/);
    let title = titleMatch ? titleMatch[1].replace(' | OpenHW Studio', '').replace(' Reference', '') : file.replace('.html', '');

    // Extract the exact body content
    const bodyMatch = content.match(/<body>([\s\S]*?)<\/body>/);
    let bodyContent = bodyMatch ? bodyMatch[1] : '';

    // Remove the breadcrumb from HTML since we'll generate a proper one
    bodyContent = bodyContent.replace(/<div class="breadcrumb">[\s\S]*?<\/div>\s*<br>/, '');

    // Extract style block
    const styleMatch = content.match(/<style>([\s\S]*?)<\/style>/);
    let styles = styleMatch ? styleMatch[1] : '';
    let styleBlock = `\n<style scoped>\n${styles}\n</style>\n`;
    
    // Fix inline Vue events
    bodyContent = bodyContent.replace(/onclick="copyCode\(this\)"/g, '@click="copyCode($event.target)"');
    bodyContent = bodyContent.replace(/onclick="openSimulator\(\)"/g, '@click="openSimulator()"');

    // Extract script content
    const scriptMatch = content.match(/<script>([\s\S]*?)<\/script>/);
    let scriptContent = scriptMatch ? scriptMatch[1] : '';
    let scriptBlock = `\n<script setup>\n${scriptContent}\n</script>\n`;
    
    // Remove the old script tag from bodyContent
    bodyContent = bodyContent.replace(/<script>[\s\S]*?<\/script>/, '');

    // Category mapping (Fallback if not in data)
    let category = "Miscellaneous";
    const compRecord = compData.find(c => c.id === file.replace('.html', ''));
    if (compRecord) {
        category = compRecord.category;
    }

    // Previous/Next links
    let prevName = index > 0 ? files[index - 1].replace('.html', '') : null;
    let nextName = index < files.length - 1 ? files[index + 1].replace('.html', '') : null;

    const prevNext = `
<div class="component-nav">
  ${prevName ? `<a href="/docs/components/${prevName}" class="nav-prev">← Previous Component</a>` : '<span></span>'}
  ${nextName ? `<a href="/docs/components/${nextName}" class="nav-next">Next Component →</a>` : '<span></span>'}
</div>
`;

    const breadcrumb = `
<div class="custom-breadcrumb">
  <a href="/docs/">Home</a> &gt; 
  <a href="/docs/components/">Components</a> &gt; 
  <a href="/docs/components/catalog?category=${encodeURIComponent(category)}">${category}</a> &gt; 
  <span>${title}</span>
</div>
`;

    // Wrapping
    const mdContent = `---
title: "${title}"
---

${scriptBlock}

<div class="legacy-component-wrapper">
${breadcrumb}
${bodyContent}
${prevNext}
</div>

${styleBlock}

<style scoped>
.custom-breadcrumb {
  margin-bottom: 24px;
  font-size: 14px;
  color: var(--vp-c-text-2);
}
.custom-breadcrumb a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
}
.custom-breadcrumb a:hover {
  text-decoration: underline;
}
.custom-breadcrumb span {
  color: var(--vp-c-text-1);
  font-weight: 600;
}
.component-nav {
  display: flex;
  justify-content: space-between;
  margin-top: 48px;
  padding-top: 24px;
  border-top: 1px solid var(--vp-c-divider);
}
.component-nav a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s;
}
.component-nav a:hover {
  color: var(--vp-c-brand-2);
}
</style>
`;

    const mdFilePath = path.join(COMPONENTS_DIR, file.replace('.html', '.md'));
    fs.writeFileSync(mdFilePath, mdContent, 'utf8');
    
    // Delete HTML
    fs.unlinkSync(filePath);
});
console.log('Migrated', files.length, 'components.');
