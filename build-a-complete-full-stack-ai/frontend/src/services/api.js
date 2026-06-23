const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error || 'Something went wrong. Please try again.');
  }
  return payload;
}

export const askAi = ({ topic, question, mode = 'chat' }) =>
  request('/ask-ai', {
    method: 'POST',
    body: JSON.stringify({ topic, question, mode })
  });

export const generateQuiz = ({ topic, difficulty = 'medium', count = 5 }) =>
  request('/generate-quiz', {
    method: 'POST',
    body: JSON.stringify({ topic, difficulty, count })
  });

export const saveProgress = ({ userId, topicId, completed, notes, quizScore }) =>
  request('/save-progress', {
    method: 'POST',
    body: JSON.stringify({ userId, topicId, completed, notes, quizScore })
  });

export const getProgress = (userId) => request(`/get-progress?userId=${encodeURIComponent(userId)}`);
