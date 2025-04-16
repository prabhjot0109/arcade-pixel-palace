
import React, { useState } from "react";
import { useCollectibles } from "../../hooks/use-collectibles";

interface CollectibleItemProps {
  id: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const CollectibleItem: React.FC<CollectibleItemProps> = ({ 
  id, 
  className = "",
  size = "md" 
}) => {
  const { collectibles, collectItem, hasCollected } = useCollectibles();
  const [isAnimating, setIsAnimating] = useState(false);
  
  const collectible = collectibles.find(item => item.id === id);
  
  if (!collectible) return null;
  
  const isCollected = hasCollected(id);
  
  const handleClick = () => {
    if (!isCollected) {
      setIsAnimating(true);
      collectItem(id);
      
      setTimeout(() => {
        setIsAnimating(false);
      }, 1000);
    }
  };
  
  const sizeClasses = {
    sm: "text-2xl",
    md: "text-4xl",
    lg: "text-6xl",
  };
  
  return (
    <div 
      className={`
        ${isCollected ? "collected" : "collectible"}
        ${sizeClasses[size]}
        ${isAnimating ? "animate-item-reveal" : ""}
        ${className}
      `}
      onClick={handleClick}
      title={isCollected ? `${collectible.name} (Collected)` : collectible.name}
    >
      <span className="select-none">{collectible.icon}</span>
    </div>
  );
};

export default CollectibleItem;
