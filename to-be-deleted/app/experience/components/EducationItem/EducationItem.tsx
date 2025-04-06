import React from 'react';
import Image from 'next/image';
import { 
  StyledEducationItem, 
  Logo, 
  SchoolInfo, 
  Title, 
  MetadataRow,
  Period, 
  Description,
  Activities,
  MediaContainer,
  MediaRow
} from './EducationItem.styles';
import { EducationItemProps, MediaItem } from './EducationItem.types';

export const EducationItem: React.FC<EducationItemProps> = ({
  school,
  degree,
  fieldOfStudy,
  period,
  description,
  activities,
  logo,
  mediaUrl,
  mediaType,
  media = []
}) => {
  return (
    <StyledEducationItem>
      <Logo>
        <Image 
          src={logo || '/school-logos/placeholder.png'} 
          alt={`${school} logo`}
          width={64}
          height={64}
        />
      </Logo>
      <SchoolInfo>
        <Title>
          <h3>{school}</h3>
          <h4>{degree} {fieldOfStudy && `- ${fieldOfStudy}`}</h4>
        </Title>
        <MetadataRow>
          <Period>{period}</Period>
        </MetadataRow>
        
        {description && (
          <Description>{description}</Description>
        )}
        
        {mediaUrl && (
          <MediaContainer>
            {mediaType === 'image' ? (
              <Image 
                src={mediaUrl}
                alt={`${school} media`}
                width={400}
                height={225}
                style={{ 
                  maxWidth: '100%', 
                  height: 'auto', 
                  borderRadius: '8px',
                  objectFit: 'cover'
                }}
              />
            ) : (
              <iframe 
                src={mediaUrl}
                title={`${school} media`}
                frameBorder="0"
                scrolling="no"
                allowFullScreen
                style={{ 
                  width: '400px', 
                  height: '225px', 
                  maxWidth: '100%', 
                  borderRadius: '8px' 
                }}
              />
            )}
          </MediaContainer>
        )}
        
        {activities && (
          <Activities>
            <strong>Activities: </strong> {activities}
          </Activities>
        )}
        
        {media.length > 0 && (
          <MediaRow>
            {media.map((mediaItem: MediaItem, mediaIndex: number) => {
              const $isWide = mediaItem.width === 'full' || media.length === 1;
              
              if (mediaItem.type === 'image') {
                return (
                  <MediaContainer key={`media-${mediaIndex}`} $isWide={$isWide}>
                    <Image 
                      src={mediaItem.url} 
                      alt={mediaItem.title || `${school} image`} 
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
                      title={mediaItem.title || `${school} embed`}
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
                    $isWide={$isWide || mediaItem.width === '100%'}
                    className="link-container"
                  >
                    <div className="link-thumbnail">
                      {mediaItem.thumbnailUrl ? (
                        <a 
                          href={mediaItem.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <Image 
                            src={mediaItem.thumbnailUrl} 
                            alt={mediaItem.title || "Blog post"} 
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
                        </a>
                      ) : (
                        <div className="link-placeholder">
                          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="48" height="48" rx="8" fill="#3366cc" />
                            <path d="M14 16H34C35.1 16 36 16.9 36 18V30C36 31.1 35.1 32 34 32H14C12.9 32 12 31.1 12 30V18C12 16.9 12.9 16 14 16ZM14 30H34V18H14V30Z" fill="white"/>
                            <path d="M20 20H28V24H20V20Z" fill="white"/>
                            <path d="M16 34H32V36H16V34Z" fill="white"/>
                            <path d="M16 38H32V40H16V38Z" fill="white"/>
                          </svg>
                          <span className="placeholder-text">Blog Post Preview</span>
                        </div>
                      )}
                    </div>
                    <div className="link-content">
                      <h4 className="link-title">{mediaItem.title}</h4>
                      {mediaItem.description && (
                        <div className="link-description">{mediaItem.description}</div>
                      )}
                      <a 
                        href={mediaItem.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="link-button"
                      >
                        View Article
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12.6667 12.6667H3.33333V3.33333H8V2H3.33333C2.6 2 2 2.6 2 3.33333V12.6667C2 13.4 2.6 14 3.33333 14H12.6667C13.4 14 14 13.4 14 12.6667V8H12.6667V12.6667ZM9.33333 2V3.33333H11.7267L5.17333 9.88667L6.11333 10.8267L12.6667 4.27333V6.66667H14V2H9.33333Z" fill="white"/>
                        </svg>
                      </a>
                    </div>
                  </MediaContainer>
                );
              }
              
              return null;
            })}
          </MediaRow>
        )}
      </SchoolInfo>
    </StyledEducationItem>
  );
}; 