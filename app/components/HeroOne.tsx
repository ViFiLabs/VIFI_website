export default function HeroOne() {
  return (
    <section
      className="h-screen snap-start relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/herobg.png')" }}
    >

      {/* Hero content */}
      <div className="h-full flex items-center justify-center">
        <h1 className="text-6xl font-bold text-white">hello</h1>
      </div>
    </section>
  );
}
