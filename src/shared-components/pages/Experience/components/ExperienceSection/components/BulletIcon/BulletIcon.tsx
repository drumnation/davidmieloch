import React from 'react';
import { BulletIconProps } from './BulletIcon.types';
import { getBulletIconComponent } from './BulletIcon.logic.tsx';

// Wrapper component that uses the logic function
export const BulletIcon: React.FC<BulletIconProps> = ({ text }) => {
    return getBulletIconComponent(text);
}; 