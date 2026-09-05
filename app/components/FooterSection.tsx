"use client";

import Image from "next/image";
import { COUPLE } from "../lib/config";
import ScrollReveal from "./ScrollReveal";

/**
 * Top & Bottom Center Gold Flourish Badge
 */
function OrnateCenterFlourish({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-28 h-5 sm:w-36 sm:h-6 text-[#f3e5ca] filter drop-shadow-[0_0_8px_rgba(212,175,55,0.6)] ${className}`}
    >
      <defs>
        <linearGradient id="footerGoldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#D4AF37" />
          <stop offset="50%" stopColor="#FFF2D4" />
          <stop offset="100%" stopColor="#D4AF37" />
        </linearGradient>
      </defs>
      <g fill="url(#footerGoldGrad)">
        <circle cx="80" cy="15" r="4" />
        <path d="M80 5 C85 10, 85 20, 80 25 C75 20, 75 10, 80 5 Z" />
        <path d="M70 15 C75 10, 85 10, 90 15 C85 20, 75 20, 70 15 Z" />
        <path d="M70 15 Q50 5 30 15 Q50 20 70 15 Z" />
        <path d="M30 15 Q15 8 0 15 Q15 18 30 15 Z" />
        <circle cx="10" cy="15" r="2" />
        <path d="M90 15 Q110 5 130 15 Q110 20 90 15 Z" />
        <path d="M130 15 Q145 8 160 15 Q145 18 130 15 Z" />
        <circle cx="150" cy="15" r="2" />
      </g>
    </svg>
  );
}

/**
 * FooterSection: Closing message, Couple Names & Blooming Bouquet on 8.png Background.
 */
export default function FooterSection() {
  return (
    <footer className="relative w-full py-24 px-6 bg-[#18100A] text-white text-center flex flex-col items-center justify-center space-y-8 overflow-hidden isolate">
      {/* 1. Background Photo (8.png) with Subtle Fabric Texture (background.jpg) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Thin Fabric Texture Layer */}
        <Image
          src="/assets/background.jpg"
          alt="Fabric Background Texture"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-30 mix-blend-soft-light"
        />
        {/* Main Photo 8.png */}
        <Image
          src="/assets/8.png"
          alt={`${COUPLE.groom.name} & ${COUPLE.bride.name} Background`}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover object-center scale-120 filter brightness-[0.92] contrast-[1.05]"
        />
        {/* Soft Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#18100A]/40 via-black/25 to-[#18100A]/50 z-10" />
      </div>

      {/* 2. Soft Center Ambient Gold Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#d4af37]/15 rounded-full blur-3xl pointer-events-none z-10" />

      {/* 3. Main Closing Content Stream */}
      <ScrollReveal animation="fade-up" duration={1.2} className="relative z-20 space-y-5 max-w-md mx-auto flex flex-col items-center drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
        <p className="font-cormorant italic text-lg sm:text-xl text-[#f3e5ca]/95 leading-relaxed font-light drop-shadow">
          It would be a great honor and pleasure for us if you could attend and celebrate our special day with us.
        </p>

        <div className="pt-2 flex justify-center">
          <OrnateCenterFlourish />
        </div>

        <h3 className="font-marcellus text-2xl sm:text-3xl tracking-[0.2em] text-[#f3e5ca] uppercase pt-1 drop-shadow-[0_2px_12px_rgba(243,229,202,0.5)]">
          {COUPLE.groom.name} & {COUPLE.bride.name}
        </h3>

        {/* 100% Transparent Gold Flower Bouquet Logo */}
        <div className="pt-1 flex justify-center items-center">
          <div className="relative w-56 h-56 sm:w-64 sm:h-64 filter drop-shadow-[0_0_18px_rgba(243,229,202,0.5)] transition-transform hover:scale-105">
            <Image
              src="/assets/gold-bouquet-transparent.png"
              alt="Transparent Gold Flower Bouquet Logo"
              fill
              sizes="320px"
              className="object-contain"
            />
          </div>
        </div>
      </ScrollReveal>
    </footer>
  );
}

