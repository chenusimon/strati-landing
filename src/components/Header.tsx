import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.svg';
import { useStore } from '../context/StoreContext';
import './Header.css';

export default function Header() {
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const { email, cart } = useStore();
  const cartCount = cart.reduce((total, item) => total + item.qty, 0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;

      if (currentY < 60) {
        setHidden(false);
      } else if (delta > 6) {
        setHidden(true);
      } else if (delta < -6) {
        setHidden(false);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${hidden ? 'header--hidden' : ''}`}>
      <Link to="/" className="header__logo" aria-label="Strati - Ir al inicio">
        <img src={logo} alt="Strati" />
      </Link>

      <nav className="header__nav" aria-label="Navegación principal">
        <Link to="/carta" className="header__link">
          CARTA
        </Link>
        <Link to="/comprar-cafe" className="header__link">
          CAFÉ
        </Link>
        <Link to="/pedidos" className="header__link">
          PEDIDOS
        </Link>
      </nav>

      <div className="header__actions">
        <button className="header__icon-btn" aria-label="Ayuda">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
            <path
              d="M9.5 9.2a2.5 2.5 0 1 1 3.4 2.3c-.8.4-1.4 1-1.4 1.9v.3"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <circle cx="12" cy="16.6" r="0.9" fill="currentColor" />
          </svg>
        </button>
        <button className="header__icon-btn" aria-label="Idioma">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
            <path
              d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.7-3.8-9s1.3-6.4 3.8-9Z"
              stroke="currentColor"
              strokeWidth="1.6"
            />
          </svg>
        </button>
        <Link to="/carrito" className="header__icon-btn header__icon-btn--cart" aria-label="Carrito">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M4 5h2l1.2 10.4A2 2 0 0 0 9.2 17.2h8.1a2 2 0 0 0 2-1.7L20.5 9H6"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="10" cy="20.5" r="1.2" fill="currentColor" />
            <circle cx="17" cy="20.5" r="1.2" fill="currentColor" />
          </svg>
          {cartCount > 0 && <span className="header__cart-badge">{cartCount}</span>}
        </Link>
        <Link to={email ? '/cuenta' : '/login'} className="header__icon-btn" aria-label="Mi cuenta">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="8.5" r="3.4" stroke="currentColor" strokeWidth="1.6" />
            <path
              d="M4.8 19.4c1.4-3 4-4.7 7.2-4.7s5.8 1.7 7.2 4.7"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </Link>
      </div>
    </header>
  );
}
