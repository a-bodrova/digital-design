const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.navigation');
const links = document.querySelectorAll('.navigation ul li');
const buttonUp = document.querySelector('.btn-up');

function toggleHamburger() {
  if (hamburger) {
    menu.classList.toggle('showed');
    hamburger.classList.toggle('hamburger__checked');
  }
}

hamburger.onclick = toggleHamburger;
links.forEach(link => link.onclick = toggleHamburger);

function showButtonUp() {
  if (window.scrollY >= window.innerHeight / 2) {
    buttonUp.classList.add('showed');
  } else {
    buttonUp.classList.remove('showed');
  }
}

function scrollUp() {
  window.scrollTo(0, 0);
}

buttonUp.onclick = scrollUp;
window.onscroll = showButtonUp;