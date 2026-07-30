"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, MeshWobbleMaterial, Sparkles as R3FSparkles } from "@react-three/drei";
import * as THREE from "three";
import { useIdentityMode } from "./IdentityModeContext";

function ModeAdaptedCore() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const outerWireframeRef = useRef<THREE.Mesh>(null!);
  const torusRef = useRef<THREE.Mesh>(null!);
  const { mode } = useIdentityMode();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.4;
      meshRef.current.rotation.y += delta * 0.5;
    }
    if (outerWireframeRef.current) {
      outerWireframeRef.current.rotation.x -= delta * 0.2;
      outerWireframeRef.current.rotation.y -= delta * 0.3;
    }
    if (torusRef.current) {
      torusRef.current.rotation.z += delta * 0.3;
    }
  });

  const getColors = () => {
    switch (mode) {
      case "ai":
        return { wire: "#06b6d4", inner: "#3b82f6", light: "#06b6d4", particle: "#60a5fa" };
      case "creative":
        return { wire: "#a855f7", inner: "#ec4899", light: "#f97316", particle: "#f472b6" };
      case "engineering":
        return { wire: "#10b981", inner: "#14b8a6", light: "#10b981", particle: "#34d399" };
    }
  };

  const colors = getColors();

  return (
    <group>
      <ambientLight intensity={0.7} />
      <pointLight position={[10, 10, 10]} intensity={1.8} color={colors.light} />
      <pointLight position={[-10, -10, -10]} intensity={1.0} color="#818cf8" />

      {/* Floating 3D Sparkle Particles */}
      <R3FSparkles count={40} scale={8} size={2.5} speed={0.4} color={colors.particle} />

      {/* Floating Polyhedral Core */}
      <Float speed={2.5} rotationIntensity={1.4} floatIntensity={1.6}>
        {/* Inner Solid Octahedron */}
        <mesh ref={meshRef} scale={1.6}>
          <octahedronGeometry args={[1, 0]} />
          <MeshWobbleMaterial
            color={colors.inner}
            factor={0.45}
            speed={2.2}
            roughness={0.15}
            metalness={0.85}
            wireframe={false}
          />
        </mesh>

        {/* Outer Orbital Ring */}
        <mesh ref={torusRef} scale={2.8} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[1, 0.02, 16, 100]} />
          <meshStandardMaterial
            color={colors.wire}
            emissive={colors.wire}
            emissiveIntensity={0.8}
            transparent
            opacity={0.7}
          />
        </mesh>

        {/* Outer Wireframe Mesh */}
        <mesh ref={outerWireframeRef} scale={2.3}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color={colors.wire}
            wireframe
            transparent
            opacity={0.5}
            emissive={colors.wire}
            emissiveIntensity={0.4}
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function Hero3DCanvas() {
  return (
    <div className="w-full h-[400px] sm:h-[500px] relative">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        className="w-full h-full"
        gl={{ antialias: true, alpha: true }}
      >
        <ModeAdaptedCore />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.8} />
      </Canvas>
    </div>
  );
}
