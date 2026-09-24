import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import pistachoImg from '../assets/images/sabor-pistacho.jpg';
import merchImg from '../assets/images/merch.jpg';
import './HeroCarousel.css';

interface Slide {
  id: string;
  image: string;
  alt: string;
  badge?: string;
  ctaLabel: string;
  ctaTo: string;
  ctaPosition: 'bottom-right' | 'center-left';
}

const SLIDES: Slide[] = [
  {
    id: 'tiramisu-pistacho',
    image: pistachoImg,
    alt: 'Tiramisú de pistacho Strati',
    badge: '¡Nuevo Tiramisú de Pistachio!',
    ctaLabel: 'Comprar ahora',
    ctaTo: '/producto/pistacho',
    ctaPosition: 'bottom-right',
  },
  {
    id: 'merch',
    image: merchImg,
    alt: 'Colección de merchandising Strati',
    ctaLabel: 'Comprar ahora',
    ctaTo: '/comprar-merch',
    ctaPosition: 'center-left',
  },
];

const AUTOPLAY_MS = 5000;

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((next: number) => {
    setIndex(((next % SLIDES.length) + SLIDES.length) % SLIDES.length);
  }, []);


  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setIndex((current) => (current + 1) % SLIDES.length);
    }, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [index]);

  return (
    <section className="hero" aria-roledescription="carousel" aria-label="Destacados">
      {SLIDES.map((slide, i) => (
        <div
          key={slide.id}
          className={`hero__slide ${i === index ? 'hero__slide--active' : ''}`}
          style={{ backgroundImage: `url(${slide.image})` }}
          role="img"
          aria-label={slide.alt}
          aria-hidden={i !== index}
        >
          <div className={`hero__content hero__content--${slide.ctaPosition}`}>
            {slide.badge && (
              <div className="hero__badge">
                <span>{slide.badge}</span>
              </div>
            )}
            <Link to={slide.ctaTo} className="hero__cta btn-gold">
              {slide.ctaLabel}
            </Link>
          </div>
        </div>
      ))}

      <div className="hero__dots" role="tablist" aria-label="Seleccionar slide">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.id}
            role="tab"
            aria-selected={i === index}
            aria-label={`Ir al slide ${i + 1}`}
            className={`hero__dot ${i === index ? 'hero__dot--active' : ''}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </section>
  );
}
