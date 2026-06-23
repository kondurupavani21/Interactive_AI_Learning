import { Bot, Cuboid, Database, ShieldCheck } from 'lucide-react';

export default function About() {
  return (
    <div className="page about-page">
      <section className="about-hero">
        <span className="eyebrow">About the platform</span>
        <h1>Built for active, visual, AI-supported DSA practice.</h1>
        <p>
          AI DSA Lab combines Firebase authentication, Firestore progress storage, Flask APIs,
          Gemini explanations, timed quizzes, and React Three Fiber scenes into one learning workflow.
        </p>
      </section>
      <section className="feature-grid">
        <div className="feature-card"><ShieldCheck size={28} /><h2>Secure auth</h2><p>Firebase handles signup, login, and session state.</p></div>
        <div className="feature-card"><Bot size={28} /><h2>AI tutor</h2><p>Gemini explains topics and generates contextual quiz questions.</p></div>
        <div className="feature-card"><Cuboid size={28} /><h2>3D learning</h2><p>Interactive visualizers make abstract operations tangible.</p></div>
        <div className="feature-card"><Database size={28} /><h2>Progress data</h2><p>Firestore records notes, completion status, scores, and stats.</p></div>
      </section>
    </div>
  );
}
