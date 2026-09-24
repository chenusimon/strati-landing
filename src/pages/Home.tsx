import HeroCarousel from '../components/HeroCarousel';
import SaboresSection from '../components/SaboresSection';
import CafeSection from '../components/CafeSection';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main>
      <HeroCarousel />
      <SaboresSection />
      <CafeSection />
      <Footer />
    </main>
  );
}
