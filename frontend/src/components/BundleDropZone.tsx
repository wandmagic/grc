import { useState, useCallback } from 'react';
import { Paper, Typography, Box, Button } from '@mui/material';
import { GrcBundle } from '../types';

interface BundleDropZoneProps {
  onBundleLoad: (bundle: GrcBundle) => void;
}

const BundleDropZone = ({ onBundleLoad }: BundleDropZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    setError(null);

    const files = e.dataTransfer.files;
    if (files.length === 0) {
      setError('No file dropped');
      return;
    }

    const file = files[0];
    if (file.type !== 'application/json') {
      setError('File must be JSON');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const bundle = JSON.parse(event.target?.result as string) as GrcBundle;
        
        // Basic validation
        if (!bundle.id || bundle.type !== 'bundle' || !Array.isArray(bundle.nodes) || !Array.isArray(bundle.links)) {
          setError('Invalid bundle format');
          return;
        }
        
        onBundleLoad(bundle);
      } catch (err) {
        setError('Error parsing JSON');
        console.error(err);
      }
    };
    
    reader.readAsText(file);
  }, [onBundleLoad]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    
    const files = e.target.files;
    if (!files || files.length === 0) {
      return;
    }

    const file = files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const bundle = JSON.parse(event.target?.result as string) as GrcBundle;
        
        // Basic validation
        if (!bundle.id || bundle.type !== 'bundle' || !Array.isArray(bundle.nodes) || !Array.isArray(bundle.links)) {
          setError('Invalid bundle format');
          return;
        }
        
        onBundleLoad(bundle);
      } catch (err) {
        setError('Error parsing JSON');
        console.error(err);
      }
    };
    
    reader.readAsText(file);
  }, [onBundleLoad]);

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 3, 
        mb: 3,
        border: isDragging ? '2px dashed #1976d2' : '2px dashed #ccc',
        backgroundColor: isDragging ? 'rgba(25, 118, 210, 0.05)' : 'transparent',
        transition: 'all 0.3s ease'
      }}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Box sx={{ textAlign: 'center', py: 3 }}>
        <Typography variant="h5" gutterBottom>
          Import GRC Bundle
        </Typography>
        
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Drag and drop a GRC bundle JSON file here, or click to select a file
        </Typography>
        
        <Button
          variant="contained"
          component="label"
          sx={{ mt: 2 }}
        >
          Select File
          <input
            type="file"
            accept="application/json"
            hidden
            onChange={handleFileSelect}
          />
        </Button>
        
        {error && (
          <Typography variant="body2" color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

export default BundleDropZone;
