import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { getProductById } from '../data/products';
import './Cart.css';

export default function Cart() {
  const { email, cart, removeFromCart, checkout } = useStore();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  if (!email) {
    return (
      <div className="cart-page cart-page--empty">
        <p>Iniciá sesión para ver tu carrito.</p>
        <Link to="/login" className="cart-page__cta">
          Iniciar sesión
        </Link>
      </div>
    );
  }

  function handleConfirm() {
    checkout();
    setMessage('Compra confirmada! la agregamos a tu historial de pedidos.');
  }

  return (
    <div className="cart-page">
      <h1>Tu carrito</h1>

      {cart.length === 0 ? (
        <p>Todavía no agregaste productos.</p>
      ) : (
        <ul className="cart-page__list">
          {cart.map((item) => {
            const product = getProductById(item.productId);
            if (!product) return null;
            return (
              <li key={item.productId} className="cart-page__item">
                <img src={product.image} alt={product.name} />
                <div className="cart-page__item-info">
                  <span className="cart-page__item-name">{product.name}</span>
                  <span className="cart-page__item-qty">Cantidad: {item.qty}</span>
                </div>
                <button type="button" onClick={() => removeFromCart(item.productId)}>
                  Quitar
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {cart.length > 0 && (
        <button type="button" className="cart-page__confirm" onClick={handleConfirm}>
          Confirmar compra
        </button>
      )}

      {message && <p className="cart-page__message">{message}</p>}

      <button type="button" className="cart-page__link" onClick={() => navigate('/cuenta')}>
        Ver historial de pedidos
      </button>
    </div>
  );
}
