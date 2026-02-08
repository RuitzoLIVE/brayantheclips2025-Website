import { Button } from "@/components/ui/button";
import { InstagramReel } from "@/lib/socialMediaData";
import { ExternalLink, Heart, Instagram } from "lucide-react";

interface InstagramReelCardProps {
  reel: InstagramReel;
}

export function InstagramReelCard({ reel }: InstagramReelCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 hover:shadow-lg hover:border-primary/50">
      {/* Instagram Badge */}
      <div className="absolute top-3 right-3 z-10">
        <div className="flex items-center gap-2 rounded-full px-3 py-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-semibold">
          <Instagram className="w-3 h-3" />
          {reel.account}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Title */}
        <h3 className="text-lg font-bold text-foreground line-clamp-2">
          {reel.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground">
          {reel.description}
        </p>

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
            <span className="font-medium">{reel.likes} likes</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="text-xs">{reel.date}</span>
          </div>
        </div>

        {/* View Button */}
        <Button
          asChild
          className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold group/btn"
        >
          <a href={reel.url} target="_blank" rel="noopener noreferrer">
            Ver en Instagram
            <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
          </a>
        </Button>
      </div>

      {/* Hover Accent Line */}
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-pink-500 to-purple-500 group-hover:w-full transition-all duration-300" />
    </div>
  );
}
