import React from 'react';
import { BadgeProps } from './Badge.types';
import { StyledBadge } from './Badge.styles';

const formatCount = (count: number): string => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
};

const getIconByVariant = (variant: BadgeProps['variant']) => {
  switch (variant) {
    case 'stars':
      return (
        <svg viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 0.25a0.75 0.75 0 0 0-0.673 0.418l-1.882 3.815-4.21 0.612a0.75 0.75 0 0 0-0.416 1.279l3.046 2.97-0.719 4.192a0.75 0.75 0 0 0 1.088 0.791L8 12.347l3.766 1.98a0.75 0.75 0 0 0 1.088-0.79l-0.72-4.194 3.047-2.969a0.75 0.75 0 0 0-0.416-1.28l-4.21-0.611L8.673 0.668A0.75 0.75 0 0 0 8 0.25z" />
        </svg>
      );
    case 'forks':
      return (
        <svg viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z" />
        </svg>
      );
    case 'issues':
      return (
        <svg viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
          <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z" />
        </svg>
      );
    case 'prs':
      return (
        <svg viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354ZM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm8.25.75a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z" />
        </svg>
      );
    default:
      return null;
  }
};

export const Badge: React.FC<BadgeProps> = ({
  count,
  label,
  variant = 'default',
  size = 'md',
  className,
  ...props
}) => {
  const icon = getIconByVariant(variant);
  const formattedCount = formatCount(count);

  return (
    <StyledBadge
      variant={variant}
      size={size}
      className={className}
      {...props}
    >
      {icon}
      {formattedCount}
      {label && ` ${label}`}
    </StyledBadge>
  );
}; 