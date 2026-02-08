import { useEffect, useRef } from "react";

interface InstagramEmbedProps {
  url: string;
  width?: string;
}

export function InstagramEmbed({ url, width = "100%" }: InstagramEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Cargar el script de Instagram si no está presente
    if (!window.instgrm) {
      const script = document.createElement("script");
      script.src = "//www.instagram.com/embed.js";
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        if (window.instgrm && containerRef.current) {
          window.instgrm.Embed.process(containerRef.current);
        }
      };
    } else if (window.instgrm && containerRef.current) {
      window.instgrm.Embed.process(containerRef.current);
    }
  }, [url]);

  return (
    <div ref={containerRef} className="w-full flex justify-center">
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={url}
        data-instgrm-version="14"
        style={{
          background: "#FFF",
          border: "0",
          borderRadius: "3px",
          boxShadow: "0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)",
          margin: "1px",
          maxWidth: width === "100%" ? "540px" : width,
          minWidth: "326px",
          padding: "0",
          width: width,
        }}
      />
    </div>
  );
}

// Extend window to include instgrm
declare global {
  interface Window {
    instgrm?: {
      Embed: {
        process: (element?: HTMLElement) => void;
      };
    };
  }
}
