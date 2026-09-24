import { Link } from 'react-router-dom';
import cafeImg from '../assets/images/cafe-hero.jpg';
import VideoPlayer from './VideoPlayer';
import './CafeSection.css';

const VIDEO_SRC = `${import.meta.env.BASE_URL}videos/cafe.mp4`;

export default function CafeSection() {
  return (
    <section className="cafe" id="cafe">
      <div className="cafe__panel">
        <h2 className="cafe__title">Café</h2>

        <div className="cafe__media">
          <VideoPlayer src={VIDEO_SRC} poster={cafeImg} aspectRatio="16 / 9" />
        </div>

        <Link to="/comprar-cafe" className="cafe__cta btn-gold">
          Comprar ahora
        </Link>
      </div>
    </section>
  );
}
