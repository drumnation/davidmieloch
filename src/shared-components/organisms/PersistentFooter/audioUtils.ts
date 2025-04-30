/**
 * Audio crossfade utilities that handle type safety for browser/server environments
 */

export const CROSSFADE_DURATION = 1250;

/**
 * Type safe function to fade audio volume with setTimeout
 */
export const performAudioCrossfade = (
    audio: HTMLAudioElement | null,
    isDuckedMode: boolean,
    setDuckedMode: (isDucked: boolean) => void,
    musicVolume: number,
    onComplete: () => void
): (() => void) => {
    if (!audio) return () => { };

    // Store original volume and create timeout reference
    const originalVolume = audio.volume;
    let timeoutId: NodeJS.Timeout | null = null;

    // Clear any running timeouts
    const cleanup = () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
    };

    // Step 1: Fade out
    audio.volume = originalVolume * 0.5;

    // Step 2: Switch audio source after fade out
    timeoutId = setTimeout(() => {
        // Switch to ducked or normal mode
        setDuckedMode(isDuckedMode);

        // Set a low volume for fade-in start
        if (audio) {
            audio.volume = 0.05;
        }

        // Step 3: Begin fade in
        timeoutId = setTimeout(() => {
            if (audio) {
                audio.volume = musicVolume * 0.5;

                // Step 4: Complete fade in
                timeoutId = setTimeout(() => {
                    if (audio) {
                        audio.volume = musicVolume;
                    }
                    onComplete();
                }, CROSSFADE_DURATION / 2);
            }
        }, CROSSFADE_DURATION / 2);
    }, CROSSFADE_DURATION);

    // Return cleanup function
    return cleanup;
};
