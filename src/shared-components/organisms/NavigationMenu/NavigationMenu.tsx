import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavigationMenuProps, NavigationItem } from './NavigationMenu.types';
import { Body } from '../../atoms/Typography/Typography';
import * as S from './NavigationMenu.styles';

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const NavigationItemComponent: React.FC<{
  item: NavigationItem;
  isActive: boolean;
  style: NonNullable<NavigationMenuProps['style']>;
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
        <Body
          color={style === 'dark' ? 'light' : 'primary'}
          weight={isActive ? 'medium' : 'regular'}
        >
          {item.title}
        </Body>
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

export const NavigationMenu: React.FC<NavigationMenuProps> = ({
  items,
  activeId,
  style = 'light',
  position = 'left',
  className,
  onItemClick,
}) => {
  const handleClick = useCallback(
    (id: string) => {
      scrollToSection(id);
      onItemClick?.(id);
    },
    [onItemClick]
  );

  return (
    <S.StyledNavigationMenu $style={style} $position={position} className={className}>
      <S.MobileHandle $style={style} />
      <S.MenuList>
        {items.map((item) => (
          <NavigationItemComponent
            key={item.id}
            item={item}
            isActive={activeId === item.id}
            style={style}
            onClick={handleClick}
          />
        ))}
      </S.MenuList>
    </S.StyledNavigationMenu>
  );
}; 