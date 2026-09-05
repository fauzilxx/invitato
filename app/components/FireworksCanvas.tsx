"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  decay: number;
  color: string;
  size: number;
  gravity: number;
}

interface Rocket {
  x: number;
  y: number;
  targetY: number;
  speed: number;
  color: string;
  trail: { x: number; y: number }[];
}

export default function FireworksCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    const particles: Particle[] = [];
    const rockets: Rocket[] = [];

    const GOLD_PALETTE = ["#FFD700", "#D4AF37", "#F3E5CA", "#FFF2D4", "#E8C39E", "#FFA500", "#4DEEEA", "#FF007F"];

    const createExplosion = (x: number, y: number, baseColor: string) => {
      const particleCount = 50;
      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.4;
        const speed = Math.random() * 4.5 + 1.8;
        const color =
          Math.random() > 0.25
            ? baseColor
            : GOLD_PALETTE[Math.floor(Math.random() * GOLD_PALETTE.length)];

        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          decay: Math.random() * 0.016 + 0.01,
          color,
          size: Math.random() * 2.4 + 1.2,
          gravity: 0.05,
        });
      }
    };

    let zoneCycle = 0;

    const launchFireworks = () => {
      const mode = Math.random();

      // 3 Dedicated Section Zones:
      // Zone 0: Timeline Area (8% to 38% height)
      // Zone 1: Countdown Area (41% to 64% height)
      // Zone 2: Location Map Area (66% to 90% height)
      const getZoneY = (zoneIndex: number) => {
        switch (zoneIndex % 3) {
          case 0:
            // Timeline Zone (Upper)
            return Math.random() * (height * 0.28) + height * 0.08;
          case 1:
            // Countdown Zone (Middle)
            return Math.random() * (height * 0.22) + height * 0.41;
          case 2:
          default:
            // Location Map Zone (Lower)
            return Math.random() * (height * 0.22) + height * 0.67;
        }
      };

      const getStartY = (targetY: number) => {
        return Math.min(height, targetY + Math.random() * 200 + 160);
      };

      if (mode < 0.5) {
        // Multi-zone Burst: 3 Rockets (1 Timeline, 1 Countdown, 1 Location Map)
        const targetTimeline = getZoneY(0);
        const targetCountdown = getZoneY(1);
        const targetLocation = getZoneY(2);

        const color1 = GOLD_PALETTE[Math.floor(Math.random() * GOLD_PALETTE.length)];
        const color2 = GOLD_PALETTE[Math.floor(Math.random() * GOLD_PALETTE.length)];
        const color3 = GOLD_PALETTE[Math.floor(Math.random() * GOLD_PALETTE.length)];

        // Rocket 1: Timeline Section
        rockets.push({
          x: width * (Math.random() * 0.35 + 0.1),
          y: getStartY(targetTimeline),
          targetY: targetTimeline,
          speed: Math.random() * 1.5 + 5.5,
          color: color1,
          trail: [],
        });

        // Rocket 2: Countdown Section (Guaranteed)
        rockets.push({
          x: width * (Math.random() * 0.35 + 0.32),
          y: getStartY(targetCountdown),
          targetY: targetCountdown,
          speed: Math.random() * 1.5 + 5.5,
          color: color2,
          trail: [],
        });

        // Rocket 3: Location Map Section (Guaranteed)
        rockets.push({
          x: width * (Math.random() * 0.35 + 0.55),
          y: getStartY(targetLocation),
          targetY: targetLocation,
          speed: Math.random() * 1.5 + 5.5,
          color: color3,
          trail: [],
        });
      } else {
        // Dual Zone Burst cycling between Timeline, Countdown & Location Map
        const z1 = zoneCycle % 3;
        const z2 = (zoneCycle + 1) % 3;
        zoneCycle += 2;

        const targetY1 = getZoneY(z1);
        const targetY2 = getZoneY(z2);
        const posX1 = width * (Math.random() * 0.4 + 0.1);
        const posX2 = width * (Math.random() * 0.4 + 0.5);

        rockets.push({
          x: posX1,
          y: getStartY(targetY1),
          targetY: targetY1,
          speed: Math.random() * 1.6 + 5.3,
          color: GOLD_PALETTE[Math.floor(Math.random() * GOLD_PALETTE.length)],
          trail: [],
        });

        rockets.push({
          x: posX2,
          y: getStartY(targetY2),
          targetY: targetY2,
          speed: Math.random() * 1.6 + 5.3,
          color: GOLD_PALETTE[Math.floor(Math.random() * GOLD_PALETTE.length)],
          trail: [],
        });
      }
    };

    let lastLaunch = performance.now();
    let nextDelay = 900;

    const render = (timestamp: number) => {
      ctx.clearRect(0, 0, width, height);

      // Auto launch fireworks dedicated across Timeline, Countdown & Location Map (0.8s - 1.5s interval)
      if (timestamp - lastLaunch > nextDelay) {
        launchFireworks();
        lastLaunch = timestamp;
        nextDelay = Math.random() * 700 + 800;
      }

      // Update & Draw Rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.trail.push({ x: r.x, y: r.y });
        if (r.trail.length > 10) r.trail.shift();

        // Draw rocket tail trail
        for (let j = 0; j < r.trail.length; j++) {
          const pt = r.trail[j];
          const trailAlpha = (j / r.trail.length) * 0.7;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 1.4, 0, Math.PI * 2);
          ctx.fillStyle = r.color;
          ctx.globalAlpha = trailAlpha;
          ctx.fill();
        }

        r.y -= r.speed;

        // Rocket head spark
        ctx.beginPath();
        ctx.arc(r.x, r.y, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = "#FFFFFF";
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 6;
        ctx.shadowColor = r.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Explode when target height is reached
        if (r.y <= r.targetY) {
          createExplosion(r.x, r.y, r.color);
          rockets.splice(i, 1);
        }
      }

      // Update & Draw Explosion Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(render);
    };

    // Initial launch on mount
    launchFireworks();

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 z-15 ${className || ""}`}
    />
  );
}
