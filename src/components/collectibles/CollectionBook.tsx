
import React from "react";
import { useCollectibles } from "../../hooks/use-collectibles";
import { ScrollArea } from "../ui/scroll-area";
import { Book } from "lucide-react";

const collectibleLore: Record<string, string> = {
  mushroom: "A mysterious fungus that grants extraordinary powers. First discovered in the Mushroom Kingdom.",
  coin: "The standard currency across many gaming realms. Some say it makes a distinctive 'pling' sound.",
  star: "A celestial power-up that grants temporary invincibility. Handle with care!",
  cherry: "A fruit with mysterious properties. Known to create exact duplicates of its consumer.",
  key: "An ancient artifact that unlocks more than just doors - it might unlock secrets of the gaming universe.",
  gem: "A powerful crystal containing pure chaos energy. Essential for powering advanced machinery.",
  sword: "A legendary blade that seals darkness. Only true heroes can wield its power.",
  ring: "Golden rings that serve as both protection and power. Collecting 100 grants an extra life!",
  fist: "The symbol of a warrior's spirit. Masters say it can break through any obstacle.",
  banana: "A favorite among adventurous primates. More than just a tasty treat - it's a valuable collectible.",
  block: "A fundamental building block of the gaming universe. Exists in many shapes and colors.",
  pokeball: "A sophisticated device for catching and storing pocket monsters. Technology beyond its time.",
  materia: "Crystallized knowledge of the ancients. Grants magical abilities to its users.",
  potion: "A mysterious liquid that restores health. The recipe remains a closely guarded secret."
};

const CollectionBook = () => {
  const { collectibles } = useCollectibles();

  return (
    <div className="bg-retro-dark border-4 border-retro-primary rounded-lg p-6">
      <h2 className="text-xl text-retro-primary mb-6 flex items-center gap-2">
        <Book className="w-6 h-6" />
        Collection Book
      </h2>
      <ScrollArea className="h-[400px] rounded-md border border-retro-secondary p-4">
        <div className="space-y-6">
          {collectibles.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-lg transition-all duration-300 ${
                item.found
                  ? "bg-retro-primary/20"
                  : "bg-retro-secondary/10"
              }`}
            >
              <div className="flex items-center gap-4 mb-2">
                <span className="text-4xl">{item.found ? item.icon : "?"}</span>
                <div>
                  <h3 className="text-lg text-retro-light font-semibold">
                    {item.found ? item.name : "???"}
                  </h3>
                  <p className="text-sm text-retro-gray">
                    Found in: {item.found ? item.location : "???"}
                  </p>
                </div>
              </div>
              {item.found && (
                <p className="text-retro-light text-sm mt-2 animate-fade-in">
                  {collectibleLore[item.id]}
                </p>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default CollectionBook;
