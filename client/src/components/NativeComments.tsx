import React, { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Button } from "@/components/ui/button";
import { MessageSquare, Send, User, Clock } from "lucide-react";

/**
 * Sistema nativo de comentarios de la comunidad con HTML5 semántico
 * y diseño limpio sin bordes visibles.
 */
export function NativeComments() {
  const { isAuthenticated, user } = useAuth();
  const [content, setContent] = useState("");
  const utils = trpc.useUtils();

  const {
    data: comments = [],
    isLoading,
    isError: isListError,
    refetch: refetchComments,
  } = trpc.comments.list.useQuery();

  const createComment = trpc.comments.create.useMutation({
    onSuccess: () => {
      setContent("");
      utils.comments.list.invalidate();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    createComment.mutate({ content });
  };

  return (
    <section
      id="community"
      className="container pb-16"
      aria-labelledby="comments-heading"
    >
      <article className="rounded-2xl bg-card/60 p-6 md:p-10 shadow-none backdrop-blur-sm transition-all">
        <header className="mb-8">
          <div className="flex items-center gap-2 text-primary mb-2">
            <MessageSquare className="w-5 h-5" />
            <span className="text-xs font-semibold uppercase tracking-wider">
              Comunidad
            </span>
          </div>
          <h2 id="comments-heading" className="text-2xl md:text-3xl font-bold text-foreground">
            Comenta sobre tus clips favoritos
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Comparte tu reacción, opina sobre los clips y conversa con otros visitantes de la plataforma.
          </p>
        </header>

        {/* Formulario de comentario */}
        <div className="mb-10">
          {isAuthenticated ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  {user?.name?.[0]?.toUpperCase() || "U"}
                </div>
                <span>Comentando como <strong className="text-foreground">{user?.name || "Usuario"}</strong></span>
              </div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Escribe tu comentario aquí..."
                rows={3}
                className="w-full resize-none rounded-xl bg-background/80 p-4 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all border-0 shadow-sm"
                maxLength={1000}
                required
              />
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={createComment.isPending || !content.trim()}
                  className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-5 py-2 shadow-sm font-medium transition-transform active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  {createComment.isPending ? "Publicando..." : "Publicar comentario"}
                </Button>
              </div>
              {createComment.isError && (
                <div
                  role="alert"
                  aria-live="polite"
                  className="flex flex-wrap items-center justify-end gap-3 text-sm text-destructive"
                >
                  <span>No se pudo publicar el comentario. Inténtalo de nuevo.</span>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => createComment.mutate({ content: content.trim() })}
                    disabled={createComment.isPending || !content.trim()}
                    className="text-primary hover:bg-primary/10"
                  >
                    Reintentar publicación
                  </Button>
                </div>
              )}
            </form>
          ) : (
            <div className="rounded-2xl bg-primary/5 p-6 text-center space-y-3">
              <p className="text-sm text-foreground font-medium">
                Inicia sesión para unirte a la conversación de la comunidad
              </p>
              <Button
                asChild
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-6 py-2 shadow-sm font-medium"
              >
                <a href={getLoginUrl()}>Iniciar sesión</a>
              </Button>
            </div>
          )}
        </div>

        {/* Lista de comentarios */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            Comentarios recientes ({comments.length})
          </h3>

          {isLoading ? (
            <div className="py-12 text-center text-sm text-muted-foreground">
              Cargando comentarios...
            </div>
          ) : isListError ? (
            <div className="py-12 text-center space-y-3">
              <p role="alert" aria-live="polite" className="text-sm text-destructive">
                No se pudieron cargar los comentarios en este momento.
              </p>
              <Button
                type="button"
                variant="ghost"
                onClick={() => refetchComments()}
                className="text-primary hover:bg-primary/10"
              >
                Reintentar
              </Button>
            </div>
          ) : comments.length === 0 ? (
            <div className="py-12 text-center text-sm text-muted-foreground">
              Sé el primero en dejar un comentario sobre los clips de Brayan.
            </div>
          ) : (
            comments.map((comment) => {
              const dateObj = new Date(comment.createdAt);
              const formattedDate = isNaN(dateObj.getTime())
                ? "Reciente"
                : dateObj.toLocaleDateString("es-ES", {
                    day: "numeric",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  });

              return (
                <article
                  key={comment.id}
                  className="group rounded-2xl bg-background/50 p-5 transition-all hover:bg-background/80"
                >
                  <header className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-xs">
                        {comment.userName?.[0]?.toUpperCase() || <User className="w-4 h-4" />}
                      </div>
                      <span className="font-semibold text-sm text-foreground">
                        {comment.userName}
                      </span>
                    </div>
                    <time className="flex items-center gap-1 text-xs text-muted-foreground/80">
                      <Clock className="w-3 h-3" />
                      {formattedDate}
                    </time>
                  </header>
                  <div className="pl-10">
                    <p className="text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed">
                      {comment.content}
                    </p>
                  </div>
                </article>
              );
            })
          )}
        </div>

        <footer className="mt-8 pt-4 text-center text-xs text-muted-foreground/70">
          Comentarios nativos de la comunidad de BrayantheClips 2025.
        </footer>
      </article>
    </section>
  );
}

export default NativeComments;
