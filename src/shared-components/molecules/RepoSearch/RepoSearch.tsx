import React, { useRef, useEffect } from 'react';
import { RepoSearchProps } from './RepoSearch.types';
import {
  SearchContainer,
  SearchInput,
  SearchIcon,
  ClearButton,
  Loader
} from './RepoSearch.styles';

export const RepoSearch: React.FC<RepoSearchProps> = ({
  searchTerm,
  onSearchChange,
  isLoading = false,
  className,
  placeholder = 'Search repositories...'
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };
  
  const handleClear = () => {
    onSearchChange('');
    // Focus the input after clearing
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  // Auto-focus on component mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  return (
    <SearchContainer className={className}>
      <SearchInput
        ref={inputRef}
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder={placeholder}
        aria-label="Search repositories"
      />
      
      {isLoading ? (
        <Loader aria-hidden="true" />
      ) : searchTerm ? (
        <ClearButton 
          onClick={handleClear}
          aria-label="Clear search"
          type="button"
        >
          ✕
        </ClearButton>
      ) : (
        <SearchIcon aria-hidden="true">
          <span role="img" aria-label="Search">🔍</span>
        </SearchIcon>
      )}
    </SearchContainer>
  );
}; 