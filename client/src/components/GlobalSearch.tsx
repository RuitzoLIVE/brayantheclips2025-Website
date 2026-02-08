import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { clips } from "@/lib/clipsData";
import { instagramReels, youtubeVideos, twitchClips } from "@/lib/socialMediaData";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: "clip" | "youtube" | "instagram" | "twitch";
  url: string;
  views?: number;
  likes?: number;
}

interface GlobalSearchProps {
  onClose?: () => void;
}

export function GlobalSearch({ onClose }: GlobalSearchProps) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return [];

    const searchTerm = query.toLowerCase();
    const allResults: SearchResult[] = [];

    // Buscar en clips de Twitch (página principal)
    clips.forEach((clip) => {
      if (
        clip.title.toLowerCase().includes(searchTerm) ||
        clip.game?.toLowerCase().includes(searchTerm)
      ) {
        allResults.push({
          id: clip.id,
          title: clip.title,
          description: `${clip.game || 'Just Chatting'} • ${clip.date}`,
          type: "clip",
          url: clip.url,
          views: clip.views,
        });
      }
    });

    // Buscar en clips de Twitch (redes sociales)
    twitchClips.forEach((clip) => {
      if (
        clip.title.toLowerCase().includes(searchTerm) ||
        clip.description.toLowerCase().includes(searchTerm)
      ) {
        allResults.push({
          id: clip.id,
          title: clip.title,
          description: clip.description,
          type: "twitch",
          url: clip.url,
          views: clip.views,
        });
      }
    });

    // Buscar en videos de YouTube
    youtubeVideos.forEach((video) => {
      if (
        video.title.toLowerCase().includes(searchTerm) ||
        video.description.toLowerCase().includes(searchTerm)
      ) {
        allResults.push({
          id: video.id,
          title: video.title,
          description: video.description,
          type: "youtube",
          url: video.url,
          views: video.views,
          likes: video.likes,
        });
      }
    });

    // Buscar en reels de Instagram
    instagramReels.forEach((reel) => {
      if (
        reel.title.toLowerCase().includes(searchTerm) ||
        reel.description.toLowerCase().includes(searchTerm)
      ) {
        allResults.push({
          id: reel.id,
          title: reel.title,
          description: reel.description,
          type: "instagram",
          url: reel.url,
          likes: reel.likes,
        });
      }
    });

    return allResults.slice(0, 10); // Limitar a 10 resultados
  }, [query]);

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "clip":
        return "Clip Twitch";
      case "youtube":
        return "Video YouTube";
      case "instagram":
        return "Reel Instagram";
      case "twitch":
        return "Clip Twitch";
      default:
        return "Contenido";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "clip":
      case "twitch":
        return "bg-purple-500/10 text-purple-700 dark:text-purple-400";
      case "youtube":
        return "bg-red-500/10 text-red-700 dark:text-red-400";
      case "instagram":
        return "bg-pink-500/10 text-pink-700 dark:text-pink-400";
      default:
        return "bg-gray-500/10 text-gray-700 dark:text-gray-400";
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Search Input */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Busca clips, videos, reels..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-10 py-2"
          autoFocus
        />
        {query && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1"
            onClick={() => setQuery("")}
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Results */}
      {query.trim() && (
        <div className="space-y-2">
          {results.length > 0 ? (
            <>
              <p className="text-sm text-muted-foreground mb-4">
                Se encontraron <span className="font-semibold">{results.length}</span> resultados
              </p>
              {results.map((result) => (
                <a
                  key={`${result.type}-${result.id}`}
                  href={result.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-card/50 transition-all duration-200"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-semibold px-2 py-1 rounded ${getTypeColor(result.type)}`}>
                          {getTypeLabel(result.type)}
                        </span>
                      </div>
                      <h3 className="font-semibold text-foreground line-clamp-2 mb-1">
                        {result.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {result.description}
                      </p>
                      {(result.views || result.likes) && (
                        <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                          {result.views && <span>👁️ {result.views} vistas</span>}
                          {result.likes && <span>❤️ {result.likes} likes</span>}
                        </div>
                      )}
                    </div>
                  </div>
                </a>
              ))}
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No se encontraron resultados para "{query}"</p>
            </div>
          )}
        </div>
      )}

      {!query.trim() && (
        <div className="text-center py-8 text-muted-foreground">
          <p>Comienza a escribir para buscar clips, videos y reels</p>
        </div>
      )}
    </div>
  );
}
