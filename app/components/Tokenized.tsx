export default function Tokenized() {
  return (
    <section className="h-[80vh] bg-white text-neutral-900 snap-start flex items-center py-12 md:py-16">
      <div className="w-full px-[20px] sm:px-6 md:px-8">
        {/* Combined top/bottom dividers with internal padding to avoid margin-collapsing */}
        <div className="mx-auto w-full max-w-6xl border-y border-neutral-400 px-0 sm:px-6 md:px-10">
          {/* Explicit spacer blocks to guarantee consistent spacing from dividers */}
          <div aria-hidden="true" className="h-[48px] sm:h-[56px]" />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12 text-left">
            {/* Left: Title */}
            <div className="md:col-span-4 space-y-4">
              <h2 className="text-[28px] sm:text-5xl md:text-6xl font-medium tracking-tight">Tokenized Futures</h2>
            </div>

            {/* Middle: Bold paragraph (20px) */}
            <div className="md:col-span-4 space-y-4">
              <p className="text-[18px] font-semibold leading-relaxed sm:text-xl">
                As Wall Street experiments with tokenized private credit and broadens access with blockchain-enabled funds at $25 entry points, the long-term alpha from crypto exposure continues to compress.
              </p>
            </div>

            {/* Right: Supporting paragraph (18px) */}
            <div className="md:col-span-4 space-y-4">
              <p className="text-[18px] leading-relaxed text-neutral-700 sm:text-lg">
                African and LATAM fund managers cannot afford to watch from the sidelines — they must embrace tokenized real-world assets and blockchain rails now, or risk being permanently left behind in the next wave of financial innovation.
              </p>
            </div>
          </div>
          <div aria-hidden="true" className="h-[48px] sm:h-[56px]" />
        </div>
      </div>
    </section>
  );
}
