#!/usr/bin/env ts-node

/**
 * OSCAL Catalog Importer
 * 
 * This script imports an OSCAL catalog JSON file into the GRC schema format.
 * It creates a framework node for the catalog, control nodes for each control,
 * and establishes appropriate relationships between them.
 * 
 * Usage: ts-node import-oscal-catalog.ts <path-to-oscal-catalog.json> [output-file.json]
 */

import * as fs from 'fs';
import * as path from 'path';
import { randomUUID } from 'crypto';
import { GRCBundleSchema, FrameworkNode, ControlNode, FrameworkAssociationLink } from "../src/types/grc";
import type { Catalog, Control as OscalControl, Part as OscalPart } from 'oscal';
import { 
  createMapper, 
  createMap, 
  forMember, 
  mapFrom, 
  Mapper, 
  MappingConfiguration 
} from "@automapper/core";
import { classes } from "@automapper/classes";
import 'reflect-metadata';

// Check command line arguments
if (process.argv.length < 3) {
  console.error('Usage: ts-node import-oscal-catalog.ts <path-to-oscal-catalog.json> [output-file.json]');
  process.exit(1);
}

const inputFile = process.argv[2];
const outputFile = process.argv.length > 3 ? process.argv[3] : path.basename(inputFile, '.json') + '-grc.json';

// Read the OSCAL catalog file
let catalogData: { catalog: Catalog };
try {
  const fileContent = fs.readFileSync(inputFile, 'utf8');
  catalogData = JSON.parse(fileContent);
} catch (error) {
  console.error(`Error reading or parsing the input file: ${error}`);
  process.exit(1);
}

// Create the mapper
const mapper = createMapper({
  strategyInitializer: classes(),
});

// Define interfaces for our mapping
interface CatalogWrapper {
  catalog: Catalog;
}

// Configure the mapping from OSCAL catalog to GRC bundle
createMap<CatalogWrapper, GRCBundleSchema>(
  mapper,
  'CatalogWrapper',
  'GRCBundleSchema',
  forMember(
    dest => dest.id,
    mapFrom(() => randomUUID())
  ),
  forMember(
    dest => dest.type,
    mapFrom(() => 'bundle')
  ),
  forMember(
    dest => dest.nodes,
    mapFrom(src => {
      const nodes: any[] = [];
      
      // Create a framework node for the catalog
      const frameworkNode: FrameworkNode = {
        id: randomUUID(),
        type: 'framework',
        name: src.catalog.metadata.title,
        description: getDescription(src.catalog),
        version: src.catalog.metadata.version,
        category: 'security', // Default category
        publisher: getPublisher(src.catalog),
        status: 'active'
      };
      nodes.push(frameworkNode);
      
      // Create control nodes for each control in the catalog
      if (src.catalog.controls) {
        src.catalog.controls.forEach(control => {
          const controlNode = mapOscalControlToGrcControl(control, frameworkNode.id);
          nodes.push(controlNode);
        });
      }
      
      // Process controls in groups
      if (src.catalog.groups) {
        src.catalog.groups.forEach(group => {
          // Use type assertion since the OSCAL type definitions might not match the actual data structure
          const groupAny = group as any;
          if (groupAny.controls) {
            groupAny.controls.forEach((control: OscalControl) => {
              const controlNode = mapOscalControlToGrcControl(control, frameworkNode.id);
              nodes.push(controlNode);
            });
          }
          
          // Process nested groups recursively
          processNestedGroups(groupAny, nodes, frameworkNode.id);
        });
      }
      
      return nodes;
    })
  ),
  forMember(
    dest => dest.links,
    mapFrom(src => {
      const links: any[] = [];
      
      // Create framework-association links between the framework and controls
      const frameworkId = links.length > 0 ? links[0].from : '';
      
      return links;
    })
  ),
  forMember(
    dest => dest.metadata,
    mapFrom(src => ({
      name: src.catalog.metadata.title,
      description: getDescription(src.catalog),
      version: src.catalog.metadata.version,
      createdAt: src.catalog.metadata.published || src.catalog.metadata['last-modified'],
      updatedAt: src.catalog.metadata['last-modified'],
      createdBy: getCreatedBy(src.catalog),
      organization: getOrganization(src.catalog),
      tags: getTags(src.catalog)
    }))
  )
);

