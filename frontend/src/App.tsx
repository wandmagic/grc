import { useState, useEffect } from 'react';
import { Box, Typography, Tabs, Tab, AppBar, Toolbar, CssBaseline, ThemeProvider, createTheme, Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import DescriptionIcon from '@mui/icons-material/Description';
import ForceGraph from './components/ForceGraph';
import NodeForm from './components/NodeForm';
import LinkForm from './components/LinkForm';
import BundleDropZone from './components/BundleDropZone';
import SchemaDocumentation from './components/SchemaDocumentation';
import { GraphNode, GraphLink, GrcBundle } from './types';
import { generateId, downloadBundle } from './utils/schemaLoader';

// Create a dark theme
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
});

// Node types from the schema
const NODE_TYPES = [
  'system-component',
  'attestation',
  'person',
  'role',
  'responsibility',
  'risk',
  'plan-of-action-item',
  'threat',
  'policy',
  'control',
  'compliance-requirement',
  'vulnerability',
  'resource'
];

// Link types from the schema
const LINK_TYPES = [
  'ownership',
  'assignment',
  'responsibility',
  'mitigation',
  'compliance',
  'threat',
  'implementation',
  'reference'
];

// Function to get color based on node type
const getNodeColor = (nodeType: string) => {
  // Color nodes by type
  switch (nodeType) {
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

function App() {
  const [tabIndex, setTabIndex] = useState(0);
  const [bundle, setBundle] = useState<GrcBundle>({
    id: generateId(),
    type: 'bundle',
    nodes: [],
    links: [],
    metadata: {
      name: 'New GRC Bundle',
      createdAt: new Date().toISOString()
    }
  });
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [selectedLink, setSelectedLink] = useState<GraphLink | null>(null);
  const [nodeRelationships, setNodeRelationships] = useState<GraphLink[]>([]);

  // Auto-load the risk example on first run
  useEffect(() => {
    const loadRiskExample = async () => {
      try {
        // Use window.location.pathname to get the base path dynamically
        const basePath = window.location.pathname.endsWith('/') 
          ? window.location.pathname 
          : window.location.pathname + '/';
        const exampleBundle = await fetch(`${basePath}examples/risk-management-example.json`);
        const data = await exampleBundle.json();
        handleBundleLoad(data);
      } catch (error) {
        console.error('Error loading risk example:', error);
      }
    };
    
    loadRiskExample();
  }, []); // Empty dependency array means this runs once on component mount

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const handleNodeAdd = (node: GraphNode) => {
    setBundle(prev => ({
      ...prev,
      nodes: [...prev.nodes, node]
    }));
  };

  const handleLinkAdd = (link: GraphLink) => {
    setBundle(prev => ({
      ...prev,
      links: [...prev.links, link]
    }));
  };

  const handleBundleLoad = (newBundle: GrcBundle) => {
    setBundle(newBundle);
  };

  const handleNodeClick = (node: GraphNode) => {
    setSelectedNode(node);
    console.log('Node clicked:', node);
    
    // Find all relationships connected to this node
    const relationships = bundle.links.filter(link => {
      const sourceId = link.from || link.origin || 
        (typeof link.source === 'string' ? link.source : 
          link.source?.id);
      
      const targetId = link.to || link.targetId || 
        (typeof link.target === 'string' ? link.target : 
          link.target?.id);
      
      return sourceId === node.id || targetId === node.id;
    });
    
    setNodeRelationships(relationships);
    setSelectedLink(null); // Clear any selected link
  };

  const handleLinkClick = (link: GraphLink) => {
    setSelectedLink(link);
    console.log('Link clicked:', link);
    
    // If a node is selected, keep the relationships visible
    if (!selectedNode) {
      setNodeRelationships([]);
    }
  };
  
  const handleRelationshipClick = (relationship: GraphLink) => {
    setSelectedLink(relationship);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100%', overflow: 'hidden' }}>
        {/* Header */}
        <AppBar position="static" sx={{ width: '100%', zIndex: 1200 }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              GRC Schema Visualizer
            </Typography>
            <Tabs value={tabIndex} onChange={handleTabChange} sx={{ mr: 2 }}>
              <Tab label="Visualize" />
              <Tab label="Add Node" />
              <Tab label="Add Link" />
              <Tab label="Import/Export" />
              <Tab icon={<DescriptionIcon />} label="Documentation" />
            </Tabs>
          </Toolbar>
        </AppBar>
        
        {/* Main content area with visualization always visible */}
        <Box sx={{ flexGrow: 1, position: 'relative', overflow: 'hidden' }}>
          {/* Main visualization area */}
          <Box sx={{ width: '100%', height: '100%' }}>
            <ForceGraph 
              nodes={bundle.nodes} 
              links={bundle.links}
              onNodeClick={handleNodeClick}
              onLinkClick={handleLinkClick}
            />
          </Box>
          
          {/* Left sidebar overlay for node/link details */}
          <Box 
            sx={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              width: selectedNode || selectedLink ? '300px' : '0px',
              height: selectedNode || selectedLink ? 'calc(100% - 150px)' : '100%', // Make room for bottom bar
              backgroundColor: 'rgba(30, 30, 30, 0.9)',
              transition: 'width 0.3s ease, height 0.3s ease',
              overflow: 'auto',
              boxShadow: 3,
              zIndex: 1100,
              p: selectedNode || selectedLink ? 2 : 0
            }}
          >
            {selectedNode && (
              <Box>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  mb: 1,
                  backgroundColor: selectedNode ? getNodeColor(selectedNode.type) : 'primary.dark',
                  p: 1.5,
                  borderRadius: 1
                }}>
                  <Typography variant="h6" sx={{ 
                    flexGrow: 1,
                    color: '#ffffff',
                    textShadow: '0px 1px 2px rgba(0,0,0,0.5)'
                  }}>
                    {selectedNode.name || selectedNode.id}
                  </Typography>
                  <Button 
                    size="small" 
                    variant="outlined" 
                    onClick={() => setSelectedNode(null)}
                    sx={{ 
                      minWidth: '32px', 
                      p: '4px',
                      color: '#ffffff',
                      borderColor: 'rgba(255,255,255,0.5)'
                    }}
                  >
                    ×
                  </Button>
                </Box>
          
          {/* Bottom bar for relationships */}
          <Box 
            sx={{ 
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: selectedNode ? '150px' : '0px',
              backgroundColor: 'rgba(30, 30, 30, 0.9)',
              transition: 'height 0.3s ease',
              overflow: 'auto',
              boxShadow: 3,
              zIndex: 1050,
              p: selectedNode ? 2 : 0,
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {selectedNode && (
              <>
                <Typography variant="subtitle1" sx={{ 
                  mb: 1, 
                  color: '#ffffff',
                  fontWeight: 'bold'
                }}>
                  Relationships for {selectedNode.name || selectedNode.id}
                </Typography>
                
                <Box sx={{ 
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 1,
                  overflowX: 'auto',
                  pb: 1
                }}>
                  {nodeRelationships.length > 0 ? (
                    nodeRelationships.map(relationship => {
                      // Determine if this node is the source or target
                      const sourceId = relationship.from || relationship.origin || 
                        (typeof relationship.source === 'string' ? relationship.source : 
                          relationship.source?.id);
                      
                      const targetId = relationship.to || relationship.targetId || 
                        (typeof relationship.target === 'string' ? relationship.target : 
                          relationship.target?.id);
                      
                      const isSource = sourceId === selectedNode.id;
                      const otherNodeId = isSource ? targetId : sourceId;
                      const otherNode = bundle.nodes.find(node => node.id === otherNodeId);
                      const direction = isSource ? 'to' : 'from';
                      
                      // Get color based on relationship type
                      let color = '#757575';
                      switch (relationship.type) {
                        case 'ownership':
                          color = '#4285F4'; // Blue
                          break;
                        case 'assignment':
                          color = '#EA4335'; // Red
                          break;
                        case 'responsibility':
                          color = '#FBBC05'; // Yellow
                          break;
                        case 'mitigation':
                          color = '#34A853'; // Green
                          break;
                        case 'compliance':
                          color = '#8F00FF'; // Purple
                          break;
                        case 'threat':
                          color = '#FF6D01'; // Orange
                          break;
                        case 'implementation':
                          color = '#00BCD4'; // Cyan
                          break;
                        case 'reference':
                          color = '#9E9E9E'; // Gray
                          break;
                      }
                      
                      return (
                        <Button
                          key={relationship.id}
                          variant={selectedLink && selectedLink.id === relationship.id ? 'contained' : 'outlined'}
                          size="small"
                          onClick={() => handleRelationshipClick(relationship)}
                          sx={{ 
                            borderColor: color,
                            color: selectedLink && selectedLink.id === relationship.id ? '#ffffff' : color,
                            backgroundColor: selectedLink && selectedLink.id === relationship.id ? color : 'transparent',
                            '&:hover': {
                              backgroundColor: selectedLink && selectedLink.id === relationship.id ? color : `${color}22`,
                              borderColor: color
                            }
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Box 
                              sx={{ 
                                width: 10, 
                                height: 10, 
                                borderRadius: '50%', 
                                backgroundColor: color 
                              }} 
                            />
                            <Typography variant="caption">
                              {relationship.type} {direction} {otherNode ? (otherNode.name || otherNode.id) : otherNodeId}
                            </Typography>
                          </Box>
                        </Button>
                      );
                    })
                  ) : (
                    <Typography variant="body2" sx={{ color: 'text.secondary', p: 1 }}>
                      No relationships found for this node.
                    </Typography>
                  )}
                </Box>
              </>
            )}
          </Box>
                
                <Box sx={{ 
                  backgroundColor: 'background.paper', 
                  borderRadius: 1,
                  mb: 2,
                  p: 2
                }}>
                  <Box sx={{ display: 'flex', mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', width: '80px' }}>
                      Type:
                    </Typography>
                    <Typography variant="body1" sx={{ 
                      backgroundColor: selectedNode ? getNodeColor(selectedNode.type) : 'primary.dark',
                      px: 1,
                      borderRadius: 1,
                      fontSize: '0.875rem',
                      color: '#ffffff',
                      fontWeight: 'bold',
                      textShadow: '0px 1px 1px rgba(0,0,0,0.3)'
                    }}>
                      {selectedNode.type}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex' }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', width: '80px' }}>
                      Name:
                    </Typography>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                      {selectedNode.name || selectedNode.id}
                    </Typography>
                  </Box>
                </Box>
                
                <Typography variant="subtitle2" sx={{ 
                  mb: 1, 
                  pl: 1,
                  borderLeft: '3px solid',
                  borderColor: selectedNode ? getNodeColor(selectedNode.type) : 'primary.main',
                  fontWeight: 'bold',
                  letterSpacing: '0.5px'
                }}>
                  Attributes
                </Typography>
                
                <Box sx={{ 
                  backgroundColor: 'background.paper', 
                  borderRadius: 1,
                  p: 1,
                  mb: 2,
                  maxHeight: 'calc(100vh - 250px)',
                  overflow: 'auto'
                }}>
                  {Object.entries(selectedNode)
                    .filter(([key]) => !['x', 'y', 'z', 'vx', 'vy', 'vz', 'fx', 'fy', 'fz', 'index', 'id', 'type', 'name', '__threeObj', '__lineObj', '__arrowObj', 'color', 'val', 'geometry', 'material', 'position', 'rotation', 'scale', 'quaternion', 'matrix', 'matrixWorld', 'matrixAutoUpdate', 'matrixWorldNeedsUpdate'].includes(key))
                    .map(([key, value]) => (
                      <Box key={key} sx={{ 
                        mb: 1.5,
                        p: 1,
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: 1,
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        },
                        border: '1px solid rgba(255, 255, 255, 0.05)'
                      }}>
                        <Typography variant="body2" sx={{ 
                          color: selectedNode ? getNodeColor(selectedNode.type) : 'primary.light',
                          fontWeight: 'bold',
                          mb: 0.5,
                          textShadow: '0px 1px 1px rgba(0,0,0,0.2)'
                        }}>
                          {key}
                        </Typography>
                        
                        {typeof value === 'object' && value !== null ? (
                          <Box sx={{ 
                            backgroundColor: 'rgba(0, 0, 0, 0.2)',
                            p: 1,
                            borderRadius: 1,
                            fontFamily: 'monospace',
                            fontSize: '0.75rem',
                            maxHeight: '150px',
                            overflow: 'auto'
                          }}>
                            <pre style={{ margin: 0 }}>
                              {JSON.stringify(value, null, 2)}
                            </pre>
                          </Box>
                        ) : (
                          <Typography variant="body2" sx={{ 
                            wordBreak: 'break-word',
                            fontFamily: typeof value === 'string' && value.length > 30 ? 'monospace' : 'inherit',
                            fontSize: typeof value === 'string' && value.length > 30 ? '0.75rem' : 'inherit',
                            color: '#ffffff'
                          }}>
                            {value?.toString()}
                          </Typography>
                        )}
                      </Box>
                    ))}
                    
                  {Object.entries(selectedNode)
                    .filter(([key]) => !['x', 'y', 'z', 'vx', 'vy', 'vz', 'fx', 'fy', 'fz', 'index', 'id', 'type', 'name', '__threeObj', '__lineObj', '__arrowObj', 'color', 'val', 'geometry', 'material', 'position', 'rotation', 'scale', 'quaternion', 'matrix', 'matrixWorld', 'matrixAutoUpdate', 'matrixWorldNeedsUpdate'].includes(key))
                    .length === 0 && (
                      <Typography variant="body2" sx={{ color: 'text.secondary', p: 1 }}>
                        No additional attributes found.
                      </Typography>
                    )}
                </Box>
              </Box>
            )}
            
            {selectedLink && !selectedNode && (
              <Box>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  mb: 1,
                  backgroundColor: '#757575', // Default gray for links
                  p: 1.5,
                  borderRadius: 1
                }}>
                  <Typography variant="h6" sx={{ 
                    flexGrow: 1,
                    color: '#ffffff',
                    textShadow: '0px 1px 2px rgba(0,0,0,0.5)'
                  }}>
                    {selectedLink.name || selectedLink.id}
                  </Typography>
                  <Button 
                    size="small" 
                    variant="outlined" 
                    onClick={() => setSelectedLink(null)}
                    sx={{ 
                      minWidth: '32px', 
                      p: '4px',
                      color: '#ffffff',
                      borderColor: 'rgba(255,255,255,0.5)'
                    }}
                  >
                    ×
                  </Button>
                </Box>
                
                <Box sx={{ 
                  backgroundColor: 'background.paper', 
                  borderRadius: 1,
                  mb: 2,
                  p: 2
                }}>
                  <Box sx={{ display: 'flex', mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', width: '80px' }}>
                      Type:
                    </Typography>
                    <Typography variant="body1" sx={{ 
                      backgroundColor: '#757575', // Default gray for links
                      px: 1,
                      borderRadius: 1,
                      fontSize: '0.875rem',
                      color: '#ffffff',
                      fontWeight: 'bold',
                      textShadow: '0px 1px 1px rgba(0,0,0,0.3)'
                    }}>
                      {selectedLink.type}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', width: '80px' }}>
                      Name:
                    </Typography>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                      {selectedLink.name || selectedLink.id}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', width: '80px' }}>
                      From:
                    </Typography>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                      {/* Try to find the source node and use its name */}
                      {(() => {
                        const sourceId = selectedLink.from || selectedLink.origin || 
                          (typeof selectedLink.source === 'string' ? selectedLink.source : 
                            selectedLink.source?.id);
                        const sourceNode = bundle.nodes.find(node => node.id === sourceId);
                        return sourceNode ? (sourceNode.name || sourceId) : sourceId;
                      })()}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex' }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', width: '80px' }}>
                      To:
                    </Typography>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                      {/* Try to find the target node and use its name */}
                      {(() => {
                        const targetId = selectedLink.to || selectedLink.targetId || 
                          (typeof selectedLink.target === 'string' ? selectedLink.target : 
                            selectedLink.target?.id);
                        const targetNode = bundle.nodes.find(node => node.id === targetId);
                        return targetNode ? (targetNode.name || targetId) : targetId;
                      })()}
                    </Typography>
                  </Box>
                </Box>
                
                <Typography variant="subtitle2" sx={{ 
                  mb: 1, 
                  pl: 1,
                  borderLeft: '3px solid',
                  borderColor: '#757575', // Default gray for links
                  fontWeight: 'bold',
                  letterSpacing: '0.5px'
                }}>
                  Attributes
                </Typography>
                
                <Box sx={{ 
                  backgroundColor: 'background.paper', 
                  borderRadius: 1,
                  p: 1,
                  mb: 2,
                  maxHeight: 'calc(100vh - 300px)',
                  overflow: 'auto'
                }}>
                  {Object.entries(selectedLink)
                    .filter(([key]) => !['x', 'y', 'z', 'vx', 'vy', 'vz', 'fx', 'fy', 'fz', 'index', 'source', 'target', 'id', 'type', 'name', 'from', 'to', 'origin', 'targetId', '__threeObj', '__lineObj', '__arrowObj', 'color', 'val', 'curvature', 'rotation', 'geometry', 'material', 'position', 'scale', 'quaternion', 'matrix', 'matrixWorld', 'matrixAutoUpdate', 'matrixWorldNeedsUpdate'].includes(key))
                    .map(([key, value]) => (
                      <Box key={key} sx={{ 
                        mb: 1.5,
                        p: 1,
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: 1,
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        },
                        border: '1px solid rgba(255, 255, 255, 0.05)'
                      }}>
                        <Typography variant="body2" sx={{ 
                          color: '#c0c0c0', // Lighter gray for link attributes
                          fontWeight: 'bold',
                          mb: 0.5,
                          textShadow: '0px 1px 1px rgba(0,0,0,0.2)'
                        }}>
                          {key}
                        </Typography>
                        
                        {typeof value === 'object' && value !== null ? (
                          <Box sx={{ 
                            backgroundColor: 'rgba(0, 0, 0, 0.2)',
                            p: 1,
                            borderRadius: 1,
                            fontFamily: 'monospace',
                            fontSize: '0.75rem',
                            maxHeight: '150px',
                            overflow: 'auto'
                          }}>
                            <pre style={{ margin: 0 }}>
                              {JSON.stringify(value, null, 2)}
                            </pre>
                          </Box>
                        ) : (
                          <Typography variant="body2" sx={{ 
                            wordBreak: 'break-word',
                            fontFamily: typeof value === 'string' && value.length > 30 ? 'monospace' : 'inherit',
                            fontSize: typeof value === 'string' && value.length > 30 ? '0.75rem' : 'inherit',
                            color: '#ffffff'
                          }}>
                            {value?.toString()}
                          </Typography>
                        )}
                      </Box>
                    ))}
                    
                  {Object.entries(selectedLink)
                    .filter(([key]) => !['x', 'y', 'z', 'vx', 'vy', 'vz', 'fx', 'fy', 'fz', 'index', 'source', 'target', 'id', 'type', 'name', 'from', 'to', 'origin', 'targetId', '__threeObj', '__lineObj', '__arrowObj', 'color', 'val', 'curvature', 'rotation', 'geometry', 'material', 'position', 'scale', 'quaternion', 'matrix', 'matrixWorld', 'matrixAutoUpdate', 'matrixWorldNeedsUpdate'].includes(key))
                    .length === 0 && (
                      <Typography variant="body2" sx={{ color: 'text.secondary', p: 1 }}>
                        No additional attributes found.
                      </Typography>
                    )}
                </Box>
              </Box>
            )}
            
          </Box>
          
          {/* Overlay panels for tabs */}
          <Box 
            sx={{ 
              position: 'absolute', 
              top: 0, 
              right: 0, 
              width: tabIndex !== 0 ? '400px' : '0px',
              height: '100%',
              backgroundColor: 'rgba(30, 30, 30, 0.9)',
              transition: 'width 0.3s ease',
              overflow: 'auto',
              boxShadow: 3,
              zIndex: 1000,
              p: tabIndex !== 0 ? 3 : 0
            }}
          >
            {/* Add Node Tab */}
            {tabIndex === 1 && (
              <NodeForm 
                onSubmit={handleNodeAdd} 
                nodeTypes={NODE_TYPES}
              />
            )}
            
            {/* Add Link Tab */}
            {tabIndex === 2 && (
              <LinkForm 
                onSubmit={handleLinkAdd} 
                linkTypes={LINK_TYPES}
                nodes={bundle.nodes}
              />
            )}
            
            {/* Import/Export Tab */}
            {tabIndex === 3 && (
              <Box>
                <Box sx={{ mb: 4 }}>
                  <BundleDropZone onBundleLoad={handleBundleLoad} />
                  
                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                    <Typography variant="body2" sx={{ mr: 2 }}>
                      Or load an example:
                    </Typography>
                    <Button 
                      variant="outlined" 
                      size="small"
                      onClick={async () => {
                        try {
                          // Use window.location.pathname to get the base path dynamically
                          const basePath = window.location.pathname.endsWith('/') 
                            ? window.location.pathname 
                            : window.location.pathname + '/';
                          const exampleBundle = await fetch(`${basePath}examples/risk-management-example.json`);
                          const data = await exampleBundle.json();
                          handleBundleLoad(data);
                        } catch (error) {
                          console.error('Error loading example:', error);
                          alert('Failed to load example');
                        }
                      }}
                    >
                      Load Risk Example
                    </Button>
                  </Box>
                </Box>
                
                <Box sx={{ mt: 4 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h5">
                      Export Bundle
                    </Typography>
                    <Button 
                      variant="contained" 
                      startIcon={<DownloadIcon />}
                      onClick={() => downloadBundle(bundle, `${bundle.id}.json`)}
                    >
                      Download JSON
                    </Button>
                  </Box>
                  <pre style={{ 
                    maxHeight: '300px', 
                    overflow: 'auto', 
                    backgroundColor: '#2a2a2a', 
                    color: '#e0e0e0',
                    padding: '1rem' 
                  }}>
                    {JSON.stringify(bundle, null, 2)}
                  </pre>
                </Box>
              </Box>
            )}
            
            {/* Documentation Tab */}
            {tabIndex === 4 && (
              <SchemaDocumentation />
            )}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
