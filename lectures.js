/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// The new .at() method
// replacing bracket [] notation with more modern stream notation
// getting last element is easier, .at(-1), as a value, not as an array

const arrayD = [23, 11, 64];
console.log(arrayD.at(2));
console.log(arrayD.at(-2));

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// 155. The magic of chaining methods

// clean to read
// hard to debug
// use code block, with console.log()
const totalDepositsUsd = movements
  .filter(mov => mov > 0)
  .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);
console.log(`Total deposits (in USD): ${totalDepositsUsd}`);

/////////////////////////////////////////////////
// 157. The find Method

// returns the first element in the array that satisfies the condition
// 2 fundamental differences between .find() and .filter()
// .find() returns only the first one, while .filter() returns an entire array that match it
// .filter() returns NEW ARRAY with copied values, whereas .find() returns only the element itself
let firstWithdrawal = movements.find(mov => mov < 0);
firstWithdrawal = 17;
console.log(movements);
console.log(firstWithdrawal);

// console.log(accounts.);

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

/////////////////////////////////////////////////
// 161. some and every
console.log(movements);
console.log(movements.includes(-130)); // tests only for equality

// at least one element must meet the condition
console.log(movements.some(mov => mov > 1500));

// .every()
// every element has to pass the test in order to get a true value
console.log(account4.movements.every(elem => elem > 0));

// separate callback
const deposit = mov => mov > 0;

console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));

/////////////////////////////////////////////////
// 162. flat and flatMap
// converts nested arrays into a single array
// goes only one level into nesting with default values
// returns new array

const arrL = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrL.flat(3));

const accountMovements = accounts
  .map(acc => acc.movements)
  .flat(7)
  .reduce((acc, cur) => acc + cur, 0);
console.log(accountMovements);

// .flatMap()
// combines .map() + .flat()
// improved performance
// it goes only one leel deep
const accountMovements2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, cur) => acc + cur, 0);
console.log(accountMovements2);

/////////////////////////////////////////////////
// 163. Sorting Arrays

// in place!
// it mutates the original array - be careful!
// .sort() - converts everything to strings, and only then it sorts it out
// specify callback function to make it work as you want

const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort());
console.log(owners);

console.log(movements);
console.log(movements.sort((a, b) => a - b));
console.log(movements);

/////////////////////////////////////////////////
// 164. More Ways of Creating and Filling Arrays

// .fill()
// applioed to arrays created with new Array().fill()
// can be applied to non-empty arrays too
const x = new Array(7).fill(0);
console.log(x);

// .from()
// we're not using it on an object, but on Array constructor!
// passing an object and a callback function that will be called for each newly created elemnts
// creating arrays from array-like, iterable structures and objects was the primary reason for creating this method
const testingArrs = Array.from({ length: 7 }, (v, k) => 1);
console.log(testingArrs);

const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z);

// generating an array of 100 random dice rolls
const randArr = Array.from({ length: 100 }, () =>
  Math.floor(Math.random() * 100 + 1)
);

console.log(randArr);

// .querySelectorAll()
// returns a NodeList
// it's not a real array, so it doesn't have any of the useful Array methods
// wrapping everything inside Array.from() returns an array, with all teh goodies!

const movementsUI = Array.from(document.querySelectorAll('.movements__value'));
console.log(movementsUI);
