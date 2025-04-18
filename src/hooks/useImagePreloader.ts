import { useEffect, useRef } from 'react';

/**
 * Custom hook to preload a list of image URLs.
 * @param imageUrls - An array of image URLs to preload.
 * @param onLoad - Optional callback function to execute when all images are loaded or errored.
 */
export const useImagePreloader = (imageUrls: string[], onLoad?: () => void): void => {
  const loadedCount = useRef(0);
  const erroredCount = useRef(0);
  const totalImages = imageUrls.length;
  const callbackCalled = useRef(false); // Prevent multiple callback calls

  useEffect(() => {
    // Reset counters and callback flag if urls change
    loadedCount.current = 0;
    erroredCount.current = 0;
    callbackCalled.current = false;

    if (totalImages === 0) {
      // If no images, call onLoad immediately if provided
      if (onLoad && !callbackCalled.current) {
        onLoad();
        callbackCalled.current = true;
      }
      return;
    }

    const checkCompletion = () => {
      if (loadedCount.current + erroredCount.current === totalImages) {
        if (onLoad && !callbackCalled.current) {
          console.log('[useImagePreloader] All images processed.');
          onLoad();
          callbackCalled.current = true;
        }
      }
    };

    const imageObjects: HTMLImageElement[] = [];

    imageUrls.forEach((url) => {
      if (!url) {
        erroredCount.current++;
        checkCompletion();
        return;
      }
      
      const img = new window.Image();
      imageObjects.push(img);

      img.onload = () => {
        loadedCount.current++;
        // console.log(`[useImagePreloader] Loaded: ${url}`);
        checkCompletion();
      };

      img.onerror = () => {
        erroredCount.current++;
        console.error(`[useImagePreloader] Error loading: ${url}`);
        checkCompletion();
      };

      img.src = url;
    });

    // Cleanup function in case component unmounts
    return () => {
      // console.log('[useImagePreloader] Cleanup: Aborting image loads');
      imageObjects.forEach((img) => {
        img.onload = null;
        img.onerror = null;
        // Optional: Try to cancel loading if browser supports it (not standard)
        // img.src = ''; 
      });
    };
  }, [imageUrls, onLoad, totalImages]); // Rerun effect if URLs or callback changes
}; 