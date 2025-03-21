import React from 'react';
import { TagProps } from './Tag.types';
import { StyledTag } from './Tag.styles';

export const Tag: React.FC<TagProps> = ({ 
  label,
  variant = 'default',
  size = 'md',
  onClick,
  className,
  ...props
}) => {
  return (
    <StyledTag
      variant={variant}
      size={size}
      onClick={onClick}
      className={className}
      {...props}
    >
      {label}
    </StyledTag>
  );
}; 