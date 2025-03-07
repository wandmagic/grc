import React from 'react';
import { Box, Typography, Paper, Divider, Link } from '@mui/material';

const SchemaDocumentation: React.FC = () => {
  return (
    <Box sx={{ p: 2, maxWidth: '100%', overflowY: 'auto', height: '100%' }}>
      <Typography variant="h4" gutterBottom>
        GRC Schema Documentation
      </Typography>
      
      <Paper sx={{ p: 3, mb: 4, backgroundColor: 'background.paper' }}>
        <Typography variant="h5" gutterBottom>
          Schema Design Decisions
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        <Typography variant="h6" gutterBottom>
          Graph-Based Structure
        </Typography>
        <Typography paragraph>
          The GRC Schema is designed as a graph-based data model, consisting of nodes and links. This approach was chosen because:
        </Typography>
        <ul>
          <li>
            <Typography>
              <strong>Natural representation:</strong> GRC concepts naturally form a graph where entities (systems, people, controls) have relationships with each other.
            </Typography>
          </li>
          <li>
            <Typography>
              <strong>Flexibility:</strong> Graph structures allow for flexible modeling of complex relationships without rigid hierarchies.
            </Typography>
          </li>
          <li>
            <Typography>
              <strong>Extensibility:</strong> New node and link types can be added without breaking existing implementations.
            </Typography>
          </li>
        </ul>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          JSON Schema Format
        </Typography>
        <Typography paragraph>
          We chose JSON Schema (draft-07) as the definition format because:
        </Typography>
        <ul>
          <li>
            <Typography>
              <strong>Wide adoption:</strong> JSON Schema is widely supported across programming languages and tools.
            </Typography>
          </li>
          <li>
            <Typography>
              <strong>Validation capabilities:</strong> It provides robust validation rules for ensuring data integrity.
            </Typography>
          </li>
          <li>
            <Typography>
              <strong>Human readability:</strong> The schema definitions are relatively easy to read and understand.
            </Typography>
          </li>
          <li>
            <Typography>
              <strong>Tooling support:</strong> Many tools can generate code, documentation, and UIs from JSON Schema.
            </Typography>
          </li>
        </ul>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Unique Identifiers
        </Typography>
        <Typography paragraph>
          We recommend using ShortUUID format (~22 character encoded UUID) for node and link IDs because:
        </Typography>
        <ul>
          <li>
            <Typography>
              <strong>Database compatibility:</strong> These IDs work well with most database systems.
            </Typography>
          </li>
          <li>
            <Typography>
              <strong>Collision avoidance:</strong> They provide sufficient randomness to avoid ID collisions in distributed systems.
            </Typography>
          </li>
          <li>
            <Typography>
              <strong>Reasonable length:</strong> They are shorter than standard UUIDs while maintaining uniqueness.
            </Typography>
          </li>
        </ul>
      </Paper>
      
      <Paper sx={{ p: 3, mb: 4, backgroundColor: 'background.paper' }}>
        <Typography variant="h5" gutterBottom>
          Storage and Query Optimizations
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        <Typography variant="h6" gutterBottom>
          Parquet Integration
        </Typography>
        <Typography paragraph>
          The schema is designed to be compatible with columnar storage formats like Apache Parquet:
        </Typography>
        <ul>
          <li>
            <Typography>
              <strong>Flat structure:</strong> Node and link properties are designed to be relatively flat, which works well with columnar storage.
            </Typography>
          </li>
          <li>
            <Typography>
              <strong>Consistent types:</strong> Properties maintain consistent types across instances, allowing for efficient compression in Parquet.
            </Typography>
          </li>
          <li>
            <Typography>
              <strong>Partitioning friendly:</strong> The schema supports partitioning by node/link types or other properties for optimized queries.
            </Typography>
          </li>
        </ul>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          SQL Database Mapping
        </Typography>
        <Typography paragraph>
          The schema can be efficiently mapped to relational databases:
        </Typography>
        <ul>
          <li>
            <Typography>
              <strong>Node/link tables:</strong> Each node or link type can be represented as a separate table with type-specific columns.
            </Typography>
          </li>
          <li>
            <Typography>
              <strong>Common properties:</strong> Common properties (id, type, name) can be stored in base tables with inheritance patterns.
            </Typography>
          </li>
          <li>
            <Typography>
              <strong>Indexing strategy:</strong> The schema supports efficient indexing on IDs and commonly queried properties.
            </Typography>
          </li>
          <li>
            <Typography>
              <strong>JSON columns:</strong> For flexible properties, modern SQL databases can store JSON columns while maintaining queryability.
            </Typography>
          </li>
        </ul>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Graph Database Optimization
        </Typography>
        <Typography paragraph>
          The schema is naturally optimized for graph databases:
        </Typography>
        <ul>
          <li>
            <Typography>
              <strong>Native representation:</strong> The node/link structure maps directly to vertices and edges in graph databases.
            </Typography>
          </li>
          <li>
            <Typography>
              <strong>Relationship types:</strong> Link types directly correspond to edge types in graph databases.
            </Typography>
          </li>
          <li>
            <Typography>
              <strong>Property model:</strong> Node and link properties map to vertex and edge properties.
            </Typography>
          </li>
          <li>
            <Typography>
              <strong>Query optimization:</strong> The schema supports common graph traversal patterns used in GRC analysis.
            </Typography>
          </li>
        </ul>
      </Paper>
      
      <Paper sx={{ p: 3, backgroundColor: 'background.paper' }}>
        <Typography variant="h5" gutterBottom>
          Future Goals
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        <Typography variant="h6" gutterBottom>
          Schema Evolution
        </Typography>
        <Typography paragraph>
          Our plans for evolving the schema include:
        </Typography>
        <ul>
          <li>
            <Typography>
              <strong>Additional node types:</strong> Expanding to cover more GRC domains such as audit findings, incidents, and training materials.
            </Typography>
          </li>
          <li>
            <Typography>
              <strong>Relationship enrichment:</strong> Adding more semantic relationship types to express complex GRC relationships.
            </Typography>
          </li>
          <li>
            <Typography>
              <strong>Versioning support:</strong> Enhancing the schema to better support versioning of nodes and links over time.
            </Typography>
          </li>
        </ul>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Integration Capabilities
        </Typography>
        <Typography paragraph>
          We aim to enhance integration with:
        </Typography>
        <ul>
          <li>
            <Typography>
              <strong>OSCAL:</strong> Deeper integration with NIST's Open Security Controls Assessment Language.
            </Typography>
          </li>
          <li>
            <Typography>
              <strong>SBOM formats:</strong> Better support for Software Bill of Materials formats like CycloneDX and SPDX.
            </Typography>
          </li>
          <li>
            <Typography>
              <strong>Threat intelligence:</strong> Integration with STIX and other threat intelligence formats.
            </Typography>
          </li>
          <li>
            <Typography>
              <strong>Risk frameworks:</strong> Mapping to common risk frameworks like FAIR, NIST RMF, and ISO 31000.
            </Typography>
          </li>
        </ul>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Query and Analysis
        </Typography>
        <Typography paragraph>
          Future enhancements for analysis include:
        </Typography>
        <ul>
          <li>
            <Typography>
              <strong>Query language:</strong> Developing a specialized query language for GRC graph traversal and analysis.
            </Typography>
          </li>
          <li>
            <Typography>
              <strong>Analytics library:</strong> Creating libraries for common GRC analytics like control coverage, risk exposure, and compliance gaps.
            </Typography>
          </li>
          <li>
            <Typography>
              <strong>ML integration:</strong> Schema extensions to support machine learning features for risk prediction and anomaly detection.
            </Typography>
          </li>
        </ul>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Community Contributions
        </Typography>
        <Typography paragraph>
          We welcome community contributions in these areas:
        </Typography>
        <ul>
          <li>
            <Typography>
              <strong>Industry-specific extensions:</strong> Specialized node and link types for specific industries (healthcare, finance, etc.).
            </Typography>
          </li>
          <li>
            <Typography>
              <strong>Visualization components:</strong> Additional visualization tools for GRC data analysis.
            </Typography>
          </li>
          <li>
            <Typography>
              <strong>Integration adapters:</strong> Connectors to common GRC tools and data sources.
            </Typography>
          </li>
        </ul>
        
        <Box sx={{ mt: 4, pt: 2, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <Typography variant="subtitle1" gutterBottom>
            Get Involved
          </Typography>
          <Typography>
            We welcome contributions and feedback on the GRC Schema. Please visit our{' '}
            <Link href="https://github.com/user/grc-schema" target="_blank" rel="noopener">
              GitHub repository
            </Link>{' '}
            to get involved.
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default SchemaDocumentation;
