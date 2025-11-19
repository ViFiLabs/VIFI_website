import HeroOne from './components/HeroOne';
import HeroTwo from './components/HeroTwo';
import ProductsSection from './components/ProductsSection';
import MidSectionHero from './components/MidSectionHero';
import About from './components/About';
import Tokenized from './components/Tokenized';
import Footer from './components/Footer';

export default function Home() {
  return (
  <div
    className="h-screen overflow-y-scroll overflow-x-hidden overscroll-y-none overscroll-x-none"
    data-scroll-container="main"
  >
      <HeroOne />
      <HeroTwo />
      <ProductsSection />
      <MidSectionHero />
      <About />
      <Tokenized />
      <div className="relative "> 
      <Footer />
      </div> 
    </div>
  );
}