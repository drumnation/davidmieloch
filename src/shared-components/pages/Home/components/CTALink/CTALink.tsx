import React from 'react';
import Link from 'next/link';
import { CTALinkProps } from './CTALink.types';
import { Icon } from '../Icon';
import { LinkContainer, IconWrapper } from './CTALink.styles';

/**
 * Call to Action Link Component
 * Used for action buttons throughout the home page
 */
export function CTALink({
  href,
  iconType,
  label,
  className,
  children,
  ...props
}: CTALinkProps) {
  return (
    <Link href={href} passHref legacyBehavior>
      <LinkContainer className={className} {...props}>
        <IconWrapper>
          <Icon iconType={iconType} />
        </IconWrapper>
        {label || children}
      </LinkContainer>
    </Link>
  );
} 