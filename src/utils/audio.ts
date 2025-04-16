// Utility for playing audio/sound effects in the app

// Sound IDs for easy reference
export const SOUNDS = {
  // UI Sounds
  MENU_SELECT: 'menu-select',
  MENU_NAVIGATE: 'menu-navigate',
  BUTTON_CLICK: 'button-click',
  GAME_START: 'game-start',
  ACHIEVEMENT: 'achievement',
  
  // Collectible Sounds
  COLLECT_COMMON: 'collect-common',
  COLLECT_RARE: 'collect-rare',
  COLLECT_LEGENDARY: 'collect-legendary',
  SET_COMPLETE: 'set-complete'
};

// Local storage key for sound settings
const AUDIO_SETTINGS_KEY = 'pixel-palace-audio-settings';

// Sound effects paths
const SOUND_PATHS = {
  // UI Sounds
  [SOUNDS.MENU_SELECT]: '/sounds/menu-select.mp3',
  [SOUNDS.MENU_NAVIGATE]: '/sounds/menu-navigate.mp3',
  [SOUNDS.BUTTON_CLICK]: '/sounds/button-click.mp3',
  [SOUNDS.GAME_START]: '/sounds/game-start.mp3',
  [SOUNDS.ACHIEVEMENT]: '/sounds/achievement.mp3',
  
  // Collectible Sounds
  [SOUNDS.COLLECT_COMMON]: '/sounds/collect-common.mp3',
  [SOUNDS.COLLECT_RARE]: '/sounds/collect-rare.mp3',
  [SOUNDS.COLLECT_LEGENDARY]: '/sounds/collect-legendary.mp3',
  [SOUNDS.SET_COMPLETE]: '/sounds/set-complete.mp3'
};

// Default audio settings
const defaultSettings = {
  masterVolume: 0.7,
  sfxVolume: 1.0,
  musicVolume: 0.5,
  sfxEnabled: true,
  musicEnabled: true
};

// Audio settings state
let audioSettings = { ...defaultSettings };

// Map to store preloaded audio objects
const loadedSounds: Record<string, HTMLAudioElement> = {};

// Initialize the audio system and preload essential sounds
export const initAudio = () => {
  try {
    const savedSettings = localStorage.getItem(AUDIO_SETTINGS_KEY);
    if (savedSettings) {
      audioSettings = JSON.parse(savedSettings);
    } else {
      localStorage.setItem(AUDIO_SETTINGS_KEY, JSON.stringify(defaultSettings));
    }
    
    // Preload commonly used sounds for responsive gameplay
    preloadSound(SOUNDS.COLLECT_COMMON);
    preloadSound(SOUNDS.BUTTON_CLICK);
    preloadSound(SOUNDS.MENU_SELECT);
    preloadSound(SOUNDS.ACHIEVEMENT);
  } catch (error) {
    console.error('Error initializing audio:', error);
  }
};

// Pre-load a sound effect for faster playback
const preloadSound = (id: string) => {
  if (loadedSounds[id]) return;
  
  const path = SOUND_PATHS[id];
  if (!path) {
    console.error(`Sound path not found for ID: ${id}`);
    return;
  }
  
  const audio = new Audio(path);
  audio.load();
  loadedSounds[id] = audio;
};

// Play a sound effect with promise to allow awaiting completion
export const playSound = async (id: string, volume?: number): Promise<void> => {
  if (!audioSettings.sfxEnabled) return Promise.resolve();
  
  // Lazy-load the sound if it hasn't been loaded yet
  if (!loadedSounds[id]) {
    preloadSound(id);
  }
  
  const sound = loadedSounds[id];
  if (!sound) {
    console.error(`Sound not loaded for ID: ${id}`);
    return Promise.resolve();
  }
  
  // Reset the sound to the beginning if it's already playing
  sound.currentTime = 0;
  
  // Set the volume
  const vol = volume !== undefined ? volume : audioSettings.sfxVolume * audioSettings.masterVolume;
  sound.volume = Math.min(Math.max(vol, 0), 1);
  
  // Play the sound and return a promise that resolves when the sound completes
  try {
    await sound.play();
    
    return new Promise((resolve) => {
      // For very short sounds, we might want to resolve immediately
      if (sound.duration < 0.1) {
        resolve();
        return;
      }
      
      const onEnded = () => {
        sound.removeEventListener('ended', onEnded);
        resolve();
      };
      
      sound.addEventListener('ended', onEnded);
    });
  } catch (error) {
    console.error(`Error playing sound ${id}:`, error);
    return Promise.resolve();
  }
};

// Play collectible sound based on rarity
export const playCollectibleSound = async (rarity: string) => {
  switch(rarity) {
    case 'common':
      return playSound(SOUNDS.COLLECT_COMMON);
    case 'rare':
      return playSound(SOUNDS.COLLECT_RARE);
    case 'epic':
    case 'legendary':
      return playSound(SOUNDS.COLLECT_LEGENDARY);
    default:
      return playSound(SOUNDS.COLLECT_COMMON);
  }
};

// Play sound for completing a set of collectibles
export const playSetCompleteSound = () => {
  return playSound(SOUNDS.SET_COMPLETE, 0.8); // Slightly louder for impact
};

// Update audio settings
export const updateAudioSettings = (newSettings: Partial<typeof audioSettings>) => {
  audioSettings = { ...audioSettings, ...newSettings };
  localStorage.setItem(AUDIO_SETTINGS_KEY, JSON.stringify(audioSettings));
  
  return audioSettings;
};

// Get current audio settings
export const getAudioSettings = () => {
  return { ...audioSettings };
};

// Mute/unmute all sounds
export const toggleMute = (mute: boolean) => {
  updateAudioSettings({
    sfxEnabled: !mute,
    musicEnabled: !mute
  });
  return !mute;
};
