import { useState, useCallback } from 'react';

export const useAccordion = (initiallyOpen = false) => {
    const [isOpen, setIsOpen] = useState<boolean>(initiallyOpen);

    const toggleAccordion = useCallback(() => {
        setIsOpen((prevState: boolean) => !prevState);
    }, []);

    return {
        isOpen,
        toggleAccordion,
    };
}; 