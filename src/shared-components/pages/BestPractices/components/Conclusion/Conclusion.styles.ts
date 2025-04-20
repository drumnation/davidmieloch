import styled from 'styled-components';

export const ConclusionContainer = styled.div`
  width: 100%;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
  
  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const SectionIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #000000;
  padding: 8px;
  margin-right: 0;
  margin-bottom: 1rem;

  svg, img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const IconWrapper = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ConclusionTitle = styled.h2`
  font-size: 2rem;
  margin: 0;
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

export const ConclusionText = styled.p`
  font-size: 1.125rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`; 