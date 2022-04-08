import { run } from "./app";

export function buildElement(tagName, classname, parent, textcontent) {
  const element = document.createElement(tagName);
  element.className = classname;
  if (textcontent) element.textContent = textcontent;
  return parent ? parent.appendChild(element) : element;
}


export function getApp() {
  document.body.className = false;
  document.body.innerHTML = '';
  const startBtn = buildElement('button', 'start-btn', document.body, 'start');
  startBtn.onclick = renderGame;
}


export function renderGame() {
  document.body.className = false;
  document.body.innerHTML = '';
  const container = buildElement('div', 'game-container', document.body);
  const scoreContainer = buildElement('div', 'score-container', container);
  const scoreText = buildElement('span', 'score', scoreContainer, '00000000');
  const hint = buildElement('div', 'hint', container, 'Press Enter for start the game');
  const dino = buildElement('div', 'base-dino', container);
  const cactus = buildElement('div', 'cactus-m', container);

  document.body.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      hint.remove();
      run(cactus, dino, scoreText);
    }
  });
}


export function renderScore(scoreElement, start) {
  const end = Date.now();
  const points = (end - start) < 10000000
            ? (end - start).toString().padStart(8, '0')
            : (end - start).toString();
  scoreElement.textContent = points;
}