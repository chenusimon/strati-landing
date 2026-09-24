import { useState } from 'react';
import type { Product } from '../data/products';
import { Link } from 'react-router-dom';
import './SimilarProducts.css';

interface SimilarProductsProps {
  products: Product[];
}

const VISIBLE = 3;

export default function SimilarProducts({ products }: SimilarProductsProps) {
  const [start, setStart] = useState(0);
  const canScroll = products.length > VISIBLE;
  // Ventana circular: siempre se muestran 3 tarjetas, dando la vuelta al llegar al final.
  const visible = canScroll
    ? Array.from({ length: VISIBLE }, (_, i) => products[(start + i) % products.length])
    : products;

  const goPrev = () => setStart((s) => (s - 1 + products.length) % products.length);
  const goNext = () => setStart((s) => (s + 1) % products.length);

  if (products.length === 0) return null;

  return (
    <section className="similar">
      <div className="similar__panel">
        <h2 className="similar__title">Productos similares</h2>
        <div className="similar__row">
          {canScroll && (
            <button type="button" className="similar__arrow" aria-label="Anterior" onClick={goPrev}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M15 5 8 12l7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
          <div className="similar__grid">
            {visible.map((product) => (
              <Link
                to={`/producto/${product.id}`}
                className="similar__card"
                key={product.id}
                aria-label={`Ver ${product.name}`}
              >
                <img src={product.image} alt={product.name} loading="lazy" />
              </Link>
            ))}
          </div>
          {canScroll && (
            <button type="button" className="similar__arrow" aria-label="Siguiente" onClick={goNext}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
