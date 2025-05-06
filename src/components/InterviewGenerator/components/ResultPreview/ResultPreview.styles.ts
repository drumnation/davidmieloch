import styled from 'styled-components';

export const PreviewContainer = styled.div`
  position: relative;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 2rem;
  margin-top: 1rem;
  background-color: white;
  overflow-x: auto;
  color: #333;
  
  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
  }
  
  @media (max-width: 480px) {
    padding: 1rem 0.25rem;
    font-size: 0.9rem;
    margin-top: 0.5rem;
  }
  
  /* Make sure normal text styling is applied to markdown elements */
  h1, h2, h3, h4, h5, h6 {
    color: #333;
    margin-top: 1.5em;
    margin-bottom: 0.5em;
    font-weight: 600;
    word-break: break-word;
  }
  
  h1 {
    font-size: 2rem;
    border-bottom: 1px solid #eee;
    padding-bottom: 0.5rem;
    
    @media (max-width: 768px) {
      font-size: 1.75rem;
    }
    
    @media (max-width: 480px) {
      font-size: 1.5rem;
    }
  }
  
  h2 {
    font-size: 1.75rem;
    color: #444;
    
    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
    
    @media (max-width: 480px) {
      font-size: 1.3rem;
    }
  }
  
  h3 {
    font-size: 1.5rem;
    color: #555;
    
    @media (max-width: 768px) {
      font-size: 1.3rem;
    }
    
    @media (max-width: 480px) {
      font-size: 1.1rem;
    }
  }
  
  p {
    margin-bottom: 1em;
    line-height: 1.6;
  }
  
  ul, ol {
    padding-left: 2em;
    margin-bottom: 1em;
    
    @media (max-width: 480px) {
      padding-left: 1.5em;
    }
  }
  
  li {
    margin-bottom: 0.5em;
  }
  
  strong {
    font-weight: 600;
  }
  
  /* Remove code styling */
  pre, code {
    background: transparent !important;
    color: inherit !important;
    font-family: inherit !important;
    font-size: inherit !important;
    padding: 0 !important;
    margin: 0 !important;
    border: none !important;
    box-shadow: none !important;
    border-radius: 0 !important;
  }
`;

export const ModalContent = styled.div`
  position: relative;
  padding: 2rem;
  background-color: white;
  color: #333;
  width: 90%;
  max-width: 1800px;
  margin: 0 auto;
  font-size: 1.1rem;
  line-height: 1.6;
  
  /* Match the normal document styling */
  h1, h2, h3, h4, h5, h6 {
    color: #333;
    margin-top: 1.5em;
    margin-bottom: 0.5em;
    font-weight: 600;
  }
  
  h1 {
    font-size: 2.2rem;
    border-bottom: 1px solid #eee;
    padding-bottom: 0.5rem;
  }
  
  h2 {
    font-size: 1.8rem;
    color: #444;
  }
  
  h3 {
    font-size: 1.5rem;
    color: #555;
  }
  
  p {
    margin-bottom: 1em;
    line-height: 1.6;
  }
  
  ul, ol {
    padding-left: 2em;
    margin-bottom: 1em;
  }
  
  li {
    margin-bottom: 0.5em;
  }
  
  strong {
    font-weight: 600;
  }
  
  /* Remove code styling */
  pre, code {
    background: transparent !important;
    color: inherit !important;
    font-family: inherit !important;
    font-size: inherit !important;
    padding: 0 !important;
    margin: 0 !important;
    border: none !important;
    box-shadow: none !important;
    border-radius: 0 !important;
  }
`;

export const PreviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
`;

export const CopyButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  background-color: #f5f5f5;
  border: 1px solid #e0e0e0;
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.2s;

  &:hover {
    background-color: #e0e0e0;
  }
  
  @media (max-width: 480px) {
    padding: 0.4rem 0.6rem;
    font-size: 0.75rem;
  }
`; 