"use client";

import React, { useRef, useMemo, useEffect, useState, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ─── Constants ─── */
const POINT_COUNT = 85;
const RADIUS = 2.6;
const EDGE_THRESHOLD = 1.1;

/* ─── Geometry generators ─── */
function generateLattice(): Float32Array {
  const pos = new Float32Array(POINT_COUNT * 3);
  const phi = (1 + Math.sqrt(5)) / 2;

  for (let i = 0; i < POINT_COUNT; i++) {
    const theta = Math.acos(1 - 2 * (i + 0.5) / POINT_COUNT);
    const angle = (2 * Math.PI * i) / phi;
    const r =
      RADIUS *
      (0.7 + 0.55 * Math.pow(Math.sin(theta * 1.4 + i * 0.02), 2));

    pos[i * 3] = r * Math.sin(theta) * Math.cos(angle);
    pos[i * 3 + 1] = r * Math.sin(theta) * Math.sin(angle);
    pos[i * 3 + 2] = r * Math.cos(theta);
  }
  return pos;
}

function generateEdges(base: Float32Array): Float32Array {
  const edges: number[] = [];
  for (let i = 0; i < POINT_COUNT; i++) {
    for (let j = i + 1; j < POINT_COUNT; j++) {
      const dx = base[i * 3] - base[j * 3];
      const dy = base[i * 3 + 1] - base[j * 3 + 1];
      const dz = base[i * 3 + 2] - base[j * 3 + 2];
      if (Math.sqrt(dx * dx + dy * dy + dz * dz) < EDGE_THRESHOLD) {
        edges.push(
          base[i * 3], base[i * 3 + 1], base[i * 3 + 2],
          base[j * 3], base[j * 3 + 1], base[j * 3 + 2]
        );
      }
    }
  }
  return new Float32Array(edges);
}

/* ─── Inner 3D scene ─── */
interface LatticeProps {
  pointer: React.RefObject<{ x: number; y: number }>;
  color: string;
}

function Lattice({ pointer, color }: LatticeProps) {
  const groupRef = useRef<THREE.Group>(null!);

  const basePositions = useMemo(() => generateLattice(), []);
  const edgeData = useMemo(() => generateEdges(basePositions), [basePositions]);

  const pointsGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(basePositions.slice(), 3)
    );
    return g;
  }, [basePositions]);

  const edgesGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(edgeData.slice(), 3)
    );
    return g;
  }, [edgeData]);

  const pointMat = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 0.04,
        color,
        transparent: true,
        opacity: 0.5,
        sizeAttenuation: true,
      }),
    [color]
  );

  const lineMat = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: 0.1,
      }),
    [color]
  );

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const mx = pointer.current?.x ?? 0;
    const my = pointer.current?.y ?? 0;

    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.05 + mx * 0.12;
      groupRef.current.rotation.x = Math.sin(t * 0.035) * 0.08 + my * 0.08;
    }

    // Breathing displacement
    const attr = pointsGeo.attributes.position;
    for (let i = 0; i < POINT_COUNT; i++) {
      const bx = basePositions[i * 3];
      const by = basePositions[i * 3 + 1];
      const bz = basePositions[i * 3 + 2];
      const phase = bx * 1.4 + by * 1.1 + bz * 0.7;
      const d = Math.sin(t * 0.55 + phase) * 0.05;
      const r = Math.sqrt(bx * bx + by * by + bz * bz) || 1;
      attr.setXYZ(i, bx + (bx / r) * d, by + (by / r) * d, bz + (bz / r) * d);
    }
    attr.needsUpdate = true;
  });

  return (
    <group ref={groupRef}>
      <points geometry={pointsGeo} material={pointMat} />
      <lineSegments geometry={edgesGeo} material={lineMat} />
    </group>
  );
}

/* ─── Wrapper component ─── */
interface SignatureVisualProps {
  isDark: boolean;
}

export default function SignatureVisual({ isDark }: SignatureVisualProps) {
  const pointer = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const fn = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const onMove = useCallback((e: React.PointerEvent) => {
    const r = e.currentTarget.getBoundingClientRect();
    pointer.current = {
      x: ((e.clientX - r.left) / r.width) * 2 - 1,
      y: -(((e.clientY - r.top) / r.height) * 2 - 1),
    };
  }, []);

  if (reduced) {
    return (
      <div
        ref={containerRef}
        className="w-full h-full flex items-center justify-center opacity-[0.08]"
      >
        <svg
          viewBox="0 0 200 200"
          className="w-3/4 h-3/4"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.4"
        >
          <polygon points="100,20 170,60 170,140 100,180 30,140 30,60" />
          <polygon points="100,40 150,70 150,130 100,160 50,130 50,70" />
          <polygon points="100,60 130,78 130,122 100,140 70,122 70,78" />
          <line x1="100" y1="20" x2="100" y2="60" />
          <line x1="170" y1="60" x2="130" y2="78" />
          <line x1="170" y1="140" x2="130" y2="122" />
          <line x1="100" y1="180" x2="100" y2="140" />
          <line x1="30" y1="140" x2="70" y2="122" />
          <line x1="30" y1="60" x2="70" y2="78" />
        </svg>
      </div>
    );
  }

  const color = isDark ? "#EBEBEB" : "#141414";

  return (
    <div ref={containerRef} className="w-full h-full" onPointerMove={onMove}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        frameloop={visible ? "always" : "never"}
        style={{ background: "transparent" }}
        dpr={[1, 1.5]}
      >
        <Lattice pointer={pointer} color={color} />
      </Canvas>
    </div>
  );
}
