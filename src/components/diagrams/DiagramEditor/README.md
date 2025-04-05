# DiagramEditor Component

The DiagramEditor is a reusable component that provides a standardized way to create, edit, and capture node positions for diagrams. It's built on top of ReactFlow and provides additional features specifically for Storybook development.

## Features

- Interactive diagram editing with drag-and-drop node positioning
- Zoom controls with customizable min/max values
- Position capturing to console (for copying positions back to code)
- Viewport tracking and saving
- Smooth animations and transitions
- Responsive design for different screen sizes

## Standard Dimensions

To ensure consistency between Storybook and the actual application, always use the standard app dimensions:

- **Width**: 898px
- **Height**: 798px

These dimensions ensure that when you design and capture positions in Storybook, they will match exactly what appears in the application.

## Usage

### Basic Usage

```tsx
import { DiagramEditor } from '@/components/diagrams/DiagramEditor';

const MyDiagram = () => {
  // Define your nodes, edges, and node types
  const nodes = [...];
  const edges = [...];
  const nodeTypes = {
    custom: MyCustomNode,
    // other node types
  };

  return (
    <DiagramEditor
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      title="My Diagram"
      width="898px"  // Standard app width
      height="798px" // Standard app height
      showEditControls={process.env.NODE_ENV === 'development'} // Only show in development
    />
  );
};
```

### For Storybook

In Storybook, you should always enable the edit controls to allow position capturing and use the standard dimensions:

```tsx
// MyDiagram.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { MyDiagram } from './MyDiagram';

// Using the exact app dimensions (898x798) for consistency
const APP_DIAGRAM_DIMENSIONS = {
  width: '898px',
  height: '798px',
};

const meta: Meta<typeof MyDiagram> = {
  title: 'Diagrams/MyDiagram',
  component: MyDiagram,
  args: {
    ...APP_DIAGRAM_DIMENSIONS,
    showZoomControls: true, // Always enable in Storybook
  },
};

export default meta;
type Story = StoryObj<typeof MyDiagram>;

export const Default: Story = {
  args: {
    title: 'My Diagram',
  },
};
```

## Capturing Node Positions

1. Arrange the nodes as desired in Storybook
2. Click the "Capture Positions" button
3. Open your browser console to see the JSON output
4. Copy the positions into your component code

## Workflow for Creating New Diagrams

1. Create your diagram component starting with placeholder node positions
2. Create a Storybook story with `showEditControls: true` and standard dimensions
3. Arrange nodes in Storybook and capture positions
4. Copy positions to your component code
5. Repeat as needed for refinements

## Client-Side Wrapper

For Next.js applications, use the client-side wrapper to avoid SSR issues:

```tsx
// In your page component
import { DiagramEditorClient } from '@/components/diagrams/DiagramEditor';

const DiagramPage = () => {
  // Define your diagram data
  
  return (
    <DiagramEditorClient
      // Props will use standard dimensions by default (898x798)
    />
  );
};
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| nodes | Node[] | required | The nodes to display |
| edges | Edge[] | required | The edges connecting nodes |
| nodeTypes | Record<string, ComponentType> | required | Node type components |
| width | string \| number | '898px' | Container width |
| height | string \| number | '798px' | Container height |
| backgroundColor | string | '#f9f9f9' | Background color |
| title | string | undefined | Diagram title |
| description | string | undefined | Description text |
| initialZoom | number | 0.65 | Initial zoom level |
| initialPosition | { x: number, y: number } | { x: 0, y: 0 } | Initial viewport position |
| maxZoom | number | 5 | Maximum zoom level |
| minZoom | number | 0.1 | Minimum zoom level |
| showEditControls | boolean | false | Whether to show editing controls |
| className | string | '' | Additional CSS class |
| accessibilityDescription | string | undefined | Accessibility description | 