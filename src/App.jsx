import { useRef } from "react";
import {
  OrbitControls,
  TransformControls,
  PivotControls,
  Html,
  Text,
  Float,
  MeshReflectorMaterial,
  useHelper,
  BakeShadows,
  SoftShadows,
  AccumulativeShadows,
  RandomizedLight,
  ContactShadows,
  Sky,
  Environment,
  Lightformer,
  Stage,
} from "@react-three/drei";
import { useControls, button } from "leva";
import { Perf } from "r3f-perf";
import "./App.css";
import { DirectionalLightHelper } from "three";
import { useFrame } from "@react-three/fiber";

const App = () => {
  const squareMesh = useRef(null);
  const sphereMesh = useRef(null);
  const directionalLight = useRef(null);

  // useHelper(directionalLight, DirectionalLightHelper, 1);

  const { perfVisible } = useControls("1 perforamce", {
    perfVisible: true,
  });

  const { shperePosition, color, visible } = useControls("Sphere", {
    shperePosition: {
      value: { x: -2, y: 1, z: 0 },
      min: -10,
      max: 10,
      step: 0.01,
      joystick: "invertY",
    },
    color: "#ffa500",
    visible: true,
    myInterval: {
      min: 0,
      max: 10,
      value: [4, 5],
    },
    clickMe: button(() => {
      console.log("ok");
    }),
    choice: {
      options: [1, 2, 3],
    },
  });

  const { sunPosition } = useControls("sky", {
    sunPosition: { value: [1, 2, 3] },
  });

  const {
    color: shadowColor,
    opacity,
    blur,
  } = useControls("contact shadows", {
    color: "#4b2709",
    opacity: { value: 0.4, min: 0, max: 1 },
    blur: { value: 2.8, min: 0, max: 10 },
  });

  const { envMapIntensity, envMapHeight, envMapRadius, envMapScale } =
    useControls("environment map", {
      envMapIntensity: { value: 7, min: 0, max: 12 },
      envMapHeight: { value: 7, min: 0, max: 100 },
      envMapRadius: { value: 28, min: 10, max: 1000 },
      envMapScale: { value: 100, min: 10, max: 1000 },
    });

  useFrame((state, delta) => {
    squareMesh.current.rotation.y += 1 * delta;
  });

  return (
    <>
      {perfVisible && <Perf position="top-left" />}

      <OrbitControls makeDefault />

      {/* <ambientLight /> */}
      {/* <directionalLight
        ref={directionalLight}
        position={sunPosition}
        intensity={1.5}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={5}
        shadow-camera-right={5}
        shadow-camera-bottom={-5}
        shadow-camera-left={-5}
      /> */}

      <ContactShadows
        position={[0, 0, 0]}
        scale={10}
        resolution={512}
        far={5}
        color={shadowColor}
        opacity={opacity}
        blur={blur}
        frames={1}
      />

      {/* <Environment
          background
          files={[
            "./textures/environmentMaps/2/px.jpg",
            "./textures/environmentMaps/2/nx.jpg",
            "./textures/environmentMaps/2/py.jpg",
            "./textures/environmentMaps/2/ny.jpg",
            "./textures/environmentMaps/2/pz.jpg",
            "./textures/environmentMaps/2/nz.jpg",
          ]}
        /> */}
      <Environment
        background
        preset="sunset"
        ground={{
          height: envMapHeight,
          radius: envMapRadius,
          scale: envMapScale,
        }}
        // resolution={32}
        // files={"./textures/environmentMaps/the_sky_is_on_fire_2k.hdr"}
      >
        {/* <color args={["#000000"]} attach="background" />
        <Lightformer
          position-z={-6}
          scale={5}
          color="red"
          intensity={10}
          form="ring"
        /> */}

        {/* <mesh position-z={-6} scale={20}>
          <planeGeometry />
          <meshBasicMaterial color={[10, 0, 0]} />
        </mesh> */}
        {/* <mesh position-z={6} scale={20} rotation-x={Math.PI}>
          <planeGeometry />
          <meshBasicMaterial color="blue" />
        </mesh> */}
      </Environment>

      <mesh
        visible={visible}
        position={[shperePosition.x, shperePosition.y, shperePosition.z]}
        ref={sphereMesh}
        castShadow
      >
        <sphereGeometry />
        <meshStandardMaterial color={color} envMapIntensity={envMapIntensity} />
      </mesh>
      <mesh
        ref={squareMesh}
        position-y={1}
        position-x={2}
        scale={1.5}
        castShadow
      >
        <boxGeometry />
        <meshStandardMaterial
          color="mediumpurple"
          envMapIntensity={envMapIntensity}
        />
      </mesh>

      {/* <mesh
          position-y={0}
          rotation-x={-Math.PI * 0.5}
          scale={10}
          // receiveShadow
        >
          <planeGeometry />
          <MeshReflectorMaterial
            resolution={512}
            blur={[1000, 1000]}
            mixBlur={1}
            mirror={0.5}
            color="greenyellow"
            envMapIntensity={envMapIntensity}
          />
        </mesh> */}
    </>
  );
};

export default App;

// // stage env ----
// <>
// {perfVisible && <Perf position="top-left" />}

