import { useState } from 'react';
import { Box, Text, Line } from '@react-three/drei';
import SceneShell from './SceneShell.jsx';

export default function LinkedListVisualizer() {
  const [nodes, setNodes] = useState([12, 28, 44, 63]);

  return (
    <div>
      <SceneShell>
        {nodes.map((node, index) => {
          const x = index * 1.75 - 2.6;
          return (
            <group key={`${node}-${index}`} position={[x, 0, 0]}>
              <Box args={[1.05, 1.05, 1.05]}>
                <meshStandardMaterial color={index === 0 ? '#f59e0b' : '#6366f1'} metalness={0.2} roughness={0.32} />
              </Box>
              <Text position={[0, 0, 0.58]} fontSize={0.22} color="white" anchorX="center">{node}</Text>
              {index < nodes.length - 1 && (
                <Line points={[[0.65, 0, 0], [1.28, 0, 0]]} color="#f8fafc" lineWidth={3} />
              )}
            </group>
          );
        })}
        <Text position={[-3.15, -1.1, 0]} fontSize={0.22} color="#f8fafc">Head</Text>
      </SceneShell>
      <div className="visualizer-controls">
        <button className="primary-button" onClick={() => setNodes((current) => [...current, Math.floor(Math.random() * 90)].slice(-5))}>Insert Tail</button>
        <button className="ghost-button" onClick={() => setNodes((current) => current.slice(1))} disabled={!nodes.length}>Delete Head</button>
      </div>
    </div>
  );
}
