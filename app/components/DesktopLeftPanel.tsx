"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import AccordionGallery from "./AccordionGallery";
import { COUPLE, QUOTE } from "../lib/config";

/**
 * DesktopLeftPanel: Fixed left side banner for Desktop view.
 * Uses an interactive full-height GSAP Accordion Gallery showcasing 4 curated photos
 * (1.png, 2.png, 3.png, 9.png) with sequential staggered entrance sequence.
 */
export default function DesktopLeftPanel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerSubRef = useRef<HTMLParagraphElement>(null);
  const headerTitleRef = useRef<HTMLHeadingElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const galleryWrapperRef = useRef<HTMLDivElement>(null);

  const leftGalleryItems = [
    {
      image: "/assets/1.png",
      label: "Ocean Pre-wedding",
      alt: "Ricky & Fellycia on the yacht",
    },
    {
      image: "/assets/2.png",
      label: "Golden Hour Romance",
      alt: "Ricky & Fellycia in lounge",
    },
    {
      image: "/assets/3.png",
      label: "Pure Elegance",
      alt: "Ricky & Fellycia classic pose",
    },
    {
      image: "/assets/9.png",
      label: "Studio Portrait",
      alt: "Ricky & Fellycia studio shot",
    },
  ];

  // GSAP Staggered Entrance Animation for Header & Accordion Panels
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Select accordion panels
      const panels = galleryWrapperRef.current?.querySelectorAll(".ag-panel");

      // 1. Header elements entrance from top
      tl.fromTo(
        headerSubRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0, delay: 0.1 }
      )
        .fromTo(
          headerTitleRef.current,
          { y: -25, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.1 },
          "-=0.8"
        )
        .fromTo(
          quoteRef.current,
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.0 },
          "-=0.8"
        );

      // 2. Accordion Gallery Wrapper smooth reveal from bottom
      if (galleryWrapperRef.current) {
        tl.fromTo(
          galleryWrapperRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.3,
            ease: "power3.out",
          },
          "-=0.9"
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <aside
      ref={containerRef}
      className="hidden lg:block fixed left-0 top-0 bottom-0 lg:right-[460px] xl:right-[480px] overflow-hidden z-10 bg-[#0A1628]"
    >
      <div className="relative w-full h-full">
        {/* 1. Accordion Gallery Component - Full Height */}
        <div ref={galleryWrapperRef} className="w-full h-full">
          <AccordionGallery
            items={leftGalleryItems}
            defaultIndex={0}
            expandRatio={0.58}
            trigger="hover"
            accentColor="#ffffff"
            overlayColor="#0A1628"
            textColor="#ffffff"
            grayscale={false}
            showLabels={true}
            duration={0.85}
            ease="power2.out"
            parallax={0.5}
            tilt={0}
            stagger={0.06}
            height={800}
            gap={6}
            radius={0}
            orientation="horizontal"
            className="h-full !h-screen"
          />
        </div>

        {/* 2. Soft Vignette Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-transparent to-black/50 pointer-events-none z-15" />

        {/* 3. Futuristic Subtle Line Accents */}
        <svg
          className="absolute top-0 right-0 h-full w-48 text-white/15 pointer-events-none z-15"
          viewBox="0 0 100 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 50,0 Q 80,300 20,500 T 50,800"
            stroke="currentColor"
            strokeWidth="0.75"
          />
          <path
            d="M 70,0 Q 100,250 40,550 T 80,800"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeDasharray="4 4"
          />
        </svg>

        {/* 4. Top-Left Header Content */}
        <div className="absolute top-10 left-12 right-12 z-20 space-y-3 max-w-md text-white drop-shadow-lg pointer-events-none">
          <p
            ref={headerSubRef}
            className="font-jost text-xs uppercase tracking-[0.35em] text-white/80 font-medium"
          >
            The Wedding of
          </p>

          <h1
            ref={headerTitleRef}
            className="font-marcellus text-3xl xl:text-4xl tracking-wide text-white leading-tight"
          >
            {COUPLE.groom.name.toUpperCase()}{" "}
            <span className="font-script text-3xl xl:text-4xl text-white/90 font-normal lowercase tracking-normal mx-1">
              and
            </span>{" "}
            {COUPLE.bride.name.toUpperCase()}
          </h1>

          {/* Quote Card */}
          <div ref={quoteRef} className="pt-1">
            <blockquote className="font-cormorant italic text-base xl:text-lg text-white/90 leading-relaxed font-light">
              {QUOTE.text}
            </blockquote>
            <p className="font-jost text-xs text-white/75 font-medium tracking-wider mt-1.5">
              — {QUOTE.source}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

