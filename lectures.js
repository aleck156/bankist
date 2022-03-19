/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////s
// arrays have methods
// thus arrays are also objects
// they have access to special methods

let arr = ['a', 'b', 'c', 'd', 'e'];

// SLICE //
// returns new array
// original array stays untouched
// second parameter is optional - without it, the result is everything from the start parameter
// you can start with negative parameters, -1 is always the last element of an array
// we can do shallow copy by providing no arguments, similar to [...arr]
console.log(arr.slice(1, -1));

// SPLICE //
// does change the original array!
// removing last element of an array is its typical usage
// console.log(arr);
// console.log(arr.splice(2));
console.log(arr);
console.log(arr.splice(-1));
console.log(arr);

// REVERSE //
// returns new array
// mutates the original array
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2);

// CONCAT //
// concatenate two arrays
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2].join('-'));

// JOIN //
console.log([...arr, ...arr2].join('-'));

/////////////////////////////////////////////////s
// The new .at() method
// replacing bracket [] notation with more modern stream notation
// getting last element is easier, .at(-1), as a value, not as an array

const arrayD = [23, 11, 64];
console.log(arrayD.at(2));
console.log(arrayD.at(-2));

/////////////////////////////////////////////////s
// .forEach() method
// in each iteration, a callback function is called on the element
// the current element of an array is being passed on to the function

// .forEach() vs for of
// you can't break/continue in .forEach()

console.log(movements);

for (const [index, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`You deposited ${[index, movement]}`);
  } else {
    console.log(`you withdrew ${[index, Math.abs(movement)]}`);
  }
}
console.log(`--- .forEach() ---`);
movements.forEach(function (movement, index) {
  if (movement > 0) {
    console.log(`You deposited ${[index, movement]}`);
  } else {
    console.log(`you withdrew ${[index, Math.abs(movement)]}`);
  }
});

/////////////////////////////////////////////////
// .forEach() method applied to Maps and Sets
currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// set
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'GBP']);
currenciesUnique.forEach(function (value, _, set) {
  console.log(`${value}: ${_}`);
});

/////////////////////////////////////////////////s
// 149. Data transformation
// MAP / FILTER / REDUCE

// MAP
// similar to forEach
// returns new array based on current array and a callback function
// source array is left untouched

// with forEach(), we created a side effect - we called console.log() for every argument passed into
// this is BAD PROGRAMMING 101
// with map(), first we generate the end result string, and only afterward we pass it to console
const eurToUsd = 1.1;
const movementsUSD = movements.map(val => val * eurToUsd);
console.log(movements);
console.log(movementsUSD);

const movementsUSD2 = [];
for (const mov of movements) {
  movementsUSD2.push(mov * eurToUsd);
}
console.log(movementsUSD2);

const movementsDescriptions = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);
console.log(movementsDescriptions);

// FILTER
// filter for elements in original array that pass a certain test condition
// returns new array
// callback function returns a boolean value
// based on that value, .filter() either includes that specific value in the final array, or not
console.log(movements);
const deposits = movements.filter(function (mov) {
  return mov > 0;
});
console.log(deposits);

// create an array of withdrawals
const withdrawals = movements.filter(mov => mov < 0);
console.log(`List of withdrawals: ${withdrawals.join(', ')}`);

// REDUCE
// reduces all array elements into one, single value
// e.g. add all elements into one sum, factorials
// returns only one value - the new one
// const testingOut = [1, 2, 3, 4, 5];
// const result = testingOut.reduce((prev, curr) => (curr = curr * prev));
// console.log(result);
console.log(movements);
const balance = movements.reduce(function (acc, curr, i) {
  console.log(`Iteration ${i}: ${acc} // Next: ${curr}`);
  return curr + acc;
}, 0);
console.log(balance);

// finding maximum value using .reduce()
const maxValue = movements.reduce(
  (acc, cur) => (cur > acc ? cur : acc),
  movements[0]
);
console.log(maxValue);
