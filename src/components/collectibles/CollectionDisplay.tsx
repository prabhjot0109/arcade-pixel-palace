
import React from "react";
import { useCollectibles } from "../../hooks/use-collectibles";

const CollectionDisplay: React.FC = () => {
  const { collectibles } = useCollectibles();
  
  return (
    <div className="bg-retro-dark border-4 border-retro-primary rounded p-4 mt-4">
      <h3 className="text-xl text-retro-primary mb-4">Your Collection</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {collectibles.map(item => (
          <div 
            key={item.id} 
            className={`
              p-3 rounded-md flex items-center gap-3
              ${item.found 
                ? "bg-retro-secondary bg-opacity-30" 
                : "bg-retro-dark border border-dashed border-retro-gray"}
            `}
          >
            <span className="text-3xl">{item.found ? item.icon : "?"}</span>
            <div>
              <p className="text-lg">
                {item.found ? item.name : "??????"}
              </p>
              <p className="text-xs text-retro-gray">
                {item.found ? "Collected!" : "Not found yet"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionDisplay;
