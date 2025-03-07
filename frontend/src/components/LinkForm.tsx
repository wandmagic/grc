import { useState, useEffect } from 'react';
import { Button, Typography, Paper, TextField, MenuItem, Select, FormControl, InputLabel, Stack } from '@mui/material';
import { GraphLink, GraphNode } from '../types';
import { generateId, loadLinkSchema, getAllowedOriginTypes, getAllowedTargetTypes } from '../utils/schemaLoader';

interface LinkFormProps {
  onSubmit: (formData: GraphLink) => void;
  linkTypes: string[];
  nodes: GraphNode[];
}

const LinkForm = ({ onSubmit, linkTypes, nodes }: LinkFormProps) => {
  const [selectedType, setSelectedType] = useState<string>('');
  const [linkName, setLinkName] = useState<string>('');
  const [sourceNodeId, setSourceNodeId] = useState<string>('');
  const [targetNodeId, setTargetNodeId] = useState<string>('');
  const [relationship, setRelationship] = useState<string>('');
  const [allowedOriginTypes, setAllowedOriginTypes] = useState<string[]>(['*']);
  const [allowedTargetTypes, setAllowedTargetTypes] = useState<string[]>(['*']);
  const [loading, setLoading] = useState<boolean>(false);

  // Load the schema for the selected link type
  useEffect(() => {
    if (!selectedType) {
      setAllowedOriginTypes(['*']);
      setAllowedTargetTypes(['*']);
      return;
    }

    setLoading(true);
    loadLinkSchema(selectedType)
      .then((schema) => {
        setAllowedOriginTypes(getAllowedOriginTypes(schema));
        setAllowedTargetTypes(getAllowedTargetTypes(schema));
      })
      .catch((error) => {
        console.error(`Error loading schema for ${selectedType}:`, error);
        setAllowedOriginTypes(['*']);
        setAllowedTargetTypes(['*']);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [selectedType]);

  // Reset source and target node selections when allowed types change
  useEffect(() => {
    setSourceNodeId('');
  }, [allowedOriginTypes]);

  useEffect(() => {
    setTargetNodeId('');
  }, [allowedTargetTypes]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!selectedType || !sourceNodeId || !targetNodeId) return;
    
    const newLink: GraphLink = {
      id: generateId(),
      type: selectedType,
      name: linkName || undefined,
      origin: sourceNodeId,
      targetId: targetNodeId,
      relationship: relationship || undefined
    };
    
    onSubmit(newLink);
    
    // Reset form
    setSelectedType('');
    setLinkName('');
    setSourceNodeId('');
    setTargetNodeId('');
    setRelationship('');
  };

  // Filter nodes based on allowed types
  const getFilteredSourceNodes = () => {
    if (allowedOriginTypes.includes('*')) {
      return nodes;
    }
    return nodes.filter(node => allowedOriginTypes.includes(node.type));
  };

  const getFilteredTargetNodes = () => {
    if (allowedTargetTypes.includes('*')) {
      return nodes;
    }
    return nodes.filter(node => allowedTargetTypes.includes(node.type));
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>
        Add New Link
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <FormControl fullWidth>
            <InputLabel id="link-type-label">Link Type</InputLabel>
            <Select
              labelId="link-type-label"
              value={selectedType}
              label="Link Type"
              onChange={(e) => setSelectedType(e.target.value)}
              required
            >
              {linkTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <TextField
            label="Link Name (Optional)"
            value={linkName}
            onChange={(e) => setLinkName(e.target.value)}
            fullWidth
            helperText="Human-readable name for the link"
          />
          
          <FormControl fullWidth>
            <InputLabel id="source-node-label">Source Node</InputLabel>
            <Select
              labelId="source-node-label"
              value={sourceNodeId}
              label="Source Node"
              onChange={(e) => setSourceNodeId(e.target.value)}
              required
              disabled={loading}
            >
              {getFilteredSourceNodes().map((node) => (
                <MenuItem key={node.id} value={node.id}>
                  {node.name || node.id} ({node.type})
                </MenuItem>
              ))}
            </Select>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
              {allowedOriginTypes.includes('*') 
                ? 'Any node type allowed' 
                : `Allowed types: ${allowedOriginTypes.join(', ')}`}
            </Typography>
          </FormControl>
          
          <FormControl fullWidth>
            <InputLabel id="target-node-label">Target Node</InputLabel>
            <Select
              labelId="target-node-label"
              value={targetNodeId}
              label="Target Node"
              onChange={(e) => setTargetNodeId(e.target.value)}
              required
              disabled={loading}
            >
              {getFilteredTargetNodes().map((node) => (
                <MenuItem key={node.id} value={node.id}>
                  {node.name || node.id} ({node.type})
                </MenuItem>
              ))}
            </Select>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
              {allowedTargetTypes.includes('*') 
                ? 'Any node type allowed' 
                : `Allowed types: ${allowedTargetTypes.join(', ')}`}
            </Typography>
          </FormControl>
          
          <TextField
            label="Relationship (Optional)"
            value={relationship}
            onChange={(e) => setRelationship(e.target.value)}
            fullWidth
            helperText="Relationship between the nodes"
          />
          
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            disabled={!selectedType || !sourceNodeId || !targetNodeId || loading}
          >
            Add Link
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default LinkForm;
