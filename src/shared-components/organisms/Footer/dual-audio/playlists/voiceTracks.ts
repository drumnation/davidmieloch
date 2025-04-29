import { AudioTrack } from '../DualAudio.types'; // Assuming AudioTrack type is shared

// Voice Tracks are mostly page-specific spoken narration
export const voiceTracks: AudioTrack[] = [
    {
        id: 'ai-transformation-whitepaper',
        title: 'AI Transformation Whitepaper (Narrated)',
        artist: 'Narration by David Mieloch',
        src: '/audio/voice/ai-transformation-whitepaper.mp3',
        description: 'Full narrated version of the AI Transformation whitepaper for Brain Garden.'
    },
    {
        id: 'ai-transformation',
        title: 'AI Transformation Overview',
        artist: 'Narration by David Mieloch',
        src: '/audio/voice/ai-transformation.mp3',
        description: 'Short spoken overview introducing AI transformation principles.'
    },
    {
        id: 'bio',
        title: 'Personal Bio',
        artist: 'Narration by David Mieloch',
        src: '/audio/voice/bio.mp3',
        description: 'Narrated personal biography and background story.'
    },
    {
        id: 'code-examples',
        title: 'Code Example Walkthroughs',
        artist: 'Narration by David Mieloch',
        src: '/audio/voice/code-examples.mp3',
        description: 'Narrated walkthroughs explaining major code patterns.'
    },
    {
        id: 'experience',
        title: 'Career Experience',
        artist: 'Narration by David Mieloch',
        src: '/audio/voice/experience.mp3',
        description: 'Spoken summary of professional engineering and leadership experience.'
    },
    {
        id: 'home',
        title: 'Home Page Welcome',
        artist: 'Narration by David Mieloch',
        src: '/audio/voice/home.mp3',
        description: 'Welcome message for new site visitors and overview of Brain Garden.'
    },
    {
        id: 'react-best-practices',
        title: 'React Best Practices Guide',
        artist: 'Narration by David Mieloch',
        src: '/audio/voice/react-best-practices.mp3',
        description: 'Narrated guide to React and frontend architecture best practices.'
    },
]; 