// postbuild.mjs
import { writeFileSync, existsSync, readFileSync } from 'node:fs';

// Fix admin panel asset paths
const adminHtmlPath = 'dist/admin/index.html';
if (existsSync(adminHtmlPath)) {
  let html = readFileSync(adminHtmlPath, 'utf8');
  // Replace relative paths with absolute paths including the base path
  html = html.replace(/href="\.\/admin\.css[^"]*"/g, 'href="/landing-page/admin/admin.css"');
  html = html.replace(/src="\.\/js\/app\.js[^"]*"/g, 'src="/landing-page/admin/js/app.js"');
  html = html.replace(/href="\.\/favicon\.svg[^"]*"/g, 'href="/landing-page/admin/favicon.svg"');
  writeFileSync(adminHtmlPath, html, 'utf8');
  console.log('[postbuild] Fixed admin asset paths');
}

// Create .nojekyll to prevent Jekyll processing
writeFileSync('dist/.nojekyll', '');
console.log('[postbuild] Created .nojekyll');