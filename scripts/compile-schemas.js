#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Create dist directory if it doesn't exist
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist', { recursive: true });
}

// Load all schemas
console.log('Loading schemas...');
const nodeSchema = JSON.parse(fs.readFileSync('node.schema.json', 'utf8'));
const linkSchema = JSON.parse(fs.readFileSync('link.schema.json', 'utf8'));
const bundleSchema = JSON.parse(fs.readFileSync('bundle.schema.json', 'utf8'));

// Load node schemas
const nodeSchemas = {};
const nodeFiles = fs.readdirSync('nodes');
const nodeRefs = [];
for (const file of nodeFiles) {
  if (file.endsWith('.schema.json')) {
    const schema = JSON.parse(fs.readFileSync(path.join('nodes', file), 'utf8'));
    const typeName = file.replace('.schema.json', '');
    nodeSchemas[typeName] = schema;
    nodeRefs.push({ "$ref": `nodes/${file}` });
  }
}

// Load link schemas
const linkSchemas = {};
const linkFiles = fs.readdirSync('links');
const linkRefs = [];
for (const file of linkFiles) {
  if (file.endsWith('.schema.json')) {
    console.log("Reading "+file);
    const schema = JSON.parse(fs.readFileSync(path.join('links', file), 'utf8'));
    const typeName = file.replace('.schema.json', '');
    linkSchemas[typeName] = schema;
    linkRefs.push({ "$ref": `links/${file}` });
  }
}

// Update the bundle schema with dynamic references
bundleSchema.allOf[1].properties.nodes.items.oneOf = nodeRefs;
bundleSchema.allOf[1].properties.links.items.oneOf = linkRefs;

// Write the updated bundle schema back to file
fs.writeFileSync('bundle.schema.json', JSON.stringify(bundleSchema, null, 2));
console.log('Updated bundle.schema.json with dynamic references');

// Create a compiled schema
console.log('Creating compiled schema...');

// Extract the node definition from the schema file
const nodeDefinition = nodeSchema.definitions.node;

// Create a modified link definition that doesn't reference node.schema.json
const linkDefinition = {
  allOf: [
    // Replace the $ref to node.schema.json with the actual node schema
    nodeDefinition,
    // Include the rest of the link definition
    linkSchema.definitions.link.allOf[1]
  ]
};

// Helper function to convert from/to to origin/target in link schemas
function convertLinkProperties(schema) {
  // Deep clone the schema to avoid modifying the original
  const convertedSchema = JSON.parse(JSON.stringify(schema));
  
  // If the schema has allOf, process each item
  if (convertedSchema.allOf && convertedSchema.allOf.length > 0) {
    convertedSchema.allOf.forEach(item => {
      if (item.properties) {
        // Rename from to origin
        if (item.properties.from) {
          item.properties.origin = item.properties.from;
          delete item.properties.from;
        }
        
        // Rename to to target
        if (item.properties.to) {
          item.properties.target = item.properties.to;
          delete item.properties.to;
        }
        
        // Update required properties
        if (item.required) {
          const fromIndex = item.required.indexOf('from');
          if (fromIndex !== -1) {
            item.required[fromIndex] = 'origin';
          }
          
          const toIndex = item.required.indexOf('to');
          if (toIndex !== -1) {
            item.required[toIndex] = 'target';
          }
        }
      }
    });
  }
  
  return convertedSchema;
}

const compiledSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "GRC Bundle Schema",
  description: "A schema for representing a bundle of nodes and links in a Governance, Risk, and Compliance (GRC) model",
  type: "object",
  allOf: [
    {
      type: "object",
      required: ["id", "type"],
      properties: {
        id: {
          type: "string",
          description: "Unique identifier for the node"
        },
        type: {
          type: "string",
          description: "Type of the node",
          const: "bundle"
        }
      }
    },
    {
      properties: {
        nodes: {
          type: "array",
          description: "Collection of nodes in the bundle",
          items: {
            oneOf: Object.values(nodeSchemas).map(schema => {
              // Inline the node schema definition
              const inlinedSchema = JSON.parse(JSON.stringify(schema));
              
              // Replace the $ref to node.schema.json with the actual node schema
              if (inlinedSchema.allOf && inlinedSchema.allOf.length > 0) {
                const nodeRef = inlinedSchema.allOf.find(item => item.$ref && item.$ref.includes('node.schema.json'));
                if (nodeRef) {
                  const index = inlinedSchema.allOf.indexOf(nodeRef);
                  inlinedSchema.allOf[index] = nodeDefinition;
                }
              }
              
              return inlinedSchema;
            })
          }
        },
        links: {
          type: "array",
          description: "Collection of links between nodes",
          items: {
            oneOf: Object.values(linkSchemas).map(schema => {
              // Inline the link schema definition
              const inlinedSchema = JSON.parse(JSON.stringify(schema));
              
              // Replace the $ref to link.schema.json with the actual link schema
              if (inlinedSchema.allOf && inlinedSchema.allOf.length > 0) {
                const linkRef = inlinedSchema.allOf.find(item => item.$ref && item.$ref.includes('link.schema.json'));
                if (linkRef) {
                  const index = inlinedSchema.allOf.indexOf(linkRef);
                  inlinedSchema.allOf[index] = linkDefinition;
                }
              }
              
              // Convert from/to properties to origin/target
              const convertedSchema = convertLinkProperties(inlinedSchema);
              
              return convertedSchema;
            })
          }
        },
        metadata: {
          type: "object",
          description: "Metadata about the bundle",
          properties: {
            name: {
              type: "string",
              description: "Name of the bundle"
            },
            description: {
              type: "string",
              description: "Description of the bundle"
            },
            version: {
              type: "string",
              description: "Version of the bundle"
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Date and time when the bundle was created"
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Date and time when the bundle was last updated"
            },
            createdBy: {
              type: "string",
              description: "Person or entity that created the bundle"
            },
            organization: {
              type: "string",
              description: "Organization that owns the bundle"
            },
            tags: {
              type: "array",
              description: "Tags associated with the bundle",
              items: {
                type: "string"
              }
            }
          }
        }
      },
      required: ["nodes", "links"]
    }
  ]
};

// Create output directories
const distDir = 'dist';
const frontendDistDir = 'frontend/public/dist';

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

if (!fs.existsSync(frontendDistDir)) {
  fs.mkdirSync(frontendDistDir, { recursive: true });
}

// Write the compiled schema to files
console.log('Writing compiled schema...');
const schemaJson = JSON.stringify(compiledSchema, null, 2);
fs.writeFileSync(path.join(distDir, 'grc-schema.json'), schemaJson);
fs.writeFileSync(path.join(frontendDistDir, 'grc-schema.json'), schemaJson);

console.log('Schema compilation complete:');
console.log(`- ${path.join(distDir, 'grc-schema.json')}`);
console.log(`- ${path.join(frontendDistDir, 'grc-schema.json')}`);
