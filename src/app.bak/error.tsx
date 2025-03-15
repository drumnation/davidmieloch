"use client";

import { useEffect } from 'react';
import { logger } from '@/utils/logger';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to our custom logger
    logger.error('Application error caught by error boundary:', error);
  }, [error]);

  return (
    <div className="error-container" style={{ 
      padding: '2rem', 
      maxWidth: '800px', 
      margin: '0 auto',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <h1 style={{ color: '#e53e3e' }}>Something went wrong!</h1>
      
      <div style={{ 
        background: '#f7fafc', 
        padding: '1rem', 
        borderRadius: '0.5rem',
        border: '1px solid #e2e8f0',
        marginBottom: '1rem'
      }}>
        <h2>Error Details:</h2>
        <p><strong>Name:</strong> {error.name}</p>
        <p><strong>Message:</strong> {error.message}</p>
        {error.digest && <p><strong>Digest:</strong> {error.digest}</p>}
        
        <div style={{ marginTop: '1rem' }}>
          <details>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Stack Trace</summary>
            <pre style={{ 
              whiteSpace: 'pre-wrap', 
              background: '#edf2f7', 
              padding: '0.5rem', 
              borderRadius: '0.25rem',
              fontSize: '0.875rem',
              overflowX: 'auto'
            }}>
              {error.stack}
            </pre>
          </details>
        </div>
      </div>
      
      <div style={{ marginTop: '2rem' }}>
        <button
          onClick={reset}
          style={{
            background: '#3182ce',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '0.25rem',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Try Again
        </button>
      </div>
      
      <div style={{ marginTop: '2rem', fontSize: '0.875rem', color: '#718096' }}>
        <p>If this error persists, please contact support with the error details above.</p>
      </div>
    </div>
  );
} 