import { Button } from "@/components/ui/button";
import { Clip, categoryLabels } from "@/lib/clipsData";
import { ExternalLink, Eye, Clock, User } from "lucide-react";

interface ClipCardProps {
  clip: Clip;
}

export function ClipCard({ clip }: ClipCardProps) {
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      reactions: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
      absurd: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
      gameplay: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
      community: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
    };
    return colors[category] || colors.reactions;
  };

  return (
    <div className="group relative overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 hover:shadow-lg hover:border-primary/50">
      {/* Category Badge */}
      <div className="absolute top-3 right-3 z-10">
        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${getCategoryColor(clip.category)}`}>
          {categoryLabels[clip.category]}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Title */}
        <h3 className="text-lg font-bold text-foreground line-clamp-2 pr-24">
          {clip.title}
        </h3>

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Eye className="w-4 h-4 text-primary" />
            <span className="font-medium">{clip.views} views</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4 text-primary" />
            <span className="font-medium">{clip.duration}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground col-span-2">
            <User className="w-4 h-4 text-primary" />
            <span className="text-xs">Clipped by <span className="font-semibold">{clip.clipper}</span></span>
          </div>
        </div>

        {/* Additional Info */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{clip.date}</span>
          {clip.game && <span className="font-medium text-primary">{clip.game}</span>}
        </div>

        {/* View Button */}
        <Button
          asChild
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold group/btn"
        >
          <a href={clip.url} target="_blank" rel="noopener noreferrer">
            Ver en Twitch
            <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
          </a>
        </Button>
      </div>

      {/* Hover Accent Line */}
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300" />
    </div>
  );
}
