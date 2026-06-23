import { useEffect, useState } from 'react';
import { Box, Text } from '@react-three/drei';
import SceneShell from './SceneShell.jsx';

const initialValues = [5, 2, 8, 3, 7, 4];

export default function SortingVisualizer() {
  const [values, setValues] = useState(initialValues);
  const [active, setActive] = useState([]);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return undefined;
    let i = 0;
    let j = 1;
    const timer = setInterval(() => {
      setActive([i, j]);
      setValues((current) => {
        const next = [...current];
        if (next[i] > next[j]) {
          [next[i], next[j]] = [next[j], next[i]];
        }
        return next;
      });
      j += 1;
      if (j >= values.length) {
        i += 1;
        j = i + 1;
      }
      if (i >= values.length - 1) {
        setRunning(false);
        setActive([]);
      }
    }, 700);
    return () => clearInterval(timer);
  }, [running, values.length]);

  return (
    <div>
      <SceneShell>
        {values.map((value, index) => (
          <group key={`${value}-${index}`} position={[index * 1.05 - 2.7, value * 0.18 - 1.2, 0]}>
            <Box args={[0.75, value * 0.36, 0.75]}>
              <meshStandardMaterial color={active.includes(index) ? '#fb7185' : '#22c55e'} metalness={0.2} roughness={0.35} />
            </Box>
            <Text position={[0, value * 0.2 + 0.15, 0.42]} fontSize={0.19} color="white">{value}</Text>
          </group>
        ))}
      </SceneShell>
      <div className="visualizer-controls">
        <button className="primary-button" onClick={() => setRunning(true)} disabled={running}>Animate Sort</button>
        <button className="ghost-button" onClick={() => { setValues([...initialValues].sort(() => Math.random() - 0.5)); setActive([]); }}>Shuffle</button>
      </div>
    </div>
  );
}
