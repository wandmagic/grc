import { useState } from 'react';
import { Box, Typography, Tabs, Tab, AppBar, Toolbar, CssBaseline, ThemeProvider, createTheme, Button, Divider } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import ForceGraph from './components/ForceGraph';
import NodeForm from './components/NodeForm';
import LinkForm from './components/LinkForm';
import BundleDropZone from './components/BundleDropZone';
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
  'sbom-attestation',
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
  };

  const handleLinkClick = (link: GraphLink) => {
    setSelectedLink(link);
    console.log('Link clicked:', link);
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
              height: '100%',
              backgroundColor: 'rgba(30, 30, 30, 0.9)',
              transition: 'width 0.3s ease',
              overflow: 'auto',
              boxShadow: 3,
              zIndex: 1100,
              p: selectedNode || selectedLink ? 2 : 0
            }}
          >
            {selectedNode && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  {selectedNode.name || selectedNode.id}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  Type: {selectedNode.type}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  ID: {selectedNode.id}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body2">
                  Properties:
                </Typography>
                <pre style={{ 
                  fontSize: '0.8rem', 
                  backgroundColor: '#2a2a2a', 
                  color: '#e0e0e0',
                  padding: '0.5rem', 
                  borderRadius: '4px',
                  overflow: 'auto',
                  maxHeight: 'calc(100vh - 250px)'
                }}>
                  {JSON.stringify(
                    // Filter out 3D graph properties
                    Object.fromEntries(
                      Object.entries(selectedNode).filter(([key]) => 
                        !['x', 'y', 'z', 'vx', 'vy', 'vz', 'fx', 'fy', 'fz', 'index'].includes(key)
                      )
                    ), 
                    null, 
                    2
                  )}
                </pre>
              </Box>
            )}
            
            {selectedLink && !selectedNode && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  {selectedLink.name || selectedLink.id}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  Type: {selectedLink.type}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  From: {selectedLink.from}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  To: {selectedLink.to}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body2">
                  Properties:
                </Typography>
                <pre style={{ 
                  fontSize: '0.8rem', 
                  backgroundColor: '#2a2a2a', 
                  color: '#e0e0e0',
                  padding: '0.5rem', 
                  borderRadius: '4px',
                  overflow: 'auto',
                  maxHeight: 'calc(100vh - 250px)'
                }}>
                  {JSON.stringify(
                    // Filter out 3D graph properties
                    Object.fromEntries(
                      Object.entries(selectedLink).filter(([key]) => 
                        !['x', 'y', 'z', 'vx', 'vy', 'vz', 'fx', 'fy', 'fz', 'index', 'source', 'target'].includes(key)
                      )
                    ), 
                    null, 
                    2
                  )}
                </pre>
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
                          const exampleBundle = await fetch('/examples/simple-example.json');
                          const data = await exampleBundle.json();
                          handleBundleLoad(data);
                        } catch (error) {
                          console.error('Error loading example:', error);
                          alert('Failed to load example');
                        }
                      }}
                    >
                      Load Simple Example
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
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
