import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const failures = [];
async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) await walk(file);
    else if (/\.(tsx?|mdx)$/.test(file) && (await readFile(file, 'utf8')).includes('\u2014')) failures.push(file);
  }
}
for (const directory of ['app', 'components', 'content', 'lib']) await walk(directory);
if (failures.length) throw new Error(`Em dashes found in: ${failures.join(', ')}`);
console.log('Content punctuation check passed.');
