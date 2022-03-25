/*
/////////////////////////////////////////////////
// 185. How the DOM Really Works

DOM - interface between browser and JS
we can create/modify/delete HTML elements
set styles, classes and attributes
listen and respond to events


Node - everything in DOM API is a node
- has it's own properties, some are inherited
- children
    - Element - tons of useful properties!
    - Text - stored within an elements
    - Comment
    - Document

- Element
    - HTMLElement
      - 1 child type for each element type you can see on page, like link, p, img, form

Inheritance
- all the children have access to all of the fields and methods available to their parents
- children also have their own, specific properties and methods

.querySelector() method is available both on document and element objects

EventTarget node
the root of all nodes
- contains methods like .addEventListener() and .removeEventListener()
- all of his children inherit these two methods!

we never manually create EventTarget node
*/

/////////////////////////////////////////////////
// 187. Styles, Attributes and Classes

console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

// .querySelector() grabs the first element that matches the criteria
// returns a single HTMLElement
const header = document.querySelector('.header');
console.log(header);

// .querySelectorAll() grabs all elements that meet the criteria
// returns a NodeList, over which you can iterate
const allSections = document.querySelectorAll('.section');
console.log(allSections);

// .getElementById()
// use only selector name, without . or #
const s1 = document.getElementById('section--1');
console.log(s1);

// .getElementsByTagName()
// returns HTMLCollection - an array of elements that are of type specified
// it's ALIVE
// every time DOM changes, this collection gets updated automatically
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

// .forEach()_ does not work on it, thus you have to loop it traditionally
// allButtons.forEach(btn => console.log(btn));

for (let i = 0; i < allButtons.length; i++) {
  console.log(allButtons[i]);
}

// .getElementsByClassName()
// also returns HTMLCollection - an array
// it's ALIVE
// every time DOM changes, this collection gets updated automatically
const allBtns = document.getElementsByClassName('btn');
console.log(allBtns);

// creating and inserting elements
// .insertAdjacentHTML()
// very useful method!!
// prepare string literals with a proper HTML code, inject data into it, then use it as argument to call this method
const message = document.createElement('div');
message.classList.add('cookie-message');

// message.textContent = `We use cookies for improved functionality and analytics
// also, they tase so good ... :-)`;
message.innerHTML = `We use cookies for improved functionality and analytics
also, they taste so good ... :-) <button class="btn btn--close-cookie">Got it!</button>`;

// this will attach only one message
// message is alive, living inside a DOM
header.append(message);

// in order to attach the same object multiple times, you CLONE IT
// header.prepend(message.cloneNode(true));
// header.append(message.cloneNode(true));

// appeding elements
// .before() - attach before the element you're attaching it to
// .after() - quite obvious, right?
// header.before(message.cloneNode(true));
// header.after(message.cloneNode(true));

// before / prepend / append / after
document.querySelector('.btn--close-cookie').addEventListener('click', () => {
  message.remove();
});

// DOM traversing
/*
document.querySelectorAll('.btn--close-cookie').forEach(elem =>
  elem.addEventListener('click', () => {
    elem.parentElement.remove();
  })
);
*/

///////////////////////////////////////
// 187. Styles, Attributes and Classes

// styles
// inline styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

// logging to console only works for style we've set manually, inline
console.log(message.style.backgroundColor);

// the way around it is to get an actual value from the browser
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

// type coercion is what messes it up
/// parsing solves the issue
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';

document.documentElement.style.setProperty('--color-primary', 'orangered');

// ATTRIBUTES
const logo = document.querySelector('.nav__logo');
console.log(logo.src);
console.log(logo.alt);

// only standard properties that are expected to be on that tag are available by default
// everything else - custom made - has to be reinvented
console.log(logo.designer);
console.log(logo.className);

// ... so, how to get a custom-defined attribute?
console.log(logo.getAttribute('designer'));

// we can get attributes, but can we set them too?
logo.setAttribute('madeAt', 'hometown, georgia');
console.log(logo.getAttribute('madeAt'));

// the difference in accessing an attribute directly and via .getAttribute()
// the first one gives a full url
// the second one returns a relavite address
console.log(logo.src);
console.log(logo.getAttribute('src'));

// the same is true for href attribute on links
const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));

// DATA ATTRIBUTES
// special kind of attributes
// starts with 'data' keyword
console.log(logo.dataset.versionNumber);

// setting up class names
// be warned, thou, as it replaces everything that was set in this attribute!
// allows only one class to be put there

// logo.className = 'Thomass';
console.log(logo.classList.toString());

///////////////////////////////////////
// 189. Types of Events and Event Handlers

// event - a signal generated by a certain DOM object

///////////////////////////////////////
// 189. Types of Events and Event Handlers

// event - a signal generated by a certain DOM object
// https://developer.mozilla.org/en-US/docs/Web/Events

// .addEventListener is better
// allows to attach multiple listeners to the same element, even on the same event

const h1 = document.querySelector('h1');

const alertH1 = function (e) {
  console.log(`addEventListener: Great! You ar reading teh heading!`);
};

h1.addEventListener('mouseenter', alertH1);

h1.onmouseenter = function (e) {
  const now = new Date();
  const locale = navigator.locale;
  const options = {
    locale,
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hours: '2-digit',
    minutes: '2-digit',
  };

  console.log(`onmouseenter: Great! You ar reading teh heading!}`);
};

// removing event listeners
// extract the callback function into a named function
// then just remove it!

setTimeout(() => {
  h1.removeEventListener('mouseenter', alertH1);
}, 3000);

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

// scrol event attached to window object is not efficient, and should be avoided
/*
const initialCoords = section1.getBoundingClientRect();
console.log(initialCoords.top);

window.addEventListener('scroll', function (e) {
  if (this.window.scrollY > initialCoords.top) {
    navBar.classList.add('sticky');
  } else {
    navBar.classList.remove('sticky');
  }
});
*/

// using interface

// const observerCallback = function (entries, observer) {
//   // navBar.classList.add('sticky');
//   entries.forEach(entry => {
//     // console.log(entry);
//   });
// };

// const observerOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };
// const observer = new IntersectionObserver(observerCallback, observerOptions);
// observer.observe(section1);
