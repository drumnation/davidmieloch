'use client';

import { useEffect, useState, ReactNode } from 'react';

interface ClientOnlyProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * ClientOnly component to prevent hydration errors
 * Use this component to wrap any component that uses browser-only APIs
 * 
 * @example
 * ```tsx
 * <ClientOnly>
 *   <ComponentThatUsesBrowserAPIs />
 * </ClientOnly>
 * ```
 */
export function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? children : fallback;
}

/**
 * withClientOnly HOC to prevent hydration errors
 * Use this HOC to wrap any component that uses browser-only APIs
 * 
 * @example
 * ```tsx
 * const ClientOnlyComponent = withClientOnly(ComponentThatUsesBrowserAPIs);
 * ```
 */
export function withClientOnly<P extends object>(Component: React.ComponentType<P>) {
  return function WithClientOnly(props: P & { fallback?: ReactNode }) {
    const { fallback, ...rest } = props;
    
    return (
      <ClientOnly fallback={fallback}>
        <Component {...rest as P} />
      </ClientOnly>
    );
  };
}

export default ClientOnly; 