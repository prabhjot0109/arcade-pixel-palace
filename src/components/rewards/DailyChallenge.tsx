
import React from "react";
import { Award } from "lucide-react";
import { useCollectibles } from "../../hooks/use-collectibles";

const DailyChallenge = () => {
  const { collectibles, collectedCount } = useCollectibles();
  const todayDate = new Date().toLocaleDateString();
  
  // Simple daily challenge based on the date
  const dailyTarget = Math.min(
    collectibles.length,
    Math.floor((new Date().getDate() / 30) * collectibles.length)
  );
  
  const isCompleted = collectedCount >= dailyTarget;

  return (
    <div className="bg-retro-dark border-4 border-retro-secondary p-6 rounded-lg">
      <h2 className="text-xl text-retro-primary mb-4 flex items-center gap-2">
        <Award className="w-6 h-6" />
        Daily Challenge
      </h2>
      <div className="space-y-4">
        <p className="text-retro-light">
          <span className="text-retro-accent">{todayDate}</span>
        </p>
        <div className="space-y-2">
          <p className="text-lg text-retro-light">
            Collect {dailyTarget} items
          </p>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-4 bg-retro-secondary/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-retro-accent transition-all duration-1000"
                style={{
                  width: `${Math.min(
                    100,
                    (collectedCount / dailyTarget) * 100
                  )}%`,
                }}
              />
            </div>
            <span className="text-retro-light">
              {collectedCount}/{dailyTarget}
            </span>
          </div>
        </div>
        {isCompleted && (
          <div className="bg-retro-accent/20 border-2 border-retro-accent p-4 rounded-lg animate-pulse">
            <p className="text-retro-accent text-center">
              🎉 Challenge Completed! 🎉
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyChallenge;
