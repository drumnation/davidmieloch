# Dual Audio Player Feature Status

**Last Updated:** $(date +'%Y-%m-%d %H:%M:%S')

## Current State & Functionality

*   **Core Logic:** The primary logic resides in `src/shared-components/organisms/Footer/dual-audio/useDualAudioController.ts`.
*   **Dual Audio Elements:** Two separate `<audio>` elements are used (via `musicAudioRef` and `voiceAudioRef`) rendered hidden within `src/shared-components/organisms/Footer/Footer.tsx`.
*   **Independent State:** State variables (play/pause, time, duration, volume, active track) are managed independently for music and voice.
*   **Context:** State and actions are provided via `DualAudioContext` created in `src/shared-components/organisms/Footer/dual-audio/DualAudioContext.tsx`.
*   **Voice Loading:** Voice tracks are dynamically loaded based on the current route using `useVoiceTrackLoader` and the `voiceTracks.ts` playlist.
*   **Playlists Synced:** The `voiceTracks.ts` playlist has been updated to match the MP3s in `/public/audio/voice/`. `musicPlaylist.ts` manages background music.
*   **Route Cleanup:** A potentially redundant route (`app/best-practices-integration/`) was removed.
*   **Event Listeners:** `timeupdate`, `ended`, and `loadedmetadata` listeners are attached to keep state synchronized.
*   **Music Ducking:** Implemented logic to lower music volume (`DUCK_VOLUME = 0.2`) when a voice track plays in `BOTH` mode and restore it afterward.
*   **Mode Switching:** Logic handles volume adjustments and playback state changes when switching between `MUSIC_ONLY`, `VOICE_ONLY`, and `BOTH` modes.
*   **Volume/Seek:** Volume and seek handlers clamp values and consider the current mode and ducking state.

## How It Works (High Level)

1.  `Footer.tsx` renders the player UI (`MiniPlayer`, `StandardPlayer`, `Playlist`) and the hidden `<audio>` elements.
2.  `Footer.tsx` consumes `useDualAudio` to get state/actions from the context.
3.  `DualAudioContext` uses `useDualAudioController` to manage all the underlying audio logic.
4.  `useDualAudioController` sets up state, refs, event listeners, and defines actions (play, pause, seek, load, setVolume, setMode).
5.  `useVoiceTrackLoader` (used within the controller) listens to route changes and calls `loadVoiceTrack` with the appropriate track from `voiceTracks.ts`.
6.  Effects within `useDualAudioController` handle music ducking based on `isVoicePlaying` and mode changes.

## Remaining Tasks / Next Steps

*   **Implement Track Ending Logic:** Define behavior in `handleMusicEnded` and `handleVoiceEnded` within `useDualAudioController.ts`:
    *   Music: Play next track in playlist? Loop? Stop?
    *   Voice: Clear active track? Switch mode back to Music Only?
*   **Thorough Testing:** Execute the extensive QA checklist below.
*   **Browser Compatibility/Edge Cases:** Test across different browsers and handle potential browser limitations (e.g., autoplay restrictions requiring user interaction).
*   **Error Handling:** Improve error handling for audio loading/playback failures beyond basic console logs.
*   **(Deferred) Test Suite:** Fix/update Vitest snapshot tests.
*   **(Optional) Polish:** Consider bonus features from the checklist (preload indicators, persistent mode, adjustable duck volume).

---

✅ Perfect — you're ready for the final phase.

Here's the **"🎯 Post-Launch QA Checklist: Dual Audio System"** (expanded, final version):

---

# 🎯 Post-Launch QA Checklist: Dual Audio System

---

## 🚀 Basic Functional Testing

- [ ] **Music plays** when the page loads.
- [ ] **Voice track auto-loads** based on current route.
- [ ] **Voice track plays** when toggled to Voice or Both mode.
- [ ] **Music and Voice both play simultaneously** when toggled to Both mode.
- [ ] **Pausing** pauses both tracks (in Both mode).
- [ ] **Play button state matches** whether tracks are actually playing.
- [ ] **Seek bar correctly moves** based on the active track (music vs voice).
- [ ] **Seek bar interaction** (scrub to 50%) works cleanly and updates the correct track.
- [ ] **Volume slider adjusts** the correct audio (voice/music depending on mode).
- [ ] **Mode toggle button cycles** through Music → Voice → Both smoothly.
- [ ] **Switching mode mid-playback** (e.g., Music → Both) doesn't crash or cause weird audio overlaps.

---

## 🔀 Route Navigation Testing

- [ ] **Music continues uninterrupted** when navigating between pages.
- [ ] **Voice track changes** when the page route changes (new narration loads).
- [ ] **Old voice track stops immediately** on page change (no overlap/ghosting).
- [ ] **Voice playback auto-starts** if it was playing before navigating.
- [ ] **MiniPlayer and StandardPlayer survive route changes** without glitches.

---

## 🎛️ Player UI Behavior

- [ ] **MiniPlayer appears** when scrolling down (Mini Mode trigger).
- [ ] **StandardPlayer reappears** when scrolling up.
- [ ] **Playlist opens** correctly on button click.
- [ ] **Playlist displays correct tracks** from `musicPlaylist.ts`.
- [ ] **Selecting a track from Playlist** loads and plays that music track.
- [ ] **Active track is visually highlighted** in Playlist (optional polish).

---

## 📱 Mobile Testing (Critical!)

- [ ] **MiniPlayer responsive** and usable at mobile screen sizes.
- [ ] **Tap-to-toggle modes** (Music/Voice/Both) works cleanly on touch.
- [ ] **Playlist scrollable and playable** without UI glitches on mobile.

---

## 🔊 Audio Behavior and Ducking

- [ ] **Volume ducking triggers** when voice starts during Both mode.
- [ ] **Volume ducking restores** when voice finishes or is paused.
- [ ] **No crackling or pops** when ducking/unducking happens.
- [ ] **Smooth transitions** in ducked volume (no sudden jumps).

---

## ⚡ Performance & Smoothness

- [ ] **No lag or stutter** when changing modes.
- [ ] **No audio gaps** during seek or route change.
- [ ] **Voice track preload** reduces initial load delay on page enter.
- [ ] **Multiple rapid page changes** don't cause memory leaks or broken audio.
- [ ] **Mute/unmute actions** on device/system don't crash the player.

---

## 🧹 Console and Error Cleanliness

- [ ] **Zero console warnings** related to audio, refs, or event listeners.
- [ ] **No uncaught promise rejections** (common if `audio.play()` fails).
- [ ] **No 404s** for audio file paths (public assets correctly resolved).

---

## 🧠 "Brain-Check" Critical Thinking Tests

- [ ] If a user **pauses music manually**, does it stay paused even if navigating?
- [ ] If a user **switches modes during voice**, does the correct playback logic still happen?
- [ ] What happens if they **spam Play/Pause rapidly**? (No stuck states.)
- [ ] What happens if they **navigate super fast between pages**? (Voice keeps up.)

---

# 🌱 Bonus (Nice but Optional)

- [ ] **Preload indicators** (small visual cue when voice is preloading, optional polish).
- [ ] **Mode persists in memory** (localStorage or memory cache) across route changes (optional polish).
- [ ] **Duck volume adjustable** via settings (e.g., how much music lowers, optional polish).

---

# 🏆 If you pass 90% of this list...

You will have a player system  
**on par with major SaaS-grade products.**  
No exaggeration.

---

Would you like me to also quickly list the **"Top 3 Ultra-Polish Bonus Upgrades"** that go *beyond* this checklist if you really want this to feel next-level? 🎨🎵  
They are fast to implement if you want them! 🚀  
Want them?