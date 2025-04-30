import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { AudioTrack } from '@shared-components/organisms/Footer/components/dual-audio/DualAudio.types';

// Define the state interface
interface AudioState {
    // Music playback state
    isMusicEnabled: boolean;
    isMusicPlaying: boolean;
    isMusicLooping: boolean;
    activeMusicTrack: AudioTrack | null;
    musicVolume: number;
    musicCurrentTime: number;
    musicDuration: number;
    musicError: string | null;
}

// Define the initial state
const initialState: AudioState = {
    isMusicEnabled: true,
    isMusicPlaying: false,
    isMusicLooping: true,
    activeMusicTrack: null,
    musicVolume: 1,
    musicCurrentTime: 0,
    musicDuration: 0,
    musicError: null,
};

// Create the slice
const audioSlice = createSlice({
    name: 'audio',
    initialState,
    reducers: {
        // Music state actions
        setMusicEnabled: (state, action: PayloadAction<boolean>) => {
            state.isMusicEnabled = action.payload;
        },
        setMusicPlaying: (state, action: PayloadAction<boolean>) => {
            state.isMusicPlaying = action.payload;
        },
        setMusicLooping: (state, action: PayloadAction<boolean>) => {
            state.isMusicLooping = action.payload;
        },
        toggleMusicLooping: (state) => {
            state.isMusicLooping = !state.isMusicLooping;
        },
        setActiveMusicTrack: (state, action: PayloadAction<AudioTrack | null>) => {
            state.activeMusicTrack = action.payload;
        },
        setMusicVolume: (state, action: PayloadAction<number>) => {
            state.musicVolume = action.payload;
        },
        setMusicCurrentTime: (state, action: PayloadAction<number>) => {
            state.musicCurrentTime = action.payload;
        },
        setMusicDuration: (state, action: PayloadAction<number>) => {
            state.musicDuration = action.payload;
        },
        setMusicError: (state, action: PayloadAction<string | null>) => {
            state.musicError = action.payload;
        },
    },
});

// Export the actions
export const {
    setMusicEnabled,
    setMusicPlaying,
    setMusicLooping,
    toggleMusicLooping,
    setActiveMusicTrack,
    setMusicVolume,
    setMusicCurrentTime,
    setMusicDuration,
    setMusicError,
} = audioSlice.actions;

// Export the selectors
export const selectIsMusicEnabled = (state: RootState): boolean => state.audio.isMusicEnabled;
export const selectIsMusicPlaying = (state: RootState): boolean => state.audio.isMusicPlaying;
export const selectIsMusicLooping = (state: RootState): boolean => state.audio.isMusicLooping;
export const selectActiveMusicTrack = (state: RootState): AudioTrack | null => state.audio.activeMusicTrack;
export const selectMusicVolume = (state: RootState): number => state.audio.musicVolume;
export const selectMusicCurrentTime = (state: RootState): number => state.audio.musicCurrentTime;
export const selectMusicDuration = (state: RootState): number => state.audio.musicDuration;
export const selectMusicError = (state: RootState): string | null => state.audio.musicError;

// Export the reducer
export default audioSlice.reducer; 