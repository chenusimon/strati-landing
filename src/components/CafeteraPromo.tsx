import { Link } from 'react-router-dom';
import cafeteraImg from '../assets/images/products/cafetera-marron.jpg';
import './CafeteraPromo.css';

/** Panel "Nueva cafetera": se usa en la home (sección Café) y en la página Café. */
export default function CafeteraPromo() {
  return (
    <section className="cafetera">
      <div className="cafetera__panel">
        <h2 className="cafetera__title">Nueva cafetera</h2>

        <div className="cafetera__body">
          <img className="cafetera__img" src={cafeteraImg} alt="Cafetera italiana Strati con dos tazas" loading="lazy" />

          <div className="cafetera__text">
            <p>
              La clásica cafetera moka en edición Strati: aluminio resistente, apta para todo tipo de cocinas y
              disponible en 3 colores.
            </p>
            <Link to="/producto/cafetera-italiana" className="cafetera__cta btn-gold">
              Comprar ahora
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
