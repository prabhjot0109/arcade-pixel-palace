import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

export type ThemeType = "retro-arcade" | "neon-wave" | "pixel-forest" | "cyber-punk";
type BadgeType = "collector" | "achiever" | "completionist" | "social" | "explorer";

export interface BadgeInfo {
  id: BadgeType;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  color: string;
}

interface UserProfileType {
  username: string;
  avatar: string;
  theme: ThemeType;
  badges: BadgeInfo[];
  following: string[];
  followers: string[];
  shareEnabled: boolean;
  stats: {
    totalScore: number;
    highestCombo: number;
    loginDays: number;
    shareCount: number;
  };
}

interface UserProfileContextType {
  profile: UserProfileType;
  updateUsername: (username: string) => void;
  updateAvatar: (avatar: string) => void;
  updateTheme: (theme: ThemeType) => void;
  resetProfile: () => void;
  isThemeUnlocked: (theme: ThemeType) => boolean;
  awardBadge: (badgeId: BadgeType) => void;
  getAvailableAvatars: () => string[];
  followFriend: (friendId: string) => void;
  unfollowFriend: (friendId: string) => void;
  toggleShareEnabled: () => void;
  updateStats: (stats: Partial<UserProfileType['stats']>) => void;
  generateShareCard: () => string;
}

// Available avatars
const avatars = [
  "😎", "👾", "🎮", "👑", "🎯", "🔥", "🎲", "💎", "🍄", "🗡️", "🟡", "🎹", "🏆", "🚀", "🐉", "🐢", "🦊", "🦁"
];

// Default badges
const defaultBadges: BadgeInfo[] = [
  {
    id: "collector",
    name: "Collector",
    description: "Collect at least 10 items",
    icon: "🏆",
    unlocked: false,
    color: "blue-500"
  },
  {
    id: "achiever",
    name: "Achievement Hunter",
    description: "Unlock at least 5 achievements",
    icon: "🏆",
    unlocked: false,
    color: "yellow-500"
  },
  {
    id: "completionist",
    name: "Completionist",
    description: "Complete at least 2 collectible sets",
    icon: "🏆",
    unlocked: false,
    color: "purple-500"
  },
  {
    id: "social",
    name: "Social Gamer",
    description: "Share your progress 3 times",
    icon: "🏆",
    unlocked: false,
    color: "green-500"
  },
  {
    id: "explorer",
    name: "Explorer",
    description: "Visit all pages in the Pixel Palace",
    icon: "🏆",
    unlocked: false,
    color: "red-500"
  }
];

const defaultProfile: UserProfileType = {
  username: "Player1",
  avatar: "😎",
  theme: "retro-arcade",
  badges: defaultBadges,
  following: [],
  followers: [],
  shareEnabled: true,
  stats: {
    totalScore: 0,
    highestCombo: 0,
    loginDays: 1,
    shareCount: 0
  }
};

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);

