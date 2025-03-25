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
import styled from 'styled-components';

export type SpinnerType = 
  | 'clip' 
  | 'beat' 
  | 'bar' 
  | 'circle' 
  | 'climbing-box'
  | 'hash'
  | 'pulse'
  | 'ring'
  | 'scale';

export interface SpinnerLoaderProps {
  /**
   * The type of spinner to display
   * @default 'clip'
   */
  type?: SpinnerType;
  
  /**
   * The color of the spinner
   * @default '#2196f3'
   */
  color?: string;
  
  /**
   * The size of the spinner in pixels
   * @default 60
   */
  size?: number;
  
  /**
   * Whether to display the spinner as a full-page overlay
   * @default false
   */
  fullPage?: boolean;
  
  /**
   * Text to display below the spinner
   */
  text?: string;
  
  /**
   * Additional class name
   */
  className?: string;
}

const LoaderContainer = styled.div<{ $fullPage?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  ${props => props.$fullPage && `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(255, 255, 255, 0.95);
    z-index: 9999;
  `}

  /* For non-fullPage loaders inside content, center them properly */
  ${props => !props.$fullPage && `
    width: 100%;
    min-height: 150px;
    padding: 2rem;
  `}
`;

const LoadingText = styled.div`
  margin-top: 1.5rem;
  font-size: 1.1rem;
  color: #555;
  text-align: center;
  font-weight: 500;
`;

export function SpinnerLoader({
  type = 'clip',
  color = '#2196f3',
  size = 60,
  fullPage = false,
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
    <LoaderContainer $fullPage={fullPage} className={className}>
      {renderSpinner()}
      {text && <LoadingText>{text}</LoadingText>}
    </LoaderContainer>
  );
} 