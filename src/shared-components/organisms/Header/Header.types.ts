import { MantineTheme } from '@mantine/core';

export type NavLink = {
  label: string;
  href: string;
  icon?: React.ComponentType<any>;
};

export type SocialLink = {
  name: string;
  icon: React.ComponentType<any>;
  url: string;
};

export interface HeaderHookReturn {
  opened: boolean;
  toggle: () => void;
  close: () => void;
  theme: MantineTheme;
  isDark: boolean;
  pathname: string;
  logoHovered: boolean;
  setLogoHovered: React.Dispatch<React.SetStateAction<boolean>>;
  socialHovered: string | null;
  setSocialHovered: React.Dispatch<React.SetStateAction<string | null>>;
  experienceHovered: boolean;
  setExperienceHovered: React.Dispatch<React.SetStateAction<boolean>>;
  mobileHovered: string | null;
  setMobileHovered: React.Dispatch<React.SetStateAction<string | null>>;
  hoveredLink: string | null;
  setHoveredLink: React.Dispatch<React.SetStateAction<string | null>>;
  handleNavigation: (href: string) => void;
  isActive: (href: string) => boolean;
  handleLinkHover: (label: string) => void;
  handleLinkLeave: () => void;
  isNavigating: boolean;
}

export interface RenderNavItemsProps {
  theme: any; // Consider replacing with proper MantineTheme type
  isDark: boolean;
  handleNavigation: (href: string) => void;
  isNavigating: boolean;
}

export interface RenderSocialIconsProps {
  theme: any; // Consider replacing with proper MantineTheme type
  isDark: boolean;
}

export type StyledHeaderProps = {
  isDark: boolean;
  theme: MantineTheme;
  children?: React.ReactNode;
};

export type StyledLogoButtonProps = {
  logoHovered: boolean;
  isDark: boolean;
  theme: MantineTheme;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: (e: React.MouseEvent) => void;
  children?: React.ReactNode;
};

export type StyledNavProps = {
  navItems: React.ReactNode;
  opened: boolean;
  toggle: () => void;
  isDark: boolean;
  theme: MantineTheme;
  handleNavigation: (href: string) => void;
};

export type StyledMobileDrawerProps = {
  opened: boolean;
  onClose: () => void;
  isDark: boolean;
  theme: MantineTheme;
  handleNavigation: (href: string) => void;
}; 