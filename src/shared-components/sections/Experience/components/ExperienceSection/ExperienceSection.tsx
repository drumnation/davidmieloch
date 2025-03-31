import React, { useState, ReactNode } from 'react';
import Image from 'next/image';
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
  MediaContainer,
  ExperienceHeader,
  HeaderLeft,
  HeaderContent,
  TechnologiesList,
  TechnologyItem,
} from './ExperienceSection.styles';
import { ExperienceSectionProps, ExperienceItem as ExperienceItemType, MediaItem } from './ExperienceSection.types'; // Renamed ExperienceItem to avoid conflict
import { stringToColor, LetterAvatar } from '../../utils/avatarHelpers';
import { OLDER_EXPERIENCE } from './ExperienceSection.constants';
import { MarkdownRenderer } from '../../../../molecules/MarkdownRenderer';
import { FoldableContent } from '../../../../molecules/FoldableContent';
import { TechIcon } from '../../../../atoms/TechIcon';
// Import icons for bullet points
import {
  FaCode, FaDatabase, FaCloud, FaUsers, FaTools, FaChartLine,
  FaLightbulb, FaBook, FaCogs, FaServer, FaMobileAlt, FaUserShield,
  FaPencilAlt, FaFileAlt, FaTasks, FaRocket, // Removed FaLock, FaUserCog
  FaSearch, FaHandshake, FaGlobe, FaRegCheckCircle, FaBug
} from 'react-icons/fa';

// Removed unused Divider component

// Add styled components for custom bullet points with icons
const BulletList = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const BulletItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;

const BulletIcon = styled.div`
  flex-shrink: 0;
  background: #f5f5f5;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  
  svg {
    color: #555;
    width: 14px;
    height: 14px;
    transition: color 0.2s ease;
  }
  
  &:hover {
    background: #eef1f6;
    svg {
      color: #3366cc;
    }
  }
`;

const BulletText = styled.div`
  flex: 1;
`;

