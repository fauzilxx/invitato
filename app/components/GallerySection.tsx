"use client";

import DriftWall, { DriftWallItem } from "./DriftWall";
import ScrollReveal from "./ScrollReveal";
import StarryNightCanvas from "./StarryNightCanvas";

/**
 * GallerySection: Pre-wedding photo gallery using React Bits 3D DriftWall.
 * Renders DriftWall seamlessly as the full background of the section with zero borders and dimming overlay.
 */
export default function GallerySection() {
  // Excluded: photos 5 & 6. Required in ALL columns: 8 photos (1, 2, 3, 4, 7, 8, 9, 10)
  const p1 = { image: "/assets/1.png", title: "Pre-wedding Moment 1" };
  const p2 = { image: "/assets/2.png", title: "Pre-wedding Moment 2" };
  const p3 = { image: "/assets/3.png", title: "Pre-wedding Moment 3" };
  const p4 = { image: "/assets/4.png", title: "Pre-wedding Moment 4" };
  const p7 = { image: "/assets/7.png", title: "Pre-wedding Moment 7" };
  const p8 = { image: "/assets/8.png", title: "Pre-wedding Moment 8" };
  const p9 = { image: "/assets/9.png", title: "Pre-wedding Moment 9" };
  const p10 = { image: "/assets/10.png", title: "Pre-wedding Moment 10" };

  // 3 Columns: Each column MUST contain ALL 8 photos in a unique sequence/order
  const galleryColumns: DriftWallItem[][] = [
    [p1, p2, p3, p4, p7, p8, p9, p10],
    [p7, p9, p1, p10, p3, p8, p2, p4],
    [p4, p8, p10, p2, p9, p1, p7, p3],
  ];

  return (
    <section className="relative w-full min-h-screen py-24 px-4 sm:px-6 bg-gradient-to-b from-[#18100A] via-[#140D09] to-[#0A0E18] text-white flex flex-col items-center justify-between overflow-hidden isolate">
      {/* Dynamic Starry Night & Shooting Stars Canvas */}
      <StarryNightCanvas />
      {/* 3D Infinite Drifting Wall Background (Seamless, Borderless) */}
      <div className="absolute inset-0 z-0 opacity-95 pointer-events-auto">
        <DriftWall
          items={galleryColumns}
          columns={3}
          tileWidth={130}
          tileHeight={180}
          gap={12}
          tilt={10}
          turn={-6}
          perspective={1200}
          depth={50}
          speed={35}
          direction="up"
          variance={0.3}
          parallax={0.5}
          lift={45}
          fade={0.1}
          dim={0.9}
          overlayColor="#18100A"
          radius={12}
          pauseOnHover={false}
          grayscale={false}
        />
      </div>

      {/* Soft Center Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none z-5" />

      {/* Header Overlay */}
      <ScrollReveal animation="fade-up" duration={1} className="relative z-20 w-full max-w-md mx-auto text-center space-y-3 drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] pointer-events-none">
        <p className="font-jost text-xs uppercase tracking-[0.35em] text-[#f3e5ca]/80 font-medium">
          Our Happy Moments
        </p>
        <h2 className="font-marcellus text-3xl sm:text-4xl text-[#f3e5ca] tracking-[0.2em] font-light uppercase leading-tight drop-shadow">
          Galeri Foto
        </h2>
        <div className="w-14 h-[1.5px] bg-[#f3e5ca]/60 mx-auto mt-3" />
      </ScrollReveal>
    </section>
  );
}

