import React from 'react';
import { SectionContainer, SectionHeader, SectionTitle, EducationItemsWrapper } from './EducationSection.styles';
import { EducationSectionProps } from './EducationSection.types';
import { useEducationSection } from './EducationSection.hook';
import { EducationItemDisplay } from './components/EducationItemDisplay';
import { ImageModal } from './components/ImageModal';

export const EducationSection: React.FC<EducationSectionProps> = ({
  educationItems,
  title = 'Education',
  className,
  children,
  renderLogo,
  generateId,
}) => {
  const {
    sortedEducationItems,
    modalOpen,
    currentImage,
    openImageModal,
    closeModal,
  } = useEducationSection({ educationItems });

  return (
    <SectionContainer className={className}>
      <SectionHeader>
        <SectionTitle>{title}</SectionTitle>
      </SectionHeader>

      {children}

      {/* Wrap mapped items in the styled component */}
      <EducationItemsWrapper>
        {sortedEducationItems.map((edu, index) => (
          <EducationItemDisplay
            key={`edu-${index}`}
            id={generateId(edu)}
            educationItem={edu}
            renderLogo={renderLogo}
            onImageClick={openImageModal}
          />
        ))}
      </EducationItemsWrapper>

      <ImageModal
        isOpen={modalOpen}
        onClose={closeModal}
        imageUrl={currentImage.url}
        imageTitle={currentImage.title}
      />
    </SectionContainer>
  );
}; 