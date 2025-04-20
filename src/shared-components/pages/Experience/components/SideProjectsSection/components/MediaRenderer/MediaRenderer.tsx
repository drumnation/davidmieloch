import React from 'react';
import Image from 'next/image';
import { MediaItem } from '../../../../Experience.types';
import { MarkdownRenderer } from '@shared-components/molecules/MarkdownRenderer';
import * as S from './MediaRenderer.styles.ts';
import { SideProject } from '../../SideProjectsSection.types';
import { ProjectLogo } from '@shared-components/atoms/ProjectLogo';

interface MediaRendererProps {
    media: MediaItem[] | undefined;
    project?: SideProject; // Pass the project context if needed for logos, etc.
    onImageClick: (image: MediaItem) => void;
    isHalfWidthContext?: boolean; // Pass context about parent width
    isMobileLayout?: boolean; // Add mobile layout prop
}

export const MediaRenderer: React.FC<MediaRendererProps> = ({ media, project, onImageClick, isHalfWidthContext = false, isMobileLayout = false }) => {

    const renderMediaItem = (item: MediaItem, index: number, inGroup = false, groupLayout?: 'default' | 'stack') => {
        const { type, url, title, description, thumbnail, buttonText, width, customHeight, thumbnailWidth, showLogo, titleLogoPath, logoHasBorderRadius, logoHasBorder, cropHeight, height } = item;

        // Determine width styling
        const isQuarterWidth = width === 'quarter';
        const isThirdWidth = width === 'third';
        const isPercentageWidth = typeof width === 'string' && width.includes('%');

        const adjustedStyle: React.CSSProperties = {};

        // Force 100% width if mobile layout
        if (isMobileLayout) {
            adjustedStyle.width = '100%';
        } else {
            // Apply desktop/contextual width logic
            if (isQuarterWidth) {
                adjustedStyle.width = isHalfWidthContext ? '100%' : '25%';
            } else if (isThirdWidth) {
                adjustedStyle.width = isHalfWidthContext ? '100%' : '33.33%';
            } else if (isPercentageWidth) {
                adjustedStyle.width = isHalfWidthContext ? '100%' : width;
            } else if (width && !isHalfWidthContext) {
                adjustedStyle.width = width;
            } else if (isHalfWidthContext) {
                adjustedStyle.width = '100%';
            }
            // else, default width (auto/flex) applies
        }

        if (customHeight) {
            adjustedStyle.height = customHeight;
        }

        const renderTitleAndDescription = (item: MediaItem) => (
            <>
                {title && (
                    <S.MediaTitle>
                        {showLogo && (titleLogoPath || project?.logoPath) && (
                            <Image
                                src={titleLogoPath || project?.logoPath || ''}
                                alt={`Logo for ${title}`}
                                width={20}
                                height={20}
                                style={{
                                    width: '20px',
                                    height: '20px',
                                    objectFit: 'contain',
                                    marginRight: '8px',
                                    borderRadius: logoHasBorderRadius === false ? '0' : '6px',
                                    overflow: 'visible',
                                    backgroundColor: 'transparent',
                                    display: 'inline-block',
                                    verticalAlign: 'middle',
                                    ...(logoHasBorder && {
                                        border: '1px solid rgba(0, 0, 0, 0.2)',
                                        padding: '1px'
                                    })
                                }}
                            />
                        )}
                        {title}
                    </S.MediaTitle>
                )}
                {description && <S.MediaDescription>
                    <MarkdownRenderer content={description} compact={true} />
                </S.MediaDescription>}
            </>
        );

        // Recursive rendering for groups
        if (type === 'group' && item.items && item.items.length > 0) {
            // Add class names conditionally based on desktop layout
            const itemClass = !isMobileLayout ? (
                isQuarterWidth ? 'quarter-width-group' : isThirdWidth ? 'third-width-group' : isHalfWidthContext || width === 'half' ? 'half-width-group' : ''
            ) : '';

            return (
                <S.MediaGroup
                    key={`media-group-${index}`}
                    className={itemClass}
                    $layout={item.layout}
                    style={adjustedStyle}
                >
                    {item.layout === 'stack' ? (
                        <S.MediaGroupContent>
                            {item.items.map((nestedItem: MediaItem, nestedIndex: number) =>
                                renderMediaItem(nestedItem, nestedIndex, true, item.layout)
                            )}
                        </S.MediaGroupContent>
                    ) : (
                        item.items.map((nestedItem: MediaItem, nestedIndex: number) =>
                            renderMediaItem(nestedItem, nestedIndex, true, item.layout)
                        )
                    )}
                </S.MediaGroup>
            );
        }

        // Add class names conditionally based on desktop layout for non-group items
        const itemClass = !isMobileLayout ? (
            isQuarterWidth ? 'quarter-width-item' : isThirdWidth ? 'third-width-item' : ''
        ) : '';

        // Link type
        if (type === 'link') {
            return (
                <S.MediaItem
                    key={`media-link-${index}`}
                    className={itemClass}
                    style={{ ...adjustedStyle, height: 'auto' }}
                >
                    <S.LinkContainer>
                        <div style={{ display: 'flex', flex: 1 }}>
                            {thumbnail && (
                                <div className="link-thumbnail" style={{ width: thumbnailWidth || '150px' }}>
                                    <Image
                                        src={thumbnail}
                                        alt={title || 'Link thumbnail'}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        layout="responsive"
                                        width={0}
                                        height={0}
                                    />
                                </div>
                            )}
                            <div className="link-content">
                                {title && (
                                    <div className="link-title">
                                        {showLogo && (titleLogoPath || project?.logoPath) && (
                                            <Image
                                                src={titleLogoPath || project?.logoPath || ''}
                                                alt={`Logo for ${title}`}
                                                width={20}
                                                height={20}
                                                style={{
                                                    width: '20px',
                                                    height: '20px',
                                                    objectFit: 'contain',
                                                    marginRight: '8px',
                                                    borderRadius: logoHasBorderRadius === false ? '0' : '6px',
                                                    overflow: 'visible',
                                                    backgroundColor: 'transparent',
                                                    display: 'inline-block',
                                                    verticalAlign: 'middle',
                                                    ...(logoHasBorder && {
                                                        border: '1px solid rgba(0, 0, 0, 0.2)',
                                                        padding: '1px'
                                                    })
                                                }}
                                            />
                                        )}
                                        <span>{title}</span>
                                    </div>
                                )}
                                {description && <div className="link-description">
                                    <MarkdownRenderer content={description} compact={true} />
                                </div>}
                                {url && (
                                    <a href={url} target="_blank" rel="noopener noreferrer" className="link-button">
                                        {buttonText || 'View'}
                                    </a>
                                )}
                            </div>
                        </div>
                    </S.LinkContainer>
                </S.MediaItem>
            );
        }

        // Image type
        if (type === 'image') {
            return (
                <S.MediaItem
                    key={`media-image-${index}`}
                    className={itemClass}
                    style={adjustedStyle}
                >
                    {url && (
                        <S.MediaImage
                            src={url}
                            alt={title || 'Project image'}
                            onClick={() => onImageClick(item)}
                        />
                    )}
                    {renderTitleAndDescription(item)}
                </S.MediaItem>
            );
        }

        // Video type
        if (type === 'video') {
            return (
                <S.MediaItem
                    key={`media-video-${index}`}
                    className={itemClass}
                    style={adjustedStyle}
                >
                    {url && (
                        <S.MediaVideo
                            controls
                            style={{ display: 'block', width: '100%', height: customHeight || 'auto' }}
                            poster={thumbnail}
                        >
                            <source src={url} type="video/mp4" />
                            Your browser does not support the video tag.
                        </S.MediaVideo>
                    )}
                    {renderTitleAndDescription(item)}
                </S.MediaItem>
            );
        }

        // Audio type
        if (type === 'audio') {
            return (
                <S.MediaItem
                    key={`media-audio-${index}`}
                    className={itemClass}
                    style={adjustedStyle}
                >
                    {url && (
                        <S.MediaAudio controls>
                            <source src={url} type="audio/mpeg" />
                            Your browser does not support the audio element.
                        </S.MediaAudio>
                    )}
                    <S.AudioInfoContainer>
                        {thumbnail && (
                            <S.AudioThumbnailContainer style={{ maxWidth: thumbnailWidth || '100px' }}>
                                <Image
                                    src={thumbnail}
                                    alt={title || 'Audio thumbnail'}
                                    width={100}
                                    height={100}
                                    style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                                />
                            </S.AudioThumbnailContainer>
                        )}
                        <div className="audio-text-content">
                            {renderTitleAndDescription(item)}
                        </div>
                    </S.AudioInfoContainer>
                </S.MediaItem>
            );
        }

        // Embed type
        if (type === 'embed') {
            return (
                <S.MediaItem
                    key={`media-embed-${index}`}
                    className={itemClass}
                    style={adjustedStyle}
                >
                    {url && (
                        cropHeight ? (
                            <S.CroppedMediaEmbed $cropHeight={cropHeight}>
                                <iframe
                                    src={url}
                                    title={title || 'Embedded content'}
                                    height={height || 400}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </S.CroppedMediaEmbed>
                        ) : (
                            <S.MediaEmbed>
                                <iframe
                                    src={url}
                                    title={title || 'Embedded content'}
                                    height={height || 400}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </S.MediaEmbed>
                        )
                    )}
                    {renderTitleAndDescription(item)}
                </S.MediaItem>
            );
        }

        // PDF type
        if (type === 'pdf') {
            return (
                <S.MediaItem
                    key={`media-pdf-${index}`}
                    className={itemClass}
                    style={adjustedStyle}
                >
                    {url && (
                        <S.PDFViewer>
                            <iframe
                                src={url}
                                title={title || 'PDF document'}
                                height={height || 600}
                                style={{ width: '100%', border: 'none' }}
                                frameBorder="0"
                            />
                            <div className="pdf-fallback">
                                <p>If the PDF viewer doesn't load, you can <a href={url} target="_blank" rel="noopener noreferrer">view the PDF directly</a>.</p>
                            </div>
                        </S.PDFViewer>
                    )}
                    {renderTitleAndDescription(item)}
                </S.MediaItem>
            );
        }

        return null;
    };

    if (!media || media.length === 0) return null;

    return (
        <S.MediaContainer>
            {media.map((item, index) => renderMediaItem(item, index))}
        </S.MediaContainer>
    );
}; 