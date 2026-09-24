import { useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import './VideoPlayer.css';

interface VideoPlayerProps {
  src: string;
  poster: string;
  /** Proporción del video, ej. "16 / 9" o "21 / 9". */
  aspectRatio?: string;
  label?: string;
}

/**
 * Video con portada y botón de play visible.
 * El <video> está siempre montado y se llama a play() directo dentro del click,
 * que es lo que los navegadores (sobre todo Safari / iOS) exigen para dejar reproducir.
 */
export default function VideoPlayer({
  src,
  poster,
  aspectRatio = '16 / 9',
  label = 'Reproducir video',
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [failed, setFailed] = useState(false);

  const handlePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    setStarted(true);
    video.play().catch(() => {
      // Si el navegador no lo deja arrancar solo, quedan los controles nativos para darle play.
    });
  };

  return (
    <div className="video-player" style={{ '--video-ratio': aspectRatio } as CSSProperties}>
      <video
        ref={videoRef}
        className="video-player__video"
        src={src}
        poster={poster}
        controls={started}
        playsInline
        preload="metadata"
        onPlay={() => setStarted(true)}
        onEnded={() => setStarted(false)}
        onError={() => setFailed(true)}
      />

      {!started && !failed && (
        <button type="button" className="video-player__play" aria-label={label} onClick={handlePlay}>
          <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M8 5.14v13.72a1 1 0 0 0 1.52.85l11-6.86a1 1 0 0 0 0-1.7l-11-6.86A1 1 0 0 0 8 5.14z" />
          </svg>
        </button>
      )}

      {failed && <p className="video-player__error">No pudimos cargar el video. Probá de nuevo en un rato.</p>}
    </div>
  );
}
