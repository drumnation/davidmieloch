import { MantineTheme } from '@mantine/core';

export type NavLink = {
  label: string;
  href: string;
};

export type SocialLink = {
  name: string;
  icon: React.ComponentType<any>;
  url: string;
};

export type HeaderHookReturn = {
  opened: boolean;
  toggle: () => void;
  close: () => void;
  theme: MantineTheme;
  isDark: boolean;
  pathname: string;
  isLoading: boolean;
  loadingPath: string | null;
  logoHovered: boolean;
  setLogoHovered: (value: boolean) => void;
  socialHovered: string | null;
  setSocialHovered: (value: string | null) => void;
  experienceHovered: boolean;
  setExperienceHovered: (value: boolean) => void;
  mobileHovered: string | null;
  setMobileHovered: (value: string | null) => void;
  hoveredLink: string | null;
  setHoveredLink: (value: string | null) => void;
  handleNavigation: (href: string) => void;
  isActive: (href: string) => boolean;
  handleLinkHover: (label: string) => void;
  handleLinkLeave: () => void;
};

export type RenderNavItemsProps = {
  theme: MantineTheme;
  isDark: boolean;
  handleNavigation: (href: string) => void;
};

export type RenderSocialIconsProps = {
  theme: MantineTheme;
  isDark: boolean;
};

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