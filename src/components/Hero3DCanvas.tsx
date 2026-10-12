"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Sparkles as R3FSparkles } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "./ThemeProvider";

/* =========================================================================
   1. 3D WEB CREATIVE STUDIO: "THE QUANTUM MÖBIUS CHRONOS"
   Flagship spatial sculpture featuring interwoven Möbius ribbons,
   refractive glass prisms, concentric gyroscopic astrolabe rings,
   choreographed orbital particle filaments, and dynamic internal refraction lighting.
   ========================================================================= */

function CreativeMobiusSculpture({ pointer }: { pointer: React.RefObject<{ x: number; y: number }> }) {
  const groupRef = useRef<THREE.Group>(null!);
  const outerRibbonRef = useRef<THREE.Mesh>(null!);
  const innerRibbonRef = useRef<THREE.Mesh>(null!);
  const crystalCoreRef = useRef<THREE.Mesh>(null!);
  const ring1Ref = useRef<THREE.Mesh>(null!);
  const ring2Ref = useRef<THREE.Mesh>(null!);
  const ring3Ref = useRef<THREE.Mesh>(null!);
  const prism1Ref = useRef<THREE.Mesh>(null!);
  const prism2Ref = useRef<THREE.Mesh>(null!);
  const prism3Ref = useRef<THREE.Mesh>(null!);
  const internalLightRef = useRef<THREE.PointLight>(null!);
  const rimLightRef = useRef<THREE.DirectionalLight>(null!);

  // Orbital particles around the sculpture
  const particleCount = 85;
  const particlePositions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const u = i / particleCount;
      const angle = u * Math.PI * 4;
      const r = 2.0 + Math.sin(u * Math.PI * 6) * 0.7;
      const h = (u - 0.5) * 4.0;
      pos[i * 3] = Math.cos(angle) * r;
      pos[i * 3 + 1] = h;
      pos[i * 3 + 2] = Math.sin(angle) * r;
    }
    return pos;
  }, []);

  const particleGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    return geo;
  }, [particlePositions]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const mx = pointer.current?.x ?? 0;
    const my = pointer.current?.y ?? 0;

    // Coordinated Group Parallax with spring damping
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, t * 0.08 + mx * 0.45, 0.04);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, Math.sin(t * 0.15) * 0.08 - my * 0.3, 0.04);
      groupRef.current.position.y = Math.sin(t * 0.4) * 0.08;
    }

    // Outer Ribbon: undulating multi-axis precession
    if (outerRibbonRef.current) {
      outerRibbonRef.current.rotation.x = Math.sin(t * 0.25) * 0.35 + t * 0.15;
      outerRibbonRef.current.rotation.y = Math.cos(t * 0.2) * 0.4 + t * 0.22;
      outerRibbonRef.current.rotation.z = Math.sin(t * 0.18) * 0.25;
    }

    // Inner Ribbon: counter-rotational harmonic
    if (innerRibbonRef.current) {
      innerRibbonRef.current.rotation.x = -t * 0.22;
      innerRibbonRef.current.rotation.y = t * 0.28;
      innerRibbonRef.current.rotation.z = Math.cos(t * 0.3) * 0.3;
    }

    // Prismatic Glass Heart: slow organic tumble
    if (crystalCoreRef.current) {
      crystalCoreRef.current.rotation.x = t * 0.12;
      crystalCoreRef.current.rotation.y = -t * 0.18;
      const s = 1.0 + Math.sin(t * 0.8) * 0.04;
      crystalCoreRef.current.scale.set(s, s, s);
    }

    // Internal Light Orbiting within the Glass Heart for moving refractions
    if (internalLightRef.current) {
      internalLightRef.current.position.x = Math.cos(t * 1.4) * 0.6;
      internalLightRef.current.position.y = Math.sin(t * 1.2) * 0.5;
      internalLightRef.current.position.z = Math.sin(t * 1.6) * 0.6;
    }

    // Concentric Gyro Rings
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 0.14;
      ring1Ref.current.rotation.x = Math.PI / 4 + Math.sin(t * 0.2) * 0.1;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.18;
      ring2Ref.current.rotation.y = -Math.PI / 3 + Math.cos(t * 0.25) * 0.12;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x = t * 0.1;
      ring3Ref.current.rotation.y = t * 0.15;
    }

    // Floating Glass Prisms
    if (prism1Ref.current) {
      prism1Ref.current.rotation.x += 0.008;
      prism1Ref.current.rotation.y += 0.012;
      prism1Ref.current.position.y = 1.6 + Math.sin(t * 0.6 + 1) * 0.15;
    }
    if (prism2Ref.current) {
      prism2Ref.current.rotation.y -= 0.01;
      prism2Ref.current.rotation.z += 0.014;
      prism2Ref.current.position.y = -1.5 + Math.cos(t * 0.5 + 2) * 0.18;
    }
    if (prism3Ref.current) {
      prism3Ref.current.rotation.x -= 0.012;
      prism3Ref.current.rotation.z -= 0.008;
      prism3Ref.current.position.y = 0.8 + Math.sin(t * 0.7 + 3) * 0.12;
    }

    // Dynamic Rim Light Shifts reacting to time and pointer
    if (rimLightRef.current) {
      rimLightRef.current.position.x = -10 + Math.sin(t * 0.4) * 2 + mx * 1.5;
      rimLightRef.current.position.y = 8 + Math.cos(t * 0.3) * 1.5 - my * 1.2;
      rimLightRef.current.intensity = 2.4 + Math.sin(t * 0.8) * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={[1.5, 0, 0]}>
      {/* Studio Lighting Setup for Translucent Refraction and Metallic Highlights */}
      <ambientLight intensity={0.7} />
      {/* Key directional light: Radiant Violet */}
      <directionalLight position={[9, 12, 10]} intensity={3.0} color="#A855F7" />
      {/* Rim directional light: Neon Rose */}
      <directionalLight ref={rimLightRef} position={[-10, 8, -8]} intensity={2.4} color="#EC4899" />
      {/* Fill directional light: Warm Amber */}
      <directionalLight position={[-4, -8, 6]} intensity={1.2} color="#F97316" />

      {/* Internal kinetic point light traveling inside the glass core */}
      <pointLight ref={internalLightRef} intensity={3.5} distance={5} color="#F43F5E" />

      {/* Atmospheric kinetic dust cloud */}
      <R3FSparkles count={80} scale={12} size={3.5} speed={0.4} color="#EC4899" />

      <Float speed={1.8} rotationIntensity={0.6} floatIntensity={1.2}>
        {/* ─── LAYER 1: Core Prismatic Glass Heart ─── */}
        <mesh ref={crystalCoreRef} scale={1.0}>
          <octahedronGeometry args={[0.9, 1]} />
          <meshPhysicalMaterial
            color="#FFFFFF"
            transmission={0.96}
            opacity={1.0}
            transparent={true}
            roughness={0.05}
            ior={1.62}
            thickness={2.2}
            attenuationColor="#EC4899"
            attenuationDistance={1.4}
            specularIntensity={1.0}
            specularColor="#FFFFFF"
          />
        </mesh>

        {/* ─── LAYER 2: Outer Interwoven Möbius Ribbon (Metallic Anisotropic) ─── */}
        <mesh ref={outerRibbonRef} scale={1.0}>
          <torusKnotGeometry args={[1.5, 0.28, 280, 54, 2, 3]} />
          <meshPhysicalMaterial
            color="#2E1065"
            emissive="#A855F7"
            emissiveIntensity={0.18}
            roughness={0.14}
            metalness={0.88}
            clearcoat={1.0}
            clearcoatRoughness={0.08}
            reflectivity={0.9}
          />
        </mesh>

        {/* ─── LAYER 3: Inner Counter-Twisted Harmonic Ribbon ─── */}
        <mesh ref={innerRibbonRef} scale={0.78}>
          <torusKnotGeometry args={[1.25, 0.14, 220, 36, 3, 4]} />
          <meshPhysicalMaterial
            color="#4A0E4E"
            emissive="#EC4899"
            emissiveIntensity={0.3}
            roughness={0.18}
            metalness={0.92}
            clearcoat={0.8}
            clearcoatRoughness={0.12}
          />
        </mesh>

        {/* ─── LAYER 4: Concentric Gyroscopic Astrolabe Rings ─── */}
        {/* Ring 1 (Magenta Astrolabe) */}
        <mesh ref={ring1Ref} scale={2.5}>
          <torusGeometry args={[1, 0.016, 16, 140]} />
          <meshStandardMaterial
            color="#EC4899"
            emissive="#EC4899"
            emissiveIntensity={0.9}
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* Ring 2 (Violet Coordinate Axis) */}
        <mesh ref={ring2Ref} scale={3.1}>
          <torusGeometry args={[1, 0.012, 16, 160]} />
          <meshStandardMaterial
            color="#A855F7"
            emissive="#A855F7"
            emissiveIntensity={0.7}
            transparent
            opacity={0.75}
          />
        </mesh>

        {/* Ring 3 (Equatorial Amber Filament) */}
        <mesh ref={ring3Ref} scale={3.6}>
          <torusGeometry args={[1, 0.008, 16, 180]} />
          <meshStandardMaterial
            color="#F97316"
            emissive="#F97316"
            emissiveIntensity={0.85}
            transparent
            opacity={0.65}
          />
        </mesh>

        {/* ─── LAYER 5: Satellite Refractive Glass Prisms ─── */}
        {/* Prism 1: Floating top-left tetrahedron */}
        <mesh ref={prism1Ref} position={[-2.4, 1.6, 0.8]} scale={0.45}>
          <tetrahedronGeometry args={[1, 0]} />
          <meshPhysicalMaterial
            color="#FAF5FF"
            transmission={0.95}
            roughness={0.06}
            ior={1.55}
            thickness={1.5}
            transparent
            opacity={0.85}
            emissive="#EC4899"
            emissiveIntensity={0.15}
          />
        </mesh>

        {/* Prism 2: Floating bottom-right octahedron */}
        <mesh ref={prism2Ref} position={[2.3, -1.6, -0.6]} scale={0.38}>
          <octahedronGeometry args={[1, 0]} />
          <meshPhysicalMaterial
            color="#FAF5FF"
            transmission={0.96}
            roughness={0.04}
            ior={1.65}
            thickness={1.8}
            transparent
            opacity={0.9}
            emissive="#A855F7"
            emissiveIntensity={0.2}
          />
        </mesh>

        {/* Prism 3: Floating middle-left faceted shard */}
        <mesh ref={prism3Ref} position={[-2.8, -0.4, -0.5]} scale={0.32}>
          <icosahedronGeometry args={[1, 0]} />
          <meshPhysicalMaterial
            color="#FAF5FF"
            transmission={0.94}
            roughness={0.08}
            ior={1.5}
            thickness={1.2}
            transparent
            opacity={0.8}
            emissive="#F97316"
            emissiveIntensity={0.25}
          />
        </mesh>

        {/* ─── LAYER 6: Choreographed Orbital Particle Curve ─── */}
        <points geometry={particleGeometry}>
          <pointsMaterial
            size={0.035}
            color="#EC4899"
            transparent
            opacity={0.65}
            sizeAttenuation={true}
          />
        </points>
      </Float>
    </group>
  );
}

