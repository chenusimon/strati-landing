import { getProductsByCategory } from '../data/products';
import ProductGrid from '../components/ProductGrid';
import Footer from '../components/Footer';

export default function ComprarMerch() {
  const merch = getProductsByCategory('merch');

  return (
    <main style={{ background: 'var(--color-bg-cream)', paddingTop: 'var(--header-height)' }}>
      <ProductGrid products={merch} columns={5} />
      <Footer />
    </main>
  );
}
