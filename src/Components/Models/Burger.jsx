import { Clone, useGLTF } from "@react-three/drei";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
// import { useLoader } from "@react-three/fiber";

const Burger = (props) => {
  const { nodes, materials } = useGLTF("./hamburger.glb");
  // const model = useLoader(GLTFLoader, "./hamburger.glb", (loader) => {
  //   const dracoLoader = new DRACOLoader();
  //   dracoLoader.setDecoderPath("./draco/");
  //   loader.setDRACOLoader(dracoLoader);
  // });

  /**
   * Drag and drop the hamburger file (draco or not) into https://gltf.pmnd.rs
   *  and it’ll convert your model into a component:
   */
  return (
    <>
      <group {...props} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.bottomBun.geometry}
          material={materials.BunMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.meat.geometry}
          material={materials.SteakMaterial}
          position={[0, 2.82, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.cheese.geometry}
          material={materials.CheeseMaterial}
          position={[0, 3.04, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.topBun.geometry}
          material={materials.BunMaterial}
          position={[0, 1.77, 0]}
        />
      </group>
    </>
  );
};

// <Clone object={model.scene} scale="0.3" position-y={-1} />
// <Clone object={model.scene} scale="0.3" position-y={1} />
// <Clone object={model.scene} scale="0.3" position-y={3} />

export default Burger;

useGLTF.preload("./hamburger.glb");

// i can create a single file for loading the glb/gltf loader
// all i need to do is pass the path to the model in props
