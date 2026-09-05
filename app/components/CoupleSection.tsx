"use client";

import Image from "next/image";
import { COUPLE } from "../lib/config";
import { ASSETS } from "../lib/assets";
import ScrollReveal from "./ScrollReveal";

/**
 * CoupleSection: Fullscreen section with solid dark espresso brown background (#18100A).
 * Features a diagonal white satin ribbon (background.jpg) layered with 3 stacked photo cards
 * for both The Groom and The Bride.
 * Golden flower ornaments blended with radial feathered edge masks eliminating rectangular box outlines,
 * powered by calm & subtle glowing radiance (animate-flower-glow-calm).
 */
export default function CoupleSection() {
  return (
    <section id="couple-section" className="relative w-full min-h-screen py-20 bg-[#18100A] text-white flex flex-col items-center justify-between overflow-hidden">
      {/* 1. Solid Dark Espresso Chocolate Brown Base Background */}
      <div className="absolute inset-0 z-0 bg-[#18100A]" />

      {/* Seamless Top Transition Gradient */}
      <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#18100A] via-[#18100A]/80 to-transparent z-10 pointer-events-none" />

      {/* 2. GLOWING GOLDEN FLOWER ORNAMENT 1 (Top-Left - Feathered Mask + Calm Glow) */}
      <div
        className="absolute top-2 -left-8 w-72 h-72 sm:w-96 sm:h-96 pointer-events-none z-5 animate-spin-slow animate-flower-glow-calm"
        style={{
          maskImage:
            "radial-gradient(circle at center, black 65%, transparent 95%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black 65%, transparent 95%)",
          mixBlendMode: "screen",
        }}
      >
        <Image
          src={ASSETS.flowerGold}
          alt="Glowing Golden Flower"
          fill
          priority
          sizes="384px"
          className="object-contain"
        />
      </div>

      {/* 3. GROOM EXPLANATION TEXT (Top-Right Corner - Crystal Readability) */}
      <ScrollReveal animation="fade-up" duration={1} className="relative z-20 w-full px-8 sm:px-12 text-right space-y-1.5 pt-10 pb-2 ml-auto drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)]">
        <h3 className="font-script text-5xl sm:text-6xl text-[#f3e5ca] font-normal tracking-wide leading-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          The Groom
        </h3>
        <p className="font-marcellus text-xl sm:text-2xl text-white font-bold tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          {COUPLE.groom.fullName}
        </p>
        <p className="font-cormorant italic text-lg sm:text-xl text-white font-semibold tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
          Son of {COUPLE.groom.parentage.replace("Putra dari ", "")}
        </p>
        <div className="pt-1">
          <span className="font-jost text-sm text-[#f3e5ca] tracking-widest border-b border-[#f3e5ca]/60 pb-0.5 font-semibold drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
            @invitato.id
          </span>
        </div>
      </ScrollReveal>

      {/* 4. CENTRAL STACK: DIAGONAL SATIN RIBBON WITH 3 STACKED PHOTO CARDS FOR GROOM & BRIDE */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center my-6 overflow-visible isolate space-y-12">
        {/* Full-Width Diagonal Satin Ribbon Background */}
        <div className="absolute -inset-x-40 top-1/2 -translate-y-1/2 h-[300px] sm:h-[350px] bg-[#faf8f5] shadow-2xl z-10 overflow-hidden border-y border-white/20 transform rotate-[14deg] scale-130 pointer-events-none">
          <Image
            src={ASSETS.bg}
            alt="Satin Texture"
            fill
            priority
            sizes="140vw"
            className="object-cover object-center filter brightness-[0.98] contrast-[1.02]"
          />
        </div>

        {/* PHOTO CARD STACK 1: THE GROOM (3 STACKED PHOTO CARDS) */}
        <ScrollReveal animation="zoom-in" delay={0.1} duration={1.2} className="relative z-20 w-[78%] max-w-xs sm:max-w-sm aspect-[4/3] group">
          {/* Card Stack 3 (Back Photo) */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-md border-2 border-white/90 transform translate-x-5 -translate-y-5 opacity-80 pointer-events-none transition-transform group-hover:translate-x-7 group-hover:-translate-y-7">
            <Image
              src={ASSETS.gallery[3]}
              alt="Pre-wedding photo"
              fill
              priority
              sizes="(min-width: 1024px) 380px, 80vw"
              className="object-cover object-center filter brightness-[0.85] contrast-[1.02]"
            />
          </div>

          {/* Card Stack 2 (Middle Photo) */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-lg border-2 border-white/90 transform translate-x-2.5 -translate-y-2.5 opacity-90 pointer-events-none transition-transform group-hover:translate-x-3.5 group-hover:-translate-y-3.5">
            <Image
              src={ASSETS.gallery[9]}
              alt="Pre-wedding photo"
              fill
              priority
              sizes="(min-width: 1024px) 380px, 80vw"
              className="object-cover object-center filter brightness-[0.92] contrast-[1.02]"
            />
          </div>

          {/* Card Stack 1 (Main Front Photo Card) */}
          <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border-2 border-white/90 bg-white">
            <Image
              src={COUPLE.groom.photo}
              alt={COUPLE.groom.fullName}
              fill
              priority
              sizes="(min-width: 1024px) 380px, 80vw"
              className="object-cover object-top filter brightness-[0.98] contrast-[1.02]"
            />
          </div>
        </ScrollReveal>

        {/* PHOTO CARD STACK 2: THE BRIDE (3 STACKED PHOTO CARDS) */}
        <ScrollReveal animation="zoom-in" delay={0.2} duration={1.2} className="relative z-30 w-[78%] max-w-xs sm:max-w-sm aspect-[4/3] group">
          {/* Card Stack 3 (Back Photo) */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-md border-2 border-white/90 transform -translate-x-5 -translate-y-5 opacity-80 pointer-events-none transition-transform group-hover:-translate-x-7 group-hover:-translate-y-7">
            <Image
              src={ASSETS.gallery[8]}
              alt="Pre-wedding photo"
              fill
              priority
              sizes="(min-width: 1024px) 380px, 80vw"
              className="object-cover object-center filter brightness-[0.85] contrast-[1.02]"
            />
          </div>

          {/* Card Stack 2 (Middle Photo) */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-lg border-2 border-white/90 transform -translate-x-2.5 -translate-y-2.5 opacity-90 pointer-events-none transition-transform group-hover:-translate-x-3.5 group-hover:-translate-y-3.5">
            <Image
              src={ASSETS.gallery[2]}
              alt="Pre-wedding photo"
              fill
              priority
              sizes="(min-width: 1024px) 380px, 80vw"
              className="object-cover object-center filter brightness-[0.92] contrast-[1.02]"
            />
          </div>

          {/* Card Stack 1 (Main Front Photo Card) */}
          <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border-2 border-white/90 bg-white">
            <Image
              src={COUPLE.bride.photo}
              alt={COUPLE.bride.fullName}
              fill
              priority
              sizes="(min-width: 1024px) 380px, 80vw"
              className="object-cover object-top filter brightness-[0.98] contrast-[1.02]"
            />
          </div>
        </ScrollReveal>
      </div>

      {/* 5. GLOWING GOLDEN FLOWER ORNAMENT 2 (Bottom-Right - Feathered Mask + Calm Glow) */}
      <div
        className="absolute bottom-2 -right-8 w-72 h-72 sm:w-96 sm:h-96 pointer-events-none z-5 animate-spin-slow-reverse animate-flower-glow-calm"
        style={{
          maskImage:
            "radial-gradient(circle at center, black 65%, transparent 95%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black 65%, transparent 95%)",
          mixBlendMode: "screen",
        }}
      >
        <Image
          src={ASSETS.flowerGold}
          alt="Glowing Golden Flower"
          fill
          sizes="384px"
          className="object-contain"
        />
      </div>

      {/* 6. BRIDE EXPLANATION TEXT (Bottom-Left Corner - Crystal Readability) */}
      <ScrollReveal animation="fade-up" duration={1} delay={0.1} className="relative z-20 w-full px-8 sm:px-12 text-left space-y-1.5 pt-2 pb-10 mr-auto drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)]">
        <h3 className="font-script text-5xl sm:text-6xl text-[#f3e5ca] font-normal tracking-wide leading-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          The Bride
        </h3>
        <p className="font-marcellus text-xl sm:text-2xl text-white font-bold tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          {COUPLE.bride.fullName}
        </p>
        <p className="font-cormorant italic text-lg sm:text-xl text-white font-semibold tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
          Daughter of {COUPLE.bride.parentage.replace("Putri dari ", "")}
        </p>
        <div className="pt-1">
          <span className="font-jost text-sm text-[#f3e5ca] tracking-widest border-b border-[#f3e5ca]/60 pb-0.5 font-semibold drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
            @invitato.id
          </span>
        </div>
      </ScrollReveal>
    </section>
  );
}

