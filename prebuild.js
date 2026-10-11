// prebuild.js
// Sets site.basePath from PLAIN_BASE_PATH env var before build.js runs.
// Local dev:      PLAIN_BASE_PATH=""          -> basePath=""
// GitHub Pages:   PLAIN_BASE_PATH="/repo/"    -> basePath="/repo/"

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const envBase = process.env.PLAIN_BASE_PATH;

if (envBase === undefined) {
  // Env var not set - keep existing basePath
  process.exit(0);
}

const configPath = join(__dirname, 'site.config.json');
if (!existsSync(configPath)) {
  console.warn('[prebuild] site.config.json not found, skipping');
  process.exit(0);
}

const cfg = JSON.parse(readFileSync(configPath, 'utf8'));
if (!cfg.site) cfg.site = {};

// Normalize: empty string means root
let normalized = '';
if (envBase !== '') {
  const trimmed = envBase.replace(/^\/+|\/+$/g, '');
  normalized = trimmed === '' ? '' : '/' + trimmed + '/';
}

if (cfg.site.basePath !== normalized) {
  cfg.site.basePath = normalized;
  writeFileSync(configPath, JSON.stringify(cfg, null, 2), 'utf8');
  console.log('[prebuild] basePath set to "' + (normalized || '/') + '"');
} else {
  console.log('[prebuild] basePath already "' + (normalized || '/') + '"');
}