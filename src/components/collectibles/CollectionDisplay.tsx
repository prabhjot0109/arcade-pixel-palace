
import React, { useState } from "react";
import { useCollectibles, CollectibleSetType, CollectibleCategoryType } from "../../hooks/use-collectibles";
import CollectibleItem from "./CollectibleItem";
import { ChevronDown, ChevronUp, Lock, CheckCircle2 } from "lucide-react";

// Tab types for the collection display
type CollectionTab = 'sets' | 'categories' | 'rarity' | 'all';

const CollectionDisplay: React.FC = () => {
  const { collectibles, getSetsProgress, getCollectiblesBySet, getCollectiblesByCategory, getCollectiblesByRarity, getTotalValue } = useCollectibles();
  const [activeTab, setActiveTab] = useState<CollectionTab>('sets');
  const [expandedSets, setExpandedSets] = useState<Set<string>>(new Set(['mario'])); // Default expanded set
  
  // Set data for display
  const setNames: Record<CollectibleSetType, string> = {
    'mario': 'Super Mario Bros',
    'zelda': 'Legend of Zelda',
    'sonic': 'Sonic the Hedgehog',
    'arcade': 'Arcade Classics',
    'console': 'Console Wars',
    'rpg': 'RPG Collection'
  };
  
  // Category data for display
  const categoryNames: Record<CollectibleCategoryType, string> = {
    'currency': 'Currency Items',
    'powerup': 'Power-Ups',
    'artifact': 'Artifacts',
    'character': 'Characters',
    'key': 'Keys & Tools'
  };
  
  // Rarity data
  const rarityOrder = ['legendary', 'epic', 'rare', 'common'];
  const rarityNames = {
    'legendary': '🌟 Legendary',
    'epic': '💫 Epic',
    'rare': '✨ Rare',
    'common': '⚪ Common'
  };
  
  // Track set progress
  const setsProgress = getSetsProgress();
  
  // Handle set expansion/collapse
  const toggleSetExpansion = (setId: string) => {
    const newExpandedSets = new Set(expandedSets);
    if (expandedSets.has(setId)) {
      newExpandedSets.delete(setId);
    } else {
      newExpandedSets.add(setId);
    }
    setExpandedSets(newExpandedSets);
  };
  
  // Render sets view
  const renderSetsView = () => {
    return (
      <div className="space-y-6">
        {Object.entries(setNames).map(([setId, setName]) => {
          const progress = setsProgress[setId as CollectibleSetType];
          const isExpanded = expandedSets.has(setId);
          
          return (
            <div key={setId} className="bg-retro-dark border-2 border-retro-secondary rounded-md overflow-hidden">
              {/* Set header with progress */}
              <div 
                className={`p-3 flex justify-between items-center cursor-pointer hover:bg-retro-dark/90 ${progress.complete ? 'bg-gradient-to-r from-retro-primary/20 to-transparent' : ''}`}
                onClick={() => toggleSetExpansion(setId)}
              >
                <div className="flex items-center">
                  {progress.complete ? 
                    <CheckCircle2 className="w-5 h-5 text-retro-primary mr-2" /> : 
                    null
                  }
                  <h3 className="text-xl text-retro-light font-bold">{setName}</h3>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-sm text-retro-gray">
                    <span className={progress.complete ? 'text-retro-primary' : ''}>
                      {progress.collected}/{progress.total} collected
                    </span>
                  </div>
                  {isExpanded ? 
                    <ChevronUp className="w-5 h-5 text-retro-gray" /> : 
                    <ChevronDown className="w-5 h-5 text-retro-gray" />}
                </div>
              </div>
              
              {/* Set items */}
              {isExpanded && (
                <div className="p-4 border-t border-retro-secondary grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {getCollectiblesBySet(setId as CollectibleSetType).map(item => (
                    <div 
                      key={item.id} 
                      className={`
                        p-3 rounded-md flex items-center gap-3
                        ${item.found 
                          ? `bg-retro-secondary bg-opacity-10 border border-${item.rarity === 'legendary' ? 'yellow' : item.rarity === 'epic' ? 'purple' : item.rarity === 'rare' ? 'blue' : 'gray'}-500/30` 
                          : "bg-retro-dark border border-dashed border-retro-gray"}
                      `}
                    >
                      <div className="relative">
                        {item.found ? 
                          <CollectibleItem id={item.id} size="sm" interactive={false} showRarity={true} /> : 
                          <div className="text-2xl w-10 h-10 flex items-center justify-center bg-retro-dark/50 rounded-full border border-dashed border-retro-gray">
                            <Lock className="w-4 h-4 text-retro-gray" />
                          </div>
                        }
                      </div>
                      
                      <div>
                        <p className="text-md font-medium">
                          {item.found ? item.name : "??????"}
                        </p>
                        <p className={`text-xs ${item.found ? `text-${item.rarity === 'legendary' ? 'yellow' : item.rarity === 'epic' ? 'purple' : item.rarity === 'rare' ? 'blue' : 'gray'}-400` : 'text-retro-gray'}`}>
                          {item.found ? item.rarity : "???"} {item.found ? item.category : "???"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };
  
  // Render category view
  const renderCategoriesView = () => {
    return (
      <div className="space-y-6">
        {Object.entries(categoryNames).map(([categoryId, categoryName]) => {
          const categoryItems = getCollectiblesByCategory(categoryId as CollectibleCategoryType);
          const collectedCount = categoryItems.filter(item => item.found).length;
          
          return (
            <div key={categoryId} className="bg-retro-dark border-2 border-retro-secondary rounded-md overflow-hidden">
              <div className="p-3 border-b border-retro-secondary">
                <h3 className="text-xl text-retro-light font-bold">{categoryName}</h3>
                <p className="text-sm text-retro-gray">{collectedCount}/{categoryItems.length} collected</p>
              </div>
              
              <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {categoryItems.map(item => (
                  <div key={item.id} className="flex flex-col items-center gap-2 p-2">
                    <CollectibleItem 
                      id={item.id} 
                      size="md"
                      showRarity={true}
                    />
                    {item.found && (
                      <span className="text-xs text-center text-retro-gray">{item.name}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Render by rarity
  const renderRarityView = () => {
    return (
      <div className="space-y-6">
        {rarityOrder.map(rarity => {
          const rarityItems = getCollectiblesByRarity(rarity as any);
          const collectedCount = rarityItems.filter(item => item.found).length;
          
          return (
            <div key={rarity} className="bg-retro-dark border-2 border-retro-secondary rounded-md overflow-hidden">
              <div className={`p-3 border-b border-retro-secondary ${rarity === 'legendary' ? 'bg-yellow-500/10' : rarity === 'epic' ? 'bg-purple-500/10' : rarity === 'rare' ? 'bg-blue-500/10' : 'bg-gray-500/10'}`}>
                <h3 className="text-xl text-retro-light font-bold">{rarityNames[rarity as keyof typeof rarityNames]}</h3>
                <p className="text-sm text-retro-gray">{collectedCount}/{rarityItems.length} collected</p>
              </div>
              
              <div className="p-4 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                {rarityItems.map(item => (
                  <div key={item.id} className="flex flex-col items-center gap-2 p-2">
                    <CollectibleItem 
                      id={item.id} 
                      size="sm"
                      showRarity={false}
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Render all collectibles in a grid
  const renderAllView = () => {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {collectibles.map(item => (
          <div 
            key={item.id} 
            className={`
              p-3 rounded-md flex items-center gap-3
              ${item.found 
                ? `bg-retro-secondary bg-opacity-10` 
                : "bg-retro-dark border border-dashed border-retro-gray"}
            `}
          >
            <div className="relative">
              {item.found ? 
                <CollectibleItem id={item.id} size="sm" interactive={false} showRarity={true} /> : 
                <div className="text-2xl w-8 h-8 flex items-center justify-center bg-retro-dark/50 rounded-full">
                  <span>?</span>
                </div>
              }
            </div>
            
            <div>
              <p className="text-sm font-medium truncate max-w-[140px]">
                {item.found ? item.name : "??????"}
              </p>
              <p className="text-xs text-retro-gray">
                {item.found ? item.set : "???"}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <div className="bg-retro-dark border-4 border-retro-primary rounded p-4 mt-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl text-retro-primary">Your Collection</h3>
        <div className="bg-retro-primary bg-opacity-20 px-3 py-1 rounded-full">
          <span className="text-md text-retro-primary font-bold">{getTotalValue()} coins</span>
        </div>
      </div>
      
      {/* Tab navigation */}
      <div className="flex border-b border-retro-secondary mb-6">
        <button 
          className={`px-4 py-2 ${activeTab === 'sets' ? 'text-retro-primary border-b-2 border-retro-primary' : 'text-retro-gray hover:text-retro-light'}`}
          onClick={() => setActiveTab('sets')}
        >
          Sets
        </button>
        <button 
          className={`px-4 py-2 ${activeTab === 'categories' ? 'text-retro-primary border-b-2 border-retro-primary' : 'text-retro-gray hover:text-retro-light'}`}
          onClick={() => setActiveTab('categories')}
        >
          Categories
        </button>
        <button 
          className={`px-4 py-2 ${activeTab === 'rarity' ? 'text-retro-primary border-b-2 border-retro-primary' : 'text-retro-gray hover:text-retro-light'}`}
          onClick={() => setActiveTab('rarity')}
        >
          Rarity
        </button>
        <button 
          className={`px-4 py-2 ${activeTab === 'all' ? 'text-retro-primary border-b-2 border-retro-primary' : 'text-retro-gray hover:text-retro-light'}`}
          onClick={() => setActiveTab('all')}
        >
          All Items
        </button>
      </div>
      
      {/* Content based on active tab */}
      {activeTab === 'sets' && renderSetsView()}
      {activeTab === 'categories' && renderCategoriesView()}
      {activeTab === 'rarity' && renderRarityView()}
      {activeTab === 'all' && renderAllView()}
    </div>
  );
};

export default CollectionDisplay;
