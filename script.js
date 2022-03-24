'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
///////////////////////////////////////
// PAGE SCROLLING

btnScrollTo.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////
// PAGE NAVIGATION

// s

// EVENT DELEGATION

// 1. ADD EVENT LISTENER TO THE COMMON PARENT ELEMENT
// 2. DETERMINE WHAT ELEMENT ORIGINATED THE EVENT
document.querySelector('.nav__links').addEventListener('click', function (e) {
  console.log(e.target.getAttribute('href'));
});

// this is an inefficient way of attaching smooth scrolling
// we can attach it to the parent of them, which will capture the click and call this function
// event.target - that's how we know the closest parent responsible for that event

///////////////////////////////////////
///////////////////////////////////////
/*
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// e.currentTarget === this
// elements keep listening to the events that happen on them, but also on their children
// setting up third parameter of an event listener to true, it no longer listens to bubbling events, but capturing events
// rarely used these days, only for historical reasons we have capturing and bubbling
document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log(`Link`, e.target, e.currentTarget);

  // how to stop propagation
  e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log(`Links`, e.target, e.currentTarget);
});

document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log(`Nav`, e.target, e.currentTargets);
  },
  true
);

*/
