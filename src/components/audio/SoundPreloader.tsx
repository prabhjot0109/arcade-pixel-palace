import React, { useEffect } from 'react';

// List of all sound effects that should be preloaded
const soundFiles = [
  '/sounds/collect-common.mp3',
  '/sounds/collect-rare.mp3',
  '/sounds/collect-legendary.mp3',
  '/sounds/set-complete.mp3',
  '/sounds/menu-select.mp3',
  '/sounds/menu-navigate.mp3',
  '/sounds/button-click.mp3',
  '/sounds/game-start.mp3',
  '/sounds/achievement.mp3',
];

/**
 * Component that preloads all sound effects to ensure they can be played without delay
 * This helps with mobile browsers that may have restrictions on audio playback
 */
const SoundPreloader: React.FC = () => {
  useEffect(() => {
    // Create audio elements for each sound file and load them
    soundFiles.forEach(soundUrl => {
      const audio = new Audio();
      // Use a small hack to force mobile browsers to initialize audio context
      audio.volume = 0;
      audio.src = soundUrl;
      
      // Try to play and immediately pause to activate audio context
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Playback started successfully, now pause it
            audio.pause();
            audio.currentTime = 0;
            console.log(`Preloaded sound: ${soundUrl}`);
          })
          .catch(error => {
            // Auto-play was prevented, but file should still be loaded in cache
            console.log(`Could not preload sound: ${soundUrl}`, error);
          });
      }
    });
  }, []);

  // This component doesn't render anything visible
  return null;
};

export default SoundPreloader;