export const UserProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfileType>(() => {
    const saved = localStorage.getItem("pixel-palace-profile");
    return saved ? JSON.parse(saved) : defaultProfile;
  });

  useEffect(() => {
    localStorage.setItem("pixel-palace-profile", JSON.stringify(profile));
  }, [profile]);

  // Get all available avatars, including unlockable ones
  const getAvailableAvatars = (): string[] => {
    // Get collectibles count to determine unlockable avatars
    const collectiblesData = localStorage.getItem("pixel-palace-collectibles");
    if (!collectiblesData) return avatars.slice(0, 5); // Default first 5 avatars always available

    const collectibles = JSON.parse(collectiblesData);
    const collectedCount = collectibles.filter((item: any) => item.found).length;
    
    // Unlock more avatars based on collection progress
    if (collectedCount >= 15) return avatars; // All avatars
    if (collectedCount >= 10) return avatars.slice(0, 12);
    if (collectedCount >= 5) return avatars.slice(0, 8);
    return avatars.slice(0, 5); // Default
  };

  const updateUsername = (username: string) => {
    setProfile(prev => ({ ...prev, username }));
    toast.success("Username updated");
  };

  const updateAvatar = (avatar: string) => {
    const available = getAvailableAvatars();
    if (available.includes(avatar)) {
      setProfile(prev => ({ ...prev, avatar }));
      toast.success("Avatar updated");
    } else {
      toast.error("This avatar is locked! Collect more items to unlock it.");
    }
  };

  const updateTheme = (theme: ThemeType) => {
    if (isThemeUnlocked(theme)) {
      setProfile(prev => ({ ...prev, theme }));
      toast.success(`Theme updated to ${theme}`);
    } else {
      toast.error("This theme is locked! Collect more items to unlock it.");
    }
  };

  const resetProfile = () => {
    setProfile(defaultProfile);
    toast.info("Profile has been reset");
  };

  const isThemeUnlocked = (theme: ThemeType): boolean => {
    // First theme is always unlocked
    if (theme === "retro-arcade") return true;

    // Get collectibles count from localStorage
    const collectiblesData = localStorage.getItem("pixel-palace-collectibles");
    if (!collectiblesData) return false;

    const collectibles = JSON.parse(collectiblesData);
    const collectedCount = collectibles.filter((item: any) => item.found).length;

    // Unlock themes based on collection progress
    switch (theme) {
      case "neon-wave": return collectedCount >= 3;
      case "pixel-forest": return collectedCount >= 7;
      case "cyber-punk": return collectedCount >= 10;
      default: return false;
    }
  };
  
  // Award a badge to the user
  const awardBadge = (badgeId: BadgeType) => {
    setProfile(prev => {
      const updatedBadges = prev.badges.map(badge => 
        badge.id === badgeId ? { ...badge, unlocked: true } : badge
      );
      return { ...prev, badges: updatedBadges };
    });
    
    // Find the badge to show in the toast
    const badge = profile.badges.find(b => b.id === badgeId);
    if (badge && !badge.unlocked) {
      toast.success(
        <div className="flex items-center gap-2">
          <span className="text-2xl">{badge.icon}</span>
          <div>
            <div className="font-bold">New Badge Unlocked!</div>
            <div className="text-sm">{badge.name}</div>
          </div>
        </div>,
        { description: badge.description }
      );
    }
  };
  
  // Follow a friend
  const followFriend = (friendId: string) => {
    if (!profile.following.includes(friendId)) {
      setProfile(prev => ({
        ...prev, 
        following: [...prev.following, friendId]
      }));
      toast.success("Friend followed!");
    }
  };
  
  // Unfollow a friend
  const unfollowFriend = (friendId: string) => {
    setProfile(prev => ({
      ...prev,
      following: prev.following.filter(id => id !== friendId)
    }));
    toast.success("Friend unfollowed");
  };
  
  // Toggle social sharing settings
  const toggleShareEnabled = () => {
    setProfile(prev => ({
      ...prev,
      shareEnabled: !prev.shareEnabled
    }));
    toast.success(`Social sharing ${!profile.shareEnabled ? 'enabled' : 'disabled'}`);
  };
  
  // Update player stats
  const updateStats = (stats: Partial<UserProfileType['stats']>) => {
    setProfile(prev => ({
      ...prev,
      stats: { ...prev.stats, ...stats }
    }));
  };
  
  // Generate a shareable card (returns a data URL that could be used for sharing)
  const generateShareCard = (): string => {
    // In a real app, this would generate an actual image
    // For this demo, we'll just return a placeholder URL
    return 'https://example.com/share-card.png';
  };

  return (
    <UserProfileContext.Provider value={{
      profile,
      updateUsername,
      updateAvatar,
      updateTheme,
      resetProfile,
      isThemeUnlocked,
      awardBadge,
      getAvailableAvatars,
      followFriend,
      unfollowFriend,
      toggleShareEnabled,
      updateStats,
      generateShareCard
    }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => {
  const context = useContext(UserProfileContext);
  if (context === undefined) {
    throw new Error("useUserProfile must be used within a UserProfileProvider");
  }
  return context;
};
