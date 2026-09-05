// Fails when an internal link in dist/ points to a page or asset that does not exist.
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
const dist = resolve('dist'); const base = '/opentransit/';
const html = []; (function walk(d) { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : f.endsWith('.html') && html.push(p); } })(dist);
let bad = 0;
for (const file of html) {
  const src = readFileSync(file, 'utf8');
  for (const m of src.matchAll(/(?:href|src)="([^"#?]+)/g)) {
    const url = m[1];
    if (/^(https?:|mailto:|data:|\/\/)/.test(url)) continue;
    let path = url.startsWith('/') ? url : join(file.replace(/[^/]+$/, ''), url).replace(dist, '');
    if (!path.startsWith(base)) { console.error(`✗ ${file}: link outside base: ${url}`); bad++; continue; }
    path = path.slice(base.length - 1);
    const candidates = [join(dist, path), join(dist, path, 'index.html'), join(dist, path + '.html')];
    if (!candidates.some(existsSync)) { console.error(`✗ ${file.replace(dist, '')}: broken ${url}`); bad++; }
  }
}
console.log(bad ? `${bad} broken links` : `links ok (${html.length} pages)`); process.exit(bad ? 1 : 0);
