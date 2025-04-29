import { AudioTrack } from './DualAudio.types';
import { musicPlaylist } from './playlists/musicPlaylist';

export function handleAudioError(
    errorType: 'music' | 'voice',
    error: Error,
    setMusicError: (msg: string) => void,
    setVoiceError: (msg: string) => void,
    setIsMusicPlaying: (playing: boolean) => void,
    setIsVoicePlaying: (playing: boolean) => void
) {
    const errorMsg = error.message || 'Unknown error occurred';
    const errorCode = (error as any).code;
    if (errorType === 'music') {
        setMusicError(errorMsg);
        setIsMusicPlaying(false);
    } else {
        setVoiceError(errorMsg);
        setIsVoicePlaying(false);
    }
    if (errorMsg.includes('play() failed') || errorMsg.includes("user didn't interact")) {
        // Autoplay restriction
        // Could notify UI
    } else if (errorMsg.includes('network') || errorMsg.includes('fetch') || errorCode === 2) {
        // Network error or file not found
    }
}

export function getNextMusicTrack(
    activeMusicTrack: AudioTrack | null,
    isMusicLooping: boolean
): AudioTrack | null {
    if (!activeMusicTrack) return null;
    const currentIndex = musicPlaylist.findIndex(track => track.id === activeMusicTrack.id);
    if (currentIndex === -1) return null;
    const nextIndex = isMusicLooping
        ? (currentIndex + 1) % musicPlaylist.length
        : currentIndex + 1;
    if (nextIndex < musicPlaylist.length) {
        return musicPlaylist[nextIndex];
    }
    return null;
} 