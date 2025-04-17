import React, { useState, useEffect } from 'react';
import type { ReactElement } from 'react';

type ErrorBoundaryProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

/**
 * App Router Safety Wrapper
 * 
 * This component catches errors related to Next.js App Router in the Storybook environment
 * and provides a graceful fallback UI instead of crashing the entire Storybook instance.
 */
class AppRouterSafetyWrapper extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { 
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { 
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.group('🛡️ App Router Safety Wrapper caught an error:');
    console.error(error);
    console.info('Component Stack:', errorInfo.componentStack);
    
    // Determine if it's likely an App Router error
    const isAppRouterError = 
      error.message.includes('forEach') || 
      error.message.includes('createRouter') ||
      error.message.includes('next/navigation') ||
      error.message.includes('useRouter');
    
    if (isAppRouterError) {
      console.warn(
        '⚠️ This appears to be a Next.js App Router related error in Storybook.\n' +
        'The component is likely using App Router features that are not fully mocked.\n' +
        'The story will use the fallback UI instead of crashing.'
      );
    }
    
    console.groupEnd();
  }

  render(): ReactElement {
    if (this.state.hasError) {
      // If a custom fallback was provided, use it
      if (this.props.fallback) {
        return <>{this.props.fallback}</>;
      }
      
      // Default fallback UI
      return (
        <div
          style={{
            padding: '20px',
            margin: '20px',
            borderRadius: '4px',
            backgroundColor: '#fff8e6',
            border: '1px solid #f0c000',
            color: '#664d00'
          }}
        >
          <h2 style={{ margin: '0 0 10px 0' }}>App Router Compatibility Issue</h2>
          <p>
            This component is using Next.js App Router features that cannot be fully 
            simulated in Storybook.
          </p>
          <details>
            <summary>Error details</summary>
            <pre style={{ 
              padding: '10px', 
              backgroundColor: '#fffbf0', 
              borderRadius: '4px',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              fontSize: '12px'
            }}>
              {this.state.error?.message}
            </pre>
          </details>
          <p style={{ marginTop: '20px', fontSize: '14px' }}>
            <strong>Recommendation:</strong> Consider refactoring this component to be more 
            Storybook-friendly by:
          </p>
          <ul style={{ fontSize: '14px' }}>
            <li>Extracting pure presentational components</li>
            <li>Making router dependencies optional or injectable</li>
            <li>Using a custom decorator for router context</li>
          </ul>
        </div>
      );
    }

    return <>{this.props.children}</>;
  }
}

/**
 * Higher-order component that wraps stories with the AppRouterSafetyWrapper
 */
export const withAppRouterSafety = (Story: React.ComponentType) => {
  return (
    <AppRouterSafetyWrapper>
      <Story />
    </AppRouterSafetyWrapper>
  );
};

export default AppRouterSafetyWrapper; 