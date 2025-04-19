import { useState, useCallback } from 'react';
import { EducationItem as EducationItemType } from './EducationSection.types';
import { sortEducationByDate } from './EducationSection.utils';

export interface UseEducationSectionProps {
    educationItems: EducationItemType[];
}

export const useEducationSection = ({ educationItems }: UseEducationSectionProps) => {
    const sortedEducationItems = useCallback(() => sortEducationByDate(educationItems), [educationItems]);

    const [modalOpen, setModalOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState<{ url: string; title?: string }>({ url: '' });

    const openImageModal = useCallback((url: string, title?: string) => {
        setCurrentImage({ url, title });
        setModalOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setModalOpen(false);
        // Reset image slightly after modal close animation (if any)
        setTimeout(() => setCurrentImage({ url: '' }), 300);
    }, []);

    return {
        sortedEducationItems: sortedEducationItems(),
        modalOpen,
        currentImage,
        openImageModal,
        closeModal,
    };
}; 