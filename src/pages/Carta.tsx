import { getProductsByCategory } from '../data/products';
import ProductGrid from '../components/ProductGrid';
import Footer from '../components/Footer';

export default function Carta() {
  const flavors = getProductsByCategory('tiramisu');

  return (
    <main style={{ background: 'var(--color-bg-cream)', paddingTop: 'var(--header-height)' }}>
      <ProductGrid products={flavors} columns={3} />
      <Footer />
    </main>
  );
}
