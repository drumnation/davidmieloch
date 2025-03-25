import React from 'react';
import { PageLoaderProps } from './PageLoader.types';
import { LoaderContainer } from './PageLoader.styles';
import { Spinner } from '../Spinner';

export const PageLoader: React.FC<PageLoaderProps> = ({ 
  className,
  minHeight = '100vh',
  spinnerSize = 'large',
  spinnerColor
}) => {
  return (
    <LoaderContainer className={className} style={{ minHeight }}>
      <Spinner size={spinnerSize} color={spinnerColor} />
      <div style={{ marginTop: '1rem' }}>Loading...</div>
    </LoaderContainer>
  );
}; 