
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import { useCollectibles } from "./use-collectibles";

export type Achievement = {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  requirement: number;
  category: "collection" | "exploration" | "mastery";
};

const initialAchievements: Achievement[] = [
  {
    id: "collector-novice",
    name: "Novice Collector",
    description: "Collect your first 3 items",
    icon: "🥉",
    unlocked: false,
    requirement: 3,
    category: "collection"
  },
  {
    id: "collector-intermediate",
    name: "Intermediate Collector",
    description: "Collect 7 different items",
    icon: "🥈",
    unlocked: false,
    requirement: 7,
    category: "collection"
  },
  {
    id: "collector-master",
    name: "Master Collector",
    description: "Collect all items",
    icon: "🏆",
    unlocked: false,
    requirement: 14,
    category: "collection"
  },
  {
    id: "daily-streak",
    name: "Daily Explorer",
    description: "Complete a daily challenge",
    icon: "⭐",
    unlocked: false,
    requirement: 1,
    category: "exploration"
  }
];

interface AchievementsContextType {
  achievements: Achievement[];
  checkAchievements: () => void;
  getProgress: (achievementId: string) => number;
}

const AchievementsContext = createContext<AchievementsContextType | undefined>(undefined);

export const AchievementsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    const saved = localStorage.getItem("pixel-palace-achievements");
    return saved ? JSON.parse(saved) : initialAchievements;
  });

  const { collectedCount } = useCollectibles();

  const getProgress = (achievementId: string) => {
    const achievement = achievements.find(a => a.id === achievementId);
    if (!achievement) return 0;

    switch (achievement.category) {
      case "collection":
        return Math.min(100, (collectedCount / achievement.requirement) * 100);
      default:
        return achievement.unlocked ? 100 : 0;
    }
  };

  const checkAchievements = () => {
    setAchievements(prev => {
      const updated = prev.map(achievement => {
        if (achievement.unlocked) return achievement;

        let shouldUnlock = false;
        switch (achievement.category) {
          case "collection":
            shouldUnlock = collectedCount >= achievement.requirement;
            break;
          default:
            shouldUnlock = achievement.unlocked;
        }

        if (shouldUnlock && !achievement.unlocked) {
          toast.success(`Achievement Unlocked: ${achievement.name}! ${achievement.icon}`, {
            description: achievement.description
          });
        }

        return {
          ...achievement,
          unlocked: shouldUnlock
        };
      });

      localStorage.setItem("pixel-palace-achievements", JSON.stringify(updated));
      return updated;
    });
  };

  useEffect(() => {
    checkAchievements();
  }, [collectedCount]);

  return (
    <AchievementsContext.Provider value={{ achievements, checkAchievements, getProgress }}>
      {children}
    </AchievementsContext.Provider>
  );
};

export const useAchievements = () => {
  const context = useContext(AchievementsContext);
  if (context === undefined) {
    throw new Error("useAchievements must be used within an AchievementsProvider");
  }
  return context;
};
