'use client';

import React from 'react';
import '../styles/loading-utils.css';
import styled from 'styled-components';

interface NextLoadingProps {
  fullPage?: boolean;
  text?: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const LoadingContainer = styled.div<{ $fullPage?: boolean }>`
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

  ${props => !props.$fullPage && `
    width: 100%;
    min-height: 150px;
    padding: 2rem;
  `}
`;

export default function NextLoading({
  fullPage = true,
  text,
  size = 'medium',
  className = '',
}: NextLoadingProps) {
  // Determine size class
  const sizeClass = `next-loading-${size}`;
  
  return (
    <LoadingContainer $fullPage={fullPage} className={className}>
      <div className={`next-loading-spinner ${sizeClass}`}></div>
      {text && <div className="next-loading-text">{text}</div>}
    </LoadingContainer>
  );
} 