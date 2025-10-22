import Footer from "../components/Footer";
import AboutHero from "./AboutHero";
import AboutContent from "./AboutContent";
export default function AboutPage() {
  return (
    <div className="overflow-y-scroll h-screen" data-scroll-container="main">
      {/* Hero */}
      <div className="snap-start">
      <AboutHero />
      </div>

      {/* Content */}
       <div className="snap-start">
      <AboutContent />
      </div>

      {/* Footer */}
         <div className="snap-start">
            <Footer />
          </div>
    </div>
  );
}
