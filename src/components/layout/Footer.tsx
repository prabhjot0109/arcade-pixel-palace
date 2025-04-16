
import React from "react";
import { Heart, Github } from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-retro-dark border-t-4 border-retro-primary py-4 mt-8 relative z-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 flex items-center">
            <span className="text-retro-light text-lg">
              © {currentYear} PIXEL PALACE
            </span>
            <span className="text-xs mx-2 text-retro-gray">·</span>
            <span className="text-retro-gray text-lg">
              Made with <Heart className="inline h-4 w-4 text-retro-red" /> for retro gaming
            </span>
          </div>
          
          <div className="flex space-x-4">
            <a href="https://github.com/prabhjot0109" target="_blank" rel="noopener noreferrer" className="text-retro-light hover:text-retro-primary">
              <span className="sr-only">GitHub</span>
              <Github className="h-6 w-6" />
            </a>
          </div>
        </div>
        
        <div className="mt-4 text-center text-retro-gray text-sm">
          <p>All game images and names are trademarks of their respective owners.</p>
          <p>This site is not affiliated with any game company.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
