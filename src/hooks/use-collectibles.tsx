
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import { playSound, SOUNDS, initAudio } from "../utils/audio";

export type RarityType = 'common' | 'rare' | 'epic' | 'legendary';
export type CollectibleCategoryType = 'currency' | 'powerup' | 'artifact' | 'character' | 'key';
export type CollectibleSetType = 'mario' | 'zelda' | 'sonic' | 'arcade' | 'console' | 'rpg';

export type CollectibleType = {
  id: string;
  name: string;
  icon: string;
  found: boolean;
  location: string;
  rarity: RarityType;
  category: CollectibleCategoryType;
  set?: CollectibleSetType;
  description: string;
  value: number; // Currency value for trading or upgrades
  effect?: string; // Special effect when used/activated
  animationClass?: string; // CSS class for custom animations
};

interface CollectiblesContextType {
  collectibles: CollectibleType[];
  collectedCount: number;
  totalCollectibles: number;
  collectItem: (id: string) => Promise<void>;
  hasCollected: (id: string) => boolean;
  resetCollectibles: () => void;
  getCollectiblesBySet: (set: CollectibleSetType) => CollectibleType[];
  getCollectiblesByRarity: (rarity: RarityType) => CollectibleType[];
  getCollectiblesByCategory: (category: CollectibleCategoryType) => CollectibleType[];
  getSetsProgress: () => Record<CollectibleSetType, { total: number; collected: number; complete: boolean }>;
  getTotalValue: () => number;
}

