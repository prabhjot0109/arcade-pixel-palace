import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import CollectibleItem from "../collectibles/CollectibleItem";
interface FeaturedGameProps {
  title: string;
  description: string;
  imageUrl: string;
  slug: string;
  collectibleId?: string;
}
const FeaturedGame: React.FC<FeaturedGameProps> = ({
  title,
  description,
  imageUrl,
  slug,
  collectibleId
}) => {
  return <div className="bg-retro-dark relative overflow-hidden rounded-lg border-4 border-retro-primary mb-6">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-2/5 aspect-video md:aspect-auto relative">
          <img src={imageUrl} alt={title} className="w-full h-full object-scale-down" />
          {collectibleId && <div className="absolute bottom-4 right-4">
              <CollectibleItem id={collectibleId} size="lg" />
            </div>}
        </div>
        
        <div className="md:w-3/5 p-6">
          <h2 className="text-2xl md:text-3xl text-retro-primary mb-4">
            {title}
          </h2>
          
          <p className="text-xl text-retro-light mb-6">
            {description}
          </p>
          
          <Link to={`/games/${slug}`} className="pixel-btn inline-flex items-center group">
            PLAY NOW
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>;
};
export default FeaturedGame;