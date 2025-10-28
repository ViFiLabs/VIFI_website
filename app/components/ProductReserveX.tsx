import Image from "next/image";

export default function ProductReserveX() {
  return (
    <section className="h-full w-full bg-[#296450] text-white py-12 md:py-20">
      <div className="grid h-full w-full grid-cols-1 items-center gap-10 px-6 md:grid-cols-2 md:gap-16 md:px-12">
        {/* Left: Image */}
        <div className="flex w-full items-center justify-center">
          <div className="relative aspect-[4/3] w-[min(80vw,560px)] md:w-[min(40vw,560px)]">
            <Image
              src="/reservex.svg"
              alt="reserveX"
              fill
              sizes="(min-width: 1280px) 560px, (min-width: 768px) 40vw, 80vw"
              className="object-contain"
              priority
            />
          </div>
        </div>
        {/* Right: Copy */}
        <div className="flex w-full items-center justify-center">
          <div className="flex flex-col gap-y-4 sm:gap-y-6 lg:gap-y-8 w-full max-w-[560px] text-left md:text-left px-6 md:px-0">
            <h2 className="mb-6 text-5xl font-semibold tracking-tight md:text-6xl">reserveX</h2>
            <p className="mb-4 text-base leading-7 md:text-lg md:leading-8 text-white/85">
              Nulla facilisi. Quisque tincidunt dapibus ligula id aliquet. Mauris vulputate nibh sed dolor finibus,
              sed mattis quam vehicula. Donec mollis eros mollis mauris feugiat, id aliquet augue placerat.
            </p>
            <p className="mb-8 text-base leading-7 md:text-lg md:leading-8 text-white/85">
              Fusce vitae metus sodales, elementum tortor non, ornare urna. Mauris eget nisl neque. Aliquam sapien ipsum,
              mattis eu neque in, tristique vestibulum diam. Suspendisse finibus, lorem.
            </p>
            {/* <button className="rounded-full border border-white/30 px-6 py-2.5 text-sm text-white/90 hover:bg-white/10">
              HOME
            </button> */}
          </div>
        </div>
      </div>
    </section>
  );
}
