import Footer from "../components/Footer";
import ProductHero from "./ProductsHero";
import ProductsSection from "./ProductsSection";
export default function ProductsPage() {
  return (
    <div className="overflow-y-scroll h-screen" data-scroll-container="main">
      {/* Hero */}
      <div className="snap-start">
      <ProductHero />
      </div>

      {/* Content */}
       <div className="snap-start">
      <ProductsSection />
      </div>

      {/* Footer */}
        <div className="snap-start">
        <Footer />
        </div>
    </div>
  );
}
