"use client";

import { Box } from '@mantine/core';
import { progressBarContainerStyle, progressFillStyle } from '../../Footer.styles';
import { ProgressBarProps } from './ProgressBar.types';

export const ProgressBar = ({ progress, backgroundColor, barRef, onClick }: ProgressBarProps) => {
    return (
        <Box
            ref={barRef}
            style={{ ...progressBarContainerStyle, backgroundColor }}
            onClick={onClick}
        >
            <Box style={{ ...progressFillStyle, width: `${progress}%` }} />
        </Box>
    );
}; 