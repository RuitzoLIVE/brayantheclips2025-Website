import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, ExternalLink, Link as LinkIcon } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Links() {
  const links = [
    {
      id: 1,
      title: "Brayan The Crack",
      url: "https://guns.lol/brayanthecrack",
      description: "Perfil de Brayan en guns.lol - Acceso directo a todos sus enlaces y redes sociales",
      icon: "🎮",
      color: "from-purple-500 to-pink-500",
    },
    {
      id: 2,
      title: "Ruitzo Live",
      url: "https://guns.lol/ruitzolive",
      description: "Perfil de Ruitzo en guns.lol - Todos los enlaces y contenido del streamer",
      icon: "🎬",
      color: "from-blue-500 to-cyan-500",
    },
  ];

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
            <h1 className="text-2xl font-bold text-foreground">Enlaces de Referencia</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-12">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4">Acceso Rápido a Redes Sociales</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Encuentra todos los enlaces directos a las redes sociales y perfiles de Brayan y Ruitzo
          </p>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {links.map((link) => (
            <div
              key={link.id}
              className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:shadow-xl hover:border-primary/50 p-8"
            >
              {/* Background Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${link.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
              />

              {/* Content */}
              <div className="relative z-10 space-y-4">
                {/* Icon and Title */}
                <div className="flex items-start gap-4">
                  <span className="text-5xl">{link.icon}</span>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">{link.title}</h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {link.description}
                </p>

                {/* URL Preview */}
                <div className="bg-muted/50 rounded-lg p-3 border border-border/50">
                  <p className="text-xs text-muted-foreground truncate font-mono">
                    {link.url}
                  </p>
                </div>

                {/* Button */}
                <Button
                  asChild
                  className={`w-full bg-gradient-to-r ${link.color} hover:shadow-lg text-white font-semibold group/btn`}
                >
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    Visitar Perfil
                    <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </div>

              {/* Hover Accent */}
              <div
                className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${link.color} group-hover:w-full transition-all duration-300`}
              />
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 bg-card border border-border/50 rounded-lg p-8 max-w-4xl mx-auto">
          <div className="flex items-start gap-4">
            <LinkIcon className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">¿Qué es guns.lol?</h3>
              <p className="text-muted-foreground">
                guns.lol es una plataforma de acortamiento de enlaces que permite crear perfiles personalizados con todos tus enlaces en un solo lugar. Es perfecta para streamers y creadores de contenido que quieren centralizar sus redes sociales y otros enlaces importantes.
              </p>
            </div>
          </div>
        </div>
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
            <a
              href="https://guns.lol/brayanthecrack"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              guns.lol
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
