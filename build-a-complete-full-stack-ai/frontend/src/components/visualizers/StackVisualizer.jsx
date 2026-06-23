import { useMemo, useState } from 'react';
import { Box, Text } from '@react-three/drei';
import SceneShell from './SceneShell.jsx';

export default function StackVisualizer() {
  const [items, setItems] = useState([10, 24, 37]);
  const nextValue = useMemo(() => Math.floor(Math.random() * 80) + 10, [items.length]);

  return (
    <div>
      <SceneShell>
        {items.map((item, index) => (
          <group key={`${item}-${index}`} position={[0, index * 0.85 - 1.4, 0]}>
            <Box args={[2.5, 0.65, 1.6]}>
              <meshStandardMaterial color={index === items.length - 1 ? '#32d583' : '#2563eb'} metalness={0.25} roughness={0.28} />
            </Box>
            <Text position={[0, 0.02, 0.84]} fontSize={0.28} color="white" anchorX="center">
              {item}
            </Text>
          </group>
        ))}
        <Text position={[0, 2.25, 0]} fontSize={0.28} color="#f8fafc">Top</Text>
      </SceneShell>
      <div className="visualizer-controls">
        <button className="primary-button" onClick={() => setItems((current) => [...current, nextValue].slice(-6))}>Push {nextValue}</button>
        <button className="ghost-button" onClick={() => setItems((current) => current.slice(0, -1))} disabled={!items.length}>Pop</button>
      </div>
    </div>
  );
}
