import React from 'react';
import Image from 'next/image';
import { FoldableContent } from '@shared-components/molecules/FoldableContent';
import { MarkdownRenderer } from '@shared-components/molecules/MarkdownRenderer';
import { FaFilePdf } from 'react-icons/fa'; // Import PDF icon
// Import local styles
import {
    PdfThumbnailLink,
    PdfOverlay,
    PdfTitleWrapper,
    PdfTitleContent,
    PdfLabel,
    // TitleLogoImage, // No longer needed
    MediaDescriptionWrapper,
    // Add PdfInlineViewer styled component if needed, or use inline styles
} from './PdfDisplay.styles';
// Import style object from utils
import { PdfThumbnailImageStyle } from '../../../../ExperienceSection.utils'; // Assuming it moved here
import { MediaItem, ExperienceItem as ExperienceItemTypeAliased } from '../../../../ExperienceSection.types'; // Adjust path

// Props specific to PDF display
interface PdfDisplayProps {
    mediaItem: MediaItem;
    job: ExperienceItemTypeAliased;
}

export const PdfDisplay: React.FC<PdfDisplayProps> = ({
    mediaItem,
    job,
}) => {
    const titleLogoSrc = mediaItem.titleLogoPath || job.logoPath;

    // If displayInline is true, render the PDF directly
    if (mediaItem.displayInline) {
        return (
            <object
                data={mediaItem.url}
                type="application/pdf"
                width="100%"
                // Use height from mediaItem or a default (e.g., 600px)
                style={{
                    height: typeof mediaItem.height === 'number' ? `${mediaItem.height}px` : (mediaItem.height || '600px'),
                    border: 'none' // Optional: remove iframe-like border
                }}
                aria-label={mediaItem.title || 'PDF Document'}
            >
                {/* Fallback content if browser doesn't support inline PDF */}
                <p>Your browser does not support inline PDFs. Please <a href={mediaItem.url} target="_blank" rel="noopener noreferrer">download the PDF</a> to view it.</p>
            </object>
            // Optionally, render title/description below the inline viewer if desired
            // {mediaItem.title && <p>{mediaItem.title}</p>}
            // {mediaItem.description && <p>{mediaItem.description}</p>}
        );
    }

    // Otherwise, render the thumbnail link (existing logic)
    return (
        <>
            <PdfThumbnailLink
                href={mediaItem.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                $height={mediaItem.height}
            >
                {mediaItem.thumbnailUrl ? (
                    <Image
                        src={mediaItem.thumbnailUrl}
                        alt={mediaItem.title || 'PDF Document'}
                        width={300}
                        height={225}
                        style={PdfThumbnailImageStyle as React.CSSProperties}
                        loading="lazy"
                    />
                ) : (
                    <PdfOverlay>
                        {/* Use imported icon */}
                        <FaFilePdf size={24} />
                        View PDF
                    </PdfOverlay>
                )}
            </PdfThumbnailLink>
            {mediaItem.title && (
                // Use PdfTitleWrapper but apply original inline styles inside for logo/title
                <PdfTitleWrapper>
                    {/* Use a div for the title and logo part to match original structure */}
                    <div className="pdf-title-text" style={{ display: 'flex', alignItems: 'center' }}>
                        {mediaItem.showLogo && titleLogoSrc && (
                            // Use next/image with original inline styles
                            <Image
                                src={titleLogoSrc}
                                alt={`${job.company} logo`}
                                width={20}
                                height={20}
                                style={{
                                    width: '20px',
                                    height: '20px',
                                    objectFit: 'contain',
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
                    <PdfLabel>PDF</PdfLabel> { /* Keep the PDF label */}
                </PdfTitleWrapper>
            )}
            {mediaItem.description && (
                <MediaDescriptionWrapper>
                    {mediaItem.foldable ? (
                        <FoldableContent maxHeight={100} customMaxHeight="120px">
                            <MarkdownRenderer
                                content={mediaItem.description || ''}
                                compact={true}
                            />
                        </FoldableContent>
                    ) : (
                        <MarkdownRenderer
                            content={mediaItem.description || ''}
                            compact={true}
                        />
                    )}
                </MediaDescriptionWrapper>
            )}
        </>
    );
};
