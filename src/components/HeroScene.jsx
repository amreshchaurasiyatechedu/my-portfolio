import { Component, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AdaptiveDpr, Float, MeshDistortMaterial, PerformanceMonitor, Sparkles } from "@react-three/drei";
import { MathUtils } from "three";

function AdaptivePerformance() {
  const regress = useThree((state) => state.performance.regress);

  return <PerformanceMonitor factor={1} onDecline={regress} onFallback={regress} />;
}

function SceneObjects({ pointerRef, lowPower }) {
  const groupRef = useRef(null);
  const coreRef = useRef(null);

  useFrame(({ camera, clock }, delta) => {
    if (lowPower) return;

    const pointer = pointerRef.current;
    const group = groupRef.current;

    if (group) {
      group.rotation.y = MathUtils.damp(
        group.rotation.y,
        pointer.x * 0.2 + clock.elapsedTime * 0.045,
        2.2,
        delta,
      );
      group.rotation.x = MathUtils.damp(group.rotation.x, -pointer.y * 0.12, 2.2, delta);
    }

    camera.position.x = MathUtils.damp(camera.position.x, pointer.x * 0.18, 1.8, delta);
    camera.position.y = MathUtils.damp(camera.position.y, pointer.y * 0.14, 1.8, delta);
    camera.lookAt(0, 0, 0);

    if (coreRef.current) {
      coreRef.current.rotation.x += delta * 0.11;
      coreRef.current.rotation.z += delta * 0.075;
    }
  });

  if (lowPower) {
    return (
      <>
        <ambientLight intensity={0.75} />
        <pointLight color="#397cff" intensity={3} position={[2, 2, 3]} distance={6} />
        <group position={[1.45, 0.1, 0]}>
          <mesh rotation={[0.2, 0.3, 0]}>
            <icosahedronGeometry args={[0.82, 1]} />
            <meshStandardMaterial color="#2868df" emissive="#135fc5" emissiveIntensity={0.4} metalness={0.35} roughness={0.35} />
          </mesh>
          <mesh rotation={[0.62, 0.32, -0.38]}>
            <torusGeometry args={[1.06, 0.012, 6, 48]} />
            <meshBasicMaterial color="#8beaff" transparent opacity={0.6} />
          </mesh>
        </group>
        <Sparkles count={10} scale={[4.2, 4.2, 2.4]} size={1.6} speed={0} opacity={0.45} color="#6ee5ff" />
      </>
    );
  }

  return (
    <>
      <ambientLight intensity={0.65} />
      <pointLight color="#397cff" intensity={5} position={[2.8, 2.4, 3]} distance={7} />
      <pointLight color="#43dff5" intensity={3} position={[-2.8, -1.6, 2]} distance={6} />
      <group ref={groupRef}>
        <Float speed={0.7} rotationIntensity={0.12} floatIntensity={0.17} floatingRange={[-0.1, 0.1]}>
          <group position={[1.75, 1.72, -0.2]}>
            <mesh ref={coreRef} scale={0.62}>
              <icosahedronGeometry args={[0.8, 2]} />
              <MeshDistortMaterial
                color="#2868df"
                emissive="#135fc5"
                emissiveIntensity={0.95}
                metalness={0.58}
                roughness={0.22}
                distort={0.27}
                speed={0.8}
              />
            </mesh>
            <mesh rotation={[0.62, 0.32, -0.38]}>
              <torusGeometry args={[0.78, 0.012, 8, 64]} />
              <meshBasicMaterial color="#8beaff" transparent opacity={0.74} />
            </mesh>
            <mesh rotation={[-0.48, 0.9, 0.54]} scale={[1.16, 0.82, 1]}>
              <torusGeometry args={[0.78, 0.008, 8, 64]} />
              <meshBasicMaterial color="#618dff" transparent opacity={0.45} />
            </mesh>
          </group>
        </Float>

        <Float speed={0.85} rotationIntensity={0.55} floatIntensity={0.28} floatingRange={[-0.16, 0.16]}>
          <mesh position={[-1.98, 1.76, 0.25]} scale={0.18}>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color="#a8d7ff" metalness={0.72} roughness={0.2} emissive="#1d5fff" emissiveIntensity={0.55} />
          </mesh>
        </Float>

        <Float speed={0.6} rotationIntensity={0.42} floatIntensity={0.2} floatingRange={[-0.12, 0.12]}>
          <mesh position={[1.96, -1.68, -0.25]} scale={0.16}>
            <dodecahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color="#8deafa" metalness={0.62} roughness={0.24} emissive="#176ea8" emissiveIntensity={0.7} />
          </mesh>
        </Float>
      </group>
      <Sparkles count={32} scale={[4.8, 4.8, 2.8]} size={2.1} speed={0.18} opacity={0.62} color="#6ee5ff" />
    </>
  );
}

class SceneErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error("Unable to render the interactive hero scene.", error);
  }

  render() {
    return this.state.hasError ? <div className="hero-scene-fallback" aria-hidden="true" /> : this.props.children;
  }
}

export default function HeroScene({ pointerRef, lowPower }) {
  return (
    <SceneErrorBoundary>
      <Canvas
        aria-hidden="true"
        camera={{ position: [0, 0, 6], fov: 43 }}
        dpr={lowPower ? [0.75, 1] : [1, 1.25]}
        frameloop={lowPower ? "demand" : "always"}
        fallback={<div className="hero-scene-fallback" />}
        gl={{ alpha: true, antialias: !lowPower, powerPreference: "low-power" }}
        performance={{ min: lowPower ? 0.75 : 0.6, debounce: 3000 }}
        onCreated={({ gl }) => gl.setClearColor("#050a18", 0)}
      >
        {!lowPower && <AdaptivePerformance />}
        <AdaptiveDpr pixelated />
        <SceneObjects pointerRef={pointerRef} lowPower={lowPower} />
      </Canvas>
    </SceneErrorBoundary>
  );
}
