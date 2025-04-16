import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import PixelDivider from "../components/ui/PixelDivider";
import { useUserProfile, ThemeType } from "../hooks/use-user-profile";
import { User, Palette, RotateCcw, Lock, Check } from "lucide-react";
import { useCollectibles } from "../hooks/use-collectibles";

const avatarOptions = ["👾", "🎮", "🕹️", "👽", "🤖", "🦊", "🐱", "🐯", "🦁", "🐺", "🐶", "🐵"];

const themeInfo: Record<ThemeType, { name: string, description: string, collectiblesRequired: number, colors: string[] }> = {
  "retro-arcade": {
    name: "Retro Arcade",
    description: "The default theme with classic arcade vibes",
    collectiblesRequired: 0,
    colors: ["#ff004d", "#29adff", "#00e756", "#ffec27"]
  },
  "neon-wave": {
    name: "Neon Wave",
    description: "Vibrant synthwave colors and glowing effects",
    collectiblesRequired: 3,
    colors: ["#ff00ff", "#00ffff", "#ff2a6d", "#05d9e8"]
  },
  "pixel-forest": {
    name: "Pixel Forest",
    description: "Nature-inspired earthy colors and pixel art",
    collectiblesRequired: 7,
    colors: ["#40c9a2", "#e9f7ca", "#8bd7d2", "#2a7f62"]
  },
  "cyber-punk": {
    name: "Cyber Punk",
    description: "Futuristic dystopian aesthetic with bold contrasts",
    collectiblesRequired: 10,
    colors: ["#f72585", "#4cc9f0", "#4361ee", "#7209b7"]
  }
};

