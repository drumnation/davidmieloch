import { voiceTracks } from './playlists/voiceTracks';

const preloadedVoiceTracks = new Set<string>();

export const preloadVoiceTrack = (pageSlug: string) => {
    if (preloadedVoiceTracks.has(pageSlug)) return;

    const matchingTrack = voiceTracks.find((track) => track.id === pageSlug);
    if (!matchingTrack || !matchingTrack.src) return; // Check if src exists

    try {
        const audio = new Audio(matchingTrack.src);
        audio.preload = 'metadata'; // Preload only metadata to save bandwidth
        audio.load();

        // Optional: Handle potential loading errors
        audio.onerror = (e) => {
            console.error(`Error preloading voice track metadata for slug ${pageSlug}:`, e);
            // Remove from set if loading failed, allowing retry?
            // preloadedVoiceTracks.delete(pageSlug);
        };

        // Add to set only after initiating load
        preloadedVoiceTracks.add(pageSlug);
        // console.log(`Preloading metadata for voice track: ${pageSlug}`); // Optional logging

    } catch (error) {
        console.error(`Failed to create Audio object for preloading slug ${pageSlug}:`, error);
    }
}; 