import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { MarkdownContainer, CompactMarkdownContainer } from './MarkdownRenderer.styles';

export interface MarkdownRendererProps {
  content: string;
  compact?: boolean;
  disablePadding?: boolean;
}

// Define wrapper components with explicit props types
interface WrapperProps {
  children: React.ReactNode;
  disablePadding: boolean;
}

// Destructure disablePadding but don't pass it down
const CompactWrapper: React.FC<WrapperProps> = ({ children, disablePadding }) => (
  <CompactMarkdownContainer disablePadding={disablePadding}>{children}</CompactMarkdownContainer>
);

// Destructure disablePadding but don't pass it down
const DefaultWrapper: React.FC<WrapperProps> = ({ children, disablePadding }) => (
  <MarkdownContainer disablePadding={disablePadding}>{children}</MarkdownContainer>
);

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  compact = false,
  disablePadding = false
}) => {
  // Select the appropriate wrapper component
  const Container = compact ? CompactWrapper : DefaultWrapper;

  // Check if content is a string
  if (typeof content !== 'string') {
    console.error('MarkdownRenderer: content is not a string', content);
    // Pass disablePadding correctly to the selected container component
    return <Container disablePadding={disablePadding}>Invalid content</Container>;
  }

  // Log the content for debugging
  console.log('MarkdownRenderer content:', content);

  return (
    // Pass disablePadding correctly to the selected container component
    <Container disablePadding={disablePadding}>
      <ReactMarkdown
        components={{
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return match ? (
              <SyntaxHighlighter
                // @ts-expect-error - Known issue with react-syntax-highlighter types
                style={materialDark}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          // Enable rendering of raw HTML within markdown (if desired)
          p: ({ node, ...props }) => <p className="markdown-paragraph" {...props} />,
          strong: ({ node, ...props }) => <strong className="markdown-strong" {...props} />,
          ul: ({ node, ...props }) => <ul className="markdown-list" {...props} />,
          li: ({ node, ...props }) => <li className="markdown-list-item" {...props} />,
          h2: ({ node, ...props }) => <h2 className="markdown-h2" {...props} />
        }}
      >
        {content}
      </ReactMarkdown>
    </Container>
  );
};