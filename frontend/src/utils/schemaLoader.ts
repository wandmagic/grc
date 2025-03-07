import { GrcBundle, LinkSchema } from '../types';

// Cache for link schemas
let linkSchemasCache: Record<string, LinkSchema> = {};

// Load the compiled schema
export const loadCompiledSchema = async (): Promise<unknown> => {
  try {
    const response = await fetch('/dist/grc-schema.json');
    if (!response.ok) {
      throw new Error(`Failed to load compiled schema: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading compiled schema:', error);
    throw error;
  }
};

// Load an example bundle from the examples directory
export const loadExampleBundle = async (exampleName: string): Promise<GrcBundle> => {
  try {
    const response = await fetch(`/examples/${exampleName}.json`);
    if (!response.ok) {
      throw new Error(`Failed to load example: ${response.statusText}`);
    }
    return await response.json() as GrcBundle;
  } catch (error) {
    console.error('Error loading example bundle:', error);
    throw error;
  }
};

// Load a link schema
export const loadLinkSchema = async (linkType: string): Promise<LinkSchema> => {
  // Return from cache if available
  if (linkSchemasCache[linkType]) {
    return linkSchemasCache[linkType];
  }
  
  try {
    const response = await fetch(`/links/${linkType}.schema.json`);
    if (!response.ok) {
      throw new Error(`Failed to load link schema: ${response.statusText}`);
    }
    const schema = await response.json() as LinkSchema;
    linkSchemasCache[linkType] = schema;
    return schema;
  } catch (error) {
    console.error(`Error loading link schema for ${linkType}:`, error);
    // Return a default schema if the specific one can't be loaded
    return {
      type: 'object',
      properties: {
        originType: {
          enum: ['*']
        },
        targetType: {
          enum: ['*']
        }
      }
    };
  }
};

// Load all link schemas
export const loadAllLinkSchemas = async (linkTypes: string[]): Promise<Record<string, LinkSchema>> => {
  const schemas: Record<string, LinkSchema> = {};
  
  await Promise.all(linkTypes.map(async (type) => {
    schemas[type] = await loadLinkSchema(type);
  }));
  
  linkSchemasCache = { ...linkSchemasCache, ...schemas };
  return schemas;
};

// Extract allowed origin types from a link schema
export const getAllowedOriginTypes = (schema: LinkSchema): string[] => {
  // Look for originType in the properties of the schema
  for (const allOf of schema.allOf || []) {
    const originType = allOf.properties?.originType as { enum?: string[] } | undefined;
    if (originType?.enum) {
      return originType.enum;
    }
  }
  
  // Default to allowing all types
  return ['*'];
};

// Extract allowed target types from a link schema
export const getAllowedTargetTypes = (schema: LinkSchema): string[] => {
  // Look for targetType in the properties of the schema
  for (const allOf of schema.allOf || []) {
    const targetType = allOf.properties?.targetType as { enum?: string[] } | undefined;
    if (targetType?.enum) {
      return targetType.enum;
    }
  }
  
  // Default to allowing all types
  return ['*'];
};

// Generate a ShortUUID for new nodes and links
export const generateId = (): string => {
  // Simple implementation - in a real app, use a proper ShortUUID library
  return Math.random().toString(36).substring(2, 15);
};

// Convert a GRC bundle to a downloadable JSON file
export const bundleToJsonFile = (bundle: GrcBundle): string => {
  return JSON.stringify(bundle, null, 2);
};

// Download a bundle as a JSON file
export const downloadBundle = (bundle: GrcBundle, filename = 'grc-bundle.json'): void => {
  const json = bundleToJsonFile(bundle);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  
  // Cleanup
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 0);
};
