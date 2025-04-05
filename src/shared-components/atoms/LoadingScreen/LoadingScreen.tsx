import React from 'react';
import { Spinner } from '../Spinner';
import { LoadingScreenProps } from './LoadingScreen.types';
import { LoadingContainer, LoadingText } from './LoadingScreen.styles';

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  text,
  spinnerSize = 'large',
  spinnerColor,
  minHeight = '100vh',
  className
}) => {
  return (
    <LoadingContainer 
      className={`loading-container ${className || ''}`} 
      style={{ minHeight }}
      data-testid="loading-screen"
      data-loading={true}
    >
      <Spinner 
        size={spinnerSize} 
        color={spinnerColor} 
        className="loading-spinner"
        data-testid="loading-screen-spinner"
      />
      {text && <LoadingText className="loading-text" data-testid="loading-screen-text">{text}</LoadingText>}
    </LoadingContainer>
  );
}; 