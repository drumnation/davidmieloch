import React, { useState, ReactNode } from 'react';
import styled from 'styled-components';
import { 
  SectionContainer,
  ExperienceItem,
  CompanyLogo,
  ExperienceContent,
  ExperienceTitle,
  ExperienceMetadataRow,
  ExperienceCompany,
  ExperienceDates,
  ExperienceLocation,
  ExperienceDescription,
  MediaRow,
  MediaContainer
} from './ExperienceSection.styles';
import { ExperienceSectionProps } from './ExperienceSection.types';
import { stringToColor, LetterAvatar } from '../../utils/avatarHelpers';
import { OLDER_EXPERIENCE } from './ExperienceSection.constants';

// Add a styled divider component
const Divider = styled.div`
  height: 1px;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.05));
  margin: 40px 0;
  width: 100%;
`;

// Add MediaGroup container for group media type
const MediaGroup = styled.div<{ $layout?: 'default' | 'stack'; $width?: string }>`
  display: flex;
  flex-direction: ${props => props.$layout === 'stack' ? 'column' : 'row'};
  flex-wrap: wrap;
  gap: 16px;
  width: ${props => props.$width || '100%'};
  margin-bottom: 16px;
  
  &.half-width-group {
    width: 48.5%;
    flex: 0 0 48.5%;
  }
  
  &.third-width-group {
    width: 31.33%;
    flex: 0 0 31.33%;
  }
  
  &.quarter-width-group {
    width: 23.5%;
    flex: 0 0 23.5%;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    flex: 0 0 100%;
    
    &.half-width-group,
    &.third-width-group,
    &.quarter-width-group {
      width: 100%;
      flex: 0 0 100%;
    }
  }
`;

const MediaGroupContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
  
  > div {
    margin-bottom: 0 !important;
  }
`;

// Image Modal Component
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  cursor: pointer;
`;

const ModalContent = styled.div`
  max-width: 90%;
  max-height: 90%;
  position: relative;
  
  img {
    max-width: 100%;
    max-height: 90vh;
    display: block;
    object-fit: contain;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    background-color: white;
  }
  
  .modal-caption {
    position: absolute;
    bottom: -40px;
    left: 0;
    right: 0;
    text-align: center;
    color: white;
    font-size: 16px;
    padding: 10px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: -40px;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

// Local Accordion component
const AccordionContainer = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

const AccordionHeader = styled.div<{ $isOpen: boolean }>`
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background-color: ${({ $isOpen }) => $isOpen ? 'rgba(0, 0, 0, 0.02)' : 'white'};
  transition: background-color 0.2s ease;
  border-radius: 8px;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const HeaderContent = styled.div`
  flex: 1;
`;

const AccordionTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  color: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  
  &:before {
    content: "";
    display: inline-block;
    width: 6px;
    height: 6px;
    margin-right: 8px;
    background-color: #3366cc;
    border-radius: 50%;
  }
`;

const AccordionSubtitle = styled.p`
  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.6);
  margin: 4px 0 0;
`;

const IconContainer = styled.div<{ $isOpen: boolean }>`
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(${({ $isOpen }) => $isOpen ? '180deg' : '0deg'});
  transition: transform 0.3s ease;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 50%;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const AccordionContent = styled.div<{ $isOpen: boolean }>`
  padding: ${({ $isOpen }) => $isOpen ? '16px' : '0 16px'};
  max-height: ${({ $isOpen }) => $isOpen ? 'none' : '0'};
  opacity: ${({ $isOpen }) => $isOpen ? '1' : '0'};
  overflow: hidden;
  transition: ${({ $isOpen }) => 
    $isOpen 
      ? 'opacity 0.3s ease, padding 0.2s ease' 
      : 'max-height 0.3s ease, opacity 0.2s ease, padding 0.1s ease'
  };
  border-top: ${({ $isOpen }) => $isOpen ? '1px solid rgba(0, 0, 0, 0.1)' : 'none'};
`;

interface AccordionProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  initiallyOpen?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({
  title,
  subtitle,
  children,
  className,
  initiallyOpen = false
}) => {
  const [isOpen, setIsOpen] = useState(initiallyOpen);

  const toggleAccordion = () => {
    setIsOpen(prevState => !prevState);
  };

  return (
    <AccordionContainer className={className}>
      <AccordionHeader $isOpen={isOpen} onClick={toggleAccordion}>
        <HeaderContent>
          <AccordionTitle>{title}</AccordionTitle>
          {subtitle && <AccordionSubtitle>{subtitle}</AccordionSubtitle>}
        </HeaderContent>
        <IconContainer $isOpen={isOpen}>
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.41 0.589844L6 5.16984L10.59 0.589844L12 1.99984L6 7.99984L0 1.99984L1.41 0.589844Z" fill="rgba(0, 0, 0, 0.5)" />
          </svg>
        </IconContainer>
      </AccordionHeader>
      <AccordionContent $isOpen={isOpen}>
        {children}
      </AccordionContent>
    </AccordionContainer>
  );
};

