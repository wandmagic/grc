#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Create frontend/public/examples directory if it doesn't exist
const targetDir = path.join('frontend', 'public', 'examples');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Copy all example files from examples/ to frontend/public/examples/
const sourceDir = 'examples';
const exampleFiles = fs.readdirSync(sourceDir);

console.log('Copying example files to frontend/public/examples/...');
for (const file of exampleFiles) {
  if (file.endsWith('.json')) {
    const sourcePath = path.join(sourceDir, file);
    const targetPath = path.join(targetDir, file);
    
    fs.copyFileSync(sourcePath, targetPath);
    console.log(`Copied ${sourcePath} to ${targetPath}`);
  }
}

console.log('Example files copied successfully.');
