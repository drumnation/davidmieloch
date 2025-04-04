import React, { useCallback, useState } from 'react';
import { BrainGardenComponentsDiagram } from './BrainGardenComponentsDiagram';
import type { Meta, StoryObj } from '@storybook/react';
import { NodePosition } from '../DiagramEditor/DiagramEditor.types';

/**
 * Storybook configuration for the BrainGardenComponentsDiagram component
 * 
 * The Default story shows the diagram in its actual page context.
 */
const meta = {
  title: 'Diagrams/BrainGardenComponentsDiagram',
  component: BrainGardenComponentsDiagram,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A diagram showing the core components of the Brain Garden system.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BrainGardenComponentsDiagram>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Default display showing the Brain Garden Components Diagram in its actual page context.
 * This matches how the diagram appears in the Brain Garden Overview section.
 */
export const Default: Story = {
  args: {
    width: '898px',
    height: '798px',
    showZoomControls: false,
    backgroundColor: 'transparent',
  },
  parameters: {
    pageStructure: 'garden',
  },
};

/**
 * Brain Garden Components Diagram with light blue background, no page context
 */
export const WithLightBlueBackground: Story = {
  args: {
    width: '100%',
    height: '600px',
    showZoomControls: true,
    backgroundColor: 'rgba(74, 158, 255, 0.05)',
  },
  parameters: {
    pageStructure: 'none',
  },
};

/**
 * Brain Garden Components Diagram with dark theme, no page context
 */
export const DarkTheme: Story = {
  args: {
    width: '100%',
    height: '600px',
    showZoomControls: true,
    theme: 'dark',
  },
  parameters: {
    backgrounds: { default: 'dark' },
    pageStructure: 'none',
  },
};

/**
 * Interactive editor for manually positioning nodes
 */
const InteractiveNodeEditor = () => {
  const [savedPositions, setSavedPositions] = useState<NodePosition[]>([]);
  
  // Toggle node draggability
  const [nodesDraggable, setNodesDraggable] = useState(true);
  
  // Function to get the current node positions from the diagram
  const captureNodePositions = useCallback(() => {
    const diagramEl = document.querySelector('.react-flow__nodes');
    if (!diagramEl) {
      console.error('Could not find diagram nodes');
      return;
    }
    
    const nodeElements = diagramEl.querySelectorAll('.react-flow__node');
    if (!nodeElements.length) {
      console.error('No nodes found in diagram');
      return;
    }
    
    const positions: NodePosition[] = [];
    
    nodeElements.forEach(node => {
      const id = node.getAttribute('data-id');
      if (!id) return;
      
      // Get translation values from transform style
      const style = window.getComputedStyle(node);
      const transform = style.transform || style.webkitTransform;
      
      // Extract position from transform matrix
      const matrix = transform.match(/matrix\(.*,\s*(\d+\.?\d*),\s*(\d+\.?\d*)\)/);
      if (matrix && matrix.length >= 3) {
        positions.push({
          id,
          position: {
            x: parseFloat(matrix[1]),
            y: parseFloat(matrix[2])
          }
        });
      }
    });
    
    setSavedPositions(positions);
    console.log(JSON.stringify(positions, null, 2));
  }, []);
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px' }}>
      <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
        <button
          onClick={captureNodePositions}
          style={{
            padding: '8px 16px',
            backgroundColor: '#1a365d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Capture Node Positions
        </button>
        
        <button
          onClick={() => setNodesDraggable(!nodesDraggable)}
          style={{
            padding: '8px 16px',
            backgroundColor: nodesDraggable ? '#4CAF50' : '#F44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {nodesDraggable ? 'Dragging Enabled' : 'Dragging Disabled'}
        </button>
      </div>
      
      {savedPositions.length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          <p>Copy the positions below and update your code:</p>
          <pre 
            style={{
              backgroundColor: '#f5f5f5',
              padding: '8px',
              borderRadius: '4px',
              maxHeight: '200px',
              overflow: 'auto',
              fontSize: '12px'
            }}
          >
            {JSON.stringify(savedPositions, null, 2)}
          </pre>
        </div>
      )}
      
      <div style={{ width: '100%', height: '700px', border: '1px solid #ccc' }}>
        {/* Pass custom props for editing */}
        <BrainGardenComponentsDiagram
          width="100%"
          height="100%"
          nodesDraggable={nodesDraggable}
          showZoomControls={true}
        />
      </div>
    </div>
  );
};

// Export the interactive editor story properly
export const WithDiagramEditor = {
  render: () => <InteractiveNodeEditor />,
  name: 'Interactive Node Editor'
} satisfies Story;
