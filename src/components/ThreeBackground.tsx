'use client';

import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import { motion } from 'framer-motion';

const AnimatedSphere = ({ position, color, speed, distort }: { position: [number, number, number]; color: string; speed: number; distort: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * speed) * 0.5;
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });
  
  return (
    <Sphere ref={meshRef} args={[1, 32, 32]} position={position}>
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={distort}
        speed={speed * 2}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
};

const ThreeBackground = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#ff00ff" />
        <AnimatedSphere position={[-3, 0, 0]} color="#6C63FF" speed={0.5} distort={0.4} />
        <AnimatedSphere position={[3, 0, 0]} color="#FF6584" speed={0.3} distort={0.6} />
        <AnimatedSphere position={[0, 2, -2]} color="#00D9F5" speed={0.4} distort={0.5} />
      </Canvas>
    </div>
  );
};

export default ThreeBackground;
