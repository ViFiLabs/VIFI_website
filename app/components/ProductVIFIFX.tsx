import Image from "next/image";

export default function ProductVIFIFX() {
  return (
    <section className="h-full w-full bg-[#1c392f] text-white">
      <div className="grid h-full w-full grid-cols-2 items-center gap-10 px-6 md:gap-16 md:px-12">
        {/* Left: Image */}
        <div className="flex w-full items-center justify-center">
          <div className="relative aspect-[4/3] w-[min(40vw,560px)]">
            <Image
              src="/vififx.svg"
              alt="vifiFX"
              fill
              sizes="(min-width: 1280px) 560px, (min-width: 768px) 40vw, 80vw"
              className="object-contain"
              priority
            />
          </div>
        </div>
        {/* Right: Copy */}
        <div className="flex w-full items-center justify-center">
          <div className="w-full max-w-[560px]">
            <h2 className="mb-6 text-5xl font-semibold tracking-tight md:text-6xl">vifiFX</h2>
            <p className="mb-4 text-base leading-7 md:text-lg md:leading-8 text-white/85">
              Nulla facilisi. Quisque tincidunt dapibus ligula id aliquet. Mauris vulputate nibh sed dolor finibus,
              sed mattis quam vehicula. Donec mollis eros mollis mauris feugiat, id aliquet augue placerat. Sed ut rutrum odio.
            </p>
            <p className="mb-8 text-base leading-7 md:text-lg md:leading-8 text-white/85">
              Fusce vitae metus sodales, elementum tortor non, ornare urna. Nulla facilisi. Mauris eget nisl neque.
              Aliquam sapien ipsum, mattis eu neque in, tristique vestibulum diam. Suspendisse finibus, lorem.
            </p>
            <button className="rounded-full border border-white/30 px-6 py-2.5 text-sm text-white/90 hover:bg-white/10">
              HOME
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
