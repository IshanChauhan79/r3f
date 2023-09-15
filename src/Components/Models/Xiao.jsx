import { MMDLoader } from "three/examples/jsm/loaders/MMDLoader.js";
import { MMDAnimationHelper } from "three/addons/animation/MMDAnimationHelper.js";

import { useLoader } from "@react-three/fiber";
import { useRef } from "react";

const modelFile = "./xiao/xiao.pmx";
const vmdFiles = ["./xiao/wavefile_v2.vmd"];
// let mesh, camera, scene, renderer, effect;
// let helper, ikHelper, physicsHelper;

// helper = new MMDAnimationHelper({
//   afterglow: 2.0,
// });

const Xiao = (props) => {
  const xiaoRef = useRef();

  const xiao = useLoader(MMDLoader, modelFile, (loader) => {
    console.log(loader);
    // loader.loadWithAnimation(
    //   modelFile,
    //   vmdFiles,
    //   function (mmd) {
    //     console.log(mmd);

    //     mesh = mmd.mesh;
    //     mesh.position.y = -10;
    //     scene.add(mesh);

    //     helper.add(mesh, {
    //       animation: mmd.animation,
    //       physics: true,
    //     });

    //     ikHelper = helper.objects.get(mesh).ikSolver.createHelper();
    //     ikHelper.visible = true;
    //     // scene.add(ikHelper);

    //     physicsHelper = helper.objects.get(mesh).physics.createHelper();
    //     physicsHelper.visible = false;
    //     // scene.add(physicsHelper);

    //     // initGui();
    //   },
    //   () => {},
    //   null
    // );
  });
  xiao.castShadow = true;
  xiao.receiveShadow = true;
  xiao.children.forEach((el) => {
    el.castShadow = true;
    el.receiveShadow = true;
  });
  //   xiao.material.forEach((el) => {
  //     console.log("xiao model material", el);

  //     // el.wireframe = true;
  //     el.toneMapped = false;
  //   });
  //   xiao.childe;
  //   console.log("xiao model", xiao);

  return <primitive ref={xiaoRef} {...props} object={xiao} tone />;
};

export default Xiao;

// import { OutlineEffect } from "three/addons/effects/OutlineEffect.js";
//   useThree((state) => {
//     let effect = new OutlineEffect(state.gl);
//     effect.enabled;
//     console.log(effect);
//   });

// i can create a single file for loading the glb/gltf loader
// all i need to do is pass the path to the model in props

//   const animations = useAnimations(fox.animations, fox.scene);

//   const { animationName } = useControls("Fox animation", {
//     animationName: {
//       options: animations.names,
//     },
//   });

//   useEffect(() => {
//     const action = animations.actions[animationName];
//     action.reset().fadeIn(0.5).play();
//     return () => {
//       action.fadeOut(0.5);
//     };
//   }, [animationName]);
//   return null;
