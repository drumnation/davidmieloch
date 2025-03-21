import React from 'react';
import { FiSearch } from 'react-icons/fi';
import { SearchInputProps } from './SearchInput.types';
import { SearchContainer, Input, IconWrapper } from './SearchInput.styles';
import { useSearchInput } from './SearchInput.hook';

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Search repositories...',
  disabled = false,
  autoFocus = false,
  'aria-label': ariaLabel = 'Search repositories',
}) => {
  const { inputValue, handleChange } = useSearchInput(value, onChange);

  return (
    <SearchContainer>
      <IconWrapper>
        <FiSearch size={16} />
      </IconWrapper>
      <Input
        type="text"
        value={inputValue}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        autoFocus={autoFocus}
        aria-label={ariaLabel}
      />
    </SearchContainer>
  );
}; 