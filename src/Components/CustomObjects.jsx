import { DoubleSide } from "three";
import { useEffect, useMemo, useRef } from "react";

export const CustomObjects = () => {
  const geometryRef = useRef(null);
  const triangleCount = 10;
  const verticesCount = triangleCount * 3;

  const positions = useMemo(() => {
    const positionsArray = new Float32Array(verticesCount * 3);
    for (let i = 0; i < positionsArray.length; i++) {
      positionsArray[i] = Math.random() - 0.5;
    }
    return positionsArray;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    geometryRef.current.computeVertexNormals();
  }, [positions]);

  return (
    <mesh scale={1.5}>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute
          attach="attributes-position"
          count={verticesCount}
          itemSize={3}
          array={positions}
          position={positions}
        />
      </bufferGeometry>
      <meshStandardMaterial color="red" side={DoubleSide} />
    </mesh>
  );
};
