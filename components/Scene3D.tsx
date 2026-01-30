'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useScroll } from 'framer-motion';
import * as THREE from 'three';

/**
 * 3D Camera Animation Component
 * Recreates Adaline.ai's hero animation using Three.js
 * This is NOT a zoom - it's a camera dolly (moving through 3D space)
 */

function Scene() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();
  
  // Create texture from image
  const texture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    return loader.load('/scene.png');
  }, []);

  const { scrollYProgress } = useScroll();

  useFrame(() => {
    if (!meshRef.current) return;

    // Get scroll progress
    const progress = scrollYProgress.get();

    /**
     * CAMERA DOLLY MOVEMENT (like Adaline.ai)
     * Camera moves BACKWARD in 3D space (not zoom)
     * Creates parallax depth effect
     */
    
    // Camera Z position (dolly back)
    // Start close (z=2), end far (z=10)
    camera.position.z = 2 + (progress * 8);
    
    // Camera Y position (slight rise)
    camera.position.y = progress * 0.5;
    
    // Mesh subtle rotation for depth
    if (meshRef.current) {
      meshRef.current.rotation.y = progress * 0.1;
      meshRef.current.rotation.x = Math.sin(progress * Math.PI) * 0.05;
    }
  });

  return (
    <>
      {/* Ambient light */}
      <ambientLight intensity={1.2} />
      
      {/* Main image plane */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <planeGeometry args={[16, 9, 32, 32]} />
        <meshStandardMaterial 
          map={texture}
          side={THREE.DoubleSide}
          transparent={true}
          opacity={1}
        />
      </mesh>

      {/* Background plane for depth */}
      <mesh position={[0, 0, -5]}>
        <planeGeometry args={[20, 12]} />
        <meshStandardMaterial 
          color="#fbfdf6"
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  );
}

export default function Scene3D() {
  return (
    <div className="fixed inset-0 w-full h-screen">
      <Canvas
        camera={{
          position: [0, 0, 2],
          fov: 75,
          near: 0.1,
          far: 1000,
        }}
        gl={{
          antialias: true,
          alpha: true,
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}


