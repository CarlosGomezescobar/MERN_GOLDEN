// frontend/src/components/PropertyViewer.jsx
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';

function Model() {
  return (
    <Stage>
      <mesh>
        <boxGeometry />
        <meshStandardMaterial />
      </mesh>
    </Stage>
  );
}

export default function PropertyViewer() {
  return (
    <div style={{ height: '500px', width: '100%' }}>
      <Canvas camera={{ position: [0, 2, 5] }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <Model />
        <OrbitControls />
      </Canvas>
    </div>
  );
}