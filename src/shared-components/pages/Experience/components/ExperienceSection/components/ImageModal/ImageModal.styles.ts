import styled from 'styled-components';

// Styles for the Image Modal
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 90%;
  max-height: 90%;
  overflow: auto;
  position: relative;
  
  img {
    max-width: 100%;
    max-height: 80vh;
    display: block;
    margin: 0 auto;
  }
  
  h4 {
    margin-top: 16px;
    margin-bottom: 0;
    text-align: center;
    color: #333;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.3); /* Darken background for visibility */
  border: none;
  border-radius: 50%; /* Make it circular */
  width: 32px; /* Increase size */
  height: 32px; /* Increase size */
  display: flex; /* Center icon */
  align-items: center; /* Center icon */
  justify-content: center; /* Center icon */
  cursor: pointer;
  color: white; /* Icon color */
  padding: 0; /* Remove padding */
  
  &:hover {
    background: rgba(0, 0, 0, 0.5);
    color: #eee;
  }

  svg {
    width: 20px; /* Adjust icon size */
    height: 20px; /* Adjust icon size */
  }
`; 