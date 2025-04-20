import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { MarkdownContainer, CompactMarkdownContainer } from './MarkdownRenderer.styles';
import { FaChevronRight } from 'react-icons/fa';

export interface MarkdownRendererProps {
  content: string;
  compact?: boolean;
  disablePadding?: boolean;
  useIconBullets?: boolean;
}

// Define wrapper components with explicit props types
interface WrapperProps {
  children: React.ReactNode;
  $disablePadding: boolean;
}

// Destructure disablePadding but don't pass it down
const CompactWrapper: React.FC<WrapperProps> = ({ children, $disablePadding }) => (
  <CompactMarkdownContainer $disablePadding={$disablePadding}>{children}</CompactMarkdownContainer>
);

// Destructure disablePadding but don't pass it down
const DefaultWrapper: React.FC<WrapperProps> = ({ children, $disablePadding }) => (
  <MarkdownContainer $disablePadding={$disablePadding}>{children}</MarkdownContainer>
);

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  compact = false,
  disablePadding = false,
  useIconBullets = false
}) => {
  // Rename disablePadding to $disablePadding for transient prop usage
  const $disablePadding = disablePadding;

  // Select the appropriate wrapper component
  const Container = compact ? CompactWrapper : DefaultWrapper;

  // Check if content is a string
  if (typeof content !== 'string') {
    console.error('MarkdownRenderer: content is not a string', content);
    // Pass disablePadding correctly to the selected container component
    return <Container $disablePadding={$disablePadding}>Invalid content</Container>;
  }

  // Log the content for debugging
  // console.log('MarkdownRenderer content:', content);

  // --- Define Custom Components --- 
  const componentsConfig: any = {
    code({ className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || '');
      return match ? (
        <SyntaxHighlighter
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
    // Keep standard renderers, will override 'p' conditionally
    strong: ({ node, ...props }: any) => <strong className="markdown-strong" {...props} />,
    ul: ({ node, ...props }: any) => <ul className="markdown-list" {...props} />,
    li: ({ node, ...props }: any) => <li className="markdown-list-item" {...props} />,
    h2: ({ node, ...props }: any) => <h2 className="markdown-h2" {...props} />,
    p: ({ node, ...props }: any) => <p className="markdown-paragraph" {...props} /> // Default paragraph
  };

  // Conditionally override the paragraph renderer if useIconBullets is true
  if (useIconBullets) {
    componentsConfig.p = ({ node, ...props }: any) => (
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5em', marginBottom: '0.5em' }}>
        <FaChevronRight
          size="0.8em"
          style={{ marginTop: '0.25em', flexShrink: 0, color: 'var(--mantine-color-gray-6)' }}
        />
        <p className="markdown-paragraph" {...props} style={{ margin: 0 }} />
      </div>
    );
  }

  return (
    // Pass disablePadding correctly to the selected container component
    <Container $disablePadding={$disablePadding}>
      <ReactMarkdown components={componentsConfig}>
        {content}
      </ReactMarkdown>
    </Container>
  );
};