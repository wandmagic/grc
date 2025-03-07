import { useRef, useCallback, useMemo } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import { GraphNode, GraphLink } from '../types';

interface ForceGraphProps {
  nodes: GraphNode[];
  links: GraphLink[];
  onNodeClick?: (node: GraphNode) => void;
  onLinkClick?: (link: GraphLink) => void;
}

// Interface for the force graph data structure
interface ForceGraphData {
  nodes: GraphNode[];
  links: {
    id: string;
    source: string;
    target: string;
    type: string;
    name?: string;
    originalLink: GraphLink;
    [key: string]: unknown;
  }[];
}

const ForceGraph = ({ nodes, links, onNodeClick, onLinkClick }: ForceGraphProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fgRef = useRef<any>(null);

  // Transform the links to a format that the force graph can handle
  const graphData = useMemo<ForceGraphData>(() => {
    const transformedLinks = links.flatMap(link => {
      // Get source and target IDs
      let sourceId: string | undefined;
      let targetId: string | undefined;
      
      // Handle different ways source/target might be specified
      if (link.from) {
        sourceId = link.from;
      } else if (typeof link.source === 'string') {
        sourceId = link.source;
      } else if (link.source && typeof link.source === 'object') {
        sourceId = link.source.id;
      }
      
      if (link.to) {
        targetId = link.to;
      } else if (typeof link.target === 'string') {
        targetId = link.target;
      } else if (link.target && typeof link.target === 'object') {
        targetId = link.target.id;
      }
      
      // Skip links with missing source or target
      if (!sourceId || !targetId) {
        console.warn('Skipping link with missing source or target:', link);
        return [];
      }
      
      // Create a link for the source-target pair
      return [{
        id: `${link.id}-${sourceId}-${targetId}`,
        source: sourceId,
        target: targetId,
        type: link.type,
        name: link.name,
        originalLink: link,
      }];
    });

    return {
      nodes,
      links: transformedLinks
    };
  }, [nodes, links]);

  const handleNodeClick = useCallback((node: GraphNode) => {
    if (onNodeClick) onNodeClick(node);
    
    // Aim at node from outside
    const distance = 40;
    const distRatio = 1 + distance/Math.hypot(node.x || 0, node.y || 0, node.z || 0);

    if (fgRef.current) {
      fgRef.current.cameraPosition(
        { x: (node.x || 0) * distRatio, y: (node.y || 0) * distRatio, z: (node.z || 0) * distRatio },
        node,
        1000
      );
    }
  }, [onNodeClick]);

  // Define a type for the transformed link
  type TransformedLink = {
    id: string;
    source: string;
    target: string;
    type: string;
    name?: string;
    originalLink: GraphLink;
    [key: string]: unknown;
  };

  const handleLinkClick = useCallback((link: TransformedLink) => {
    if (onLinkClick && link.originalLink) {
      onLinkClick(link.originalLink);
    }
  }, [onLinkClick]);

  const getNodeColor = (node: GraphNode) => {
    // Color nodes by type
    switch (node.type) {
      case 'system-component':
        return '#4285F4'; // Blue
      case 'person':
        return '#EA4335'; // Red
      case 'role':
        return '#FBBC05'; // Yellow
      case 'vulnerability':
        return '#34A853'; // Green
      case 'control':
        return '#8F00FF'; // Purple
      case 'resource':
        return '#FF6D01'; // Orange
      default:
        return '#757575'; // Gray
    }
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <ForceGraph3D
        ref={fgRef}
        graphData={graphData}
        nodeLabel={(node: GraphNode) => `${node.name || node.id} (${node.type})`}
        nodeColor={getNodeColor}
        nodeRelSize={6}
        linkLabel={(link: TransformedLink) => `${link.name || link.id} (${link.type})`}
        linkDirectionalArrowLength={3.5}
        linkDirectionalArrowRelPos={1}
        linkWidth={1}
        onNodeClick={handleNodeClick}
        onLinkClick={handleLinkClick}
        backgroundColor="#121212"
      />
    </div>
  );
};

export default ForceGraph;
