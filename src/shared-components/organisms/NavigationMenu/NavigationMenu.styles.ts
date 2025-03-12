import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { StyledNavigationMenuProps, StyledNavigationItemProps } from './NavigationMenu.types';

export const StyledNavigationMenu = styled.nav<StyledNavigationMenuProps>`
  position: sticky;
  top: 2rem;
  width: 280px;
  max-height: calc(100vh - 4rem);
  overflow-y: auto;
  padding: 1.5rem;
  border-radius: 12px;
  background: ${({ $style }) =>
    $style === 'dark' ? '#1A1B1E' : 'var(--bg-light)'};
  box-shadow: ${({ $style }) =>
    $style === 'dark'
      ? '0 4px 20px rgba(0, 0, 0, 0.4)'
      : '0 4px 20px rgba(0, 0, 0, 0.1)'};
  
  ${({ $position }) =>
    $position === 'left'
      ? css`
          margin-right: 2rem;
        `
      : css`
          margin-left: 2rem;
        `}

  /* Hide scrollbar but keep functionality */
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 1024px) {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    top: auto;
    width: 100%;
    max-height: 60vh;
    margin: 0;
    border-radius: 12px 12px 0 0;
    z-index: 1000;
    transform: translateY(calc(100% - 50px));
    transition: transform 0.3s ease;

    &:focus-within,
    &:hover {
      transform: translateY(0);
    }
  }
`;

export const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const SubMenuList = styled(MenuList)`
  padding-top: 0.5rem;
  padding-left: 1.5rem;
`;

export const MenuItem = styled(motion.li)<StyledNavigationItemProps>`
  position: relative;
`;

export const MenuItemButton = styled.button<StyledNavigationItemProps>`
  position: relative;
  width: 100%;
  text-align: left;
  padding: 0.75rem 1rem;
  border: none;
  background: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: ${({ $style, $isActive }) =>
    $style === 'dark'
      ? $isActive
        ? '#FFFFFF'
        : 'rgba(255, 255, 255, 0.85)'
      : $isActive
      ? 'var(--text-primary)'
      : 'var(--text-secondary)'};
  font-weight: ${({ $isActive }) => ($isActive ? '500' : '400')};
  transition: all 0.2s ease;
  background: ${({ $style, $isActive }) =>
    $isActive
      ? $style === 'dark'
        ? 'rgba(255, 255, 255, 0.1)'
        : 'rgba(0, 0, 0, 0.08)'
      : 'transparent'};

  &:hover {
    background: ${({ $style }) =>
      $style === 'dark'
        ? 'rgba(255, 255, 255, 0.08)'
        : 'rgba(0, 0, 0, 0.05)'};
  }
`;

export const SubsectionIndicator = styled(motion.span)<Pick<StyledNavigationItemProps, '$style'>>`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-45%);
  color: ${({ $style }) =>
    $style === 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.4)'};
  font-size: 1rem;
  pointer-events: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  line-height: 1;
`;

export const MobileHandle = styled.div<Pick<StyledNavigationItemProps, '$style'>>`
  display: none;
  
  @media (max-width: 1024px) {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 4px;
    width: 40px;
    background: ${({ $style }) =>
      $style === 'dark'
        ? 'rgba(255, 255, 255, 0.3)'
        : 'rgba(0, 0, 0, 0.1)'};
    border-radius: 2px;
    margin: 0.5rem auto;
  }
`; 