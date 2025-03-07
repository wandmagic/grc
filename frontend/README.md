# GRC Schema Visualizer

A web-based tool for visualizing, creating, and editing GRC (Governance, Risk, and Compliance) data models based on the GRC Schema.

## Features

- **3D Force Graph Visualization**: Interactive visualization of GRC nodes and links
- **Node and Link Creation**: Forms to add new nodes and links to the graph
- **Import/Export**: Drag and drop JSON files or load examples, and export your work
- **Schema Validation**: Ensures data conforms to the GRC Schema

## Getting Started

### Prerequisites

- Node.js 18 or higher

### Installation

1. Clone the repository
2. Install dependencies:

```bash
cd frontend
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to http://localhost:5173

## Usage

### Visualization

The main tab shows a 3D force graph visualization of your GRC data. You can:

- Rotate the graph by dragging
- Zoom in/out with the mouse wheel
- Click on nodes and links to see their details

### Adding Nodes

1. Go to the "Add Node" tab
2. Select a node type
3. Fill in the required fields
4. Click "Add Node"

### Adding Links

1. Go to the "Add Link" tab
2. Select a link type
3. Choose source and target nodes
4. Fill in the required fields
5. Click "Add Link"

### Importing/Exporting

- **Import**: Drag and drop a GRC Schema JSON file or click to select a file
- **Load Example**: Click the "Load Simple Example" button to load a sample graph
- **Export**: Click the "Download JSON" button to save your work

## Development

This project is built with:

- React
- TypeScript
- Vite
- Material UI
- 3D Force Graph

## License

This project is licensed under the MIT License - see the LICENSE file for details.
