import { useRef } from "react";
import {
  OrbitControls,
  TransformControls,
  PivotControls,
  Html,
  Text,
  Float,
  MeshReflectorMaterial,
} from "@react-three/drei";
import "./App.css";

const App = () => {
  const squareMesh = useRef(null);
  const sphereMesh = useRef(null);

  return (
    <>
      <OrbitControls makeDefault />
      <ambientLight />
      <directionalLight position={[1, 2, 3]} intensity={1.5} />

      {/* <CustomObjects /> */}
      {/* <orbitControls args={[camera, gl.domElement]} /> */}

      <PivotControls
        anchor={[0, 0, 0]}
        depthTest={false}
        lineWidth={2}
        axisColors={["#ff0000", "#00ff00", "#0000ff"]}
        scale={200}
        fixed={true}
      >
        <mesh position-x={-2} ref={sphereMesh}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
          <Html
            position={[1, 1, 0]}
            wrapperClass="label"
            center
            distanceFactor={0.01}
            occlude={[sphereMesh]}
          >
            using DREI helpers
          </Html>
        </mesh>
      </PivotControls>
      <mesh ref={squareMesh} position-x={2} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>
      <TransformControls object={squareMesh} />

      <mesh position-y={-1.2} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <MeshReflectorMaterial
          resolution={512}
          blur={[1000, 1000]}
          mixBlur={1}
          mirror={0.5}
          // color="greenyellow"
        />
      </mesh>
      <Float speed={5} floatIntensity={5}>
        <Text
          font="./bangers-v20-latin-regular.woff"
          fontSize={0.6}
          color="salmon"
          position-y={2}
          maxWidth={2}
          textAlign="center"
        >
          I LOVE R3F
          {/* <meshNormalMaterial /> */}
        </Text>
      </Float>
    </>
  );
};

export default App;
