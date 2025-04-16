
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import FeaturedGame from "../components/games/FeaturedGame";
import GameCard from "../components/games/GameCard";
import PixelDivider from "../components/ui/PixelDivider";
import CollectibleItem from "../components/collectibles/CollectibleItem";

// Import game images
import superMarioBros from "../assets/images/super-mario-bros.svg";
import legendOfZelda from "../assets/images/legend-of-zelda.svg";
import pacMan from "../assets/images/pac-man.svg";
import sonic from "../assets/images/sonic.svg";
import tetris from "../assets/images/tetris.svg";
import streetFighter from "../assets/images/street-fighter.svg";

const Index = () => {
  const [currentYear] = useState(new Date().getFullYear());
  
  useEffect(() => {
    document.title = "Pixel Palace - Classic Gaming Hub";
  }, []);

  return (
    <Layout>
      <section className="relative py-10 px-4 overflow-hidden">
        <div className="flex flex-col items-center text-center mb-10">
          <h1 className="text-3xl md:text-5xl text-retro-primary mb-4 animate-glow">
            WELCOME TO PIXEL PALACE
          </h1>
          <p className="text-xl md:text-2xl text-retro-light max-w-3xl">
            Your portal to the golden era of gaming from the 80s and 90s.
            Collect items, unlock secrets, and relive the classics!
          </p>
          
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link to="/games" className="pixel-btn">
              EXPLORE GAMES
            </Link>
            <Link to="/collectibles" className="pixel-btn">
              VIEW COLLECTION
            </Link>
          </div>
          
          <div className="mt-14 w-full relative">
            {/* Strategic collectible placement throughout the hero section */}
            <div className="absolute -top-10 left-1/4">
              <CollectibleItem id="mushroom" />
            </div>
            <div className="absolute top-0 right-8">
              <CollectibleItem id="ring" />
            </div>
            <div className="absolute -bottom-8 left-10">
              <CollectibleItem id="gold-coin" size="sm" />
            </div>
          </div>
        </div>
      </section>

      <PixelDivider text="FEATURED GAMES" />
      
      <section className="mb-12 relative">
        {/* Rare collectible near featured games section */}
        <div className="absolute top-2 right-10 z-10">
          <CollectibleItem id="fire-flower" />
        </div>
        
        <FeaturedGame 
          title="Super Mario Bros."
          description="Jump and run through the Mushroom Kingdom in this iconic platformer. 
                      Rescue Princess Toadstool from the evil clutches of Bowser!"
          imageUrl={superMarioBros}
          slug="super-mario-bros"
          collectibleId="mushroom"
        />
        
        <FeaturedGame 
          title="The Legend of Zelda"
          description="Embark on an epic journey through the kingdom of Hyrule. Solve puzzles, 
                      explore dungeons, and defeat Ganon to rescue Princess Zelda."
          imageUrl={legendOfZelda}
          slug="legend-of-zelda"
        />
      </section>

      <PixelDivider text="CLASSIC GAMES" />
      
      <section className="mb-12 relative">
        {/* Epic collectible in the corner of the classics section */}
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
          <CollectibleItem id="gem" size="md" />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          <GameCard 
            title="Pac-Man"
            year="1980"
            platform="Arcade"
            imageUrl={pacMan}
            slug="pac-man"
          />
          
          <GameCard 
            title="Sonic the Hedgehog"
            year="1991"
            platform="Sega Genesis"
            imageUrl={sonic}
            slug="sonic"
          />
          
          <GameCard 
            title="Tetris"
            year="1984"
            platform="Various"
            imageUrl={tetris}
            slug="tetris"
          />
          
          <GameCard 
            title="Street Fighter II"
            year="1991"
            platform="Arcade"
            imageUrl={streetFighter}
            slug="street-fighter"
          />
        </div>
        
        <div className="mt-8 text-center">
          <Link to="/games" className="pixel-btn">
            VIEW ALL GAMES
          </Link>
        </div>
      </section>

      <PixelDivider text="ABOUT" />
      
      <section className="mb-12">
        <div className="bg-retro-dark border-4 border-retro-secondary p-6 rounded-lg text-center">
          <h2 className="text-2xl text-retro-primary mb-4">
            RETRO GAMING HUB
          </h2>
          
          <p className="text-xl text-retro-light mb-4">
            Pixel Palace is your ultimate destination for everything retro gaming.
            Explore our vast collection of classic games from the 80s and 90s,
            collect hidden items throughout the site, and unlock exclusive content!
          </p>
          
          <p className="text-xl text-retro-light">
            Our mission is to preserve and celebrate the golden age of video games.
            Join our community of retro gaming enthusiasts and relive the magic
            of pixelated adventures!
          </p>
          
          <div className="mt-6">
            <span className="text-retro-gray">
              © {currentYear} Pixel Palace - All rights reserved
            </span>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
