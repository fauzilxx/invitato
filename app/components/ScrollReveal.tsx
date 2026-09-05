"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  animation?: "fade-up" | "fade-down" | "slide-left" | "slide-right" | "zoom-in" | "scale-up";
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
}

export default function ScrollReveal({
  children,
  className = "",
  animation = "fade-up",
  delay = 0,
  duration = 0.5,
  distance = 25,
  once = false,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // 1. Initial hidden state
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
        initialProps.scale = 0.94;
        break;
    }

    gsap.set(el, initialProps);

    // 2. IntersectionObserver handles live Scroll In and Scroll Out dynamically with fast 80px pre-trigger
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Scroll In: Animate fast & crisp to visible position
            gsap.to(el, {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              duration: duration,
              delay: delay,
              ease: "power2.out",
              overwrite: "auto",
            });
            if (once) {
              observer.unobserve(el);
            }
          } else if (!once) {
            // Scroll Out: Animate out when leaving viewport
            gsap.to(el, {
              ...initialProps,
              duration: 0.4,
              ease: "power2.inOut",
              overwrite: "auto",
            });
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px 80px 0px",
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [animation, delay, duration, distance, once]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
