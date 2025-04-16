
import React from "react";
import { Link } from "react-router-dom";

interface GameCardProps {
  title: string;
  year: string;
  platform: string;
  imageUrl: string;
  slug: string;
}

const GameCard: React.FC<GameCardProps> = ({ 
  title, 
  year, 
  platform, 
  imageUrl,
  slug
}) => {
  return (
    <div className="group relative overflow-hidden bg-retro-dark border-4 border-retro-secondary rounded-md hover:border-retro-primary transition-colors">
      <div className="aspect-[4/3] overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-300" 
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-lg md:text-xl font-bold text-retro-primary mb-1 group-hover:text-retro-accent">
          {title}
        </h3>
        <div className="flex justify-between text-retro-gray">
          <span>{year}</span>
          <span>{platform}</span>
        </div>
      </div>
      
      <Link 
        to={`/games/${slug}`}
        className="absolute inset-0 w-full h-full opacity-0"
        aria-label={`View details for ${title}`}
      >
        <span className="sr-only">View game details</span>
      </Link>
    </div>
  );
};

export default GameCard;
