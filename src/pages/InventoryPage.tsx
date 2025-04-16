
import React, { useEffect } from "react";
import Layout from "../components/layout/Layout";
import { Package, Award } from "lucide-react";
import { useCollectibles } from "../hooks/use-collectibles";
import InventoryGrid from "../components/inventory/InventoryGrid";
import DailyChallenge from "../components/rewards/DailyChallenge";

const InventoryPage = () => {
  const { collectedCount, totalCollectibles } = useCollectibles();

  useEffect(() => {
    document.title = "Inventory - Pixel Palace";
  }, []);

  return (
    <Layout>
      <div className="relative space-y-8">
        <div className="flex items-center gap-3 mb-6">
          <Package className="w-8 h-8 text-retro-primary" />
          <h1 className="text-3xl md:text-4xl text-retro-primary">INVENTORY</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-retro-dark border-4 border-retro-primary p-6 rounded-lg">
            <h2 className="text-xl text-retro-primary mb-4 flex items-center gap-2">
              <Package className="w-6 h-6" />
              Collection Status
            </h2>
            <div className="space-y-4">
              <p className="text-lg text-retro-light">
                {collectedCount} / {totalCollectibles} Items Collected
              </p>
              <div className="w-full h-4 bg-retro-secondary/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-retro-primary transition-all duration-1000"
                  style={{
                    width: `${(collectedCount / totalCollectibles) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>

          <DailyChallenge />
        </div>

        <InventoryGrid />
      </div>
    </Layout>
  );
};

export default InventoryPage;
