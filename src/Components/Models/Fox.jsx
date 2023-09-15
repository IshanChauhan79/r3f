import { useAnimations, useGLTF } from "@react-three/drei";
import { useControls } from "leva";
import { useEffect } from "react";

// setTimeout(() => {
//   animations.actions.Walk.play();
//   animations.actions.Walk.crossFadeFrom(animations.actions.Run, 1);
// }, 2000);

const Fox = (props) => {
  const fox = useGLTF("./Fox/glTF/Fox.gltf");
  const animations = useAnimations(fox.animations, fox.scene);

  const { animationName } = useControls("Fox animation", {
    animationName: {
      options: animations.names,
    },
  });

  useEffect(() => {
    const action = animations.actions[animationName];
    action.reset().fadeIn(0.5).play();
    return () => {
      action.fadeOut(0.5);
    };
  }, [animationName]);

  return (
    <>
      <primitive {...props} object={fox.scene} />
    </>
  );
};

export default Fox;

// i can create a single file for loading the glb/gltf loader
// all i need to do is pass the path to the model in props
