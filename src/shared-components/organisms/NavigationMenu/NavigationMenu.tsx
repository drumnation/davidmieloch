import React, { useState, useCallback } from 'react';
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

  // CSS transition styles for rotation
  const indicatorStyle = {
    transform: `rotate(${isExpanded ? '180deg' : '0deg'})`,
    transition: 'transform 0.2s ease',
    display: 'inline-block'
  };

  // CSS transition styles for subsection expansion
  const subsectionStyle = {
    height: isExpanded ? 'auto' : '0',
    opacity: isExpanded ? 1 : 0,
    overflow: 'hidden',
    transition: 'opacity 0.2s ease, height 0.2s ease'
  };

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
          >
            <span style={indicatorStyle}>▾</span>
          </S.SubsectionIndicator>
        )}
      </S.MenuItemButton>

      {item.subsections && (
        <div style={subsectionStyle}>
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
        </div>
      )}
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