import React from "react";
import ReactDOM from "react-dom/client";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Leva collapsed />
    <Canvas
      shadows={true}
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        // toneMapping: THREE.CineonToneMapping,
        outputColorSpace: THREE.SRGBColorSpace,
      }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [4, 3, 10],
      }}
    >
      {/* <color attach="background" args={["red"]} /> */}
      <App />
    </Canvas>
  </React.StrictMode>
);
