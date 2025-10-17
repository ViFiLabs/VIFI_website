import HeroOne from './components/HeroOne';
import HeroTwo from './components/HeroTwo';
import ProductsSection from './components/ProductsSection';
import MidSectionHero from './components/MidSectionHero';
import About from './components/About';
import Blogs from './components/Blogs';

export default function Home() {
  return (
    <div className="overflow-y-scroll h-screen" data-scroll-container="main">
      {/* Hero Section - Page 1 */}
      <div className="snap-start">
        <HeroOne />
      </div>

      {/* Hero Section - Page 2 */}
      <div className="snap-start">
        <HeroTwo />
      </div>

      {/* Products Section - All 3 pages with shrinking effect */}
      <ProductsSection />

      {/* Mid Section Hero */}
      <div className="snap-start">
        <MidSectionHero />
      </div>

      {/* About Section */}
      <div className="snap-start">
        <About />
      </div>

      {/* Blogs Section */}
      <div className="snap-start">
        <Blogs />
      </div>
    </div>
  );
}
