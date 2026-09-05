"use client";

import { useState, useEffect } from "react";
import DesktopLeftPanel from "./components/DesktopLeftPanel";
import HeroCoverSection from "./components/HeroCoverSection";
import CoupleSection from "./components/CoupleSection";
import EventSection from "./components/EventSection";
import GallerySection from "./components/GallerySection";
import RsvpSection from "./components/RsvpSection";
import WishesSection from "./components/WishesSection";
import VideoSection from "./components/VideoSection";
import FooterSection from "./components/FooterSection";
import FallingLeaves from "./components/FallingLeaves";
import MusicToggle from "./components/MusicToggle";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);


  // Lock scroll completely on body while cover is active (!isOpen)
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  const handleOpenInvitation = () => {
    setIsOpen(true);
    // Unlocks scroll access without forcing automatic scroll down, allowing user to scroll manually
  };

  return (
    <main className="min-h-screen w-full relative bg-[#0A1628]">
      {/* Falling Autumn Leaves Effect */}
      <FallingLeaves />

      {/* Floating Sparkle Music Toggle & Background Audio Player */}
      <MusicToggle />

      {/* Fixed Left Panel for Desktop View */}
      <DesktopLeftPanel />

      {/* Main Right Scrollable Content Stream (Always Natural Dimensions) */}
      <div className="w-full lg:w-[460px] xl:w-[480px] lg:ml-auto min-h-screen flex flex-col relative z-20 shadow-2xl bg-[#D5DADE]">
        {/* Cover Section */}
        <HeroCoverSection isOpen={isOpen} onOpen={handleOpenInvitation} />

        {/* Content Stream (Revealed / Scrollable) */}
        <CoupleSection />
        <EventSection />
        <RsvpSection />
        <WishesSection />
        <GallerySection />
        <VideoSection />
        <FooterSection />
      </div>
    </main>
  );
}

