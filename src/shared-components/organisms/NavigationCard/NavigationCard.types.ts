export interface NavigationCardProps {
  title: string;
  description: string;
  action: string;
  link: string;
  icon?: string;
  style?: 'gradient-card' | 'accent-card';
  animation?: 'fade-up' | 'slide-in';
  className?: string;
  onClick?: () => void;
}

export interface StyledNavigationCardProps {
  $hasIcon: boolean;
  $style: NavigationCardProps['style'];
} 