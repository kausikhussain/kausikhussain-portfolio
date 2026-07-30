"use client";

import React, { useEffect, useRef } from "react";
import { useIdentityMode } from "./IdentityModeContext";

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { mode } = useIdentityMode();

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

    // AI Mode: Micro Nodes (Quiet, static precision)
    const aiParticles = Array.from({ length: 30 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      radius: Math.random() * 1.0 + 0.5,
      color: "rgba(56, 189, 248, 0.25)"
    }));

    // Creative Mode: Quiet Ambient Gradient Halo
    const creativeBlobs = Array.from({ length: 3 }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.1,
      vy: (Math.random() - 0.5) * 0.1,
      radius: Math.random() * 200 + 150,
      color: [
        "rgba(192, 132, 252, 0.05)",
        "rgba(244, 114, 182, 0.04)",
        "rgba(129, 140, 248, 0.04)"
      ][i % 3]
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (mode === "ai") {
        // Quiet Studio Neural Particles
        aiParticles.forEach((p, i) => {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();

          for (let j = i + 1; j < aiParticles.length; j++) {
            const p2 = aiParticles[j];
            const distance = Math.hypot(p.x - p2.x, p.y - p2.y);
            if (distance < 90) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(56, 189, 248, ${0.08 * (1 - distance / 90)})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        });
      } else if (mode === "creative") {
        // Editorial Ambient Lighting
        creativeBlobs.forEach((b) => {
          b.x += b.vx;
          b.y += b.vy;

          if (b.x < -150) b.x = width + 150;
          if (b.x > width + 150) b.x = -150;
          if (b.y < -150) b.y = height + 150;
          if (b.y > height + 150) b.y = -150;

          const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.radius);
          grad.addColorStop(0, b.color);
          grad.addColorStop(1, "transparent");

          ctx.beginPath();
          ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        });
      } else if (mode === "engineering") {
        // Clean Architectural Grid
        const gridSize = 60;
        ctx.strokeStyle = "rgba(52, 211, 153, 0.025)";
        ctx.lineWidth = 1;

        for (let x = 0; x < width; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        for (let y = 0; y < height; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-60 transition-opacity duration-700"
    />
  );
}
