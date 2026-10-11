import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const STONES = [
  { name: "Power", file: "/stones/power-stone.glb", color: "#a020f0" },
  { name: "Space", file: "/stones/space-stone.glb", color: "#168cff" },
  { name: "Reality", file: "/stones/reality-stone.glb", color: "#ff2638" },
  { name: "Soul", file: "/stones/soul-stone.glb", color: "#ff941f" },
  { name: "Time", file: "/stones/time-stone.glb", color: "#26ff70" },
  { name: "Mind", file: "/stones/mind-stone.glb", color: "#ffe52e" },
];

function Stone({ stone, index, position }) {
  const groupRef = useRef();
  const { scene } = useGLTF(stone.file);

  const model = useMemo(() => {
    const clone = scene.clone(true);

    // Ensure all model transforms are calculated before measuring.
    clone.updateMatrixWorld(true);

    const bounds = new THREE.Box3().setFromObject(clone);
    const size = bounds.getSize(new THREE.Vector3());
    const center = bounds.getCenter(new THREE.Vector3());

    const largest = Math.max(size.x, size.y, size.z);
    const scale = largest > 0 ? 1.8 / largest : 1;

    // Use a wrapper for reliable centering and scaling.
    const wrapper = new THREE.Group();
    wrapper.add(clone);
    wrapper.scale.setScalar(scale);
    wrapper.position.set(
      -center.x * scale,
      -center.y * scale,
      -center.z * scale
    );

    // Keep meshes visible even if their original bounding boxes
    // are unsuitable for frustum-culling calculations.
    clone.traverse((object) => {
      if (object.isMesh) {
        object.visible = true;
        object.frustumCulled = false;
      }
    });

    wrapper.updateMatrixWorld(true);

    return wrapper;
  }, [scene]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    const t = clock.elapsedTime;

    groupRef.current.position.y =
      position[1] + Math.sin(t * 1.1 + index) * 0.08;

    groupRef.current.rotation.y =
      Math.sin(t * 0.4 + index) * 0.14;

    groupRef.current.rotation.x =
      Math.sin(t * 0.5 + index) * 0.04;
  });

  return (
    <group ref={groupRef} position={position}>
      <primitive object={model} />

      <pointLight
        color={stone.color}
        intensity={1.4}
        distance={3}
      />
    </group>
  );
}

function StonesScene() {
  const spacing = 2.15;

  return (
    <>
      <ambientLight intensity={1.8} />

      <directionalLight
        position={[3, 5, 6]}
        intensity={2.5}
      />

      <pointLight
        position={[0, 1, 3]}
        color="#a65cff"
        intensity={8}
        distance={12}
      />

      {STONES.map((stone, index) => (
        <Stone
          key={stone.name}
          stone={stone}
          index={index}
          position={[
            (index - (STONES.length - 1) / 2) * spacing,
            0,
            0,
          ]}
        />
      ))}
    </>
  );
}

export default function InfinityStonesScenes() {
  return (
    <div
      id="infinity-stones"
      className="infinity-stones-inline"
    >
      <Canvas
        camera={{
          position: [0, 0, 8],
          fov: 30,
          near: 0.1,
          far: 100,
        }}
        dpr={[1, 1.25]}
        frameloop="always"
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: "high-performance",
          stencil: false,
        }}
      >
        <Suspense fallback={null}>
          <StonesScene />
        </Suspense>
      </Canvas>
    </div>
  );
}

STONES.forEach((stone) => {
  useGLTF.preload(stone.file);
});