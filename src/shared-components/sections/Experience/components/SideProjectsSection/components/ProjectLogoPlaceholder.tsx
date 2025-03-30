import React from 'react';
import styled from 'styled-components';

interface ProjectLogoPlaceholderProps {
  /**
   * The project title to generate the placeholder for
   */
  title: string;
  
  /**
   * Custom background color. If not provided, a color will be generated from the title.
   */
  backgroundColor?: string;
  
  /**
   * Size of the placeholder in pixels
   */
  size?: number;
  
  /**
   * Additional class name
   */
  className?: string;
}

// Generate a deterministic color based on the string
const generateColorFromString = (str: string): string => {
  // Simple hash function
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  // Generate HSL color with good saturation and lightness for visibility
  const h = Math.abs(hash % 360);
  const s = 65 + (hash % 20); // 65-85% saturation
  const l = 55 + (hash % 10); // 55-65% lightness for good contrast with white text
  
  return `hsl(${h}, ${s}%, ${l}%)`;
};

// Determine if text should be light or dark based on background color
const getContrastColor = (backgroundColor: string): string => {
  // For HSL colors, lightness under 65% generally requires white text
  if (backgroundColor.includes('hsl')) {
    const l = parseInt(backgroundColor.split(',')[2].split('%')[0]);
    return l < 65 ? 'white' : 'rgba(0, 0, 0, 0.8)';
  }
  
  // Default to white text if we can't determine
  return 'white';
};

const PlaceholderContainer = styled.div<{ $bgColor: string; $size: number }>`
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  background-color: ${props => props.$bgColor};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: ${props => props.$size / 2}px;
  color: ${props => getContrastColor(props.$bgColor)};
  text-transform: uppercase;
`;

export const ProjectLogoPlaceholder: React.FC<ProjectLogoPlaceholderProps> = ({
  title,
  backgroundColor,
  size = 50,
  className,
}) => {
  // Get the first letter of the title
  const letter = title.charAt(0);
  
  // Use provided background color or generate one
  const bgColor = backgroundColor || generateColorFromString(title);
  
  return (
    <PlaceholderContainer 
      $bgColor={bgColor} 
      $size={size}
      className={className}
    >
      {letter}
    </PlaceholderContainer>
  );
};

export default ProjectLogoPlaceholder; 