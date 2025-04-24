import styled from 'styled-components';
import { Typography } from '@shared-components/atoms/Typography';
import { ContentContainer as BaseContentContainer, SectionSubtitle } from '../../BrainGardenOverview.styles';

// Define mobile breakpoint
const mobileBreakpoint = '576px';

export const ForceMultiplierContainer = styled(BaseContentContainer)`
  min-height: 300px; /* Ensure minimum height */
  margin: 0 0 3rem 0; /* Remove top margin, keep bottom */
  position: relative; /* Establish positioning context */
  z-index: 5; /* Ensure proper stacking with higher z-index */
  overflow: visible; /* Ensure content isn't clipped */
  background-color: #fff; /* Set background color */
  height: auto; /* Let height adapt to content */
  width: 100%; /* Ensure full width */
  display: block; /* Force block display */
  padding-top: 10px; /* Reduce top padding */

  /* Reduce side padding on mobile */
  @media (max-width: ${mobileBreakpoint}) {
    padding-left: 5px; /* Further reduce mobile padding */
    padding-right: 5px; /* Further reduce mobile padding */
  }
`;

export const StyledForceMultiplierContainer = styled.div`
  padding: 0 1rem 2rem 1rem; /* Default padding (includes desktop) */
  max-width: 900px;
  margin: 0 auto;

  /* Remove horizontal padding on mobile */
  @media (max-width: ${mobileBreakpoint}) {
    padding-left: 0;
    padding-right: 0;
  }
`;

export const PowerfulTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  padding-top: 0;
  margin-top: 0;

  /* Hide icon on mobile */
  & > svg {
    @media (max-width: ${mobileBreakpoint}) {
      display: none;
    }
  }
`;

export const GradientText = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #000000;
  margin: 0;
  white-space: nowrap;

  @media (max-width: ${mobileBreakpoint}) {
    font-size: 2rem;
  }
`;

export const ActTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #4361ee;
  margin-top: 2.5rem;
  margin-bottom: 1.5rem;
`;

export const StoryBox = styled.blockquote`
  border-left: 4px solid #e0e7ff;
  padding-left: 1.5rem; /* Default left padding */
  margin-left: 0;
  margin-right: 0;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  background-color: #f8fafc;
  border-radius: 0.5rem;
  padding: 1.5rem; /* Default padding (includes right/top/bottom) */

  /* Reduce padding significantly on mobile */
  @media (max-width: ${mobileBreakpoint}) {
    padding-top: 1rem;
    padding-bottom: 1rem;
    padding-left: 0.75rem;
    padding-right: 0.5rem;
    margin-left: -2px;
    margin-right: -2px;
  }

  /* Style nested lists */
  ul {
    list-style-type: disc; /* Ensure default bullets */
    margin-top: 1rem;
    margin-bottom: 1.5rem;
    margin-left: 2rem; /* Default indentation */
    padding-left: 0; /* Reset browser default padding */

    @media (max-width: ${mobileBreakpoint}) {
      margin-left: 1rem; /* Reduced indentation for mobile */
    }
  }
`;

export const BodyText = styled(Typography)`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

export const HighlightBox = styled.div`
  background: rgba(103, 114, 229, 0.05);
  padding: 1.5rem;
  border-radius: 12px;
  margin: 1.5rem 0;
  border-left: 4px solid #6772e5;
`;

export const Speaker = styled.span`
  font-weight: bold;
  color: #6772e5;
`;

export const CodeSnippet = styled.pre`
  background-color: #f8f9fa;
  padding: 0.75rem;
  border-radius: 4px;
  border-left: 3px solid #6772e5;
  margin: 0.75rem 0;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  overflow-x: auto;
`;

// Typography components
export const IntroText = styled(Typography)`
  font-size: 1.2rem;
  line-height: 1.6;
`;

export const ExplanationText = styled(BodyText)`
  margin-top: 1rem;
  margin-bottom: 0;
`;

export const IndentedText = styled(Typography)`
  margin-left: 36px;
`;

export const CodeBlock = styled.pre`
  background: rgba(74, 158, 255, 0.05);
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
  font-family: monospace;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-size: 0.9rem;
  line-height: 1.4;
`;

export const DiagramContainer = styled.div`
  position: relative;
  
  .zoom-controls {
    position: absolute;
    top: 10px;
    right: 10px;
    display: none;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 4px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
    z-index: 10;
  }
  
  &:hover .zoom-controls {
    display: flex;
  }
  
  /* Add styling to prevent line-text collisions */
  .messageText {
    background-color: white;
    padding: 0 4px;
    border-radius: 2px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
  }
  
  .note rect {
    fill: #FFE17E;
    stroke: #FFD700;
  }
  
  .actor {
    filter: drop-shadow(0px 0px 3px rgba(0, 0, 0, 0.2));
  }
`;

