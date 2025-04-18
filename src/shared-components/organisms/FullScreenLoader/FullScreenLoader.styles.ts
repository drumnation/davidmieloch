import styled from 'styled-components';

export const OverlayContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100vh; /* Changed from height: 100% for better viewport coverage */
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.95); /* Consider theme variable */
  z-index: 9999; /* Ensure high z-index */
  opacity: 1;
  transition: opacity 200ms ease-in-out; /* Add smooth fade */

  &[data-visible="false"] {
    opacity: 0;
    pointer-events: none; /* Allow clicks through when hidden */
  }
`; 