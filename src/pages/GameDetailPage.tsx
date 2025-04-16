
import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import PixelDivider from "../components/ui/PixelDivider";
import { ArrowLeft } from "lucide-react";
import CollectibleItem from "../components/collectibles/CollectibleItem";

const GameDetailPage = () => {
  const { slug } = useParams();
  
  useEffect(() => {
    document.title = `${slug?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} - Pixel Palace`;
  }, [slug]);

  // This is a mock data structure - in a real app, this would come from an API or database
  const gameDetails = {
    'super-mario-bros': {
      title: 'Super Mario Bros.',
      year: 1985,
      developer: 'Nintendo',
      genre: 'Platformer',
      description: 'The game that defined the platforming genre and launched a gaming icon.',
      image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22',
      collectibleId: 'mushroom'
    },
    'legend-of-zelda': {
      title: 'The Legend of Zelda',
      year: 1986,
      developer: 'Nintendo',
      genre: 'Action-Adventure',
      description: 'A revolutionary action-adventure game that pioneered non-linear gameplay.',
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7'
    }
  };

  const game = gameDetails[slug as keyof typeof gameDetails];

  if (!game) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h1 className="text-3xl text-retro-primary mb-4">Game Not Found</h1>
          <Link to="/games" className="pixel-btn inline-flex items-center">
            <ArrowLeft className="mr-2" /> BACK TO GAMES
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <Link to="/games" className="pixel-btn inline-flex items-center mb-6">
          <ArrowLeft className="mr-2" /> BACK TO GAMES
        </Link>

        <div className="bg-retro-dark border-4 border-retro-primary rounded-lg overflow-hidden mb-8">
          <div className="relative">
            <img 
              src={game.image} 
              alt={game.title} 
              className="w-full h-[300px] object-cover"
            />
            {game.collectibleId && (
              <div className="absolute bottom-4 right-4">
                <CollectibleItem id={game.collectibleId} size="lg" />
              </div>
            )}
          </div>
          
          <div className="p-6">
            <h1 className="text-3xl text-retro-primary mb-4">{game.title}</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div>
                <h3 className="text-retro-gray">Year</h3>
                <p className="text-xl text-retro-light">{game.year}</p>
              </div>
              <div>
                <h3 className="text-retro-gray">Developer</h3>
                <p className="text-xl text-retro-light">{game.developer}</p>
              </div>
              <div>
                <h3 className="text-retro-gray">Genre</h3>
                <p className="text-xl text-retro-light">{game.genre}</p>
              </div>
            </div>
            <p className="text-xl text-retro-light">{game.description}</p>
          </div>
        </div>

        <PixelDivider text="GAMEPLAY" />
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-retro-dark border-4 border-retro-secondary p-6 rounded-lg">
            <h2 className="text-2xl text-retro-primary mb-4">CONTROLS</h2>
            <ul className="space-y-2 text-xl text-retro-light">
              <li>D-Pad: Move</li>
              <li>A Button: Jump/Confirm</li>
              <li>B Button: Run/Cancel</li>
              <li>Start: Pause Game</li>
            </ul>
          </div>
          
          <div className="bg-retro-dark border-4 border-retro-secondary p-6 rounded-lg">
            <h2 className="text-2xl text-retro-primary mb-4">TIPS & TRICKS</h2>
            <ul className="space-y-2 text-xl text-retro-light">
              <li>Hold B while running to move faster</li>
              <li>Jump on enemies to defeat them</li>
              <li>Collect coins for extra lives</li>
              <li>Find hidden blocks for power-ups</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GameDetailPage;
