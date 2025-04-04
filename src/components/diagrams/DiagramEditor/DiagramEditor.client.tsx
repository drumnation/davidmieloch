'use client';

import React from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import { DiagramEditor } from './DiagramEditor';
import type { DiagramEditorProps } from './DiagramEditor.types';

/**
 * Client-side wrapper for DiagramEditor to ensure the component
 * only renders on the client side and not during SSR.
 * 
 * This component handles all ReactFlow functionality that requires
 * browser APIs and DOM access.
 */
export const DiagramEditorClient: React.FC<DiagramEditorProps> = (props) => {
  // Use standardized dimensions that match the app (898x798) to ensure consistency
  const DEFAULT_WIDTH = '898px';
  const DEFAULT_HEIGHT = '798px';
  
  // Extract backgroundColor from props to prevent it from being passed to DOM elements
  const { backgroundColor, ...filteredProps } = props;
  
  const containerStyle = {
    width: props.width || DEFAULT_WIDTH,
    height: props.height || DEFAULT_HEIGHT,
    maxWidth: props.width || DEFAULT_WIDTH,
    margin: '0 auto',
    background: backgroundColor || '#f9f9f9', // Use background style property
    borderRadius: '8px',
    overflow: 'hidden',
  };

  return (
    <ReactFlowProvider>
      <div style={containerStyle} className={props.className}>
        <DiagramEditor {...filteredProps} />
      </div>
    </ReactFlowProvider>
  );
};

export default DiagramEditorClient; 