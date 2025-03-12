import React from 'react';
import * as TablerIcons from '@tabler/icons-react';
import * as LucideIcons from 'lucide-react';
import * as PhosphorIcons from 'phosphor-react';
import { IconProps } from './Icon.types';
import { IconWrapper } from './Icon.styles';

const getIconComponent = (name: string, source: IconProps['source'] = 'tabler') => {
  const iconName = name
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

  switch (source) {
    case 'lucide':
      return (LucideIcons as any)[iconName];
    case 'phosphor':
      return (PhosphorIcons as any)[iconName];
    case 'tabler':
    default:
      return (TablerIcons as any)[`Icon${iconName}`];
  }
};

export const Icon: React.FC<IconProps> = ({
  name,
  source = 'tabler',
  size = 24,
  color,
  className,
  ...props
}) => {
  const IconComponent = getIconComponent(name, source);

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in ${source} icon set`);
    return null;
  }

  return (
    <IconWrapper className={className}>
      <IconComponent size={size} color={color} {...props} />
    </IconWrapper>
  );
}; 