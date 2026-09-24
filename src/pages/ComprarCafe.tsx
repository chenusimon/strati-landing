import cafeImg from '../assets/images/cafe-hero.jpg';
import VideoPlayer from '../components/VideoPlayer';
import { getProductsByCategory } from '../data/products';
import ProductGrid from '../components/ProductGrid';
import CafeteraPromo from '../components/CafeteraPromo';
import Footer from '../components/Footer';
import './ComprarCafe.css';

const VIDEO_SRC = `${import.meta.env.BASE_URL}videos/cafe.mp4`;

export default function ComprarCafe() {
  const cafes = getProductsByCategory('cafe');

  return (
    <main className="comprar-cafe">
      <ProductGrid products={cafes} columns={5} />

      <div className="comprar-cafe__banner">
        <VideoPlayer src={VIDEO_SRC} poster={cafeImg} aspectRatio="21 / 9" />
      </div>

      <CafeteraPromo />

      <ProductGrid products={cafes} columns={5} />

      <Footer />
    </main>
  );
}
