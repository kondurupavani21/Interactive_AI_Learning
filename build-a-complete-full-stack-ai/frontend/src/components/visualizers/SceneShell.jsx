import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';

export default function SceneShell({ children }) {
  return (
    <div className="scene-shell">
      <Canvas camera={{ position: [0, 5, 9], fov: 48 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 8, 6]} intensity={1.4} />
        <Stars radius={80} depth={45} count={900} factor={3} saturation={0} fade speed={0.4} />
        {children}
        <OrbitControls enablePan={false} minDistance={5} maxDistance={14} />
      </Canvas>
    </div>
  );
}
