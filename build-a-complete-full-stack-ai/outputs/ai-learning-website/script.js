const root = document.documentElement;
const themeToggle = document.querySelector('#themeToggle');
const topicSearch = document.querySelector('#topicSearch');
const topicCards = [...document.querySelectorAll('.topic-card')];
const stack = document.querySelector('#stack');
const pushButton = document.querySelector('#pushButton');
const popButton = document.querySelector('#popButton');
const quizOptions = document.querySelector('#quizOptions');
const quizFeedback = document.querySelector('#quizFeedback');

let stackValues = [14, 28, 52];
let nextValue = 73;

function renderStack() {
  stack.innerHTML = stackValues
    .map((value) => `<div class="stack-item">${value}</div>`)
    .join('');
}

function pushStack() {
  stackValues = [...stackValues, nextValue].slice(-6);
  nextValue = Math.floor(Math.random() * 80) + 10;
  renderStack();
}

function popStack() {
  stackValues = stackValues.slice(0, -1);
  renderStack();
}

const quiz = {
  answer: 'Stack',
  options: ['Queue', 'Stack', 'Binary Tree', 'Linked List'],
  explanation: 'A stack follows LIFO: the last item pushed is the first item popped.'
};

function renderQuiz() {
  quizOptions.innerHTML = quiz.options
    .map((option) => `<button type="button" data-answer="${option}">${option}</button>`)
    .join('');
}

themeToggle.addEventListener('click', () => {
  root.classList.toggle('light');
  themeToggle.textContent = root.classList.contains('light') ? 'Light' : 'Dark';
});

topicSearch.addEventListener('input', (event) => {
  const query = event.target.value.toLowerCase();
  topicCards.forEach((card) => {
    const text = `${card.textContent} ${card.dataset.topic}`.toLowerCase();
    card.style.display = text.includes(query) ? '' : 'none';
  });
});

pushButton.addEventListener('click', pushStack);
popButton.addEventListener('click', popStack);

quizOptions.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button) return;

  [...quizOptions.querySelectorAll('button')].forEach((item) => {
    item.classList.remove('correct', 'wrong');
    if (item.dataset.answer === quiz.answer) item.classList.add('correct');
  });

  if (button.dataset.answer !== quiz.answer) {
    button.classList.add('wrong');
  }

  quizFeedback.textContent = quiz.explanation;
});

renderStack();
renderQuiz();
