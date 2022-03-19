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

/////////////////////////////////////////////////s
// .forEach() method applied to Maps and Sets
currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// set
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'GBP']);
currenciesUnique.forEach(function (value, _, set) {
  console.log(`${value}: ${_}`);
});
