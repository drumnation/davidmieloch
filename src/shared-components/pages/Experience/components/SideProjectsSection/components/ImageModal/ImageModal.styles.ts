import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
`;

export const ModalContent = styled.div`
  position: relative;
  background: transparent; /* Or a dark color if preferred */
  padding: 0; /* Padding handled by overlay or internal elements */
  border-radius: 8px;
  max-width: 90vw; /* Limit width */
  max-height: 90vh; /* Limit height */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .modal-caption {
    color: white;
    margin-top: 10px;
    text-align: center;
    font-size: 0.9rem;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
  transition: background-color 0.2s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }

  svg {
    display: block; /* Prevent extra space */
  }
`; 