'use client';

import React from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import { GardenMetaphorDiagram } from './GardenMetaphorDiagram';
import type { GardenMetaphorDiagramProps } from './GardenMetaphorDiagram.types';

/**
 * Client-side wrapper for GardenMetaphorDiagram to ensure the React Flow component
 * only renders on the client side and not during SSR.
 */
export const GardenMetaphorDiagramClient: React.FC<GardenMetaphorDiagramProps> = (props) => {
  return (
    <ReactFlowProvider>
      <div style={{ width: '100%', height: props.height || '600px' }}>
        <GardenMetaphorDiagram {...props} />
      </div>
    </ReactFlowProvider>
  );
};

export default GardenMetaphorDiagramClient; 