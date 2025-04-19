import React from 'react';
import Image from 'next/image';
import * as S from './ImageModal.styles.ts';
import { MediaItem } from '../../../../Experience.types';
import { Modal } from '@mantine/core';

interface ImageModalProps {
    modalImage: MediaItem | null;
    onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({ modalImage, onClose }) => {
    if (!modalImage) return null;

    return (
        <S.ModalOverlay onClick={onClose}>
            <S.ModalContent onClick={(e: React.MouseEvent) => e.stopPropagation()}>
                <S.CloseButton onClick={onClose}>
                    {/* SVG Close Icon */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="white" />
                    </svg>
                </S.CloseButton>
                <Image
                    src={modalImage.url}
                    alt={modalImage.title || "Full size image"}
                    width={1200} // Max width, will scale down
                    height={800} // Max height, will scale down
                    style={{ maxWidth: '100%', maxHeight: 'calc(100vh - 100px)', height: 'auto', objectFit: 'contain' }}
                />
                {modalImage.title && <div className="modal-caption">{modalImage.title}</div>}
            </S.ModalContent>
        </S.ModalOverlay>
    );
}; 