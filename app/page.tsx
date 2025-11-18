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
 
          <HeroOne />
    

      {/* Hero Section - Page 2 (parallax slide over) */}
      
          <HeroTwo />


      {/* Products Section - Horizontal stack */}
      <ProductsSection />
      {/* Mid Section Hero (inline 60vh section) */}
      
        <MidSectionHero />
       
   

      {/* About Section (component already handles its own sticky/200vh) */}
     

        <About />
        

        <Tokenized />

        <Footer />

    </div>
  );
}