const initialCollectibles: CollectibleType[] = [
  // Mario Series - Full Set
  { 
    id: "mushroom", 
    name: "Power Mushroom", 
    icon: "🍄", 
    found: false, 
    location: "super-mario-bros",
    rarity: "common",
    category: "powerup",
    set: "mario",
    description: "Makes Mario grow twice his size.",
    value: 10,
    effect: "Doubles your health",
    animationClass: "bounce-grow"
  },
  { 
    id: "fire-flower", 
    name: "Fire Flower", 
    icon: "🔥", 
    found: false, 
    location: "super-mario-bros",
    rarity: "rare",
    category: "powerup",
    set: "mario",
    description: "Grants Mario the ability to throw fireballs.",
    value: 30,
    effect: "Enables fire attacks",
    animationClass: "pulse-fire"
  },
  { 
    id: "star", 
    name: "Invincibility Star", 
    icon: "⭐", 
    found: false, 
    location: "games",
    rarity: "epic",
    category: "powerup",
    set: "mario",
    description: "Makes Mario temporarily invincible.",
    value: 50,
    effect: "Temporary invincibility",
    animationClass: "star-spin"
  },
  { 
    id: "1up", 
    name: "1-Up Mushroom", 
    icon: "🟢", 
    found: false, 
    location: "super-mario-bros",
    rarity: "legendary",
    category: "powerup",
    set: "mario",
    description: "Gives Mario an extra life. Very rare!",
    value: 100,
    effect: "Extra life",
    animationClass: "green-pulse"
  },
  
  // Zelda Series - Full Set
  { 
    id: "rupee", 
    name: "Green Rupee", 
    icon: "💚", 
    found: false, 
    location: "legend-of-zelda",
    rarity: "common",
    category: "currency",
    set: "zelda",
    description: "Basic currency in Hyrule. Worth 1 rupee.",
    value: 5,
    animationClass: "sparkle-green"
  },
  { 
    id: "blue-rupee", 
    name: "Blue Rupee", 
    icon: "💙", 
    found: false, 
    location: "legend-of-zelda",
    rarity: "rare",
    category: "currency",
    set: "zelda",
    description: "Valuable currency. Worth 5 rupees.",
    value: 15,
    animationClass: "sparkle-blue"
  },
  { 
    id: "heart-container", 
    name: "Heart Container", 
    icon: "❤️", 
    found: false, 
    location: "legend-of-zelda",
    rarity: "epic",
    category: "powerup",
    set: "zelda",
    description: "Increases Link's maximum health.",
    value: 60,
    effect: "Permanent health increase",
    animationClass: "heart-beat"
  },
  { 
    id: "sword", 
    name: "Master Sword", 
    icon: "🗡️", 
    found: false, 
    location: "legend-of-zelda",
    rarity: "legendary",
    category: "artifact",
    set: "zelda",
    description: "The legendary blade of evil's bane.",
    value: 120,
    effect: "Repels evil and breaks curses",
    animationClass: "sword-shine"
  },
  
  // Sonic Series - Full Set
  { 
    id: "ring", 
    name: "Golden Ring", 
    icon: "⭕", 
    found: false, 
    location: "sonic",
    rarity: "common",
    category: "currency",
    set: "sonic",
    description: "Protects Sonic from damage when hit.",
    value: 5,
    effect: "Protection from one hit",
    animationClass: "ring-rotate"
  },
  { 
    id: "speed-shoes", 
    name: "Speed Shoes", 
    icon: "👟", 
    found: false, 
    location: "sonic",
    rarity: "rare",
    category: "powerup",
    set: "sonic",
    description: "Temporarily increases Sonic's speed.",
    value: 25,
    effect: "Speed boost",
    animationClass: "zoom-blur"
  },
  { 
    id: "shield", 
    name: "Shield", 
    icon: "🛡️", 
    found: false, 
    location: "sonic",
    rarity: "epic",
    category: "powerup",
    set: "sonic",
    description: "Protects Sonic from one projectile hit.",
    value: 45,
    effect: "Projectile protection",
    animationClass: "shield-pulse"
  },
  { 
    id: "gem", 
    name: "Chaos Emerald", 
    icon: "💎", 
    found: false, 
    location: "collectibles",
    rarity: "legendary",
    category: "artifact",
    set: "sonic",
    description: "One of the seven powerful Chaos Emeralds.",
    value: 90,
    effect: "Enables Super Sonic transformation",
    animationClass: "gem-prism"
  },
  
  // Arcade Classics Collection
  { 
    id: "cherry", 
    name: "Power Cherry", 
    icon: "🍒", 
    found: false, 
    location: "games",
    rarity: "common",
    category: "powerup",
    set: "arcade",
    description: "Pac-Man's favorite snack.",
    value: 10,
    effect: "Small score bonus",
    animationClass: "bounce"
  },
  { 
    id: "ghost", 
    name: "Blue Ghost", 
    icon: "👻", 
    found: false, 
    location: "games",
    rarity: "rare",
    category: "character",
    set: "arcade",
    description: "A frightened ghost that Pac-Man can eat.",
    value: 30,
    effect: "Score multiplier",
    animationClass: "ghost-float"
  },
  { 
    id: "galaga", 
    name: "Galaga Ship", 
    icon: "🚀", 
    found: false, 
    location: "games",
    rarity: "epic",
    category: "artifact",
    set: "arcade",
    description: "Player ship from the classic arcade game Galaga.",
    value: 60,
    effect: "Extra attack power",
    animationClass: "ship-hover"
  },
  { 
    id: "arcade-cabinet", 
    name: "Arcade Cabinet", 
    icon: "🎮", 
    found: false, 
    location: "games",
    rarity: "legendary",
    category: "artifact",
    set: "arcade",
    description: "A miniature working arcade cabinet!",
    value: 110,
    effect: "Play bonus mini-games",
    animationClass: "cabinet-light"
  },
  
  // Console Wars Collection
  { 
    id: "gameboy", 
    name: "Game Boy", 
    icon: "🎮", 
    found: false, 
    location: "pokemon",
    rarity: "common",
    category: "artifact",
    set: "console",
    description: "Nintendo's revolutionary handheld console.",
    value: 15,
    effect: "Reveals hidden items",
    animationClass: "gameboy-on"
  },
  { 
    id: "snes", 
    name: "SNES Controller", 
    icon: "🎮", 
    found: false, 
    location: "donkey-kong",
    rarity: "rare",
    category: "artifact",
    set: "console",
    description: "The iconic controller for the Super Nintendo.",
    value: 35,
    effect: "Special move unlocks",
    animationClass: "controller-press"
  },
  { 
    id: "playstation", 
    name: "PlayStation Memory Card", 
    icon: "💾", 
    found: false, 
    location: "final-fantasy",
    rarity: "epic",
    category: "artifact",
    set: "console",
    description: "Stores game saves on the original PlayStation.",
    value: 50,
    effect: "Save progress anywhere",
    animationClass: "card-insert"
  },
  { 
    id: "console-gem", 
    name: "Golden Console", 
    icon: "🏆", 
    found: false, 
    location: "home",
    rarity: "legendary",
    category: "artifact",
    set: "console",
    description: "A mythical golden gaming console of legend.",
    value: 130,
    effect: "Unlocks secret minigames",
    animationClass: "golden-shine"
  },
  
  // RPG Elements
  { 
    id: "potion", 
    name: "Health Potion", 
    icon: "🧪", 
    found: false, 
    location: "collectibles",
    rarity: "common",
    category: "powerup",
    set: "rpg",
    description: "Restores a small amount of health.",
    value: 10,
    effect: "Heal small amount",
    animationClass: "potion-bubble"
  },
  { 
    id: "scroll", 
    name: "Magic Scroll", 
    icon: "📜", 
    found: false, 
    location: "trivia",
    rarity: "rare",
    category: "powerup",
    set: "rpg",
    description: "Contains ancient knowledge and spells.",
    value: 25,
    effect: "Reveals secret knowledge",
    animationClass: "scroll-unroll"
  },
  { 
    id: "pokeball", 
    name: "Poké Ball", 
    icon: "⚪", 
    found: false, 
    location: "pokemon",
    rarity: "epic",
    category: "artifact",
    set: "rpg",
    description: "Used to catch and store Pokémon.",
    value: 65,
    effect: "Collects bonus items automatically",
    animationClass: "pokeball-wiggle"
  },
  { 
    id: "materia", 
    name: "Magic Materia", 
    icon: "🔮", 
    found: false, 
    location: "final-fantasy",
    rarity: "legendary",
    category: "artifact",
    set: "rpg",
    description: "Crystallized magical energy from the Lifestream.",
    value: 100,
    effect: "Cast powerful spells",
    animationClass: "materia-glow"
  },
  
  // Utility/Special Items
  { 
    id: "key", 
    name: "Secret Key", 
    icon: "🔑", 
    found: false, 
    location: "trivia",
    rarity: "epic",
    category: "key",
    description: "Opens locked areas with hidden treasures.",
    value: 40,
    effect: "Unlocks secret areas",
    animationClass: "key-turn"
  },
  { 
    id: "map", 
    name: "Treasure Map", 
    icon: "🗺️", 
    found: false, 
    location: "about",
    found: false, 
    location: "profile",
    rarity: "legendary",
    category: "artifact",
    description: "Proof of your mastery of the Pixel Palace Arcade.",
    value: 150,
    effect: "Unlocks all themes and bonus content",
    animationClass: "trophy-sparkle"
  }
];

