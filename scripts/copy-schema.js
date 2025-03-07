#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Create frontend/public/dist directory if it doesn't exist
const targetDir = path.join('frontend', 'public', 'dist');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Copy the compiled schema from dist/ to frontend/public/dist/
const sourceFile = path.join('dist', 'grc-schema.json');
const targetFile = path.join(targetDir, 'grc-schema.json');

console.log(`Copying ${sourceFile} to ${targetFile}...`);
fs.copyFileSync(sourceFile, targetFile);
console.log('Schema copied successfully.');
