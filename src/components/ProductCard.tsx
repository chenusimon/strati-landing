import { Link } from 'react-router-dom';
import type { Product } from '../data/products';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
  /** Use "light" text when the card sits on a dark background (e.g. the similar-products panel) */
  variant?: 'dark' | 'light';
}

export default function ProductCard({ product, variant = 'dark' }: ProductCardProps) {
  return (
    <Link
      to={`/producto/${product.id}`}
      className={`product-card product-card--${variant}`}
      aria-label={`Ver ${product.name}`}
    >
      <div className="product-card__image">
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>
      <div className="product-card__info">
        <span className="product-card__name">{product.name}</span>
        {product.tag && <span className="product-card__tag">{product.tag}</span>}
      </div>
    </Link>
  );
}
