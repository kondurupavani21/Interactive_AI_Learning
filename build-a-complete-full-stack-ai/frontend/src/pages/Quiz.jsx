import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { CheckCircle2, Clock, Loader2, XCircle } from 'lucide-react';
import { findTopic } from '../data/topics.js';
import { generateQuiz, saveProgress } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function Quiz() {
  const { topicId } = useParams();
  const topic = findTopic(topicId);
  const { user } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!topic) return;
    generateQuiz({ topic: topic.title, count: 5 })
      .then((response) => setQuestions(response.questions))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [topic]);

  useEffect(() => {
    if (submitted || loading) return undefined;
    const timer = setInterval(() => {
      setTimeLeft((current) => {
        if (current <= 1) {
          setSubmitted(true);
          return 0;
        }
        return current - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [submitted, loading]);

  const score = useMemo(() => {
    return questions.reduce((total, question, index) => total + (answers[index] === question.answer ? 1 : 0), 0);
  }, [answers, questions]);

  if (!topic) return <Navigate to="/" replace />;

  const submitQuiz = async () => {
    setSubmitted(true);
    await saveProgress({ userId: user.uid, topicId: topic.id, completed: true, quizScore: Math.round((score / questions.length) * 100) });
  };

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const seconds = String(timeLeft % 60).padStart(2, '0');

  return (
    <div className="page quiz-page">
      <section className="quiz-header">
        <div>
          <span className="eyebrow">Timed practice</span>
          <h1>{topic.title} Quiz</h1>
        </div>
        <div className="timer"><Clock size={18} /> {minutes}:{seconds}</div>
      </section>

      {loading && <div className="learning-panel"><Loader2 className="spin" /> Generating quiz...</div>}
      {error && <div className="learning-panel error-text">{error}</div>}

      <div className="question-list">
        {questions.map((question, index) => (
          <article className="question-card" key={question.question}>
            <h2>{index + 1}. {question.question}</h2>
            <div className="option-grid">
              {question.options.map((option) => {
                const selected = answers[index] === option;
                const isCorrect = submitted && option === question.answer;
                const isWrong = submitted && selected && option !== question.answer;
                return (
                  <button
                    type="button"
                    className={`option-button ${selected ? 'selected' : ''} ${isCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''}`}
                    key={option}
                    onClick={() => !submitted && setAnswers({ ...answers, [index]: option })}
                  >
                    {option}
                    {isCorrect && <CheckCircle2 size={16} />}
                    {isWrong && <XCircle size={16} />}
                  </button>
                );
              })}
            </div>
            {submitted && <p className="answer-explanation">{question.explanation}</p>}
          </article>
        ))}
      </div>

      {questions.length > 0 && (
        <div className="quiz-footer">
          {submitted ? (
            <>
              <strong>Score: {score}/{questions.length}</strong>
              <Link className="primary-button" to="/dashboard">View dashboard</Link>
            </>
          ) : (
            <button className="primary-button large" type="button" onClick={submitQuiz}>Submit quiz</button>
          )}
        </div>
      )}
    </div>
  );
}
