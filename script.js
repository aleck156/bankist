'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

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
///////////////////////////////////////
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
// styles
message.style.backgroundColor = '#37383d';
