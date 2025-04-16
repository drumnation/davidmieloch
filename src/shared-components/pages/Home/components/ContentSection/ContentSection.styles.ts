import styled from 'styled-components';

/**
 * Container for the content section
 */
export const SectionContainer = styled.div`
  margin: 3rem 0;
  padding: 0 1.5rem;
  
  @media (max-width: 767px) {
    margin: 2rem 0;
    padding: 0 1rem;
  }
`;

/**
 * Content area
 */
export const Content = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  
  p {
    font-size: 1.125rem;
    line-height: 1.8;
    color: #333;
    margin-bottom: 1.5rem;
    
    @media (max-width: 767px) {
      font-size: 1rem;
      line-height: 1.7;
    }
  }
  
  ul, ol {
    margin-bottom: 1.5rem;
    padding-left: 1.5rem;
    
    li {
      margin-bottom: 0.5rem;
      font-size: 1.125rem;
      
      @media (max-width: 767px) {
        font-size: 1rem;
      }
    }
  }
`;

/**
 * Highlighted quote block
 */
export const QuoteBlock = styled.blockquote`
  position: relative;
  font-size: 1.5rem;
  font-style: italic;
  color: #4361ee;
  border-left: 4px solid #4361ee;
  padding: 1rem 1.5rem;
  margin: 2rem 0;
  background-color: rgba(67, 97, 238, 0.05);
  
  &::before {
    content: '"';
    position: absolute;
    top: -0.5rem;
    left: 0.5rem;
    font-size: 3rem;
    color: rgba(67, 97, 238, 0.2);
  }
  
  @media (max-width: 767px) {
    font-size: 1.25rem;
    padding: 0.75rem 1.25rem;
    margin: 1.5rem 0;
  }
`; 