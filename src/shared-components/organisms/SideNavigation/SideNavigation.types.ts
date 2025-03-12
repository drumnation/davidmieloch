export interface SideNavigationItem {
  id: string;
  title: string;
  icon?: React.ReactNode;
  subsections?: SideNavigationItem[];
}

export interface SideNavigationProps {
  items: SideNavigationItem[];
  activeId?: string;
  style?: 'light' | 'dark';
  onItemClick?: (id: string) => void;
  className?: string;
}

export interface StyledSideNavigationProps {
  $style: NonNullable<SideNavigationProps['style']>;
}

export interface StyledNavigationItemProps {
  $isActive: boolean;
  $hasSubsections: boolean;
  $isSubItem?: boolean;
  $style: NonNullable<SideNavigationProps['style']>;
} 