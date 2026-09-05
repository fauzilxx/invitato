"use client";

import { useEffect, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollReveal from "./ScrollReveal";

/**
 * Line-art icon of 2 clinking champagne flutes with sparkles overhead matching reference design
 */
function ChampagneGlassesIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      className={`text-[#f3e5ca] filter drop-shadow-[0_0_12px_rgba(243,229,202,0.6)] ${className}`}
    >
      {/* Sparkles / Stars above */}
      <path d="M32 4L33.5 8.5L38 10L33.5 11.5L32 16L30.5 11.5L26 10L30.5 8.5L32 4Z" fill="currentColor" stroke="none" />
      <path d="M18 10L19 13L22 14L19 15L18 18L17 15L14 14L17 13L18 10Z" fill="currentColor" stroke="none" />
      <path d="M46 10L47 13L50 14L47 15L46 18L45 15L42 14L45 13L46 10Z" fill="currentColor" stroke="none" />
      {/* Left Glass */}
      <path d="M23 22H33L31 38C30.5 40 29 41 27 41C25 41 23.5 40 23 38L22 22Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M27 41V54M20 54H34" strokeLinecap="round" strokeLinejoin="round" />
      {/* Right Glass */}
      <path d="M41 22H31L33 38C33.5 40 35 41 37 41C39 41 40.5 40 41 38L42 22Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M37 41V54M30 54H44" strokeLinecap="round" strokeLinejoin="round" />
      {/* Liquid / Bubbles */}
      <path d="M24 28H32" strokeDasharray="1 2" strokeLinecap="round" />
      <path d="M32 28H40" strokeDasharray="1 2" strokeLinecap="round" />
      <circle cx="28" cy="25" r="1" fill="currentColor" />
      <circle cx="36" cy="25" r="1" fill="currentColor" />
    </svg>
  );
}

/**
 * Ornate Baroque Gold Corner Ornament matching reference image frame
 */
