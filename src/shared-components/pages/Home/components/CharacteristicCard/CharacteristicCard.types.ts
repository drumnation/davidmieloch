/**
 * Props for the CharacteristicCard component
 */
export interface CharacteristicCardProps {
  /**
   * Type of icon to display
   */
  iconType: string;
  
  /**
   * Title of the characteristic
   */
  title: string;
  
  /**
   * Description of the characteristic
   */
  description: string;
  
  /**
   * Additional props to pass to the component
   */
  [x: string]: any;
} 