import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Button, CenteredButton } from '../../../shared-components/atoms/Button';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';

export interface FoldableContentProps {
  children: React.ReactNode;
  maxHeight?: number;
  customMaxHeight?: string;
  className?: string;
  buttonPosition?: 'right' | 'center';
  showMoreText?: string;
  showLessText?: string;
}

const Container = styled.div`
  position: relative;
  width: 100%;
`;

const ContentWrapper = styled.div<{ $maxHeight: number; $isExpanded: boolean; $customMaxHeight?: string }>`
  position: relative;
  max-height: ${({ $maxHeight, $isExpanded, $customMaxHeight }) => 
    $isExpanded ? 'none' : ($customMaxHeight ? $customMaxHeight : `${$maxHeight}px`)};
  overflow: hidden;
  transition: max-height 0.3s ease;
`;

const Gradient = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
  pointer-events: none;
`;

const ButtonContainer = styled.div<{ $position: 'right' | 'center' }>`
  width: 100%;
  display: flex;
  justify-content: ${({ $position }) => ($position === 'right' ? 'flex-end' : 'center')};
  margin-top: 8px;
`;

export const FoldableContent: React.FC<FoldableContentProps> = ({
  children,
  maxHeight = 200,
  customMaxHeight,
  className,
  buttonPosition = 'right',
  showMoreText = 'Show more',
  showLessText = 'Show less',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      if (customMaxHeight) {
        // For custom height, we need to check if content overflows
        const tempDiv = document.createElement('div');
        tempDiv.style.position = 'absolute';
        tempDiv.style.visibility = 'hidden';
        tempDiv.style.height = 'auto';
        tempDiv.innerHTML = contentRef.current.innerHTML;
        document.body.appendChild(tempDiv);
        
        // Get the natural height of content
        const contentHeight = tempDiv.offsetHeight;
        
        // Parse the custom height to a number for comparison
        let customHeightValue = parseInt(customMaxHeight);
        if (isNaN(customHeightValue)) {
          // Handle percentage or other values by estimating
          customHeightValue = 200; // Fallback to default comparison
        }
        
        setShouldShow(contentHeight > customHeightValue);
        document.body.removeChild(tempDiv);
      } else {
        setShouldShow(contentRef.current.scrollHeight > maxHeight);
      }
    }
  }, [children, maxHeight, customMaxHeight]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Container className={className}>
      <ContentWrapper
        ref={contentRef}
        $maxHeight={maxHeight}
        $customMaxHeight={customMaxHeight}
        $isExpanded={isExpanded}
      >
        {children}
        {!isExpanded && shouldShow && <Gradient />}
      </ContentWrapper>
      
      {shouldShow && (
        buttonPosition === 'center' ? (
          <CenteredButton 
            variant="ghost" 
            size="sm" 
            onClick={toggleExpand}
            icon={isExpanded ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
            iconPosition="right"
          >
            {isExpanded ? showLessText : showMoreText}
          </CenteredButton>
        ) : (
          <ButtonContainer $position="right">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleExpand}
              icon={isExpanded ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
              iconPosition="right"
            >
              {isExpanded ? showLessText : showMoreText}
            </Button>
          </ButtonContainer>
        )
      )}
    </Container>
  );
};

export default FoldableContent; 