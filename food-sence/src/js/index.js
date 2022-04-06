const slider = document.querySelector('.slider__track');
const bulletsList = document.querySelector('.bullets');
const bullets = document.querySelectorAll('.bullets__item');

function slideImage(numberOfBullet) {
  slider.style.left = `${numberOfBullet * (-100)}%`;
}

function highlight(target) {
  bullets.forEach(bullet => {
    if (bullet.classList.contains('active')) {
      bullet.classList.remove('active');
    };
  })
  target.classList.add('active');
}

bulletsList.addEventListener('click', (e) => {
  const target = e.target.closest('.bullets__item');
  const num = target.dataset.bullets;
  highlight(target);
  slideImage(num);
});