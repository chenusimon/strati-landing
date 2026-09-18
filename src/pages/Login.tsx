import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import logo from '../assets/images/logo.svg';
import './Login.css';

export default function Login() {
  const { login } = useStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // No hay contraseña: con solo poner el mail, "Siguiente" y "Crear cuenta"
  // hacen exactamente lo mismo (buscan o crean el usuario en el servidor).
  async function submitEmail() {
    if (!email.trim()) {
      setError('Ingresá tu correo electrónico');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await login(email.trim());
      navigate('/cuenta');
    } catch {
      setError('No se pudo iniciar sesión. Intentá de nuevo.');
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    submitEmail();
  }

  return (
    <div className="login-page">
      <div className="login-page__topbar">
        <img src={logo} alt="Strati" className="login-page__logo" />
        <span className="login-page__wordmark">TRATI</span>
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

          <button type="submit" className="login-card__button" disabled={loading}>
            {loading ? 'Cargando...' : 'Siguiente'}
          </button>
        </form>

        <p className="login-card__help">¿Tenés problemas para iniciar sesión?</p>

        <div className="login-card__divider">
          <span />
          <em>O</em>
          <span />
        </div>

        <button type="button" className="login-card__button" disabled={loading} onClick={submitEmail}>
          Crear cuenta
        </button>
      </div>
    </div>
  );
}
