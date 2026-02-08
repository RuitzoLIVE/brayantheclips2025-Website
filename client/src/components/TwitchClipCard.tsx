import { Button } from "@/components/ui/button";
import { TwitchClip } from "@/lib/socialMediaData";
import { ExternalLink, Eye, Clock, Twitch } from "lucide-react";

interface TwitchClipCardProps {
  clip: TwitchClip;
}

export function TwitchClipCard({ clip }: TwitchClipCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 hover:shadow-lg hover:border-primary/50">
      {/* Twitch Badge */}
      <div className="absolute top-3 right-3 z-10">
        <div className="flex items-center gap-2 rounded-full px-3 py-1 bg-purple-600 text-white text-xs font-semibold">
          <Twitch className="w-3 h-3" />
          {clip.channel}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Title */}
        <h3 className="text-lg font-bold text-foreground line-clamp-2">
          {clip.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground">
          {clip.description}
        </p>

        {/* Metadata Grid */}
        <div className="grid grid-cols-3 gap-3 text-sm py-3 border-y border-border/50">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Eye className="w-4 h-4 text-purple-500" />
            </div>
            <p className="font-semibold text-foreground">{clip.views}</p>
            <p className="text-xs text-muted-foreground">Vistas</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Clock className="w-4 h-4 text-yellow-500" />
            </div>
            <p className="font-semibold text-foreground">{clip.duration}</p>
            <p className="text-xs text-muted-foreground">Duración</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground">{clip.date}</p>
          </div>
        </div>

        {/* View Button */}
        <Button
          asChild
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold group/btn"
        >
          <a href={clip.url} target="_blank" rel="noopener noreferrer">
            Ver en Twitch
            <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
          </a>
        </Button>
      </div>

      {/* Hover Accent Line */}
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-purple-600 to-purple-700 group-hover:w-full transition-all duration-300" />
    </div>
  );
}
