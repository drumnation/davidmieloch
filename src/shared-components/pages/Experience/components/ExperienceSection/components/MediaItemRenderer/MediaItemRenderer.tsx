import React from 'react';
import {
    MediaItem,
    ExperienceItem as ExperienceItemTypeAliased,
} from '../../ExperienceSection.types';
import { ModalImage } from '../../ExperienceSection.hook';
// Import styles from their new location
import {
    MediaContainer,
    MediaGroup,
} from '../../styles/Media.styles';

// Import specific display components from their barrel file
import {
    ImageDisplay,
    PdfDisplay,
    EmbedDisplay,
    LinkDisplay,
    GroupDisplay,
} from './components';

interface MediaItemRendererProps {
    mediaItem: MediaItem;
    job: ExperienceItemTypeAliased;
    index: number; // Parent ExperienceItem index
    mediaIndex: number; // Index of this media item within the parent
    jobMediaLength: number; // Total number of media items for the parent job
    setModalImage?: (image: ModalImage) => void;
    isMobileLayout?: boolean; // Add the optional prop
}

export const MediaItemRenderer: React.FC<MediaItemRendererProps> = ({
    mediaItem,
    job,
    index,
    mediaIndex,
    jobMediaLength,
    setModalImage,
    isMobileLayout = false, // Default to false if not provided
}) => {
    // Calculate layout properties only if not mobile
    const isQuarterWidth = !isMobileLayout && mediaItem.width === '23.5%';
    const isThirdWidth = !isMobileLayout && mediaItem.width === '31.33%';
    const isHalfWidth =
        !isMobileLayout &&
        (mediaItem.width === '49%' ||
            mediaItem.width === '48%' ||
            mediaItem.width === '48.5%' ||
            mediaItem.width === 'half' ||
            mediaItem.width === '50%');
    const isSpecialLayout = isQuarterWidth || isThirdWidth || isHalfWidth;

    const $isWide =
        !isMobileLayout && // Only wide on desktop
        !isSpecialLayout &&
        (mediaItem.width === 'full' ||
            mediaItem.width === '100%' ||
            jobMediaLength === 1);

    // Set width to 100% on mobile, otherwise calculate based on props
    const widthStyle = isMobileLayout
        ? { flex: '0 0 100%', maxWidth: '100%' }
        : !isSpecialLayout && !$isWide && mediaItem.width
            ? { flex: `0 0 ${mediaItem.width}`, maxWidth: mediaItem.width }
            : {};

    // Create the key separately
    const containerKey = `media-${index}-${mediaIndex}`;

    // Props without the key
    const commonContainerProps = {
        $isWide: isMobileLayout ? true : $isWide, // Always "wide" (full width) on mobile
        style: widthStyle,
    };

    const displayProps = { // Common props for most display components
        mediaItem,
        job,
        setModalImage,
    };

    const groupDisplayProps = { // Props specifically for GroupDisplay
        mediaItem,
        job,
        mediaIndex,
        setModalImage,
    };

    switch (mediaItem.type) {
        case 'image':
            // Apply width classes only on desktop
            const imageLayoutClass = !isMobileLayout ? (
                isQuarterWidth ? 'quarter-width-image' : isThirdWidth ? 'third-width-image' : ''
            ) : '';
            return (
                <MediaContainer key={containerKey} {...commonContainerProps} className={imageLayoutClass}>
                    <ImageDisplay {...displayProps} />
                </MediaContainer>
            );
        case 'pdf':
            return (
                <MediaContainer key={containerKey} {...commonContainerProps} className="pdf-container">
                    <PdfDisplay {...displayProps} />
                </MediaContainer>
            );
        case 'embed':
            const embedStyle =
                { '--embed-height': mediaItem.height ? `${mediaItem.height}px` : '400px' } as React.CSSProperties;
            return (
                <MediaContainer
                    key={containerKey}
                    {...commonContainerProps}
                    // Merge styles correctly
                    style={{ ...commonContainerProps.style, ...embedStyle }}
                >
                    <EmbedDisplay {...displayProps} />
                </MediaContainer>
            );
        case 'link':
            return (
                <MediaContainer key={containerKey} {...commonContainerProps} className="link-container">
                    <LinkDisplay {...displayProps} />
                </MediaContainer>
            );
        case 'group':
            // Apply width classes only on desktop
            const groupLayoutClass = !isMobileLayout ? (
                isQuarterWidth ? 'quarter-width-group' : isThirdWidth ? 'third-width-group' : isHalfWidth ? 'half-width-group' : ''
            ) : '';
            // Use MediaGroup styled component for groups
            // Pass columns prop based on logic if needed, or rely on className
            // Removed $layout and $width props as they are not defined on MediaGroup
            return (
                <MediaGroup
                    key={`media-group-${index}-${mediaIndex}`}
                    className={groupLayoutClass}
                    // Determine columns based on groupLayoutClass or mediaItem data if necessary
                    // Example: columns={isQuarterWidth ? 4 : isThirdWidth ? 3 : isHalfWidth ? 2 : 1}
                    // For now, relying on className and internal styles of MediaGroup
                    columns={1} // Placeholder - Assuming default/mobile is 1 column, needs refinement if grid used
                    // Apply widthStyle *only* if it's mobile layout to ensure 100% width in carousel
                    style={isMobileLayout ? widthStyle : undefined}
                >
                    <GroupDisplay {...groupDisplayProps} />
                </MediaGroup>
            );
        default:
            return null;
    }
};