/* =========================================================================
   2. AI / ML RESEARCH LAB: "THE QUANTUM SYNAPTIC TENSOR CORE"
   Multidimensional neural tesseract with pulsing synaptic node matrix,
   quantum probability orbit rings, and floating holographic tensor wafers.
   ========================================================================= */

function KineticNeuralTensorCore({ pointer }: { pointer: React.RefObject<{ x: number; y: number }> }) {
  const groupRef = useRef<THREE.Group>(null!);
  const tesseractCoreRef = useRef<THREE.Mesh>(null!);
  const wireTesseractRef = useRef<THREE.Mesh>(null!);
  const ring1Ref = useRef<THREE.Mesh>(null!);
  const ring2Ref = useRef<THREE.Mesh>(null!);
  const wafer1Ref = useRef<THREE.Mesh>(null!);
  const wafer2Ref = useRef<THREE.Mesh>(null!);
  const pulseLightRef = useRef<THREE.PointLight>(null!);

  // Neural Synaptic Network Nodes (Fibonacci sphere distribution)
  const nodeCount = 42;
  const { nodeGeo, edgeGeo } = useMemo(() => {
    const nodePositions: number[] = [];
    const phi = (1 + Math.sqrt(5)) / 2;

    for (let i = 0; i < nodeCount; i++) {
      const theta = Math.acos(1 - (2 * (i + 0.5)) / nodeCount);
      const angle = (2 * Math.PI * i) / phi;
      const r = 2.1 + 0.4 * Math.sin(theta * 2 + i * 0.1);

      nodePositions.push(
        r * Math.sin(theta) * Math.cos(angle),
        r * Math.sin(theta) * Math.sin(angle),
        r * Math.cos(theta)
      );
    }

    const edgePositions: number[] = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dx = nodePositions[i * 3] - nodePositions[j * 3];
        const dy = nodePositions[i * 3 + 1] - nodePositions[j * 3 + 1];
        const dz = nodePositions[i * 3 + 2] - nodePositions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 1.35) {
          edgePositions.push(
            nodePositions[i * 3], nodePositions[i * 3 + 1], nodePositions[i * 3 + 2],
            nodePositions[j * 3], nodePositions[j * 3 + 1], nodePositions[j * 3 + 2]
          );
        }
      }
    }

    const nGeo = new THREE.BufferGeometry();
    nGeo.setAttribute("position", new THREE.Float32BufferAttribute(nodePositions, 3));

    const eGeo = new THREE.BufferGeometry();
    eGeo.setAttribute("position", new THREE.Float32BufferAttribute(edgePositions, 3));

    return { nodeGeo: nGeo, edgeGeo: eGeo };
  }, []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const mx = pointer.current?.x ?? 0;
    const my = pointer.current?.y ?? 0;

    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, t * 0.09 + mx * 0.4, 0.04);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, Math.cos(t * 0.12) * 0.08 - my * 0.25, 0.04);
    }

    if (tesseractCoreRef.current) {
      tesseractCoreRef.current.rotation.x = t * 0.25;
      tesseractCoreRef.current.rotation.y = t * 0.35;
    }
    if (wireTesseractRef.current) {
      wireTesseractRef.current.rotation.x = -t * 0.2;
      wireTesseractRef.current.rotation.z = t * 0.28;
    }

    if (pulseLightRef.current) {
      pulseLightRef.current.intensity = 2.0 + Math.sin(t * 4.0) * 1.5;
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 0.2;
      ring1Ref.current.rotation.x = Math.PI / 4 + Math.sin(t * 0.3) * 0.15;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.25;
      ring2Ref.current.rotation.y = -Math.PI / 3 + Math.cos(t * 0.25) * 0.15;
    }

    if (wafer1Ref.current) {
      wafer1Ref.current.rotation.y = t * 0.4;
      wafer1Ref.current.position.y = 1.5 + Math.sin(t * 0.5) * 0.15;
    }
    if (wafer2Ref.current) {
      wafer2Ref.current.rotation.x = -t * 0.35;
      wafer2Ref.current.position.y = -1.4 + Math.cos(t * 0.6) * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[1.5, 0, 0]}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[8, 12, 10]} intensity={2.8} color="#06B6D4" />
      <directionalLight position={[-10, -8, -10]} intensity={2.0} color="#3B82F6" />
      <pointLight ref={pulseLightRef} position={[0, 0, 0]} distance={6} color="#06B6D4" />

      <R3FSparkles count={65} scale={10} size={3} speed={0.5} color="#06B6D4" />

      <Float speed={2.0} rotationIntensity={0.8} floatIntensity={1.4}>
        {/* Core Quantum Processor (Obsidian Metallic Octahedron) */}
        <mesh ref={tesseractCoreRef} scale={1.2}>
          <octahedronGeometry args={[1, 0]} />
          <meshPhysicalMaterial
            color="#081026"
            emissive="#06B6D4"
            emissiveIntensity={0.4}
            roughness={0.12}
            metalness={0.92}
            clearcoat={1.0}
            clearcoatRoughness={0.06}
          />
        </mesh>

        {/* Outer Inscribed Quantum Wireframe Lattice */}
        <mesh ref={wireTesseractRef} scale={1.8}>
          <octahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color="#06B6D4"
            wireframe
            transparent
            opacity={0.65}
            emissive="#06B6D4"
            emissiveIntensity={0.7}
          />
        </mesh>

        {/* Synaptic Network Nodes & Connecting Edges */}
        <points geometry={nodeGeo}>
          <pointsMaterial size={0.06} color="#38BDF8" transparent opacity={0.85} sizeAttenuation={true} />
        </points>
        <lineSegments geometry={edgeGeo}>
          <lineBasicMaterial color="#06B6D4" transparent opacity={0.3} />
        </lineSegments>

        {/* Quantum Orbital Rings */}
        <mesh ref={ring1Ref} scale={2.8}>
          <torusGeometry args={[1, 0.018, 16, 120]} />
          <meshStandardMaterial color="#3B82F6" emissive="#3B82F6" emissiveIntensity={0.8} transparent opacity={0.8} />
        </mesh>
        <mesh ref={ring2Ref} scale={3.4}>
          <torusGeometry args={[1, 0.014, 16, 140]} />
          <meshStandardMaterial color="#06B6D4" emissive="#06B6D4" emissiveIntensity={0.6} transparent opacity={0.65} />
        </mesh>

        {/* Floating Holographic Tensor Wafers */}
        <mesh ref={wafer1Ref} position={[-2.4, 1.5, 0.6]} scale={0.45}>
          <boxGeometry args={[1.6, 1.0, 0.06]} />
          <meshPhysicalMaterial
            color="#38BDF8"
            transmission={0.9}
            roughness={0.08}
            thickness={0.6}
            transparent
            opacity={0.75}
            emissive="#06B6D4"
            emissiveIntensity={0.25}
          />
        </mesh>
        <mesh ref={wafer2Ref} position={[2.2, -1.5, -0.6]} scale={0.4}>
          <boxGeometry args={[1.4, 1.2, 0.06]} />
          <meshPhysicalMaterial
            color="#06B6D4"
            transmission={0.92}
            roughness={0.06}
            thickness={0.5}
            transparent
            opacity={0.8}
            emissive="#3B82F6"
            emissiveIntensity={0.25}
          />
        </mesh>
      </Float>
    </group>
  );
}

