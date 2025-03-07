import { useRef, useCallback, useMemo } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import { GraphNode, GraphLink } from '../types';
import * as THREE from 'three';

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
      if (link.origin) {
        sourceId = link.origin;
      } else if (link.from) {
        sourceId = link.from;
      } else if (typeof link.source === 'string') {
        sourceId = link.source;
      } else if (link.source && typeof link.source === 'object') {
        sourceId = link.source.id;
      }
      
      if (link.targetId) {
        targetId = link.targetId;
      } else if (link.to) {
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
      // Primary node types with specified colors
      case 'threat':
        return '#EA4335'; // Red (as requested)
      case 'risk':
        return '#FBBC05'; // Yellow (as requested)
      case 'control':
        return '#34A853'; // Green (as requested)
      
      // Other node types with appropriate colors
      case 'system-component':
        return '#4285F4'; // Blue
      case 'person':
        return '#FF6D01'; // Orange (changed from Red)
      case 'role':
        return '#00BCD4'; // Cyan (changed from Yellow)
      case 'vulnerability':
        return '#9C27B0'; // Purple (changed from Green)
      case 'resource':
        return '#795548'; // Brown
      
      // Additional node types
      case 'assertion':
        return '#607D8B'; // Blue Gray
      case 'compliance-requirement':
        return '#3F51B5'; // Indigo
      case 'contact-info':
        return '#9E9E9E'; // Gray
      case 'cost':
        return '#FF5722'; // Deep Orange
      case 'evidence':
        return '#8BC34A'; // Light Green
      case 'framework':
        return '#673AB7'; // Deep Purple
      case 'location':
        return '#2196F3'; // Light Blue
      case 'milestone':
        return '#009688'; // Teal
      case 'plan-of-action-item':
        return '#FF9800'; // Amber
      case 'policy':
        return '#03A9F4'; // Light Blue
      case 'remediation':
        return '#CDDC39'; // Lime
      case 'responsibility':
        return '#E91E63'; // Pink
      case 'attestation':
        return '#9E9E9E'; // Gray
      case 'tag':
        return '#607D8B'; // Blue Gray
      
      // Default for any unspecified node types
      default:
        return '#757575'; // Gray
    }
  };

  // Function to get link color based on link type
  const getLinkColor = (link: TransformedLink) => {
    // Color links by type
    switch (link.type) {
      case 'ownership':
        return '#4285F4'; // Blue
      case 'assignment':
        return '#EA4335'; // Red
      case 'responsibility':
        return '#FBBC05'; // Yellow
      case 'mitigation':
        return '#34A853'; // Green
      case 'compliance':
        return '#8F00FF'; // Purple
      case 'threat':
        return '#FF6D01'; // Orange
      case 'implementation':
        return '#00BCD4'; // Cyan
      case 'reference':
        return '#9E9E9E'; // Gray
      default:
        return '#757575'; // Default Gray
    }
  };

  // Create a custom link object with an icon
  const linkObject = useCallback((link: TransformedLink) => {
    // Create a line for the link
    const material = new THREE.MeshBasicMaterial({ color: getLinkColor(link) });
    const geometry = new THREE.CylinderGeometry(0.2, 0.2, 1, 8);
    const mesh = new THREE.Mesh(geometry, material);
    
    // Add a small sphere in the middle to represent an icon
    const iconGeometry = new THREE.SphereGeometry(0.5, 16, 16);
    const iconMaterial = new THREE.MeshBasicMaterial({ color: getLinkColor(link) });
    const icon = new THREE.Mesh(iconGeometry, iconMaterial);
    
    // Position the icon in the middle of the link
    icon.position.set(0, 0, 0);
    
    // Create a group to hold both the line and the icon
    const group = new THREE.Group();
    group.add(mesh);
    group.add(icon);
    
    return group;
  }, []);

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
        linkWidth={1.5}
        linkColor={getLinkColor}
        linkThreeObject={linkObject}
        linkThreeObjectExtend={true}
        linkPositionUpdate={(obj, { start, end }) => {
          // Position and orient the link object
          const middlePos = {
            x: start.x + (end.x - start.x) / 2,
            y: start.y + (end.y - start.y) / 2,
            z: start.z + (end.z - start.z) / 2
          };
          
          // Position the object at the middle
          obj.position.set(middlePos.x, middlePos.y, middlePos.z);
          
          // Orient the object to face the end point
          obj.lookAt(end.x, end.y, end.z);
          
          // Rotate the cylinder to align with the link direction
          obj.rotateX(Math.PI / 2);
          
          // Scale the cylinder to match the link length
          const distance = Math.sqrt(
            Math.pow(end.x - start.x, 2) +
            Math.pow(end.y - start.y, 2) +
            Math.pow(end.z - start.z, 2)
          );
          obj.scale.set(1, distance, 1);
          
          return true;
        }}
        onNodeClick={handleNodeClick}
        onLinkClick={handleLinkClick}
        backgroundColor="#121212"
      />
    </div>
  );
};

export default ForceGraph;
