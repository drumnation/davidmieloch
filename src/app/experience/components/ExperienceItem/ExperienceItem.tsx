import React from 'react';
import Image from 'next/image';
import { 
  StyledExperienceItem, 
  Logo, 
  CompanyInfo, 
  Title, 
  MetadataRow,
  Period, 
  Location,
  Description,
  BulletPoints,
  BulletPoint,
  MediaRow,
  MediaContainer
} from './ExperienceItem.styles';
import { ExperienceItemProps, MediaItem } from './ExperienceItem.types';

export const ExperienceItem: React.FC<ExperienceItemProps> = ({
  title,
  company,
  period,
  location,
  description,
  bulletPoints = [],
  logo,
  media = []
}) => {
  return (
    <StyledExperienceItem>
      <Logo>
        <Image 
          src={logo || '/company-logos/placeholder.png'} 
          alt={`${company} logo`}
          width={64}
          height={64}
        />
      </Logo>
      <CompanyInfo>
        <Title>
          <h3>{title}</h3>
          <h4>{company}</h4>
        </Title>
        <MetadataRow>
          <Period>{period}</Period>
          {location && <Location>{location}</Location>}
        </MetadataRow>
        
        {description && (
          <Description>{description}</Description>
        )}
        
        {bulletPoints.length > 0 && (
          <BulletPoints>
            {bulletPoints.map((point: string, index: number) => (
              <BulletPoint key={index}>{point}</BulletPoint>
            ))}
          </BulletPoints>
        )}
        
        {media.length > 0 && (
          <MediaRow>
            {media.map((mediaItem: MediaItem, mediaIndex: number) => {
              const $isWide = mediaItem.width === 'full' || media.length === 1;
              
              // Render different media types
              if (mediaItem.type === 'image') {
                return (
                  <MediaContainer key={`media-${mediaIndex}`} $isWide={$isWide}>
                    <Image 
                      src={mediaItem.url} 
                      alt={mediaItem.title || `${company} image`} 
                      width={800}
                      height={450}
                      style={{ width: '100%', height: 'auto' }}
                      loading="lazy"
                    />
                    {mediaItem.description && (
                      <div className="media-caption">
                        {mediaItem.description}
                      </div>
                    )}
                  </MediaContainer>
                );
              } else if (mediaItem.type === 'pdf') {
                return (
                  <MediaContainer 
                    key={`media-${mediaIndex}`} 
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
                        <Image 
                          src={mediaItem.thumbnailUrl} 
                          alt={mediaItem.title || "PDF Document"} 
                          width={800}
                          height={450}
                          style={{ 
                            position: 'absolute', 
                            top: 0, 
                            left: 0, 
                            width: '100%', 
                            height: '100%', 
                            objectFit: 'cover' 
                          }}
                          loading="lazy"
                        />
                      ) : (
                        <div className="pdf-overlay">
                          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="24" height="24" rx="4" fill="#f40f02" />
                            <path d="M12 16.5V17.5H7.5V13.5H8.5V16.5H12Z" fill="white"/>
                            <path d="M11.5 9H10.5V13H11.5V9Z" fill="white"/>
                            <path d="M19 11C19 11.552 18.552 12 18 12V13C19.105 13 20 12.105 20 11C20 9.895 19.105 9 18 9V10C18.552 10 19 10.448 19 11Z" fill="white"/>
                            <path d="M16 13H17V10H18V9H16C15.448 9 15 9.448 15 10V12C15 12.552 15.448 13 16 13ZM16 10H17V12H16V10Z" fill="white"/>
                            <path d="M15 16.5V17.5H19.5V16.5H15Z" fill="white"/>
                            <path d="M7 6H19.5C20.052 6 20.5 6.448 20.5 7V19C20.5 19.552 20.052 20 19.5 20H4.5C3.948 20 3.5 19.552 3.5 19V7C3.5 6.448 3.948 6 4.5 6H7ZM4.5 5C3.395 5 2.5 5.895 2.5 7V19C2.5 20.105 3.395 21 4.5 21H19.5C20.605 21 21.5 20.105 21.5 19V7C21.5 5.895 20.605 5 19.5 5H4.5Z" fill="white"/>
                          </svg>
                          <span>View PDF</span>
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
                    key={`media-${mediaIndex}`} 
                    $isWide={$isWide}
                  >
                    <iframe
                      src={mediaItem.url}
                      title={mediaItem.title || `${company} embed`}
                      height={mediaItem.height || 400}
                      width="100%"
                      style={{ border: 'none' }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                    {mediaItem.description && (
                      <div className="media-caption">
                        {mediaItem.description}
                      </div>
                    )}
                  </MediaContainer>
                );
              } else if (mediaItem.type === 'link') {
                return (
                  <MediaContainer 
                    key={`media-${mediaIndex}`} 
                    $isWide={$isWide}
                    className="link-container"
                  >
                    <a 
                      href={mediaItem.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="link-preview"
                    >
                      {mediaItem.thumbnailUrl ? (
                        <Image 
                          src={mediaItem.thumbnailUrl} 
                          alt={mediaItem.title || "Blog post"} 
                          width={800}
                          height={450}
                          style={{ 
                            width: '100%', 
                            height: 'auto',
                            objectFit: 'cover',
                            borderRadius: '8px 8px 0 0'
                          }}
                          loading="lazy"
                        />
                      ) : (
                        <div className="link-placeholder">
                          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="24" height="24" rx="4" fill="#3366cc" />
                            <path d="M7 8H17C17.55 8 18 8.45 18 9V15C18 15.55 17.55 16 17 16H7C6.45 16 6 15.55 6 15V9C6 8.45 6.45 8 7 8ZM7 15H17V9H7V15Z" fill="white"/>
                            <path d="M10 10H14V12H10V10Z" fill="white"/>
                            <path d="M8 17H16V18H8V17Z" fill="white"/>
                            <path d="M8 19H16V20H8V19Z" fill="white"/>
                          </svg>
                          <span>View Article</span>
                        </div>
                      )}
                    </a>
                    <div className="media-caption">
                      {mediaItem.title}
                      {mediaItem.description && (
                        <div className="link-description" style={{ marginTop: '4px', fontSize: '0.9em' }}>
                          {mediaItem.description}
                        </div>
                      )}
                    </div>
                  </MediaContainer>
                );
              }
              
              return null;
            })}
          </MediaRow>
        )}
      </CompanyInfo>
    </StyledExperienceItem>
  );
}; 