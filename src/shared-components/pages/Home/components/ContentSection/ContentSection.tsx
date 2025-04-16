import React, { ReactNode } from 'react';
import { ContentSectionProps } from './ContentSection.types';
import { SectionContainer, Content, QuoteBlock } from './ContentSection.styles';

/**
 * Content Section Component
 * Used for displaying content sections with consistent styling
 */
export function ContentSection({
  children,
  className,
  highlightQuote
}: ContentSectionProps) {
  return (
    <SectionContainer className={className}>
      <Content>
        {children}
        {highlightQuote && (
          <QuoteBlock>
            {highlightQuote}
          </QuoteBlock>
        )}
      </Content>
    </SectionContainer>
  );
} 