# AI Learning App - Data Structures & Algorithms Visualizer

A full-stack interactive learning application for Data Structures and Algorithms. The app uses React, React Router, Firebase Authentication, Firestore, Flask, Gemini, Three.js, and React Three Fiber to deliver AI explanations, 3D visualizers, quizzes, notes, and learning progress.

## Features

- Firebase signup, login, logout, and user profile records
- Firestore-backed topic progress, notes, completion status, and quiz scores
- Modern responsive UI with dark mode, glass panels, animated cards, and loading states
- Topic search and reusable topic cards
- Learning modules for Stack, Queue, Linked List, Sorting Algorithms, and Binary Tree
- 3D interactive visualizers for stack push/pop, queue enqueue/dequeue, linked list operations, sorting animation, and tree DFS traversal
- Gemini-powered explanations, chatbot answers, and dynamic quiz generation
- Browser speech synthesis for voice explanations
- Timed quiz system with multiple-choice answers, instant feedback, score calculation, and explanations
- Dashboard with profile data, completion metrics, and quiz score graphs
- Deployment-ready Vercel frontend and Render backend config

## Project Structure

```text
.
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── visualizers/
│   │   │   ├── AiChatbot.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProgressRing.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── TopicCard.jsx
│   │   │   └── Visualizer.jsx
│   │   ├── context/AuthContext.jsx
│   │   ├── data/topics.js
│   │   ├── pages/
│   │   ├── services/api.js
│   │   ├── App.jsx
│   │   ├── firebase.js
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── .env.example
│   ├── package.json
│   ├── vercel.json
│   └── vite.config.js
├── backend/
│   ├── app.py
│   ├── .env.example
│   ├── render.yaml
│   └── requirements.txt
└── README.md
```

## Firebase Setup

1. Create a Firebase project at the Firebase Console.
2. Enable Authentication, then enable the Email/Password provider.
3. Create a Firestore database.
4. Add a web app and copy the Firebase client config into `frontend/.env`.
5. Create a service account key from Project Settings > Service accounts.
6. For local backend development, save it as `backend/serviceAccountKey.json`.
7. For Render deployment, store the full JSON as `FIREBASE_SERVICE_ACCOUNT_JSON`.

Frontend environment example:

```bash
cp frontend/.env.example frontend/.env
```

Backend environment example:

```bash
cp backend/.env.example backend/.env
```

## Gemini Setup

1. Create a Gemini API key in Google AI Studio.
2. Put it in `backend/.env`:

```env
GEMINI_API_KEY=your_gemini_api_key
```

The backend keeps the Gemini key server-side. The React app only calls Flask endpoints.

## Run Locally

Backend:

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`.

## Backend APIs

- `POST /ask-ai`
  - Body: `{ "topic": "Stack", "question": "Explain push", "mode": "chat" }`
  - Returns: `{ "answer": "..." }`

- `POST /generate-quiz`
  - Body: `{ "topic": "Binary Tree", "difficulty": "medium", "count": 5 }`
  - Returns: `{ "questions": [...] }`

- `POST /save-progress`
  - Body: `{ "userId": "...", "topicId": "stack", "completed": true, "notes": "...", "quizScore": 80 }`
  - Stores progress in `users/{userId}/progress/{topicId}`.

- `GET /get-progress?userId=...`
  - Returns all saved topic progress for a user.

## Deployment

### Frontend on Vercel

1. Push the repository to GitHub.
2. Import the project in Vercel.
3. Set the root directory to `frontend`.
4. Add all `VITE_FIREBASE_*` variables.
5. Set `VITE_API_BASE_URL` to the deployed Render API URL.
6. Build command: `npm run build`.
7. Output directory: `dist`.

### Backend on Render

1. Create a new Web Service on Render.
2. Set root directory to `backend`.
3. Build command: `pip install -r requirements.txt`.
4. Start command: `gunicorn app:app`.
5. Add environment variables:
   - `GEMINI_API_KEY`
   - `FIREBASE_SERVICE_ACCOUNT_JSON`
   - `FRONTEND_URL`, for example `https://your-app.vercel.app`
6. Deploy and copy the service URL into `frontend` as `VITE_API_BASE_URL`.

## Notes

- Do not expose `GEMINI_API_KEY` in the frontend.
- Do not commit `.env` files or `serviceAccountKey.json`.
- The quiz API asks Gemini for strict JSON and falls back to safe built-in questions if parsing fails.
- Browser speech synthesis runs locally in the user's browser and does not require a backend service.