export const Comment = styled.div`
  color: var(--mantine-color-dimmed);
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

// Chat interface components
export const ChatContainer = styled.div`
  margin: 1.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const ChatMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  max-width: 100%;
`;

export const Avatar = styled.div<{ $bgColor?: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.$bgColor || '#4a9eff'};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1rem;
  flex-shrink: 0;
`;

export const MessageBubble = styled.div<{ $bgColor?: string, $textColor?: string }>`
  background-color: ${props => props.$bgColor || '#f5f5f5'};
  color: ${props => props.$textColor || '#1F2937'};
  padding: 0.75rem 1rem;
  border-radius: 1rem;
  border-top-left-radius: ${props => props.$bgColor ? '1rem' : '0.25rem'};
  max-width: calc(100% - 50px);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;

export const SpeakerName = styled.div`
  font-weight: 600;
  font-size: 0.85rem;
  margin-bottom: 0.25rem;
  color: #666;
`;

export const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
  max-width: calc(100% - 50px);
`;

export const MessageText = styled.div`
  font-size: 1rem;
  line-height: 1.5;
`;

export const DialogLine = styled.div`
  margin-bottom: 0.5rem;
  position: relative;
`;

export const TerminalBlock = styled.div`
  background: #1E293B;
  color: #E2E8F0;
  padding: 1rem;
  border-radius: 8px;
  margin: 1.5rem 0;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  line-height: 1.6;
`;

export const Command = styled.div`
  color: #E2E8F0;
  margin-bottom: 0.5rem;

  &::before {
    content: '$ ';
    opacity: 0.6;
  }
`;

export const Result = styled.div`
  color: #10B981;
  margin-left: 1rem;
  margin-bottom: 1rem;
  white-space: pre-wrap;
`;

export const TerminalOutput = styled.pre`
  margin: 0.5rem 0 1rem 1rem;
  color: #CBD5E1;
  white-space: pre-wrap;
  font-size: 0.85rem;
`;

export const GitOutput = styled.div`
  color: #10B981;
  margin-left: 1rem;
  margin-bottom: 1rem;
  white-space: pre-wrap;
`;

export const R = styled(TerminalOutput)`
  color: #F87171;
`;

export const GitFeatureReconstruction = styled.div`
  background-color: #0F172A;
  padding: 1.5rem;
  border-radius: 8px;
  margin: 1.5rem 0;
  font-family: 'Courier New', monospace;
`;

export const GitCommand = styled.div`
  color: #E2E8F0;
  margin-bottom: 0.5rem;

  &::before {
    content: '$ ';
    opacity: 0.6;
  }
`;

export const CommandHighlight = styled.span`
  color: #60A5FA;
  font-weight: bold;
`;

export const GitCommit = styled.div`
  color: #E2E8F0;
  margin-bottom: 0.5rem;
  padding-left: 1rem;
  border-left: 2px solid #4B5563;
  white-space: pre-wrap;
`;

export const InsightBox = styled.div`
  background: rgba(74, 158, 255, 0.05);
  padding: 1.5rem;
  border-radius: 12px;
  margin: 2rem 0;
  border-left: 4px solid #4a9eff;
`;

export const InsightTitle = styled.div`
  font-weight: bold;
  color: #4a9eff;
  margin-bottom: 0.75rem;
  font-size: 1.1rem;
`;

export const GitPRSplitter = styled(GitFeatureReconstruction)`
  margin-top: 2rem;
`;

export const PRBranch = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  margin: 1rem 0;
  display: flex;
  align-items: center;
  color: #CBD5E1;
`;

export const BranchIcon = styled.span`
  display: inline-block;
  margin-right: 0.75rem;
  font-weight: bold;
  opacity: 0.7;
`;

export const DependencyArrow = styled.div`
  margin-left: 2rem;
  margin-bottom: 1rem;
  margin-top: -0.5rem;
  color: #9CA3AF;
  font-style: italic;

  &::before {
    content: '↳ ';
    color: #60A5FA;
  }
`;

export const DocsFeatReconstruction = styled(GitFeatureReconstruction)`
  margin-top: 2rem;
`;

export const CustomForceMultiplierContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  background-color: var(--mantine-color-body);
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
`;