import { useEffect, useState } from "react";
import {
  DISQUS_EMBED_SCRIPT_ID,
  DISQUS_PAGE_URL,
  DISQUS_SHORTNAME,
  createDisqusConfig,
  getDisqusEmbedUrl,
} from "@shared/disqus";

interface DisqusCommentsProps {
  identifier?: string;
  title?: string;
  url?: string;
}

type DisqusStatus = "loading" | "ready" | "error";

type DisqusRuntime = typeof window & {
  disqus_config?: () => void;
  DISQUS?: {
    reset: (options: { reload: boolean; config: () => void }) => void;
  };
};

/**
 * Ejecuta el Universal Code oficial de Disqus dentro de un bloque HTML5 semántico.
 * El shortname identifica el foro y no es una credencial secreta.
 */
export function DisqusComments({
  identifier = "brayantheclips2025-home",
  title = "Los mejores clips de Brayan 2025",
  url = DISQUS_PAGE_URL,
}: DisqusCommentsProps) {
  const [status, setStatus] = useState<DisqusStatus>("loading");

  useEffect(() => {
    const thread = document.getElementById("disqus_thread");
    if (!thread) return;

    const runtime = window as DisqusRuntime;
    const disqusConfig = createDisqusConfig({ identifier, title, url });
    runtime.disqus_config = disqusConfig;
    thread.innerHTML = "";
    setStatus("loading");

    let verificationTimeoutId: number | undefined;
    let verificationIntervalId: number | undefined;
    let resetRequested = false;

    const clearVerification = () => {
      if (verificationTimeoutId !== undefined) {
        window.clearTimeout(verificationTimeoutId);
      }
      if (verificationIntervalId !== undefined) {
        window.clearInterval(verificationIntervalId);
      }
    };

    const requestDisqusReset = () => {
      if (resetRequested || !runtime.DISQUS) return;
      resetRequested = true;
      try {
        runtime.DISQUS.reset({ reload: true, config: disqusConfig });
      } catch {
        resetRequested = false;
      }
    };

    const verifyWidget = () => {
      requestDisqusReset();
      const hasRenderedWidget = Boolean(
        thread.querySelector("iframe, .disqus-post, .disqus-comment-count"),
      );
      if (hasRenderedWidget) {
        clearVerification();
        setStatus("ready");
      }
      return hasRenderedWidget;
    };

    const startVerification = () => {
      clearVerification();
      if (verifyWidget()) return;

      verificationIntervalId = window.setInterval(verifyWidget, 250);
      verificationTimeoutId = window.setTimeout(() => {
        if (!verifyWidget()) {
          clearVerification();
          setStatus("error");
        }
      }, 15000);
    };

    const existingScript = document.getElementById(DISQUS_EMBED_SCRIPT_ID);
    if (existingScript && runtime.DISQUS) {
      requestDisqusReset();
      startVerification();
      return () => {
        clearVerification();
        delete runtime.disqus_config;
      };
    }

    existingScript?.remove();

    const script = document.createElement("script");
    script.id = DISQUS_EMBED_SCRIPT_ID;
    script.src = getDisqusEmbedUrl(DISQUS_SHORTNAME);
    script.async = true;
    script.setAttribute("data-timestamp", String(Date.now()));
    script.onload = startVerification;
    script.onerror = () => {
      clearVerification();
      setStatus("error");
    };
    document.body.appendChild(script);
    startVerification();

    return () => {
      clearVerification();
      script.remove();
      delete runtime.disqus_config;
    };
  }, [identifier, title, url]);

  return (
    <section
      id="community"
      className="container pb-16"
      aria-labelledby="comments-heading"
    >
      <article className="disqus-compatible-colors rounded-xl border border-border bg-card p-6 shadow-sm md:p-8">
        <header className="mb-6">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Comunidad
          </p>
          <h2 id="comments-heading" className="text-2xl font-bold text-foreground">
            Comenta sobre tus clips favoritos
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Inicia sesión en Disqus para compartir tu reacción y conversar con otros visitantes.
          </p>
        </header>

        <div
          id="disqus-frame-container"
          className="relative overflow-hidden rounded-lg border border-border bg-background"
          role="region"
          aria-label="Comentarios de Disqus"
          aria-busy={status === "loading"}
        >
          {status === "loading" && (
            <p
              className="absolute inset-x-0 top-0 z-10 border-b border-border bg-background/95 p-4 text-center text-sm text-muted-foreground"
              role="status"
              aria-live="polite"
            >
              Cargando comentarios…
            </p>
          )}

          <div id="disqus_thread" className="min-h-[520px] w-full" />
        </div>

        {status === "error" && (
          <aside
            className="mt-4 rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground"
            role="alert"
          >
            <p>
              Disqus no terminó de cargar el panel de comentarios. Comprueba que el foro
              <strong className="mx-1 text-foreground">{DISQUS_SHORTNAME}</strong>
              esté activo y que este dominio esté autorizado en Trusted Domains.
            </p>
            <a
              className="mt-3 inline-flex font-semibold text-primary underline underline-offset-4"
              href={`https://${DISQUS_SHORTNAME}.disqus.com/`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Abrir el foro en Disqus
            </a>
          </aside>
        )}

        <footer className="mt-4 text-xs text-muted-foreground">
          Comentarios administrados por Disqus. Universal Code usa la URL canónica publicada para conservar el hilo.
        </footer>

        <noscript>
          Activa JavaScript para consultar los comentarios administrados por Disqus.
        </noscript>
      </article>
    </section>
  );
}

export default DisqusComments;
