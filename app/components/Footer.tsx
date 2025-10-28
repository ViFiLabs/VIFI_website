import Image from "next/image";

export default function Footer() {
  return (
    <>
      <div className="relative min-h-[200vh]">
        <div className="sticky top-0 h-screen bg-gradient-to-b from-[#191919] to-[#188257] z-20 shadow-xl">
          {/* Heading + rule positioned responsively */}
          <div className="absolute left-1/2 -translate-x-1/2 top-[clamp(64px,12vh,128px)] flex items-center gap-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light">Our Team</h1>
            <div className="h-[2px] w-[clamp(6rem,10vw,12rem)] bg-emerald-400/50" />
          </div>

         {/* Outer layout container */}
            <div className="relative h-full w-full flex items-center justify-between">
              <div className="w-full max-w-[1400px] flex items-center justify-between px-6 sm:px-10 md:px-14 lg:px-20 xl:px-28">
              {/* Left: decorative image */}
              <div className="relative h-[clamp(320px,90vh,820px)] w-[clamp(280px,45vw,760px)] flex-shrink-0 self-center ml-0">
                <Image
                  src="/footer.svg"
                  alt="ViFi abstract brand shape"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain object-left"
                />
              </div>

             {/* Right: copy block */}
              <div className="flex flex-col justify-center max-w-[min(65ch,640px)] text-white">
                <div>
                  <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-neutral-200">
                    We’re not outsiders trying to “unlock” emerging markets. We live here. We build here. Our families transact on mobile money, buy airtime with USSD, and pool money in group chats. ViFi is what we wish existed five years ago.
                  </p>

                  <p className="mt-16 lg:mt-24 text-2xl sm:text-3xl lg:text-4xl leading-snug text-white">
                    Now we’re building it — for everyone else who’s been left out of the system.
                  </p>
                </div>
              </div>
            </div>
            </div>
        </div>
      </div>

      {/* footer parallax */}
      <footer className="sticky bottom-0 z-auto h-[20vh] w-full bg-black flex items-center justify-center text-white text-xl font-semibold">
        footer
      </footer>
    </>
  );
}
