
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
