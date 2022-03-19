'use strict';

const checkDogs = function (dogsJulia, dogsKate) {
  const fixedDogsJulia = dogsJulia.slice(1, -2);
  const allDogs = [...fixedDogsJulia, ...dogsKate];
  allDogs.forEach((dog, i) => {
    dog >= 3
      ? console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old`)
      : console.log(`Dog number ${i + 1} is still a puppy`);
  });
  // console.log(dogsJulia);
  // console.log(fixedDogsJulia);
  // console.log(dogsKate);
};

// TEST DATA
// SET 1
// const julia = [3, 5, 2, 12, 7];
// const kate = [4, 1, 15, 8, 3];

// SET 2
const julia = [9, 16, 6, 8, 3];
const kate = [10, 5, 6, 1, 4];

// TESTING
checkDogs(julia, kate);
