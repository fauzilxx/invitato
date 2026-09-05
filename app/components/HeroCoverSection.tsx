"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronDown, MailOpen } from "lucide-react";
import { gsap } from "gsap";
import { HERO_IMAGES, COUPLE } from "../lib/config";
import { ASSETS } from "../lib/assets";

interface HeroCoverSectionProps {
  isOpen: boolean;
  onOpen: () => void;
}

/**
 * HeroCoverSection: The opening cover / landing view for the invitation.
 * Features 100% seamless entrance GSAP sequence & exit unveil transition.
 */
export default function HeroCoverSection({
  isOpen,
  onOpen,
}: HeroCoverSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const titleSubRef = useRef<HTMLParagraphElement>(null);
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const titleTagRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const onOpenRef = useRef(onOpen);
  onOpenRef.current = onOpen;

  // 1. Entrance GSAP Animation Sequence on Mount
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
        // Scroll stays locked — user must press the button to unlock
      });

      tl.fromTo(
        bgRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.5, delay: 0.1 }
      )
        .fromTo(
          frameRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1.3 },
          "-=1.1"
        )
        .fromTo(
          titleSubRef.current,
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          "-=0.9"
        )
        .fromTo(
          titleMainRef.current,
          { y: -15, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.0 },
          "-=0.8"
        )
        .fromTo(
          titleTagRef.current,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          "-=0.7"
        )
        .fromTo(
          buttonRef.current,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
          "-=0.6"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-[#18100A] isolate select-none"
    >
      {/* ========================================================= */}
      {/* 1. CRYSTAL SHARP HD PHOTO LAYER (Photo 8.png)            */}
      {/* ========================================================= */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      >
        {/* Crisp HD Background Image */}
        <Image
          src={HERO_IMAGES.coverRight}
          alt={`${COUPLE.groom.name} & ${COUPLE.bride.name}`}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover object-center filter brightness-[0.92] contrast-[1.05]"
        />

        {/* Soft Vignette Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/10 to-black/40" />

        {/* 100% Seamless Bottom Transition Gradient (Fades into #18100A) */}
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#18100A] via-[#18100A]/70 to-transparent z-15" />
      </div>

      {/* ========================================================= */}
      {/* 2. FLORAL FRAME OVERLAY (Blooming Rose Effect)           */}
      {/* ========================================================= */}
      <div
        ref={frameRef}
        className="absolute inset-0 z-20 pointer-events-none animate-bloom-pulse"
        style={{
          backgroundImage: `url('${ASSETS.frameFloral}')`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          mixBlendMode: "screen",
        }}
      />

      {/* ========================================================= */}
      {/* 3. TOP HEADER ('RICKY' in black, rest in white)           */}
      {/* ========================================================= */}
      <div className="relative z-30 pt-36 sm:pt-40 px-4 text-center text-white my-auto w-full">
        <p
          ref={titleSubRef}
          className="font-jost text-xs sm:text-sm uppercase tracking-[0.35em] text-white/90 font-semibold mb-3 drop-shadow-md"
        >
          The Wedding of
        </p>
        <h1
          ref={titleMainRef}
          className="font-marcellus text-2xl sm:text-3xl lg:text-2xl xl:text-3xl tracking-wider leading-tight whitespace-nowrap"
        >
          <span className="text-black font-bold">
            {COUPLE.groom.name.toUpperCase()}
          </span>{" "}
          <span className="font-script text-3xl sm:text-4xl text-white font-normal lowercase tracking-normal mx-0.5 drop-shadow-md">
            and
          </span>{" "}
          <span className="text-white drop-shadow-md">
            {COUPLE.bride.fullName ? COUPLE.bride.name.toUpperCase() : "FELLYCIA"}
          </span>
        </h1>
        <p
          ref={titleTagRef}
          className="font-script text-2xl sm:text-3xl tracking-wide text-white/90 font-normal mt-2 drop-shadow-md"
        >
          {COUPLE.hashtag}
        </p>
      </div>

      {/* ========================================================= */}
      {/* 4. BOTTOM SCROLL DOWN / BUKA UNDANGAN BUTTON             */}
      {/* ========================================================= */}
      <div
        ref={buttonRef}
        onClick={() => {
          // Unlock scroll so user can manually scroll after clicking
          onOpenRef.current();
          // Play music (guaranteed user gesture)
          if (typeof window !== "undefined" && typeof (window as any).__playAudio === "function") {
            (window as any).__playAudio();
          }
        }}
        className="relative z-30 pb-12 px-6 sm:px-10 flex flex-col items-center text-center cursor-pointer select-none group"
      >
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/60 shadow-[0_0_25px_rgba(255,255,255,0.4)] flex items-center justify-center animate-bounce group-hover:bg-white/30 transition-all">
            <Image
              src={ASSETS.scrollDown}
              alt="Scroll Down Icon"
              width={34}
              height={34}
              className="object-contain invert filter drop-shadow-md"
            />
          </div>
          <span className="font-jost text-[11px] sm:text-xs uppercase tracking-[0.25em] text-white font-bold drop-shadow-md group-hover:text-[#f3e5ca] transition-colors">
            Scroll Down
          </span>
        </div>
      </div>
    </section>
  );
}

