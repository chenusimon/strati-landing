import { useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { getProductById, getSimilarProducts } from '../data/products';
import { useStore } from '../context/StoreContext';
import SimilarProducts from '../components/SimilarProducts';
import Footer from '../components/Footer';
import './ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id);
  const { email, addToCart } = useStore();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const resumed = useRef(false);
  const [colorIndex, setColorIndex] = useState(0);

  // Al volver del login con ?comprar=1, completamos la compra que quedó pendiente.
  useEffect(() => {
    if (resumed.current) return;
    if (searchParams.get('comprar') === '1' && email && product) {
      resumed.current = true;
      addToCart(product.id);
      navigate('/carrito', { replace: true });
    }
  }, [searchParams, email, product, addToCart, navigate]);

  if (!product) {
    return <Navigate to="/" replace />;
  }

  const similar = getSimilarProducts(product, 8);

  // Foto según el color elegido (si el color no trae foto propia, queda la principal)
  const selectedColor = product.colors?.[colorIndex];
  const shownImage = selectedColor?.image ?? product.image;

  function handleComprar() {
    if (!email) {
      // Sin sesión: recordamos qué quería comprar para agregarlo después de iniciar sesión.
      sessionStorage.setItem('strati_pending_purchase', product!.id);
      navigate('/login');
      return;
    }
    addToCart(product!.id);
    navigate('/carrito');
  }

  return (
    <main className="product-detail">
      <div className="product-detail__top">
        <div className="product-detail__image">
          <img src={shownImage} alt={selectedColor ? `${product.name} - ${selectedColor.name}` : product.name} />
        </div>

        <div className="product-detail__info">
          <h1 className="product-detail__name">{product.name}</h1>
          <p className="product-detail__tagline">{product.tagline}</p>

          {product.colors && (
            <div className="product-detail__colors" aria-label="Colores disponibles">
              {product.colors.map((color, i) => (
                <button
                  key={color.name}
                  type="button"
                  className={`product-detail__color ${i === colorIndex ? 'product-detail__color--active' : ''}`}
                  style={{ background: color.hex }}
                  title={color.name}
                  aria-label={`Color ${color.name}`}
                  aria-pressed={i === colorIndex}
                  onClick={() => setColorIndex(i)}
                />
              ))}
            </div>
          )}

          <button type="button" onClick={handleComprar} className="product-detail__cta btn-gold">
            Comprar ahora
          </button>

          <div className="product-detail__characteristics">
            <h2>Características</h2>
            <p>{product.characteristics}</p>
          </div>
        </div>
      </div>

      <SimilarProducts products={similar} />

      <Footer />
    </main>
  );
}
