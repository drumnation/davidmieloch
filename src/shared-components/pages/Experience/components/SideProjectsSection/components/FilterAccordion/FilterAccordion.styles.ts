import styled from 'styled-components';

export const FilterAccordionContainer = styled.div`
  width: 100%;
  margin-bottom: 16px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #f8f8f8;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export const FilterAccordionHeader = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 12px 16px;
  user-select: none;
`;

export const FiltersSectionTitle = styled.div`
  font-size: 0.95rem;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.8);
  flex: 1;
  display: flex;
  align-items: center;
  margin: 0;
`;

export const AccordionIcon = styled.span<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.35);

  svg {
    width: 14px;
    height: 14px;
    color: white;
    transition: transform 0.3s ease;
    transform: ${({ $isOpen }) => ($isOpen ? 'rotate(-180deg)' : 'rotate(0deg)')};
  }
`;

export const FilterContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
  background-color: white;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  border-top: 1px solid rgba(0,0,0,0.1);
`; 