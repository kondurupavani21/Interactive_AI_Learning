import StackVisualizer from './visualizers/StackVisualizer.jsx';
import QueueVisualizer from './visualizers/QueueVisualizer.jsx';
import LinkedListVisualizer from './visualizers/LinkedListVisualizer.jsx';
import SortingVisualizer from './visualizers/SortingVisualizer.jsx';
import TreeVisualizer from './visualizers/TreeVisualizer.jsx';

export default function Visualizer({ type }) {
  const visualizers = {
    stack: StackVisualizer,
    queue: QueueVisualizer,
    'linked-list': LinkedListVisualizer,
    sorting: SortingVisualizer,
    tree: TreeVisualizer
  };

  const Component = visualizers[type] || StackVisualizer;
  return <Component />;
}
