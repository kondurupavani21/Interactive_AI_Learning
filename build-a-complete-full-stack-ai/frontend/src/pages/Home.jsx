import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BrainCircuit, Search, Trophy } from 'lucide-react';
import TopicCard from '../components/TopicCard.jsx';
import { topics } from '../data/topics.js';

export default function Home() {
  const [query, setQuery] = useState('');
  const filteredTopics = useMemo(() => {
    const value = query.toLowerCase();
    return topics.filter((topic) =>
      [topic.title, topic.description, ...topic.keywords].join(' ').toLowerCase().includes(value)
    );
  }, [query]);

  return (
    <div className="page home-page">
      <section className="hero-section">
        <div className="hero-copy">
          <motion.span className="eyebrow" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            AI-powered DSA mastery
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
            Learn data structures by watching them move.
          </motion.h1>
          <p>
            Visualize stacks, queues, linked lists, sorting, and trees in 3D. Ask Gemini for explanations,
            save notes, take timed quizzes, and track your growth.
          </p>
          <div className="hero-actions">
            <Link className="primary-button large" to="/learn/stack">
              Start Learning <ArrowRight size={18} />
            </Link>
            <Link className="ghost-button large" to="/about">Explore Features</Link>
          </div>
        </div>
        <div className="hero-showcase">
          <div className="metric-card">
            <BrainCircuit size={24} />
            <strong>Gemini Tutor</strong>
            <span>Topic-aware explanations and quizzes</span>
          </div>
          <div className="metric-card">
            <Trophy size={24} />
            <strong>Progress Graphs</strong>
            <span>Scores, completion, and learning streaks</span>
          </div>
          <div className="mini-bars">
            {[72, 46, 88, 64, 95].map((height, index) => (
              <span key={height} style={{ height: `${height}%`, animationDelay: `${index * 0.12}s` }} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-heading">
        <div>
          <span className="eyebrow">Learning modules</span>
          <h2>Choose a topic</h2>
        </div>
        <label className="search-box">
          <Search size={18} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search stacks, trees, sorting..." />
        </label>
      </section>

      <section className="topic-grid">
        {filteredTopics.map((topic) => <TopicCard topic={topic} key={topic.id} />)}
      </section>
    </div>
  );
}
