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

// const smoothScroll = function (e) {
//   e.preventDefault();
//   console.log(e.target);

//   const currentID = this.getAttribute('href');
//   document.querySelector(currentID).scrollIntoView({ behavior: 'smooth' });
// };

// this is an inefficient way of attaching smooth scrolling
// we can attach it to the parent of them, which will capture the click and call this function
// event.target - that's how we know the closest parent responsible for that event

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', smoothScroll);
// });

// EVENT DELEGATION

// 1. ADD EVENT LISTENER TO THE COMMON PARENT ELEMENT
// 2. DETERMINE WHAT ELEMENT ORIGINATED THE EVENT
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const currentID = e.target.getAttribute('href');
    document.querySelector(currentID).scrollIntoView({ behavior: 'smooth' });
  }
});
// instead of having an bunch of event listeners attached to every single element, now we operate with only one event listener
// LESS MEMORY USAGE //
// using event delegation allows for creating functionality for elements that are not yet created until the page loads fully

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

// 193. DOM Traversing
const h1 = document.querySelector('h1');
console.log(h1.querySelectorAll('.highlight')[1]);
console.log(h1.children); // only works for direct children
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

console.log(h1.parentNode);

// when searching for the closest parent that meet the conditions ...
h1.closest('.header').style.background = 'var(--gradient-secondary)';

// going sideways, selecting siblings
// we can access only direct siblings - previous and the next one following
// when we need the elements ...
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

// when we need the nodes ...
console.log(h1.previousSibling);
console.log(h1.nextElementSibling);

// in case we need all of siblings
// we move up to the parent and grab all children
console.log(h1.parentElement.children);
// but this leaves us with HTMLColletion, which has none of ES6+ methods ...

// so we convert it into an array
[...h1.parentElement.children].forEach(function (el) {
  // both ways work

  // if (el.tagName != 'H1') el.style.color = 'green';
  if (el !== h1) el.style.transform = 'scale(0.5)';
});

const siblingsArray = [...h1.parentElement.children];
console.log(siblingsArray);
