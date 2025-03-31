export interface NavigationCardContent {
  /**
   * The main text to display
   */
  text: string;
  
  /**
   * The action text for the link
   */
  action: string;
  
  /**
   * The URL to navigate to
   */
  link: string;
  
  /**
   * Optional icon name to display
   */
  icon?: string;
}

export interface NavigationCardProps {
  /**
   * The content of the navigation card (legacy approach)
   */
  content?: NavigationCardContent;
  
  /**
   * Title/text of the card (direct prop approach)
   */
  title?: string;
  
  /**
   * Description text (direct prop approach)
   */
  description?: string;
  
  /**
   * The action text for the link (direct prop approach)
   */
  action?: string;
  
  /**
   * The URL to navigate to (direct prop approach)
   */
  link?: string;
  
  /**
   * Optional icon name to display (direct prop approach)
   */
  icon?: string;
  
  /**
   * Visual style of the card
   */
  style?: 'gradient-card' | 'accent-card' | 'default';
  
  /**
   * Animation style
   */
  animation?: 'fade-up' | 'slide-in' | 'none';
  
  /**
   * Optional className for styling
   */
  className?: string;
}

export interface StyledNavigationCardProps {
  $hasIcon: boolean;
  $style: NavigationCardProps['style'];
} 