'use client';

import React from 'react';
import Link from 'next/link';
import { StyledCTALink, IconWrapper } from './CTALink.styles';
import { CTALinkProps } from '../../Home.types';

/**
 * Call to Action Link Component
 * Used for action buttons throughout the home page
 */
export const CTALink: React.FC<CTALinkProps> = ({ 
  href, 
  text,
  label,
  variant = 'primary',
  iconType,
  size = 'md'
}) => {
  const displayText = label || text || '';
  
  // Simple icon mapping - in a real project, you would use a more sophisticated icon system
  const getIcon = () => {
    if (!iconType) return null;
    
    switch (iconType) {
      case 'file-text':
        return '📄';
      case 'arrow-right':
        return '→';
      case 'external-link':
        return '↗';
      case 'github':
        return '🔗';
      case 'mail':
        return '✉️';
      case 'list':
        return '📋';
      case 'user':
        return '👤';
      case 'code':
        return '💻';
      default:
        return iconType; // Assume it's an emoji if not matched
    }
  };
  
  return (
    <Link href={href} passHref>
      <StyledCTALink variant={variant} size={size}>
        {iconType && (
          <IconWrapper>
            {getIcon()}
          </IconWrapper>
        )}
        {displayText}
      </StyledCTALink>
    </Link>
  );
};

export default CTALink; 