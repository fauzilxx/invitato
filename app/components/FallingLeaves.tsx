"use client";

import { useEffect, useRef } from "react";

interface Leaf3D {
  x: number;
  y: number;
  z: number; // Depth factor (0.5 to 1.5)
  size: number;
  speedY: number;
  speedX: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  dRotX: number;
  dRotY: number;
  dRotZ: number;
  swingPhase: number;
  swingSpeed: number;
  colorType: number;
  opacity: number;
}

/**
 * FallingLeaves: Ultra-realistic 3D Physics Falling Autumn Leaves.
 * Renders realistic maple/oak leaf silhouettes with 3D tumbling, sway, and organic motion physics.
 */
export default function FallingLeaves() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const count = 20;
    const leaves: Leaf3D[] = [];

    // Curated photorealistic autumn color palettes (Maple Gold, Bronze Brown, Warm Amber, Deep Rust)
    const colorPalettes = [
      { main: "rgba(218, 165, 32, 0.85)", vein: "rgba(255, 235, 170, 0.6)", shadow: "rgba(160, 110, 20, 0.4)" }, // Gold
      { main: "rgba(195, 115, 45, 0.85)", vein: "rgba(240, 180, 130, 0.6)", shadow: "rgba(130, 65, 15, 0.4)" },  // Amber/Bronze
      { main: "rgba(165, 75, 35, 0.85)", vein: "rgba(220, 140, 110, 0.6)", shadow: "rgba(100, 40, 15, 0.4)" },   // Rust Red
      { main: "rgba(180, 140, 60, 0.80)", vein: "rgba(230, 200, 130, 0.5)", shadow: "rgba(110, 85, 30, 0.4)" },  // Ochre
    ];

    for (let i = 0; i < count; i++) {
      leaves.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        z: Math.random() * 0.8 + 0.6,
        size: Math.random() * 8 + 12,
        speedY: Math.random() * 1.1 + 0.6,
        speedX: Math.random() * 0.4 - 0.2,
        rotX: Math.random() * Math.PI * 2,
        rotY: Math.random() * Math.PI * 2,
        rotZ: Math.random() * Math.PI * 2,
        dRotX: (Math.random() - 0.5) * 0.03,
        dRotY: (Math.random() - 0.5) * 0.04,
        dRotZ: (Math.random() - 0.5) * 0.02,
        swingPhase: Math.random() * Math.PI * 2,
        swingSpeed: Math.random() * 0.02 + 0.015,
        colorType: Math.floor(Math.random() * colorPalettes.length),
        opacity: Math.random() * 0.4 + 0.5,
      });
    }

    // Realistic 5-Lobe Maple Leaf Drawing Path
    const drawMapleLeaf = (s: number, palette: typeof colorPalettes[0]) => {
      ctx.beginPath();
      ctx.moveTo(0, s * 0.9); // Stem base
      ctx.quadraticCurveTo(s * 0.05, s * 0.4, 0, 0); // Main stem line

      // Center lobe
      ctx.bezierCurveTo(-s * 0.2, -s * 0.4, -s * 0.25, -s * 0.8, 0, -s);
      ctx.bezierCurveTo(s * 0.25, -s * 0.8, s * 0.2, -s * 0.4, 0, 0);

      // Left top lobe
      ctx.bezierCurveTo(-s * 0.3, -s * 0.2, -s * 0.7, -s * 0.6, -s * 0.7, -s * 0.2);
      ctx.bezierCurveTo(-s * 0.6, 0, -s * 0.3, 0, 0, 0);

      // Right top lobe
      ctx.bezierCurveTo(s * 0.3, -s * 0.2, s * 0.7, -s * 0.6, s * 0.7, -s * 0.2);
      ctx.bezierCurveTo(s * 0.6, 0, s * 0.3, 0, 0, 0);

      // Left bottom lobe
      ctx.bezierCurveTo(-s * 0.2, s * 0.1, -s * 0.55, s * 0.2, -s * 0.4, s * 0.45);
      ctx.bezierCurveTo(-s * 0.25, s * 0.4, -s * 0.1, s * 0.3, 0, 0);

      // Right bottom lobe
      ctx.bezierCurveTo(s * 0.2, s * 0.1, s * 0.55, s * 0.2, s * 0.4, s * 0.45);
      ctx.bezierCurveTo(s * 0.25, s * 0.4, s * 0.1, s * 0.3, 0, 0);

      ctx.closePath();

      // Leaf fill gradient
      const grad = ctx.createRadialGradient(0, 0, s * 0.1, 0, 0, s);
      grad.addColorStop(0, palette.main);
      grad.addColorStop(1, palette.shadow);
      ctx.fillStyle = grad;
      ctx.fill();

      // Realistic leaf vein network
      ctx.strokeStyle = palette.vein;
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      // Main central vein
      ctx.moveTo(0, s * 0.8);
      ctx.lineTo(0, -s * 0.85);
      // Side veins
      ctx.moveTo(0, -s * 0.2);
      ctx.lineTo(-s * 0.5, -s * 0.45);
      ctx.moveTo(0, -s * 0.2);
      ctx.lineTo(s * 0.5, -s * 0.45);
      ctx.moveTo(0, s * 0.1);
      ctx.lineTo(-s * 0.35, s * 0.35);
      ctx.moveTo(0, s * 0.1);
      ctx.lineTo(s * 0.35, s * 0.35);
      ctx.stroke();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      leaves.forEach((leaf) => {
        // 3D physics update
        leaf.swingPhase += leaf.swingSpeed;
        leaf.rotX += leaf.dRotX;
        leaf.rotY += leaf.dRotY;
        leaf.rotZ += leaf.dRotZ;

        // Fluttering swaying motion (simulating wind currents)
        const swayX = Math.sin(leaf.swingPhase) * 1.8 * leaf.z;
        const swayY = Math.cos(leaf.swingPhase * 0.7) * 0.6 * leaf.z;

        leaf.x += leaf.speedX + swayX * 0.5;
        leaf.y += (leaf.speedY + swayY) * leaf.z;

        // Loop leaves when reaching bottom
        if (leaf.y > height + 40) {
          leaf.y = -40;
          leaf.x = Math.random() * width;
        }

        const palette = colorPalettes[leaf.colorType];

        // Render 3D transformed leaf
        ctx.save();
        ctx.translate(leaf.x, leaf.y);

        // 3D Scale & Perspective projection simulation
        const cosX = Math.cos(leaf.rotX);
        const cosY = Math.cos(leaf.rotY);
        const scaleX = leaf.z * (0.4 + 0.6 * Math.abs(cosY));
        const scaleY = leaf.z * (0.4 + 0.6 * Math.abs(cosX));

        ctx.scale(scaleX, scaleY);
        ctx.rotate(leaf.rotZ);
        ctx.globalAlpha = leaf.opacity * (0.5 + 0.5 * Math.abs(cosX * cosY));

        drawMapleLeaf(leaf.size, palette);

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-50"
    />
  );
}
