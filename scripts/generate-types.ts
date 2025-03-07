#!/usr/bin/env ts-node

/**
 * Generate TypeScript definitions from the compiled GRC schema
 * 
 * This script generates TypeScript interfaces from the compiled JSON schema in dist/grc-schema.json.
 * It creates a single types file that contains all the type definitions.
 * 
 * Usage: ts-node generate-types.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { compile } from 'json-schema-to-typescript';

// Input and output paths
const SCHEMA_PATH = path.resolve(__dirname, '../dist/grc-schema.json');
const OUTPUT_DIR = path.resolve(__dirname, '../src/types');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'grc.d.ts');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Main function
async function main(): Promise<void> {
  try {
    console.log('Generating TypeScript definitions from compiled schema...');
    
    // Check if the schema file exists
    if (!fs.existsSync(SCHEMA_PATH)) {
      throw new Error(`Schema file not found: ${SCHEMA_PATH}. Make sure to run 'npm run compile' first.`);
    }
    
    // Read and parse the schema
    const schema = JSON.parse(fs.readFileSync(SCHEMA_PATH, 'utf8'));
    
    // Compile schema to TypeScript
    const ts = await compile(schema, 'GRC', {
      bannerComment: `// Generated from ${path.relative(process.cwd(), SCHEMA_PATH)}`,
      style: {
        singleQuote: true,
        semi: true,
        tabWidth: 2,
        trailingComma: 'all',
      }
    });
    
    // Write the output file
    fs.writeFileSync(OUTPUT_FILE, ts);
    console.log(`Generated ${OUTPUT_FILE}`);
    
    // Create an index.ts file that exports the types
    const indexContent = `export * from './grc';\n`;
    fs.writeFileSync(path.join(OUTPUT_DIR, 'index.ts'), indexContent);
    console.log(`Generated ${path.join(OUTPUT_DIR, 'index.ts')}`);
    
    console.log('TypeScript definitions generation completed successfully!');
  } catch (error) {
    console.error('Error generating TypeScript definitions:', error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}
