'use client';

import React from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

/**
 * Client-side wrapper component for React Flow diagrams
 * 
 * This component:
 * 1. Uses the 'use client' directive to ensure it only runs on the client
 * 2. Provides the ReactFlowProvider context needed for React Flow
 * 3. Can wrap any React Flow based diagram to make it safe for Next.js
 * 
 * Use this for any diagram that uses React Flow in a Next.js application.
 */
export const ClientDiagramWrapper: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <ReactFlowProvider>
      <div className={className}>
        {children}
      </div>
    </ReactFlowProvider>
  );
};

export default ClientDiagramWrapper; 