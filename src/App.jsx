import { useRef } from "react";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { CustomObjects } from "./Components/CustomObjects";

extend({ OrbitControls });

const App = () => {
  const { camera, gl } = useThree();
  const groupMesh = useRef(null);
  const squareMesh = useRef(null);

  useFrame((state, delta) => {
    // const { elapsedTime } = state.clock;
    squareMesh.current.rotation.y += delta;
    // state.camera.position.x = Math.sin(elapsedTime) * 8;
    // state.camera.position.z = Math.cos(elapsedTime) * 8;
    // state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <orbitControls args={[camera, gl.domElement]} />

      <ambientLight />
      <directionalLight position={[1, 2, 3]} intensity={1.5} />

      <CustomObjects />

      <group ref={groupMesh}>
        <mesh position-x={-2}>
          {/* <sphereGeometry args={[1.5, 32, 32]} /> */}
          {/* <meshBasicMaterial color="orange" /> */}
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
        </mesh>
        <mesh
          ref={squareMesh}
          // position={[2, 0, 0]}
          position-x={2}
          rotation-y={Math.PI * 0.25}
          scale={1.5}
        >
          <boxGeometry />
          <meshStandardMaterial
            color="mediumpurple"
            // wireframe
          />
        </mesh>
      </group>
      <mesh scale={10} rotation-x={-Math.PI * 0.5} position-y={-1}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>

      {/* <mesh position={[4, 0, 0]}>
        <torusKnotGeometry />
        <meshNormalMaterial />
      </mesh> */}
    </>
  );
};

export default App;
