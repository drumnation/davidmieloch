import React from 'react';
import * as TablerIcons from '@tabler/icons-react';
import * as LucideIcons from 'lucide-react';
import * as PhosphorIcons from 'phosphor-react';
import { IconProps } from './Icon.types';
import { IconWrapper } from './Icon.styles';

// Helper function to convert kebab-case to PascalCase
const kebabToPascal = (str: string) => {
  return str
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
};

// Fallback icon component
const FallbackIcon: React.FC<{ size?: number | string; color?: string }> = ({ size = 24, color = "currentColor" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke={color} 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="16" />
    <line x1="8" y1="12" x2="16" y2="12" />
  </svg>
);

export const Icon: React.FC<IconProps> = ({
  name,
  source = 'tabler',
  size = 24,
  color,
  className,
  ...props
}) => {
  // Convert kebab-case to PascalCase
  const iconName = kebabToPascal(name);
  
  // Create a React element based on the icon source and name
  let IconElement: React.ReactNode = null;
  
  try {
    if (source === 'lucide') {
      // @ts-expect-error - Dynamic import from Lucide icons
      const LucideIcon = LucideIcons[iconName];
      if (LucideIcon) {
        IconElement = <LucideIcon size={size} color={color || "currentColor"} {...props} />;
      }
    } else if (source === 'phosphor') {
      // @ts-expect-error - Dynamic import from Phosphor icons
      const PhosphorIcon = PhosphorIcons[iconName];
      if (PhosphorIcon) {
        IconElement = <PhosphorIcon size={size} color={color || "currentColor"} {...props} />;
      }
    } else {
      // Default to Tabler icons
      // @ts-expect-error - Dynamic import from Tabler icons
      const TablerIcon = TablerIcons[`Icon${iconName}`];
      if (TablerIcon) {
        IconElement = <TablerIcon size={size} color={color || "currentColor"} {...props} />;
      }
    }
  } catch {
    console.warn(`Error loading icon "${name}" from ${source} icon set`);
  }
  
  // If no icon was found, use the fallback
  if (!IconElement) {
    IconElement = <FallbackIcon size={size} color={color || "currentColor"} />;
  }
  
  return (
    <IconWrapper className={className}>
      {IconElement}
    </IconWrapper>
  );
}; 