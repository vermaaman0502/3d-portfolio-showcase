import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Stars, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

/** Floating geometric shapes in the background */
function FloatingShapes() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock, mouse }) => {
    if (!groupRef.current) return;
    // Gentle rotation + mouse parallax
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.05 + mouse.x * 0.1;
    groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.03) * 0.1 + mouse.y * 0.05;
  });

  const shapes = useMemo(() => {
    const items = [];
    for (let i = 0; i < 15; i++) {
      items.push({
        position: [
          (Math.random() - 0.5) * 16,
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 10 - 3,
        ] as [number, number, number],
        scale: Math.random() * 0.4 + 0.1,
        type: Math.floor(Math.random() * 3),
        speed: Math.random() * 0.5 + 0.5,
        floatIntensity: Math.random() * 2 + 0.5,
      });
    }
    return items;
  }, []);

  return (
    <group ref={groupRef}>
      {shapes.map((shape, i) => (
        <Float
          key={i}
          speed={shape.speed}
          rotationIntensity={0.5}
          floatIntensity={shape.floatIntensity}
        >
          <mesh position={shape.position} scale={shape.scale}>
            {shape.type === 0 && <octahedronGeometry args={[1, 0]} />}
            {shape.type === 1 && <icosahedronGeometry args={[1, 0]} />}
            {shape.type === 2 && <torusGeometry args={[1, 0.4, 8, 16]} />}
            <meshStandardMaterial
              color={i % 2 === 0 ? "#00d4aa" : "#9b59b6"}
              transparent
              opacity={0.15}
              wireframe
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

/** Central hero sphere with distortion */
function HeroSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock, mouse }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = clock.getElapsedTime() * 0.15;
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    // React to mouse
    meshRef.current.position.x = mouse.x * 0.3;
    meshRef.current.position.y = mouse.y * 0.2;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1}>
      <mesh ref={meshRef} scale={2.2}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color="#00d4aa"
          transparent
          opacity={0.12}
          wireframe
          distort={0.3}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

/** Particle field for depth */
function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 500;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = clock.getElapsedTime() * 0.02;
    pointsRef.current.rotation.x = clock.getElapsedTime() * 0.01;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#00d4aa"
        size={0.03}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

/** Adjusts camera based on scroll position */
function CameraRig({ scrollProgress }: { scrollProgress: number }) {
  const { camera } = useThree();

  useFrame(() => {
    // Smoothly move camera along Z and Y based on scroll
    const targetZ = 5 - scrollProgress * 2;
    const targetY = scrollProgress * 1.5;
    camera.position.z += (targetZ - camera.position.z) * 0.05;
    camera.position.y += (targetY - camera.position.y) * 0.05;
  });

  return null;
}

interface Scene3DProps {
  scrollProgress: number;
}

const Scene3D = ({ scrollProgress }: Scene3DProps) => {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#00d4aa" />
        <pointLight position={[-10, -5, 5]} intensity={0.4} color="#9b59b6" />
        <directionalLight position={[0, 5, 5]} intensity={0.3} />

        {/* Background stars */}
        <Stars
          radius={50}
          depth={50}
          count={2000}
          factor={3}
          saturation={0}
          fade
          speed={0.5}
        />

        {/* Scene elements */}
        <CameraRig scrollProgress={scrollProgress} />
        <HeroSphere />
        <FloatingShapes />
        <ParticleField />

        {/* Fog for depth */}
        <fog attach="fog" args={["#0a0d14", 8, 30]} />
      </Canvas>
    </div>
  );
};

export default Scene3D;
