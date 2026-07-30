"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, MeshWobbleMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useIdentityMode } from "./IdentityModeContext";

function KeynoteSculpture() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const { mode } = useIdentityMode();

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.25;
    }
  });

  const getAccent = () => {
    switch (mode) {
      case "ai":
        return { primary: "#38bdf8", light: "#e0f2fe" };
      case "creative":
        return { primary: "#c084fc", light: "#f3e8ff" };
      case "engineering":
        return { primary: "#34d399", light: "#ecfdf5" };
    }
  };

  const accent = getAccent();

  return (
    <group>
      {/* Cold Studio Directional Lighting */}
      <ambientLight intensity={0.9} />
      <directionalLight position={[6, 12, 8]} intensity={2.2} color={accent.light} />
      <pointLight position={[-8, -8, -8]} intensity={0.8} color="#ffffff" />

      <Float speed={1.5} rotationIntensity={0.6} floatIntensity={1.0}>
        {/* Single Pristine Keynote Sculpture */}
        <mesh ref={meshRef} scale={1.8}>
          <octahedronGeometry args={[1, 0]} />
          <MeshWobbleMaterial
            color={accent.primary}
            factor={0.18}
            speed={1.2}
            roughness={0.12}
            metalness={0.85}
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function Hero3DCanvas() {
  return (
    <div className="w-full h-[380px] sm:h-[460px] relative">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 42 }}
        className="w-full h-full"
        gl={{ antialias: true, alpha: true }}
      >
        <KeynoteSculpture />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.0} />
      </Canvas>
    </div>
  );
}
