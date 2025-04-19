"use client";

import { Box, Image } from '@mantine/core';
import { LuMusic, LuPlay, LuPause } from 'react-icons/lu';
import { artworkOverlayStyle, trackArtworkStyle } from '../../Footer.styles';
import { TrackArtworkProps } from './TrackArtwork.types';

export const TrackArtwork = ({
    artwork,
    title,
    isPlaying,
    onClick,
    size = 30,
    iconSize = 15
}: TrackArtworkProps) => {
    return (
        <Box
            onClick={onClick}
            aria-label={isPlaying ? "Pause" : "Play"}
            style={{
                width: size,
                height: size,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                cursor: 'pointer',
                flexShrink: 0,
            }}
        >
            {artwork ? (
                <>
                    <Image
                        src={artwork}
                        alt={title ? `${title} artwork` : 'Track artwork'}
                        width={size}
                        height={size}
                        radius="sm"
                        style={trackArtworkStyle}
                    />
                    <Box className="artwork-overlay" style={{ ...artworkOverlayStyle, opacity: 0 }}>
                        {isPlaying ? <LuPause size={size * 0.4} style={{ color: '#fff' }} /> : <LuPlay size={size * 0.4} style={{ color: '#fff' }} />}
                    </Box>
                </>
            ) : (
                <Box style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(67, 97, 238, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '4px'
                }}>
                    <LuMusic size={iconSize} style={{ color: '#4361EE' }} />
                </Box>
            )}
        </Box>
    );
}; 