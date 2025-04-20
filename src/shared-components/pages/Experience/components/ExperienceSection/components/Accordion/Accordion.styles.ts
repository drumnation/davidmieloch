import styled from 'styled-components';

// --- Styles moved from ExperienceSection.logic.tsx ---

export const AccordionContainer = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

export const AccordionHeader = styled.div<{ $isOpen: boolean }>`
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background-color: ${({ $isOpen }) => $isOpen ? 'rgba(0, 0, 0, 0.02)' : 'white'};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

// This might need adjustment if HeaderContent wasn't intended for reuse here
export const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AccordionTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  color: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;

  &:before {
    content: "";
    display: inline-block;
    width: 6px;
    height: 6px;
    margin-right: 8px;
    background-color: #3366cc;
    border-radius: 50%;
  }
`;

export const AccordionSubtitle = styled.p`
  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.6);
  margin: 4px 0 0;
`;

export const IconContainer = styled.div<{ $isOpen: boolean }>`
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transform: rotate(${({ $isOpen }) => $isOpen ? '180deg' : '0deg'});
  transition: transform 0.3s ease;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 50%;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export const AccordionContent = styled.div<{ $isOpen: boolean }>`
  padding: ${({ $isOpen }) => $isOpen ? '16px' : '0 16px'};
  max-height: ${({ $isOpen }) => $isOpen ? 'none' : '0'}; // Animate max-height
  opacity: ${({ $isOpen }) => $isOpen ? '1' : '0'};
  overflow: hidden;
  transition: ${({ $isOpen }) =>
    $isOpen
      ? 'max-height 0.3s ease-out, opacity 0.3s ease-in, padding 0.2s ease'
      : 'max-height 0.3s ease-in, opacity 0.2s ease-out, padding 0.1s ease'
  };
  border-top: ${({ $isOpen }) => $isOpen ? '1px solid rgba(0, 0, 0, 0.1)' : 'none'};
`;

// --- End Moved Styles --- 