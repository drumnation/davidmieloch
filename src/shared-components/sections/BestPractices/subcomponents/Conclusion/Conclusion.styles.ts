import styled from 'styled-components';

export const ConclusionContainer = styled.div`
  width: 100%;
  margin-top: 3rem;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
  
  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const ConclusionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const ConclusionText = styled.p`
  font-size: 1.125rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`; 