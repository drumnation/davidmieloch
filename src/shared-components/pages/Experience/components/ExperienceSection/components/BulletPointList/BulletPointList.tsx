import React from 'react';
import { BulletIcon as BulletIconComponent } from '../BulletIcon/BulletIcon'; // Import directly from the component file
import {
    BulletList as StyledBulletList,
    BulletItem as StyledBulletItem,
    BulletIconWrapper,
    BulletText as StyledBulletText,
} from './BulletPointList.styles';
import { BulletPointListProps } from './BulletPointList.types'; // Import the types

export const BulletPointList: React.FC<BulletPointListProps> = ({
    points,
    parentIndex,
}) => {
    if (!points || points.length === 0) {
        return null;
    }

    return (
        <StyledBulletList>
            {points.map((point: string, i: number) => (
                <StyledBulletItem key={`point-${parentIndex}-${i}`}>
                    <BulletIconWrapper>
                        <BulletIconComponent text={point} />
                    </BulletIconWrapper>
                    <StyledBulletText>{point}</StyledBulletText>
                </StyledBulletItem>
            ))}
        </StyledBulletList>
    );
}; 