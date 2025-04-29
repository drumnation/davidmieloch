import { useEffect, useRef } from 'react';
import { preloadVoiceTrack } from './voicePreloader';

interface UseVoicePreloaderProps {
    pageSlug: string | null | undefined; // Allow null/undefined slugs
}

export const useVoicePreloader = <T extends HTMLElement = HTMLAnchorElement>({ pageSlug }: UseVoicePreloaderProps) => {
    const elementRef = useRef<T>(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element || !pageSlug) return; // Exit if no element or no slug

        // Hover-based preloading
        const handleMouseEnter = () => preloadVoiceTrack(pageSlug);
        element.addEventListener('mouseenter', handleMouseEnter);

        // Viewport-based preloading
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    preloadVoiceTrack(pageSlug);
                    // Once observed and preloaded, we can disconnect this specific observer
                    observer.disconnect();
                }
            },
            {
                rootMargin: '0px', // Optional: Adjust margins if needed
                threshold: 0.1 // Trigger when 10% is visible
            }
        );
        observer.observe(element);

        // Cleanup function
        return () => {
            element.removeEventListener('mouseenter', handleMouseEnter);
            observer.disconnect(); // Ensure observer is disconnected on unmount
        };
    }, [pageSlug]); // Re-run effect if pageSlug changes

    return elementRef;
}; 