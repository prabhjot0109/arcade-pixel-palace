
import React, { useEffect } from "react";
import Layout from "../components/layout/Layout";
import PixelDivider from "../components/ui/PixelDivider";
import CollectionDisplay from "../components/collectibles/CollectionDisplay";
import CollectibleItem from "../components/collectibles/CollectibleItem";
import { useCollectibles } from "../hooks/use-collectibles";
import { Award } from "lucide-react";

const CollectiblesPage = () => {
  const { collectedCount, totalCollectibles } = useCollectibles();
  const allCollected = collectedCount === totalCollectibles;
  
  useEffect(() => {
    document.title = "Collectibles - Pixel Palace";
  }, []);

  return (
    <Layout>
      <div className="relative">
        <h1 className="text-3xl md:text-4xl text-retro-primary mb-6">
          YOUR COLLECTION
        </h1>
        
        <div className="absolute top-0 right-0">
          <CollectibleItem id="gem" />
        </div>
        
        <div className="mb-8">
          <p className="text-xl text-retro-light mb-6">
            Track your collectibles found throughout the site. Find them all to unlock exclusive content!
          </p>
          
          <div className="bg-retro-dark border-4 border-retro-primary p-6 rounded-lg">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl text-retro-primary mb-2">
                  Collection Progress
                </h2>
                <p className="text-lg text-retro-light">
                  You've found {collectedCount} out of {totalCollectibles} collectibles!
                </p>
              </div>
              
              <div className="w-full md:w-64 h-8 bg-retro-dark border-2 border-retro-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-retro-primary transition-all duration-1000"
                  style={{ width: `${(collectedCount / totalCollectibles) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        
        <CollectionDisplay />
        
        <PixelDivider text="HINTS" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-retro-dark border-4 border-retro-secondary p-4 rounded-lg">
            <h3 className="text-lg text-retro-primary mb-2">Where to Look</h3>
            <p className="text-retro-light">
              Collectibles can be found throughout the site. Look for interactive
              elements and explore every page carefully!
            </p>
          </div>
          
          <div className="bg-retro-dark border-4 border-retro-secondary p-4 rounded-lg">
            <h3 className="text-lg text-retro-primary mb-2">How to Collect</h3>
            <p className="text-retro-light">
              Simply click on a collectible when you find one to add it to your collection.
              Your progress is saved automatically.
            </p>
          </div>
        </div>
        
        {allCollected ? (
          <div className="bg-retro-dark border-4 border-retro-primary p-6 rounded-lg text-center animate-glow">
            <div className="flex justify-center mb-4">
              <Award className="h-16 w-16 text-retro-accent" />
            </div>
            <h2 className="text-2xl text-retro-accent mb-4">
              CONGRATULATIONS!
            </h2>
            <p className="text-xl text-retro-light">
              You've found all the collectibles! You've unlocked exclusive content!
            </p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-retro-secondary bg-opacity-20 p-4 rounded-lg">
                <h4 className="text-lg text-retro-primary mb-2">Secret Trivia</h4>
                <p className="text-retro-light">
                  The highest-grossing arcade game of all time is Pac-Man, which has generated over $3.5 billion in revenue!
                </p>
              </div>
              <div className="bg-retro-secondary bg-opacity-20 p-4 rounded-lg">
                <h4 className="text-lg text-retro-primary mb-2">Hidden Fact</h4>
                <p className="text-retro-light">
                  Super Mario was originally called "Jumpman" in the Donkey Kong arcade game before getting his famous name!
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-retro-dark border-4 border-retro-secondary p-6 rounded-lg">
            <h3 className="text-xl text-retro-primary mb-4">
              EXCLUSIVE CONTENT AWAITS!
            </h3>
            <p className="text-lg text-retro-light">
              Collect all {totalCollectibles} items to unlock exclusive retro gaming content!
              Interesting trivia, fun facts, and more will be revealed.
            </p>
            <div className="relative">
              <CollectibleItem id="potion" className="absolute -top-12 right-4" />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CollectiblesPage;
