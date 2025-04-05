'use client';

import React from 'react';
import { AiIntegrationProcessDiagram as AiIntegrationProcessDiagramComponent } from './AiIntegrationProcessDiagram';
import { AiIntegrationProcessDiagramProps } from './AiIntegrationProcessDiagram.types';
import { ReactFlowProvider } from '@xyflow/react';

/**
 * Client-side wrapper for AiIntegrationProcessDiagram to ensure the React Flow component
 * only renders on the client side and not during SSR.
 */
export const AiIntegrationProcessDiagramClient: React.FC<AiIntegrationProcessDiagramProps> = (props) => {
  // Standard app dimensions (898x798) to ensure consistency with the actual app
  const APP_WIDTH = '898px';
  const APP_HEIGHT = '798px';
  
  // Calculate container dimensions that match the exact app dimensions
  const containerStyle = {
    width: props.width || APP_WIDTH,
    height: props.height || APP_HEIGHT,
    maxWidth: props.width || APP_WIDTH,
    margin: '0 auto',
    background: props.backgroundColor || '#f9f9f9',
    borderRadius: '8px',
    overflow: 'hidden', // Ensure content doesn't overflow
  };

  // Default showZoomControls to false in production and true in development
  const showZoomControls = props.showZoomControls ?? (process.env.NODE_ENV === 'development');

  // Create a new props object without backgroundColor to prevent passing it to DOM elements
  const { backgroundColor, ...otherProps } = props;

  return (
    <ReactFlowProvider>
      <div style={containerStyle} className={props.containerClassName}>
        <AiIntegrationProcessDiagramComponent 
          {...otherProps}
          showZoomControls={showZoomControls}
        />
      </div>
    </ReactFlowProvider>
  );
};

export default AiIntegrationProcessDiagramClient; 