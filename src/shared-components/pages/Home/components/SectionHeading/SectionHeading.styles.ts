import styled from 'styled-components';

/**
 * Container for the section heading
 */
export const HeadingContainer = styled.div`
  margin: 2rem 0 1rem;
  text-align: center;
`;

/**
 * Icon container
 */
export const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  margin-right: 1rem;
  color: #4361ee;
  font-size: 1.5rem;
  
  @media (max-width: 767px) {
    width: 2rem;
    height: 2rem;
    margin-right: 0.75rem;
    font-size: 1.25rem;
  }
`;

/**
 * Title text
 */
export const Title = styled.h2`
  font-size: 1.75rem;
  font-weight: 600;
  color: #4361ee;
  margin: 0;
  
  @media (max-width: 767px) {
    font-size: 1.5rem;
  }
`; 