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
// The new at method