const ProfilePage: React.FC = () => {
  const { profile, updateUsername, updateAvatar, updateTheme, resetProfile } = useUserProfile();
  const { collectedCount } = useCollectibles();
  const [username, setUsername] = useState(profile.username);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [editingUsername, setEditingUsername] = useState(false);

  const handleUsernameSubmit = () => {
    if (username.trim()) {
      updateUsername(username.trim());
      setEditingUsername(false);
    }
  };

  const handleResetProfile = () => {
    resetProfile();
    setShowResetConfirm(false);
  };

  const isThemeUnlocked = (theme: ThemeType) => {
    // Check if theme is already unlocked or if user has enough collectibles
    return theme === "retro-arcade" || 
           collectedCount >= themeInfo[theme].collectiblesRequired;
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <User className="w-8 h-8 text-retro-primary" />
          <h1 className="text-3xl md:text-4xl text-retro-primary">
            USER PROFILE
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-retro-dark border-4 border-retro-primary p-6 rounded-lg">
            <h2 className="text-2xl text-retro-primary mb-4 flex items-center">
              <User className="w-5 h-5 mr-2" />
              PROFILE INFO
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-retro-light mb-2">Username</label>
                {editingUsername ? (
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      maxLength={15}
                      className="flex-grow bg-retro-dark border-2 border-retro-secondary focus:border-retro-primary p-2 text-retro-light outline-none"
                    />
                    <button
                      onClick={handleUsernameSubmit}
                      className="ml-2 bg-retro-primary text-white px-3 py-2 hover:bg-opacity-90"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div 
                    className="flex justify-between items-center bg-black bg-opacity-20 p-3 border-l-4 border-retro-primary cursor-pointer hover:bg-opacity-30"
                    onClick={() => setEditingUsername(true)}
                  >
                    <span className="text-retro-light text-xl">{profile.username}</span>
                    <span className="text-retro-gray text-xs">Click to edit</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-retro-light mb-2">Avatar</label>
                <div className="grid grid-cols-6 gap-2">
                  {avatarOptions.map((avatar) => (
                    <button
                      key={avatar}
                      onClick={() => updateAvatar(avatar)}
                      className={`w-12 h-12 text-2xl flex items-center justify-center border-2 transition-all ${
                        profile.avatar === avatar
                          ? "border-retro-primary bg-retro-primary bg-opacity-20"
                          : "border-retro-gray hover:border-retro-secondary"
                      }`}
                    >
                      {avatar}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                {showResetConfirm ? (
                  <div className="flex items-center bg-retro-dark border-2 border-retro-danger p-3 rounded-md animate-pulse">
                    <span className="text-retro-light mr-2">Reset profile to default?</span>
                    <button 
                      onClick={handleResetProfile}
                      className="bg-retro-danger text-white px-3 py-1 rounded-md text-sm mr-2 hover:bg-opacity-90 transition"
                    >
                      Yes
                    </button>
                    <button 
                      onClick={() => setShowResetConfirm(false)}
                      className="bg-retro-gray text-white px-3 py-1 rounded-md text-sm hover:bg-opacity-90 transition"
                    >
                      No
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => setShowResetConfirm(true)}
                    className="flex items-center bg-retro-secondary hover:bg-retro-primary transition-colors px-3 py-2 rounded-md text-white text-sm"
                  >
                    <RotateCcw className="w-4 h-4 mr-1" />
                    Reset Profile
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="bg-retro-dark border-4 border-retro-secondary p-6 rounded-lg">
            <h2 className="text-2xl text-retro-primary mb-4 flex items-center">
              <Palette className="w-5 h-5 mr-2" />
              UI THEMES
            </h2>
            <p className="text-retro-light mb-4">
              Collect items to unlock new themes! You've collected {collectedCount} items so far.
            </p>

            <div className="space-y-3">
              {(Object.keys(themeInfo) as ThemeType[]).map((themeKey) => {
                const theme = themeInfo[themeKey];
                const unlocked = isThemeUnlocked(themeKey);
                const isActive = profile.theme === themeKey;

                return (
                  <div
                    key={themeKey}
                    className={`relative border-2 p-3 transition-all ${
                      isActive 
                        ? "border-retro-primary bg-retro-primary bg-opacity-10" 
                        : unlocked 
                          ? "border-retro-gray hover:border-retro-secondary cursor-pointer" 
                          : "border-retro-dark opacity-60"
                    }`}
                    onClick={() => unlocked && updateTheme(themeKey)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-retro-light text-lg">{theme.name}</h3>
                        <p className="text-retro-gray text-sm">{theme.description}</p>
                      </div>
                      {!unlocked && (
                        <div className="flex items-center text-retro-gray">
                          <Lock className="w-4 h-4 mr-1" />
                          <span>{theme.collectiblesRequired} items</span>
                        </div>
                      )}
                      {isActive && (
                        <div className="absolute top-2 right-2 bg-retro-primary text-white text-xs px-2 py-1 rounded">
                          ACTIVE
                        </div>
                      )}
                    </div>
                    <div className="flex mt-2 space-x-1">
                      {theme.colors.map((color, i) => (
                        <div
                          key={i}
                          className="w-6 h-6 rounded-sm"
                          style={{ backgroundColor: color }}
                        ></div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <PixelDivider text="GAME STATS" />

        <div className="bg-retro-dark border-4 border-retro-secondary p-6 rounded-lg">
          <h2 className="text-2xl text-retro-primary mb-4">YOUR GAMING HISTORY</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-black bg-opacity-20 p-4 border-l-4 border-retro-primary">
              <div className="text-retro-light text-3xl font-bold">{collectedCount}</div>
              <div className="text-retro-gray">Items Collected</div>
            </div>
            
            <div className="bg-black bg-opacity-20 p-4 border-l-4 border-retro-primary">
              <div className="text-retro-light text-3xl font-bold">
                {Math.floor(Object.keys(themeInfo).filter(theme => isThemeUnlocked(theme as ThemeType)).length / (Object.keys(themeInfo).length) * 100)}%
              </div>
              <div className="text-retro-gray">Themes Unlocked</div>
            </div>
            
            <div className="bg-black bg-opacity-20 p-4 border-l-4 border-retro-primary">
              <div className="text-retro-light text-3xl font-bold">
                {/* You could add more stats here */}
                {profile.username.length * collectedCount}
              </div>
              <div className="text-retro-gray">Player Score</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
