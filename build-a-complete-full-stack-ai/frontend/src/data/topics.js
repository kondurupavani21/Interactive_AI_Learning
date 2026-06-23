export const topics = [
  {
    id: 'stack',
    title: 'Stack',
    level: 'Beginner',
    duration: '20 min',
    accent: '#32d583',
    description: 'Master LIFO behavior with push, pop, peek, and call stack intuition.',
    objectives: ['Explain LIFO order', 'Simulate push and pop', 'Identify stack use cases'],
    keywords: ['lifo', 'push', 'pop', 'recursion'],
    visualizer: 'stack'
  },
  {
    id: 'queue',
    title: 'Queue',
    level: 'Beginner',
    duration: '18 min',
    accent: '#38bdf8',
    description: 'Understand FIFO processing through enqueue, dequeue, and real-world queues.',
    objectives: ['Explain FIFO order', 'Model enqueue and dequeue', 'Compare queues with stacks'],
    keywords: ['fifo', 'enqueue', 'dequeue', 'buffer'],
    visualizer: 'queue'
  },
  {
    id: 'linked-list',
    title: 'Linked List',
    level: 'Intermediate',
    duration: '25 min',
    accent: '#f59e0b',
    description: 'See how nodes, pointers, insertion, and deletion work without contiguous memory.',
    objectives: ['Describe node links', 'Trace insertions', 'Compare arrays and linked lists'],
    keywords: ['node', 'pointer', 'head', 'insert'],
    visualizer: 'linked-list'
  },
  {
    id: 'sorting',
    title: 'Sorting Algorithms',
    level: 'Intermediate',
    duration: '35 min',
    accent: '#fb7185',
    description: 'Animate comparisons and swaps while learning selection sort fundamentals.',
    objectives: ['Trace comparisons', 'Explain swaps', 'Reason about time complexity'],
    keywords: ['selection sort', 'swap', 'comparison', 'order'],
    visualizer: 'sorting'
  },
  {
    id: 'binary-tree',
    title: 'Binary Tree',
    level: 'Advanced',
    duration: '30 min',
    accent: '#a78bfa',
    description: 'Explore hierarchical data, traversal orders, and parent-child relationships.',
    objectives: ['Identify tree terms', 'Run DFS traversals', 'Visualize recursive traversal'],
    keywords: ['root', 'child', 'dfs', 'traversal'],
    visualizer: 'tree'
  }
];

export const findTopic = (topicId) => topics.find((topic) => topic.id === topicId);
