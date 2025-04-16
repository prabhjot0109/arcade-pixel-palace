import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

type TransitionImage = {
  src: string;
  alt: string;
  message: string;
};

// Pixel art transition images and messages for different routes
const transitionImages: Record<string, TransitionImage[]> = {
  games: [
    { 
      src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Crect x='0' y='0' width='64' height='64' fill='%23000'/%3E%3Crect x='8' y='8' width='4' height='4' fill='%23ff004d'/%3E%3Crect x='12' y='8' width='4' height='4' fill='%23ff004d'/%3E%3Crect x='16' y='8' width='4' height='4' fill='%23ff004d'/%3E%3Crect x='20' y='8' width='4' height='4' fill='%23ff004d'/%3E%3Crect x='8' y='12' width='4' height='4' fill='%23ff004d'/%3E%3Crect x='20' y='12' width='4' height='4' fill='%23ff004d'/%3E%3Crect x='8' y='16' width='4' height='4' fill='%23ff004d'/%3E%3Crect x='12' y='16' width='4' height='4' fill='%23ff004d'/%3E%3Crect x='16' y='16' width='4' height='4' fill='%23ff004d'/%3E%3Crect x='20' y='16' width='4' height='4' fill='%23ff004d'/%3E%3Crect x='40' y='8' width='4' height='4' fill='%23ffec27'/%3E%3Crect x='44' y='8' width='4' height='4' fill='%23ffec27'/%3E%3Crect x='48' y='8' width='4' height='4' fill='%23ffec27'/%3E%3Crect x='52' y='8' width='4' height='4' fill='%23ffec27'/%3E%3Crect x='40' y='12' width='4' height='4' fill='%23ffec27'/%3E%3Crect x='40' y='16' width='4' height='4' fill='%23ffec27'/%3E%3Crect x='44' y='16' width='4' height='4' fill='%23ffec27'/%3E%3Crect x='48' y='16' width='4' height='4' fill='%23ffec27'/%3E%3Crect x='52' y='16' width='4' height='4' fill='%23ffec27'/%3E%3Crect x='40' y='20' width='4' height='4' fill='%23ffec27'/%3E%3Crect x='8' y='32' width='4' height='4' fill='%2300e756'/%3E%3Crect x='12' y='32' width='4' height='4' fill='%2300e756'/%3E%3Crect x='16' y='32' width='4' height='4' fill='%2300e756'/%3E%3Crect x='20' y='32' width='4' height='4' fill='%2300e756'/%3E%3Crect x='8' y='36' width='4' height='4' fill='%2300e756'/%3E%3Crect x='8' y='40' width='4' height='4' fill='%2300e756'/%3E%3Crect x='12' y='40' width='4' height='4' fill='%2300e756'/%3E%3Crect x='16' y='40' width='4' height='4' fill='%2300e756'/%3E%3Crect x='20' y='40' width='4' height='4' fill='%2300e756'/%3E%3Crect x='20' y='44' width='4' height='4' fill='%2300e756'/%3E%3Crect x='40' y='32' width='4' height='4' fill='%2329adff'/%3E%3Crect x='44' y='32' width='4' height='4' fill='%2329adff'/%3E%3Crect x='48' y='32' width='4' height='4' fill='%2329adff'/%3E%3Crect x='52' y='32' width='4' height='4' fill='%2329adff'/%3E%3Crect x='52' y='36' width='4' height='4' fill='%2329adff'/%3E%3Crect x='40' y='40' width='4' height='4' fill='%2329adff'/%3E%3Crect x='44' y='40' width='4' height='4' fill='%2329adff'/%3E%3Crect x='48' y='40' width='4' height='4' fill='%2329adff'/%3E%3Crect x='52' y='40' width='4' height='4' fill='%2329adff'/%3E%3Crect x='40' y='44' width='4' height='4' fill='%2329adff'/%3E%3C/svg%3E", 
      alt: "Pixel Art Tetris Blocks", 
      message: "LOADING GAMES..." 
    },
    {
      src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Crect x='0' y='0' width='64' height='64' fill='%23000'/%3E%3Ccircle cx='32' cy='32' r='16' fill='%23ffec27'/%3E%3Crect x='32' y='32' width='16' height='16' fill='%23000'/%3E%3C/svg%3E",
      alt: "Pixel Art Pac-Man",
      message: "GET READY!"
    }
  ],
  collectibles: [
    {
      src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Crect x='0' y='0' width='64' height='64' fill='%23000'/%3E%3Ccircle cx='32' cy='16' r='8' fill='%23ffec27'/%3E%3Cpath d='M24 24 L40 24 L48 48 L16 48 Z' fill='%23ff004d'/%3E%3Crect x='28' y='24' width='8' height='8' fill='%23fff'/%3E%3C/svg%3E",
      alt: "Pixel Art Mushroom",
      message: "COLLECTING ITEMS..."
    }
  ],
  profile: [
    {
      src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Crect x='0' y='0' width='64' height='64' fill='%23000'/%3E%3Ccircle cx='32' cy='20' r='12' fill='%2329adff'/%3E%3Cpath d='M16 56 C16 40 48 40 48 56' fill='%2329adff'/%3E%3C/svg%3E",
      alt: "Pixel Art Avatar",
      message: "LOADING PROFILE..."
    }
  ],
  inventory: [
    {
      src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Crect x='0' y='0' width='64' height='64' fill='%23000'/%3E%3Crect x='16' y='16' width='32' height='32' fill='%23a67c00'/%3E%3Crect x='20' y='20' width='24' height='24' fill='%23ffec27'/%3E%3Crect x='28' y='16' width='8' height='4' fill='%23a67c00'/%3E%3C/svg%3E",
      alt: "Pixel Art Treasure Chest",
      message: "OPENING INVENTORY..."
    }
  ],
  trivia: [
    {
      src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Crect x='0' y='0' width='64' height='64' fill='%23000'/%3E%3Ccircle cx='32' cy='32' r='16' fill='%2329adff'/%3E%3Ctext x='32' y='40' font-family='Arial' font-size='24' text-anchor='middle' fill='white'>?</text%3E%3C/svg%3E",
      alt: "Pixel Art Question Mark",
      message: "LOADING TRIVIA..."
    }
  ]
};

// Default transition for pages that don't have a specific one
const defaultTransition: TransitionImage = {
  src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Crect x='0' y='0' width='64' height='64' fill='%23000'/%3E%3Cpath d='M16 32 L32 16 L48 32 L32 48 Z' fill='%23ff004d'/%3E%3C/svg%3E",
  alt: "Pixel Art Diamond",
  message: "LOADING..."
};

const PageTransition: React.FC = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState<TransitionImage>(defaultTransition);
  
  useEffect(() => {
    // Extract the main path without any sub-paths
    const mainPath = location.pathname.split('/')[1];
    
    // Set the transition image based on the route
    const images = transitionImages[mainPath] || [defaultTransition];
    const randomImage = images[Math.floor(Math.random() * images.length)];
    setCurrentImage(randomImage);
    
    // Show transition
    setIsVisible(true);
    
    // Hide transition after a short delay
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [location]);
  
  if (!isVisible) return null;
  
  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center pointer-events-none">
      <div className={`transition-all duration-200 flex flex-col items-center ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-150'}`}>
        <img src={currentImage.src} alt={currentImage.alt} className="w-32 h-32 animate-bounce" />
        <div className="pixel-text text-retro-primary mt-4 text-2xl animate-pulse">
          {currentImage.message}
        </div>
      </div>
    </div>
  );
};

export default PageTransition;
