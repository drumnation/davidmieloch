import React from 'react';
import { FilterItemProps } from './FilterItem.types';
import { FilterContainer, Count } from './FilterItem.styles';

export const FilterItem: React.FC<FilterItemProps> = ({
  label,
  value,
  count,
  isSelected = false,
  onClick,
  variant = 'language',
}) => {
  const handleClick = () => {
    onClick?.(value);
  };

  return (
    <FilterContainer
      type="button"
      onClick={handleClick}
      $isSelected={isSelected}
      variant={variant}
      aria-pressed={isSelected}
    >
      {label}
      {count !== undefined && <Count>({count})</Count>}
    </FilterContainer>
  );
}; 