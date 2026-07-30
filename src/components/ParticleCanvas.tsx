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

    const mouse = { x: width / 2, y: height / 2, radius: 160 };

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
    const aiParticles = Array.from({ length: 70 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      radius: Math.random() * 2 + 1,
      color: Math.random() > 0.5 ? "#00d9ff" : "#38f9ff"
    }));

    const dataPackets = Array.from({ length: 12 }, () => ({
      from: Math.floor(Math.random() * aiParticles.length),
      to: Math.floor(Math.random() * aiParticles.length),
      progress: Math.random(),
      speed: Math.random() * 0.015 + 0.008
    }));

    // Creative Mode: Aurora Blobs & Floating Gold Dust
    const creativeBlobs = Array.from({ length: 8 }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 220 + 140,
      color: [
        "rgba(168, 85, 247, 0.18)",
        "rgba(236, 72, 153, 0.15)",
        "rgba(251, 191, 36, 0.12)",
        "rgba(99, 102, 241, 0.16)"
      ][i % 4]
    }));

    const goldDust = Array.from({ length: 40 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vy: -Math.random() * 0.4 - 0.1,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random()
    }));

    // Engineering Mode: Blueprint Circuit Nodes & Technical Scanline
    const engNodes = Array.from({ length: 35 }, () => ({
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
        // Render connected neural mesh
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
            p.x -= (dx / dist) * force * 2.2;
            p.y -= (dy / dist) * force * 2.2;
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 8;
          ctx.shadowColor = "#00d9ff";
          ctx.fill();
          ctx.shadowBlur = 0;

          // Neural connection lines
          for (let j = i + 1; j < aiParticles.length; j++) {
            const p2 = aiParticles[j];
            const distance = Math.hypot(p.x - p2.x, p.y - p2.y);
            if (distance < 140) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(0, 217, 255, ${0.3 * (1 - distance / 140)})`;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }
        });

        // Shooting Data Packets along connections
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
            ctx.shadowBlur = 10;
            ctx.shadowColor = "#38f9ff";
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        });

      } else if (mode === "creative") {
        // --- MODE 2: CREATIVE STUDIO AURORA & GOLD DUST ---
        // Render multi-layer gradient blobs
        creativeBlobs.forEach((b) => {
          b.x += b.vx;
          b.y += b.vy;

          if (b.x < -120) b.x = width + 120;
          if (b.x > width + 120) b.x = -120;
          if (b.y < -120) b.y = height + 120;
          if (b.y > height + 120) b.y = -120;

          const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.radius);
          grad.addColorStop(0, b.color);
          grad.addColorStop(1, "transparent");

          ctx.beginPath();
          ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        });

        // Floating Gold Particle Dust
        goldDust.forEach((d) => {
          d.y += d.vy;
          if (d.y < 0) d.y = height;
          ctx.beginPath();
          ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(251, 191, 36, ${d.alpha * 0.7})`;
          ctx.fill();
        });

      } else if (mode === "engineering") {
        // --- MODE 3: ENGINEERING LAB BLUEPRINT & CIRCUIT TOPOLOGY ---
        const gridSize = 60;
        ctx.strokeStyle = "rgba(16, 185, 129, 0.08)";
        ctx.lineWidth = 1;

        // Blueprint Grid
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

        // Circuit Nodes Pulsing
        engNodes.forEach((node) => {
          node.pulse = (node.pulse + node.speed) % 1;
          const opacity = Math.sin(node.pulse * Math.PI) * 0.5 + 0.1;
          ctx.beginPath();
          ctx.arc(node.x, node.y, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(16, 185, 129, ${opacity})`;
          ctx.shadowBlur = 6;
          ctx.shadowColor = "#10b981";
          ctx.fill();
          ctx.shadowBlur = 0;
        });

        // Scanning Emerald Laser Beam
        laserScanY = (laserScanY + 1.2) % height;
        const laserGrad = ctx.createLinearGradient(0, laserScanY - 30, 0, laserScanY + 30);
        laserGrad.addColorStop(0, "transparent");
        laserGrad.addColorStop(0.5, "rgba(16, 185, 129, 0.2)");
        laserGrad.addColorStop(1, "transparent");

        ctx.fillStyle = laserGrad;
        ctx.fillRect(0, laserScanY - 30, width, 60);
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
      className="fixed inset-0 pointer-events-none z-0 opacity-80 transition-opacity duration-700"
    />
  );
}
