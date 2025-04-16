
import React from "react";
import { useAchievements } from "../../hooks/use-achievements";
import { Progress } from "../ui/progress";
import { Trophy } from "lucide-react";

const AchievementsList = () => {
  const { achievements, getProgress } = useAchievements();

  return (
    <div className="bg-retro-dark border-4 border-retro-primary rounded-lg p-6">
      <h2 className="text-xl text-retro-primary mb-6 flex items-center gap-2">
        <Trophy className="w-6 h-6" />
        Achievements
      </h2>
      <div className="grid gap-4">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`p-4 rounded-lg transition-all duration-300 ${
              achievement.unlocked
                ? "bg-retro-primary/20 border-2 border-retro-primary"
                : "bg-retro-secondary/10 border-2 border-dashed border-retro-secondary"
            }`}
          >
            <div className="flex items-center gap-4 mb-2">
              <span className="text-3xl">{achievement.icon}</span>
              <div>
                <h3 className="text-lg text-retro-light font-semibold">
                  {achievement.name}
                </h3>
                <p className="text-sm text-retro-gray">
                  {achievement.description}
                </p>
              </div>
            </div>
            <Progress value={getProgress(achievement.id)} className="h-2" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementsList;
