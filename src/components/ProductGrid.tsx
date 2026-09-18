import type { Product } from '../data/products';
import ProductCard from './ProductCard';
import './ProductGrid.css';

interface ProductGridProps {
  products: Product[];
  title?: string;
  columns?: 3 | 5;
}

export default function ProductGrid({ products, title, columns = 3 }: ProductGridProps) {
  return (
    <section className={`product-grid-section product-grid-section--cols-${columns}`}>
      {title && <h2 className="product-grid-section__title">{title}</h2>}
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
