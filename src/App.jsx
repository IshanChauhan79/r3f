import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { Suspense } from "react";
// import FlightHelmet from "./Components/Models/FlightHelmet";
import Placeholder from "./Components/Models/Placeholder";
import Burger from "./Components/Models/Burger";
import Fox from "./Components/Models/Fox";
import Xiao from "./Components/Models/Xiao";

export default function Experience() {
  // const modeluseGLTF

  return (
    <>
      <color args={["#000000"]} attach="background" />
      <Perf position="top-left" />
      <OrbitControls makeDefault />
      <directionalLight
        castShadow
        position={[1, 2, 3]}
        intensity={1.5}
        shadow-normalBias={0.04}
      />
      <ambientLight intensity={1} />
      <mesh
        receiveShadow
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
        scale={10}
      >
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
      <Suspense
        fallback={
          <Placeholder position-x={-1} position-y={1} scale={[2, 4, 2]} />
        }
      >
        <Xiao scale={0.2} position-y={-1} position-x={-1} />
      </Suspense>

      <Suspense
        fallback={
          <Placeholder position-x={2} position-y={0.5} scale={[2, 3, 2]} />
        }
      >
        {/* <FlightHelmet /> */}
        <Burger scale={0.35} position-x={2} />
      </Suspense>

      <Suspense
        fallback={
          <Placeholder position-x={-3.5} position-y={0.5} scale={[1, 3, 4]} />
        }
      >
        <Fox scale="0.03" position-y={-1} position-x={-3.5} />
      </Suspense>
    </>
  );
}

{
  /* <mesh castShadow position-x={ - 2 }>
<sphereGeometry />
<meshStandardMaterial color="orange" />
</mesh>

<mesh castShadow position-x={ 2 } scale={ 1.5 }>
<boxGeometry />
<meshStandardMaterial color="mediumpurple" />
</mesh> */
}
