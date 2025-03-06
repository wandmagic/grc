#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Check if Ajv is installed
try {
  require.resolve('ajv');
  require.resolve('ajv-formats');
} catch (e) {
  console.error('Error: Required dependencies not found.');
  console.error('Please install them with: npm install ajv ajv-formats --save-dev');
  process.exit(1);
}

const Ajv = require('ajv');
const addFormats = require('ajv-formats');

// Create Ajv instance with more lenient options
const ajv = new Ajv({ 
  allErrors: true, 
  verbose: true,
  strict: false,
  strictSchema: false,
  strictNumbers: false,
  strictRequired: false,
  strictTypes: false
});
addFormats(ajv);

// Load the compiled schema
console.log('Loading compiled schema...');
let schema;
try {
  schema = JSON.parse(fs.readFileSync(path.join(__dirname, '../dist/grc-schema.json'), 'utf8'));
} catch (error) {
  console.error('Error loading schema:', error.message);
  console.error('Make sure you have run "npm run compile" to generate the compiled schema.');
  process.exit(1);
}

// Validate the schema itself against the JSON Schema meta-schema
console.log('Validating the schema against JSON Schema meta-schema...');
try {
  // Create a new Ajv instance just for schema validation
  const metaAjv = new Ajv({ allErrors: true });
  const validateSchema = metaAjv.compile({
    "$schema": "http://json-schema.org/draft-07/schema#",
    "$ref": "http://json-schema.org/draft-07/schema#"
  });
  
  const schemaValid = validateSchema(schema);
  
  if (schemaValid) {
    console.log('✅ Schema is valid against JSON Schema meta-schema.');
  } else {
    console.log('❌ Schema is invalid against JSON Schema meta-schema:');
    validateSchema.errors.forEach(error => {
      console.log(`  - ${error.instancePath || '/'}: ${error.message}`);
      if (error.params) {
        console.log(`    Params: ${JSON.stringify(error.params)}`);
      }
    });
    process.exit(1);
  }
} catch (error) {
  console.error('Error validating schema:', error.message);
  // Continue with example validation even if schema validation fails
}

// Compile the schema
const validate = ajv.compile(schema);

// Get all example files
console.log('\nFinding example files...');
const examplesDir = path.join(__dirname, '../examples');
const exampleFiles = fs.readdirSync(examplesDir)
  .filter(file => file.endsWith('.json'))
  .map(file => path.join(examplesDir, file));

if (exampleFiles.length === 0) {
  console.log('No example files found in the examples directory.');
  process.exit(0);
}

// Validate each example
let hasErrors = false;
console.log(`Found ${exampleFiles.length} example files. Validating...`);

exampleFiles.forEach(file => {
  const relativePath = path.relative(process.cwd(), file);
  console.log(`\nValidating ${relativePath}...`);
  
  try {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    
    // Validate the bundle
    const valid = validate(data);
    
    if (valid) {
      console.log(`✅ ${relativePath} is valid.`);
    } else {
      console.log(`❌ ${relativePath} is invalid:`);
      hasErrors = true;
      
      // Format and display validation errors
      validate.errors.forEach(error => {
        console.log(`  - ${error.instancePath || '/'}: ${error.message}`);
        if (error.params) {
          console.log(`    Params: ${JSON.stringify(error.params)}`);
        }
      });
    }
  } catch (error) {
    console.error(`Error processing ${relativePath}:`, error.message);
    hasErrors = true;
  }
});

console.log('\nValidation complete.');
if (hasErrors) {
  console.log('❌ Some examples failed validation.');
  process.exit(1);
} else {
  console.log('✅ All examples are valid.');
  process.exit(0);
}
