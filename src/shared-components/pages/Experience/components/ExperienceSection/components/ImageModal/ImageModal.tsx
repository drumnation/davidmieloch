import React, { MouseEvent } from 'react';
import Image from 'next/image';
import {
    ModalOverlay,
    ModalContent,
    CloseButton,
} from './ImageModal.styles'; // Updated import path
import { ImageModalProps } from './ImageModal.types';
import { useEscapeKey } from './ImageModal.hook';

export const ImageModal: React.FC<ImageModalProps> = ({
    imageUrl,
    imageTitle,
    onClose,
}) => {
    useEscapeKey(onClose);

    return (
        <ModalOverlay onClick={onClose}>
            <ModalContent onClick={(e: MouseEvent) => e.stopPropagation()}>
                <CloseButton onClick={onClose}>
                    {/* Close Icon SVG */}
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                            fill="white"
                        />
                    </svg>
                </CloseButton>
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                    <Image
                        src={imageUrl}
                        alt={imageTitle || 'Full size image'}
                        width={1200}
                        height={800}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            maxWidth: '100%',
                            maxHeight: '90vh',
                        }}
                        priority // Prioritize loading the modal image
                    />
                </div>
                {imageTitle && <div className="modal-caption">{imageTitle}</div>}
            </ModalContent>
        </ModalOverlay>
    );
}; 