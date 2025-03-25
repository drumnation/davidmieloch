import React from 'react';
import { PageLoaderProps } from './PageLoader.types';
import { SpinnerLoader } from '../../../components';

export const PageLoader: React.FC<PageLoaderProps> = ({ 
  className,
  minHeight = '100vh',
  spinnerSize = 'large',
  spinnerColor
}) => {
  // Convert size string to pixel number
  const sizeMap = {
    small: 30,
    medium: 50,
    large: 70
  };
  
  const size = typeof spinnerSize === 'string' ? sizeMap[spinnerSize] || 50 : spinnerSize;
  
  return (
    <SpinnerLoader
      type="clip"
      size={size}
      color={spinnerColor}
      fullPage={false}
      className={className}
    />
  );
}; 