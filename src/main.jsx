import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Canvas
      // flat
      // dpr={[1, 2]} default
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        // toneMapping: THREE.CineonToneMapping,
        outputColorSpace: THREE.SRGBColorSpace,
      }}
      orthographic
      camera={{
        fov: 45,
        near: 0.001,
        zoom: 100,
        far: 200,
        position: [3, 2, 6],
      }}
    >
      <App />
    </Canvas>
  </React.StrictMode>
);
