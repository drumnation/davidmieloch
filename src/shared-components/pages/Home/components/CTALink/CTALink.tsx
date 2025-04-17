'use client';

import React from 'react';
import Link from 'next/link';
import { StyledCTALink, IconWrapper } from './CTALink.styles';
import { CTALinkProps } from '../../Home.types';

/**
 * Call to Action Link Component
 * Used for action buttons throughout the home page
 */
const iconMap: Record<string, string> = {
  github: '🚀',
  linkedin: '👥',
  twitter: '🐦',
  blog: '📝',
  download: '📄',
  mail: '✉️',
  portfolio: '💼',
  experience: '⏱️',
  projects: '💻',
};

const CTALink: React.FC<CTALinkProps> = ({
  href,
  text,
  label,
  variant = 'primary',
  iconType,
  size = 'md',
  ...rest
}) => {
  const isExternal = href.startsWith('http');
  const icon = iconType ? iconMap[iconType] || '🔗' : null;

  const LinkContent = (
    <StyledCTALink $variant={variant} $size={size} {...rest}>
      {icon && <IconWrapper>{icon}</IconWrapper>}
      {text || label}
    </StyledCTALink>
  );

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
        {LinkContent}
      </a>
    );
  }

  return (
    <Link href={href} aria-label={label}>
      {LinkContent}
    </Link>
  );
};

export default CTALink; 