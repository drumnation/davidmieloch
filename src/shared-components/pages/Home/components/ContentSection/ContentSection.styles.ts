"use client";

import styled from 'styled-components';
import { Typography } from '../../../../atoms/Typography';

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

export const FSBPSectionContainer = styled.section`
  padding: 2rem 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  color: #fff !important;
  
  @media (min-width: 768px) {
    padding: 3rem 2rem;
  }
  
  .fsbp-text-content {
    color: #fff !important;
  }
`;

export const FSBPHeader = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;
  color: #fff !important;
`;

export const FSBPSubheadline = styled.div`
  max-width: 700px;
  margin: 1rem auto 1.5rem;
  color: #fff !important;
`;

export const FSBPHeaderSeparator = styled.span`
  display: block;
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #4361ee, #3a0ca3);
  margin: 0 auto;
`;

export const FSBPContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

export const FSBPIntro = styled.div`
  margin-bottom: 2rem;
`;

export const FSBPText = styled(Typography)`
  line-height: 1.7;
  font-size: 1.05rem;
  color: #fff !important;
`;

export const FSBPEmphasis = styled.span`
  font-weight: 600;
  color: #5e81ff;
`;

export const FSBPKeyTerm = styled.span`
  background-color: rgba(67, 97, 238, 0.2);
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  font-weight: 600;
  color: #a2b6ff;
`;

export const ParadigmSection = styled.div`
  margin-top: 1.5rem;
`;

export const ParadigmParagraph = styled.div`
  margin-bottom: 2rem;
  
  .fsbp-text-content {
    line-height: 1.7;
    font-size: 1.05rem;
    
    strong {
      font-weight: 600;
      color: #a2b6ff; /* Light blue color to match FSBPEmphasis */
    }
  }
`;

export const ParadigmSubheading = styled.h4`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  color: #e2e8f0;
  margin-bottom: 1rem;
  font-weight: 600;
`;

export const ParadigmIcon = styled.span`
  margin-right: 0.75rem;
  display: inline-flex;
`;

export const PullQuoteContainer = styled.div`
  margin: 2.5rem 0;
  padding: 0 1.5rem;
`;

export const PullQuote = styled.div`
  font-size: 1.5rem;
  line-height: 1.4;
  color: #a2b6ff;
  font-weight: 500;
  font-style: italic;
  text-align: center;
  position: relative;
  
  &::before, &::after {
    content: '"';
    font-size: 3rem;
    color: rgba(67, 97, 238, 0.2);
    position: absolute;
  }
  
  &::before {
    top: -1.5rem;
    left: -1rem;
  }
  
  &::after {
    bottom: -2.5rem;
    right: -1rem;
  }
`;

export const CharacteristicsSection = styled.div`
  margin: 3rem 0;
`;

export const CharacteristicsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-top: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, auto);
  }
`;

export const CTASectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin: 3rem 0;
  
  @media (min-width: 768px) {
    flex-direction: row;
    gap: 2rem;
  }
`;

export const CTAGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`; 