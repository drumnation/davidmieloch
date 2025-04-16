'use client';

import React from 'react';
import Link from 'next/link';
import { StyledCTALink } from './CTALink.styles';
import { CTALinkProps } from '../../Home.types';

/**
 * Call to Action Link Component
 * Used for action buttons throughout the home page
 */
export const CTALink: React.FC<CTALinkProps> = ({ 
  href, 
  text, 
  variant 
}) => {
  return (
    <Link href={href} passHref>
      <StyledCTALink variant={variant}>
        {text}
      </StyledCTALink>
    </Link>
  );
};

export default CTALink; 