import HeroOne from './components/HeroOne';
import HeroTwo from './components/HeroTwo';
import ProductsSection from './components/ProductsSection';
import MidSectionHero from './components/MidSectionHero';
import About from './components/About';
import Tokenized from './components/Tokenized';
import Footer from './components/Footer';

export default function Home() {
  return (
  <div className="h-screen overflow-y-scroll overflow-x-hidden" data-scroll-container="main">
      {/* Hero Section - Page 1 (parallax slide over) */}
      <div className="relative snap-start min-h-screen md:h-[100vh]">
        <div className="md:sticky md:top-0 md:h-screen">
          <HeroOne />
        </div>
      </div>

     
    </div>
  );
}