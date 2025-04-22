import { styled } from 'styled-components';
import { MantineTheme } from '@mantine/core';

// Define props interface for MarkdownContainer
interface MarkdownContainerProps {
  $disablePadding?: boolean;
}

// Pass the props to the styled component
export const MarkdownContainer = styled.div<MarkdownContainerProps>`
  max-width: 800px;
  margin: 0;
  /* Conditionally apply padding based on disablePadding prop */
  padding: ${({ $disablePadding }) => ($disablePadding ? '0' : '2rem 1rem')};
  line-height: 1.6;
  font-size: 1.1rem;

  h3 {
    color: ${({ theme }) => (theme as MantineTheme).colors[(theme as MantineTheme).primaryColor][6]};
  }
  h1, h2, h3 {
    margin: 2rem 0 1rem;
  }

  h1 {
    font-size: 2.5rem;
    border-bottom: 2px solid ${({ theme }) => (theme as MantineTheme).colors.gray[4]};
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
    color: ${({ theme }) => (theme as MantineTheme).colors[(theme as MantineTheme).primaryColor][7]};
  }

  a {
    color: ${({ theme }) => (theme as MantineTheme).colors.blue[6]};
    text-decoration: underline;
    &:hover {
      text-decoration: none;
    }
  }

  code {
    background: ${({ theme }) => (theme as MantineTheme).colors.gray[1]};
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-family: ${({ theme }) => (theme as MantineTheme).fontFamilyMonospace};
  }

  pre {
    background: ${({ theme }) => (theme as MantineTheme).colors.dark[8]};
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
    border-left: 4px solid ${({ theme }) => (theme as MantineTheme).colors.gray[5]};
    margin: 1.5rem 0;
    padding: 0.5rem 1rem;
    background: ${({ theme }) => (theme as MantineTheme).colors.gray[0]};
    color: ${({ theme }) => (theme as MantineTheme).colors.gray[7]};
  }
`;

export const CompactMarkdownContainer = styled(MarkdownContainer)`
  max-width: 100%;
  margin: 0;
  padding: 0;
  font-size: 0.9rem;
  line-height: 1.5;

  h1, h2, h3 {
    margin: 1rem 0 0.5rem;
  }

  h1 {
    font-size: 1.2rem;
    border-bottom: 1px solid ${({ theme }) => (theme as MantineTheme).colors.gray[3]};
    padding-bottom: 0.25rem;
  }

  h2 {
    font-size: 1.1rem;
    margin-top: 1rem;
  }

  h3 {
    font-size: 1rem;
  }

  p {
    margin: 0.5rem 0;
  }

  ul, ol {
    margin: 0.5rem 0;
    padding-left: 1.5rem;
  }

  li {
    margin: 0.25rem 0;
  }

  strong {
    font-weight: 600;
  }

  pre {
    margin: 0.75rem 0;
    padding: 0.5rem;
  }

  blockquote {
    margin: 0.75rem 0;
    padding: 0.25rem 0.5rem;
  }
`;