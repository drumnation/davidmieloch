"use client";

import { useColorScheme } from '@mantine/hooks';
import { useMantineTheme } from '@mantine/core';
import { SocialLink, SoundCloudTrack } from './Footer.types';
import { useCallback, useEffect, useState } from 'react';
import { useDualAudio } from './components/dual-audio/DualAudioContext';
import { musicPlaylist } from './components/dual-audio/playlists/musicPlaylist';
import { AudioTrack } from './components/dual-audio/DualAudio.types';
import { useFooterUI } from './useFooterUI.hook';

// This function will be used in the Footer component to create the social links with JSX
export const getDefaultSocialLinks = () => {
  return [
    { name: 'GitHub', url: 'https://github.com/dmieloch' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/dmieloch' },
    { name: 'Medium', url: 'https://medium.com/@davidmieloch' },
  ];
};

export const useFooter = (
  socialLinks?: SocialLink[],
  soundCloudTracks?: SoundCloudTrack[]
) => {
  const theme = useMantineTheme();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const currentYear = new Date().getFullYear();

  // Mixed tracks from all genres
  const defaultSoundCloudTracks: SoundCloudTrack[] = [
    // Video game tracks
    {
      id: 1,
      title: 'Reality Tunnel',
      artist: 'Music By David Mieloch',
      url: 'https://api.soundcloud.com/tracks/2072491',
      directUrl: 'https://soundcloud.com/davidmieloch/reality-tunnel',
      artwork: 'https://i1.sndcdn.com/artworks-000002072632-7w5g77-t500x500.jpg',
      duration: 210,
      playCount: 980
    },
    // Classical track
    {
      id: 12,
      title: 'Where Roads End - Mixed Chamber Ensemble',
      artist: 'Music By David Mieloch',
      url: 'https://api.soundcloud.com/tracks/2081242',
      directUrl: 'https://soundcloud.com/davidmieloch/where-roads-end',
      artwork: 'https://i1.sndcdn.com/artworks-000002081242-glafqh-t500x500.jpg',
      duration: 195,
      playCount: 231
    },
    // Christmas track
    {
      id: 16,
      title: 'Hop Trippin the Bells',
      artist: 'Music By David Mieloch',
      url: 'https://api.soundcloud.com/tracks/3670514',
      directUrl: 'https://soundcloud.com/davidmieloch/hop-trippin-the-bells',
      artwork: 'https://i1.sndcdn.com/artworks-000003670514-gsoa2b-t500x500.jpg',
      duration: 180,
      playCount: 351
    },
    // Video game track
    {
      id: 2,
      title: 'Epic Battle Game - Opening Credits',
      artist: 'Music By David Mieloch',
      url: 'https://api.soundcloud.com/tracks/3210506',
      directUrl: 'https://soundcloud.com/davidmieloch/epic-sword-fight',
      artwork: 'https://i1.sndcdn.com/artworks-000071915074-b5ecl8-t500x500.jpg',
      duration: 184,
      playCount: 2418
    },
    // Classical track
    {
      id: 11,
      title: 'Organica - For Solo Violin',
      artist: 'Music By David Mieloch',
      url: 'https://api.soundcloud.com/tracks/2182101',
      directUrl: 'https://soundcloud.com/davidmieloch/organica-performed-by-ann-fontanella',
      artwork: 'https://i1.sndcdn.com/artworks-000002182101-mp3pn4-t500x500.jpg',
      duration: 210,
      playCount: 305
    },
    // Christmas track
    {
      id: 17,
      title: 'Booty Dance of the Sugar Plum Fairy',
      artist: 'Music By David Mieloch',
      url: 'https://api.soundcloud.com/tracks/3692370',
      directUrl: 'https://soundcloud.com/davidmieloch/booty-dance-of-the-sugar-plum-fairy',
      artwork: 'https://i1.sndcdn.com/artworks-000003692370-orohow-t500x500.jpg',
      duration: 195,
      playCount: 2882
    },
    // Video game track
    {
      id: 3,
      title: 'Frenetic Puzzle Game - Gameplay',
      artist: 'Music By David Mieloch',
      url: 'https://api.soundcloud.com/tracks/2182101',
      directUrl: 'https://soundcloud.com/davidmieloch/infinity-puzzle-game-music',
      artwork: 'https://i1.sndcdn.com/artworks-000002177932-410ed4-t500x500.jpg',
      duration: 195,
      playCount: 1426
    },
    // Classical track
    {
      id: 10,
      title: 'Requiem in Memory of a Dear Friend',
      artist: 'Music By David Mieloch',
      url: 'https://api.soundcloud.com/tracks/3210506',
      directUrl: 'https://soundcloud.com/davidmieloch/requiem-in-memory-of-a-dear-friend',
      artwork: 'https://i1.sndcdn.com/artworks-000003210506-gqp2i3-t500x500.jpg',
      duration: 184,
      playCount: 433
    },
    // Christmas track
    {
      id: 18,
      title: 'Chill-out ya Merry Gentleman',
      artist: 'Music By David Mieloch',
      url: 'https://api.soundcloud.com/tracks/3710634',
      directUrl: 'https://soundcloud.com/davidmieloch/chill-out-ya-merry-gentlemen',
      artwork: 'https://i1.sndcdn.com/artworks-000003710634-bh5s0c-t500x500.jpg',
      duration: 190,
      playCount: 399
    },
    // Video game track
    {
      id: 4,
      title: 'Casual Zombie Gameplay - iPhone',
      artist: 'Music By David Mieloch',
      url: 'https://api.soundcloud.com/tracks/2081242',
      directUrl: 'https://soundcloud.com/davidmieloch/zombie-romp',
      artwork: 'https://i1.sndcdn.com/artworks-000071916832-1bvrnp-t500x500.jpg',
      duration: 168,
      playCount: 491
    },
    // Classical track
    {
      id: 13,
      title: 'Lielexlium',
      artist: 'Music By David Mieloch',
      url: 'https://api.soundcloud.com/tracks/2072491',
      directUrl: 'https://soundcloud.com/davidmieloch/lielexlium-sampled-orchestra',
      artwork: 'https://i1.sndcdn.com/artworks-000002072491-76b3ry-t500x500.jpg',
      duration: 168,
      playCount: 141
    },
    // Christmas track
    {
      id: 19,
      title: 'It\'s a Wonderful Life for Kings',
      artist: 'Music By David Mieloch',
      url: 'https://api.soundcloud.com/tracks/3761645',
      directUrl: 'https://soundcloud.com/davidmieloch/its-a-wonderful-life-for-kings',
      artwork: 'https://i1.sndcdn.com/artworks-000003761645-udupoi-t500x500.jpg',
      duration: 185,
      playCount: 483
    },
    // Video game track
    {
      id: 5,
      title: 'Warrior Prepares for Battle - Game Cut Scene',
      artist: 'David Mieloch',
      url: 'https://api.soundcloud.com/tracks/2081003',
      directUrl: 'https://soundcloud.com/davidmieloch/warrior-prepares-for-battle',
      artwork: 'https://i1.sndcdn.com/artworks-000003655152-ao6nso-t500x500.jpg',
      duration: 180,
      playCount: 380
    },
    // Classical track
    {
      id: 14,
      title: 'Sonata No.1 - For String Orchestra',
      artist: 'Music By David Mieloch',
      url: 'https://api.soundcloud.com/tracks/2081003',
      directUrl: 'https://soundcloud.com/davidmieloch/sonata-no-1-orchestra-2001',
      artwork: 'https://i1.sndcdn.com/artworks-000002081003-lnlr5u-t500x500.jpg',
      duration: 220,
      playCount: 305
    },
    // Video game track
    {
      id: 6,
      title: 'Exotic Traveling Game Cut Scene - Light',
      artist: 'Music By David Mieloch',
      url: 'https://api.soundcloud.com/tracks/2182115',
      directUrl: 'https://soundcloud.com/davidmieloch/cue-for-short-doccumentary',
      artwork: 'https://i1.sndcdn.com/artworks-000002895824-okl0vt-t500x500.jpg',
      duration: 175,
      playCount: 402
    },
    // Classical track
    {
      id: 15,
      title: 'Identity Conflict Z - Chamber Trio',
      artist: 'Music By David Mieloch',
      url: 'https://api.soundcloud.com/tracks/2182115',
      directUrl: 'https://soundcloud.com/davidmieloch/identity-conflict-z',
      artwork: 'https://i1.sndcdn.com/artworks-000002182115-7z2y8k-t500x500.jpg',
      duration: 175,
      playCount: 111
    },
    // Video game track
    {
      id: 7,
      title: 'Exotic Traveling Game Cut Scene - Dark',
      artist: 'Music By David Mieloch',
      url: 'https://api.soundcloud.com/tracks/2182116',
      directUrl: 'https://soundcloud.com/davidmieloch/cue-for-short-doccumentary-2',
      artwork: 'https://i1.sndcdn.com/artworks-000002901753-n5hoir-t500x500.jpg',
      duration: 175,
      playCount: 314
    },
    // Video game track
    {
      id: 8,
      title: 'Sci-Fi First Person Shooter - Opening Credits',
      artist: 'Music By David Mieloch',
      url: 'https://api.soundcloud.com/tracks/2182117',
      directUrl: 'https://soundcloud.com/davidmieloch/dark-intro-music',
      artwork: 'https://i1.sndcdn.com/artworks-000002182015-hx8ot1-t500x500.jpg',
      duration: 180,
      playCount: 320
    },
    // Video game track
    {
      id: 9,
      title: 'Sci-Fi - First Person Shooter - Gameplay',
      artist: 'Music By David Mieloch',
      url: 'https://api.soundcloud.com/tracks/2182118',
      directUrl: 'https://soundcloud.com/davidmieloch/marine-devastation',
      artwork: 'https://i1.sndcdn.com/artworks-000002182071-rcb7kk-t500x500.jpg',
      duration: 180,
      playCount: 305
    }
  ];

  const links = socialLinks || [];
  const tracks = soundCloudTracks?.length ? soundCloudTracks : defaultSoundCloudTracks;

  return {
    theme,
    isDark,
    currentYear,
    links,
    tracks
  };
};

export const useFooterStatefulLogic = () => {
  const dualAudio = useDualAudio();
  const footerUI = useFooterUI({});
  const [lastPlayingState, setLastPlayingState] = useState<'music' | 'narration' | 'both' | 'none'>('none');

  const {
    musicAudioRef,
    voiceAudioRef,
    isMusicPlaying,
    activeMusicTrack,
    musicCurrentTime,
    musicDuration,
    musicVolume,
    playMusic,
    pauseMusic,
    seekMusic,
    setMusicVolume,
    loadMusicTrack,
    isVoicePlaying,
    activeVoiceTrack,
    voiceCurrentTime,
    voiceDuration,
    voiceVolume,
    playVoice,
    pauseVoice,
    seekVoice,
    setVoiceVolume,
    isMusicLooping,
    toggleMusicLooping,
    playNextMusicTrack,
    musicError,
    voiceError,
    isMusicEnabled,
    isNarrationEnabled,
    toggleMusic,
    toggleNarration,
  } = dualAudio;

  const {
    isExpanded,
    isMiniMode,
    isMounted,
    colors,
    progressBarRef,
    handleMinimizeToggle,
    handlePlaylistToggle,
    colorScheme,
    startUserInteraction,
  } = footerUI;

  const handleMusicTrackSelect = useCallback((track: AudioTrack) => {
    startUserInteraction?.();
    loadMusicTrack(track);
  }, [loadMusicTrack, startUserInteraction]);

  const isEffectivelyPlaying = (isMusicEnabled && isMusicPlaying) || (isNarrationEnabled && isVoicePlaying);

  const activeDisplayTrackDetails = (isNarrationEnabled && activeVoiceTrack) ? activeVoiceTrack : activeMusicTrack;
  const displayArtwork = activeMusicTrack?.artwork;
  const activeTiming = isMusicEnabled
    ? { current: musicCurrentTime, duration: musicDuration }
    : isNarrationEnabled
      ? { current: voiceCurrentTime, duration: voiceDuration }
      : { current: 0, duration: 0 };
  const progress = activeTiming.duration > 0 ? (activeTiming.current / activeTiming.duration) * 100 : 0;

  const currentPlaylist = musicPlaylist;
  const currentMusicTrackIndex = currentPlaylist.findIndex((t) => t.id === activeMusicTrack?.id);

  const handlePlayPause = useCallback(() => {
    startUserInteraction?.();

    console.log('handlePlayPause Triggered', {
      isMusicEnabled,
      isNarrationEnabled,
      isMusicPlaying,
      isVoicePlaying,
    });

    const musicWasPlaying = isMusicEnabled && isMusicPlaying;
    const voiceWasPlaying = isNarrationEnabled && isVoicePlaying;
    const anythingWasPlaying = musicWasPlaying || voiceWasPlaying;

    if (anythingWasPlaying) {
      // --- PAUSE LOGIC ---
      let stateToStore: 'music' | 'narration' | 'both' | 'none' = 'none';
      if (musicWasPlaying && voiceWasPlaying) {
        stateToStore = 'both';
      } else if (musicWasPlaying) {
        stateToStore = 'music';
      } else if (voiceWasPlaying) {
        stateToStore = 'narration';
      }
      setLastPlayingState(stateToStore); // Store state before pausing

      // Perform pause actions
      if (musicWasPlaying) pauseMusic();
      if (voiceWasPlaying) pauseVoice();

    } else {
      // --- PLAY LOGIC ---
      // Play based on the state stored just before the last pause
      switch (lastPlayingState) {
        case 'music':
          if (isMusicEnabled) playMusic();
          break;
        case 'narration':
          if (isNarrationEnabled) playVoice();
          break;
        case 'both':
          if (isMusicEnabled) playMusic();
          if (isNarrationEnabled) playVoice();
          break;
        case 'none': // Nothing was playing before, or initial state
        default:
          // Fallback: Play based on current *enabled* status if nothing was playing before
          if (isMusicEnabled && isNarrationEnabled) {
            playMusic(); // Play both if both enabled
            playVoice();
          } else if (isMusicEnabled) {
            playMusic(); // Play music if only music enabled
          } else if (isNarrationEnabled) {
            playVoice(); // Play voice if only narration enabled
          }
          // If both disabled, do nothing
          break;
      }
      // Optional: Reset lastPlayingState after playing? 
      // setLastPlayingState('none'); // Let's not reset for now, keep memory until next pause.
    }
  }, [isMusicEnabled, isNarrationEnabled, isMusicPlaying, isVoicePlaying, pauseMusic, pauseVoice, playMusic, playVoice, startUserInteraction, lastPlayingState]);

  const handleSeek = useCallback((newProgress: number) => {
    startUserInteraction?.();
    const duration = isMusicEnabled ? musicDuration : voiceDuration;
    if (duration > 0) {
      const time = (newProgress / 100) * duration;
      if (isMusicEnabled) {
        seekMusic(time);
      } else if (isNarrationEnabled) {
        seekVoice(time);
      }
    }
  }, [isMusicEnabled, musicDuration, voiceDuration, seekMusic, seekVoice, startUserInteraction]);

  const handleNextMusicTrack = useCallback(() => {
    const currentIndex = musicPlaylist.findIndex(t => t.id === activeMusicTrack?.id);
    if (currentIndex !== -1) {
      const nextIndex = (currentIndex + 1) % musicPlaylist.length;
      handleMusicTrackSelect(musicPlaylist[nextIndex]);
    }
  }, [activeMusicTrack, handleMusicTrackSelect]);

  const handlePrevMusicTrack = useCallback(() => {
    const currentIndex = musicPlaylist.findIndex(t => t.id === activeMusicTrack?.id);
    if (currentIndex !== -1) {
      const prevIndex = (currentIndex - 1 + musicPlaylist.length) % musicPlaylist.length;
      handleMusicTrackSelect(musicPlaylist[prevIndex]);
    }
  }, [activeMusicTrack, handleMusicTrackSelect]);

  useEffect(() => {
    if (isMounted && !activeMusicTrack && musicPlaylist.length > 0) {
      loadMusicTrack(musicPlaylist[0]);
    }
  }, [isMounted, activeMusicTrack, loadMusicTrack]);

  let miniPlayerDisplayTitle = 'Track';
  if (isMusicEnabled && isNarrationEnabled && activeMusicTrack?.title) {
    miniPlayerDisplayTitle = `Narration + ${activeMusicTrack.title}`;
  } else if (isNarrationEnabled) {
    miniPlayerDisplayTitle = 'Narration';
  } else if (isMusicEnabled && activeMusicTrack?.title) {
    miniPlayerDisplayTitle = activeMusicTrack.title;
  }

  return {
    ...dualAudio,
    ...footerUI,
    handleMusicTrackSelect,
    isEffectivelyPlaying,
    activeDisplayTrackDetails,
    displayArtwork,
    activeTiming,
    progress,
    currentPlaylist,
    currentMusicTrackIndex,
    handlePlayPause,
    handleSeek,
    handleNextMusicTrack,
    handlePrevMusicTrack,
    miniPlayerDisplayTitle,
    lastPlayingState,
  };
}; 