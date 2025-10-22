import Footer from "../components/Footer";
import BlogHero from "./BlogHero";
import BlogContent from "./BlogContent";
export default function BlogPage() {
  return (
    <div className="overflow-y-scroll h-screen" data-scroll-container="main">
      {/* Hero */}
      <div className="snap-start">
      <BlogHero />
      </div>

      {/* Content */}
       <div className="snap-start">
      <BlogContent />
      </div>

      {/* Footer */}
         <div className="snap-start">
            <Footer />
          </div>
    </div>
  );
}
