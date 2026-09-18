import { Navigate, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { getProductById } from '../data/products';
import './Account.css';

export default function Account() {
  const { email, orders, logout } = useStore();
  const navigate = useNavigate();

  if (!email) {
    return <Navigate to="/login" replace />;
  }

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <div className="account-page">
      <h1>Mi cuenta</h1>
      <p className="account-page__email">{email}</p>

      <button type="button" className="account-page__logout" onClick={handleLogout}>
        Cerrar sesión
      </button>

      <h2>Historial de pedidos</h2>

      {orders.length === 0 ? (
        <p>Todavía no hiciste ninguna compra.</p>
      ) : (
        <ul className="account-page__orders">
          {orders.map((order) => (
            <li key={order.id} className="account-page__order">
              <span className="account-page__order-date">{new Date(order.date).toLocaleDateString()}</span>
              <ul>
                {order.items.map((item) => {
                  const product = getProductById(item.productId);
                  return (
                    <li key={item.productId}>
                      {product ? product.name : item.productId} × {item.qty}
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
