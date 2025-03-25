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

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

export const SectionIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.background.light};
  padding: 8px;
  
  svg, img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const DetailedContentTitle = styled.h2`
  font-size: 2rem;
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

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
`;

export const TitleWithIconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

export const SectionTitle = styled.h3`
  font-size: 1.75rem;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

export const SectionSubtitle = styled.h4`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0 0 1rem 0;
  font-weight: 500;
`;

export const TextContent = styled.p`
  font-size: 1.125rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const ListContent = styled.div`
  margin-bottom: 1.5rem;
`;

export const ListItem = styled.li`
  font-size: 1.125rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 0.75rem;
`;

export const CodeBlock = styled.pre`
  background-color: ${({ theme }) => theme.colors.background.light};
  border-radius: 8px;
  padding: 1.5rem;
  overflow-x: auto;
  margin-bottom: 1.5rem;
  font-family: 'Roboto Mono', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text.primary};
`; 