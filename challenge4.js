'use strict';

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

console.log(`--- initial data ---`);
console.log(dogs);
// 1.
dogs.forEach(dog => {
  dog.recommendedFood = Math.round(dog.weight ** 0.75 * 28);
});

console.log(`--- #1 ---`);
console.log(dogs);

// 2.
console.log(`--- #2 ---`);
dogs.forEach(dog => {
  dog.owners.findIndex(owner => owner === 'Sarah') >= 0 ? console.log(dog) : '';
});

// 3.
const ownersEatTooMuch = [];
const ownersEatTooLittle = [];
dogs.forEach(dog => {
  if (dog.curFood > dog.recommendedFood * 1.1) {
    ownersEatTooMuch.push(dog);
    return;
  }
  if (dog.curFood < dog.recommendedFood * 0.9) {
    ownersEatTooLittle.push(dog);
    return;
  }
});

console.log(`--- #3 ---`);

console.log(`Too much food: `);
console.log(ownersEatTooMuch);
console.log(`Too little food: `);
console.log(ownersEatTooLittle);

// 4.
console.log(`--- #4 ---`);

const tooMuchOwners = Array.from(ownersEatTooMuch, dog => dog.owners).flat();
console.log(`${tooMuchOwners.join(' and ')}'s dogs eat too much!`);

const tooLittleOwners = Array.from(
  ownersEatTooLittle,
  dog => dog.owners
).flat();
console.log(`${tooLittleOwners.join(' and ')}'s dogs eat too little!`);

// 5.
console.log(`--- #5 ---`);
const exactAmount = dogs.filter(dog => dog.curFood === dog.recommendedFood);
console.log(exactAmount.length > 0);

// 6.
console.log(`--- #6 ---`);
const okayConditions = dog =>
  dog.curFood > dog.recommendedFood * 0.9 &&
  dog.curFood < dog.recommendedFood * 1.1;

const okayAmount = dogs.some(okayConditions);
console.log(okayAmount);

// 7.
console.log(`--- #7 ---`);
const okayDogs = dogs.filter(okayConditions);
console.log(okayDogs);

// 8.
console.log(`--- #8 ---`);

const shallowCopy = dogs
  .slice()
  .sort((dogA, dogB) => dogA.recommendedFood - dogB.recommendedFood);
console.log(shallowCopy);
