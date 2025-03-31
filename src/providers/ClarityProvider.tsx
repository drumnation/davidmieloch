'use client';

import { useEffect } from 'react';
import { initClarity } from '../analytics';

interface ClarityProviderProps {
  children: React.ReactNode;
  projectId?: string;
}

/**
 * Provider component that initializes Microsoft Clarity analytics
 */
export function ClarityProvider({ children, projectId }: ClarityProviderProps) {
  useEffect(() => {
    // Initialize Clarity in the browser
    if (typeof window !== 'undefined') {
      const config = projectId ? { projectId } : {};
      initClarity(config);
    }
  }, [projectId]);

  return <>{children}</>;
}

export default ClarityProvider; 