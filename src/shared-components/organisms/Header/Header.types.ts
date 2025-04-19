import { MantineTheme } from '@mantine/core';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import type { IconProps, Icon } from '@tabler/icons-react';

export type IconComponent = ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;

export type NavLink = {
  label: string;
  href: string;
  icon?: IconComponent;
};

export type SocialLink = {
  name: string;
  icon: IconComponent;
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
  theme: MantineTheme;
  isDark: boolean;
  handleNavigation: (href: string) => void;
  isActive: (href: string) => boolean;
  hoveredLink: string | null;
  handleLinkHover: (label: string) => void;
  handleLinkLeave: () => void;
  navLinks: NavLink[];
  activePath: string;
  isNavigating: boolean;
}

export interface RenderSocialIconsProps {
  theme: MantineTheme;
  isDark: boolean;
  socialLinks: SocialLink[];
  socialHovered: string | null;
  setSocialHovered: React.Dispatch<React.SetStateAction<string | null>>;
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
  navItems?: React.ReactNode;
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

export interface MobileNavLinkProps {
  icon: IconComponent;
  label: string;
  href: string;
  onClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  isActive: boolean;
} 