// List of companies that need borders on their logos
const companiesWithBorders = ['scala', 'saturn', 'graphnet', 'kwikpoint'];

// Helper function to check if path is an image file
const isImageFile = (path: string | undefined): boolean => {
  if (!path) return false;
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
  return imageExtensions.some(ext => path.toLowerCase().endsWith(ext));
};

// Function to render an experience item
const renderExperienceItem = (job: any, index: number, renderLogo?: (company: string) => React.ReactNode, setModalImage?: (image: {url: string, title?: string}) => void) => {
  return (
    <ExperienceItem key={`job-${index}`}>
      <CompanyLogo>
        {renderLogo ? (
          renderLogo(job.company)
        ) : job.logoPath && isImageFile(job.logoPath) ? (
          <img 
            src={job.logoPath} 
            alt={`${job.company} logo`}
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'contain',
              borderRadius: '6px',
              ...(companiesWithBorders.includes(job.company.toLowerCase()) && {
                border: '1px solid rgba(0, 0, 0, 0.2)',
                padding: '2px'
              })
            }}
          />
        ) : job.logoPath && job.logoPath.endsWith('.html') ? (
          <iframe 
            src={job.logoPath} 
            style={{ 
              width: '100%', 
              height: '100%', 
              border: 'none' 
            }}
            title={`${job.company} logo`}
          />
        ) : (
          <LetterAvatar 
            name={job.company} 
            bgColor={stringToColor(job.company)} 
          />
        )}
      </CompanyLogo>
      
      <ExperienceContent>
        <ExperienceTitle>{job.title}</ExperienceTitle>
        <ExperienceMetadataRow>
          <ExperienceCompany>{job.company}</ExperienceCompany>
          <ExperienceDates>{job.startDate} - {job.endDate}</ExperienceDates>
          <ExperienceLocation>{job.location}</ExperienceLocation>
        </ExperienceMetadataRow>
        <ExperienceDescription>
          {job.description}
          {job.bulletPoints && job.bulletPoints.length > 0 && (
            <ul>
              {job.bulletPoints.map((point: string, i: number) => (
                <li key={`point-${index}-${i}`}>{point}</li>
              ))}
            </ul>
          )}
        </ExperienceDescription>
        
        {job.media && job.media.length > 0 && (
          <MediaRow>
            {job.media.map((mediaItem: any, mediaIndex: number) => {
              // Check if this is a media item specifically set for special layouts
              const isQuarterWidth = mediaItem.width === '23.5%';
              const isThirdWidth = mediaItem.width === '31.33%';
              const isSpecialLayout = isQuarterWidth || isThirdWidth;
              
              // For default sizing, use normal isWide logic
              const $isWide = !isSpecialLayout && 
                (mediaItem.width === 'full' || mediaItem.width === '100%' || job.media.length === 1);
              
              // Render different media types
              if (mediaItem.type === 'image') {
                // Handle special layouts with specific classes
                const specialLayoutClass = isQuarterWidth 
                  ? "quarter-width-image" 
                  : isThirdWidth 
                    ? "third-width-image" 
                    : "";
                
                // Calculate width style for non-standard percentages
                const widthStyle = !isSpecialLayout && !$isWide && mediaItem.width 
                  ? { flex: `0 0 ${mediaItem.width}`, maxWidth: mediaItem.width } 
                  : {};
                
                return (
                  <MediaContainer 
                    key={`media-${index}-${mediaIndex}`} 
                    $isWide={$isWide}
                    className={specialLayoutClass}
                    style={widthStyle}
                    onClick={() => setModalImage && setModalImage({
                      url: mediaItem.url,
                      title: mediaItem.title || `${job.company} image`
                    })}
                  >
                    <img 
                      src={mediaItem.url} 
                      alt={mediaItem.title || `${job.company} image`} 
                      loading="lazy"
                      style={{ cursor: 'pointer' }}
                    />
                    {mediaItem.title && (
                      <div style={{ 
                        padding: '12px 15px', 
                        fontSize: '1rem', 
                        fontWeight: 500, 
                        backgroundColor: '#f9f9f9', 
                        borderTop: '1px solid #eee' 
                      }}>
                        {mediaItem.title}
                      </div>
                    )}
                    {mediaItem.description && (
                      <div style={{ padding: '8px 15px', fontSize: '0.85rem', color: 'rgba(0,0,0,0.6)' }}>
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
                          loading="lazy"
                        />
                      ) : (
                        <div className="pdf-overlay">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 2H8C6.9 2 6 2.9 6 4V16C6 17.1 6.9 18 8 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H8V4H20V16ZM4 6H2V20C2 21.1 2.9 22 4 22H18V20H4V6ZM16 12V9C16 8.45 15.55 8 15 8H13V13H15C15.55 13 16 12.55 16 12ZM14 9H15V12H14V9ZM18 11H19V10H18V9H19V8H17V13H18V11ZM10 11H11C11.55 11 12 10V9C12 8.45 11.55 8 11 8H9V13H10V11ZM10 9H11V10H10V9Z" fill="white"/>
                          </svg>
                          View PDF
                        </div>
                      )}
                    </a>
                    {mediaItem.title && (
                      <div className="pdf-title">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                          <path d="M20 2H8C6.9 2 6 2.9 6 4V16C6 17.1 6.9 18 8 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H8V4H20V16ZM4 6H2V20C2 21.1 2.9 22 4 22H18V20H4V6ZM16 12V9C16 8.45 15.55 8 15 8H13V13H15C15.55 13 16 12.55 16 12ZM14 9H15V12H14V9ZM18 11H19V10H18V9H19V8H17V13H18V11ZM10 11H11C11.55 11 12 10V9C12 8.45 11.55 8 11 8H9V13H10V11ZM10 9H11V10H10V9Z" fill="#E74C3C"/>
                        </svg>
                        {mediaItem.title}
                      </div>
                    )}
                  </MediaContainer>
                );
              } else if (mediaItem.type === 'embed') {
                return (
                  <MediaContainer 
                    key={`media-${index}-${mediaIndex}`} 
                    $isWide={$isWide}
                  >
                    {mediaItem.url.endsWith('.mp4') || mediaItem.url.includes('.mp4#') ? (
                      <video
                        src={mediaItem.url}
                        title={mediaItem.title || `${job.company} video`}
                        height={mediaItem.height || 400}
                        controls
                        preload="metadata"
                        style={{ width: '100%', height: 'auto', maxHeight: mediaItem.height || 400 }}
                        poster={mediaItem.thumbnailUrl}
                      />
                    ) : (
                      <iframe
                        src={mediaItem.url}
                        title={mediaItem.title || `${job.company} embed`}
                        height={mediaItem.height || 400}
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    )}
                    {mediaItem.description && (
                      <div style={{ padding: '8px', fontSize: '0.85rem', color: 'rgba(0,0,0,0.6)' }}>
                        {mediaItem.description}
                      </div>
                    )}
                  </MediaContainer>
                );
              } else if (mediaItem.type === 'link') {
                return (
                  <MediaContainer 
                    key={`media-${index}-${mediaIndex}`} 
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
                          <img 
                            src={mediaItem.thumbnailUrl} 
                            alt={mediaItem.title || "Blog post"} 
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
                        <p className="link-description">{mediaItem.description}</p>
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
              } else if (mediaItem.type === 'group' && mediaItem.items && mediaItem.items.length > 0) {
                const isHalfWidth = mediaItem.width === '49%' || mediaItem.width === '48%' || mediaItem.width === '48.5%' || mediaItem.width === 'half';
                const isThirdWidth = mediaItem.width === '31.33%' || mediaItem.width === '32%' || mediaItem.width === 'third';
                const isQuarterWidth = mediaItem.width === '23.5%' || mediaItem.width === '24%' || mediaItem.width === '25%' || mediaItem.width === 'quarter';
                
                const groupClass = isQuarterWidth 
                  ? 'quarter-width-group' 
                  : isThirdWidth 
                    ? 'third-width-group' 
                    : isHalfWidth
                      ? 'half-width-group' 
                      : '';
                      
                // Calculate width style for non-standard percentages
                const widthStyle = !groupClass && mediaItem.width 
                  ? { flex: `0 0 ${mediaItem.width}`, maxWidth: mediaItem.width } 
                  : {};
                
                // Function to render a nested media item
                const renderNestedMediaItem = (nestedItem: any, nestedIndex: number) => {
                  if (nestedItem.type === 'image') {
                    return (
                      <div 
                        key={`nested-media-${index}-${mediaIndex}-${nestedIndex}`}
                        style={{ 
                          borderRadius: 0,
                          overflow: 'hidden',
                          boxShadow: 'none',
                          marginBottom: 0,
                          display: 'flex',
                          flexDirection: 'column',
                          borderBottom: nestedIndex < mediaItem.items.length - 1 ? '1px solid rgba(0, 0, 0, 0.08)' : 'none'
                        }}
                      >
                        <img 
                          src={nestedItem.url} 
                          alt={nestedItem.title || `${job.company} image`} 
                          loading="lazy"
                          style={{ 
                            cursor: 'pointer',
                            width: '100%',
                            height: 'auto',
                            display: 'block',
                            borderRadius: 0
                          }}
                          onClick={() => setModalImage && setModalImage({
                            url: nestedItem.url,
                            title: nestedItem.title || `${job.company} image`
                          })}
                        />
                        {nestedItem.title && (
                          <div style={{ 
                            padding: '10px 12px', 
                            fontSize: '0.9rem', 
                            fontWeight: 500, 
                            backgroundColor: '#f9f9f9', 
                            borderTop: '1px solid #eee',
                            borderBottom: nestedIndex < mediaItem.items.length - 1 ? '1px solid rgba(0, 0, 0, 0.08)' : 'none'
                          }}>
                            {nestedItem.title}
                          </div>
                        )}
                        {nestedItem.description && (
                          <div style={{ 
                            padding: '6px 12px', 
                            fontSize: '0.85rem', 
                            color: 'rgba(0,0,0,0.6)' 
                          }}>
                            {nestedItem.description}
                          </div>
                        )}
                      </div>
                    );
                  }
                  return null;
                };
                
                return (
                  <MediaGroup 
                    key={`media-group-${index}-${mediaIndex}`} 
                    className={groupClass}
                    $layout={mediaItem.layout}
                    $width={mediaItem.width}
                    style={widthStyle}
                  >
                    {mediaItem.title && (
                      <div style={{ 
                        width: '100%', 
                        padding: '10px 15px', 
                        fontSize: '1rem', 
                        fontWeight: 600,
                        color: 'rgba(0, 0, 0, 0.75)',  
                        backgroundColor: '#edf2f7', 
                        borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
                      }}>
                        {mediaItem.title}
                      </div>
                    )}
                    {mediaItem.layout === 'stack' ? (
                      <MediaGroupContent>
                        {mediaItem.items.map((nestedItem: any, nestedIndex: number) => 
                          renderNestedMediaItem(nestedItem, nestedIndex)
                        )}
                      </MediaGroupContent>
                    ) : (
                      mediaItem.items.map((nestedItem: any, nestedIndex: number) => 
                        renderNestedMediaItem(nestedItem, nestedIndex)
                      )
                    )}
                  </MediaGroup>
                );
              }
              
              return null;
            })}
          </MediaRow>
        )}
      </ExperienceContent>
    </ExperienceItem>
  );
};

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experiences,
  title = 'Work Experience',
  className = '',
  children,
  renderLogo
}) => {
  const hasOlderExperience = OLDER_EXPERIENCE && OLDER_EXPERIENCE.length > 0;
  const [modalImage, setModalImage] = useState<{url: string, title?: string} | null>(null);
  
  console.log('Experience items with media:', experiences.filter(exp => exp.media?.length).map(exp => ({ company: exp.company, mediaCount: exp.media?.length || 0 })));

  const closeModal = () => {
    setModalImage(null);
  };
  
  return (
    <SectionContainer className={className}>
      <h2>{title}</h2>
      
      {children}
      
      {experiences.map((job, index) => (
        <React.Fragment key={`job-fragment-${index}`}>
          {index > 0 && <Divider />}
          {renderExperienceItem(job, index, renderLogo, setModalImage)}
        </React.Fragment>
      ))}
      
      {hasOlderExperience && (
        <>
          <Divider />
          <Accordion 
            title={`Previous Sales & Marketing Experience (${OLDER_EXPERIENCE.length} Positions)`}
            subtitle="Click to expand and see earlier sales and marketing positions from 2004-2016"
            initiallyOpen={true}
          >
            {OLDER_EXPERIENCE.map((job, index) => (
              <React.Fragment key={`older-job-fragment-${index}`}>
                {index > 0 && <Divider />}
                {renderExperienceItem(job, index, renderLogo, setModalImage)}
              </React.Fragment>
            ))}
          </Accordion>
        </>
      )}
      
      {modalImage && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={closeModal}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="white"/>
              </svg>
            </CloseButton>
            <img src={modalImage.url} alt={modalImage.title || "Full size image"} />
            {modalImage.title && <div className="modal-caption">{modalImage.title}</div>}
          </ModalContent>
        </ModalOverlay>
      )}
    </SectionContainer>
  );
}; 