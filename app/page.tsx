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
      <div className="relative min-h-screen md:h-[100vh]">
        <div className=" md:top-0 md:h-screen">
          <HeroOne />
        </div>
      </div>

      {/* Hero Section - Page 2 (parallax slide over) */}
      <div className="relative min-h-screen md:h-[100vh]" id="hero-two">
        <div className=" md:top-0 md:h-screen">
          <HeroTwo />
        </div>
      </div>

      {/* Products Section - Horizontal stack */}
      <ProductsSection />
      {/* Mid Section Hero (inline 60vh section) */}
      <div>
        <MidSectionHero />
       
      </div>

      {/* About Section (component already handles its own sticky/200vh) */}
        <div>

        <About />
        
      </div>
       <div>
        
        <Tokenized />
       
      </div>
      <div className="relative min-h-screen md:h-[100vh]"> 
        <div className=" md:top-0 md:h-screen">
        <Footer />
        </div>
      </div>
    </div>
  );
}