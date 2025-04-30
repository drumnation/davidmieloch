import { StandardPlayerProps } from './StandardPlayer.types';

export function getDisplayTitle(controlMode: 'music' | 'narration', isMusicEnabled: boolean, isNarrationEnabled: boolean, activeMusicTrack: any, activeVoiceTrack: any) {
    if (controlMode === 'narration') {
        if (activeVoiceTrack?.title) {
            return `Narration + ${activeVoiceTrack.title}`;
        } else {
            return 'Narration';
        }
    } else if (controlMode === 'music' && activeMusicTrack?.title) {
        return activeMusicTrack.title;
    } else {
        return 'Audio Player';
    }
}

export function getDisplayArtist(isMusicEnabled: boolean, isNarrationEnabled: boolean, activeMusicTrack: any, activeVoiceTrack: any) {
    return isMusicEnabled && isNarrationEnabled && activeVoiceTrack && activeMusicTrack
        ? 'Narration and Music by David Mieloch'
        : isNarrationEnabled && activeVoiceTrack
            ? 'Narration by David Mieloch'
            : activeMusicTrack?.artist || 'Music by David Mieloch';
} 