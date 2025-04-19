"use client";

import { gradientBorderStyle } from '../../Footer.styles';
import { GradientBorderProps } from './GradientBorder.types';

export const GradientBorder = ({ children }: GradientBorderProps) => {
    return (
        <>
            <div style={gradientBorderStyle} />
            {children}
        </>
    );
}; 