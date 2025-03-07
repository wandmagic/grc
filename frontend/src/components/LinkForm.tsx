import { useState } from 'react';
import { Button, Typography, Paper, TextField, MenuItem, Select, FormControl, InputLabel, Stack } from '@mui/material';
import { GraphLink, GraphNode } from '../types';
import { generateId } from '../utils/schemaLoader';

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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!selectedType || !sourceNodeId || !targetNodeId) return;
    
    const newLink: GraphLink = {
      id: generateId(),
      type: selectedType,
      name: linkName || undefined,
      from: sourceNodeId,
      to: targetNodeId,
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
            >
              {nodes.map((node) => (
                <MenuItem key={node.id} value={node.id}>
                  {node.name || node.id} ({node.type})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <FormControl fullWidth>
            <InputLabel id="target-node-label">Target Node</InputLabel>
            <Select
              labelId="target-node-label"
              value={targetNodeId}
              label="Target Node"
              onChange={(e) => setTargetNodeId(e.target.value)}
              required
            >
              {nodes.map((node) => (
                <MenuItem key={node.id} value={node.id}>
                  {node.name || node.id} ({node.type})
                </MenuItem>
              ))}
            </Select>
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
            disabled={!selectedType || !sourceNodeId || !targetNodeId}
          >
            Add Link
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default LinkForm;
