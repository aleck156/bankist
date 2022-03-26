'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const navBar = document.querySelector('.nav');

///////////////////////////////////////
// Modal window

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

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const currentID = e.target.getAttribute('href');
    document.querySelector(currentID).scrollIntoView({ behavior: 'smooth' });
  }
});

///////////////////////////////////////
// TAB NAVIGATION

tabsContainer.addEventListener('click', function (e) {
  e.preventDefault();
  const clicked = e.target.closest('.operations__tab');

  // guard clause
  if (!clicked) return;

  // toggling tab active classs
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  // activate content area
  console.log(clicked.getAttribute('data-tab'));
  tabsContent.forEach(tab =>
    tab.classList.remove('operations__content--active')
  );

  document
    .querySelector(`.operations__content--${clicked.getAttribute('data-tab')}`)
    .classList.add('operations__content--active');
});

///////////////////////////////////////
// HOVERING OVER NAVBAR - MENU FADE ANIMATION

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(s => {
      if (s !== link) {
        s.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};

// mouseenter event type DOES NOT BUBBLE UP
// passing an argument into handler
navBar.addEventListener('mouseover', handleHover.bind(0.5));

navBar.addEventListener('mouseout', handleHover.bind(1));

///////////////////////////////////////
// STICKY NAVIGATION

const header = document.querySelector('.header');
const headerHeight = navBar.getBoundingClientRect().height;

const observerCallback = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    navBar.classList.add('sticky');
  } else {
    navBar.classList.remove('sticky');
  }
};

const observerOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${headerHeight}px`,
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
observer.observe(header);

///////////////////////////////////////
// SECTION REVEAL
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  // adding guard
  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const revealOptions = {
  root: null,
  threshold: 0.15,
};

const sectionObserver = new IntersectionObserver(revealSection, revealOptions);

allSections.forEach(function (section) {
  section.classList.add('section--hidden');
  sectionObserver.observe(section);
});

///////////////////////////////////////
// LAZY LOADING

const allImages = document.querySelectorAll('img[data-src]');

const revealImage = function (entries, observer) {
  const [image] = entries;

  if (!image.isIntersecting) return;

  image.target.setAttribute('src', image.target.getAttribute('data-src'));

  image.target.addEventListener('load', function () {
    image.target.classList.remove('lazy-img');
  });

  observer.unobserve(image.target);
};

const revealImgOptions = {
  root: null,
  threshold: 0,
  rootMargin: '200px',
};

const imgObserver = new IntersectionObserver(revealImage, revealImgOptions);

allImages.forEach(img => {
  imgObserver.observe(img);
});

///////////////////////////////////////
// SLIDER COMPONENT

const slides = document.querySelectorAll('.slide');
const btnSlideLeft = document.querySelector('.slider__btn--left');
const btnSlideRight = document.querySelector('.slider__btn--right');
const sliderDots = document.querySelector('.dots');

// console.log(slides);
// console.log(btnSlideLeft);
// console.log(btnSlideRight);
// console.log(sliderDots);

slides.forEach((s, i) => {
  // console.log(i, s);
  s.style.transform = `translateX(${100 * i}%)`;
});
