'use client';

import { ReactFlowDiagramProps } from './ReactFlowDiagram.types';
import { EnhancedReactFlowDiagram } from './EnhancedReactFlowDiagram';

/**
 * Client-side wrapper for ReactFlowDiagram component
 * This component uses the 'use client' directive to ensure it only runs on the client
 * and safely uses React Flow, which is not compatible with server-side rendering.
 * 
 * This implementation now uses the EnhancedReactFlowDiagram which provides better
 * initialization, error handling, and debugging capabilities.
 */
export const ReactFlowDiagramClient = (props: ReactFlowDiagramProps) => {
  return <EnhancedReactFlowDiagram {...props} />;
};

export default ReactFlowDiagramClient; 