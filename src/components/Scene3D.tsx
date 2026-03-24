import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Stars, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

/**
 * Neural Network Nodes — interconnected floating spheres
 * representing AI neurons with glowing connections
 */
function NeuralNetwork() {
  const groupRef = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  // Generate neural node positions
  const { nodes, linePositions } = useMemo(() => {
    const nodeList: { pos: [number, number, number]; size: number }[] = [];
    for (let i = 0; i < 25; i++) {
      nodeList.push({
        pos: [
          (Math.random() - 0.5) * 14,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 8 - 2,
        ],
        size: Math.random() * 0.08 + 0.03,
      });
    }

    // Create connections between nearby nodes
    const lines: number[] = [];
    for (let i = 0; i < nodeList.length; i++) {
      for (let j = i + 1; j < nodeList.length; j++) {
        const dist = Math.sqrt(
          Math.pow(nodeList[i].pos[0] - nodeList[j].pos[0], 2) +
          Math.pow(nodeList[i].pos[1] - nodeList[j].pos[1], 2) +
          Math.pow(nodeList[i].pos[2] - nodeList[j].pos[2], 2)
        );
        if (dist < 5) {
          lines.push(...nodeList[i].pos, ...nodeList[j].pos);
        }
      }
    }

    return { nodes: nodeList, linePositions: new Float32Array(lines) };
  }, []);

  useFrame(({ clock, mouse }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.03 + mouse.x * 0.08;
    groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.02) * 0.08 + mouse.y * 0.04;
  });

  return (
    <group ref={groupRef}>
      {/* Neural connections (lines) */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
            count={linePositions.length / 3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#1e90ff" transparent opacity={0.08} />
      </lineSegments>

      {/* Neural nodes (glowing spheres) */}
      {nodes.map((node, i) => (
        <Float key={i} speed={0.3 + Math.random() * 0.3} floatIntensity={0.5}>
          <mesh position={node.pos} scale={node.size}>
            <sphereGeometry args={[1, 8, 8]} />
            <meshStandardMaterial
              color={i % 3 === 0 ? "#1e90ff" : i % 3 === 1 ? "#8b5cf6" : "#2dd4a0"}
              emissive={i % 3 === 0 ? "#1e90ff" : i % 3 === 1 ? "#8b5cf6" : "#2dd4a0"}
              emissiveIntensity={0.8}
              transparent
              opacity={0.7}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

/** Central AI brain sphere with distortion */
function AIBrainSphere() {
  const meshRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock, mouse }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = clock.getElapsedTime() * 0.12;
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.08;
    meshRef.current.position.x = mouse.x * 0.3;
    meshRef.current.position.y = mouse.y * 0.2;

    if (innerRef.current) {
      innerRef.current.rotation.x = -clock.getElapsedTime() * 0.2;
      innerRef.current.rotation.z = clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.8}>
      <group ref={meshRef}>
        {/* Outer wireframe shell */}
        <mesh scale={2.5}>
          <icosahedronGeometry args={[1, 3]} />
          <MeshDistortMaterial
            color="#1e90ff"
            transparent
            opacity={0.08}
            wireframe
            distort={0.25}
            speed={1.5}
          />
        </mesh>
        {/* Inner pulsing core */}
        <mesh ref={innerRef} scale={1.2}>
          <icosahedronGeometry args={[1, 2]} />
          <MeshDistortMaterial
            color="#8b5cf6"
            transparent
            opacity={0.06}
            wireframe
            distort={0.4}
            speed={3}
          />
        </mesh>
        {/* Glowing center point */}
        <mesh scale={0.15}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial
            color="#2dd4a0"
            emissive="#2dd4a0"
            emissiveIntensity={2}
            transparent
            opacity={0.9}
          />
        </mesh>
      </group>
    </Float>
  );
}

/** Data stream particles flowing in patterns */
function DataStreamParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 800;

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Particles arranged in flowing streams
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 15 + 3;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = Math.sin(angle) * radius - 5;
      vel[i * 3] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }
    return { positions: pos, velocities: vel };
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const geo = pointsRef.current.geometry;
    const posAttr = geo.attributes.position;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      // Gentle flowing motion
      (posAttr.array as Float32Array)[idx] += Math.sin(clock.getElapsedTime() * 0.5 + i * 0.1) * 0.002;
      (posAttr.array as Float32Array)[idx + 1] += velocities[idx + 1];
      (posAttr.array as Float32Array)[idx + 2] += Math.cos(clock.getElapsedTime() * 0.3 + i * 0.05) * 0.002;

      // Reset particles that drift too far
      if (Math.abs((posAttr.array as Float32Array)[idx + 1]) > 12) {
        (posAttr.array as Float32Array)[idx + 1] *= -0.9;
      }
    }
    posAttr.needsUpdate = true;

    pointsRef.current.rotation.y = clock.getElapsedTime() * 0.015;
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
        color="#1e90ff"
        size={0.025}
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

/** Camera rig responding to scroll */
function CameraRig({ scrollProgress }: { scrollProgress: number }) {
  const { camera } = useThree();

  useFrame(() => {
    const targetZ = 5 - scrollProgress * 2;
    const targetY = scrollProgress * 1.5;
    const targetX = Math.sin(scrollProgress * Math.PI) * 0.5;
    camera.position.z += (targetZ - camera.position.z) * 0.05;
    camera.position.y += (targetY - camera.position.y) * 0.05;
    camera.position.x += (targetX - camera.position.x) * 0.05;
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
        {/* AI-themed lighting — cool blues and purples */}
        <ambientLight intensity={0.15} />
        <pointLight position={[10, 10, 10]} intensity={0.6} color="#1e90ff" />
        <pointLight position={[-10, -5, 5]} intensity={0.4} color="#8b5cf6" />
        <pointLight position={[0, -8, 3]} intensity={0.3} color="#2dd4a0" />
        <directionalLight position={[0, 5, 5]} intensity={0.2} />

        {/* Deep space background */}
        <Stars
          radius={60}
          depth={60}
          count={3000}
          factor={2.5}
          saturation={0.2}
          fade
          speed={0.3}
        />

        {/* Scene elements */}
        <CameraRig scrollProgress={scrollProgress} />
        <AIBrainSphere />
        <NeuralNetwork />
        <DataStreamParticles />

        {/* Deep fog for cinematic depth */}
        <fog attach="fog" args={["#060a14", 6, 28]} />
      </Canvas>
    </div>
  );
};

export default Scene3D;
