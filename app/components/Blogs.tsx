export default function Blogs() {
  return (
    <>
    <div className="relative min-h-[200vh]">
      {/* Sticky panel overlays the footer below; higher z-index ensures it slides over */}
      <div className="sticky top-0 h-screen bg-amber-50 flex items-center justify-center z-20 shadow-xl">
        <h1 className="text-6xl font-bold text-black">BLOGS</h1>
      </div>
    </div>
    <footer className="sticky bottom-0 z-auto h-[20vh] w-full bg-green-500 flex items-center justify-center text-black text-xl font-semibold">
      footer
    </footer>
    </>
  );
}
