#!/usr/bin/env node
/**
 * PixelWeirdo — Add Images (one-shot runner)
 * Fetches all game images from Unsplash then injects them into HTML files.
 *
 * Run: node add-images.js
 *
 * Requirements: Node.js (already available if you can run this file)
 * No npm install needed — uses only built-in Node modules.
 */

const { execSync } = require('child_process');
const path = require('path');

console.log('╔══════════════════════════════════════════╗');
console.log('║  PixelWeirdo — Image Setup                ║');
console.log('╚══════════════════════════════════════════╝\n');

console.log('STEP 1 — Downloading images from Unsplash...\n');
try {
  execSync(`node "${path.join(__dirname, 'fetch-images.js')}"`, { stdio: 'inherit' });
} catch (e) {
  console.error('fetch-images.js failed — check your API key and internet connection');
  process.exit(1);
}

console.log('\nSTEP 2 — Injecting images into HTML files...\n');
try {
  execSync(`node "${path.join(__dirname, 'inject-images.js')}"`, { stdio: 'inherit' });
} catch (e) {
  console.error('inject-images.js failed');
  process.exit(1);
}

console.log('\n══════════════════════════════════════════');
console.log('✅ All done! Your site now has real images.');
console.log('Drag the pixelweirdo folder to netlify.com/drop');
console.log('══════════════════════════════════════════\n');