function OrnateCornerOrnament({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-14 h-14 sm:w-16 sm:h-16 text-[#f3e5ca] filter drop-shadow-[0_0_8px_rgba(212,175,55,0.6)] ${className}`}
    >
      <defs>
        <linearGradient id="goldCornerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF2D4" />
          <stop offset="50%" stopColor="#F3E5CA" />
          <stop offset="80%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#99783D" />
        </linearGradient>
      </defs>
      {/* Corner Frame Lines */}
      <path d="M2 100 V12 C2 6.47 6.47 2 12 2 H100" stroke="url(#goldCornerGrad)" strokeWidth="2.5" fill="none" />
      <path d="M8 100 V18 C8 12.47 12.47 8 18 8 H100" stroke="url(#goldCornerGrad)" strokeWidth="1.2" fill="none" opacity="0.8" />
      
      {/* Filigree Floral & Leaf Ornaments */}
      <g fill="url(#goldCornerGrad)">
        <path d="M14 14 C22 6, 38 6, 44 14 C36 22, 22 22, 14 14 Z" />
        <path d="M14 14 C6 22, 6 38, 14 44 C22 36, 22 22, 14 14 Z" />
        <path d="M18 18 C30 12, 42 18, 38 30 C28 36, 18 30, 18 18 Z" opacity="0.9" />
        
        {/* Top Branch Tendril */}
        <path d="M44 8 C58 2, 75 6, 82 14 C70 18, 56 14, 44 8 Z" />
        <path d="M72 4 C85 0, 95 4, 100 10 C90 12, 80 8, 72 4 Z" />

        {/* Left Branch Tendril */}
        <path d="M8 44 C2 58, 6 75, 14 82 C18 70, 14 56, 8 44 Z" />
        <path d="M4 72 C0 85, 4 95, 10 100 C12 90, 8 80, 4 72 Z" />

        {/* Swirling Inner Spirals */}
        <path d="M26 26 C40 40, 50 30, 35 20 Z" opacity="0.85" />
        <path d="M26 26 C40 40, 30 50, 20 35 Z" opacity="0.85" />

        <circle cx="12" cy="12" r="3.5" />
        <circle cx="24" cy="24" r="2.5" />
        <circle cx="38" cy="38" r="2" />
        <circle cx="58" cy="10" r="1.8" />
        <circle cx="10" cy="58" r="1.8" />
      </g>
    </svg>
  );
}

/**
 * Top & Bottom Center Gold Flourish Badge
 */
function OrnateCenterFlourish({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-32 h-6 sm:w-40 sm:h-7 text-[#f3e5ca] filter drop-shadow-[0_0_8px_rgba(212,175,55,0.6)] ${className}`}
    >
      <defs>
        <linearGradient id="goldCenterGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#D4AF37" />
          <stop offset="50%" stopColor="#FFF2D4" />
          <stop offset="100%" stopColor="#D4AF37" />
        </linearGradient>
      </defs>
      <g fill="url(#goldCenterGrad)">
        {/* Center Blossom */}
        <circle cx="80" cy="15" r="4" />
        <path d="M80 5 C85 10, 85 20, 80 25 C75 20, 75 10, 80 5 Z" />
        <path d="M70 15 C75 10, 85 10, 90 15 C85 20, 75 20, 70 15 Z" />
        {/* Left Side Scroll */}
        <path d="M70 15 Q50 5 30 15 Q50 20 70 15 Z" />
        <path d="M30 15 Q15 8 0 15 Q15 18 30 15 Z" />
        <circle cx="10" cy="15" r="2" />
        {/* Right Side Scroll */}
        <path d="M90 15 Q110 5 130 15 Q110 20 90 15 Z" />
        <path d="M130 15 Q145 8 160 15 Q145 18 130 15 Z" />
        <circle cx="150" cy="15" r="2" />
      </g>
    </svg>
  );
}

/**
 * Ornate Gold Frame Container with 4 Baroque Filigree Corners
 */
function OrnateGoldFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full max-w-md mx-auto p-6 sm:p-9 rounded-2xl bg-gradient-to-b from-[#22160F]/90 via-[#1C110A]/95 to-[#22160F]/90 border border-[#f3e5ca]/60 shadow-[0_0_35px_rgba(212,175,55,0.2)] backdrop-blur-md">
      {/* 4 Corner Ornaments */}
      <OrnateCornerOrnament className="absolute -top-1 -left-1 z-30" />
      <OrnateCornerOrnament className="absolute -top-1 -right-1 z-30 scale-x-[-1]" />
      <OrnateCornerOrnament className="absolute -bottom-1 -left-1 z-30 scale-y-[-1]" />
      <OrnateCornerOrnament className="absolute -bottom-1 -right-1 z-30 scale-x-[-1] scale-y-[-1]" />

      {/* Top & Bottom Center Flourishes */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
        <OrnateCenterFlourish />
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-30 rotate-180">
        <OrnateCenterFlourish />
      </div>

      {/* Inner Double Inset Gold Border Line */}
      <div className="absolute inset-2 sm:inset-3 rounded-xl border border-[#f3e5ca]/30 pointer-events-none z-20" />

      {/* Frame Content */}
      <div className="relative z-20">{children}</div>
    </div>
  );
}

export default function RsvpSection() {
  const [formData, setFormData] = useState({
    guest_name: "",
    phone_code: "+ 62",
    phone_number: "",
    address: "",
    email: "",
    attendance: "hadir" as "hadir" | "tidak_hadir",
    events: ["reception"],
    guest_count: 2,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isSubmitted) {
      setTimeout(() => {
        if (typeof window !== "undefined") {
          gsap.registerPlugin(ScrollTrigger);
          ScrollTrigger.refresh();
        }
      }, 150);
    }
  }, [isSubmitted]);

  const handleEventToggle = (eventId: string) => {
    setFormData((prev) => {
      const exists = prev.events.includes(eventId);
      if (exists) {
        return { ...prev, events: prev.events.filter((e) => e !== eventId) };
      } else {
        return { ...prev, events: [...prev.events, eventId] };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.guest_name.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guest_name: formData.guest_name,
          phone_code: formData.phone_code,
          phone_number: formData.phone_number,
          address: formData.address,
          email: formData.email,
          attendance: formData.attendance,
          events: formData.events,
          guest_count: Number(formData.guest_count),
        }),
      });

      if (res.ok) {
        setIsSubmitted(true);
      } else {
        const data = await res.json();
        setErrorMessage(data.message || "Failed to confirm attendance.");
      }
    } catch {
      setErrorMessage("A network error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="rsvp-section"
      className="relative w-full py-28 px-6 sm:px-10 bg-[#18100A] text-white flex flex-col items-center overflow-hidden"
    >
      {/* Soft Center Ambient Gold Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none z-0" />

      {/* Main Content Container wrapped in Ornate Gold Frame */}
      <ScrollReveal animation="zoom-in" duration={1.1} className="relative z-10 w-full max-w-md mx-auto">
        <OrnateGoldFrame>
          <div className="space-y-8">
            {/* Top Confirmation Script Header & Champagne Icon */}
            <ScrollReveal animation="fade-down" delay={0.1} duration={0.9} className="flex flex-col items-center text-center space-y-2">
              <ChampagneGlassesIcon className="w-14 h-14 sm:w-16 sm:h-16 mb-1" />
              <h2 className="font-script text-4xl sm:text-5xl text-[#f3e5ca] tracking-wide font-normal drop-shadow-[0_2px_12px_rgba(243,229,202,0.4)]">
                Confirmation
              </h2>
            </ScrollReveal>

        {isSubmitted ? (
          <div className="bg-[#22160F] p-8 rounded-2xl border border-[#f3e5ca]/50 text-center space-y-4 shadow-2xl animate-fade-in">
            <h3 className="font-marcellus text-2xl text-[#f3e5ca]">
              Thank You!
            </h3>
            <p className="font-cormorant text-base text-white/90 leading-relaxed">
              Your attendance confirmation for{" "}
              <strong className="text-[#f3e5ca] font-semibold">{formData.guest_name}</strong>{" "}
              has been successfully recorded.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-7 text-left">
            {/* 1. Name Field */}
            <ScrollReveal animation="fade-up" delay={0.15} duration={0.8} className="space-y-1.5">
              <label className="font-cormorant text-base sm:text-lg text-white/90 block">
                Name:
              </label>
              <p className="font-cormorant italic text-xs text-[#f3e5ca]/80">
                *) This RSVP is exclusively for the guest name(s) written on the invitation.
              </p>
              <input
                type="text"
                placeholder="Invitato"
                value={formData.guest_name}
                onChange={(e) => setFormData({ ...formData, guest_name: e.target.value })}
                className="w-full bg-transparent border-b border-[#f3e5ca]/40 py-2 font-cormorant text-base text-white placeholder-white/40 focus:border-[#f3e5ca] outline-none transition-colors"
                required
              />
            </ScrollReveal>

            {/* 2. Phone Number Field */}
            <ScrollReveal animation="fade-up" delay={0.25} duration={0.8} className="space-y-1.5">
              <label className="font-cormorant text-base sm:text-lg text-white/90 block">
                Phone Number:
              </label>
              <div className="flex items-center space-x-3 border-b border-[#f3e5ca]/40 py-2">
                <div className="flex items-center space-x-1 text-[#f3e5ca] font-cormorant text-base shrink-0 cursor-pointer">
                  <span>{formData.phone_code}</span>
                  <ChevronDown className="w-4 h-4 text-[#f3e5ca]/80" />
                </div>
                <input
                  type="tel"
                  placeholder="3414242"
                  value={formData.phone_number}
                  onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                  className="w-full bg-transparent font-cormorant text-base text-white placeholder-white/40 outline-none"
                />
              </div>
            </ScrollReveal>

            {/* 3. Address Field */}
            <ScrollReveal animation="fade-up" delay={0.35} duration={0.8} className="space-y-1.5">
              <label className="font-cormorant text-base sm:text-lg text-white/90 block">
                Address:
              </label>
              <input
                type="text"
                placeholder="Jl. Syuhada Utara No. 20 RT 04 RW 22 Tlogosari Kulon Pe..."
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full bg-transparent border-b border-[#f3e5ca]/40 py-2 font-cormorant text-base text-white placeholder-white/40 focus:border-[#f3e5ca] outline-none transition-colors"
              />
            </ScrollReveal>

            {/* 4. Email Field */}
            <ScrollReveal animation="fade-up" delay={0.45} duration={0.8} className="space-y-1.5">
              <label className="font-cormorant text-base sm:text-lg text-white/90 block">
                Email:
              </label>
              <input
                type="email"
                placeholder="haniefmuafi@outlook.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-transparent border-b border-[#f3e5ca]/40 py-2 font-cormorant text-base text-white placeholder-white/40 focus:border-[#f3e5ca] outline-none transition-colors"
              />
            </ScrollReveal>

            {/* 5. Attendance Question Tabs */}
            <ScrollReveal animation="fade-up" delay={0.55} duration={0.8} className="space-y-2 pt-2">
              <label className="font-cormorant text-base sm:text-lg text-white/90 block">
                Will you attend the wedding?
              </label>
              <div className="flex items-center space-x-6">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attendance: "hadir" })}
                  className={`font-cormorant italic text-base sm:text-lg pb-1 transition-colors border-b ${
                    formData.attendance === "hadir"
                      ? "text-[#f3e5ca] border-[#f3e5ca] font-medium"
                      : "text-white/60 border-transparent hover:text-white"
                  }`}
                >
                  Gladly Attend
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attendance: "tidak_hadir" })}
                  className={`font-cormorant italic text-base sm:text-lg pb-1 transition-colors border-b ${
                    formData.attendance === "tidak_hadir"
                      ? "text-[#f3e5ca] border-[#f3e5ca] font-medium"
                      : "text-white/60 border-transparent hover:text-white"
                  }`}
                >
                  Unable to Attend
                </button>
              </div>
            </ScrollReveal>

            {/* 6. Which Event Checkboxes */}
            {formData.attendance === "hadir" && (
              <ScrollReveal animation="fade-up" delay={0.65} duration={0.8} className="space-y-3 pt-2">
                <label className="font-cormorant text-base sm:text-lg text-white/90 block">
                  Which event will you attend?
                </label>
                <div className="space-y-2">
                  {[
                    { id: "akad", label: "Akad" },
                    { id: "reception", label: "Reception" },
                    { id: "both", label: "Akad and Reception" },
                  ].map((evt) => {
                    const isChecked = formData.events.includes(evt.id);
                    return (
                      <label
                        key={evt.id}
                        onClick={() => handleEventToggle(evt.id)}
                        className="flex items-center space-x-3 cursor-pointer group"
                      >
                        <div
                          className={`w-4 h-4 rounded-xs border flex items-center justify-center transition-colors ${
                            isChecked
                              ? "bg-transparent border-[#f3e5ca] text-[#f3e5ca]"
                              : "border-white/40 group-hover:border-[#f3e5ca]/70"
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[2.5]" />}
                        </div>
                        <span className="font-cormorant text-base text-white/90 group-hover:text-white">
                          {evt.label}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </ScrollReveal>
            )}

            {/* 7. Guest Count Select */}
            {formData.attendance === "hadir" && (
              <ScrollReveal animation="fade-up" delay={0.75} duration={0.8} className="space-y-2 pt-2">
                <label className="font-cormorant text-base sm:text-lg text-white/90 block">
                  How many guests will be attending?
                </label>
                <div className="relative inline-block w-40">
                  <select
                    value={formData.guest_count}
                    onChange={(e) => setFormData({ ...formData, guest_count: Number(e.target.value) })}
                    className="w-full bg-[#22160F] border border-[#f3e5ca]/40 rounded-lg py-2 px-3 font-cormorant text-base text-[#f3e5ca] appearance-none outline-none focus:border-[#f3e5ca]"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num} className="bg-[#18100A] text-white">
                        {num} {num === 1 ? "Guest" : "Guests"}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#f3e5ca] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </ScrollReveal>
            )}

            {errorMessage && (
              <div className="flex items-start gap-2 bg-red-900/20 border border-red-400/30 rounded-lg px-4 py-3">
                <span className="text-red-400 text-lg leading-none mt-0.5">⚠</span>
                <p className="font-cormorant text-sm text-red-300 leading-relaxed">
                  {errorMessage}
                </p>
              </div>
            )}

            {/* Submit Button matching reference tone */}
            <ScrollReveal animation="fade-up" delay={0.85} duration={0.8} className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-full border border-[#f3e5ca] bg-gradient-to-r from-[#2A1B12] via-[#3D291D] to-[#2A1B12] text-[#f3e5ca] font-marcellus text-sm uppercase tracking-[0.25em] shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Confirm RSVP"}
              </button>
            </ScrollReveal>
          </form>
        )}
          </div>
        </OrnateGoldFrame>
      </ScrollReveal>
    </section>
  );
}

