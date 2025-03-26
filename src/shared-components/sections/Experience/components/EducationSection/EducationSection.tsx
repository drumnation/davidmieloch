import React from 'react';
import { 
  SectionContainer,
  EducationItem,
  SchoolLogo,
  EducationContent,
  EducationSchool,
  EducationMetadataRow,
  EducationDegree,
  EducationDates,
  EducationDescription,
  MediaContainer,
  MediaRow
} from './EducationSection.styles';
import { EducationSectionProps } from './EducationSection.types';
import { stringToColor, LetterAvatar } from '../../utils/avatarHelpers';

// Helper function to check if path is an image file
const isImageFile = (path: string | undefined): boolean => {
  if (!path) return false;
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
  return imageExtensions.some(ext => path.toLowerCase().endsWith(ext));
};

// Helper function to sort education items by date (most recent first)
const sortEducationByDate = (items: any[]) => {
  return [...items].sort((a, b) => {
    // First check if there's a custom sort order
    if (a.sortOrder !== undefined && b.sortOrder !== undefined) {
      return a.sortOrder - b.sortOrder;
    }
    
    // Otherwise sort by date (latest first)
    // Convert string years to numbers
    const endYearA = parseInt(a.endDate.split(' ')[0], 10) || 0;
    const endYearB = parseInt(b.endDate.split(' ')[0], 10) || 0;
    
    if (endYearA !== endYearB) {
      return endYearB - endYearA; // Most recent first
    }
    
    // If end years are the same, sort by start date
    const startYearA = parseInt(a.startDate.split(' ')[0], 10) || 0;
    const startYearB = parseInt(b.startDate.split(' ')[0], 10) || 0;
    return startYearB - startYearA;
  });
};

export const EducationSection: React.FC<EducationSectionProps> = ({
  educationItems,
  title = 'Education',
  className,
  children,
  renderLogo
}) => {
  const sortedEducationItems = sortEducationByDate(educationItems);
  
  return (
    <SectionContainer className={className}>
      <h2>{title}</h2>
      
      {children}
      
      {sortedEducationItems.map((edu, index) => (
        <EducationItem key={`edu-${index}`}>
          <SchoolLogo>
            {renderLogo ? (
              renderLogo(edu.school)
            ) : edu.logoPath && isImageFile(edu.logoPath) ? (
              <img 
                src={edu.logoPath} 
                alt={`${edu.school} logo`}
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'contain'
                }}
              />
            ) : edu.logoPath && edu.logoPath.endsWith('.html') ? (
              <iframe 
                src={edu.logoPath} 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  border: 'none' 
                }}
                title={`${edu.school} logo`}
              />
            ) : (
              <LetterAvatar 
                name={edu.school} 
                bgColor={stringToColor(edu.school)}
              />
            )}
          </SchoolLogo>
          
          <EducationContent>
            <EducationSchool>{edu.school}</EducationSchool>
            <EducationMetadataRow>
              <EducationDegree>
                {edu.degree}{edu.degree && edu.fieldOfStudy ? ', ' : ''}{edu.fieldOfStudy}
              </EducationDegree>
              <EducationDates>{edu.startDate} - {edu.endDate}</EducationDates>
            </EducationMetadataRow>
            {edu.description && (
              <EducationDescription>{edu.description}</EducationDescription>
            )}
            
            {edu.media && edu.media.length > 0 && (
              <MediaRow>
                {edu.media.map((mediaItem, mediaIndex) => {
                  const $isWide = mediaItem.width === 'full' || edu.media.length === 1;
                  
                  if (mediaItem.type === 'image') {
                    return (
                      <MediaContainer key={`media-${index}-${mediaIndex}`} $isWide={$isWide}>
                        <img 
                          src={mediaItem.url} 
                          alt={mediaItem.title || `${edu.school} image`} 
                          style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
                          loading="lazy"
                        />
                        {mediaItem.description && (
                          <div style={{ padding: '8px', fontSize: '0.85rem', color: 'rgba(0,0,0,0.6)' }}>
                            {mediaItem.description}
                          </div>
                        )}
                      </MediaContainer>
                    );
                  } else if (mediaItem.type === 'pdf') {
                    return (
                      <MediaContainer 
                        key={`media-${index}-${mediaIndex}`} 
                        $isWide={$isWide}
                        className="pdf-container"
                      >
                        <a 
                          href={mediaItem.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="pdf-thumbnail"
                        >
                          {mediaItem.thumbnailUrl ? (
                            <img 
                              src={mediaItem.thumbnailUrl} 
                              alt={mediaItem.title || "PDF Document"} 
                              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                              loading="lazy"
                            />
                          ) : (
                            <div className="pdf-overlay">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 2H8C6.9 2 6 2.9 6 4V16C6 17.1 6.9 18 8 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H8V4H20V16ZM4 6H2V20C2 21.1 2.9 22 4 22H18V20H4V6ZM16 12V9C16 8.45 15.55 8 15 8H13V13H15C15.55 13 16 12.55 16 12ZM14 9H15V12H14V9ZM18 11H19V10H18V9H19V8H17V13H18V11ZM10 11H11C11.55 11 12 10.55 12 10V9C12 8.45 11.55 8 11 8H9V13H10V11ZM10 9H11V10H10V9Z" fill="white"/>
                              </svg>
                              View PDF
                            </div>
                          )}
                        </a>
                        {mediaItem.title && (
                          <div className="pdf-title">{mediaItem.title}</div>
                        )}
                      </MediaContainer>
                    );
                  } else if (mediaItem.type === 'embed') {
                    return (
                      <MediaContainer 
                        key={`media-${index}-${mediaIndex}`} 
                        $isWide={$isWide}
                      >
                        <iframe 
                          src={mediaItem.url}
                          title={mediaItem.title || `${edu.school} embed`}
                          frameBorder="0"
                          scrolling="no"
                          allowFullScreen
                          style={{ 
                            width: '100%', 
                            height: mediaItem.height || '225px', 
                            maxWidth: '100%', 
                            borderRadius: '8px' 
                          }}
                        />
                        {mediaItem.description && (
                          <div style={{ padding: '8px', fontSize: '0.85rem', color: 'rgba(0,0,0,0.6)' }}>
                            {mediaItem.description}
                          </div>
                        )}
                      </MediaContainer>
                    );
                  }
                  
                  return null;
                })}
              </MediaRow>
            )}
          </EducationContent>
        </EducationItem>
      ))}
    </SectionContainer>
  );
}; 