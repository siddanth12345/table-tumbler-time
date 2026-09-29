import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { Room } from "./Room";

const FIGHTERS: [number, number][] = [[-27, -12], [27, 11], [-6, 39], [33, -31]];

function ArenaShowcase() {
  const shots = useRef<(THREE.Mesh | null)[]>([]);
  const fighters = useRef<(THREE.Group | null)[]>([]);
  useFrame(({ camera, clock }, raw) => {
    const time = clock.elapsedTime;
    const dt = Math.min(raw, 0.05);
    const angle = time * 0.11 + Math.PI / 4;
    camera.position.set(Math.cos(angle) * 116, 92, Math.sin(angle) * 116);
    camera.lookAt(0, 3, 0);
    FIGHTERS.forEach(([x, z], i) => {
      const target = FIGHTERS[(i + 1) % FIGHTERS.length];
      const model = fighters.current[i];
      const shot = shots.current[i];
      if (model && target) {
        model.position.set(x, Math.abs(Math.sin(time * 2.8 + i)) * 1.2, z);
        model.rotation.y = Math.atan2(target[0] - x, target[1] - z);
      }
      if (shot && target) {
        const progress = (time * 1.2 + i * 0.27) % 1;
        shot.position.set(THREE.MathUtils.lerp(x, target[0], progress), 5 + Math.sin(progress * Math.PI) * 2, THREE.MathUtils.lerp(z, target[1], progress));
        shot.rotation.x += dt * 5;
      }
    });
  });
  return (
    <>
      <Room />
      {FIGHTERS.map(([x, z], i) => (
        <group key={i} ref={(group) => { fighters.current[i] = group; }} position={[x, 0, z]} scale={2.2}>
          <mesh position={[0, 3.2, 0]} castShadow><boxGeometry args={[6, 0.5, 4]} /><meshStandardMaterial color="var(--table-brown)" roughness={0.65} /></mesh>
          {([[-2.4, -1.5], [2.4, -1.5], [-2.4, 1.5], [2.4, 1.5]] as const).map(([lx, lz], j) => (
            <mesh key={j} position={[lx, 1.5, lz]} castShadow><boxGeometry args={[0.45, 3, 0.45]} /><meshStandardMaterial color="var(--table-leg)" /></mesh>
          ))}
          {[-1, 1].map((ex) => (
            <mesh key={ex} position={[ex, 3.25, 2.02]}><boxGeometry args={[0.7, 0.25, 0.08]} /><meshStandardMaterial color="var(--table-eye)" /></mesh>
          ))}
        </group>
      ))}
      {FIGHTERS.map((_, i) => (
        <mesh key={i} ref={(mesh) => { shots.current[i] = mesh; }}>
          <coneGeometry args={[0.55, 3, 5]} />
          <meshStandardMaterial color="var(--enemy)" emissive="var(--enemy)" emissiveIntensity={0.7} />
        </mesh>
      ))}
    </>
  );
}

export function HomeScene() {
  return (
    <div className="pointer-events-none fixed inset-0">
      <Canvas dpr={[1, 1.5]} camera={{ position: [100, 90, 100], fov: 60, near: 0.1, far: 900 }}>
        <color attach="background" args={["var(--arena-light)"]} />
        <ambientLight intensity={1.3} />
        <directionalLight position={[-80, 160, -90]} intensity={2} />
        <ArenaShowcase />
      </Canvas>
    </div>
  );
}