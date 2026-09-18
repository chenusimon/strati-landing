import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HeroCarousel from '../components/HeroCarousel';
import SaboresSection from '../components/SaboresSection';
import CafeSection from '../components/CafeSection';
import Footer from '../components/Footer';

export default function Home() {
  const location = useLocation();

  // When the header's "Carta" link is clicked from a different page, it
  // navigates here with { state: { scrollTo: 'carta' } }. Once this page
  // has rendered, scroll to that section.
  useEffect(() => {
    const state = location.state as { scrollTo?: string } | undefined;
    if (state?.scrollTo) {
      requestAnimationFrame(() => {
        document.getElementById(state.scrollTo!)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }, [location.state]);

  return (
    <main>
      <HeroCarousel />
      <SaboresSection />
      <CafeSection />
      <Footer />
    </main>
  );
}
