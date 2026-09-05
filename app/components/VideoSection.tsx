"use client";

import { VIDEOS } from "../lib/config";
import ScrollReveal from "./ScrollReveal";

/**
 * VideoSection Component: Displays Pre-Wedding video and Live Streaming video embeds
 * with direct YouTube fallback links matching modern luxury invitation design.
 */
export default function VideoSection() {
  return (
    <section className="relative w-full py-20 px-6 sm:px-10 bg-[#18100A] text-white flex flex-col items-center overflow-hidden">
      {/* Soft Center Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-md mx-auto space-y-16">
        {/* PRE WEDDING SECTION */}
        <ScrollReveal animation="zoom-in" duration={1.1} className="space-y-5 text-center">
          <h2 className="font-marcellus text-2xl sm:text-3xl text-[#f3e5ca] tracking-[0.2em] font-light uppercase leading-tight drop-shadow">
            {VIDEOS.prewedding.title}
          </h2>

          {/* Video Container (16:9 Aspect Ratio with Rounded Corners & Shadow) */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-[#f3e5ca]/20 bg-black/60">
            <iframe
              src={VIDEOS.prewedding.embedUrl}
              title={VIDEOS.prewedding.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full border-0"
            />
          </div>

          {/* Fallback Info & Button */}
          <div className="space-y-2 pt-2">
            <p className="font-cormorant text-[18px] sm:text-[19px] text-[#f3e5ca]/90 leading-snug px-3 py-1 my-1 max-w-sm mx-auto">
              Should you have any issues with video above, then please click on the button below instead:
            </p>

            <a
              href={VIDEOS.prewedding.watchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-3.5 py-1.5 rounded-md bg-[#6B6E70] hover:bg-[#585B5D] text-white/95 font-cormorant text-sm sm:text-[15px] font-normal tracking-wide shadow-sm transition-all hover:scale-105 active:scale-95 mt-5 sm:mt-6"
            >
              Open via Youtube
            </a>
          </div>
        </ScrollReveal>

        {/* LIVE STREAMING SECTION */}
        <ScrollReveal animation="zoom-in" delay={0.2} duration={1.1} className="space-y-5 text-center">
          <h2 className="font-marcellus text-2xl sm:text-3xl text-[#f3e5ca] tracking-[0.2em] font-light uppercase leading-tight drop-shadow">
            {VIDEOS.livestream.title}
          </h2>

          {/* Video Container (16:9 Aspect Ratio with Rounded Corners & Shadow) */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-[#f3e5ca]/20 bg-black/60">
            <iframe
              src={VIDEOS.livestream.embedUrl}
              title={VIDEOS.livestream.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full border-0"
            />
          </div>

          {/* Fallback Info & Button */}
          <div className="space-y-2 pt-2">
            <p className="font-cormorant text-[18px] sm:text-[19px] text-[#f3e5ca]/90 leading-snug px-3 py-1 my-1 max-w-sm mx-auto">
              Should you have any issues with video above, then please click on the button below instead:
            </p>

            <a
              href={VIDEOS.livestream.watchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-3.5 py-1.5 rounded-md bg-[#6B6E70] hover:bg-[#585B5D] text-white/95 font-cormorant text-sm sm:text-[15px] font-normal tracking-wide shadow-sm transition-all hover:scale-105 active:scale-95 mt-5 sm:mt-6"
            >
              Open via Youtube
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

