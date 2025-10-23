import Image from "next/image";

export default function ProductOneramp() {
  return (
    <section className="h-full w-full bg-[#216e54] text-white">
      <div className="mx-auto flex h-full max-w-6xl items-center gap-10 px-6 md:gap-12 md:px-10">
        {/* Left: Image */}
        <div className="relative aspect-[4/3] w-1/2 rounded-2xl bg-black/10 ring-1 ring-white/5 overflow-hidden">
          <Image
            src="/oneramp.png"
            alt="oneRamp"
            fill
            sizes="(min-width: 768px) 50vw, 90vw"
            className="object-contain p-6"
            priority
          />
        </div>
        {/* Right: Copy */}
        <div className="w-1/2">
          <h2 className="mb-6 text-4xl font-semibold tracking-tight md:text-5xl">oneRamp</h2>
          <p className="mb-4 leading-7 text-white/85">
            Nulla facilisi. Quisque tincidunt dapibus ligula id aliquet. Mauris vulputate nibh sed dolor finibus,
            sed mattis quam vehicula. Donec mollis eros mollis mauris feugiat, id aliquet augue placerat.
          </p>
          <p className="mb-8 leading-7 text-white/85">
            Fusce vitae metus sodales, elementum tortor non, ornare urna. Mauris eget nisl neque. Aliquam sapien ipsum,
            mattis eu neque in, tristique vestibulum diam. Suspendisse finibus, lorem.
          </p>
          <button className="rounded-full border border-white/30 px-5 py-2 text-sm text-white/90 hover:bg-white/10">
            HOME
          </button>
        </div>
      </div>
    </section>
  );
}
