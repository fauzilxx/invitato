"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  color: string;
  isSparkle: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  color: string;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number; // in radians
  opacity: number;
  maxOpacity: number;
  width: number;
  life: number;
  maxLife: number;
  particles: Particle[];
}

export default function StarryNightCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    let stars: Star[] = [];
    let shootingStars: ShootingStar[] = [];
    let nextSpawnTime = 10; // Spawn first shooting star quickly after load

    const COLORS = [
      "rgba(255, 255, 255, ",
      "rgba(243, 229, 202, ",
      "rgba(255, 215, 0, ",
      "rgba(220, 235, 255, ",
    ];

    const resize = () => {
      if (!canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      initStars();
    };

    const initStars = () => {
      stars = [];
      const starCount = Math.floor((width * height) / 2800);

      for (let i = 0; i < Math.max(80, Math.min(starCount, 180)); i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.6 + 0.5,
          baseAlpha: Math.random() * 0.65 + 0.25,
          twinkleSpeed: Math.random() * 0.04 + 0.015,
          twinklePhase: Math.random() * Math.PI * 2,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          isSparkle: Math.random() > 0.82,
        });
      }
    };

    const spawnShootingStar = () => {
      // Angle matching steep diagonal trajectory in reference photo (~65 to 75 deg downward)
      const angleDeg = 65 + (Math.random() * 20 - 10);
      const angle = (Math.PI / 180) * angleDeg;

      // Spawn near top, spanning left to right
      const startX = Math.random() * (width * 0.95);
      const startY = Math.random() * (height * 0.35) - 30;

      shootingStars.push({
        x: startX,
        y: startY,
        length: Math.random() * 100 + 140, // Elegant long golden tail
        speed: Math.random() * 7 + 10,
        angle,
        opacity: 0,
        maxOpacity: Math.random() * 0.35 + 0.65,
        width: Math.random() * 1.2 + 1.8,
        life: 0,
        maxLife: Math.random() * 25 + 40,
        particles: [],
      });
    };

    let time = 0;

    // Helper to draw 4-point cross star sparkle
    const drawSparkle = (cx: number, cy: number, size: number, alpha: number) => {
      ctx.save();
      ctx.beginPath();
      ctx.fillStyle = `rgba(255, 240, 200, ${alpha})`;
      ctx.moveTo(cx, cy - size);
      ctx.quadraticCurveTo(cx, cy, cx + size, cy);
      ctx.quadraticCurveTo(cx, cy, cx, cy + size);
      ctx.quadraticCurveTo(cx, cy, cx - size, cy);
      ctx.quadraticCurveTo(cx, cy, cx, cy - size);
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      // 1. Render Static Twinkling Stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        const alpha =
          star.baseAlpha +
          Math.sin(time * star.twinkleSpeed + star.twinklePhase) * 0.4;
        const finalAlpha = Math.max(0.15, Math.min(1, alpha));

        if (star.isSparkle && finalAlpha > 0.6) {
          drawSparkle(star.x, star.y, star.radius * 2.8, finalAlpha);
        } else {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
          ctx.fillStyle = `${star.color}${finalAlpha})`;
          ctx.fill();
        }
      }

      // 2. Periodically Spawn Shooting Stars (every 0.8s - 1.8s)
      if (time >= nextSpawnTime) {
        spawnShootingStar();
        nextSpawnTime = time + Math.floor(Math.random() * 50 + 45);
      }

      // 3. Render and Update Shooting Stars (Bintang Jatuh Animation)
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        ss.life += 1;

        // Smooth Opacity Envelope (Quick Fade In, Long Fade Out)
        if (ss.life < 6) {
          ss.opacity = (ss.life / 6) * ss.maxOpacity;
        } else {
          const remaining = ss.maxLife - ss.life;
          ss.opacity = Math.max(0, (remaining / (ss.maxLife - 6)) * ss.maxOpacity);
        }

        // Advance Head Position along Angle
        const dx = Math.cos(ss.angle) * ss.speed;
        const dy = Math.sin(ss.angle) * ss.speed;
        ss.x += dx;
        ss.y += dy;

        // Calculate Tail End Position
        const tailX = ss.x - Math.cos(ss.angle) * ss.length;
        const tailY = ss.y - Math.sin(ss.angle) * ss.length;

        // Spawn trailing ember particles behind head
        if (Math.random() > 0.3) {
          ss.particles.push({
            x: ss.x + (Math.random() * 4 - 2),
            y: ss.y + (Math.random() * 4 - 2),
            vx: -dx * 0.1 + (Math.random() * 1 - 0.5),
            vy: -dy * 0.1 + (Math.random() * 1 - 0.5),
            size: Math.random() * 1.5 + 0.8,
            life: 0,
            maxLife: Math.random() * 15 + 10,
            color: Math.random() > 0.5 ? "rgba(255, 240, 200," : "rgba(212, 175, 55,",
          });
        }

        // Render Tail Streak Line Gradient
        const grad = ctx.createLinearGradient(ss.x, ss.y, tailX, tailY);
        grad.addColorStop(0, `rgba(255, 255, 255, ${ss.opacity})`);
        grad.addColorStop(0.12, `rgba(255, 235, 190, ${ss.opacity * 0.95})`);
        grad.addColorStop(0.45, `rgba(212, 175, 55, ${ss.opacity * 0.55})`);
        grad.addColorStop(1, `rgba(212, 175, 55, 0)`);

        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = ss.width;
        ctx.lineCap = "round";
        ctx.stroke();

        // Bright Glowing Shooting Star Head
        ctx.save();
        ctx.beginPath();
        ctx.arc(ss.x, ss.y, ss.width * 1.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${ss.opacity})`;
        ctx.shadowBlur = 14;
        ctx.shadowColor = "#ffffff";
        ctx.fill();
        ctx.restore();

        // Render Trailing Ember Particles
        for (let pIdx = ss.particles.length - 1; pIdx >= 0; pIdx--) {
          const p = ss.particles[pIdx];
          p.life += 1;
          p.x += p.vx;
          p.y += p.vy;

          const pAlpha = (1 - p.life / p.maxLife) * ss.opacity * 0.8;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color} ${pAlpha})`;
          ctx.fill();

          if (p.life >= p.maxLife) {
            ss.particles.splice(pIdx, 1);
          }
        }

        // Clean up finished shooting star
        if (ss.life >= ss.maxLife || ss.y > height + 150 || ss.x > width + 150) {
          shootingStars.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    resize();
    render();

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
