"use strict";

var slider = document.querySelector('.slider__track');
var bulletsList = document.querySelector('.bullets');
var bullets = document.querySelectorAll('.bullets__item');
var prevBtn = document.querySelector('.arrow-buttons.prev');
var nextBtn = document.querySelector('.arrow-buttons.next');
slider.style.left = 0;
var translate = {
  '0%': 0,
  '-100%': 1,
  '-200%': 2,
  '-300%': 3
};

function slidePrevImage() {
  var position = parseInt(slider.style.left);

  if (position === 0) {
    position = -400;
  }

  slider.style.left = "".concat(position + 100, "%");
  highlight(translate[slider.style.left]);
}

function slideNextImage() {
  var position = parseInt(slider.style.left);

  if (position === -300) {
    position = 100;
  }

  slider.style.left = "".concat(position - 100, "%");
  highlight(translate[slider.style.left]);
}

function slideImageFromBullet(numberOfBullet) {
  slider.style.left = "".concat(numberOfBullet * -100, "%");
}

function highlight(num) {
  bullets.forEach(function (bullet) {
    if (bullet.classList.contains('active')) {
      bullet.classList.remove('active');
    }

    ;

    if (bullet.dataset.bullets === "".concat(num)) {
      bullet.classList.add('active');
    }

    ;
  });
}

bulletsList.addEventListener('click', function (e) {
  var target = e.target.closest('.bullets__item');
  var num = target.dataset.bullets;
  highlight(num);
  slideImageFromBullet(num);
});
prevBtn.addEventListener('click', slidePrevImage);
nextBtn.addEventListener('click', slideNextImage);