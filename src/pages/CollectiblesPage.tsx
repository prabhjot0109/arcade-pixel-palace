
import React, { useEffect } from "react";
import Layout from "../components/layout/Layout";
import PixelDivider from "../components/ui/PixelDivider";
import CollectionDisplay from "../components/collectibles/CollectionDisplay";
import AchievementsList from "../components/achievements/AchievementsList";
import CollectionBook from "../components/collectibles/CollectionBook";
import { Award } from "lucide-react";

const CollectiblesPage = () => {
  useEffect(() => {
    document.title = "Collectibles - Pixel Palace";
  }, []);

  return (
    <Layout>
      <div className="relative space-y-8">
        <div className="flex items-center gap-3 mb-6">
          <Award className="w-8 h-8 text-retro-primary" />
          <h1 className="text-3xl md:text-4xl text-retro-primary">
            COLLECTIBLES & ACHIEVEMENTS
          </h1>
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
