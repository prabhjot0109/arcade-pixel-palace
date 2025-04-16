
import React, { useEffect } from "react";
import Layout from "../components/layout/Layout";
import GameCard from "../components/games/GameCard";
import PixelDivider from "../components/ui/PixelDivider";
import CollectibleItem from "../components/collectibles/CollectibleItem";

const GamesPage = () => {
  useEffect(() => {
    document.title = "Games - Pixel Palace";
  }, []);

  const platforms = [
    { id: "arcade", name: "Arcade" },
    { id: "nes", name: "Nintendo NES" },
    { id: "snes", name: "Super Nintendo" },
    { id: "genesis", name: "Sega Genesis" },
    { id: "gameboy", name: "Game Boy" },
    { id: "playstation", name: "PlayStation" },
    { id: "n64", name: "Nintendo 64" },
    { id: "pc", name: "PC" }
  ];
  
  // Simple game data for our demo
  const games = [
    {
      id: "super-mario-bros",
      title: "Super Mario Bros.",
      year: "1985",
      platform: "NES",
      imageUrl: "https://source.unsplash.com/random/400x300/?mario",
      platformId: "nes"
    },
    {
      id: "legend-of-zelda",
      title: "The Legend of Zelda",
      year: "1986",
      platform: "NES",
      imageUrl: "https://source.unsplash.com/random/400x300/?fantasy",
      platformId: "nes"
    },
    {
      id: "sonic",
      title: "Sonic the Hedgehog",
      year: "1991",
      platform: "Genesis",
      imageUrl: "https://source.unsplash.com/random/400x300/?sonic",
      platformId: "genesis"
    },
    {
      id: "street-fighter",
      title: "Street Fighter II",
      year: "1991",
      platform: "Arcade",
      imageUrl: "https://source.unsplash.com/random/400x300/?fighting",
      platformId: "arcade"
    },
    {
      id: "donkey-kong",
      title: "Donkey Kong Country",
      year: "1994",
      platform: "SNES",
      imageUrl: "https://source.unsplash.com/random/400x300/?jungle",
      platformId: "snes"
    },
    {
      id: "tetris",
      title: "Tetris",
      year: "1984",
      platform: "Various",
      imageUrl: "https://source.unsplash.com/random/400x300/?tetris",
      platformId: "pc"
    },
    {
      id: "pokemon",
      title: "Pokémon Red/Blue",
      year: "1996",
      platform: "Game Boy",
      imageUrl: "https://source.unsplash.com/random/400x300/?pokemon",
      platformId: "gameboy"
    },
    {
      id: "final-fantasy",
      title: "Final Fantasy VII",
      year: "1997",
      platform: "PlayStation",
      imageUrl: "https://source.unsplash.com/random/400x300/?fantasy",
      platformId: "playstation"
    }
  ];
  
  const [selectedPlatform, setSelectedPlatform] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  
  const filteredGames = games.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlatform = selectedPlatform ? game.platformId === selectedPlatform : true;
    
    return matchesSearch && matchesPlatform;
  });

  return (
    <Layout>
      <div className="relative">
        <h1 className="text-3xl md:text-4xl text-retro-primary mb-6">
          CLASSIC GAMES
        </h1>
        
        <div className="absolute top-0 right-0">
          <CollectibleItem id="star" />
        </div>
        
        <div className="mb-8">
          <p className="text-xl text-retro-light mb-6">
            Explore our curated collection of the most iconic retro games from the 80s and 90s.
            Filter by platform or search for your favorites!
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-grow">
              <input
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-3 bg-retro-dark border-2 border-retro-secondary focus:border-retro-primary outline-none text-retro-light"
              />
            </div>
            
            <div>
              <select
                value={selectedPlatform || ""}
                onChange={(e) => setSelectedPlatform(e.target.value || null)}
                className="w-full md:w-48 p-3 bg-retro-dark border-2 border-retro-secondary focus:border-retro-primary outline-none text-retro-light"
              >
                <option value="">All Platforms</option>
                {platforms.map(platform => (
                  <option key={platform.id} value={platform.id}>
                    {platform.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        <PixelDivider />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGames.length > 0 ? (
            filteredGames.map(game => (
              <GameCard
                key={game.id}
                title={game.title}
                year={game.year}
                platform={game.platform}
                imageUrl={game.imageUrl}
                slug={game.id}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-xl text-retro-gray">
                No games found matching your criteria. Try adjusting your filters.
              </p>
            </div>
          )}
        </div>
        
        <div className="mt-12">
          <div className="bg-retro-dark border-4 border-retro-secondary p-6 rounded-lg">
            <h3 className="text-xl text-retro-primary mb-4">
              LOOKING FOR A SPECIFIC GAME?
            </h3>
            
            <p className="text-lg text-retro-light mb-4">
              We're constantly updating our collection of classic games.
              If you can't find what you're looking for, let us know!
            </p>
            
            <div className="relative">
              <CollectibleItem id="cherry" className="absolute -top-12 right-4" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GamesPage;
