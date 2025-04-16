export interface PersonaNavItem {
  title: string;
  icon: string;
  description: string;
  link: string;
}

export interface CharacteristicCardProps {
  icon: string;
  title: string;
  description: string;
}

export interface CTALinkProps {
  /**
   * The URL the link should navigate to
   */
  href: string;
  
  /**
   * The text to display in the link
   * @deprecated Use label instead
   */
  text?: string;
  
  /**
   * The text to display in the link
   */
  label?: string;
  
  /**
   * The visual style of the link
   */
  variant: 'primary' | 'secondary' | 'text';
  
  /**
   * Icon type to display with the link
   */
  iconType?: string;
  
  /**
   * Size of the button
   */
  size?: 'sm' | 'md' | 'lg';
}

export interface MetaData {
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterTitle: string;
  twitterDescription: string;
} 