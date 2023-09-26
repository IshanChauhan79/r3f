import {
  BallCollider,
  CuboidCollider,
  CylinderCollider,
  InstancedRigidBodies,
  Physics,
  RigidBody,
} from "@react-three/rapier";
import { Perf } from "r3f-perf";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Euler, Matrix4, Quaternion, Vector3 } from "three";

const App = () => {
  const [hitSound] = useState(() => new Audio("./hit.mp3"));
  const hamburger = useGLTF("./hamburger.glb");

  const cube = useRef(null);
  const iCubes = useRef(null);
  const twister = useRef(null);
  const cubesCount = 100;

  const cubeCliked = () => {
    const mass = cube.current.mass();
    cube.current.applyImpulse({ x: 0, y: 5 * mass, z: 0 });
    cube.current.applyTorqueImpulse({
      x: Math.random() - 0.5,
      y: Math.random() - 0.5,
      z: Math.random() - 0.5,
    });
  };

  const collisionEnter = () => {
    hitSound.currentTime = 0;
    hitSound.volume = Math.random();
    hitSound.play();
  };

  // useEffect(() => {
  //   for (let i = 0; i < cubesCount; i++) {
  //     const matrix = new Matrix4();
  //     matrix.compose(
  //       new Vector3(i * 2, 0, 0),
  //       new Quaternion(),
  //       new Vector3(1, 1, 1)
  //     );
  //     iCubes.current.setMatrixAt(i, matrix);
  //   }
  // }, []);

  const instances = useMemo(() => {
    const instances = [];
    for (let i = 0; i < cubesCount; i++) {
      instances.push({
        key: "instance_" + i,
        position: [
          (Math.random() - 0.5) * 8,
          6 + i * 0.2,
          (Math.random() - 0.5) * 8,
        ],
        rotation: [Math.random(), Math.random(), Math.random()],
      });
    }

    return instances;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const eulerRotation = new Euler(0, time * 3, 0);

    const quaternionRotation = new Quaternion();

    quaternionRotation.setFromEuler(eulerRotation);
    twister.current.setNextKinematicRotation(quaternionRotation);

    const angle = time * 0.5;
    const x = Math.cos(angle) * 2;
    const z = Math.sin(angle) * 2;
    twister.current.setNextKinematicTranslation({ x: x, y: -0.8, z: z });

    // console.log(time);
  });

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <Physics
        debug={false}
        //    gravity={[9.8, 9.8, 9.8]}
      >
        <RigidBody colliders="ball" position={[-1.5, 2, 0]}>
          <mesh castShadow>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
          </mesh>
        </RigidBody>
        <RigidBody
          ref={cube}
          position={[1.5, 2, 0]}
          // gravityScale={0.2}
          restitution={0}
          friction={0.7}
          colliders={false}
          onCollisionEnter={collisionEnter}
          // onCollisionExit={() => {
          //   console.log("exit");
          // }}
          // onSleep={() => {
          //   console.log("sleep");
          // }}
          // onWake={() => {
          //   console.log("wake");
          // }}
        >
          <mesh castShadow onClick={cubeCliked}>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
            <CuboidCollider args={[0.5, 0.5, 0.5]} mass={2} />
          </mesh>
        </RigidBody>

        {/* <RigidBody colliders="ball">
          <mesh
            castShadow
            //   position={[-2, 2, 0]
            position={[0, 4, 0]}
          >
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
          </mesh>
        </RigidBody> */}
        {/* <RigidBody
          //  colliders="trimesh"
          colliders={false}
          position={[0, 1, -0.25]}
          rotation={[Math.PI * 0.1, 0, 0]}
        >
         <CuboidCollider args={[1.5, 1.5, 0.5]} /> 
          <BallCollider args={[1.5]} />
          <mesh castShadow>
            <torusGeometry args={[1, 0.5, 16, 32]} />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
        </RigidBody> */}

        {/* <RigidBody>
          <mesh castShadow position={[2, 2, 0]}>
            <boxGeometry args={[3, 2, 1]} />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
          <mesh castShadow position={[2, 2, 3]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
        </RigidBody> */}
        <RigidBody
          type="fixed"
          //  restitution={1} // 1 is default
          //   friction={0} //0.7 default
        >
          <mesh receiveShadow position-y={-1.25}>
            <boxGeometry args={[10, 0.5, 10]} />
            <meshStandardMaterial color="greenyellow" />
          </mesh>
        </RigidBody>
        <RigidBody
          ref={twister}
          position={[0, -0.8, 0]}
          friction={0}
          type="kinematicPosition"
        >
          <mesh scale={[0.4, 0.4, 5]}>
            <boxGeometry />
            <meshStandardMaterial color="red" />
          </mesh>
        </RigidBody>
        <RigidBody colliders={false} position={[0, 4, 0]}>
          <primitive object={hamburger.scene} scale={0.25} />
          <CylinderCollider args={[0.4, 1.25]} position={[0, 0.6, 0]} />
        </RigidBody>

        {/* instanced mesh for stress test */}
        <InstancedRigidBodies instances={instances}>
          <instancedMesh
            // ref={iCubes}
            castShadow
            receiveShadow
            args={[null, null, cubesCount]}
          >
            <boxGeometry />
            <meshStandardMaterial color="tomato" />
          </instancedMesh>
        </InstancedRigidBodies>

        {/* stress test  walls*/}

        <RigidBody type="fixed">
          <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, 5.5]} />
          <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, -5.5]} />
          <CuboidCollider args={[0.5, 2, 5]} position={[5.5, 1, 0]} />
          <CuboidCollider args={[0.5, 2, 5]} position={[-5.5, 1, 0]} />
        </RigidBody>
      </Physics>
    </>
  );
};

export default App;
