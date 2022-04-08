import {
  buildElement,
  renderGame,
  renderScore
} from './renders';

let id;

function checkGameOver(cactus, dino, start) {
  const cactusProperties = cactus.getBoundingClientRect();
  const dinoProperties = dino.getBoundingClientRect();

  if (cactusProperties.left + 25 <= dinoProperties.right
    && dinoProperties.bottom >= cactusProperties.top + 25
    && cactusProperties.right > dinoProperties.left + 25) {

    gameOver(start, cactus, dino);
  }
}

export function run(cactus, dino, scoreElement) {
  let start = Date.now();
  let idInterval;
  cactus.classList.add('animate');
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
      dinoJump(dino);
    }
  });

  id = setInterval(() => {
    checkGameOver(cactus, dino, start);
    renderScore(scoreElement, start);
  }, 10);
}

export function dinoJump(dino) {
  dino.classList.add('jump-dino');
  setTimeout(() => {
    dino.classList.remove('jump-dino');
  }, 500);
}

export function gameOver(start, cactus, dino) {
  const score = (Date.now() - start);
  const dinoProps = dino.getBoundingClientRect();
  const cactusProps = cactus.getBoundingClientRect();
  clearInterval(id);
  cactus.classList.remove('animate');
  document.body.outerHTML = document.body.outerHTML;
  document.body.innerHTML = '';
  document.body.classList.add('game-over');
  const messageContainer = buildElement('div', 'message-container', document.body);
  buildElement('div', 'message-text', messageContainer, `Game over! Your score is ${score}`);
  const playAgainBtn = buildElement('button', 'again-btn', document.body);

  playAgainBtn.addEventListener('click', renderGame);
}