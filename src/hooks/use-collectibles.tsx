
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

type CollectibleType = {
  id: string;
  name: string;
  icon: string;
  found: boolean;
  location: string;
};

interface CollectiblesContextType {
  collectibles: CollectibleType[];
  collectedCount: number;
  totalCollectibles: number;
  collectItem: (id: string) => void;
  hasCollected: (id: string) => boolean;
}

const initialCollectibles: CollectibleType[] = [
  { 
    id: "mushroom", 
    name: "Power Mushroom", 
    icon: "🍄", 
    found: false, 
    location: "super-mario-bros" 
  },
  { 
    id: "coin", 
    name: "Gold Coin", 
    icon: "🪙", 
    found: false, 
    location: "home" 
  },
  { 
    id: "star", 
    name: "Invincibility Star", 
    icon: "⭐", 
    found: false, 
    location: "games" 
  },
  { 
    id: "cherry", 
    name: "Power Cherry", 
    icon: "🍒", 
    found: false, 
    location: "games" 
  },
  { 
    id: "key", 
    name: "Secret Key", 
    icon: "🔑", 
    found: false, 
    location: "trivia" 
  },
  { 
    id: "gem", 
    name: "Chaos Emerald", 
    icon: "💎", 
    found: false, 
    location: "collectibles" 
  },
  { 
    id: "sword", 
    name: "Master Sword", 
    icon: "🗡️", 
    found: false, 
    location: "legend-of-zelda" 
  },
  { 
    id: "ring", 
    name: "Golden Ring", 
    icon: "⭕", 
    found: false, 
    location: "sonic" 
  },
  { 
    id: "fist", 
    name: "Dragon Punch", 
    icon: "👊", 
    found: false, 
    location: "street-fighter" 
  },
  { 
    id: "banana", 
    name: "Golden Banana", 
    icon: "🍌", 
    found: false, 
    location: "donkey-kong" 
  },
  { 
    id: "block", 
    name: "Tetris Block", 
    icon: "⬛", 
    found: false, 
    location: "tetris" 
  },
  { 
    id: "pokeball", 
    name: "Poké Ball", 
    icon: "⚪", 
    found: false, 
    location: "pokemon" 
  },
  { 
    id: "materia", 
    name: "Magic Materia", 
    icon: "🔮", 
    found: false, 
    location: "final-fantasy" 
  },
  { 
    id: "potion", 
    name: "Health Potion", 
    icon: "🧪", 
    found: false, 
    location: "collectibles" 
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

  useEffect(() => {
    localStorage.setItem("pixel-palace-collectibles", JSON.stringify(collectibles));
  }, [collectibles]);

  const collectItem = (id: string) => {
    setCollectibles(prev => 
      prev.map(item => 
        item.id === id ? { ...item, found: true } : item
      )
    );
    
    const item = collectibles.find(item => item.id === id);
    if (item) {
      toast.success(`You found the ${item.name}! ${item.icon}`, {
        description: `${collectedCount + 1} of ${totalCollectibles} items collected!`
      });
    }
  };

  const hasCollected = (id: string) => {
    return collectibles.find(item => item.id === id)?.found || false;
  };

  return (
    <CollectiblesContext.Provider 
      value={{ 
        collectibles, 
        collectedCount, 
        totalCollectibles, 
        collectItem, 
        hasCollected 
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
