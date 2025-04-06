'use client';

import React from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import { PerformanceScalabilityDiagram } from './PerformanceScalabilityDiagram';
import type { PerformanceScalabilityDiagramProps } from './PerformanceScalabilityDiagram.types';

/**
 * Client-side wrapper for PerformanceScalabilityDiagram to ensure the React Flow component
 * only renders on the client side and not during SSR.
 */
export const PerformanceScalabilityDiagramClient: React.FC<PerformanceScalabilityDiagramProps> = (props) => {
  return (
    <ReactFlowProvider>
      <div style={{ width: '100%', height: props.height || '500px' }}>
        <PerformanceScalabilityDiagram {...props} />
      </div>
    </ReactFlowProvider>
  );
};

export default PerformanceScalabilityDiagramClient; 