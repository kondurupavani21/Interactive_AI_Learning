import { useState } from 'react';
import { Bot, Loader2, Send } from 'lucide-react';
import { askAi } from '../services/api.js';

export default function AiChatbot({ topic }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: `Ask me anything about ${topic.title}. I can explain, quiz, or debug your intuition.` }
  ]);
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);

  const sendQuestion = async (event) => {
    event.preventDefault();
    if (!question.trim()) return;
    const nextQuestion = question.trim();
    setQuestion('');
    setMessages((current) => [...current, { role: 'user', content: nextQuestion }]);
    setLoading(true);
    try {
      const response = await askAi({ topic: topic.title, question: nextQuestion, mode: 'chat' });
      setMessages((current) => [...current, { role: 'assistant', content: response.answer }]);
    } catch (error) {
      setMessages((current) => [...current, { role: 'assistant', content: error.message }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="chat-panel">
      <div className="panel-heading">
        <Bot size={20} />
        <div>
          <h2>AI Doubt Solver</h2>
          <p>Topic-aware Gemini tutor</p>
        </div>
      </div>
      <div className="chat-log">
        {messages.map((message, index) => (
          <div className={`chat-bubble ${message.role}`} key={`${message.role}-${index}`}>
            {message.content}
          </div>
        ))}
        {loading && <div className="chat-bubble assistant"><Loader2 className="spin" size={16} /> Thinking...</div>}
      </div>
      <form className="chat-form" onSubmit={sendQuestion}>
        <input
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder={`Ask a ${topic.title} doubt...`}
        />
        <button className="primary-button compact" type="submit" disabled={loading}>
          <Send size={16} />
        </button>
      </form>
    </section>
  );
}
