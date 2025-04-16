import styled from 'styled-components';

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
 * Container for the section heading
 */
export const HeadingContainer = styled.div`
  margin: 2.5rem 0 2rem;
  text-align: left;
  
  .section-heading {
    font-size: 2.25rem;
    font-weight: 700;
    color: ${theme.text.primary};
    letter-spacing: -0.01em;
    display: flex;
    align-items: center;
    
    &::after {
      content: '';
      display: block;
      height: 2px;
      width: 60px;
      background: ${theme.accent.gradient};
      margin-left: 1.25rem;
    }
  }
  
  .section-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3.25rem;
    height: 3.25rem;
    margin-right: 1.25rem;
    font-size: 1.75rem;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
  
  @media (max-width: 767px) {
    margin: 2rem 0 1.5rem;
    
    .section-heading {
      font-size: 1.75rem;
      
      &::after {
        width: 40px;
      }
    }
    
    .section-icon {
      width: 2.5rem;
      height: 2.5rem;
      margin-right: 0.75rem;
      font-size: 1.5rem;
    }
  }
`;

/**
 * Icon container - keep for backward compatibility
 */
export const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.25rem;
  height: 3.25rem;
  margin-right: 1.25rem;
  color: ${theme.accent.primary};
  font-size: 1.75rem;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  
  @media (max-width: 767px) {
    width: 2.5rem;
    height: 2.5rem;
    margin-right: 0.75rem;
    font-size: 1.5rem;
  }
`;

/**
 * Title text - keep for backward compatibility
 */
export const Title = styled.h2`
  font-size: 2.25rem;
  font-weight: 700;
  color: ${theme.text.primary};
  margin: 0;
  letter-spacing: -0.01em;
  
  @media (max-width: 767px) {
    font-size: 1.75rem;
  }
`; 