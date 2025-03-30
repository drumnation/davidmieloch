import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

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

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: #2196f3;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  
  &:hover {
    background-color: rgba(33, 150, 243, 0.1);
  }
  
  svg {
    margin-left: 4px;
  }
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

  const toggleExpand = (e: React.MouseEvent) => {
    // Stop event propagation to prevent triggering parent onClick handlers
    e.stopPropagation();
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
        <ButtonContainer $position={buttonPosition}>
          <ToggleButton onClick={toggleExpand}>
            {isExpanded ? showLessText : showMoreText}
            {isExpanded ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 14l5-5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </ToggleButton>
        </ButtonContainer>
      )}
    </Container>
  );
};

export default FoldableContent; 