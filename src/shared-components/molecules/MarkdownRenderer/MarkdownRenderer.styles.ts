import { styled } from 'styled-components';

export const MarkdownContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
  line-height: 1.6;
  font-size: 1.1rem;

  h1, h2, h3 {
    margin: 2rem 0 1rem;
    color: ${({ theme }) => theme.colors.primary};
  }

  h1 {
    font-size: 2.5rem;
    border-bottom: 2px solid ${({ theme }) => theme.colors.accent};
    padding-bottom: 0.5rem;
  }

  h2 {
    font-size: 2rem;
    margin-top: 2.5rem;
  }

  h3 {
    font-size: 1.5rem;
  }

  p {
    margin: 1rem 0;
  }

  ul, ol {
    margin: 1rem 0;
    padding-left: 2rem;
  }

  li {
    margin: 0.5rem 0;
  }

  strong {
    color: ${({ theme }) => theme.colors.accent};
  }

  a {
    color: ${({ theme }) => theme.colors.secondary};
    text-decoration: underline;
    &:hover {
      text-decoration: none;
    }
  }

  code {
    background: ${({ theme }) => theme.colors.codeBackground};
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-family: ${({ theme }) => theme.fonts.monospace};
  }

  pre {
    background: ${({ theme }) => theme.colors.codeBlockBackground};
    padding: 1rem;
    border-radius: 8px;
    margin: 1.5rem 0;
    overflow-x: auto;

    code {
      background: none;
      padding: 0;
      font-size: 0.9rem;
    }
  }

  blockquote {
    border-left: 4px solid ${({ theme }) => theme.colors.accent};
    margin: 1.5rem 0;
    padding: 0.5rem 1rem;
    background: ${({ theme }) => theme.colors.blockquoteBackground};
    color: ${({ theme }) => theme.colors.blockquoteText};
  }
`;