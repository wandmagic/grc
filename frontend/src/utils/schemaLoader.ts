import { GrcBundle } from '../types';

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
