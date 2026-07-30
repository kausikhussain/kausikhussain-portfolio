"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, MeshWobbleMaterial, Sparkles as R3FSparkles } from "@react-three/drei";
import * as THREE from "three";
import { useIdentityMode } from "./IdentityModeContext";

function KineticNeuralMonolith() {
  const coreRef = useRef<THREE.Mesh>(null!);
  const ring1Ref = useRef<THREE.Mesh>(null!);
  const ring2Ref = useRef<THREE.Mesh>(null!);
  const shard1Ref = useRef<THREE.Mesh>(null!);
  const shard2Ref = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.x += delta * 0.35;
      coreRef.current.rotation.y += delta * 0.45;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.3;
      ring1Ref.current.rotation.x += delta * 0.15;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.4;
      ring2Ref.current.rotation.y += delta * 0.25;
    }
    if (shard1Ref.current) {
      shard1Ref.current.rotation.y += delta * 0.6;
    }
    if (shard2Ref.current) {
      shard2Ref.current.rotation.x += delta * 0.5;
    }
  });

  return (
    <group position={[1.6, 0, 0]}>
      {/* Studio Lighting */}
      <ambientLight intensity={0.9} />
      <directionalLight position={[8, 12, 10]} intensity={2.5} color="#06b6d4" />
      <pointLight position={[-10, -10, -10]} intensity={1.5} color="#3b82f6" />

      <R3FSparkles count={70} scale={10} size={3} speed={0.6} color="#06b6d4" />

      <Float speed={2.5} rotationIntensity={1.2} floatIntensity={1.8}>
        {/* Kinetic Quantum Neural Monolith */}
        <mesh ref={coreRef} scale={1.8}>
          <octahedronGeometry args={[1, 0]} />
          <MeshWobbleMaterial
            color="#06b6d4"
            factor={0.4}
            speed={2.0}
            roughness={0.1}
            metalness={0.85}
          />
        </mesh>

        {/* Outer Synaptic Rings */}
        <mesh ref={ring1Ref} scale={2.8} rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[1, 0.02, 16, 100]} />
          <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.8} transparent opacity={0.7} />
        </mesh>

        <mesh ref={ring2Ref} scale={3.4} rotation={[-Math.PI / 3, Math.PI / 6, 0]}>
          <torusGeometry args={[1, 0.015, 16, 100]} />
          <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.6} transparent opacity={0.5} />
        </mesh>

        {/* Floating Holographic Glass Shards */}
        <mesh ref={shard1Ref} position={[-2.2, 1.4, 0.5]} scale={0.4}>
          <boxGeometry args={[1, 1.5, 0.1]} />
          <meshPhysicalMaterial color="#38bdf8" roughness={0.1} transmission={0.9} thickness={0.5} transparent opacity={0.6} />
        </mesh>

        <mesh ref={shard2Ref} position={[2.0, -1.6, -0.5]} scale={0.35}>
          <octahedronGeometry args={[1, 0]} />
          <meshPhysicalMaterial color="#06b6d4" roughness={0.1} transmission={0.95} thickness={0.4} transparent opacity={0.7} />
        </mesh>
      </Float>
    </group>
  );
}

function CreativeLiquidSculpture() {
  const blobRef = useRef<THREE.Mesh>(null!);
  const prismRef = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    if (blobRef.current) {
      blobRef.current.rotation.x += delta * 0.25;
      blobRef.current.rotation.y += delta * 0.35;
    }
    if (prismRef.current) {
      prismRef.current.rotation.z += delta * 0.4;
    }
  });

  return (
    <group position={[1.6, 0, 0]}>
      <ambientLight intensity={1.1} />
      <directionalLight position={[8, 12, 10]} intensity={2.8} color="#a855f7" />
      <pointLight position={[-10, -10, -10]} intensity={1.8} color="#ec4899" />

      <R3FSparkles count={80} scale={11} size={4} speed={0.5} color="#f97316" />

      <Float speed={2.0} rotationIntensity={1.5} floatIntensity={2.0}>
        {/* Morphing Liquid Sculpture */}
        <mesh ref={blobRef} scale={2.0}>
          <icosahedronGeometry args={[1, 3]} />
          <MeshWobbleMaterial
            color="#a855f7"
            factor={0.7}
            speed={1.6}
            roughness={0.08}
            metalness={0.75}
          />
        </mesh>

        {/* Floating Prism Shard */}
        <mesh ref={prismRef} position={[-2.4, 1.2, 0.4]} scale={0.5}>
          <tetrahedronGeometry args={[1, 0]} />
          <meshPhysicalMaterial color="#ec4899" roughness={0.05} transmission={0.9} thickness={0.6} transparent opacity={0.7} />
        </mesh>
      </Float>
    </group>
  );
}

function EngineeringTopologyCore() {
  const cubeRef = useRef<THREE.Mesh>(null!);
  const wireframeCubeRef = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    if (cubeRef.current) {
      cubeRef.current.rotation.x += delta * 0.25;
      cubeRef.current.rotation.y += delta * 0.25;
    }
    if (wireframeCubeRef.current) {
      wireframeCubeRef.current.rotation.x -= delta * 0.2;
      wireframeCubeRef.current.rotation.y -= delta * 0.2;
    }
  });

  return (
    <group position={[1.6, 0, 0]}>
      <ambientLight intensity={0.9} />
      <directionalLight position={[8, 12, 10]} intensity={2.2} color="#10b981" />
      <pointLight position={[-10, -10, -10]} intensity={1.4} color="#14b8a6" />

      <R3FSparkles count={45} scale={9} size={2.5} speed={0.4} color="#10b981" />

      <Float speed={2.0} rotationIntensity={1.0} floatIntensity={1.4}>
        {/* Architectural Solid Monolith */}
        <mesh ref={cubeRef} scale={1.7}>
          <boxGeometry args={[1.2, 1.2, 1.2]} />
          <meshStandardMaterial color="#0b0f17" roughness={0.2} metalness={0.85} />
        </mesh>

        {/* Outer Wireframe Topology Grid */}
        <mesh ref={wireframeCubeRef} scale={2.5}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#10b981" wireframe transparent opacity={0.65} emissive="#10b981" emissiveIntensity={0.6} />
        </mesh>
      </Float>
    </group>
  );
}

export default function Hero3DCanvas() {
  const { mode } = useIdentityMode();

  return (
    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 42 }}
        className="w-full h-full"
        gl={{ antialias: true, alpha: true }}
      >
        <fog attach="fog" args={["#030308", 4, 14]} />
        {mode === "ai" && <KineticNeuralMonolith />}
        {mode === "creative" && <CreativeLiquidSculpture />}
        {mode === "engineering" && <EngineeringTopologyCore />}
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.2} />
      </Canvas>
    </div>
  );
}
