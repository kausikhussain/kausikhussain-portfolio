"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshWobbleMaterial, Sparkles as R3FSparkles } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "./ThemeProvider";

/* ─── 1. AI/ML Research: Kinetic Neural Monolith ─── */
function KineticNeuralMonolith({ pointer }: { pointer: React.RefObject<{ x: number; y: number }> }) {
  const coreRef = useRef<THREE.Mesh>(null!);
  const ring1Ref = useRef<THREE.Mesh>(null!);
  const ring2Ref = useRef<THREE.Mesh>(null!);
  const shard1Ref = useRef<THREE.Mesh>(null!);
  const shard2Ref = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    const mx = pointer.current?.x ?? 0;
    const my = pointer.current?.y ?? 0;

    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mx * 0.35, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -my * 0.25, 0.05);
    }

    if (coreRef.current) {
      coreRef.current.rotation.x += delta * 0.3;
      coreRef.current.rotation.y += delta * 0.4;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.25;
      ring1Ref.current.rotation.x += delta * 0.12;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.35;
      ring2Ref.current.rotation.y += delta * 0.2;
    }
    if (shard1Ref.current) {
      shard1Ref.current.rotation.y += delta * 0.5;
    }
    if (shard2Ref.current) {
      shard2Ref.current.rotation.x += delta * 0.4;
    }
  });

  return (
    <group ref={groupRef} position={[1.4, 0, 0]}>
      <ambientLight intensity={0.9} />
      <directionalLight position={[8, 12, 10]} intensity={2.5} color="#06B6D4" />
      <pointLight position={[-10, -10, -10]} intensity={1.6} color="#3B82F6" />

      <R3FSparkles count={60} scale={10} size={3} speed={0.5} color="#06B6D4" />

      <Float speed={2.2} rotationIntensity={1.0} floatIntensity={1.5}>
        {/* Core Quantum Monolith */}
        <mesh ref={coreRef} scale={1.8}>
          <octahedronGeometry args={[1, 0]} />
          <MeshWobbleMaterial
            color="#06B6D4"
            factor={0.4}
            speed={1.8}
            roughness={0.15}
            metalness={0.85}
          />
        </mesh>

        {/* Outer Synaptic Orbit Rings */}
        <mesh ref={ring1Ref} scale={2.8} rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[1, 0.02, 16, 100]} />
          <meshStandardMaterial color="#3B82F6" emissive="#3B82F6" emissiveIntensity={0.8} transparent opacity={0.75} />
        </mesh>

        <mesh ref={ring2Ref} scale={3.4} rotation={[-Math.PI / 3, Math.PI / 6, 0]}>
          <torusGeometry args={[1, 0.015, 16, 100]} />
          <meshStandardMaterial color="#06B6D4" emissive="#06B6D4" emissiveIntensity={0.6} transparent opacity={0.6} />
        </mesh>

        {/* Floating Holographic Tensor Shards */}
        <mesh ref={shard1Ref} position={[-2.2, 1.4, 0.5]} scale={0.4}>
          <boxGeometry args={[1, 1.5, 0.1]} />
          <meshPhysicalMaterial color="#38BDF8" roughness={0.1} transmission={0.9} thickness={0.5} transparent opacity={0.6} />
        </mesh>

        <mesh ref={shard2Ref} position={[2.0, -1.6, -0.5]} scale={0.35}>
          <octahedronGeometry args={[1, 0]} />
          <meshPhysicalMaterial color="#06B6D4" roughness={0.1} transmission={0.95} thickness={0.4} transparent opacity={0.7} />
        </mesh>
      </Float>
    </group>
  );
}

