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

const okayConditions = dog =>
  dog.curFood > dog.recommendedFood * 0.9 &&
  dog.curFood < dog.recommendedFood * 1.1;

const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(
  `Does Sarah's dog eat ok? ${okayConditions(dogSarah) ? 'Yes!' : 'No!'}`
);

// 3.
console.log(`--- #3 ---`);
const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recommendedFood)
  .flatMap(dog => dog.owners);

const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recommendedFood)
  .flatMap(dog => dog.owners);

console.log(`Too much food: `);
console.log(ownersEatTooMuch);
console.log(`Too little food: `);
console.log(ownersEatTooLittle);

// 4.
console.log(`--- #4 ---`);
console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little!`);

// 5.
console.log(`--- #5 ---`);
const exactAmount = dogs.some(dog => dog.curFood === dog.recommendedFood);
console.log(exactAmount);

// 6.
console.log(`--- #6 ---`);

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
