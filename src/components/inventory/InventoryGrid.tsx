
import React from "react";
import { useCollectibles } from "../../hooks/use-collectibles";
import { cn } from "../../lib/utils";

const InventoryGrid = () => {
  const { collectibles } = useCollectibles();

  return (
    <div className="bg-retro-dark border-4 border-retro-primary rounded-lg p-6">
      <h2 className="text-xl text-retro-primary mb-6">Your Items</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {collectibles.map((item) => (
          <div
            key={item.id}
            className={cn(
              "aspect-square flex flex-col items-center justify-center p-4 rounded-lg transition-all duration-300 hover:scale-105",
              item.found
                ? "bg-retro-primary/20 border-2 border-retro-primary"
                : "bg-retro-secondary/10 border-2 border-dashed border-retro-secondary"
            )}
          >
            <span className="text-4xl mb-2">{item.found ? item.icon : "?"}</span>
            <span className="text-center text-sm text-retro-light">
              {item.found ? item.name : "???"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventoryGrid;
