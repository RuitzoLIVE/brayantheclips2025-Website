import { clips } from "@/lib/clipsData";
import { youtubeVideos } from "@/lib/socialMediaData";
import { twitchClips } from "@/lib/socialMediaData";
import { Eye, TrendingUp, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TrendingItem {
  id: string;
  title: string;
  views: number;
  platform: "twitch" | "youtube" | "instagram";
  url: string;
  thumbnail?: string;
  rank: number;
}

export function TrendingSection() {
  // Combinar todos los contenidos y ordenar por vistas
  const allContent: TrendingItem[] = [
    ...clips.map((clip) => ({
      id: clip.id,
      title: clip.title,
      views: clip.views,
      platform: "twitch" as const,
      url: clip.url,
      rank: 0,
    })),
    ...youtubeVideos.map((video) => ({
      id: video.id,
      title: video.title,
      views: video.views,
      platform: "youtube" as const,
      url: video.url,
      rank: 0,
    })),
    ...twitchClips.map((clip) => ({
      id: clip.id,
      title: clip.title,
      views: clip.views,
      platform: "twitch" as const,
      url: clip.url,
      rank: 0,
    })),
  ];

  // Ordenar por vistas y asignar ranking
  const trending = allContent
    .sort((a, b) => b.views - a.views)
    .slice(0, 5)
    .map((item, index) => ({
      ...item,
      rank: index + 1,
    }));

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "twitch":
        return "from-purple-600 to-purple-800";
      case "youtube":
        return "from-red-600 to-red-800";
      case "instagram":
        return "from-pink-600 to-purple-600";
      default:
        return "from-blue-600 to-blue-800";
    }
  };

  const getPlatformLabel = (platform: string) => {
    return platform.charAt(0).toUpperCase() + platform.slice(1);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-background via-background to-primary/5">
      <div className="container">
        {/* Header */}
        <div className="flex items-center gap-3 mb-12">
          <div className="p-3 rounded-lg bg-gradient-to-br from-primary to-accent">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-foreground">Tendencias</h2>
            <p className="text-sm text-muted-foreground">
              Los videos más populares del sitio
            </p>
          </div>
        </div>

        {/* Trending Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {trending.map((item) => (
            <div
              key={`${item.platform}-${item.id}`}
              className="group relative overflow-hidden rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
            >
              {/* Rank Badge */}
              <div
                className={`absolute top-2 left-2 z-10 w-10 h-10 rounded-full bg-gradient-to-br ${getPlatformColor(
                  item.platform
                )} flex items-center justify-center text-white font-bold text-lg shadow-lg`}
              >
                #{item.rank}
              </div>

              {/* Platform Badge */}
              <div className="absolute top-2 right-2 z-10">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-primary/90 text-white">
                  {getPlatformLabel(item.platform)}
                </span>
              </div>

              {/* Content */}
              <div className="p-4 h-full flex flex-col justify-between">
                {/* Title */}
                <div className="mb-4">
                  <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                </div>

                {/* Stats */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Eye className="w-4 h-4 text-primary" />
                    <span className="font-medium">
                      {item.views.toLocaleString()} vistas
                    </span>
                  </div>

                  {/* View Button */}
                  <Button
                    asChild
                    variant="default"
                    size="sm"
                    className="w-full gap-2 bg-primary hover:bg-primary/90"
                  >
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Play className="w-4 h-4" />
                      Ver
                    </a>
                  </Button>
                </div>
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Info Box */}
        <div className="mt-12 p-6 rounded-lg border border-primary/20 bg-primary/5">
          <p className="text-sm text-muted-foreground text-center">
            <span className="font-semibold text-foreground">
              {trending.length} contenidos destacados
            </span>
            {" "}de {allContent.length} en total. Estos son los videos más vistos en
            el sitio.
          </p>
        </div>
      </div>
    </section>
  );
}
