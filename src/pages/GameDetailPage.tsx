
import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import PixelDivider from "../components/ui/PixelDivider";
import { ArrowLeft } from "lucide-react";
import CollectibleItem from "../components/collectibles/CollectibleItem";

// Import game images for consistency with GamesPage
import superMarioBrosImage from "../assets/images/super-mario-bros.svg";
import legendOfZeldaImage from "../assets/images/legend-of-zelda.svg";
import sonicImage from "../assets/images/sonic.svg";
import streetFighterImage from "../assets/images/street-fighter.svg";
import tetrisImage from "../assets/images/tetris.svg";
import pacManImage from "../assets/images/pac-man.svg";
import donkeyKongImage from "../assets/images/donkey-kong.svg";
import pokemonImage from "../assets/images/pokemon.svg";
import finalFantasyImage from "../assets/images/final-fantasy.svg";

interface GameDetail {
  title: string;
  year: number;
  developer: string;
  genre: string;
  description: string;
  image: string;
  collectibleId?: string;
  easterEgg?: string;
}

const GameDetailPage = () => {
  const { slug } = useParams();
  
  useEffect(() => {
    document.title = `${slug?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} - Pixel Palace`;
  }, [slug]);

  const gameDetails: Record<string, GameDetail> = {
    'super-mario-bros': {
      title: 'Super Mario Bros.',
      year: 1985,
      developer: 'Nintendo',
      genre: 'Platformer',
      description: 'The game that defined the platforming genre and launched a gaming icon. Jump through the Mushroom Kingdom, defeat Bowser, and save Princess Peach!',
      image: superMarioBrosImage,
      collectibleId: 'mushroom',
      easterEgg: "Did you know? The clouds and bushes in Super Mario Bros. use the same sprite, just with different colors!"
    },
    'legend-of-zelda': {
      title: 'The Legend of Zelda',
      year: 1986,
      developer: 'Nintendo',
      genre: 'Action-Adventure',
      description: 'A revolutionary action-adventure game that pioneered non-linear gameplay. Explore Hyrule, collect items, and defeat Ganon!',
      image: legendOfZeldaImage,
      collectibleId: 'sword'
    },
    'sonic': {
      title: 'Sonic the Hedgehog',
      year: 1991,
      developer: 'Sega',
      genre: 'Platformer',
      description: 'The blue blur that gave Mario a run for his money! Speed through loops, collect rings, and stop Dr. Robotnik.',
      image: sonicImage,
      collectibleId: 'ring'
    },
    'street-fighter': {
      title: 'Street Fighter II',
      year: 1991,
      developer: 'Capcom',
      genre: 'Fighting',
      description: 'The fighting game that defined a genre. Choose from 8 unique fighters and compete in the World Warrior tournament!',
      image: streetFighterImage,
      collectibleId: 'fist'
    },
    'donkey-kong': {
      title: 'Donkey Kong Country',
      year: 1994,
      developer: 'Rare',
      genre: 'Platformer',
      description: 'Stunning pre-rendered graphics and challenging platforming action. Help DK and Diddy recover their banana hoard!',
      image: donkeyKongImage,
      collectibleId: 'banana'
    },
    'tetris': {
      title: 'Tetris',
      year: 1984,
      developer: 'Alexey Pajitnov',
      genre: 'Puzzle',
      description: 'The timeless puzzle game that conquered the world. Arrange falling blocks to clear lines and achieve high scores!',
      image: tetrisImage,
      collectibleId: 'block'
    },
    'pokemon': {
      title: 'Pokémon Red/Blue',
      year: 1996,
      developer: 'Game Freak',
      genre: 'RPG',
      description: 'Catch, train, and battle your way to becoming a Pokémon master! A worldwide phenomenon begins.',
      image: pokemonImage,
      collectibleId: 'pokeball'
    },
    'final-fantasy': {
      title: 'Final Fantasy VII',
      year: 1997,
      developer: 'Square',
      genre: 'RPG',
      description: 'An epic RPG that pushed the boundaries of storytelling in games. Join Cloud and friends to save the planet!',
      image: finalFantasyImage,
      collectibleId: 'materia'
    },
    'pac-man': {
      title: 'Pac-Man',
      year: 1980,
      developer: 'Namco',
      genre: 'Arcade',
      description: 'Navigate a maze, eating dots while avoiding ghosts in this iconic arcade classic that defined a generation of gaming.',
      image: pacManImage,
      collectibleId: 'cherry'
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
            {/* Primary collectible */}
            {game.collectibleId && (
              <div className="absolute bottom-4 right-4">
                <CollectibleItem id={game.collectibleId} size="lg" />
              </div>
            )}
            
            {/* Additional collectible based on the game's genre */}
            {game.genre === 'RPG' && (
              <div className="absolute top-4 left-4">
                <CollectibleItem id="scroll" size="md" />
              </div>
            )}
            
            {game.genre === 'Platformer' && (
              <div className="absolute top-4 right-4">
                <CollectibleItem id="1up" size="md" />
              </div>
            )}
            
            {game.genre === 'Arcade' && (
              <div className="absolute top-4 left-4">
                <CollectibleItem id="ghost" size="md" />
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
            
            {game.easterEgg && (
              <div className="mt-6 p-4 bg-retro-secondary bg-opacity-20 rounded-lg border-2 border-retro-secondary relative">
                <p className="text-lg text-retro-light">🎮 {game.easterEgg}</p>
                {/* Easter egg collectible */}
                <div className="absolute -top-4 -right-4">
                  <CollectibleItem id="map" size="sm" />
                </div>
              </div>
            )}
          </div>
        </div>

        <PixelDivider text="GAMEPLAY" />
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-retro-dark border-4 border-retro-secondary p-6 rounded-lg relative">
            <h2 className="text-2xl text-retro-primary mb-4">CONTROLS</h2>
            <ul className="space-y-2 text-xl text-retro-light">
              <li>D-Pad: Move</li>
              <li>A Button: Jump/Confirm</li>
              <li>B Button: Run/Cancel</li>
              <li>Start: Pause Game</li>
            </ul>
            
            {/* Controller collectible */}
            <div className="absolute -bottom-3 right-3">
              <CollectibleItem id="snes" size="sm" />
            </div>
          </div>
          
          <div className="bg-retro-dark border-4 border-retro-secondary p-6 rounded-lg relative">
            <h2 className="text-2xl text-retro-primary mb-4">TIPS & TRICKS</h2>
            <ul className="space-y-2 text-xl text-retro-light">
              <li>Hold B while running to move faster</li>
              
              {/* Collectible in the tips section */}
              <div className="absolute top-2 right-2">
                <CollectibleItem id="key" size="sm" />
              </div>
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
