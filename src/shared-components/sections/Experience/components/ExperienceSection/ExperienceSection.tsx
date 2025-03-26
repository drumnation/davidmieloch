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
`;

const AccordionSubtitle = styled.p`
  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.6);
  margin: 4px 0 0;
`;

const IconContainer = styled.div<{ $isOpen: boolean }>`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(${({ $isOpen }) => $isOpen ? '180deg' : '0deg'});
  transition: transform 0.3s ease;
`;

const AccordionContent = styled.div<{ $isOpen: boolean }>`
  padding: ${({ $isOpen }) => $isOpen ? '16px' : '0 16px'};
  max-height: ${({ $isOpen }) => $isOpen ? '2000px' : '0'};
  opacity: ${({ $isOpen }) => $isOpen ? '1' : '0'};
  overflow: hidden;
  transition: all 0.3s ease;
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
const renderExperienceItem = (job: any, index: number, renderLogo?: (company: string) => React.ReactNode) => {
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
              ...(companiesWithBorders.includes(job.company.toLowerCase()) && {
                border: '1px solid rgba(0, 0, 0, 0.2)',
                borderRadius: '6px',
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
              const $isWide = mediaItem.width === 'full' || job.media.length === 1;
              
              // Render different media types
              if (mediaItem.type === 'image') {
                return (
                  <MediaContainer key={`media-${index}-${mediaIndex}`} $isWide={$isWide}>
                    <img 
                      src={mediaItem.url} 
                      alt={mediaItem.title || `${job.company} image`} 
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
                      title={mediaItem.title || `${job.company} embed`}
                      height={mediaItem.height || 400}
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
      </ExperienceContent>
    </ExperienceItem>
  );
};

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experiences,
  title = 'Professional Experience',
  className,
  children,
  renderLogo
}) => {
  const hasOlderExperience = OLDER_EXPERIENCE && OLDER_EXPERIENCE.length > 0;
  
  return (
    <SectionContainer className={className}>
      <h2>{title}</h2>
      
      {children}
      
      {experiences.map((job, index) => renderExperienceItem(job, index, renderLogo))}
      
      {hasOlderExperience && (
        <Accordion 
          title="Previous Sales & Marketing Experience" 
          subtitle="Click to expand and see earlier positions"
          initiallyOpen={false}
        >
          {OLDER_EXPERIENCE.map((job, index) => renderExperienceItem(job, index, renderLogo))}
        </Accordion>
      )}
    </SectionContainer>
  );
}; 