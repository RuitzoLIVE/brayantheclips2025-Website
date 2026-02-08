import { Button } from "@/components/ui/button";
import { YouTubeVideo } from "@/lib/socialMediaData";
import { ExternalLink, Eye, Clock, Youtube } from "lucide-react";

interface YouTubeVideoCardProps {
  video: YouTubeVideo;
}

export function YouTubeVideoCard({ video }: YouTubeVideoCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 hover:shadow-lg hover:border-primary/50">
      {/* YouTube Badge */}
      <div className="absolute top-3 right-3 z-10">
        <div className="flex items-center gap-2 rounded-full px-3 py-1 bg-red-500 text-white text-xs font-semibold">
          <Youtube className="w-3 h-3" />
          {video.channel}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Title */}
        <h3 className="text-lg font-bold text-foreground line-clamp-2">
          {video.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground">
          {video.description}
        </p>

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Eye className="w-4 h-4 text-red-500" />
            <span className="font-medium">{video.views > 0 ? `${video.views} views` : "N/A"}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4 text-red-500" />
            <span className="font-medium">{video.duration}</span>
          </div>
        </div>

        {/* Additional Info */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{video.date}</span>
        </div>

        {/* View Button */}
        <Button
          asChild
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold group/btn"
        >
          <a href={video.url} target="_blank" rel="noopener noreferrer">
            Ver en YouTube
            <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
          </a>
        </Button>
      </div>

      {/* Hover Accent Line */}
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-red-500 to-red-600 group-hover:w-full transition-all duration-300" />
    </div>
  );
}
