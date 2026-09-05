"use client";

import Image from "next/image";
import { MAPS, EVENT } from "../lib/config";

/**
 * MapSection: Custom venue photo collage (1 Building Exterior + 2 Interior Ballrooms) + Directions button.
 */
export default function MapSection() {
  return (
    <section className="relative w-full py-24 px-6 sm:px-10 bg-[#18100A] text-white flex flex-col items-center overflow-hidden">
      {/* Soft Center Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-md mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
          <h2 className="font-marcellus text-3xl sm:text-4xl text-[#f3e5ca] tracking-[0.2em] font-light uppercase leading-tight drop-shadow">
            Location Map
          </h2>
          <div className="w-14 h-[1.5px] bg-[#f3e5ca]/60 mx-auto mt-3" />
        </div>

        {/* 3-Photo Seamless Collage Grid (Borderless, Clean) */}
        <div className="space-y-6">
          
          {/* 3-Photo Seamless Collage Grid (Left: 1 Vertical Building Photo, Right: 2 Stacked Interior Photos, Gap 0) */}
          <div className="grid grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-lg h-[270px] sm:h-[310px] w-full">
            {/* Left Side: 1 Vertical Building Exterior Photo */}
            <div className="relative h-full w-full group overflow-hidden">
              <Image
                src="/assets/venue-exterior.png"
                alt="Hotel & Venue Building Exterior"
                fill
                priority
                sizes="(max-width: 768px) 50vw, 240px"
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Right Side: 2 Stacked Venue Interior Photos (Top & Bottom) */}
            <div className="grid grid-rows-2 gap-0 h-full w-full">
              {/* Top Interior Photo: Grand Ballroom */}
              <div className="relative h-full w-full group overflow-hidden">
                <Image
                  src="/assets/venue-ballroom.png"
                  alt="Grand Ballroom Interior Setup"
                  fill
                  sizes="(max-width: 768px) 50vw, 240px"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Bottom Interior Photo: Chapel Venue */}
              <div className="relative h-full w-full group overflow-hidden">
                <Image
                  src="/assets/venue-chapel.png"
                  alt="Glass Chapel House Interior Setup"
                  fill
                  sizes="(max-width: 768px) 50vw, 240px"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* Details & Directions Button */}
          <div className="text-center space-y-4 pt-1">
            <div className="text-center text-[#f3e5ca]">
              <span className="font-marcellus text-lg sm:text-xl font-medium tracking-wide">
                {EVENT.resepsi.venue}
              </span>
            </div>

            <p className="font-jost text-xs sm:text-sm text-white/90 max-w-xs mx-auto leading-relaxed">
              {EVENT.resepsi.address}
            </p>

            <div className="pt-2">
              <a
                href={MAPS.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-[#f3e5ca] bg-gradient-to-r from-[#2A1B12] via-[#3D291D] to-[#2A1B12] text-[#f3e5ca] font-marcellus text-xs uppercase tracking-[0.2em] shadow-lg transition-transform hover:scale-105 active:scale-95"
              >
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
