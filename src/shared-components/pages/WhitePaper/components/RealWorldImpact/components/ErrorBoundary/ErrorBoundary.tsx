import React from 'react';
import { WarningBox, WarningContent } from '../../RealWorldImpact.styles';

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
          <WarningContent>
            <h3>Something went wrong</h3>
            <p>We're sorry, but there was an error loading this section.</p>
            {process.env.NODE_ENV === 'development' && (
              <pre>{this.state.error?.message}</pre>
            )}
          </WarningContent>
        </WarningBox>
      );
    }

    return this.props.children;
  }
} 