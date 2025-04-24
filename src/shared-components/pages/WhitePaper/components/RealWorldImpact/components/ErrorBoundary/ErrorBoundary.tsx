import React from 'react';
import { WarningBox } from '../../RealWorldImpact.styles';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('RealWorldImpact Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <WarningBox>
          <div style={{ color: '#d32f2f' }}>
            <h3 style={{ color: '#d32f2f', marginBottom: '1rem', fontSize: '1.5rem' }}>Something went wrong</h3>
            <p style={{ marginBottom: '1rem', lineHeight: 1.6 }}>We're sorry, but there was an error loading this section.</p>
            {process.env.NODE_ENV === 'development' && (
              <pre style={{
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                padding: '1rem',
                borderRadius: '4px',
                overflow: 'auto',
                fontFamily: 'monospace',
                fontSize: '0.9rem'
              }}>
                {this.state.error?.message}
              </pre>
            )}
          </div>
        </WarningBox>
      );
    }

    return this.props.children;
  }
} 