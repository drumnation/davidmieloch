import styled, { css } from 'styled-components';
import { CTALinkProps } from '../../Home.types';

// Theme colors for consistency
const theme = {
  background: {
    primary: '#0a0c1e',
    card: '#1b1d3a',
    cardHover: '#21254a'
  },
  text: {
    primary: '#ffffff',
    secondary: '#c8d2f0',
    muted: '#94a3b8'
  },
  accent: {
    primary: '#4361ee',
    secondary: '#7209b7',
    gradient: 'linear-gradient(90deg, #4361ee, #7209b7)'
  }
};

/**
 * Main container for the CTA link
 */
export const LinkContainer = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: ${theme.accent.gradient};
  color: ${theme.text.primary};
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(67, 97, 238, 0.3);
  width: 280px;
  height: 48px;
  box-sizing: border-box;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  justify-content: flex-start;
  
  @media (max-width: 767px) {
    width: 100%;
    max-width: 280px;
    justify-content: flex-start;
  }
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(67, 97, 238, 0.4);
    filter: brightness(1.1);
  }
  
  &:active {
    transform: translateY(-2px);
    filter: brightness(0.95);
  }
`;

/**
 * Container for the icon
 */
export const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.75rem;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.15);
`;

export const StyledCTALink = styled.span<Pick<CTALinkProps, 'variant' | 'size'>>`
  display: inline-flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  margin: 0.5rem;
  border-radius: 10px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  
  ${props => props.variant === 'primary' && css`
    background: ${theme.accent.gradient};
    color: ${theme.text.primary};
    border: none;
    box-shadow: 0 4px 14px rgba(67, 97, 238, 0.25);
    
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 20px rgba(67, 97, 238, 0.4);
      filter: brightness(1.1);
    }
    
    &:active {
      transform: translateY(-2px);
      filter: brightness(0.95);
      box-shadow: 0 6px 16px rgba(67, 97, 238, 0.3);
    }
  `}
  
  ${props => props.variant === 'secondary' && css`
    background: rgba(67, 97, 238, 0.1);
    color: ${theme.text.primary};
    border: 1px solid rgba(67, 97, 238, 0.5);
    
    &:hover {
      background: rgba(67, 97, 238, 0.2);
      transform: translateY(-4px);
      box-shadow: 0 8px 20px rgba(67, 97, 238, 0.15);
      border-color: rgba(67, 97, 238, 0.8);
    }
    
    &:active {
      transform: translateY(-2px);
      background: rgba(67, 97, 238, 0.25);
    }
  `}
  
  ${props => props.variant === 'text' && css`
    background: transparent;
    color: ${theme.accent.primary};
    border: none;
    padding: 0.5rem;
    margin: 0;
    position: relative;
    overflow: hidden;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background: ${theme.accent.gradient};
      transition: width 0.3s ease;
    }
    
    &:hover {
      color: ${theme.accent.secondary};
      
      &::after {
        width: 100%;
      }
    }
  `}
  
  ${props => props.size === 'sm' && css`
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    border-radius: 8px;
  `}
  
  ${props => props.size === 'md' && css`
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    border-radius: 10px;
  `}
  
  ${props => props.size === 'lg' && css`
    padding: 1rem 2rem;
    font-size: 1.125rem;
    border-radius: 12px;
  `}
`; 