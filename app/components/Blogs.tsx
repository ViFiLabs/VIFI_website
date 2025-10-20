export default function Blogs() {
  return (
    <div className="relative min-h-[200vh]">
      {/* Sticky panel overlays the footer below; higher z-index ensures it slides over */}
      <div className="sticky top-0 h-screen bg-amber-50 flex items-center justify-center z-20 shadow-xl">
        <h1 className="text-6xl font-bold text-black">BLOGS</h1>
      </div>
    </div>
  );
}
