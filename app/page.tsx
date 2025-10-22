import HeroOne from './components/HeroOne';
import HeroTwo from './components/HeroTwo';
import ProductsSection from './components/ProductsSection';
import MidSectionHero from './components/MidSectionHero';
import About from './components/About';
import Blogs from './components/Blogs';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="overflow-y-scroll h-screen" data-scroll-container="main">
      {/* Hero Section - Page 1 (parallax slide over) */}
      <div className="relative h-[200vh] snap-start">
        <div className="sticky top-0 h-screen">
          <HeroOne />
        </div>
      </div>

      {/* Hero Section - Page 2 (parallax slide over) */}
      <div className="relative h-[200vh] snap-start">
        <div className="sticky top-0 h-screen">
          <HeroTwo />
        </div>
      </div>

      {/* Products Section - Horizontal stack */}
      <ProductsSection />

      {/* Mid Section Hero (parallax slide over) */}
      <div className="relative h-[200vh] snap-start">
        <div className="sticky top-0 h-screen">
          <MidSectionHero />
        </div>
      </div>

      {/* About Section (component already handles its own sticky/200vh) */}
      <div className="snap-start">
        <About />
      </div>

      {/* Blogs and Footer */}
      <div className="snap-start">
        <Blogs />
      </div >
      <div className="snap-start"> 
      <Footer />
      </div>
    </div>
  );
}