"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  animation?: "fade-up" | "fade-down" | "slide-left" | "slide-right" | "zoom-in" | "scale-up";
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
}

// Register GSAP ScrollTrigger safely on browser environment
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollReveal({
  children,
  className = "",
  animation = "fade-up",
  delay = 0,
  duration = 1.1,
  distance = 50,
  once = false,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const initialProps: gsap.TweenVars = {
      opacity: 0,
    };

    switch (animation) {
      case "fade-up":
        initialProps.y = distance;
        break;
      case "fade-down":
        initialProps.y = -distance;
        break;
      case "slide-left":
        initialProps.x = distance;
        break;
      case "slide-right":
        initialProps.x = -distance;
        break;
      case "zoom-in":
      case "scale-up":
        initialProps.scale = 0.88;
        break;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        initialProps,
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: duration,
          delay: delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 95%",
            end: "bottom 5%",
            toggleActions: once ? "play none none none" : "play reverse play reverse",
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [animation, delay, duration, distance, once]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
