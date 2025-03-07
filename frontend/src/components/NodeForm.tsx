import { useState } from 'react';
import { Button, Typography, Paper, TextField, MenuItem, Select, FormControl, InputLabel, Stack } from '@mui/material';
import { GraphNode } from '../types';
import { generateId } from '../utils/schemaLoader';

interface NodeFormProps {
  onSubmit: (formData: GraphNode) => void;
  nodeTypes: string[];
}

const NodeForm = ({ onSubmit, nodeTypes }: NodeFormProps) => {
  const [selectedType, setSelectedType] = useState<string>('');
  const [nodeName, setNodeName] = useState<string>('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!selectedType) return;
    
    const newNode: GraphNode = {
      id: generateId(),
      type: selectedType,
      name: nodeName || undefined
    };
    
    onSubmit(newNode);
    
    // Reset form
    setSelectedType('');
    setNodeName('');
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>
        Add New Node
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <FormControl fullWidth>
            <InputLabel id="node-type-label">Node Type</InputLabel>
            <Select
              labelId="node-type-label"
              value={selectedType}
              label="Node Type"
              onChange={(e) => setSelectedType(e.target.value)}
              required
            >
              {nodeTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <TextField
            label="Node Name (Optional)"
            value={nodeName}
            onChange={(e) => setNodeName(e.target.value)}
            fullWidth
            helperText="Human-readable name for the node"
          />
          
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            disabled={!selectedType}
          >
            Add Node
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default NodeForm;
