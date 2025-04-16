
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Gamepad2, Menu, X } from "lucide-react";
import { useCollectibles } from "../../hooks/use-collectibles";

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { collectedCount, totalCollectibles } = useCollectibles();

  return (
    <header className="bg-retro-dark border-b-4 border-retro-primary py-4 px-4 relative z-20">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-retro-primary p-2 rounded animate-pulse">
            <Gamepad2 className="text-white h-6 w-6" />
          </div>
          <h1 className="text-xl md:text-2xl text-retro-primary font-bold tracking-wider group-hover:text-retro-accent transition-colors">
            PIXEL PALACE
          </h1>
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="nav-link text-retro-light text-lg hover:text-retro-primary transition-colors">
            Home
          </Link>
          <Link to="/games" className="nav-link text-retro-light text-lg hover:text-retro-primary transition-colors">
            Games
          </Link>
          <Link to="/collectibles" className="nav-link text-retro-light text-lg hover:text-retro-primary transition-colors">
            Collectibles
          </Link>
          <Link to="/trivia" className="nav-link text-retro-light text-lg hover:text-retro-primary transition-colors">
            Trivia
          </Link>
          <Link to="/about" className="nav-link text-retro-light text-lg hover:text-retro-primary transition-colors">
            About
          </Link>
          <div className="ml-4 bg-retro-dark border-2 border-retro-blue px-3 py-1 rounded-md">
            <span className="text-retro-blue font-vt323 text-lg">
              {collectedCount}/{totalCollectibles} Items
            </span>
          </div>
        </div>
        
        <button 
          className="md:hidden text-retro-light" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-retro-dark border-b-4 border-retro-primary animate-pixel-slide z-50">
          <div className="flex flex-col py-2 px-4">
            <Link 
              to="/" 
              className="py-3 text-retro-light text-lg hover:text-retro-primary border-b border-retro-secondary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/games" 
              className="py-3 text-retro-light text-lg hover:text-retro-primary border-b border-retro-secondary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Games
            </Link>
            <Link 
              to="/collectibles" 
              className="py-3 text-retro-light text-lg hover:text-retro-primary border-b border-retro-secondary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Collectibles
            </Link>
            <Link 
              to="/trivia" 
              className="py-3 text-retro-light text-lg hover:text-retro-primary border-b border-retro-secondary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Trivia
            </Link>
            <Link 
              to="/about" 
              className="py-3 text-retro-light text-lg hover:text-retro-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <div className="mt-4 mb-2 bg-retro-dark border-2 border-retro-blue px-3 py-1 rounded-md inline-block">
              <span className="text-retro-blue text-lg">
                {collectedCount}/{totalCollectibles} Items
              </span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
