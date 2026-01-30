'use client';

import React, { useRef, useMemo, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useScroll, useTexture, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Enhanced WebGL Scene Component with 3D Parallax
 * Inspired by Adaline.ai's smooth camera dolly effect
 * Uses WebGL for hardware-accelerated 3D rendering
 */

interface SceneLayerProps {
  textureUrl: string;
  depth: number;
  scale?: number;
}

// Individual 3D layer component
function SceneLayer({ textureUrl, depth, scale = 1 }: SceneLayerProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(textureUrl);
  const scroll = useScroll();

  // Configure texture for best quality
  useMemo(() => {
    texture.minFilter = THREE.LinearMipMapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.anisotropy = 16;
  }, [texture]);

  useFrame(() => {
    if (!meshRef.current) return;
    
    const scrollOffset = scroll.offset;
    
    // Parallax effect based on depth
    // Closer layers (lower depth) move more
    const parallaxFactor = (10 - depth) * 0.3;
    meshRef.current.position.z = depth - scrollOffset * parallaxFactor * 10;
    
    // Subtle rotation for 3D feel
    meshRef.current.rotation.x = scrollOffset * 0.05 * (1 - depth / 10);
    meshRef.current.rotation.y = Math.sin(scrollOffset * Math.PI) * 0.02 * (1 - depth / 10);
    
    // Fade effect
    if (meshRef.current.material instanceof THREE.MeshStandardMaterial) {
      meshRef.current.material.opacity = 1 - scrollOffset * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, depth]}>
      <planeGeometry args={[16 * scale, 9 * scale, 64, 64]} />
      <meshStandardMaterial
        map={texture}
        transparent
        side={THREE.DoubleSide}
        metalness={0.1}
        roughness={0.8}
      />
    </mesh>
  );
}

// Main 3D Scene
function Scene3DContent() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const { camera } = useThree();
  const scroll = useScroll();

  // Smooth camera animation
  useFrame(() => {
    const scrollOffset = scroll.offset;
    
    // Camera dolly back (main effect)
    camera.position.z = 5 + scrollOffset * 15;
    
    // Camera crane movement (vertical)
    camera.position.y = scrollOffset * 2;
    
    // Camera tracking (horizontal)
    camera.position.x = Math.sin(scrollOffset * Math.PI) * 1.5;
    
    // Camera tilt
    camera.rotation.x = -scrollOffset * 0.15;
    camera.rotation.y = Math.sin(scrollOffset * Math.PI * 2) * 0.05;
    
    // Dynamic FOV for zoom effect
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = 75 - scrollOffset * 20;
      camera.updateProjectionMatrix();
    }
    
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      {/* Lighting setup */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#fbfdf6" />
      
      {/* Multiple depth layers for parallax */}
      <SceneLayer textureUrl="/scene.png" depth={0} scale={1.2} />
      
      {/* Background plane for depth */}
      <mesh position={[0, 0, -10]}>
        <planeGeometry args={[30, 20]} />
        <meshStandardMaterial 
          color="#fbfdf6" 
          roughness={1}
          metalness={0}
        />
      </mesh>
      
      {/* Atmospheric fog for depth */}
      <fog attach="fog" args={['#fbfdf6', 10, 30]} />
    </>
  );
}

// Loading fallback
function LoadingFallback() {
  return (
    <mesh>
      <planeGeometry args={[16, 9]} />
      <meshBasicMaterial color="#fbfdf6" />
    </mesh>
  );
}

export default function WebGLScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 w-full h-screen pointer-events-none"
      style={{ zIndex: 1 }}
    >
      <Canvas
        camera={{
          position: [0, 0, 5],
          fov: 75,
          near: 0.1,
          far: 1000,
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        dpr={[1, 2]} // Responsive pixel ratio
      >
        <Suspense fallback={<LoadingFallback />}>
          <Scene3DContent />
        </Suspense>
      </Canvas>
    </div>
  );
}

