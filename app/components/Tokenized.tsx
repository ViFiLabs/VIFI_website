export default function Tokenized() {
  return (
    <section className="h-[60vh] bg-white text-neutral-900 snap-start justify-items-center content-center md:py-16">
      <div className="mx-auto w-full max-w-6xl md:px-8">
        {/* Combined top/bottom dividers with internal padding to avoid margin-collapsing */}
        <div className="border-y border-neutral-300/70">
          {/* Explicit spacer blocks to guarantee >=100px spacing from dividers */}
          <div aria-hidden="true" className="h-[60px]" />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12 text-left">
            {/* Left: Title */}
            <div className="md:col-span-4">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight">Tokenized Futures</h2>
            </div>

            {/* Middle: Bold paragraph (20px) */}
            <div className="md:col-span-4">
              <p className="text-xl font-semibold leading-relaxed">
                As Wall Street experiments with tokenized private credit and broadens access with blockchain-enabled funds at $25 entry points, the long-term alpha from crypto exposure continues to compress.
              </p>
            </div>

            {/* Right: Supporting paragraph (18px) */}
            <div className="md:col-span-4">
              <p className="text-lg leading-relaxed text-neutral-700">
                African and LATAM fund managers cannot afford to watch from the sidelines — they must embrace tokenized real-world assets and blockchain rails now, or risk being permanently left behind in the next wave of financial innovation.
              </p>
            </div>
          </div>
          <div aria-hidden="true" className="h-[60px]" />
        </div>
      </div>
    </section>
  );
}
