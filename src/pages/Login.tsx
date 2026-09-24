import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import logo from '../assets/images/logo.svg';
import './Login.css';

export default function Login() {
  const store = useStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  function doLogin() {
      if (email.trim() == '') {
        setError('Ingresá tu correo electrónico');
        return;
      }
    setError('');
    store.login(email.trim());

    // Si el usuario venía de tocar "Comprar ahora", retomamos la compra pendiente.
    const pending = sessionStorage.getItem('strati_pending_purchase');
    if (pending) {
      sessionStorage.removeItem('strati_pending_purchase');
      navigate('/producto/' + pending + '?comprar=1');
      return;
    }
    navigate('/cuenta');
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    doLogin();
  }

  return (
    <div className="login-page">
      <div className="login-page__topbar">
        <Link to="/" className="login-page__brand">
          <img src={logo} alt="Strati" className="login-page__logo" />
          <span className="login-page__wordmark">TRATI</span>
        </Link>
      </div>

      <div className="login-card">
        <h1 className="login-card__title">Inicio de sesión</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="login-card__input"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {error && <p className="login-card__error">{error}</p>}

          <button type="submit" className="login-card__button">
            Siguiente
          </button>
        </form>

        <p className="login-card__help">¿Tenés problemas para iniciar sesión?</p>

        <div className="login-card__divider">
          <span></span>
          <em>O</em>
          <span></span>
        </div>

        <button type="button" className="login-card__button" onClick={doLogin}>
          Crear cuenta
        </button>
      </div>
    </div>
  );
}
