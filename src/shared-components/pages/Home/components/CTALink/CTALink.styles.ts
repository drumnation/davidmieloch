import styled from 'styled-components';

/**
 * Main container for the CTA link
 */
export const LinkContainer = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #4361ee;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.2s, transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 8px rgba(67, 97, 238, 0.15);
  width: 280px;
  height: 48px;
  box-sizing: border-box;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  justify-content: flex-start;
  font-weight: 600;
  
  @media (max-width: 767px) {
    width: 100%;
    max-width: 280px;
    justify-content: flex-start;
  }
  
  &:hover {
    background-color: #3a0ca3;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(67, 97, 238, 0.2);
  }
`;

/**
 * Container for the icon
 */
export const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  color: currentColor;
  margin-right: 0.75rem;
  flex-shrink: 0;
  stroke-width: 2px;
  stroke: white;
`; 