/* =========================================================================
   3. FULL-STACK COMMAND CENTER: "THE DISTRIBUTED TOPOLOGY MONOLITH"
   Isometric multi-tier server clusters with circuit bus pathways,
   orbiting data packet pulses, and structural coordinate cage.
   ========================================================================= */

function DistributedTopologyCore({ pointer }: { pointer: React.RefObject<{ x: number; y: number }> }) {
  const groupRef = useRef<THREE.Group>(null!);
  const serverCore1Ref = useRef<THREE.Mesh>(null!);
  const serverCore2Ref = useRef<THREE.Mesh>(null!);
  const serverCore3Ref = useRef<THREE.Mesh>(null!);
  const circuitCageRef = useRef<THREE.Mesh>(null!);
  const packetGroupRef = useRef<THREE.Group>(null!);

  // 6 Orbiting Data Packets
  const packets = [0, 1, 2, 3, 4, 5];

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const mx = pointer.current?.x ?? 0;
    const my = pointer.current?.y ?? 0;

    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, t * 0.07 + mx * 0.35, 0.04);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -my * 0.25, 0.04);
    }

    if (serverCore1Ref.current) {
      serverCore1Ref.current.rotation.y = t * 0.18;
    }
    if (serverCore2Ref.current) {
      serverCore2Ref.current.rotation.y = -t * 0.24;
    }
    if (serverCore3Ref.current) {
      serverCore3Ref.current.rotation.y = t * 0.15;
    }

    if (circuitCageRef.current) {
      circuitCageRef.current.rotation.x = -t * 0.12;
      circuitCageRef.current.rotation.y = -t * 0.16;
    }

    if (packetGroupRef.current) {
      packetGroupRef.current.rotation.y = t * 0.6;
      packetGroupRef.current.rotation.z = Math.sin(t * 0.3) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[1.5, 0, 0]}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[8, 12, 10]} intensity={2.6} color="#10B981" />
      <directionalLight position={[-10, -8, -10]} intensity={1.8} color="#14B8A6" />
      <pointLight position={[0, 0, 0]} intensity={2.0} distance={6} color="#10B981" />

      <R3FSparkles count={50} scale={9} size={2.5} speed={0.4} color="#10B981" />

      <Float speed={1.6} rotationIntensity={0.6} floatIntensity={1.2}>
        {/* Tier 1: Top Server Node */}
        <mesh ref={serverCore1Ref} position={[0, 0.9, 0]} scale={[1.4, 0.45, 1.4]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshPhysicalMaterial
            color="#041F14"
            emissive="#10B981"
            emissiveIntensity={0.35}
            roughness={0.15}
            metalness={0.9}
            clearcoat={0.9}
          />
        </mesh>

        {/* Tier 2: Mid Routing Switch */}
        <mesh ref={serverCore2Ref} position={[0, 0, 0]} scale={[1.7, 0.55, 1.7]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshPhysicalMaterial
            color="#052E1E"
            emissive="#14B8A6"
            emissiveIntensity={0.45}
            roughness={0.12}
            metalness={0.94}
            clearcoat={1.0}
          />
        </mesh>

        {/* Tier 3: Base Persistence Cluster */}
        <mesh ref={serverCore3Ref} position={[0, -0.9, 0]} scale={[2.0, 0.55, 2.0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshPhysicalMaterial
            color="#03160E"
            emissive="#10B981"
            emissiveIntensity={0.3}
            roughness={0.18}
            metalness={0.92}
            clearcoat={0.8}
          />
        </mesh>

        {/* Outer Coordinate Grid Cage */}
        <mesh ref={circuitCageRef} scale={2.8}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color="#10B981"
            wireframe
            transparent
            opacity={0.6}
            emissive="#10B981"
            emissiveIntensity={0.6}
          />
        </mesh>

        {/* Orbiting Message Queue Data Packets */}
        <group ref={packetGroupRef}>
          {packets.map((i) => {
            const angle = (i / packets.length) * Math.PI * 2;
            const r = 2.4;
            return (
              <mesh
                key={i}
                position={[Math.cos(angle) * r, Math.sin(i * 1.2) * 0.6, Math.sin(angle) * r]}
                scale={0.15}
              >
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial
                  color="#34D399"
                  emissive="#34D399"
                  emissiveIntensity={1.2}
                />
              </mesh>
            );
          })}
        </group>
      </Float>
    </group>
  );
}

/* =========================================================================
   CAMERA RIG WITH SCROLL-RESPONSIVE ADAPTATION & POINTER PARALLAX
   ========================================================================= */

function CameraRig({ pointer, scrollY }: { pointer: React.RefObject<{ x: number; y: number }>; scrollY: number }) {
  const { camera } = useThree();

  useFrame(() => {
    const mx = pointer.current?.x ?? 0;
    const my = pointer.current?.y ?? 0;

    // Normalised scroll progress over the hero section (0 to ~800px)
    const scrollFactor = Math.min(scrollY / 700, 1.0);

    // Target camera position: pulls back and elevates subtly on scroll
    const targetX = mx * 0.4;
    const targetY = -my * 0.35 + scrollFactor * 0.8;
    const targetZ = 6.2 + scrollFactor * 1.2;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.05);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05);
  });

  return null;
}

/* =========================================================================
   CANVAS CONTAINER WITH VISIBILITY PAUSING & REDUCED MOTION SUPPORT
   ========================================================================= */

export default function Hero3DCanvas() {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
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
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      const r = e.currentTarget.getBoundingClientRect();
      pointer.current = {
        x: ((touch.clientX - r.left) / r.width) * 2 - 1,
        y: -(((touch.clientY - r.top) / r.height) * 2 - 1),
      };
    }
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
      onTouchMove={handleTouchMove}
      className="absolute inset-0 w-full h-full pointer-events-none lg:pointer-events-auto z-0"
    >
      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 42 }}
        frameloop={visible ? "always" : "never"}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
      >
        <CameraRig pointer={pointer} scrollY={scrollY} />

        {theme === "ai" && <KineticNeuralTensorCore pointer={pointer} />}
        {theme === "creative" && <CreativeMobiusSculpture pointer={pointer} />}
        {theme === "engineering" && <DistributedTopologyCore pointer={pointer} />}
      </Canvas>
    </div>
  );
}
