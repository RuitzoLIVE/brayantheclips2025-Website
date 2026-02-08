interface YouTubeEmbedProps {
  videoId: string;
  width?: string;
  height?: string;
  title?: string;
}

export function YouTubeEmbed({ videoId, width = "100%", height = "400", title = "YouTube video" }: YouTubeEmbedProps) {
  return (
    <div className="w-full" style={{ aspectRatio: "16 / 9" }}>
      <iframe
        width={width}
        height={height}
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="w-full h-full rounded-lg"
      />
    </div>
  );
}
