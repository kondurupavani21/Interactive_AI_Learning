import { useMemo, useState } from 'react';
import { Box, Text } from '@react-three/drei';
import SceneShell from './SceneShell.jsx';

export default function QueueVisualizer() {
  const [items, setItems] = useState([8, 15, 23, 42]);
  const nextValue = useMemo(() => Math.floor(Math.random() * 90) + 1, [items.length]);

  return (
    <div>
      <SceneShell>
        {items.map((item, index) => (
          <group key={`${item}-${index}`} position={[index * 1.45 - 2.2, 0, 0]}>
            <Box args={[1.05, 1.05, 1.05]}>
              <meshStandardMaterial color={index === 0 ? '#38bdf8' : '#14b8a6'} metalness={0.18} roughness={0.3} />
            </Box>
            <Text position={[0, 0, 0.58]} fontSize={0.25} color="white" anchorX="center">
              {item}
            </Text>
          </group>
        ))}
        <Text position={[-3.35, -1.05, 0]} fontSize={0.24} color="#f8fafc">Front</Text>
        <Text position={[3.35, -1.05, 0]} fontSize={0.24} color="#f8fafc">Rear</Text>
      </SceneShell>
      <div className="visualizer-controls">
        <button className="primary-button" onClick={() => setItems((current) => [...current, nextValue].slice(-6))}>Enqueue {nextValue}</button>
        <button className="ghost-button" onClick={() => setItems((current) => current.slice(1))} disabled={!items.length}>Dequeue</button>
      </div>
    </div>
  );
}
