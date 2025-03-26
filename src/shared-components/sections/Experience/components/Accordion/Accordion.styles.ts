import styled from 'styled-components';

export const AccordionContainer = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

export const AccordionHeader = styled.div<{ isOpen: boolean }>`
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background-color: ${({ isOpen }) => isOpen ? 'rgba(0, 0, 0, 0.02)' : 'white'};
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

export const HeaderContent = styled.div`
  flex: 1;
`;

export const Title = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  color: rgba(0, 0, 0, 0.9);
`;

export const Subtitle = styled.p`
  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.6);
  margin: 4px 0 0;
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
  padding: ${({ isOpen }) => isOpen ? '16px' : '0 16px'};
  max-height: ${({ isOpen }) => isOpen ? '2000px' : '0'};
  opacity: ${({ isOpen }) => isOpen ? '1' : '0'};
  overflow: hidden;
  transition: all 0.3s ease;
  border-top: ${({ isOpen }) => isOpen ? '1px solid rgba(0, 0, 0, 0.1)' : 'none'};
`; 