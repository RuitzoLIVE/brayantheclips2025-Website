import { Button } from "@/components/ui/button";
import { InstagramReelCard } from "@/components/InstagramReelCard";
import { YouTubeVideoCard } from "@/components/YouTubeVideoCard";
import { instagramReels, youtubeVideos } from "@/lib/socialMediaData";
import { Link } from "wouter";
import { ArrowLeft, Instagram, Youtube } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function SocialMedia() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="icon" className="hover:bg-secondary">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-foreground">Redes Sociales</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-12">
        {/* Instagram Reels Section */}
        <section className="mb-16">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Instagram className="w-8 h-8 text-pink-500" />
              <h2 className="text-3xl font-bold text-foreground">Instagram Reels</h2>
            </div>
            <p className="text-muted-foreground">
              Los mejores reels de <span className="font-semibold text-primary">@ruitzolive</span> y <span className="font-semibold text-primary">@brayanthecrack_</span>
            </p>
          </div>

          {/* Reels Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {instagramReels.map((reel) => (
              <InstagramReelCard key={reel.id} reel={reel} />
            ))}
          </div>

          {/* Empty State */}
          {instagramReels.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No hay reels disponibles en este momento.</p>
            </div>
          )}
        </section>

        {/* Divider */}
        <div className="my-16 border-t border-border/50" />

        {/* YouTube Videos Section */}
        <section>
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Youtube className="w-8 h-8 text-red-500" />
              <h2 className="text-3xl font-bold text-foreground">Videos de YouTube</h2>
            </div>
            <p className="text-muted-foreground">
              Clips y videos de <span className="font-semibold text-primary">@RuitzoLIVE</span> y <span className="font-semibold text-primary">@RuitClips</span>
            </p>
          </div>

          {/* Videos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {youtubeVideos.map((video) => (
              <YouTubeVideoCard key={video.id} video={video} />
            ))}
          </div>

          {/* Empty State */}
          {youtubeVideos.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No hay videos disponibles en este momento.</p>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/50 backdrop-blur-sm mt-16">
        <div className="container py-8">
          <p className="text-sm text-muted-foreground">
            © 2026 Ruitzo Studios Media. Canal: <span className="font-semibold text-primary">@brayanthecrack</span>. Todos los clips pertenecen a su respectivos creadores.
          </p>
          <div className="flex items-center gap-4 mt-4">
            <a
              href="https://www.twitch.tv/brayanthecrack"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Twitch
            </a>
            <a
              href="https://www.youtube.com/@brayancrackyt"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              YouTube
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
