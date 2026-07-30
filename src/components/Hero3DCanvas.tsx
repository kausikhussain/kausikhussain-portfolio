"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, MeshWobbleMaterial, Sparkles as R3FSparkles } from "@react-three/drei";
import * as THREE from "three";
import { useIdentityMode } from "./IdentityModeContext";

function AIModeCore() {
  const coreRef = useRef<THREE.Mesh>(null!);
  const ring1Ref = useRef<THREE.Mesh>(null!);
  const ring2Ref = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.x += delta * 0.5;
      coreRef.current.rotation.y += delta * 0.6;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.4;
      ring1Ref.current.rotation.x += delta * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.5;
      ring2Ref.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group>
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} intensity={2.2} color="#00d9ff" />
      <pointLight position={[-10, -10, -10]} intensity={1.2} color="#38f9ff" />

      <R3FSparkles count={50} scale={7} size={3} speed={0.6} color="#00d9ff" />

      <Float speed={2.5} rotationIntensity={1.5} floatIntensity={1.8}>
        {/* Holographic Quantum Core */}
        <mesh ref={coreRef} scale={1.6}>
          <octahedronGeometry args={[1, 0]} />
          <MeshWobbleMaterial
            color="#00d9ff"
            factor={0.5}
            speed={2.5}
            roughness={0.1}
            metalness={0.9}
            wireframe={false}
          />
        </mesh>

        {/* Inner Orbital Ring */}
        <mesh ref={ring1Ref} scale={2.5} rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[1, 0.025, 16, 100]} />
          <meshStandardMaterial color="#38f9ff" emissive="#38f9ff" emissiveIntensity={0.9} transparent opacity={0.8} />
        </mesh>

        {/* Outer Counter-Rotating Ring */}
        <mesh ref={ring2Ref} scale={3.1} rotation={[-Math.PI / 3, Math.PI / 6, 0]}>
          <torusGeometry args={[1, 0.02, 16, 100]} />
          <meshStandardMaterial color="#00d9ff" emissive="#00d9ff" emissiveIntensity={0.7} transparent opacity={0.6} />
        </mesh>
      </Float>
    </group>
  );
}

function CreativeModeCore() {
  const blobRef = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    if (blobRef.current) {
      blobRef.current.rotation.x += delta * 0.3;
      blobRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <group>
      <ambientLight intensity={1.0} />
      <pointLight position={[10, 10, 10]} intensity={2.5} color="#a855f7" />
      <pointLight position={[-10, -10, -10]} intensity={1.8} color="#ec4899" />

      <R3FSparkles count={60} scale={8} size={4} speed={0.5} color="#fbbf24" />

      <Float speed={2.0} rotationIntensity={1.8} floatIntensity={2.0}>
        {/* Morphing Liquid Icosahedron */}
        <mesh ref={blobRef} scale={1.8}>
          <icosahedronGeometry args={[1, 3]} />
          <MeshWobbleMaterial
            color="#a855f7"
            factor={0.8}
            speed={1.8}
            roughness={0.1}
            metalness={0.7}
            wireframe={false}
          />
        </mesh>
      </Float>
    </group>
  );
}

function EngineeringModeCore() {
  const cubeRef = useRef<THREE.Mesh>(null!);
  const wireframeCubeRef = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    if (cubeRef.current) {
      cubeRef.current.rotation.x += delta * 0.3;
      cubeRef.current.rotation.y += delta * 0.3;
    }
    if (wireframeCubeRef.current) {
      wireframeCubeRef.current.rotation.x -= delta * 0.2;
      wireframeCubeRef.current.rotation.y -= delta * 0.2;
    }
  });

  return (
    <group>
      <ambientLight intensity={0.9} />
      <pointLight position={[10, 10, 10]} intensity={2.0} color="#10b981" />
      <pointLight position={[-10, -10, -10]} intensity={1.2} color="#34d399" />

      <R3FSparkles count={35} scale={6} size={2} speed={0.4} color="#10b981" />

      <Float speed={2.2} rotationIntensity={1.2} floatIntensity={1.4}>
        {/* Precision Architectural Solid Cube */}
        <mesh ref={cubeRef} scale={1.5}>
          <boxGeometry args={[1.2, 1.2, 1.2]} />
          <meshStandardMaterial color="#0d1117" roughness={0.3} metalness={0.8} />
        </mesh>

        {/* Outer Wireframe Grid */}
        <mesh ref={wireframeCubeRef} scale={2.2}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#10b981" wireframe transparent opacity={0.7} emissive="#10b981" emissiveIntensity={0.6} />
        </mesh>
      </Float>
    </group>
  );
}

export default function Hero3DCanvas() {
  const { mode } = useIdentityMode();

  return (
    <div className="w-full h-[420px] sm:h-[520px] relative">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        className="w-full h-full"
        gl={{ antialias: true, alpha: true }}
      >
        {mode === "ai" && <AIModeCore />}
        {mode === "creative" && <CreativeModeCore />}
        {mode === "engineering" && <EngineeringModeCore />}
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} />
      </Canvas>
    </div>
  );
}