// <OrbitControls makeDefault />

// <Stage
//   shadows={{ type: "contact", opacity: 0.2, blur: 3 }}
//   environment="sunset"
//   preset="portrait"
//   intensity={2}
// >
//   <mesh castShadow position-y={1} position-x={-2}>
//     <sphereGeometry />
//     <meshStandardMaterial
//       color="orange"
//       // envMapIntensity={envMapIntensity}
//     />
//   </mesh>

//   <mesh
//     castShadow
//     ref={squareMesh}
//     position-y={1}
//     position-x={2}
//     scale={1.5}
//   >
//     <boxGeometry />
//     <meshStandardMaterial
//       color="mediumpurple"
//       // envMapIntensity={envMapIntensity}
//     />
//   </mesh>
// </Stage>
// </>

// // shadows -

// <>
// {perfVisible && <Perf position="top-left" />}
// {/* <BakeShadows /> */}
// {/* <SoftShadows
//   frustum={3.75}
//   size={50}
//   near={9.5}
//   samples={17}
//   rings={11}
// /> */}

// <OrbitControls makeDefault />

// {/* <AccumulativeShadows
//   position-y={-1.199}
//   color="greenyellow"
//   scale={10}
//   opacity={0.8}
//   frames={Infinity}
//   temporal
//   blend={100}
// >
//   <RandomizedLight
//     amount={8}
//     radius={1}
//     ambient={0.5}
//     intensity={1}
//     position={[1, 2, 3]}
//     bias={0.001}
//   />
// </AccumulativeShadows> */}
// <Sky sunPosition={sunPosition} />
// <ContactShadows
//   position={[0, -1.199, 0]}
//   scale={10}
//   resolution={512}
//   far={5}
//   color={shadowColor}
//   opacity={opacity}
//   blur={blur}
//   frames={1}
// />

// <ambientLight />
// <directionalLight
//   ref={directionalLight}
//   position={sunPosition}
//   intensity={1.5}
//   castShadow
//   shadow-mapSize={[1024, 1024]}
//   shadow-camera-near={1}
//   shadow-camera-far={10}
//   shadow-camera-top={5}
//   shadow-camera-right={5}
//   shadow-camera-bottom={-5}
//   shadow-camera-left={-5}
// />

// <mesh
//   visible={visible}
//   position={[shperePosition.x, shperePosition.y, shperePosition.z]}
//   ref={sphereMesh}
//   castShadow
// >
//   <sphereGeometry />
//   <meshStandardMaterial color={color} />
//   <Html
//     position={[1, 1, 0]}
//     wrapperClass="label"
//     center
//     distanceFactor={0.01}
//     occlude={[sphereMesh]}
//   >
//     using DREI helpers
//   </Html>
// </mesh>
// <mesh ref={squareMesh} position-x={2} scale={1.5} castShadow>
//   <boxGeometry />
//   <meshStandardMaterial color="mediumpurple" />
// </mesh>

// <mesh
//   position-y={-1.2}
//   rotation-x={-Math.PI * 0.5}
//   scale={10}
//   // receiveShadow
// >
//   <planeGeometry />
//   <MeshReflectorMaterial
//     resolution={512}
//     blur={[1000, 1000]}
//     mixBlur={1}
//     mirror={0.5}
//     color="greenyellow"
//   />
// </mesh>
// </>

//- text

// <>
// <OrbitControls makeDefault />
// <ambientLight />
// <directionalLight position={[1, 2, 3]} intensity={1.5} />

// {/* <CustomObjects /> */}
// {/* <orbitControls args={[camera, gl.domElement]} /> */}

// <PivotControls
//   anchor={[0, 0, 0]}
//   depthTest={false}
//   lineWidth={2}
//   axisColors={["#ff0000", "#00ff00", "#0000ff"]}
//   scale={200}
//   fixed={true}
// >
//   <mesh position-x={-2} ref={sphereMesh}>
//     <sphereGeometry />
//     <meshStandardMaterial color="orange" />
//     <Html
//       position={[1, 1, 0]}
//       wrapperClass="label"
//       center
//       distanceFactor={0.01}
//       occlude={[sphereMesh]}
//     >
//       using DREI helpers
//     </Html>
//   </mesh>
// </PivotControls>
// <mesh ref={squareMesh} position-x={2} scale={1.5}>
//   <boxGeometry />
//   <meshStandardMaterial color="mediumpurple" />
// </mesh>
// <TransformControls object={squareMesh} />

// <mesh position-y={-1.2} rotation-x={-Math.PI * 0.5} scale={10}>
//   <planeGeometry />
//   <MeshReflectorMaterial
//     resolution={512}
//     blur={[1000, 1000]}
//     mixBlur={1}
//     mirror={0.5}
//     // color="greenyellow"
//   />
// </mesh>
// <Float speed={5} floatIntensity={5}>
//   <Text
//     font="./bangers-v20-latin-regular.woff"
//     fontSize={0.6}
//     color="salmon"
//     position-y={2}
//     maxWidth={2}
//     textAlign="center"
//   >
//     I LOVE R3F
//     {/* <meshNormalMaterial /> */}
//   </Text>
// </Float>
// </>