// Styled component for enhanced company description
const CompanyDescription = styled.div`
  margin-bottom: 26px;
  padding: 1px 0;
  transform: scale(1); /* Force repaint */
  
  /* Target the paragraph directly */
  & > div > p,
  & > div div p {
    font-size: 16px !important;
    line-height: 1.5 !important;
    color: rgba(0, 0, 0, 0.85) !important;
    font-weight: 500 !important;
    margin-bottom: 0.8em !important;
  }
  
  @media screen and (min-width: 768px) {
    & > div > p,
    & > div div p {
      font-size: 18px !important;
    }
  }
  
  & > div > p:last-child,
  & > div div p:last-child {
    margin-bottom: 0 !important;
  }
  
  /* Override any compact styles from MarkdownRenderer */
  & > div {
    font-size: inherit !important;
  }
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
  
  img { // Keep this for potential non-Next.js images if needed elsewhere, or remove if fully migrated
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

// Helper function to check if path is an image file
const isImageFile = (path: string | undefined): boolean => {
  if (!path) return false;
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
  return imageExtensions.some(ext => path.toLowerCase().endsWith(ext));
};

// Helper function to determine which icon to use based on bullet point content
const getBulletIcon = (text: string) => {
  const lowerText = text.toLowerCase();

  if (lowerText.includes('develop') || lowerText.includes('code') || lowerText.includes('program') || lowerText.includes('implement')) {
    return <FaCode />;
  } else if (lowerText.includes('database') || lowerText.includes('data') || lowerText.includes('sql')) {
    return <FaDatabase />;
  } else if (lowerText.includes('cloud') || lowerText.includes('aws') || lowerText.includes('azure') || lowerText.includes('infrastructure')) {
    return <FaCloud />;
  } else if (lowerText.includes('lead') || lowerText.includes('team') || lowerText.includes('manage') || lowerText.includes('collaborat')) {
    return <FaUsers />;
  } else if (lowerText.includes('tool') || lowerText.includes('build') || lowerText.includes('construct')) {
    return <FaTools />;
  } else if (lowerText.includes('analytics') || lowerText.includes('growth') || lowerText.includes('improve') || lowerText.includes('metric')) {
    return <FaChartLine />;
  } else if (lowerText.includes('design') || lowerText.includes('architec') || lowerText.includes('creat')) {
    return <FaLightbulb />;
  } else if (lowerText.includes('learn') || lowerText.includes('research') || lowerText.includes('study')) {
    return <FaBook />;
  } else if (lowerText.includes('config') || lowerText.includes('settings') || lowerText.includes('setup')) {
    return <FaCogs />;
  } else if (lowerText.includes('server') || lowerText.includes('backend') || lowerText.includes('api')) {
    return <FaServer />;
  } else if (lowerText.includes('mobile') || lowerText.includes('app') || lowerText.includes('responsive')) {
    return <FaMobileAlt />;
  } else if (lowerText.includes('security') || lowerText.includes('protect') || lowerText.includes('privacy')) {
    return <FaUserShield />;
  } else if (lowerText.includes('write') || lowerText.includes('document') || lowerText.includes('review')) {
    return <FaPencilAlt />;
  } else if (lowerText.includes('launch') || lowerText.includes('deploy') || lowerText.includes('release')) {
    return <FaRocket />;
  } else if (lowerText.includes('test') || lowerText.includes('debug') || lowerText.includes('fix')) {
    return <FaBug />;
  } else if (lowerText.includes('client') || lowerText.includes('partner') || lowerText.includes('stakeholder')) {
    return <FaHandshake />;
  } else if (lowerText.includes('global') || lowerText.includes('international') || lowerText.includes('worldwide')) {
    return <FaGlobe />;
  } else if (lowerText.includes('complete') || lowerText.includes('achieve') || lowerText.includes('success') || lowerText.includes('deliver')) {
    return <FaRegCheckCircle />;
  } else if (lowerText.includes('search') || lowerText.includes('find') || lowerText.includes('discover')) {
    return <FaSearch />;
  } else if (lowerText.includes('task') || lowerText.includes('project')) {
    return <FaTasks />;
  } else if (lowerText.includes('file') || lowerText.includes('report') || lowerText.includes('document')) {
    return <FaFileAlt />;
  } else {
    // Default icon if no specific match
    return <FaRegCheckCircle />;
  }
};

// Function to render an experience item
const renderExperienceItem = (job: ExperienceItemType, index: number, renderLogo?: (company: string) => React.ReactNode, setModalImage?: (image: {url: string, title?: string}) => void) => {
  const logoSrc = job.logoPath; // Keep original path for iframe check

  return (
    <ExperienceItem key={`job-${index}`}>
      {job.technologies && job.technologies.length > 0 && (
        <TechnologiesList className="technologies-list">
          {job.technologies.map((tech: string) => (
            <TechnologyItem key={tech}>
              <TechIcon
                name={tech}
                size={20}
                showLabel={true}
                labelPosition="right"
                showTooltip={true}
              />
            </TechnologyItem>
          ))}
        </TechnologiesList>
      )}

      <ExperienceHeader className="project-header">
        <HeaderLeft>
          <CompanyLogo>
            {renderLogo ? (
              renderLogo(job.company)
            ) : logoSrc && isImageFile(logoSrc) ? (
              <Image
                src={logoSrc} // Use checked logoSrc
                alt={`${job.company} logo`}
                layout="fill"
                objectFit="contain"
                style={{
                  borderRadius: '6px',
                  ...(job.showBorder && {
                    border: '1px solid rgba(0, 0, 0, 0.2)',
                    padding: '2px',
                  }),
                }}
              />
            ) : logoSrc && logoSrc.endsWith('.html') ? (
              <iframe
                src={logoSrc}
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
          <HeaderContent>
            <ExperienceTitle>{job.title}</ExperienceTitle>
            <ExperienceMetadataRow>
              <ExperienceCompany>{job.company}</ExperienceCompany>
              <ExperienceDates>{job.startDate} - {job.endDate}</ExperienceDates>
              <ExperienceLocation>{job.location}</ExperienceLocation>
            </ExperienceMetadataRow>
          </HeaderContent>
        </HeaderLeft>
      </ExperienceHeader>

      <ExperienceContent>
        <ExperienceDescription>
          {job.foldable ? (
            <FoldableContent maxHeight={200} customMaxHeight="250px">
              <CompanyDescription>
                <MarkdownRenderer
                  content={job.description}
                  compact={true}
                />
              </CompanyDescription>
            </FoldableContent>
          ) : (
            <CompanyDescription>
              <MarkdownRenderer
                content={job.description}
                compact={true}
              />
            </CompanyDescription>
          )}

          {job.bulletPoints && job.bulletPoints.length > 0 && (
            <BulletList>
              {job.bulletPoints.map((point: string, i: number) => (
                <BulletItem key={`point-${index}-${i}`}>
                  <BulletIcon>{getBulletIcon(point)}</BulletIcon>
                  <BulletText>{point}</BulletText>
                </BulletItem>
              ))}
            </BulletList>
          )}
        </ExperienceDescription>

        {job.media && job.media.length > 0 && (
          <MediaRow>
            {job.media.map((mediaItem: MediaItem, mediaIndex: number) => {
              // Check if this is a media item specifically set for special layouts
              const isQuarterWidth = mediaItem.width === '23.5%';
              const isThirdWidth = mediaItem.width === '31.33%';
              const isSpecialLayout = isQuarterWidth || isThirdWidth;

              // For default sizing, use normal isWide logic
              const $isWide = !isSpecialLayout &&
                (mediaItem.width === 'full' || mediaItem.width === '100%' || (job.media?.length === 1)); // Added optional chaining for job.media

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

                const titleLogoSrc = mediaItem.titleLogoPath || job.logoPath;

                return (
                  <MediaContainer
                    key={`media-${index}-${mediaIndex}`}
                    $isWide={$isWide}
                    className={specialLayoutClass}
                    style={widthStyle}
                  >
                    <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9' /* Default aspect ratio, adjust if needed */ }}>
                      {mediaItem.url && ( // Check if url exists
                        <Image
                          src={mediaItem.url}
                          alt={mediaItem.title || `${job.company} image`}
                          layout="fill"
                          objectFit="cover" // Or "contain" depending on desired behavior
                          loading="lazy"
                          style={{ cursor: 'pointer' }}
                          onClick={() => {
                            if (setModalImage && mediaItem.url) { // Check url inside handler
                              setModalImage({
                                url: mediaItem.url,
                                title: mediaItem.title || `${job.company} image`
                              });
                            }
                          }}
                        />
                      )}
                    </div>
                    {mediaItem.title && (
                      <div style={{
                        padding: '12px 15px',
                        fontSize: '1rem',
                        fontWeight: 500,
                        backgroundColor: '#f9f9f9',
                        borderTop: '1px solid #eee',
                        display: 'flex',
                        alignItems: 'center'
                      }}>
                        {mediaItem.showLogo && titleLogoSrc && ( // Check if titleLogoSrc exists
                          <Image
                            src={titleLogoSrc}
                            alt={`${job.company} logo`}
                            width={20}
                            height={20}
                            objectFit="contain"
                            style={{
                              marginRight: '8px',
                              borderRadius: mediaItem.logoHasBorderRadius === false ? '0' : '6px',
                              overflow: 'visible',
                              backgroundColor: mediaItem.logoHasBorderRadius === false ? 'transparent' : '#f8f8f8',
                              padding: mediaItem.logoHasBorderRadius === false ? '0' : '3px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              ...(mediaItem.logoHasBorder && {
                                border: '1px solid rgba(0, 0, 0, 0.2)',
                                padding: '1px'
                              })
                            }}
                          />
                        )}
                        {mediaItem.title}
                      </div>
                    )}
                    {mediaItem.description && (
                      <div style={{ padding: '8px 15px', fontSize: '0.85rem', color: 'rgba(0,0,0,0.6)' }}>
                        {mediaItem.foldable ? (
                          <FoldableContent maxHeight={100} customMaxHeight="120px">
                            <MarkdownRenderer content={mediaItem.description || ''} compact={true} />
                          </FoldableContent>
                        ) : (
                          <MarkdownRenderer content={mediaItem.description || ''} compact={true} />
                        )}
                      </div>
                    )}
                  </MediaContainer>
                );
              } else if (mediaItem.type === 'pdf') {
                 const titleLogoSrc = mediaItem.titleLogoPath || job.logoPath;
                return (
                  <MediaContainer
                    key={`media-${index}-${mediaIndex}`}
                    $isWide={$isWide}
                    className="pdf-container"
                  >
                    <a
                      href={mediaItem.url || '#'} // Provide fallback href
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pdf-thumbnail"
                      style={{ position: 'relative', display: 'block', aspectRatio: '4/3', backgroundColor: '#eee' }} // Ensure container has dimensions
                    >
                      {mediaItem.thumbnailUrl ? (
                        <Image
                          src={mediaItem.thumbnailUrl}
                          alt={mediaItem.title || "PDF Document"}
                          layout="fill"
                          objectFit="cover"
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
                      <div className="pdf-title" style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center'
                        }}>
                          {mediaItem.showLogo && titleLogoSrc && ( // Check if titleLogoSrc exists
                            <Image
                              src={titleLogoSrc}
                              alt={`${job.company} logo`}
                              width={20}
                              height={20}
                              objectFit="contain"
                              style={{
                                marginRight: '8px',
                                borderRadius: mediaItem.logoHasBorderRadius === false ? '0' : '6px',
                                overflow: 'visible',
                                backgroundColor: mediaItem.logoHasBorderRadius === false ? 'transparent' : '#f8f8f8',
                                padding: mediaItem.logoHasBorderRadius === false ? '0' : '3px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                ...(mediaItem.logoHasBorder && {
                                  border: '1px solid rgba(0, 0, 0, 0.2)',
                                  padding: '1px'
                                })
                              }}
                            />
                          )}
                          {mediaItem.title}
                        </div>
                        <span style={{
                          background: '#E74C3C',
                          color: 'white',
                          fontSize: '0.7rem',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          fontWeight: 'bold',
                          textTransform: 'uppercase'
                        }}>PDF</span>
                      </div>
                    )}
                    {mediaItem.description && (
                      <div style={{ padding: '8px 15px', fontSize: '0.85rem', color: 'rgba(0,0,0,0.6)' }}>
                        {mediaItem.foldable ? (
                          <FoldableContent maxHeight={100} customMaxHeight="120px">
                            <MarkdownRenderer content={mediaItem.description || ''} compact={true} />
                          </FoldableContent>
                        ) : (
                          <MarkdownRenderer content={mediaItem.description || ''} compact={true} />
                        )}
                      </div>
                    )}
                  </MediaContainer>
                );
              } else if (mediaItem.type === 'embed') {
                 const titleLogoSrc = mediaItem.titleLogoPath || job.logoPath;
                return (
                  <MediaContainer
                    key={`media-${index}-${mediaIndex}`}
                    $isWide={$isWide}
                  >
                    {mediaItem.url && (mediaItem.url.endsWith('.mp4') || mediaItem.url.includes('.mp4#')) ? ( // Check url exists
                      <video
                        src={mediaItem.url}
                        title={mediaItem.title || `${job.company} video`}
                        height={mediaItem.height || 400}
                        controls
                        preload="metadata"
                        style={{ width: '100%', height: 'auto', maxHeight: mediaItem.height || 400 }}
                        poster={mediaItem.thumbnailUrl}
                      />
                    ) : mediaItem.url ? ( // Check url exists
                      <iframe
                        src={mediaItem.url}
                        title={mediaItem.title || `${job.company} embed`}
                        height={mediaItem.height || 400}
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : null}
                    {mediaItem.title && (
                      <div style={{
                        padding: '8px',
                        fontSize: '1rem',
                        fontWeight: 500,
                        borderTop: '1px solid #eee',
                        backgroundColor: '#f9f9f9',
                        display: 'flex',
                        alignItems: 'center'
                      }}>
                        {mediaItem.showLogo && titleLogoSrc && ( // Check if titleLogoSrc exists
                          <Image
                            src={titleLogoSrc}
                            alt={`${job.company} logo`}
                            width={20}
                            height={20}
                            objectFit="contain"
                            style={{
                              marginRight: '8px',
                              borderRadius: mediaItem.logoHasBorderRadius === false ? '0' : '6px',
                              overflow: 'visible',
                              backgroundColor: mediaItem.logoHasBorderRadius === false ? 'transparent' : '#f8f8f8',
                              padding: mediaItem.logoHasBorderRadius === false ? '0' : '3px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              ...(mediaItem.logoHasBorder && {
                                border: '1px solid rgba(0, 0, 0, 0.2)',
                                padding: '1px'
                              })
                            }}
                          />
                        )}
                        {mediaItem.title}
                      </div>
                    )}
                    {mediaItem.description && (
                      <div style={{ padding: '8px', fontSize: '0.85rem', color: 'rgba(0,0,0,0.6)' }}>
                        {mediaItem.foldable ? (
                          <FoldableContent maxHeight={100} customMaxHeight="120px">
                            <MarkdownRenderer content={mediaItem.description || ''} compact={true} />
                          </FoldableContent>
                        ) : (
                          <MarkdownRenderer content={mediaItem.description || ''} compact={true} />
                        )}
                      </div>
                    )}
                  </MediaContainer>
                );
              } else if (mediaItem.type === 'link') {
                 const titleLogoSrc = mediaItem.titleLogoPath || job.logoPath;
                return (
                  <MediaContainer
                    key={`media-${index}-${mediaIndex}`}
                    $isWide={$isWide || mediaItem.width === '100%'}
                    className="link-container"
                  >
                    <div className="link-thumbnail" style={{ position: 'relative', aspectRatio: '16/9', backgroundColor: '#eee' }}>
                      {mediaItem.thumbnailUrl ? (
                        <a
                          href={mediaItem.url || '#'} // Provide fallback href
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ display: 'block', width: '100%', height: '100%' }}
                        >
                          <Image
                            src={mediaItem.thumbnailUrl}
                            alt={mediaItem.title || "Blog post"}
                            layout="fill"
                            objectFit="cover"
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
                      <h4 className="link-title" style={{
                        display: 'flex',
                        alignItems: 'center'
                      }}>
                        {mediaItem.showLogo && titleLogoSrc && ( // Check if titleLogoSrc exists
                          <Image
                            src={titleLogoSrc}
                            alt={`${job.company} logo`}
                            width={20}
                            height={20}
                            objectFit="contain"
                            style={{
                              marginRight: '8px',
                              borderRadius: mediaItem.logoHasBorderRadius === false ? '0' : '6px',
                              overflow: 'visible',
                              backgroundColor: mediaItem.logoHasBorderRadius === false ? 'transparent' : '#f8f8f8',
                              padding: mediaItem.logoHasBorderRadius === false ? '0' : '3px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              ...(mediaItem.logoHasBorder && {
                                border: '1px solid rgba(0, 0, 0, 0.2)',
                                padding: '1px'
                              })
                            }}
                          />
                        )}
                        {mediaItem.title}
                      </h4>
                      <div className="link-description">
                        {mediaItem.foldable ? (
                          <FoldableContent maxHeight={100} customMaxHeight="120px">
                            <MarkdownRenderer content={mediaItem.description || ''} compact={true} />
                          </FoldableContent>
                        ) : (
                          <MarkdownRenderer content={mediaItem.description || ''} compact={true} />
                        )}
                      </div>
                      <a
                        href={mediaItem.url || '#'} // Provide fallback href
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

                 const titleLogoSrc = mediaItem.titleLogoPath || job.logoPath;

                // Function to render a nested media item
                const renderNestedMediaItem = (nestedItem: MediaItem, nestedIndex: number) => {
                  const nestedTitleLogoSrc = nestedItem.titleLogoPath || job.logoPath;
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
                          borderBottom: nestedIndex < (mediaItem.items?.length || 0) - 1 ? '1px solid rgba(0, 0, 0, 0.08)' : 'none' // Optional chaining
                        }}
                      >
                        {nestedItem.url && ( // Check url exists
                          <Image
                            src={nestedItem.url}
                            alt={nestedItem.title || `${job.company} image`}
                            layout="responsive" // Or fill if parent has position relative and dimensions
                            width={1600} // Example width, adjust as needed
                            height={900} // Example height, adjust as needed
                            loading="lazy"
                            style={{
                              cursor: 'pointer',
                              display: 'block',
                              borderRadius: 0
                            }}
                            onClick={() => {
                              if (setModalImage && nestedItem.url) { // Check url inside handler
                                setModalImage({
                                  url: nestedItem.url,
                                  title: nestedItem.title || `${job.company} image`
                                });
                              }
                            }}
                          />
                        )}
                        {nestedItem.title && (
                          <div style={{
                            padding: '10px 12px',
                            fontSize: '0.9rem',
                            fontWeight: 500,
                            backgroundColor: '#f9f9f9',
                            borderTop: '1px solid #eee',
                            borderBottom: nestedIndex < (mediaItem.items?.length || 0) - 1 ? '1px solid rgba(0, 0, 0, 0.08)' : 'none', // Optional chaining
                            display: 'flex',
                            alignItems: 'center'
                          }}>
                            {nestedItem.showLogo && nestedTitleLogoSrc && ( // Check nestedTitleLogoSrc exists
                              <Image
                                src={nestedTitleLogoSrc}
                                alt={`${job.company} logo`}
                                width={20}
                                height={20}
                                objectFit="contain"
                                style={{
                                  marginRight: '8px',
                                  borderRadius: nestedItem.logoHasBorderRadius === false ? '0' : '6px', // Use nestedItem here
                                  overflow: 'visible',
                                  backgroundColor: nestedItem.logoHasBorderRadius === false ? 'transparent' : '#f8f8f8', // Use nestedItem here
                                  padding: nestedItem.logoHasBorderRadius === false ? '0' : '3px', // Use nestedItem here
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  ...(nestedItem.logoHasBorder && { // Use nestedItem here
                                    border: '1px solid rgba(0, 0, 0, 0.2)',
                                    padding: '1px'
                                  })
                                }}
                              />
                            )}
                            {nestedItem.title}
                          </div>
                        )}
                        {nestedItem.description && (
                          <div style={{
                            padding: '6px 12px',
                            fontSize: '0.85rem',
                            color: 'rgba(0,0,0,0.6)'
                          }}>
                            {nestedItem.foldable ? (
                              <FoldableContent maxHeight={100} customMaxHeight="120px">
                                <MarkdownRenderer content={nestedItem.description || ''} compact={true} />
                              </FoldableContent>
                            ) : (
                              <MarkdownRenderer content={nestedItem.description || ''} compact={true} />
                            )}
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
                        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                        display: 'flex',
                        alignItems: 'center'
                      }}>
                        {mediaItem.showLogo && titleLogoSrc && ( // Check titleLogoSrc exists
                          <Image
                            src={titleLogoSrc}
                            alt={`${job.company} logo`}
                            width={20}
                            height={20}
                            objectFit="contain"
                            style={{
                              marginRight: '8px',
                              borderRadius: mediaItem.logoHasBorderRadius === false ? '0' : '6px',
                              overflow: 'visible',
                              backgroundColor: mediaItem.logoHasBorderRadius === false ? 'transparent' : '#f8f8f8',
                              padding: mediaItem.logoHasBorderRadius === false ? '0' : '3px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              ...(mediaItem.logoHasBorder && {
                                border: '1px solid rgba(0, 0, 0, 0.2)',
                                padding: '1px'
                              })
                            }}
                          />
                        )}
                        {mediaItem.title}
                      </div>
                    )}
                    {mediaItem.layout === 'stack' ? (
                      <MediaGroupContent>
                        {mediaItem.items?.map((nestedItem: MediaItem, nestedIndex: number) => // Optional chaining
                          renderNestedMediaItem(nestedItem, nestedIndex)
                        )}
                      </MediaGroupContent>
                    ) : (
                      mediaItem.items?.map((nestedItem: MediaItem, nestedIndex: number) => // Optional chaining
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
        <React.Fragment key={`job-${index}`}>
          {renderExperienceItem(job, index, renderLogo, setModalImage)}
        </React.Fragment>
      ))}

      {hasOlderExperience && (
        <Accordion
          title={`Previous Sales & Marketing Experience (${OLDER_EXPERIENCE.length} Positions)`}
          subtitle="Click to expand and see earlier sales and marketing positions from 2004-2016"
          initiallyOpen={true}
        >
          {[...OLDER_EXPERIENCE].sort((a, b) => {
            // Sort by start date (most recent first)
            // Convert month names to numbers
            const monthToNum: Record<string, number> = {
              'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5, 'Jun': 6,
              'Jul': 7, 'Aug': 8, 'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12
            };

            const aDateParts = a.startDate.split(' ');
            const bDateParts = b.startDate.split(' ');

            const aYear = parseInt(aDateParts[1] || '0');
            const bYear = parseInt(bDateParts[1] || '0');

            // Sort by year (descending)
            if (aYear !== bYear) {
              return bYear - aYear;
            }

            // If years are the same, sort by month (descending)
            const aMonth = monthToNum[aDateParts[0]] || 0;
            const bMonth = monthToNum[bDateParts[0]] || 0;

            return bMonth - aMonth;
          }).map((job, index) => (
            <React.Fragment key={`older-job-${index}`}>
              {renderExperienceItem(job as ExperienceItemType, index, renderLogo, setModalImage)} {/* Cast job to ExperienceItemType */}
            </React.Fragment>
          ))}
        </Accordion>
      )}

      {modalImage && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={closeModal}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="white"/>
              </svg>
            </CloseButton>
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <Image
                src={modalImage.url} // url is guaranteed here because setModalImage checks it
                alt={modalImage.title || "Full size image"}
                layout="fill"
                objectFit="contain"
              />
            </div>
            {modalImage.title && <div className="modal-caption">{modalImage.title}</div>}
          </ModalContent>
        </ModalOverlay>
      )}
    </SectionContainer>
  );
};