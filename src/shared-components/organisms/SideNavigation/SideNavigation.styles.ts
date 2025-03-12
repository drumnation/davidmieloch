import styled from 'styled-components';
import { motion } from 'framer-motion';
import { StyledNavigationItemProps, StyledSideNavigationProps } from './SideNavigation.types';

export const StyledSideNavigation = styled.nav<StyledSideNavigationProps>`
  width: 280px;
  padding: 1.5rem 0;
  position: sticky;
  top: 80px;
  max-height: calc(100vh - 80px);
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: ${({ theme, $style }) => 
    $style === 'dark' 
      ? `${theme.colors.primary.main} ${theme.colors.background.dark}`
      : `${theme.colors.primary.main} ${theme.colors.background.light}`
  };

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme, $style }) => 
      $style === 'dark' ? theme.colors.background.dark : theme.colors.background.light
    };
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme, $style }) => 
      $style === 'dark' ? theme.colors.primary.dark : theme.colors.primary.light
    };
    border-radius: 6px;
  }

  @media (max-width: 768px) {
    position: relative;
    top: 0;
    width: 100%;
    max-height: none;
    margin-bottom: 2rem;
  }
`;

export const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const SubMenuList = styled.ul`
  list-style: none;
  padding: 0 0 0 1.5rem;
  margin: 0.5rem 0 0 0;
`;

export const MenuItem = styled.li<StyledNavigationItemProps>`
  margin-bottom: ${({ $isSubItem }) => ($isSubItem ? '0.5rem' : '0.75rem')};
  position: relative;
`;

export const MenuItemButton = styled.button<StyledNavigationItemProps>`
  display: flex;
  align-items: center;
  width: 100%;
  text-align: left;
  padding: ${({ $isSubItem }) => ($isSubItem ? '0.5rem 1rem' : '0.75rem 1rem')};
  border: none;
  background-color: ${({ $isActive, $style }) => 
    $isActive 
      ? $style === 'dark' 
        ? 'rgba(33, 150, 243, 0.15)' 
        : 'rgba(33, 150, 243, 0.08)'
      : 'transparent'
  };
  color: ${({ theme, $isActive, $style }) => 
    $isActive 
      ? $style === 'dark' 
        ? theme.colors.primary.light 
        : theme.colors.primary.dark
      : $style === 'dark' 
        ? theme.colors.text.light 
        : theme.colors.text.primary
  };
  font-weight: ${({ $isActive }) => ($isActive ? '500' : '400')};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    background-color: ${({ $style }) => 
      $style === 'dark' 
        ? 'rgba(33, 150, 243, 0.1)' 
        : 'rgba(33, 150, 243, 0.05)'
    };
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme, $style }) => 
      $style === 'dark' ? theme.colors.primary.main : theme.colors.primary.light
    };
  }

  ${({ $isActive, theme, $style }) => 
    $isActive && `
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 4px;
        background: ${
          $style === 'dark' 
            ? `linear-gradient(to bottom, ${theme.colors.primary.main}, ${theme.colors.secondary.main})`
            : `linear-gradient(to bottom, ${theme.colors.primary.dark}, ${theme.colors.secondary.dark})`
        };
        border-radius: 0 2px 2px 0;
      }
    `
  }

  .icon {
    margin-right: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme, $isActive, $style }) => 
      $isActive 
        ? $style === 'dark' 
          ? theme.colors.primary.light 
          : theme.colors.primary.dark
        : $style === 'dark' 
          ? theme.colors.text.light 
          : theme.colors.text.secondary
    };
  }
`;

export const SubsectionIndicator = styled(motion.span)<{ $style: 'light' | 'dark' }>`
  margin-left: auto;
  font-size: 0.75rem;
  color: ${({ theme, $style }) => 
    $style === 'dark' ? theme.colors.text.light : theme.colors.text.secondary
  };
`;

export const ProgressIndicator = styled.div<{ $progress: number }>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: ${({ $progress }) => `${$progress}%`};
  background: linear-gradient(to right, 
    rgba(33, 150, 243, 0.1), 
    rgba(0, 188, 212, 0.1)
  );
  z-index: -1;
  transition: width 0.3s ease;
`;

export const MobileHandle = styled.div<{ $style: 'light' | 'dark' }>`
  display: none;
  width: 40px;
  height: 5px;
  background-color: ${({ $style }) => 
    $style === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'
  };
  border-radius: 3px;
  margin: 0 auto 1rem;

  @media (max-width: 768px) {
    display: block;
  }
`; 