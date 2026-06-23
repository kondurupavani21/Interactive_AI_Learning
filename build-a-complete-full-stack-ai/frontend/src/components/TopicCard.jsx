import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Signal } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TopicCard({ topic }) {
  return (
    <motion.article
      className="topic-card"
      style={{ '--accent': topic.accent }}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <div className="topic-orb" />
      <div className="topic-meta">
        <span><Signal size={15} /> {topic.level}</span>
        <span><Clock size={15} /> {topic.duration}</span>
      </div>
      <h3>{topic.title}</h3>
      <p>{topic.description}</p>
      <div className="keyword-row">
        {topic.keywords.slice(0, 3).map((keyword) => (
          <span key={keyword}>{keyword}</span>
        ))}
      </div>
      <Link className="card-link" to={`/learn/${topic.id}`}>
        Start module <ArrowRight size={17} />
      </Link>
    </motion.article>
  );
}
