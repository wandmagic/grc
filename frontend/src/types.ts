
export interface GraphNode {
  id: string;
  name?: string;
  type: string;
  x?: number;
  y?: number;
  z?: number;
  [key: string]: unknown;
}

export interface GraphLink {
  id: string;
  type: string;
  name?: string;
  relationship?: string;
  // For compatibility with our schema format
  origin?: string;
  targetId?: string;
  // For backward compatibility
  from?: string;
  to?: string;
  // For compatibility with force-graph library
  source?: string | GraphNode;
  target?: string | GraphNode;
  [key: string]: unknown;
}

export interface GrcBundle {
  id: string;
  type: 'bundle';
  name?: string;
  nodes: GraphNode[];
  links: GraphLink[];
  metadata?: {
    name?: string;
    description?: string;
    version?: string;
    createdAt?: string;
    createdBy?: string;
    [key: string]: unknown;
  };
}

// Interface for Link Schema
export interface LinkSchema {
  type: string;
  allOf?: Array<{
    properties?: Record<string, unknown>;
    [key: string]: unknown;
  }>;
  properties?: Record<string, unknown>;
  [key: string]: unknown;
}
