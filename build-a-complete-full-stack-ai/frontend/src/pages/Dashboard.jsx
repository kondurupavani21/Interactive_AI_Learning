import { useEffect, useMemo, useState } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Award, BookOpenCheck, Loader2, UserRound } from 'lucide-react';
import ProgressRing from '../components/ProgressRing.jsx';
import { topics } from '../data/topics.js';
import { getProgress } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function Dashboard() {
  const { user, profile } = useAuth();
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProgress(user.uid)
      .then((response) => setProgress(response.progress || {}))
      .finally(() => setLoading(false));
  }, [user.uid]);

  const stats = useMemo(() => {
    const entries = topics.map((topic) => ({
      name: topic.title.replace(' Algorithms', ''),
      score: progress[topic.id]?.quizScore || 0,
      completed: progress[topic.id]?.completed ? 100 : 0
    }));
    const completed = entries.filter((entry) => entry.completed).length;
    const average = entries.length ? Math.round(entries.reduce((sum, entry) => sum + entry.score, 0) / entries.length) : 0;
    return { entries, completed, average };
  }, [progress]);

  return (
    <div className="page dashboard-page">
      <section className="dashboard-header">
        <div className="profile-card">
          <UserRound size={32} />
          <div>
            <span className="eyebrow">Learner profile</span>
            <h1>{profile?.name || user.displayName || 'DSA Explorer'}</h1>
            <p>{user.email}</p>
          </div>
        </div>
        <ProgressRing value={Math.round((stats.completed / topics.length) * 100)} label="topics complete" />
      </section>

      {loading ? (
        <div className="learning-panel"><Loader2 className="spin" /> Loading progress...</div>
      ) : (
        <>
          <section className="stat-grid">
            <div className="stat-card"><BookOpenCheck size={24} /><strong>{stats.completed}/{topics.length}</strong><span>Topics completed</span></div>
            <div className="stat-card"><Award size={24} /><strong>{stats.average}%</strong><span>Average quiz score</span></div>
            <div className="stat-card"><BookOpenCheck size={24} /><strong>{Object.keys(progress).length}</strong><span>Modules touched</span></div>
          </section>

          <section className="learning-panel">
            <div className="panel-heading">
              <Award size={20} />
              <div>
                <h2>Learning statistics</h2>
                <p>Quiz scores by topic.</p>
              </div>
            </div>
            <div className="chart-box">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stats.entries}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.25)" />
                  <XAxis dataKey="name" stroke="currentColor" />
                  <YAxis stroke="currentColor" />
                  <Tooltip cursor={{ fill: 'rgba(56, 189, 248, 0.12)' }} />
                  <Bar dataKey="score" fill="#38bdf8" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
