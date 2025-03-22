import styled from 'styled-components';

export const DetailedContentContainer = styled.div`
  width: 100%;
  margin: 2rem 0 4rem;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
  
  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const DetailedContentTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const DetailedContentText = styled.p`
  font-size: 1.125rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const DetailedContentList = styled.div`
  font-size: 1.125rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`; 