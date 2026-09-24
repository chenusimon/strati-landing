import { Link } from 'react-router-dom';
import { getProductsByCategory } from '../data/products';
import Footer from '../components/Footer';
import './Carta.css';

export default function Carta() {
  // Todos los sabores de tiramisú, cada uno una sola vez (incluido el de pistacho).
  const flavors = getProductsByCategory('tiramisu');

  return (
    <main className="carta">
      <div className="carta__grid">
        {flavors.map((product) => (
          <Link key={product.id} to={`/producto/${product.id}`} className="carta__item" aria-label={`Ver ${product.name}`}>
            <div className="carta__image">
              <img src={product.image} alt={product.name} loading="lazy" />
            </div>
            <span className="carta__name">{product.name}</span>
          </Link>
        ))}
      </div>
      <Footer />
    </main>
  );
}
