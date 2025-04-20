import { useState, useEffect, useRef, useCallback } from 'react';

// Debounce function
const debounce = (func: (...args: any[]) => void, wait: number) => {
    let timeout: NodeJS.Timeout | null = null;
    return (...args: any[]) => {
        const later = () => {
            timeout = null;
            func(...args);
        };
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(later, wait);
    };
};

interface ScrollSpyOptions {
    /** Array of section IDs to track */
    ids: string[];
    /** Offset from the top of the viewport (px) */
    offset?: number;
    /** Debounce wait time (ms) */
    debounceWait?: number;
}

// Store handleScroll in a ref to keep its identity stable for add/remove listener
export const useScrollSpy = ({
    ids,
    offset = 100,
    debounceWait = 100,
}: ScrollSpyOptions): {
    activeId: string | null;
    attachScrollListener: () => void;
    detachScrollListener: () => void;
} => {
    const [activeId, setActiveId] = useState<string | null>(null);
    const sectionElements = useRef<Record<string, HTMLElement | null>>({});
    // Store the debounced handler in a ref
    const debouncedScrollHandlerRef = useRef<(() => void) | null>(null);

    // Store section elements
    useEffect(() => {
        sectionElements.current = ids.reduce((acc, id) => {
            acc[id] = document.getElementById(id);
            return acc;
        }, {} as Record<string, HTMLElement | null>);
        // Recalculate immediately if elements change (though ids change should trigger this)
        debouncedScrollHandlerRef.current?.();
    }, [ids]);

    // Define the core scroll handling logic (useCallback ensures stable identity)
    const handleScroll = useCallback(() => {
        const scrollPosition = window.scrollY + offset;
        console.log(`[useScrollSpy] scrollPosition (scrollY + offset): ${scrollPosition}`);

        let currentActiveId: string | null = null;
        for (const id of ids) {
            const element = sectionElements.current[id];
            if (element) {
                // Calculate position relative to the document
                const rect = element.getBoundingClientRect();
                const elementTopRelativeToDocument = rect.top + window.scrollY;

                console.log(`[useScrollSpy] Checking ID: ${id}, elementTopRelativeToDocument: ${elementTopRelativeToDocument}`);

                if (elementTopRelativeToDocument <= scrollPosition) {
                    // This section's top is at or above the threshold, update the potential active ID
                    currentActiveId = id;
                    console.log(`[useScrollSpy]   ID: ${id} is current candidate.`);
                } else {
                    // Since IDs are ordered, once we pass the scroll position, 
                    // the previous candidate was the correct one.
                    console.log(`[useScrollSpy]   ID: ${id} is below threshold. Breaking loop.`);
                    break;
                }
            } else {
                console.log(`[useScrollSpy] Element not found for ID: ${id}`);
            }
        }

        console.log(`[useScrollSpy] Final determinedActiveId: ${currentActiveId}`);
        // Restore active state update
        setActiveId(currentActiveId);
    }, [ids, offset]); // Dependencies for the core logic

    // Create the debounced version only once
    useEffect(() => {
        debouncedScrollHandlerRef.current = debounce(handleScroll, debounceWait);
    }, [handleScroll, debounceWait]);

    // Functions to manage the listener
    const attachScrollListener = useCallback((performInitialCheck = true) => {
        if (debouncedScrollHandlerRef.current) {
            console.log(`[useScrollSpy] Attaching scroll listener. Initial check: ${performInitialCheck}`);
            window.addEventListener('scroll', debouncedScrollHandlerRef.current);
            // Initial check on attach only if requested
            if (performInitialCheck) {
                console.log('[useScrollSpy] Performing initial check on attach.');
                debouncedScrollHandlerRef.current();
            }
        }
    }, []);

    const detachScrollListener = useCallback(() => {
        if (debouncedScrollHandlerRef.current) {
            console.log('[useScrollSpy] Detaching scroll listener.');
            window.removeEventListener('scroll', debouncedScrollHandlerRef.current);
        }
    }, []);

    // Effect to attach on mount and detach on unmount
    useEffect(() => {
        attachScrollListener();
        return () => {
            detachScrollListener();
        };
    }, [attachScrollListener, detachScrollListener]);

    return { activeId, attachScrollListener, detachScrollListener };
}; 