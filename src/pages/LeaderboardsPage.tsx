import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import PixelDivider from "../components/ui/PixelDivider";
import { Trophy, Medal, Users, Star, Share2 } from "lucide-react";
import { useCollectibles } from "../hooks/use-collectibles";
import { useAchievements } from "../hooks/use-achievements";
import { useUserProfile } from "../hooks/use-user-profile";
import CollectibleItem from "../components/collectibles/CollectibleItem";

// Mock leaderboard data - in a real app, this would come from a database
const mockLeaderboardData = [
  { id: 1, username: "RetroMaster", avatar: "👾", collectibles: 32, achievements: 15, sets: 6 },
  { id: 2, username: "Pixel8Bit", avatar: "🎮", collectibles: 28, achievements: 14, sets: 5 },
  { id: 3, username: "ArcadeKing", avatar: "👑", collectibles: 25, achievements: 12, sets: 5 },
  { id: 4, username: "GameBoyHero", avatar: "🎯", collectibles: 22, achievements: 11, sets: 4 },
  { id: 5, username: "NintendoFan", avatar: "🔥", collectibles: 20, achievements: 10, sets: 3 },
  { id: 6, username: "RetroGamer", avatar: "🎲", collectibles: 18, achievements: 9, sets: 3 },
  { id: 7, username: "PixelQueen", avatar: "💎", collectibles: 15, achievements: 8, sets: 2 },
  { id: 8, username: "MarioBros", avatar: "🍄", collectibles: 12, achievements: 6, sets: 2 },
  { id: 9, username: "ZeldaFan", avatar: "🗡️", collectibles: 10, achievements: 5, sets: 1 },
  { id: 10, username: "PacManChamp", avatar: "🟡", collectibles: 8, achievements: 4, sets: 1 },
];

type LeaderboardCategory = 'collectibles' | 'achievements' | 'sets';

const LeaderboardsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<LeaderboardCategory>("collectibles");
  const [leaderboards, setLeaderboards] = useState(mockLeaderboardData);
  const [playerRank, setPlayerRank] = useState<number | null>(null);
  const { collectibles, collectedCount, getSetsProgress, getTotalValue } = useCollectibles();
  const { achievements, unlockedCount } = useAchievements();
  const { profile } = useUserProfile();
  
  useEffect(() => {
    document.title = "Leaderboards - Pixel Palace";
    
    // In a real app, we would fetch leaderboard data from a server
    // For now, we'll insert the player into the mock data
    const completedSets = Object.values(getSetsProgress()).filter(set => set.complete).length;
    
    const playerStats = {
      id: 999, // Player always has a special ID
      username: profile.username,
      avatar: profile.avatar,
      collectibles: collectedCount,
      achievements: unlockedCount,
      sets: completedSets
    };
    
    // Combine player with mock data and sort by the active category
    const allData = [...mockLeaderboardData, playerStats].sort((a, b) => {
      return b[activeTab] - a[activeTab];
    });
    
    // Find player's rank
    const playerIndex = allData.findIndex(entry => entry.id === 999);
    setPlayerRank(playerIndex !== -1 ? playerIndex + 1 : null);
    
    // Update leaderboards with top 10
    setLeaderboards(allData.slice(0, 10));
  }, [activeTab, collectedCount, unlockedCount, profile, getSetsProgress]);
  
  const shareLeaderboards = () => {
    const text = `Check out my ranking on Pixel Palace Arcade! I'm #${playerRank} with ${collectedCount} collectibles, ${unlockedCount} achievements, and a score of ${getTotalValue()}! 🎮✨`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Pixel Palace Leaderboards',
        text,
        url: window.location.href,
      })
      .catch((error) => console.log('Error sharing:', error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(text)
        .then(() => alert('Leaderboard stats copied to clipboard!'))
        .catch(err => console.error('Error copying text: ', err));
    }
  };
  
  const renderLeaderboardRows = () => {
    return leaderboards.map((entry, index) => {
      const isPlayer = entry.id === 999;
      
      return (
        <tr 
          key={entry.id} 
          className={`border-b border-retro-secondary ${isPlayer ? 'bg-retro-primary bg-opacity-10' : ''}`}
        >
          <td className="px-4 py-3 text-center">
            {index < 3 ? (
              <span className="inline-block w-8 h-8 rounded-full bg-retro-dark border-2 border-retro-primary text-xl flex items-center justify-center">
                {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
              </span>
            ) : (
              <span className="text-xl">{index + 1}</span>
            )}
          </td>
          <td className="px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{entry.avatar}</span>
              <span className={`font-bold ${isPlayer ? 'text-retro-primary' : ''}`}>
                {entry.username} {isPlayer && '(You)'}
              </span>
            </div>
          </td>
          <td className="px-4 py-3 text-center">
            <span className={`${activeTab === 'collectibles' ? 'text-retro-primary font-bold' : ''}`}>
              {entry.collectibles}
            </span>
          </td>
          <td className="px-4 py-3 text-center">
            <span className={`${activeTab === 'achievements' ? 'text-retro-primary font-bold' : ''}`}>
              {entry.achievements}
            </span>
          </td>
          <td className="px-4 py-3 text-center">
            <span className={`${activeTab === 'sets' ? 'text-retro-primary font-bold' : ''}`}>
              {entry.sets}
            </span>
          </td>
        </tr>
      );
    });
  };
  
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl text-retro-primary">Leaderboards</h1>
          <button 
            onClick={shareLeaderboards}
            className="pixel-btn flex items-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            Share Ranking
          </button>
        </div>
        
        <PixelDivider text="GLOBAL RANKINGS" />
        
        <div className="mb-8 bg-retro-dark border-4 border-retro-primary rounded-lg p-6 relative">
          {/* Trophy collectible */}
          <div className="absolute top-3 right-3">
            <CollectibleItem id="trophy" size="md" />
          </div>
          
          <div className="mb-6 flex flex-wrap gap-4">
            <button
              className={`px-4 py-2 rounded-md flex items-center gap-2 ${
                activeTab === 'collectibles' 
                  ? 'bg-retro-primary text-retro-dark' 
                  : 'bg-retro-secondary bg-opacity-20 text-retro-light'
              }`}
              onClick={() => setActiveTab('collectibles')}
            >
              <Star className="w-4 h-4" /> Collectibles
            </button>
            <button
              className={`px-4 py-2 rounded-md flex items-center gap-2 ${
                activeTab === 'achievements' 
                  ? 'bg-retro-primary text-retro-dark' 
                  : 'bg-retro-secondary bg-opacity-20 text-retro-light'
              }`}
              onClick={() => setActiveTab('achievements')}
            >
              <Medal className="w-4 h-4" /> Achievements
            </button>
            <button
              className={`px-4 py-2 rounded-md flex items-center gap-2 ${
                activeTab === 'sets' 
                  ? 'bg-retro-primary text-retro-dark' 
                  : 'bg-retro-secondary bg-opacity-20 text-retro-light'
              }`}
              onClick={() => setActiveTab('sets')}
            >
              <Trophy className="w-4 h-4" /> Completed Sets
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-retro-secondary">
                  <th className="px-4 py-3 text-left">Rank</th>
                  <th className="px-4 py-3 text-left">Player</th>
                  <th className="px-4 py-3 text-center">Collectibles</th>
                  <th className="px-4 py-3 text-center">Achievements</th>
                  <th className="px-4 py-3 text-center">Sets</th>
                </tr>
              </thead>
              <tbody>
                {renderLeaderboardRows()}
              </tbody>
            </table>
          </div>
          
          {playerRank && playerRank > 10 && (
            <div className="mt-6 p-4 border-2 border-retro-primary bg-retro-dark rounded-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl font-bold">{playerRank}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{profile.avatar}</span>
                    <span className="font-bold text-retro-primary">{profile.username} (You)</span>
                  </div>
                </div>
                <div className="flex gap-6">
                  <span>{collectedCount} collectibles</span>
                  <span>{unlockedCount} achievements</span>
                  <span>{Object.values(getSetsProgress()).filter(set => set.complete).length} sets</span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <PixelDivider text="FRIENDS LEADERBOARD" />
        
        <div className="mb-8 bg-retro-dark border-4 border-retro-secondary rounded-lg p-6 text-center">
          <Users className="w-12 h-12 text-retro-primary mx-auto mb-4" />
          <h2 className="text-2xl text-retro-light mb-4">Connect with Friends</h2>
          <p className="text-retro-gray mb-6">
            Add friends to compare scores and achievements. 
            Challenge them to beat your high scores!
          </p>
          <button className="pixel-btn">
            INVITE FRIENDS
          </button>
        </div>
        
        <PixelDivider text="YOUR TROPHIES" />
        
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {unlockedCount >= 5 && (
            <div className="bg-retro-dark border-4 border-yellow-500 rounded-lg p-4 text-center">
              <div className="text-4xl mb-2">🏆</div>
              <h3 className="text-xl text-yellow-400 mb-1">Achievement Hunter</h3>
              <p className="text-retro-gray text-sm">
                Unlocked 5+ achievements
              </p>
            </div>
          )}
          
          {collectedCount >= 10 && (
            <div className="bg-retro-dark border-4 border-blue-500 rounded-lg p-4 text-center">
              <div className="text-4xl mb-2">🏆</div>
              <h3 className="text-xl text-blue-400 mb-1">Collector</h3>
              <p className="text-retro-gray text-sm">
                Found 10+ collectible items
              </p>
            </div>
          )}
          
          {Object.values(getSetsProgress()).filter(set => set.complete).length >= 2 && (
            <div className="bg-retro-dark border-4 border-purple-500 rounded-lg p-4 text-center">
              <div className="text-4xl mb-2">🏆</div>
              <h3 className="text-xl text-purple-400 mb-1">Completionist</h3>
              <p className="text-retro-gray text-sm">
                Completed 2+ collectible sets
              </p>
            </div>
          )}
          
          {unlockedCount < 5 && collectedCount < 10 && 
           Object.values(getSetsProgress()).filter(set => set.complete).length < 2 && (
            <div className="col-span-3 bg-retro-dark border-4 border-retro-secondary rounded-lg p-6 text-center">
              <h3 className="text-xl text-retro-light mb-2">No Trophies Yet</h3>
              <p className="text-retro-gray">
                Keep collecting items and completing achievements to earn trophies!
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default LeaderboardsPage;
