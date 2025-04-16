import React, { useEffect, useState, useRef } from 'react';
import { VolumeX, Volume2 } from 'lucide-react';

interface BackgroundMusicProps {
  src: string;
  autoPlay?: boolean;
  loop?: boolean;
  volume?: number;
}

const BackgroundMusic: React.FC<BackgroundMusicProps> = ({ 
  src, 
  autoPlay = true, 
  loop = true, 
  volume = 0.3 
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const audio = new Audio(src);
    audioRef.current = audio;
    audio.loop = loop;
    audio.volume = volume;
    
    const handleCanPlayThrough = () => {
      setIsLoaded(true);
      if (autoPlay && !isMuted) {
        audio.play().catch(err => console.error("Error playing background music:", err));
      }
    };
    
    audio.addEventListener('canplaythrough', handleCanPlayThrough);
    
    return () => {
      audio.pause();
      audio.removeEventListener('canplaythrough', handleCanPlayThrough);
    };
  }, [src, autoPlay, loop, volume]);

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume;
        audioRef.current.play().catch(err => console.error("Error playing background music:", err));
      } else {
        audioRef.current.pause();
      }
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button 
        onClick={toggleMute}
        className="bg-retro-dark border-2 border-retro-primary p-2 rounded-full hover:bg-retro-dark/80 transition-all"
        aria-label={isMuted ? "Unmute Music" : "Mute Music"}
        title={isMuted ? "Unmute Music" : "Mute Music"}
      >
        {isMuted ? (
          <VolumeX className="h-5 w-5 text-retro-light" />
        ) : (
          <Volume2 className="h-5 w-5 text-retro-primary animate-pulse" />
        )}
      </button>
    </div>
  );
};

export default BackgroundMusic;
