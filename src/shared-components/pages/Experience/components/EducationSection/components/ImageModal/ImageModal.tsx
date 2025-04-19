import React from 'react';
import { createPortal } from 'react-dom';
import {
    ModalBackdrop,
    ModalContent,
    ModalImage,
    ModalTitle,
    ModalCloseButton,
} from '../../EducationSection.styles'; // Reuse styles from parent
import { ImageModalProps } from './ImageModal.types';

export const ImageModal: React.FC<ImageModalProps> = ({
    isOpen,
    onClose,
    imageUrl,
    imageTitle
}) => {
    if (!isOpen || typeof window === 'undefined') {
        return null;
    }

    // Stop propagation to prevent closing modal when clicking inside the content
    const handleContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return createPortal(
        <ModalBackdrop onClick={onClose}>
            <ModalContent onClick={handleContentClick}>
                <ModalImage
                    src={imageUrl}
                    alt={imageTitle || 'Full size view'}
                // Add loading state if needed
                />
                {imageTitle && (
                    <ModalTitle>{imageTitle}</ModalTitle>
                )}
                <ModalCloseButton onClick={onClose} aria-label="Close modal">
                    ×
                </ModalCloseButton>
            </ModalContent>
        </ModalBackdrop>,
        document.body // Render modal directly in the body
    );
}; 