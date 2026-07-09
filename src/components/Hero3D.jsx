import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

const PARTICLE_COUNT = 2500;

function Particles({ color }) {
  const ref = useRef();

  const positions = useMemo(() => {
    const arr = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Shell of points around the camera for gentle depth
      const r = 4 + Math.random() * 7;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi) - 4;
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.02;
    ref.current.rotation.x += delta * 0.006;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color={color}
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function Icosa({ color }) {
  const group = useRef();

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.08;
    group.current.rotation.z += delta * 0.02;
    // Subtle pointer parallax (eased)
    const targetX = state.pointer.x * 0.45;
    const targetY = state.pointer.y * 0.3;
    group.current.position.x += (targetX - group.current.position.x) * 0.04;
    group.current.position.y += (targetY - group.current.position.y) * 0.04;
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[2.2, 1]} />
        <meshBasicMaterial wireframe color={color} transparent opacity={0.15} />
      </mesh>
      {/* Ghost copies: cheap chromatic-aberration fringe, no postprocessing */}
      <mesh position={[-0.02, 0, 0]}>
        <icosahedronGeometry args={[2.2, 1]} />
        <meshBasicMaterial
          wireframe
          color="#ff3c5a"
          transparent
          opacity={0.08}
        />
      </mesh>
      <mesh position={[0.02, 0, 0]}>
        <icosahedronGeometry args={[2.2, 1]} />
        <meshBasicMaterial
          wireframe
          color="#3c78ff"
          transparent
          opacity={0.08}
        />
      </mesh>
    </group>
  );
}

export default function Hero3D({ dark }) {
  const accent = dark ? "#8462f1" : "#6bd793";
  const wrapRef = useRef(null);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(([entry]) =>
      setActive(entry.isIntersecting)
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="hero3d" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
        camera={{ position: [0, 0, 5], fov: 60 }}
        frameloop={active ? "always" : "never"}
      >
        <Particles color={accent} />
        <Icosa color={accent} />
      </Canvas>
    </div>
  );
}