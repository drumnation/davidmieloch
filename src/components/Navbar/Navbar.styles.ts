import styled from 'styled-components';

export const NavbarContainer = styled.nav<{ $isScrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: ${({ $isScrolled, theme }) => 
    $isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent'};
  backdrop-filter: ${({ $isScrolled }) => 
    $isScrolled ? 'blur(8px)' : 'none'};
  box-shadow: ${({ $isScrolled }) => 
    $isScrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none'};
  transition: all 0.3s ease;
  padding: ${({ $isScrolled }) => 
    $isScrolled ? '0.5rem 0' : '1rem 0'};
`;

export const NavInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

export const Logo = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
  cursor: pointer;
  transition: color 0.2s;
  
  &:hover {
    color: #4361ee;
  }
`;

export const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
  padding: 0.5rem;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

export const NavLinks = styled.ul<{ $isOpen: boolean }>`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  
  @media (max-width: 768px) {
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    background: white;
    flex-direction: column;
    height: ${({ $isOpen }) => ($isOpen ? 'auto' : '0')};
    overflow: hidden;
    transition: height 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: ${({ $isOpen }) => ($isOpen ? '1rem 0' : '0')};
    opacity: ${({ $isOpen }) => ($isOpen ? '1' : '0')};
    visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  }
`;

export const NavItem = styled.li<{ $isActive: boolean }>`
  margin: 0 0.5rem;
  
  @media (max-width: 768px) {
    margin: 0;
    width: 100%;
    text-align: center;
  }
  
  a {
    display: block;
    padding: 0.5rem 1rem;
    color: ${({ $isActive }) => $isActive ? '#4361ee' : '#333'};
    font-weight: ${({ $isActive }) => $isActive ? '600' : '400'};
    text-decoration: none;
    transition: all 0.2s;
    position: relative;
    
    &:hover {
      color: #4361ee;
    }
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: ${({ $isActive }) => $isActive ? '50%' : '0'};
      height: 2px;
      background-color: #4361ee;
      transition: width 0.3s;
    }
    
    &:hover::after {
      width: 50%;
    }
    
    @media (max-width: 768px) {
      padding: 1rem;
      
      &::after {
        display: none;
      }
    }
  }
`;

export const NavLink = styled.span`
  display: block;
`; 