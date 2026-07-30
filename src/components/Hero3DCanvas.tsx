"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, MeshWobbleMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useIdentityMode } from "./IdentityModeContext";

function StudioSculpture() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const outerRingRef = useRef<THREE.Mesh>(null!);
  const { mode } = useIdentityMode();

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.25;
      meshRef.current.rotation.y += delta * 0.35;
    }
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z += delta * 0.2;
    }
  });

  const getAccent = () => {
    switch (mode) {
      case "ai":
        return { primary: "#38bdf8", secondary: "#818cf8", light: "#38bdf8" };
      case "creative":
        return { primary: "#c084fc", secondary: "#f472b6", light: "#c084fc" };
      case "engineering":
        return { primary: "#34d399", secondary: "#38bdf8", light: "#34d399" };
    }
  };

  const accent = getAccent();

  return (
    <group>
      {/* Studio Lighting */}
      <ambientLight intensity={0.9} />
      <directionalLight position={[5, 10, 7]} intensity={2.0} color={accent.light} />
      <pointLight position={[-8, -8, -8]} intensity={1.0} color="#ffffff" />

      <Float speed={1.8} rotationIntensity={0.8} floatIntensity={1.2}>
        {/* Main Pristine Geometric Core */}
        <mesh ref={meshRef} scale={1.7}>
          <octahedronGeometry args={[1, 0]} />
          <MeshWobbleMaterial
            color={accent.primary}
            factor={0.25}
            speed={1.5}
            roughness={0.1}
            metalness={0.85}
          />
        </mesh>

        {/* Minimal Orbital Axis Ring */}
        <mesh ref={outerRingRef} scale={2.7} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[1, 0.015, 16, 100]} />
          <meshStandardMaterial
            color={accent.secondary}
            emissive={accent.secondary}
            emissiveIntensity={0.6}
            transparent
            opacity={0.6}
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function Hero3DCanvas() {
  return (
    <div className="w-full h-[400px] sm:h-[480px] relative">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        className="w-full h-full"
        gl={{ antialias: true, alpha: true }}
      >
        <StudioSculpture />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.2} />
      </Canvas>
    </div>
  );
}
