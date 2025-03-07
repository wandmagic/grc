#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Simple implementation of generateId - matches the one in schemaLoader.ts
function generateId() {
  return Math.random().toString(36).substring(2, 15);
}

// Function to update a bundle with shortids
function updateBundleWithShortids(bundle) {
  // Create a mapping of old IDs to new IDs
  const idMap = {};
  
  // Update bundle ID
  const oldBundleId = bundle.id;
  bundle.id = generateId();
  if (!bundle.name) {
    bundle.name = oldBundleId;
  }
  
  // Update node IDs
  bundle.nodes.forEach(node => {
    const oldId = node.id;
    const newId = generateId();
    idMap[oldId] = newId;
    
    // Move descriptive ID to name if name doesn't exist
    if (!node.name) {
      node.name = oldId;
    }
    
    node.id = newId;
  });
  
  // Update link IDs and references
  bundle.links.forEach(link => {
    const oldId = link.id;
    const newId = generateId();
    
    // Move descriptive ID to name if name doesn't exist
    if (!link.name) {
      link.name = oldId;
    }
    
    link.id = newId;
    
    // Update origin/target references
    if (link.origin && idMap[link.origin]) {
      link.origin = idMap[link.origin];
    }
    
    if (link.target && idMap[link.target]) {
      link.target = idMap[link.target];
    }
    
    // Update other reference fields for compatibility
    if (link.from && idMap[link.from]) {
      link.from = idMap[link.from];
    }
    
    if (link.to && idMap[link.to]) {
      link.to = idMap[link.to];
    }
    
    if (link.targetId && idMap[link.targetId]) {
      link.targetId = idMap[link.targetId];
    }
    
    if (typeof link.source === 'string' && idMap[link.source]) {
      link.source = idMap[link.source];
    }
    
    if (typeof link.target === 'string' && idMap[link.target]) {
      link.target = idMap[link.target];
    }
  });
  
  return bundle;
}

// Process the risk-management-example.json file
const examplesDir = path.join(__dirname, '..', 'examples');
const publicExamplesDir = path.join(__dirname, '..', 'frontend', 'public', 'examples');

// Process the main examples directory
const riskExamplePath = path.join(examplesDir, 'risk-management-example.json');
let riskExample = JSON.parse(fs.readFileSync(riskExamplePath, 'utf8'));
riskExample = updateBundleWithShortids(riskExample);
fs.writeFileSync(riskExamplePath, JSON.stringify(riskExample, null, 2));
console.log(`Updated ${riskExamplePath} with shortids`);

// Process the public examples directory
const publicRiskExamplePath = path.join(publicExamplesDir, 'risk-management-example.json');
if (fs.existsSync(publicRiskExamplePath)) {
  let publicRiskExample = JSON.parse(fs.readFileSync(publicRiskExamplePath, 'utf8'));
  publicRiskExample = updateBundleWithShortids(publicRiskExample);
  fs.writeFileSync(publicRiskExamplePath, JSON.stringify(publicRiskExample, null, 2));
  console.log(`Updated ${publicRiskExamplePath} with shortids`);
}

console.log('Done updating examples with shortids');
