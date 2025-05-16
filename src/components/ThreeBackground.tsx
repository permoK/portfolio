'use client';

import { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  Sphere,
  MeshDistortMaterial,
  Float,
  PerspectiveCamera,
  useTexture,
  Environment,
  OrbitControls,
  Text3D,
  Sparkles
} from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// Animated floating sphere with distortion
const AnimatedSphere = ({
  position,
  color,
  speed,
  distort,
  size = 1,
  floatIntensity = 1
}: {
  position: [number, number, number];
  color: string;
  speed: number;
  distort: number;
  size?: number;
  floatIntensity?: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.1 * speed;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.15 * speed;
    }
  });

  return (
    <Float
      speed={1.5 * floatIntensity}
      rotationIntensity={0.5 * floatIntensity}
      floatIntensity={0.8 * floatIntensity}
    >
      <Sphere ref={meshRef} args={[size, 64, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={distort}
          speed={speed * 1.5}
          roughness={0.3}
          metalness={0.8}
          emissive={color}
          emissiveIntensity={0.5}
          toneMapped={false}
        />
      </Sphere>
    </Float>
  );
};

// Grid of small particles
const ParticleGrid = ({ count = 100, size = 0.02, color = "#ffffff" }) => {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 10;
      temp.push({ position: [x, y, z] });
    }
    return temp;
  }, [count]);

  useFrame(({ clock }) => {
    if (mesh.current) {
      particles.forEach((particle, i) => {
        const idx = i * 16;
        const matrix = new THREE.Matrix4();
        const position = new THREE.Vector3(
          particle.position[0],
          particle.position[1] + Math.sin(clock.elapsedTime + i) * 0.1,
          particle.position[2]
        );
        matrix.setPosition(position);
        mesh.current.setMatrixAt(i, matrix);
      });
      mesh.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshBasicMaterial color={color} transparent opacity={0.6} />
    </instancedMesh>
  );
};

// Main scene component
const Scene = ({ mousePosition }: { mousePosition: { x: number, y: number } }) => {
  const { camera } = useThree();

  useFrame(() => {
    // Subtle camera movement based on mouse position
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.position.x += (mousePosition.x * 2 - camera.position.x) * 0.02;
      camera.position.y += (-mousePosition.y * 2 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />

      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#ffffff" />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#6C63FF" />
      <pointLight position={[5, -5, 5]} intensity={0.8} color="#FF6584" />

      {/* Main spheres */}
      <AnimatedSphere position={[-2.5, 0.5, -1]} color="#6C63FF" speed={0.4} distort={0.3} size={1.2} />
      <AnimatedSphere position={[2.5, -0.5, -2]} color="#8A2BE2" speed={0.3} distort={0.5} size={1.5} />
      <AnimatedSphere position={[0, 1.5, -3]} color="#00D9F5" speed={0.5} distort={0.4} size={0.8} />

      {/* Small floating spheres */}
      <AnimatedSphere position={[-1.5, -1.2, -1]} color="#FF6584" speed={0.6} distort={0.2} size={0.4} floatIntensity={1.5} />
      <AnimatedSphere position={[1.8, 1.2, -2]} color="#00FFFF" speed={0.7} distort={0.3} size={0.3} floatIntensity={1.8} />
      <AnimatedSphere position={[0.5, -1.5, -1.5]} color="#8A2BE2" speed={0.5} distort={0.4} size={0.5} floatIntensity={1.2} />

      {/* Particle system */}
      <ParticleGrid count={150} size={0.02} color="#ffffff" />

      {/* Sparkles for added effect */}
      <Sparkles
        count={100}
        scale={10}
        size={1}
        speed={0.3}
        opacity={0.2}
        color="#ffffff"
      />

      {/* Environment map for reflections */}
      <Environment preset="night" />
    </>
  );
};

const ThreeBackground = () => {
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      };
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <Scene mousePosition={mousePosition.current} />
      </Canvas>
    </div>
  );
};

export default ThreeBackground;
