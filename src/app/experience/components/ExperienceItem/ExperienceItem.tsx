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
          <Description dangerouslySetInnerHTML={{ __html: description }} />
        )}
        
        {bulletPoints.length > 0 && (
          <BulletPoints>
            {bulletPoints.map((point, index) => (
              <BulletPoint key={index}>{point}</BulletPoint>
            ))}
          </BulletPoints>
        )}
        
        {media.length > 0 && (
          <MediaRow>
            {media.map((mediaItem, mediaIndex) => {
              const isWide = mediaItem.width === 'full' || media.length === 1;
              
              // Render different media types
              if (mediaItem.type === 'image') {
                return (
                  <MediaContainer key={`media-${mediaIndex}`} isWide={isWide}>
                    <Image 
                      src={mediaItem.url} 
                      alt={mediaItem.title || `${company} image`} 
                      width={800}
                      height={450}
                      style={{ width: '100%', height: 'auto' }}
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
                    key={`media-${mediaIndex}`} 
                    isWide={isWide}
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
                    key={`media-${mediaIndex}`} 
                    isWide={isWide}
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
      </CompanyInfo>
    </StyledExperienceItem>
  );
}; 