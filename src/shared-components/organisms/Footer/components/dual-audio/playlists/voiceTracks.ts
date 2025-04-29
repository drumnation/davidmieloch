import { AudioTrack } from '../DualAudio.types'; // Assuming AudioTrack type is shared

// Voice Tracks are mostly page-specific spoken narration
export const voiceTracks: AudioTrack[] = [
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
        id: 'enterprise-ai-development-framework',
        title: 'Enterprise AI Framework Overview',
        artist: 'Narration by David Mieloch',
        src: '/audio/voice/enterprise-ai-development-framework.mp3',
        description: 'Spoken overview of the Enterprise AI Development Framework.'
    },
    {
        id: 'experience',
        title: 'Career Experience',
        artist: 'Narration by David Mieloch',
        src: '/audio/voice/experience.mp3',
        description: 'Spoken summary of professional engineering and leadership experience.'
    },
    {
        id: 'fullstack-react-best-practices-integration',
        title: 'Fullstack React Best Practices',
        artist: 'Narration by David Mieloch',
        src: '/audio/voice/fullstack-react-best-practices-integration.mp3',
        description: 'Narrated guide covering fullstack React development best practices.'
    },
    {
        id: 'home',
        title: 'Home Page Welcome',
        artist: 'Narration by David Mieloch',
        src: '/audio/voice/home.mp3',
        description: 'Welcome message for new site visitors and overview of Brain Garden.'
    },
];