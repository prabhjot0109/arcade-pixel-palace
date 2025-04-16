
import React from "react";

interface PixelDividerProps {
  text?: string;
  className?: string;
}

const PixelDivider: React.FC<PixelDividerProps> = ({ text, className = "" }) => {
  return (
    <div className={`flex items-center my-8 ${className}`}>
      <div className="flex-grow h-2 bg-retro-primary"></div>
      {text && (
        <>
          <h2 className="mx-4 text-2xl text-retro-primary animate-blink">
            {text}
          </h2>
          <div className="flex-grow h-2 bg-retro-primary"></div>
        </>
      )}
    </div>
  );
};

export default PixelDivider;
