import React from 'react';
import { PageLoaderProps } from './PageLoader.types';
import { LoaderContainer } from './PageLoader.styles';

export const PageLoader: React.FC<PageLoaderProps> = ({ 
  className,
  minHeight = '100vh'
}) => {
  return (
    <LoaderContainer className={className} style={{ minHeight }}>
      Loading...
    </LoaderContainer>
  );
}; 