export interface NavigationItem {
  id: string;
  title: string;
  icon?: string;
  subsections?: NavigationItem[];
}

export interface NavigationMenuProps {
  items: NavigationItem[];
  activeId?: string;
  style?: 'light' | 'dark';
  position?: 'left' | 'right';
  className?: string;
  onItemClick?: (id: string) => void;
}

export interface StyledNavigationMenuProps {
  $style: NonNullable<NavigationMenuProps['style']>;
  $position: NonNullable<NavigationMenuProps['position']>;
}

export interface StyledNavigationItemProps {
  $isActive: boolean;
  $hasSubsections: boolean;
  $isSubItem?: boolean;
  $style: NonNullable<NavigationMenuProps['style']>;
} 