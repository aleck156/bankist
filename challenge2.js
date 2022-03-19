'use strict';

const data1 = [5, 2, 4, 1, 15, 8, 3];
const data2 = [16, 6, 10, 5, 6, 1, 4];

const dataSet = [data1, data2];

/**
 *
 * @param {Array} ages an array of integers, dog's ages
 */
const calcAverageHumanAge = function (ages) {
  const calculatedAges = ages
    .map(age => (age > 2 ? 16 + age * 4 : age * 2))
    .filter(dogAge => dogAge >= 18);

  console.log(`Calculated ages: ` + calculatedAges.join(', '));
  const averageAge =
    calculatedAges.reduce((acc, cur) => acc + cur, 0) / calculatedAges.length;
  console.log(`Average human age of all adult dogs: ${averageAge}`);
};

// console.log(data1);
// calcAverageHumanAge(data1);

// console.log(data2);
// calcAverageHumanAge(data2);

dataSet.forEach(function (value, index) {
  console.log(`Calculating data set ${index + 1}:`);
  console.log(value);
  calcAverageHumanAge(value);
});
