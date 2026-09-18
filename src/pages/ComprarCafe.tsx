import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import cafeImg from '../assets/images/cafe-hero.jpg';
import cafeteraImg from '../assets/images/products/cafetera-italiana.jpg';
import { getProductsByCategory } from '../data/products';
import ProductGrid from '../components/ProductGrid';
import Footer from '../components/Footer';
import './ComprarCafe.css';

const VIDEO_SRC = '/videos/cafe.mp4';

export default function ComprarCafe() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const cafes = getProductsByCategory('cafe');

  const handlePlay = () => {
    setPlaying(true);
    requestAnimationFrame(() => videoRef.current?.play().catch(() => {}));
  };

  return (
    <main className="comprar-cafe">
      <ProductGrid products={cafes} columns={5} />

      <div className="comprar-cafe__banner">
        {playing ? (
          <video ref={videoRef} src={VIDEO_SRC} poster={cafeImg} controls playsInline />
        ) : (
          <>
            <img src={cafeImg} alt="Café de especialidad Strati" loading="lazy" />
            <button type="button" className="comprar-cafe__play" aria-label="Reproducir video" onClick={handlePlay}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M8 5v14l11-7-11-7Z" fill="currentColor" />
              </svg>
            </button>
          </>
        )}
      </div>

      <section className="comprar-cafe__promo">
        <h2>Nueva Cafetera</h2>
        <div className="comprar-cafe__promo-body">
          <img src={cafeteraImg} alt="Cafetera Italiana Strati" />
          <div className="comprar-cafe__promo-text">
            <p>
              La clásica cafetera moka en edición Strati: aluminio resistente, apta para todo tipo de cocinas y
              disponible en 3 colores.
            </p>
            <Link to="/producto/cafetera-italiana" className="comprar-cafe__promo-cta">
              Comprar ahora
            </Link>
          </div>
        </div>
      </section>

      <ProductGrid products={cafes} columns={5} />

      <Footer />
    </main>
  );
}
