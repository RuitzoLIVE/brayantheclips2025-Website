import { useState, useMemo } from "react";
import { ClipCard } from "@/components/ClipCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import { clips } from "@/lib/clipsData";
import { Button } from "@/components/ui/button";
import { ExternalLink, Twitch } from "lucide-react";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredClips = useMemo(() => {
    if (!selectedCategory) return clips;
    return clips.filter((clip) => clip.category === selectedCategory);
  }, [selectedCategory]);

  const totalViews = clips.reduce((sum, clip) => sum + clip.views, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Twitch className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: "Poppins, sans-serif" }}>
                  brayanthecrack
                </h1>
                <p className="text-xs text-muted-foreground">Clips Gallery</p>
              </div>
            </div>
            <Button
              asChild
              variant="default"
              className="gap-2 bg-primary hover:bg-primary/90"
            >
              <a href="https://www.twitch.tv/brayanthecrack" target="_blank" rel="noopener noreferrer">
                Seguir en Twitch
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container py-12 md:py-16">
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>
            Los mejores clips de Brayan 2025
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            Descubre los momentos más graciosos, absurdos y memorables del canal de brayanthecrack. Reacciones exageradas, jugadas épicas y interacciones con la comunidad que te harán reír.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-card border border-border">
              <p className="text-sm text-muted-foreground">Total de Clips</p>
              <p className="text-2xl font-bold text-primary">{clips.length}</p>
            </div>
            <div className="p-4 rounded-lg bg-card border border-border">
              <p className="text-sm text-muted-foreground">Visualizaciones</p>
              <p className="text-2xl font-bold text-primary">{totalViews}</p>
            </div>
            <div className="p-4 rounded-lg bg-card border border-border">
              <p className="text-sm text-muted-foreground">Más Popular</p>
              <p className="text-2xl font-bold text-primary">{clips[0].views}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filter */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <CategoryFilter
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />

              {/* Stats */}
              <div className="p-4 rounded-lg bg-card border border-border space-y-3">
                <h4 className="font-semibold text-foreground">Estadísticas</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Clips mostrados:</span>
                    <span className="font-semibold text-primary">{filteredClips.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total views:</span>
                    <span className="font-semibold text-primary">
                      {filteredClips.reduce((sum, clip) => sum + clip.views, 0)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Clips Grid */}
          <div className="lg:col-span-3">
            {filteredClips.length > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-foreground">
                    {selectedCategory ? `${filteredClips.length} Clips` : "Todos los Clips"}
                  </h3>
                  <span className="text-sm text-muted-foreground">
                    Ordenados por popularidad
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredClips.map((clip) => (
                    <ClipCard key={clip.id} clip={clip} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No hay clips en esta categoría
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2026 Ruitzo Studios Media. Todos los clips pertenecen a su respectivos creadores.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.twitch.tv/brayanthecrack"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:text-primary/80 transition-colors"
              >
                Twitch
              </a>
              <a
                href="https://www.youtube.com/@brayancrackyt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:text-primary/80 transition-colors"
              >
                YouTube
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
