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
      <div className="relative h-[100vh] snap-start">
        <div className="sticky top-0 h-screen">
          <HeroOne />
        </div>
      </div>

      {/* Hero Section - Page 2 (parallax slide over) */}
      <div className="relative h-[100vh] md:h-[100vh] snap-start" id="hero-two">
        <div className="sticky top-0 h-screen">
          <HeroTwo />
        </div>
      </div>

      {/* Products Section - Horizontal stack */}
      <ProductsSection />
      {/* Mid Section Hero (inline 60vh section) */}
      <div className="snap-start">
        <MidSectionHero />
      </div>

      {/* About Section (component already handles its own sticky/200vh) */}
      <div className="snap-start">
        <About />
      </div>
       <div className="snap-start">
        <Tokenized />
      </div>
      <div className="snap-start"> 
      <Footer />
      </div>
    </div>
  );
}