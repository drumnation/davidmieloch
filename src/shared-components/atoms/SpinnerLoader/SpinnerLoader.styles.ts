import styled from 'styled-components';

export const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 150px; /* Default height for inline loaders */
  padding: 2rem;
  gap: 1.5rem; /* Add gap for consistent spacing between spinner and text */
`;

export const LoadingText = styled.div`
  font-size: 1.1rem;
  color: #555; /* Consider using theme variables */
  text-align: center;
  font-weight: 500;
`; 