// Helper function to recursively process nested groups
function processNestedGroups(group: any, nodes: any[], frameworkId: string): void {
  if (group.groups) {
    group.groups.forEach((nestedGroup: any) => {
      if (nestedGroup.controls) {
        nestedGroup.controls.forEach((control: OscalControl) => {
          const controlNode = mapOscalControlToGrcControl(control, frameworkId);
          nodes.push(controlNode);
        });
      }
      
      // Recursively process deeper nested groups
      processNestedGroups(nestedGroup, nodes, frameworkId);
    });
  }
}

// Helper function to map an OSCAL control to a GRC control node
function mapOscalControlToGrcControl(oscalControl: OscalControl, frameworkId: string): ControlNode {
  const controlNode: ControlNode = {
    id: randomUUID(),
    type: 'control',
    name: oscalControl.title,
    description: getControlDescription(oscalControl),
    controlId: oscalControl.id,
    category: 'preventive', // Default category
    status: 'implemented', // Default status
    frameworks: [frameworkId]
  };
  
  return controlNode;
}

// Helper function to get the description from a catalog
function getDescription(catalog: Catalog): string {
  // Try to find a description in the metadata props
  if (catalog.metadata.props) {
    const descProp = catalog.metadata.props.find(p => p.name === 'description');
    if (descProp) {
      return descProp.value;
    }
  }
  
  return `OSCAL Catalog: ${catalog.metadata.title}`;
}

// Helper function to get the description from a control
function getControlDescription(control: OscalControl): string {
  // Try to find a description part
  if (control.parts) {
    const descPart = control.parts.find(p => p.name === 'statement');
    if (descPart && descPart.prose) {
      return descPart.prose;
    }
  }
  
  return control.title;
}

// Helper function to get the publisher from a catalog
function getPublisher(catalog: Catalog): string {
  // Try to find a publisher in the metadata parties
  if (catalog.metadata.parties) {
    const publisher = catalog.metadata.parties.find(p => 
      p.type === 'organization' && 
      catalog.metadata['responsible-parties']?.some(rp => 
        rp['party-uuids'].includes(p.uuid) && 
        rp['role-id'] === 'publisher'
      )
    );
    
    if (publisher) {
      return publisher.name || '';
    }
  }
  
  return '';
}

// Helper function to get the created by from a catalog
function getCreatedBy(catalog: Catalog): string {
  // Try to find a creator in the metadata parties
  if (catalog.metadata.parties) {
    const creator = catalog.metadata.parties.find(p => 
      catalog.metadata['responsible-parties']?.some(rp => 
        rp['party-uuids'].includes(p.uuid) && 
        rp['role-id'] === 'creator'
      )
    );
    
    if (creator) {
      return creator.name || '';
    }
  }
  
  return '';
}

// Helper function to get the organization from a catalog
function getOrganization(catalog: Catalog): string {
  // Try to find an organization in the metadata parties
  if (catalog.metadata.parties) {
    const org = catalog.metadata.parties.find(p => p.type === 'organization');
    if (org) {
      return org.name || '';
    }
  }
  
  return '';
}

// Helper function to get tags from a catalog
function getTags(catalog: Catalog): string[] {
  const tags: string[] = [];
  
  // Extract tags from props
  if (catalog.metadata.props) {
    catalog.metadata.props.forEach(prop => {
      if (prop.name === 'tag' || prop.name === 'keyword') {
        tags.push(prop.value);
      }
    });
  }
  
  return tags;
}

// Map the OSCAL catalog to a GRC bundle
const bundle = mapper.map<CatalogWrapper, GRCBundleSchema>(
  { catalog: catalogData.catalog }, 
  'CatalogWrapper', 
  'GRCBundleSchema'
);

// Create framework-association links
bundle.links = bundle.nodes
  .filter(node => node.type === 'control')
  .map(controlNode => {
    const frameworkNode = bundle.nodes.find(node => node.type === 'framework');
    if (!frameworkNode) return null;
    
    return {
      id: randomUUID(),
      type: 'framework-association',
      from: controlNode.id,
      to: frameworkNode.id,
      relationship: 'associated-with',
      associationType: 'implements'
    } as FrameworkAssociationLink;
  })
  .filter((link): link is FrameworkAssociationLink => link !== null);

// Write the GRC bundle to the output file
try {
  fs.writeFileSync(outputFile, JSON.stringify(bundle, null, 2));
  console.log(`Successfully converted OSCAL catalog to GRC bundle: ${outputFile}`);
} catch (error) {
  console.error(`Error writing the output file: ${error}`);
  process.exit(1);
}