const CollectiblesContext = createContext<CollectiblesContextType | undefined>(undefined);

export const CollectiblesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [collectibles, setCollectibles] = useState<CollectibleType[]>(() => {
    const saved = localStorage.getItem("pixel-palace-collectibles");
    return saved ? JSON.parse(saved) : initialCollectibles;
  });

  const collectedCount = collectibles.filter(item => item.found).length;
  const totalCollectibles = collectibles.length;

  // Initialize audio on mount
  useEffect(() => {
    initAudio();
  }, []);

  useEffect(() => {
    localStorage.setItem("pixel-palace-collectibles", JSON.stringify(collectibles));
  }, [collectibles]);

  // Check if a set is complete after collecting an item
  const checkSetCompletion = (set: CollectibleSetType): boolean => {
    const setItems = collectibles.filter(item => item.set === set);
    return setItems.every(item => item.found);
  };

  const collectItem = async (id: string) => {
    const item = collectibles.find(item => item.id === id);
    if (!item || item.found) return;

    // Update state to mark item as found
    setCollectibles(prev => 
      prev.map(i => 
        i.id === id ? { ...i, found: true } : i
      )
    );
    
    // Play appropriate sound based on item rarity
    if (item) {
      try {
        // Choose sound based on rarity and play it immediately
        switch(item.rarity) {
          case 'common':
            // Use direct audio method for more reliable playback
            const commonAudio = new Audio('/sounds/collect-common.mp3');
            commonAudio.volume = 0.7;
            commonAudio.play();
            break;
          case 'rare':
            const rareAudio = new Audio('/sounds/collect-rare.mp3');
            rareAudio.volume = 0.7;
            rareAudio.play();
            break;
          case 'epic':
          case 'legendary':
            const legendaryAudio = new Audio('/sounds/collect-legendary.mp3');
            legendaryAudio.volume = 0.7;
            legendaryAudio.play();
            break;
        }
      } catch (error) {
        console.error('Error playing sound:', error);
      }
      
      // Custom toast style based on rarity
      const toastStyle = {
        common: {},
        rare: { style: { background: '#4361ee', color: 'white' } },
        epic: { style: { background: '#9d4edd', color: 'white' } },
        legendary: { style: { background: '#ff7700', color: 'white' } }
      };
      
      // Use toast.dismiss to remove any previous toasts
      toast.dismiss();
      
      // Show single toast notification with rarity indicator
      toast.success(
        <div className="flex items-center">
          <span className="text-2xl mr-2">{item.icon}</span>
          <div>
            <div className="font-bold">{item.name}</div>
            <div className="text-sm capitalize">{item.rarity} {item.category}</div>
          </div>
        </div>,
        {
          description: item.description,
          ...(toastStyle[item.rarity] || {}),
          id: `collectible-${id}`, // Use ID to prevent duplicates
          dismissible: true // Allow users to dismiss the toast
        }
      );

      // If this completes a set, add a checkmark to the toast instead of a separate notification
      if (item.set) {
        const isSetComplete = checkSetCompletion(item.set);
        if (isSetComplete) {
          try {
            // Direct audio playback for set completion
            const setAudio = new Audio('/sounds/set-complete.mp3');
            setAudio.volume = 0.8;
            setAudio.play();
            
            // Update player stats - increment completed sets
            // This will be used for leaderboards and achievements
            const completedSetsCount = Object.values(getSetsProgress()).filter(set => set.complete).length;
            localStorage.setItem('pixel-palace-completed-sets', completedSetsCount.toString());
          } catch (err) {
            console.error('Error playing set completion sound:', err);
          }
        }
      }
    }
  };
  const hasCollected = (id: string): boolean => {
    return collectibles.find(item => item.id === id)?.found || false;
  };

  const resetCollectibles = () => {
    setCollectibles(initialCollectibles);
    toast.info("All collectibles have been reset", {
      description: "Your collection has been reset to its initial state."
    });
  };
  
  // New methods for enhanced collectibles functionality
  const getCollectiblesBySet = (set: CollectibleSetType): CollectibleType[] => {
    return collectibles.filter(item => item.set === set);
  };
  
  const getCollectiblesByRarity = (rarity: RarityType): CollectibleType[] => {
    return collectibles.filter(item => item.rarity === rarity);
  };
  
  const getCollectiblesByCategory = (category: CollectibleCategoryType): CollectibleType[] => {
    return collectibles.filter(item => item.category === category);
  };
  
  const getSetsProgress = (): Record<CollectibleSetType, { total: number; collected: number; complete: boolean }> => {
    const sets: CollectibleSetType[] = ['mario', 'zelda', 'sonic', 'arcade', 'console', 'rpg'];
    
    return sets.reduce((acc, set) => {
      const setItems = collectibles.filter(item => item.set === set);
      const totalInSet = setItems.length;
      const collectedInSet = setItems.filter(item => item.found).length;
      
      acc[set] = {
        total: totalInSet,
        collected: collectedInSet,
        complete: totalInSet > 0 && collectedInSet === totalInSet
      };
      
      return acc;
    }, {} as Record<CollectibleSetType, { total: number; collected: number; complete: boolean }>);
  };
  
  const getTotalValue = (): number => {
    return collectibles
      .filter(item => item.found)
      .reduce((sum, item) => sum + item.value, 0);
  };

  return (
    <CollectiblesContext.Provider 
      value={{ 
        collectibles, 
        collectedCount, 
        totalCollectibles, 
        collectItem, 
        hasCollected,
        resetCollectibles,
        getCollectiblesBySet,
        getCollectiblesByRarity,
        getCollectiblesByCategory,
        getSetsProgress,
        getTotalValue
      }}
    >
      {children}
    </CollectiblesContext.Provider>
  );
};

export const useCollectibles = () => {
  const context = useContext(CollectiblesContext);
  if (context === undefined) {
    throw new Error("useCollectibles must be used within a CollectiblesProvider");
  }
  return context;
};
