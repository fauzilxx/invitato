"use client";

import Image from "next/image";
import { Calendar, MapPin } from "lucide-react";
import { EVENT, TIMELINE, COUPLE, MAPS } from "../lib/config";
import WebThreads from "./WebThreads";
import FireworksCanvas from "./FireworksCanvas";
import CountdownSection from "./CountdownSection";
import ScrollReveal from "./ScrollReveal";

/**
 * EXPLODING FIREWORKS BURSTS LAYER
 */
function FireworksLayer() {
  return (
    <div className="absolute inset-0 pointer-events-none z-15 overflow-hidden">
      {/* Animated Fireworks Explosions & Sparks */}
      <FireworksCanvas className="top-0 inset-x-0 h-full w-full" />
    </div>
  );
}

/**
 * Custom line-art icons matching reference timeline visual style
 */
function TimelineIcon({ type }: { type: string }) {
  switch (type) {
    case "rings":
      return (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="w-5 h-5 sm:w-6 sm:h-6"
        >
          <circle cx="18" cy="27" r="9" />
          <circle cx="30" cy="27" r="9" />
          <path d="M18 18L20 14H16L18 18Z" strokeWidth="1.4" />
          <path d="M18 14V11" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M15 12.5H21" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
    case "toast":
      return (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="w-5 h-5 sm:w-6 sm:h-6"
        >
          <path
            d="M13 11L18 24C18 27 15 29 15 29H8M15 29V37M11 37H19"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M35 11L30 24C30 27 33 29 33 29H40M33 29V37M29 37H37"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M21 16L27 14" strokeLinecap="round" strokeDasharray="1 2" />
        </svg>
      );
    case "lunch":
      return (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="w-5 h-5 sm:w-6 sm:h-6"
        >
          <circle cx="24" cy="24" r="11" />
          <circle cx="24" cy="24" r="7" strokeDasharray="2 2" />
          <path
            d="M10 14V22C10 24 12 25 12 27V36M7 14V20M13 14V20"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M38 14V27C38 27 38 36 38 36M38 14C38 14 34 18 34 24C34 26 38 27 38 27"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "cake":
      return (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="w-5 h-5 sm:w-6 sm:h-6"
        >
          <rect x="9" y="28" width="30" height="11" rx="2" />
          <rect x="14" y="18" width="20" height="10" rx="2" />
          <rect x="18" y="11" width="12" height="7" rx="1.5" />
          <path d="M24 7V11" strokeLinecap="round" />
          <circle cx="24" cy="5.5" r="1" fill="currentColor" />
          <path d="M9 33H39" strokeDasharray="2 2" />
          <path d="M14 23H34" strokeDasharray="2 2" />
        </svg>
      );
    case "cocktail":
      return (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="w-5 h-5 sm:w-6 sm:h-6"
        >
          <path
            d="M15 12L20 30C20.5 32 22 33 24 33C26 33 27.5 32 28 30L33 12Z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M24 33V40M18 40H30" strokeLinecap="round" />
          <path d="M19 18H29" strokeLinecap="round" />
          <path d="M29 8L22 22" strokeLinecap="round" />
          <circle cx="32" cy="11" r="2.5" />
        </svg>
      );
    case "music":
      return (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="w-5 h-5 sm:w-6 sm:h-6"
        >
          <circle cx="15" cy="34" r="4" />
          <circle cx="33" cy="28" r="4" />
          <path
            d="M19 34V14L37 8V28"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M19 20L37 14" strokeLinecap="round" />
        </svg>
      );
    case "dinner":
      return (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="w-5 h-5 sm:w-6 sm:h-6"
        >
          <path
            d="M8 32H40M10 32C10 20 16 15 24 15C32 15 38 20 38 32"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M6 36H42" strokeLinecap="round" />
          <circle cx="24" cy="12" r="2.5" />
        </svg>
      );
    case "fireworks":
      return (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="w-5 h-5 sm:w-6 sm:h-6"
        >
          <path d="M24 7V13M24 35V41M7 24H13M35 24H41" strokeLinecap="round" />
          <path
            d="M12 12L16.5 16.5M31.5 31.5L36 36M36 12L31.5 16.5M16.5 31.5L12 36"
            strokeLinecap="round"
          />
          <circle cx="24" cy="24" r="3" />
          <circle cx="18" cy="9" r="1" fill="currentColor" />
          <circle cx="39" cy="18" r="1" fill="currentColor" />
          <circle cx="30" cy="39" r="1" fill="currentColor" />
          <circle cx="9" cy="30" r="1" fill="currentColor" />
        </svg>
      );
    default:
      return null;
  }
}

/**
 * EventSection: Wedding Timeline section with Golden Moon, Bintang Kejora & Fireworks atmosphere.
 */
export default function EventSection() {
  return (
    <section className="relative w-full py-20 px-4 sm:px-6 bg-[#18100A] text-white flex flex-col items-center overflow-hidden">
      {/* 1. WebThreads WebGL Golden Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-90">
        <WebThreads
          color1="#8C4A1A"
          color2="#D4AF37"
          color3="#FFF2D4"
          speed={0.15}
          threadCount={5}
          frequency={3.5}
          spread={0.12}
          taper={0.9}
          position={0.5}
          fanMode="center"
          glow={0.012}
          falloff={0.7}
          thickness={0.55}
          brightness={0.55}
          opacity={0.85}
          mirror
          shimmer={false}
          grain={false}
          mouseInteraction={false}
          backgroundColor="#18100A"
        />
      </div>

      {/* 2. GLOWING GOLDEN MOON (Top-Right Corner - Feathered Soft Golden Glow) */}
      <div
        className="absolute top-2 -right-8 sm:top-3 sm:-right-10 w-36 h-36 sm:w-44 sm:h-44 pointer-events-none z-15 filter brightness-[1.08] contrast-[1.05] drop-shadow-[0_0_22px_rgba(212,175,55,0.45)]"
        style={{
          maskImage:
            "radial-gradient(circle at center, black 48%, rgba(0,0,0,0.85) 58%, transparent 68%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black 48%, rgba(0,0,0,0.85) 58%, transparent 68%)",
        }}
      >
        <Image
          src="/assets/golden-moon.jpg"
          alt="Glowing Golden Moon"
          fill
          priority
          sizes="200px"
          className="object-contain"
          style={{ mixBlendMode: "screen" }}
        />
      </div>

      {/* 3. EXPLODING FIREWORKS BURSTS LAYER */}
      <FireworksLayer />

      {/* Seamless Top & Bottom Transition Gradients */}
      <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-[#18100A] via-[#18100A]/70 to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-[#18100A] via-[#18100A]/70 to-transparent z-10 pointer-events-none" />

      {/* Soft Center Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#d4af37]/15 rounded-full blur-3xl pointer-events-none z-5" />

      {/* Content Stream (Enclosed in 100% Crystal Clear Golden Frame, Zero Blur) */}
      <ScrollReveal animation="zoom-in" duration={1.1} className="relative z-20 w-full max-w-md mx-auto space-y-8 p-6 sm:p-8 rounded-3xl border border-[#f3e5ca]/80 bg-transparent shadow-[0_0_24px_rgba(243,229,202,0.15)]">
        {/* Header Title matching reference */}
        <div className="text-center space-y-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
          <h2 className="font-marcellus text-3xl sm:text-4xl text-[#f3e5ca] tracking-[0.25em] font-light uppercase leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
            WEDDING
            <br />
            TIMELINE
          </h2>
          <div className="w-14 h-[1.5px] bg-[#f3e5ca]/60 mx-auto my-3" />

          {/* Date & Location Details directly under title */}
          <div className="pt-1 pb-1 space-y-1.5 font-cormorant text-base sm:text-lg text-white max-w-xs mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
            <div className="flex items-center justify-center space-x-2 text-[#f3e5ca]">
              <Calendar className="w-4 h-4 text-[#f3e5ca] shrink-0" />
              <span className="font-semibold tracking-wide">{EVENT.date}</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-white/90 text-xs sm:text-sm font-jost">
              <MapPin className="w-3.5 h-3.5 text-[#f3e5ca] shrink-0" />
              <span className="tracking-wide">{EVENT.location}</span>
            </div>
          </div>
        </div>

        {/* Timeline Container */}
        <div className="relative w-full py-4 px-1">
          {/* Center Vertical Axis Line */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1.5px] bg-gradient-to-b from-[#f3e5ca]/30 via-[#f3e5ca]/60 to-[#f3e5ca]/30" />

          {/* Timeline Nodes */}
          <div className="space-y-10 sm:space-y-12 relative">
            {TIMELINE.map((item, idx) => {
              const isRight = item.side === "right";

              return (
                <ScrollReveal
                  key={idx}
                  animation={isRight ? "slide-right" : "slide-left"}
                  delay={idx * 0.1}
                  duration={0.8}
                  className="relative flex items-center w-full min-h-[64px]"
                >
                  {/* Left Side Content */}
                  <div className="w-1/2 pr-3 sm:pr-5 text-right flex flex-col items-end justify-center">
                    {!isRight && (
                      <div className="space-y-0.5">
                        <span className="font-jost text-xs sm:text-sm font-bold text-[#f3e5ca] tracking-wider block">
                          {item.time}
                        </span>
                        <h4 className="font-marcellus text-xs sm:text-sm text-white font-medium uppercase tracking-widest leading-tight">
                          {item.title}
                        </h4>
                        {item.subtitle && (
                          <p className="font-cormorant italic text-[11px] sm:text-xs text-[#f3e5ca]/70">
                            {item.subtitle}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Center Node (Icon & Horizontal Line Connector) */}
                  <div className="relative z-10 flex items-center justify-center shrink-0">
                    {/* Connector line pointing Left */}
                    {!isRight && (
                      <div className="absolute right-1/2 w-3 sm:w-5 h-[1.5px] bg-[#f3e5ca]/50 -translate-x-3 sm:-translate-x-4" />
                    )}

                    {/* Icon Circle */}
                    <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#18100A] border border-[#f3e5ca]/60 flex items-center justify-center text-[#f3e5ca] shadow-md transition-transform hover:scale-110 hover:border-[#f3e5ca]">
                      <TimelineIcon type={item.iconType} />
                    </div>

                    {/* Connector line pointing Right */}
                    {isRight && (
                      <div className="absolute left-1/2 w-3 sm:w-5 h-[1.5px] bg-[#f3e5ca]/50 translate-x-3 sm:translate-x-4" />
                    )}
                  </div>

                  {/* Right Side Content */}
                  <div className="w-1/2 pl-3 sm:pl-5 text-left flex flex-col items-start justify-center">
                    {isRight && (
                      <div className="space-y-0.5">
                        <span className="font-jost text-xs sm:text-sm font-bold text-[#f3e5ca] tracking-wider block">
                          {item.time}
                        </span>
                        <h4 className="font-marcellus text-xs sm:text-sm text-white font-medium uppercase tracking-widest leading-tight">
                          {item.title}
                        </h4>
                        {item.subtitle && (
                          <p className="font-cormorant italic text-[11px] sm:text-xs text-[#f3e5ca]/70">
                            {item.subtitle}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        {/* Bottom Signature matching reference "Mariana + Oliver" -> "Ricky + Fellycia" */}
        <ScrollReveal animation="fade-up" delay={0.2} className="text-center pt-6 pb-2">
          <p className="font-script text-4xl sm:text-5xl text-[#f3e5ca] tracking-wide font-normal drop-shadow">
            {COUPLE.groom.name} + {COUPLE.bride.name}
          </p>
        </ScrollReveal>

        {/* Integrated Countdown Section (Same Page Flow) */}
        <ScrollReveal animation="fade-up" delay={0.3} className="pt-6 border-t border-[#f3e5ca]/30">
          <CountdownSection />
        </ScrollReveal>

        {/* Integrated Location Map Section (Right Below Countdown) */}
        <ScrollReveal animation="fade-up" delay={0.4} className="pt-8 border-t border-[#f3e5ca]/30 space-y-6">
          <div className="text-center space-y-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
            <h3 className="font-marcellus text-2xl sm:text-3xl text-[#f3e5ca] tracking-[0.2em] font-light uppercase leading-tight drop-shadow">
              LOCATION MAP
            </h3>
            <div className="w-14 h-[1.5px] bg-[#f3e5ca]/60 mx-auto mt-2" />
          </div>

          {/* 3-Photo Seamless Collage Grid (Borderless, Clean) */}
          <div className="grid grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-lg h-[270px] sm:h-[310px] w-full border border-[#f3e5ca]/30">
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
        </ScrollReveal>
      </ScrollReveal>
    </section>
  );
}