/* ─── 2. 3D Web Creative Studio: Morphing Liquid Sculpture ─── */
function CreativeLiquidSculpture({ pointer }: { pointer: React.RefObject<{ x: number; y: number }> }) {
  const blobRef = useRef<THREE.Mesh>(null!);
  const prismRef = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    const mx = pointer.current?.x ?? 0;
    const my = pointer.current?.y ?? 0;

    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mx * 0.4, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -my * 0.3, 0.05);
    }

    if (blobRef.current) {
      blobRef.current.rotation.x += delta * 0.2;
      blobRef.current.rotation.y += delta * 0.3;
    }
    if (prismRef.current) {
      prismRef.current.rotation.z += delta * 0.35;
      prismRef.current.rotation.x += delta * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[1.4, 0, 0]}>
      <ambientLight intensity={1.1} />
      <directionalLight position={[8, 12, 10]} intensity={2.8} color="#A855F7" />
      <pointLight position={[-10, -10, -10]} intensity={1.8} color="#EC4899" />

      <R3FSparkles count={70} scale={11} size={3.5} speed={0.5} color="#EC4899" />

      <Float speed={2.0} rotationIntensity={1.4} floatIntensity={1.8}>
        {/* Morphing Liquid Sculpture */}
        <mesh ref={blobRef} scale={2.0}>
          <icosahedronGeometry args={[1, 3]} />
          <MeshWobbleMaterial
            color="#A855F7"
            factor={0.7}
            speed={1.5}
            roughness={0.1}
            metalness={0.75}
          />
        </mesh>

        {/* Floating Prism Shard */}
        <mesh ref={prismRef} position={[-2.4, 1.2, 0.4]} scale={0.5}>
          <tetrahedronGeometry args={[1, 0]} />
          <meshPhysicalMaterial color="#EC4899" roughness={0.05} transmission={0.9} thickness={0.6} transparent opacity={0.7} />
        </mesh>
      </Float>
    </group>
  );
}

/* ─── 3. Full-Stack Command Center: Engineering Topology Core ─── */
function EngineeringTopologyCore({ pointer }: { pointer: React.RefObject<{ x: number; y: number }> }) {
  const cubeRef = useRef<THREE.Mesh>(null!);
  const wireframeCubeRef = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    const mx = pointer.current?.x ?? 0;
    const my = pointer.current?.y ?? 0;

    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mx * 0.3, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -my * 0.25, 0.05);
    }

    if (cubeRef.current) {
      cubeRef.current.rotation.x += delta * 0.2;
      cubeRef.current.rotation.y += delta * 0.2;
    }
    if (wireframeCubeRef.current) {
      wireframeCubeRef.current.rotation.x -= delta * 0.18;
      wireframeCubeRef.current.rotation.y -= delta * 0.18;
    }
  });

  return (
    <group ref={groupRef} position={[1.4, 0, 0]}>
      <ambientLight intensity={0.9} />
      <directionalLight position={[8, 12, 10]} intensity={2.4} color="#10B981" />
      <pointLight position={[-10, -10, -10]} intensity={1.5} color="#14B8A6" />

      <R3FSparkles count={45} scale={9} size={2.5} speed={0.4} color="#10B981" />

      <Float speed={1.8} rotationIntensity={1.0} floatIntensity={1.3}>
        {/* Monolith Core */}
        <mesh ref={cubeRef} scale={1.7}>
          <boxGeometry args={[1.2, 1.2, 1.2]} />
          <meshStandardMaterial color="#051E14" roughness={0.2} metalness={0.85} emissive="#052E1F" emissiveIntensity={0.5} />
        </mesh>

        {/* Outer Wireframe Topology Matrix */}
        <mesh ref={wireframeCubeRef} scale={2.5}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color="#10B981"
            wireframe
            transparent
            opacity={0.7}
            emissive="#10B981"
            emissiveIntensity={0.7}
          />
        </mesh>
      </Float>
    </group>
  );
}

/* ─── Canvas Wrapper with Visibility Optimization ─── */
export default function Hero3DCanvas() {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
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
    const obs = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.05 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handlePointerMove = (e: React.PointerEvent) => {
    const r = e.currentTarget.getBoundingClientRect();
    pointer.current = {
      x: ((e.clientX - r.left) / r.width) * 2 - 1,
      y: -(((e.clientY - r.top) / r.height) * 2 - 1),
    };
  };

  if (reduced) {
    return (
      <div ref={containerRef} className="absolute inset-0 w-full h-full flex items-center justify-center opacity-10 pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-2/3 h-2/3" fill="none" stroke="currentColor" strokeWidth="0.5">
          <polygon points="100,20 170,60 170,140 100,180 30,140 30,60" />
          <polygon points="100,40 150,70 150,130 100,160 50,130 50,70" />
        </svg>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      className="absolute inset-0 w-full h-full pointer-events-none lg:pointer-events-auto"
    >
      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 42 }}
        frameloop={visible ? "always" : "never"}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
      >
        {theme === "ai" && <KineticNeuralMonolith pointer={pointer} />}
        {theme === "creative" && <CreativeLiquidSculpture pointer={pointer} />}
        {theme === "engineering" && <EngineeringTopologyCore pointer={pointer} />}
      </Canvas>
    </div>
  );
}
