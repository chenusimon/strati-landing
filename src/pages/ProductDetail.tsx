import { Navigate, useNavigate, useParams } from 'react-router-dom';
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

  if (!product) {
    return <Navigate to="/" replace />;
  }

  const similar = getSimilarProducts(product);

  // Si no hay sesión iniciada, mandamos primero a /login. Una vez logueado,
  // el producto se agrega al carrito y vamos directo a verlo.
  async function handleComprar() {
    if (!email) {
      navigate('/login');
      return;
    }
    await addToCart(product!.id);
    navigate('/carrito');
  }

  return (
    <main className="product-detail">
      <div className="product-detail__top">
        <div className="product-detail__image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-detail__info">
          <h1 className="product-detail__name">{product.name}</h1>
          <p className="product-detail__tagline">{product.tagline}</p>

          {product.colors && (
            <div className="product-detail__colors" aria-label="Colores disponibles">
              {product.colors.map((color) => (
                <span
                  key={color.name}
                  className="product-detail__color"
                  style={{ background: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
          )}

          <button type="button" onClick={handleComprar} className="product-detail__cta">
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
