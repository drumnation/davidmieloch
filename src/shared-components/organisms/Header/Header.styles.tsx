'use client';

import {
  Group,
  Drawer,
  UnstyledButton,
  rem,
  Container,
  Button,
  ButtonProps,
  Text,
  ActionIcon,
  Burger,
  MantineTheme
} from '@mantine/core';
import {
  StyledHeaderProps,
  StyledLogoButtonProps,
  StyledNavProps,
  StyledMobileDrawerProps
} from './Header.types';
import React from 'react';
import styled from '@emotion/styled';

// Create components that take props and return React elements
export const StyledHeader: React.FC<StyledHeaderProps> = ({ isDark, theme, children }) => {
  return (
    <div
      style={{
        backdropFilter: 'none',
        backgroundColor: isDark ? 'var(--background-dark)' : 'var(--background-light)',
        borderBottom: isDark ? `1px solid ${theme.colors.dark[4]}` : `1px solid ${theme.colors.gray[2]}`,
        width: '100%',
        height: '100%',
        overflow: 'visible',
        transition: 'background-color 200ms ease, border-color 200ms ease',
        color: isDark ? theme.white : theme.colors.dark[9],
      }}
    >
      {children}
    </div>
  );
};

export const StyledContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Container
      size="lg"
      h="100%"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      {children}
    </Container>
  );
};

export const StyledLogoButton = styled(UnstyledButton, {
  shouldForwardProp: (prop) => !['logoHovered', 'isDark', 'theme'].includes(prop.toString())
}) <StyledLogoButtonProps>`
  display: flex;
  align-items: center;
  color: white;
  text-decoration: none;
  gap: ${rem(4)};
  transform: ${({ logoHovered }) => logoHovered ? 'scale(1.03)' : 'scale(1)'};
  transition: transform 200ms ease;
`;

export const StyledNav = styled(Group, {
  shouldForwardProp: (prop) => !['navItems', 'opened', 'toggle', 'isDark', 'theme', 'handleNavigation'].includes(prop.toString())
}) <StyledNavProps>`
  gap: 5px;
  flex: 0 0 auto;
  overflow: hidden;
  flex-wrap: nowrap;
`;

export const StyledMobileDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => !['isDark', 'theme', 'handleNavigation'].includes(prop.toString())
}) <StyledMobileDrawerProps>`
  .mantine-Drawer-header {
    background-color: ${props => props.isDark ? props.theme.colors.dark[7] : props.theme.colors.gray[1]};
    color: ${props => props.isDark ? props.theme.white : props.theme.colors.dark[9]};
    border-bottom: 1px solid ${props => props.isDark ? props.theme.colors.dark[5] : props.theme.colors.gray[2]};
  }
  
  .mantine-Drawer-content {
    background-color: ${props => props.isDark ? props.theme.colors.dark[9] : props.theme.colors.gray[0]};
    color: ${props => props.isDark ? props.theme.white : props.theme.colors.dark[9]};
    box-shadow: ${props => props.theme.shadows.md};
    border-radius: ${props => props.theme.radius.md} 0 0 ${props => props.theme.radius.md};
    display: flex;
    flex-direction: column;
  }

  .mantine-Drawer-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding-top: ${rem(12)};
    padding-bottom: ${rem(16)};
    overflow-y: auto;
  }

  .mantine-Drawer-closeButton {
    width: ${rem(36)};
    height: ${rem(36)};
    border-radius: ${props => props.theme.radius.sm};
    transition: background-color 150ms ease;

    &:hover {
      background-color: ${props => props.isDark ? props.theme.colors.dark[6] : props.theme.colors.gray[1]};
    }
  }
`;

// Fix for Emotion + forwardRef + Mantine Button
const ExperienceButtonBase = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => <Button ref={ref} {...props} />
);
ExperienceButtonBase.displayName = 'ExperienceButton';

export const ExperienceButton = styled(ExperienceButtonBase)`
  white-space: nowrap;
  flex: 0 0 auto;
  font-weight: 600;
  transition: all 200ms ease;
  background: linear-gradient(135deg, #6366F1 0%, #4F46E5 100%);
  color: white;
  border: none;
  padding: ${rem(8)} ${rem(12)};
  height: auto;
  position: relative;
  
  &:hover {
    background: linear-gradient(135deg, #4F46E5 0%, #4338CA 100%);
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  }
`;

export const HeaderLeftRow = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

export const NavGroupWrapper = styled('div')({
  overflow: 'hidden',
  maxWidth: 'calc(100vw - 400px)',
  display: 'flex',
  flexWrap: 'nowrap',
});

export const NavItemsScroll = styled('div')({
  display: 'flex',
  overflow: 'auto',
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
});

export const ExperienceButtonWrapper = styled('div')({
  cursor: 'pointer',
});

export const MobileNavLinkWrapper = styled('div', {
  shouldForwardProp: (prop) => prop !== 'borderColor',
})<{
  borderColor: string;
}>(({ borderColor }) => ({
  textDecoration: 'none',
  borderBottom: borderColor,
}));

export const MobileNavButton = styled(UnstyledButton, {
  shouldForwardProp: (prop) =>
    !['isDark', 'theme', 'hoverColor', 'borderLeftColor'].includes(prop.toString()),
})<{
  isDark: boolean;
  theme: MantineTheme;
  hoverColor: string;
  borderLeftColor: string;
}>(({ isDark, theme, hoverColor, borderLeftColor }) => ({
  width: '100%',
  padding: rem(16),
  borderRadius: theme.radius.sm,
  color: isDark ? 'white' : theme.colors.dark[9],
  backgroundColor: 'transparent',
  transition: 'background-color 200ms ease, border-left-color 200ms ease',
  borderLeft: `3px solid ${borderLeftColor}`,
  position: 'relative',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: hoverColor,
    borderLeftColor: theme.colors[theme.primaryColor][6],
  },
}));

export const MobileNavIconSpan = styled('span')({
  marginRight: rem(16),
  display: 'flex',
  alignItems: 'center',
});

export const MobileNavText = styled(Text)({
  color: 'inherit',
  transition: 'all 200ms ease',
  fontWeight: 600,
});

export const SocialIconGroup = styled(Group)({
  justifyContent: 'center',
  gap: 'md',
  flexGrow: 1,
});

export const MobileActionIcon = styled(ActionIcon)<{ isDark: boolean; theme: MantineTheme }>(({ isDark, theme }) => ({
  transition: 'background-color 150ms ease',
  '&:hover': {
    backgroundColor: isDark ? theme.colors.dark[6] : theme.colors.gray[1],
  },
}));

export const StyledBurger = styled(Burger) <{ open: boolean; theme: MantineTheme }>`
  color: ${({ theme }: { theme: MantineTheme }) => theme.colors.text?.[0] || '#ffffff'};
  z-index: 1001; // Ensure burger is above overlay
`; 