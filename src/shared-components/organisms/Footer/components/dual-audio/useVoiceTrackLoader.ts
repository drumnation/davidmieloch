import { useEffect, useRef } from 'react';
// import { useRouter } from 'next/router'; // Remove this import
import { usePathname } from 'next/navigation'; // Import usePathname instead
import { voiceTracks } from './playlists/voiceTracks'; // <-- Our defined tracks
import { AudioTrack } from './DualAudio.types';

// Inside useDualAudioController (or a helper file):

export const useVoiceTrackLoader = (
    loadVoiceTrack: (track: AudioTrack | null) => void, // Allow null for clearing track
    isReady: boolean // Add a flag to indicate if refs are ready
) => {
    // const router = useRouter(); // Remove router instance
    const pathname = usePathname(); // Use usePathname hook
    const initialLoadDone = useRef(false); // Track initial load

    useEffect(() => {
        // if (!router.isReady) return; // router.isReady is not needed with usePathname

        // Wait until the main hook signals readiness (refs are set)
        if (!isReady) {
            console.log('[VoiceLoader] Waiting for readiness...');
            return;
        }

        // Set initial load flag after component is mounted and ready
        const isFirstLoad = !initialLoadDone.current;
        if (isFirstLoad) {
            console.log('[VoiceLoader] Running initial load check');
            initialLoadDone.current = true;
        } else {
            console.log('[VoiceLoader] Running subsequent route change check');
        }

        const path = pathname; // Use pathname directly

        if (!path) {
            console.warn('[VoiceLoader] No path available. Clearing voice track.');
            loadVoiceTrack(null);
            return;
        }

        // Simple slug logic: remove leading/trailing slashes, handle root
        let pageSlug = path.replace(/^\/|\/$/g, '');
        if (pageSlug === '') {
            pageSlug = 'home';
        }
        // Handle potential sub-paths if needed (e.g., /blog/post-name -> blog or post-name?)
        // For now, assumes simple top-level slugs match track IDs
        console.log(`[VoiceLoader] Pathname: ${path}, Initial Slug: ${path.replace(/^\/|\/$/g, '')}, Final Slug: ${pageSlug}`);

        // Match the slug to a voiceTrack ID
        const matchingTrack = voiceTracks.find((track) => track.id === pageSlug);
        console.log(`[VoiceLoader] Found matching track:`, matchingTrack ? matchingTrack.id : 'None');

        if (matchingTrack) {
            loadVoiceTrack(matchingTrack);
        } else {
            // No matching track found for this page, clear the current voice track
            loadVoiceTrack(null);
            console.warn(`No voice track found for page slug: ${pageSlug} (path: ${path})`);
        }
        // Dependency array now includes isReady
    }, [pathname, loadVoiceTrack, isReady]);
}; 