import styled, { css } from 'styled-components';
import { StyledNavigationMenuProps, StyledNavigationItemProps } from './NavigationMenu.types';

export const StyledNavigationMenu = styled.nav<StyledNavigationMenuProps>`
  position: sticky;
  top: 2rem;
  width: 280px;
  max-height: calc(100vh - 4rem);
  overflow-y: auto;
  padding: 1.5rem;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-right: 2rem;

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

export const MenuItem = styled.li<StyledNavigationItemProps>`
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
  color: ${({ $isActive }) => ($isActive ? '#000' : '#666')};
  font-weight: ${({ $isActive }) => ($isActive ? '500' : '400')};
  transition: all 0.2s ease;
  background: ${({ $isActive }) => ($isActive ? 'rgba(0, 0, 0, 0.08)' : 'transparent')};

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;

export const SubsectionIndicator = styled.span`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-45%);
  color: rgba(0, 0, 0, 0.4);
  font-size: 1rem;
  pointer-events: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  line-height: 1;
`;

export const MobileHandle = styled.div`
  display: none;
  @media (max-width: 1024px) {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 4px;
    width: 40px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    margin: 0.5rem auto;
  }
`; 