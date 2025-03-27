import { SVGProps } from 'react';

/**
 * Position options for the label relative to the icon
 */
export type LabelPosition = 'bottom' | 'right' | 'left' | 'top';

export interface TechIconProps {
  /**
   * The name of the technology (e.g., "React", "TypeScript", "Node.js")
   */
  name: string;
  
  /**
   * Size of the icon in pixels
   */
  size?: number;
  
  /**
   * Color of the icon. For some icons with predefined colors, this may be ignored.
   */
  color?: string;
  
  /**
   * Whether to show the name as a label
   */
  showLabel?: boolean;
  
  /**
   * Position of the label relative to the icon
   * @default 'bottom'
   */
  labelPosition?: LabelPosition;
  
  /**
   * Additional CSS class name
   */
  className?: string;
  
  /**
   * Function called when the icon is clicked
   */
  onClick?: () => void;
  
  /**
   * Whether to show a tooltip with the technology name on hover
   * @default true
   */
  showTooltip?: boolean;
} 