import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoMenuSharp, IoCloseSharp } from 'react-icons/io5';
import * as S from './Navbar.styles';

// Define the navigation items
const navItems = [
  { name: 'Home', path: '/' },
  { name: 'AI Development Framework', path: '/enterprise-ai-development-framework' },
  { name: 'AI Integration Flow', path: '/ai-integration-flow-diagram' },
  { name: 'Best Practices', path: '/fullstack-react-best-practices-integration' },
  { name: 'Code Examples', path: '/code-examples' },
];

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const pathname = usePathname();
  
  // Check if the path is active
  const isActive = (path: string) => {
    if (path === '/' && pathname !== '/') {
      return false;
    }
    return pathname?.startsWith(path);
  };

  // Handle scrolling effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const isScrolled = scrollPosition > 20;

  return (
    <S.NavbarContainer $isScrolled={isScrolled}>
      <S.NavInner>
        <Link href="/" passHref>
          <S.Logo>DM</S.Logo>
        </Link>

        <S.MenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <IoCloseSharp size={24} /> : <IoMenuSharp size={24} />}
        </S.MenuButton>

        <S.NavLinks $isOpen={isMenuOpen}>
          {navItems.map((item) => (
            <S.NavItem key={item.path} $isActive={isActive(item.path) || false}>
              <Link href={item.path} passHref>
                <S.NavLink>{item.name}</S.NavLink>
              </Link>
            </S.NavItem>
          ))}
        </S.NavLinks>
      </S.NavInner>
    </S.NavbarContainer>
  );
}; 