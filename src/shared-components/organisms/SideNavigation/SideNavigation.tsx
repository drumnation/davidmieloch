import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SideNavigationProps, SideNavigationItem } from './SideNavigation.types';
import * as S from './SideNavigation.styles';

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const NavigationItemComponent: React.FC<{
  item: SideNavigationItem;
  isActive: boolean;
  style: NonNullable<SideNavigationProps['style']>;
  isSubItem?: boolean;
  onClick: (id: string) => void;
}> = ({ item, isActive, style, isSubItem = false, onClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = useCallback(() => {
    if (item.subsections?.length) {
      setIsExpanded((prev) => !prev);
    } else {
      onClick(item.id);
    }
  }, [item, onClick]);

  return (
    <S.MenuItem
      $isActive={isActive}
      $hasSubsections={!!item.subsections?.length}
      $isSubItem={isSubItem}
      $style={style}
    >
      <S.MenuItemButton
        onClick={handleClick}
        $isActive={isActive}
        $hasSubsections={!!item.subsections?.length}
        $style={style}
        $isSubItem={isSubItem}
      >
        {item.icon && <span className="icon">{item.icon}</span>}
        {item.title}
        {item.subsections?.length && (
          <S.SubsectionIndicator
            $style={style}
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            ▾
          </S.SubsectionIndicator>
        )}
      </S.MenuItemButton>

      <AnimatePresence>
        {isExpanded && item.subsections && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: 'hidden' }}
          >
            <S.SubMenuList>
              {item.subsections.map((subsection) => (
                <NavigationItemComponent
                  key={subsection.id}
                  item={subsection}
                  isActive={isActive}
                  style={style}
                  isSubItem
                  onClick={onClick}
                />
              ))}
            </S.SubMenuList>
          </motion.div>
        )}
      </AnimatePresence>
    </S.MenuItem>
  );
};

export const SideNavigation: React.FC<SideNavigationProps> = ({
  items,
  activeId,
  style = 'light',
  onItemClick,
  className,
}) => {
  const [currentActiveId, setCurrentActiveId] = useState(activeId);

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // Find all section elements
      const sections = items.map(item => document.getElementById(item.id)).filter(Boolean);
      
      // Find the current section based on scroll position
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const sectionTop = section.offsetTop;
          if (scrollPosition >= sectionTop - 100) { // 100px offset for better UX
            setCurrentActiveId(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [items]);

  const handleClick = useCallback(
    (id: string) => {
      scrollToSection(id);
      setCurrentActiveId(id);
      onItemClick?.(id);
    },
    [onItemClick]
  );

  return (
    <S.StyledSideNavigation $style={style} className={className}>
      <S.MobileHandle $style={style} />
      <S.MenuList>
        {items.map((item) => (
          <NavigationItemComponent
            key={item.id}
            item={item}
            isActive={currentActiveId === item.id}
            style={style}
            onClick={handleClick}
          />
        ))}
      </S.MenuList>
    </S.StyledSideNavigation>
  );
};

export default SideNavigation; 