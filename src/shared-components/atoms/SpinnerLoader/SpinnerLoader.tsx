'use client';

import React from 'react';
import { 
  ClipLoader, 
  BeatLoader, 
  BarLoader, 
  CircleLoader, 
  ClimbingBoxLoader,
  HashLoader,
  PulseLoader,
  RingLoader,
  ScaleLoader,
} from 'react-spinners';
import { LoaderContainer, LoadingText } from './SpinnerLoader.styles';
import { SpinnerLoaderProps } from './SpinnerLoader.types';

export function SpinnerLoader({
  type = 'clip',
  color = '#2196f3', // Consider using theme variables
  size = 60,
  text,
  className,
}: SpinnerLoaderProps) {
  const renderSpinner = () => {
    switch (type) {
      case 'beat':
        return <BeatLoader color={color} size={size / 4} />;
      case 'bar':
        return <BarLoader color={color} width={size * 2} height={size / 6} />;
      case 'circle':
        return <CircleLoader color={color} size={size} />;
      case 'climbing-box':
        return <ClimbingBoxLoader color={color} size={size / 2} />;
      case 'hash':
        return <HashLoader color={color} size={size} />;
      case 'pulse':
        return <PulseLoader color={color} size={size / 4} />;
      case 'ring':
        return <RingLoader color={color} size={size} />;
      case 'scale':
        return <ScaleLoader color={color} height={size} width={size / 6} />;
      case 'clip':
      default:
        return <ClipLoader color={color} size={size} />;
    }
  };

  return (
    <LoaderContainer className={className} data-testid="spinner-loader" data-loading={true}>
      <div data-testid="spinner-container">
        {renderSpinner()}
      </div>
      {text && <LoadingText data-testid="loading-text">{text}</LoadingText>}
    </LoaderContainer>
  );
} 