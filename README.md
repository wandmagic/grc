# GRC Schema

A comprehensive JSON Schema for modeling Governance, Risk, and Compliance (GRC) data.

## Overview

This repository contains a set of JSON Schema definitions for representing GRC data as a graph of nodes and links. The schema is designed to be flexible and extensible, allowing for the representation of various GRC concepts such as:

- System components
- Software Bill of Materials (SBOM) attestations
- Persons and roles
- Responsibilities
- Risks and threats
- Policies and controls
- Compliance requirements
- Vulnerabilities
- And more...

## Schema Structure

The schema is organized into three main components:

1. **Nodes**: Base entities in the GRC model
2. **Links**: Relationships between nodes (inherit from nodes)
3. **Bundle**: A collection of nodes and links that forms a complete GRC model (also inherits from nodes)

### Node Types

The following node types are defined:

- `system-component`: Hardware, software, or network components
- `sbom-attestation`: Software Bill of Materials attestations
- `person`: Individuals involved in GRC activities
- `role`: Organizational roles
- `responsibility`: Specific responsibilities
- `risk`: Identified risks
- `plan-of-action-item`: Action items for addressing risks
- `threat`: Potential threats
- `policy`: Organizational policies
- `control`: Security or compliance controls
- `compliance-requirement`: Requirements from standards or regulations
- `vulnerability`: Identified vulnerabilities
- `resource`: External resources such as documentation, standards, or articles

### Node IDs

Node IDs should be globally unique across all nodes in a bundle. We recommend using ShortUUID format (~22 character encoded UUID, e.g., 'keATt6KQsAVXDUbZcRdg6i') for database compatibility and to ensure uniqueness.

All nodes have an optional `name` field that can be used for human-readable identification. When migrating from descriptive IDs to ShortUUIDs, the original descriptive ID (e.g., "john-doe", "web-server") can be preserved in this field.

### Link Types

The following link types are defined:

- `ownership`: Represents ownership relationships (e.g., person owns system-component)
- `assignment`: Represents assignment relationships (e.g., person assigned to role)
- `responsibility`: Represents responsibility relationships (e.g., role responsible for control)
- `mitigation`: Represents mitigation relationships (e.g., control mitigates risk)
- `compliance`: Represents compliance relationships (e.g., control satisfies requirement)
- `threat`: Represents threat relationships (e.g., threat targets system-component)
- `implementation`: Represents implementation relationships (e.g., system-component implements control)
- `reference`: Represents lightweight references to resource nodes

### Bundle

The bundle schema combines nodes and links into a complete GRC model, with optional metadata.

## Usage

### Installation

You can use the schema in your project by referencing the compiled schema file:

```json
{
  "$schema": "https://raw.githubusercontent.com/user/grc-schema/main/dist/grc-schema.json"
}
```

### Validation

You can validate your GRC data against the schema using any JSON Schema validator that supports draft-07.

### Examples

The repository includes several example GRC models in the `examples/` directory:

1. **Simple Example** (`examples/simple-example.json`): A basic GRC model with a few nodes and links.
2. **Compliance Example** (`examples/compliance-example.json`): A compliance-focused example demonstrating how to model compliance requirements, controls, and their relationships.
3. **Risk Management Example** (`examples/risk-management-example.json`): A risk management-focused example demonstrating how to model risks, threats, vulnerabilities, and their relationships.

Here's a simple example of a GRC bundle:

```json
{
  "id": "keATt6KQsAVXDUbZcRdg6i",
  "type": "bundle",
  "name": "bundle-1",
  "nodes": [
    {
      "id": "fkB7EkQsAVXDUbZcRdg6j",
      "type": "system-component",
      "name": "web-server",
      "description": "Main web server",
      "category": "software"
    },
    {
      "id": "gLm9EkQsAVXDUbZcRdg6k",
      "type": "person",
      "name": "john-doe",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com"
    }
  ],
  "links": [
    {
      "id": "hPq2EkQsAVXDUbZcRdg6l",
      "type": "ownership",
      "name": "john-owns-server",
      "origin": ["gLm9EkQsAVXDUbZcRdg6k"],
      "target": ["fkB7EkQsAVXDUbZcRdg6j"],
      "relationship": "owns",
      "ownershipType": "primary"
    }
  ],
  "metadata": {
    "name": "Example GRC Model",
    "version": "1.0.0",
    "createdAt": "2025-03-06T12:00:00Z"
  }
}
```

For more complex examples, see the files in the `examples/` directory.

## Development

### Prerequisites

- Node.js 18 or higher

### Setup

1. Clone the repository
2. Install dependencies: `npm ci`

### Compiling the Schema

To compile all schema files into a single schema:

```bash
npm run compile
```

This will gen erate `dist/grc-schema.json`.

### Validating the Schema and Examples

To validate the compiled schema against the JSON Schema meta-schema and validate all examples against the compiled schema:

```bash
npm run validate
```

This will:
1. Check if the compiled schema is valid according to JSON Schema draft-07
2. Validate all example files in the `examples/` directory against the compiled schema

You can also run both compilation and validation in one step:

```bash
npm test
```

## Releases

This project uses GitHub Actions to automatically compile the schema and create releases. The workflow is triggered by:

1. Pushing to the main branch
2. Creating a tag with the format `v*` (e.g., `v1.0.0`)
3. Manually triggering the workflow

The compiled schema is included in each release as `grc-schema.json`.

## GitHub Pages

This project includes a web-based visualization tool for GRC models, which is deployed to GitHub Pages. You can access it at:

```
https://[username].github.io/grc-schema/
```

### Deployment

The GitHub Pages site is automatically deployed using GitHub Actions when changes are pushed to the main branch. The workflow:

1. Compiles the schemas
2. Copies the examples
3. Builds the frontend application
4. Deploys the built files to GitHub Pages

You can also manually trigger the deployment from the Actions tab in the GitHub repository.

### Local Development

To run the frontend application locally:

```bash
npm run dev
```

This will start a development server at `http://localhost:5173/`.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
