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

    const mouse = { x: width / 2, y: height / 2, radius: 150 };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    // AI Mode: Neural Network Nodes & Data Packet Pulses
    const aiParticles = Array.from({ length: 65 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 2 + 1,
      color: Math.random() > 0.5 ? "rgba(6, 182, 212, 0.7)" : "rgba(59, 130, 246, 0.6)"
    }));

    const dataPackets = Array.from({ length: 10 }, () => ({
      from: Math.floor(Math.random() * aiParticles.length),
      to: Math.floor(Math.random() * aiParticles.length),
      progress: Math.random(),
      speed: Math.random() * 0.015 + 0.008
    }));

    // Creative Mode: Aurora Blobs & Floating Gold Dust
    const creativeBlobs = Array.from({ length: 7 }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: Math.random() * 200 + 130,
      color: [
        "rgba(168, 85, 247, 0.15)",
        "rgba(236, 72, 153, 0.12)",
        "rgba(249, 115, 22, 0.10)",
        "rgba(99, 102, 241, 0.14)"
      ][i % 4]
    }));

    const goldDust = Array.from({ length: 30 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vy: -Math.random() * 0.3 - 0.1,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random()
    }));

    // Engineering Mode: Blueprint Grid & Circuit Trace Nodes
    const engNodes = Array.from({ length: 30 }, () => ({
      x: Math.floor((Math.random() * width) / 60) * 60,
      y: Math.floor((Math.random() * height) / 60) * 60,
      pulse: Math.random(),
      speed: Math.random() * 0.02 + 0.01
    }));

    let laserScanY = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (mode === "ai") {
        // --- MODE 1: AI INTELLIGENCE NETWORK ---
        aiParticles.forEach((p, i) => {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          // Mouse gravitational influence
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            p.x -= (dx / dist) * force * 2;
            p.y -= (dy / dist) * force * 2;
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();

          for (let j = i + 1; j < aiParticles.length; j++) {
            const p2 = aiParticles[j];
            const distance = Math.hypot(p.x - p2.x, p.y - p2.y);
            if (distance < 130) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(6, 182, 212, ${0.25 * (1 - distance / 130)})`;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }
        });

        // Shooting Data Packets
        dataPackets.forEach((pkt) => {
          pkt.progress = (pkt.progress + pkt.speed) % 1;
          const p1 = aiParticles[pkt.from];
          const p2 = aiParticles[pkt.to];
          if (p1 && p2) {
            const x = p1.x + (p2.x - p1.x) * pkt.progress;
            const y = p1.y + (p2.y - p1.y) * pkt.progress;
            ctx.beginPath();
            ctx.arc(x, y, 2, 0, Math.PI * 2);
            ctx.fillStyle = "#ffffff";
            ctx.shadowBlur = 8;
            ctx.shadowColor = "#38f9ff";
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        });

      } else if (mode === "creative") {
        // --- MODE 2: CREATIVE STUDIO AURORA & GOLD DUST ---
        creativeBlobs.forEach((b) => {
          b.x += b.vx;
          b.y += b.vy;

          if (b.x < -100) b.x = width + 100;
          if (b.x > width + 100) b.x = -100;
          if (b.y < -100) b.y = height + 100;
          if (b.y > height + 100) b.y = -100;

          const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.radius);
          grad.addColorStop(0, b.color);
          grad.addColorStop(1, "transparent");

          ctx.beginPath();
          ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        });

        goldDust.forEach((d) => {
          d.y += d.vy;
          if (d.y < 0) d.y = height;
          ctx.beginPath();
          ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(249, 115, 22, ${d.alpha * 0.6})`;
          ctx.fill();
        });

      } else if (mode === "engineering") {
        // --- MODE 3: ENGINEERING LAB BLUEPRINT ---
        const gridSize = 60;
        ctx.strokeStyle = "rgba(16, 185, 129, 0.06)";
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

        engNodes.forEach((node) => {
          node.pulse = (node.pulse + node.speed) % 1;
          const opacity = Math.sin(node.pulse * Math.PI) * 0.4;
          ctx.beginPath();
          ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(16, 185, 129, ${opacity})`;
          ctx.fill();
        });

        laserScanY = (laserScanY + 1.0) % height;
        const laserGrad = ctx.createLinearGradient(0, laserScanY - 20, 0, laserScanY + 20);
        laserGrad.addColorStop(0, "transparent");
        laserGrad.addColorStop(0.5, "rgba(16, 185, 129, 0.15)");
        laserGrad.addColorStop(1, "transparent");

        ctx.fillStyle = laserGrad;
        ctx.fillRect(0, laserScanY - 20, width, 40);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-75 transition-opacity duration-700"
    />
  );
}
