import { useEffect, useRef } from "react";

interface TwitchEmbedProps {
  clipId: string;
  width?: string;
  height?: string;
}

export function TwitchEmbed({ clipId, width = "100%", height = "400" }: TwitchEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Cargar el script de Twitch si no está presente
    if (!window.twitchEmbed) {
      const script = document.createElement("script");
      script.src = "https://embed.twitch.tv/embed.js";
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        if (window.twitchEmbed && containerRef.current) {
          window.twitchEmbed.lib.embed.createEmbed({
            target: containerRef.current,
            layout: "video",
            clip: clipId,
            width: width === "100%" ? containerRef.current.offsetWidth : width,
            height: height,
          });
        }
      };
    } else if (window.twitchEmbed && containerRef.current) {
      window.twitchEmbed.lib.embed.createEmbed({
        target: containerRef.current,
        layout: "video",
        clip: clipId,
        width: width === "100%" ? containerRef.current.offsetWidth : width,
        height: height,
      });
    }
  }, [clipId, width, height]);

  return <div ref={containerRef} className="w-full" />;
}

// Extend window to include twitchEmbed
declare global {
  interface Window {
    twitchEmbed?: {
      lib: {
        embed: {
          createEmbed: (options: any) => void;
        };
      };
    };
  }
}
