
import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import PixelDivider from "../components/ui/PixelDivider";
import CollectionDisplay from "../components/collectibles/CollectionDisplay";
import AchievementsList from "../components/achievements/AchievementsList";
import CollectionBook from "../components/collectibles/CollectionBook";
import { Award, RotateCcw } from "lucide-react";
import { useCollectibles } from "../hooks/use-collectibles";
import { useAchievements } from "../hooks/use-achievements";

const CollectiblesPage = () => {
  const { resetCollectibles } = useCollectibles();
  const { resetAchievements } = useAchievements();
  const [showResetConfirm, setShowResetConfirm] = useState<'collectibles' | 'achievements' | null>(null);

  useEffect(() => {
    document.title = "Collectibles - Pixel Palace";
  }, []);

  const handleResetCollectibles = () => {
    resetCollectibles();
    setShowResetConfirm(null);
  };

  const handleResetAchievements = () => {
    resetAchievements();
    setShowResetConfirm(null);
  };

  return (
    <Layout>
      <div className="relative space-y-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Award className="w-8 h-8 text-retro-primary" />
            <h1 className="text-3xl md:text-4xl text-retro-primary">
              COLLECTIBLES & ACHIEVEMENTS
            </h1>
          </div>
          <div className="flex space-x-3">
            {showResetConfirm === 'collectibles' ? (
              <div className="flex items-center bg-retro-dark border-2 border-retro-danger p-2 rounded-md animate-pulse">
                <span className="text-retro-light mr-2">Are you sure?</span>
                <button 
                  onClick={handleResetCollectibles}
                  className="bg-retro-danger text-white px-3 py-1 rounded-md text-sm mr-2 hover:bg-opacity-90 transition"
                >
                  Yes
                </button>
                <button 
                  onClick={() => setShowResetConfirm(null)}
                  className="bg-retro-gray text-white px-3 py-1 rounded-md text-sm hover:bg-opacity-90 transition"
                >
                  No
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setShowResetConfirm('collectibles')}
                className="flex items-center bg-retro-secondary hover:bg-retro-primary transition-colors px-3 py-2 rounded-md text-white text-sm"
              >
                <RotateCcw className="w-4 h-4 mr-1" />
                Reset Collectibles
              </button>
            )}

            {showResetConfirm === 'achievements' ? (
              <div className="flex items-center bg-retro-dark border-2 border-retro-danger p-2 rounded-md animate-pulse">
                <span className="text-retro-light mr-2">Are you sure?</span>
                <button 
                  onClick={handleResetAchievements}
                  className="bg-retro-danger text-white px-3 py-1 rounded-md text-sm mr-2 hover:bg-opacity-90 transition"
                >
                  Yes
                </button>
                <button 
                  onClick={() => setShowResetConfirm(null)}
                  className="bg-retro-gray text-white px-3 py-1 rounded-md text-sm hover:bg-opacity-90 transition"
                >
                  No
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setShowResetConfirm('achievements')}
                className="flex items-center bg-retro-secondary hover:bg-retro-primary transition-colors px-3 py-2 rounded-md text-white text-sm"
              >
                <RotateCcw className="w-4 h-4 mr-1" />
                Reset Achievements
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CollectionBook />
          <AchievementsList />
        </div>

        <PixelDivider text="YOUR COLLECTION" />
        
        <CollectionDisplay />
      </div>
    </Layout>
  );
};

export default CollectiblesPage;
