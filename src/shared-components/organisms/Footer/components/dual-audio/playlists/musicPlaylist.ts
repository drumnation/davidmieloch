// src/shared-components/organisms/Footer/dual-audio/playlists/musicPlaylist.ts

import { AudioTrack } from '../DualAudio.types'; // Use the updated AudioTrack type

// Updated playlist with normalized filenames - only including files that exist
export const musicPlaylist: AudioTrack[] = [
    {
        id: 'reality-tunnel', // Normalized ID
        title: 'Reality Tunnel',
        artist: 'Music by David Mieloch',
        src: '/audio/music/reality-tunnel.mp3', // Normalized path
        artwork: '/audio/music/reality-tunnel.jpg', // Normalized path
        description: 'Dreamlike exploration of future landscapes and hidden pathways.',
    },
    {
        id: 'hop-trippin-the-bells', // Normalized ID
        title: 'Hop Trippin the Bells',
        artist: 'Music by David Mieloch',
        src: '/audio/music/hop-trippin-the-bells.mp3', // Normalized path
        artwork: '/audio/music/hop-trippin-the-bells.jpg', // Normalized path
        description: 'Playful bells and rhythmic energy — perfect for lighthearted moments.',
    },
    {
        id: 'scarlet-harvest', // Normalized ID
        title: 'Scarlet Harvest',
        artist: 'Music by David Mieloch',
        src: '/audio/music/scarlet-harvest.mp3', // Normalized path
        artwork: '/audio/music/scarlet-harvest.jpg', // Normalized path
        description: 'A cinematic blend of tension and beauty, ripe with autumn energy.',
    },
    {
        id: 'epic-battle-game-opening-credits', // Normalized ID
        title: 'Epic Battle Game - Opening Credits',
        artist: 'Music by David Mieloch',
        src: '/audio/music/epic-battle-game-opening-credits.mp3', // Normalized path
        artwork: '/audio/music/epic-battle-game-opening-credits.jpg', // Normalized path
        description: 'Heroic orchestral theme for intense game openings.',
    },
    {
        id: 'organica-for-solo-violin', // Normalized ID
        title: 'Organica - For Solo Violin',
        artist: 'Music by David Mieloch',
        src: '/audio/music/organica-for-solo-violin.mp3', // Normalized path
        artwork: '/audio/music/organica-for-solo-violin.jpg', // Normalized path
        description: 'Intricate and evolving piece for solo violin.',
    },
    {
        id: 'exotic-traveling-game-cut-scene-light',
        title: 'Exotic Traveling Game Cut Scene - Light',
        artist: 'Music by David Mieloch',
        src: '/audio/music/exotic-traveling-game-cut-scene-light.mp3',
        artwork: '/audio/music/exotic-traveling-game-cut-scene-light.jpg',
        description: 'Light, airy travel music for game cut scenes.',
    },
    {
        id: 'exotic-traveling-game-cut-scene-dark',
        title: 'Exotic Traveling Game Cut Scene - Dark',
        artist: 'Music by David Mieloch',
        src: '/audio/music/exotic-traveling-game-cut-scene-dark.mp3',
        artwork: '/audio/music/exotic-traveling-game-cut-scene-dark.jpg',
        description: 'Darker, more mysterious travel music for tense scenes.',
    },
    {
        id: 'warrior-prepares-for-battle-game-cut-scene',
        title: 'Warrior Prepares for Battle - Game Cut Scene',
        artist: 'Music by David Mieloch',
        src: '/audio/music/warrior-prepares-for-battle-game-cut-scene.mp3',
        artwork: '/audio/music/warrior-prepares-for-battle-game-cut-scene.jpg',
        description: 'Anticipatory music for pre-battle game sequences.',
    },
    {
        id: 'frenetic-puzzle-game-gameplay',
        title: 'Frenetic Puzzle Game - Gameplay',
        artist: 'Music by David Mieloch',
        src: '/audio/music/frenetic-puzzle-game-gameplay.mp3',
        artwork: '/audio/music/frenetic-puzzle-game-gameplay.jpg',
        description: 'Fast-paced, energetic music for puzzle-solving gameplay.',
    },
    {
        id: 'casual-zombie-gameplay-iphone',
        title: 'Casual Zombie Gameplay - iPhone',
        artist: 'Music by David Mieloch',
        src: '/audio/music/casual-zombie-gameplay-iphone.mp3',
        artwork: '/audio/music/casual-zombie-gameplay-iphone.jpg',
        description: 'Quirky, light-hearted music for mobile zombie games.',
    },
    {
        id: 'sci-fi-first-person-shooter-opening-credits',
        title: 'Sci-Fi First Person Shooter - Opening Credits',
        artist: 'Music by David Mieloch',
        src: '/audio/music/sci-fi-first-person-shooter-opening-credits.mp3',
        artwork: '/audio/music/sci-fi-first-person-shooter-opening-credits.jpg',
        description: 'Epic, futuristic title sequence music for sci-fi shooters.',
    },
    {
        id: 'aluzion-fields',
        title: 'Aluzion Fields',
        artist: 'Music by David Mieloch',
        src: '/audio/music/aluzion-fields.mp3',
        artwork: '/audio/music/aluzion-fields.jpg',
        description: 'Atmospheric ambient piece with ethereal textures.',
    },
    {
        id: 'sci-fi-first-person-shooter-gameplay',
        title: 'Sci-Fi - First Person Shooter - Gameplay',
        artist: 'Music by David Mieloch',
        src: '/audio/music/sci-fi-first-person-shooter-gameplay.mp3',
        artwork: '/audio/music/sci-fi-first-person-shooter-gameplay.jpg',
        description: 'High-energy combat music for sci-fi action sequences.',
    },
    {
        id: 'requiem-in-memory-of-a-dear-friend',
        title: 'Requiem in Memory of a Dear Friend',
        artist: 'Music by David Mieloch',
        src: '/audio/music/requiem-in-memory-of-a-dear-friend.mp3',
        artwork: '/audio/music/requiem-in-memory-of-a-dear-friend.jpg',
        description: 'Emotional, contemplative piece honoring friendship and memory.',
    },
    {
        id: 'where-roads-end-mixed-chamber-ensemble',
        title: 'Where Roads End - Mixed Chamber Ensemble',
        artist: 'Music by David Mieloch',
        src: '/audio/music/where-roads-end-mixed-chamber-ensemble.mp3',
        artwork: '/audio/music/where-roads-end-mixed-chamber-ensemble.jpg',
        description: 'Intricate chamber piece exploring musical boundaries.',
    },
    {
        id: 'lielexlium',
        title: 'Lielexlium',
        artist: 'Music by David Mieloch',
        src: '/audio/music/lielexlium.mp3',
        artwork: '/audio/music/lielexlium.jpg',
        description: 'Abstract electronic composition with evolving textures.',
    },
    {
        id: 'sonata-no.1-for-string-orchestra',
        title: 'Sonata No.1 - For String Orchestra',
        artist: 'Music by David Mieloch',
        src: '/audio/music/sonata-no.1-for-string-orchestra.mp3',
        artwork: '/audio/music/sonata-no.1-for-string-orchestra.jpg',
        description: 'Classical string composition with contemporary elements.',
    },
    {
        id: 'identity-conflict-z-chamber-trio',
        title: 'Identity Conflict Z - Chamber Trio',
        artist: 'Music by David Mieloch',
        src: '/audio/music/identity-conflict-z-chamber-trio.mp3',
        artwork: '/audio/music/identity-conflict-z-chamber-trio.jpg',
        description: 'Experimental chamber music exploring tension and harmony.',
    },
    {
        id: 'it-s-a-wonderful-life-for-kings',
        title: "It's a Wonderful Life for Kings",
        artist: 'Music by David Mieloch',
        src: '/audio/music/it-s-a-wonderful-life-for-kings.mp3',
        artwork: '/audio/music/it-s-a-wonderful-life-for-kings.jpg',
        description: 'Regal, majestic composition with orchestral elements.',
    },
    {
        id: 'chill-out-ya-merry-gentleman',
        title: 'Chill-out ya Merry Gentleman',
        artist: 'Music by David Mieloch',
        src: '/audio/music/chill-out-ya-merry-gentleman.mp3',
        artwork: '/audio/music/chill-out-ya-merry-gentleman.jpg',
        description: 'Modern electronic take on a classic holiday melody.',
    },
    {
        id: 'booty-dance-of-the-sugar-plum-fairy',
        title: 'Booty Dance of the Sugar Plum Fairy',
        artist: 'Music by David Mieloch',
        src: '/audio/music/booty-dance-of-the-sugar-plum-fairy.mp3',
        artwork: '/audio/music/booty-dance-of-the-sugar-plum-fairy.jpg',
        description: 'Playful, rhythmic reimagining of a classical favorite.',
    },
]; 