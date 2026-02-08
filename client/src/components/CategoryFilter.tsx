import { Button } from "@/components/ui/button";
import { categoryLabels, categoryDescriptions } from "@/lib/clipsData";
import { Zap, Sparkles, Gamepad2, MessageCircle, Trophy, Laugh } from "lucide-react";

interface CategoryFilterProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {


  const allCategories = [
    { id: "reactions", icon: Zap },
    { id: "absurd", icon: Sparkles },
    { id: "gameplay", icon: Gamepad2 },
    { id: "community", icon: MessageCircle },
    { id: "epic", icon: Trophy },
    { id: "dark_humor", icon: Laugh },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">Filtrar por Categoría</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {/* All Button */}
          <Button
            onClick={() => onCategoryChange(null)}
            variant={selectedCategory === null ? "default" : "outline"}
            className="h-auto flex flex-col items-center justify-center py-3 gap-1 transition-all"
          >
            <span className="text-lg">🎬</span>
            <span className="text-xs font-medium">Todos</span>
          </Button>

          {/* Category Buttons */}
          {allCategories.map(({ id, icon: Icon }) => (
            <Button
              key={id}
              onClick={() => onCategoryChange(id)}
              variant={selectedCategory === id ? "default" : "outline"}
              className="h-auto flex flex-col items-center justify-center py-3 gap-1 transition-all"
              title={categoryDescriptions[id]}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{categoryLabels[id].split(" ")[0]}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Category Description */}
      {selectedCategory && (
        <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
          <p className="text-sm text-foreground">
            <span className="font-semibold">{categoryLabels[selectedCategory]}:</span> {categoryDescriptions[selectedCategory]}
          </p>
        </div>
      )}
    </div>
  );
}
