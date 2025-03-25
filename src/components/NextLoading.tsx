'use client';

import React from 'react';
import '../styles/loading-utils.css';

interface NextLoadingProps {
  fullPage?: boolean;
  text?: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export default function NextLoading({
  fullPage = true,
  text,
  size = 'medium',
  className = '',
}: NextLoadingProps) {
  // Determine size class
  const sizeClass = `next-loading-${size}`;
  
  // Determine container class
  const containerClass = fullPage ? 'next-loading-fullpage' : 'next-loading-container';
  
  return (
    <div className={`${containerClass} ${className}`}>
      <div className={`next-loading-spinner ${sizeClass}`}></div>
      {text && <div className="next-loading-text">{text}</div>}
    </div>
  );
} 