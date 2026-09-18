import { getProductsByCategory } from '../data/products';
import ProductGrid from './ProductGrid';

export default function SaboresSection() {
  const featured = getProductsByCategory('tiramisu').filter((p) => p.featured);

  return <ProductGrid products={featured} title="Nuestra selección de sabores" />;
}
