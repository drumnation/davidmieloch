import React from 'react';
import { ProjectLogoProps } from './ProjectLogo.types';
import * as S from './ProjectLogo.styles';

/**
 * Generate a deterministic color based on the project name
 */
const generateColorFromName = (name: string): string => {
  // Simple hash function
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  // Generate HSL color with good saturation and lightness for visibility
  const h = Math.abs(hash % 360);
  const s = 65 + (hash % 20); // 65-85% saturation
  const l = 55 + (hash % 10); // 55-65% lightness for good contrast with white text
  
  return `hsl(${h}, ${s}%, ${l}%)`;
};

/**
 * Get initials from a project name
 */
const getInitials = (name: string, count: 1 | 2 = 2): string => {
  const words = name.trim().split(/\s+/);
  
  if (words.length === 1) {
    // For single-word names, use first two letters or just first letter based on count
    return count === 1 ? name.charAt(0) : name.substring(0, 2);
  }
  
  // For multi-word names, use first letter of first two words
  return words.slice(0, count).map(word => word.charAt(0)).join('');
};

/**
 * A component that displays a project logo or a fallback with initials
 */
export const ProjectLogo: React.FC<ProjectLogoProps> = ({
  name,
  logoPath,
  size = 48,
  bgColor,
  textColor,
  showLabel = false,
  labelPosition = 'bottom',
  className,
  onClick,
  showTooltip = true,
  initialsCount = 2
}) => {
  // Determine background color (use provided or generate from name)
  const backgroundColor = bgColor || generateColorFromName(name);

  return (
    <S.ProjectLogoContainer
      className={className}
      onClick={onClick ? () => onClick() : undefined}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
      title={showTooltip ? name : undefined}
      $labelPosition={labelPosition}
    >
      {logoPath ? (
        <S.ImageWrapper>
          <img 
            src={logoPath} 
            alt={`${name} logo`} 
            width={size} 
            height={size}
          />
        </S.ImageWrapper>
      ) : (
        <S.FallbackLogo
          $bgColor={backgroundColor}
          $size={size}
          $textColor={textColor}
        >
          {getInitials(name, initialsCount)}
        </S.FallbackLogo>
      )}
      
      {showLabel && (
        <S.ProjectLabel $labelPosition={labelPosition}>
          {name}
        </S.ProjectLabel>
      )}
    </S.ProjectLogoContainer>
  );
};

export default ProjectLogo; 