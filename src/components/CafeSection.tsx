import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import cafeImg from '../assets/images/cafe-hero.jpg';
import './CafeSection.css';

// Put the real video file at:  public/videos/cafe.mp4
// (served as-is by Vite; see the README for details). Until that file
// exists, pressing play will just show a browser video error.
const VIDEO_SRC = '/videos/cafe.mp4';

export default function CafeSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    setPlaying(true);
    requestAnimationFrame(() => {
      videoRef.current?.play().catch(() => {
        /* autoplay blocked or file missing — controls are still shown */
      });
    });
  };

  return (
    <section className="cafe" id="cafe">
      <div className="cafe__panel">
        <h2 className="cafe__title">Café</h2>

        <div className="cafe__media">
          {playing ? (
            <video ref={videoRef} className="cafe__video" src={VIDEO_SRC} poster={cafeImg} controls playsInline />
          ) : (
            <>
              <img src={cafeImg} alt="Café de especialidad Strati" loading="lazy" />
              <button type="button" className="cafe__play" aria-label="Reproducir video" onClick={handlePlay}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M8 5v14l11-7-11-7Z" fill="currentColor" />
                </svg>
              </button>
            </>
          )}
        </div>

        <Link to="/comprar-cafe" className="cafe__cta">
          Comprar ahora
        </Link>
      </div>
    </section>
  );
}
