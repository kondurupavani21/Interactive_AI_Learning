import { useEffect, useState } from 'react';
import { Sphere, Text, Line } from '@react-three/drei';
import SceneShell from './SceneShell.jsx';

const nodes = [
  { id: 'A', value: 40, position: [0, 1.7, 0], children: ['B', 'C'] },
  { id: 'B', value: 20, position: [-2, 0.25, 0], children: ['D', 'E'] },
  { id: 'C', value: 60, position: [2, 0.25, 0], children: ['F', 'G'] },
  { id: 'D', value: 10, position: [-3, -1.3, 0], children: [] },
  { id: 'E', value: 30, position: [-1, -1.3, 0], children: [] },
  { id: 'F', value: 50, position: [1, -1.3, 0], children: [] },
  { id: 'G', value: 70, position: [3, -1.3, 0], children: [] }
];
const order = ['A', 'B', 'D', 'E', 'C', 'F', 'G'];

export default function TreeVisualizer() {
  const [visited, setVisited] = useState([]);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return undefined;
    setVisited([]);
    let index = 0;
    const timer = setInterval(() => {
      setVisited((current) => [...current, order[index]]);
      index += 1;
      if (index >= order.length) setRunning(false);
    }, 650);
    return () => clearInterval(timer);
  }, [running]);

  return (
    <div>
      <SceneShell>
        {nodes.flatMap((node) =>
          node.children.map((childId) => {
            const child = nodes.find((candidate) => candidate.id === childId);
            return <Line key={`${node.id}-${child.id}`} points={[node.position, child.position]} color="#94a3b8" lineWidth={2} />;
          })
        )}
        {nodes.map((node) => (
          <group key={node.id} position={node.position}>
            <Sphere args={[0.42, 32, 32]}>
              <meshStandardMaterial color={visited.includes(node.id) ? '#a78bfa' : '#2563eb'} metalness={0.18} roughness={0.28} />
            </Sphere>
            <Text position={[0, 0, 0.45]} fontSize={0.18} color="white" anchorX="center">{node.value}</Text>
          </group>
        ))}
      </SceneShell>
      <div className="visualizer-controls">
        <button className="primary-button" onClick={() => setRunning(true)} disabled={running}>Run DFS</button>
        <button className="ghost-button" onClick={() => setVisited([])}>Reset</button>
      </div>
    </div>
  );
}
