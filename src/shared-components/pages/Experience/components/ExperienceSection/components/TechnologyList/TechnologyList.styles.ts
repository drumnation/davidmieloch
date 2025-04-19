import styled from 'styled-components';

// Styles for the container of technology icons
export const TechnologiesList = styled.div`
  display: flex;
  flex-wrap: nowrap; /* Prevent wrapping to multiple lines */
  gap: 0.75rem; /* Adjusted gap slightly */
  padding: 8px 16px 12px 8px; /* Added more padding-right */
  margin: 0 0 12px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  overflow-x: auto; /* Enable horizontal scrolling */
  -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */

  /* Hide scrollbar for a cleaner look, scrolling still works */
  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
`;

// Style for the optional header above the list on mobile
export const TechListHeader = styled.div`
  font-size: 0.8rem;
  color: #666;
  margin: 0 0 6px -6px;
  font-weight: 500;
`;

export const TechnologyItem = styled.div`
  background-color: #f3f2ef;
  border-radius: 4px;
  padding: 4px 8px;
  display: flex;
  align-items: center;
  
  &:hover {
    background-color: #e6e5e4;
  }
`; 