import React from 'react';
import Image from 'next/image';
import { MediaContainer } from '../../EducationSection.styles';
import { MediaItemDisplayProps } from './MediaItemDisplay.types';
import { MediaItem } from '../../EducationSection.types';

// Separate component for rendering PDF content
const PdfMedia: React.FC<{ mediaItem: MediaItem, schoolName: string }> = ({ mediaItem, schoolName }) => (
    <div className="pdf-container">
        <a
            href={mediaItem.url}
            target="_blank"
            rel="noopener noreferrer"
            className="pdf-thumbnail"
            aria-label={`View PDF: ${mediaItem.title || schoolName}`}
        >
            {mediaItem.thumbnailUrl ? (
                <Image
                    src={mediaItem.thumbnailUrl}
                    alt={mediaItem.title || "PDF Document Preview"}
                    width={350} // Example width, adjust as needed
                    height={200} // Example height, adjust as needed
                    loading="lazy"
                />
            ) : (
                <div className="pdf-overlay">
                    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M20 2H8C6.9 2 6 2.9 6 4V16C6 17.1 6.9 18 8 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H8V4H20V16ZM4 6H2V20C2 21.1 2.9 22 4 22H18V20H4V6ZM16 12V9C16 8.45 15.55 8 15 8H13V13H15C15.55 13 16 12.55 16 12ZM14 9H15V12H14V9ZM18 11H19V10H18V9H19V8H17V13H18V11ZM10 11H11C11.55 11 12 10V9C12 8.45 11.55 8 11 8H9V13H10V11ZM10 9H11V10H10V9Z" />
                    </svg>
                    View PDF
                </div>
            )}
        </a>
        {mediaItem.title && (
            <div className="pdf-title">
                <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20 2H8C6.9 2 6 2.9 6 4V16C6 17.1 6.9 18 8 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H8V4H20V16ZM4 6H2V20C2 21.1 2.9 22 4 22H18V20H4V6ZM16 12V9C16 8.45 15.55 8 15 8H13V13H15C15.55 13 16 12.55 16 12ZM14 9H15V12H14V9ZM18 11H19V10H18V9H19V8H17V13H18V11ZM10 11H11C11.55 11 12 10V9C12 8.45 11.55 8 11 8H9V13H10V11ZM10 9H11V10H10V9Z" />
                </svg>
                {mediaItem.title}
            </div>
        )}
    </div>
);

// Separate component for rendering Embed content
const EmbedMedia: React.FC<{ mediaItem: MediaItem, schoolName: string }> = ({ mediaItem, schoolName }) => {
    const embedWrapperClass = `embed-wrapper`;

    return (
        <>
            <div className={embedWrapperClass}>
                <iframe
                    src={mediaItem.url}
                    title={mediaItem.title || `${schoolName} embed`}
                    frameBorder="0"
                    scrolling="no"
                    allowFullScreen
                />
            </div>
            {mediaItem.description && (
                <div className="media-description">{mediaItem.description}</div>
            )}
        </>
    );
};

// Separate component for rendering Image content
const ImageMedia: React.FC<{
    mediaItem: MediaItem,
    schoolName: string,
    onImageClick?: (url: string, title?: string) => void
}> = ({ mediaItem, schoolName, onImageClick }) => (
    <>
        <div
            className="image-wrapper"
            onClick={onImageClick ? () => onImageClick(mediaItem.url, mediaItem.title) : undefined}
            role={onImageClick ? "button" : undefined}
            tabIndex={onImageClick ? 0 : undefined}
            onKeyPress={onImageClick ? (e) => e.key === 'Enter' && onImageClick(mediaItem.url, mediaItem.title) : undefined}
            aria-label={`View larger image: ${mediaItem.title || schoolName}`}
            style={{ cursor: onImageClick ? 'pointer' : 'default' }}
        >
            <Image
                src={mediaItem.url}
                alt={mediaItem.title || `${schoolName} image`}
                width={350} // Provide appropriate defaults or calculate based on container
                height={200}
                loading="lazy"
            />
        </div>
        {mediaItem.description && (
            <div className="media-description">{mediaItem.description}</div>
        )}
    </>
);

export const MediaItemDisplay: React.FC<MediaItemDisplayProps> = ({
    mediaItem,
    schoolName,
    onImageClick
}) => {
    // Determine width - default to 50% unless specified or only one item
    // Note: Logic for single item width needs context from parent, simplified here
    const isWide = mediaItem.width === 'full' || mediaItem.width === '100%'; // Simplified logic

    const renderMedia = () => {
        switch (mediaItem.type) {
            case 'image':
                return <ImageMedia mediaItem={mediaItem} schoolName={schoolName} onImageClick={onImageClick} />;
            case 'pdf':
                return <PdfMedia mediaItem={mediaItem} schoolName={schoolName} />;
            case 'embed':
                return <EmbedMedia mediaItem={mediaItem} schoolName={schoolName} />;
            default:
                return null; // Or some placeholder for unknown types
        }
    };

    return (
        <MediaContainer $isWide={isWide}>
            {renderMedia()}
        </MediaContainer>
    );
}; 