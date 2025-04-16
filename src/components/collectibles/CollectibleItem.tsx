
import React, { useState, useEffect } from "react";
import { useCollectibles, CollectibleType } from "../../hooks/use-collectibles";

interface CollectibleItemProps {
  id: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  showRarity?: boolean;
  showTooltip?: boolean;
  interactive?: boolean;
}

const CollectibleItem: React.FC<CollectibleItemProps> = ({ 
  id, 
  className = "",
  size = "md",
  showRarity = false,
  showTooltip = true,
  interactive = true
}) => {
  const { collectibles, collectItem, hasCollected } = useCollectibles();
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [collectible, setCollectible] = useState<CollectibleType | undefined>();
  
  // Get the collectible from the context
  useEffect(() => {
    const item = collectibles.find(item => item.id === id);
    setCollectible(item);
  }, [collectibles, id]);
  
  if (!collectible) return null;
  
  const isCollected = hasCollected(id);
  
  const handleClick = () => {
    if (!isCollected && interactive) {
      setIsAnimating(true);
      collectItem(id);
      
      // No animation effects
      
      setTimeout(() => {
        setIsAnimating(false);
      }, 1000);
    }
  };
  
  // Get CSS classes based on rarity
  const getRarityClasses = () => {
    switch(collectible.rarity) {
      case 'common':
        return 'border-gray-400';
      case 'rare':
        return 'border-blue-500 shadow-blue-500/50';
      case 'epic':
        return 'border-purple-500 shadow-purple-500/50';
      case 'legendary':
        return 'border-yellow-500 shadow-yellow-500/50';
      default:
        return '';
    }
  };
  
  // Get animation class based on state and collectible properties
  const getAnimationClass = () => {
    if (isAnimating) return 'animate-item-reveal';
    if (isCollected && collectible.animationClass) return collectible.animationClass;
    return '';
  };
  
  const sizeClasses = {
    sm: "text-2xl",
    md: "text-4xl",
    lg: "text-6xl",
  };
  
  // Build tooltip content
  const getTooltipContent = () => {
    if (!isCollected) return collectible.name;
    
    return `${collectible.name} (${collectible.rarity})
${collectible.description}`;
  };
  
  const getRarityBadge = () => {
    if (!showRarity || !isCollected) return null;
    
    const rarityColors = {
      common: 'bg-gray-400',
      rare: 'bg-blue-500',
      epic: 'bg-purple-500',
      legendary: 'bg-yellow-500 animate-pulse'
    };
    
    return (
      <div className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${rarityColors[collectible.rarity]}`}></div>
    );
  };
  
  return (
    <div 
      id={`collectible-${id}`}
      className={`
        relative
        ${isCollected ? "collected" : "collectible"}
        ${sizeClasses[size]}
        ${className}
        ${showRarity && isCollected ? `border-2 ${getRarityClasses()} rounded-full p-1 shadow-lg` : ''}
        ${interactive ? 'cursor-pointer' : ''}
      `}
      onClick={interactive ? handleClick : undefined}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      title={showTooltip ? getTooltipContent() : undefined}
    >
      {getRarityBadge()}
      <span className="select-none">{collectible.icon}</span>
      
      {/* Tooltip - positioned at the right side for better visibility */}
      {isHovering && showTooltip && !isCollected && (
        <div className="fixed z-50 ml-5 -mt-1 bg-retro-dark border-2 border-retro-primary text-retro-light p-2 rounded-md shadow-lg whitespace-nowrap text-sm pointer-events-none max-w-xs">
          <div className="font-bold">{collectible.name}</div>
        </div>
      )}
    </div>
  );
};

export default CollectibleItem;
