import styled from 'styled-components';

export const AccordionContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

export const AccordionHeader = styled.div<{ isOpen: boolean }>`
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background-color: ${({ theme, isOpen }) => 
    isOpen ? theme.colors.background.light : theme.colors.background.paper};
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.background.light};
  }
`;

export const HeaderContent = styled.div`
  flex: 1;
`;

export const Title = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
`;

export const Subtitle = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0.25rem 0 0;
`;

export const IconContainer = styled.div<{ isOpen: boolean }>`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(${({ isOpen }) => isOpen ? '180deg' : '0deg'});
  transition: transform 0.3s ease;
`;

export const AccordionContent = styled.div<{ isOpen: boolean }>`
  padding: ${({ isOpen }) => isOpen ? '1rem' : '0 1rem'};
  max-height: ${({ isOpen }) => isOpen ? '3000px' : '0'};
  opacity: ${({ isOpen }) => isOpen ? '1' : '0'};
  overflow: hidden;
  transition: all 0.3s ease;
  border-top: ${({ isOpen, theme }) => 
    isOpen ? `1px solid ${theme.colors.border}` : 'none'};
`; 