import {
  Center,
  OrbitControls,
  Text3D,
  useMatcapTexture,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import { useEffect, useRef } from "react";
import { MeshMatcapMaterial, SRGBColorSpace, TorusGeometry } from "three";

const geometry = new TorusGeometry(1, 0.6, 16, 32);
const material = new MeshMatcapMaterial();

export default function Experience() {
  const donutsRef = useRef([]);
  console.log("🚀 ~ file: App.jsx:16 ~ Experience ~ donutsRef:", donutsRef);
  const [matcapTexture] = useMatcapTexture("7B5254_E9DCC7_B19986_C8AC91", 256);

  const donutArray = [...Array(100)];

  useEffect(() => {
    matcapTexture.colorSpace = SRGBColorSpace;
    matcapTexture.needsUpdate = true;
    material.matcap = matcapTexture;
    material.needsUpdate = true;
  }, []);
  useFrame((state, delta) => {
    donutsRef.current.forEach((donut) => {
      donut.rotation.y += delta * 0.2;
    });
  });

  return (
    <>
      {/* <color args={["#000000"]} attach="background" /> */}
      <Perf position="top-left" />
      <OrbitControls makeDefault />
      <directionalLight
        castShadow
        position={[1, 2, 3]}
        intensity={1.5}
        shadow-normalBias={0.04}
      />
      <ambientLight intensity={1} />
      <Center>
        <Text3D
          font="./fonts/helvetiker_regular.typeface.json"
          size={0.75}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          Hello R3F
          <meshMatcapMaterial matcap={matcapTexture} />
        </Text3D>
      </Center>
      <torusGeometry args={[1, 0.6, 16, 32]} />
      {donutArray.map((v, i) => (
        <mesh
          key={i}
          ref={(el) => {
            donutsRef.current[i] = el;
          }}
          position={[
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
          ]}
          scale={0.2 + Math.random() * 0.2}
          rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
          geometry={geometry}
          material={material}
        />
      ))}
    </>
  );
}
