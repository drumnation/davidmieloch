import { SVGProps } from 'react';

export type LabelPosition = 'bottom' | 'right' | 'left' | 'top';

export interface ProjectLogoProps {
  /**
   * The name or title of the project
   */
  name: string;
  
  /**
   * Path to the project's logo image
   * If not provided, a fallback with initials will be displayed
   */
  logoPath?: string;
  
  /**
   * Size of the logo in pixels
   * @default 48
   */
  size?: number;
  
  /**
   * Background color for the fallback logo
   * If not provided, a color will be generated based on the project name
   */
  bgColor?: string;
  
  /**
   * Text color for the fallback logo
   * @default '#ffffff'
   */
  textColor?: string;
  
  /**
   * Whether to show the project name as a label
   * @default false
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
   * Function called when the logo is clicked
   */
  onClick?: () => void;
  
  /**
   * Whether to show a tooltip with the project name on hover
   * @default true
   */
  showTooltip?: boolean;
  
  /**
   * Number of initials to show in the fallback logo (1 or 2)
   * @default 2
   */
  initialsCount?: 1 | 2;
} 