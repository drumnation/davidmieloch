import React from 'react';
import { ProjectLogo } from '@shared-components/atoms/ProjectLogo';
import { EntityHeaderProps } from './EntityHeader.types';
import * as S from './EntityHeader.styles';

export const EntityHeader: React.FC<EntityHeaderProps> = ({
    id,
    title,
    logoPath,
    metadataLines = [],
    topRightAccessory,
    showLogoBorder = false,
    logoSize = 50, // Default logo size
    isMobileLayout = false,
    className,
}) => {
    return (
        <S.HeaderContainer id={id} className={className} $isMobileLayout={isMobileLayout}>
            {/* Logo Column */}
            <S.LeftColumn $isMobileLayout={isMobileLayout}>
                <ProjectLogo
                    name={title} // Use title for initials fallback
                    logoPath={logoPath}
                    size={logoSize}
                    showBorder={showLogoBorder}
                />
            </S.LeftColumn>

            {/* Content Column (Title, Metadata, Accessory) */}
            <S.ContentColumn $isMobileLayout={isMobileLayout}>
                {/* Row for Title and Accessory */}
                <S.TitleRow>
                    <S.Title>{title}</S.Title>
                    {topRightAccessory && (
                        <S.AccessoryContainer>
                            {topRightAccessory}
                        </S.AccessoryContainer>
                    )}
                </S.TitleRow>

                {/* Metadata Lines */}
                {metadataLines.length > 0 && (
                    <S.MetadataContainer $isMobileLayout={isMobileLayout}>
                        {metadataLines.map((line, index) => (
                            <S.MetadataLine key={index}>
                                {/* Check if line is a plain string or a React node */}
                                {typeof line === 'string' ? (
                                    <span dangerouslySetInnerHTML={{ __html: line }} />
                                ) : (
                                    line
                                )}
                            </S.MetadataLine>
                        ))}
                    </S.MetadataContainer>
                )}
            </S.ContentColumn>
        </S.HeaderContainer>
    );
}; 