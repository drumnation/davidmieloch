import styled from 'styled-components';

// Theme colors for consistency
export const theme = {
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

export const SectionContainer = styled.section`
  padding: 4rem 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  
  p {
    font-size: 1.125rem;
    line-height: 1.7;
    color: ${theme.text.secondary};
    margin-bottom: 1.5rem;
  }
  
  strong {
    color: ${theme.text.primary};
    font-weight: 600;
  }
  
  @media (min-width: 768px) {
    padding: 5rem 2rem;
  }
`;

export const SectionContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`; 