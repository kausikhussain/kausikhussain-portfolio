"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, MeshWobbleMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useIdentityMode } from "./IdentityModeContext";

function ModeAdaptedCore() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const outerWireframeRef = useRef<THREE.Mesh>(null!);
  const { mode } = useIdentityMode();

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.4;
      meshRef.current.rotation.y += delta * 0.5;
    }
    if (outerWireframeRef.current) {
      outerWireframeRef.current.rotation.x -= delta * 0.2;
      outerWireframeRef.current.rotation.y -= delta * 0.3;
    }
  });

  const getColors = () => {
    switch (mode) {
      case "ai":
        return { wire: "#06b6d4", inner: "#3b82f6", light: "#06b6d4" };
      case "creative":
        return { wire: "#a855f7", inner: "#ec4899", light: "#f97316" };
      case "engineering":
        return { wire: "#10b981", inner: "#14b8a6", light: "#10b981" };
    }
  };

  const colors = getColors();

  return (
    <group>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color={colors.light} />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#ffffff" />

      {/* Floating Polyhedral Core */}
      <Float speed={2.5} rotationIntensity={1.2} floatIntensity={1.5}>
        {/* Inner Solid Core */}
        <mesh ref={meshRef} scale={1.6}>
          <octahedronGeometry args={[1, 0]} />
          <MeshWobbleMaterial
            color={colors.inner}
            factor={0.4}
            speed={2}
            roughness={0.2}
            metalness={0.8}
            wireframe={false}
          />
        </mesh>

        {/* Outer Wireframe Mesh */}
        <mesh ref={outerWireframeRef} scale={2.3}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color={colors.wire}
            wireframe
            transparent
            opacity={0.6}
            emissive={colors.wire}
            emissiveIntensity={0.5}
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
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} />
      </Canvas>
    </div>
  );
}
