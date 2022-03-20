'use strict';

const data1 = [5, 2, 4, 1, 15, 8, 3];
const data2 = [16, 6, 10, 5, 6, 1, 4];

const dataSet = [data1, data2];

/**
 * Calculate average of human age's from an array of dog's ages
 *
 * excluded are ages of dogs younger than 2 years (pups), and those whose human age is below 18
 * @param {Array} ages an array of integers, dog's ages
 * @return {Number} average age of all dog, converted to human age
 */
const calcAverageHumanAge = function (ages) {
  const calculatedAges = ages
    .map(age => (age > 2 ? 16 + age * 4 : age * 2))
    .filter(dogAge => dogAge >= 18);

  console.log(`Calculated ages: ` + calculatedAges.join(', '));
  const averageAge = calculatedAges.reduce(
    (acc, cur, i, arr) => acc + cur / arr.length,
    0
  );
  return averageAge;
};

// console.log(data1);
// calcAverageHumanAge(data1);

// console.log(data2);
// calcAverageHumanAge(data2);

dataSet.forEach(function (value, index) {
  console.log(`Calculating data set ${index + 1}:`);
  console.log(value);
  const avgAge = calcAverageHumanAge(value);
  console.log(`Average human age of all adult dogs: ${avgAge}`);
});

const calcAverageHumanAge2 = ages => {
  const calculatedAges = ages
    .map(age => (age > 2 ? 16 + age * 4 : age * 2))
    .filter(dogAge => dogAge >= 18);

  console.log(`Calculated ages: ` + calculatedAges.join(', '));
  const averageAge = calculatedAges.reduce(
    (acc, cur, i, arr) => acc + cur / arr.length,
    0
  );
  return averageAge;
};

dataSet.forEach(function (value, index) {
  console.log(`Calculating data set ${index + 1}:`);
  console.log(value);
  const avgAge = calcAverageHumanAge2(value);
  console.log(`Average human age of all adult dogs: ${avgAge}`);
});
