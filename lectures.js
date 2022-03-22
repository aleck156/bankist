/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/////////////////////////////////////////////////
// 170. Converting and Checking Numbers
// numbers are stored as 64base2 format
// base2 and base10 conversion leads to numerical errors
// javascript is not suited for mathematical or financial calculations

console.log(23 === 23.0);
console.log(0.2 + 0.4);

// type conversion from string to number
console.log(+'23');

// parsing a number from a string
// whitespaces do not affect it
console.log(Number.parseInt('300px', 10));

// preferred way of parsing
console.log(Number.parseFloat('2.5rem', 10));

// radix - base of the numbers we are using

// NaN
console.log(Number.isNaN(20));
console.log(Number.isNaN(+'20X'));
console.log(Number.isNaN(23 / 0));

// checking if value is number
// preferred way of checking
console.log(Number.isFinite(20));
console.log(Number.isFinite('20'));
console.log(Number.isFinite('20X'));
console.log(Number.isFinite(+'20X'));
console.log(Number.isFinite(23 / 0));

console.log(Number.isInteger(23));
console.log(Number.isInteger(23.0));
console.log(Number.isInteger(23 / 0));

/////////////////////////////////////////////////
// 171. Math and Rounding
console.log();

// .max() does type coercion, but not parsing

// constants
const r = '10px';
console.log(Math.PI * Number.parseFloat(r) ** 2);

// .random()
console.log(Math.trunc(Math.random() * 6) + 1);

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min;

// const myh = [];
// for (let i = 0; i < 1000; i++) {
//   myh.push(randomInt(10, 20));
// }

// console.log(Math.min(...myh));

// rounding integers
// they all do type coercion, but not parsing
// it doesn't work for negative numbers
// with negative numbers, rounding works the other way around
console.log(Math.trunc(23.3));

console.log(Math.round(23.3));
console.log(Math.round(23.9));

console.log(Math.ceil(23.3));
console.log(Math.ceil(23.9));

console.log(Math.floor(23.3));
console.log(Math.floor(23.9));

console.log(Math.trunc(-23.3));
console.log(Math.floor(-23.3));

// rounding floating point numbers
// .toFixed() always return a string, not a number!
// primitives don't have methods attached to them
// js, behind the scenes, do the boxing
// - transform it into Number object, do the methods, then convert it back
console.log((2.7).toFixed(3));
console.log((2.345).toFixed(3));

/////////////////////////////////////////////////
// 172. The Remainder Operator
// console.log(5 % 2);

// console.log(6 % 2);

// const isEven = num => num % 2 === 0;
// console.log(isEven(7));

// labelBalance.addEventListener('click', function () {
//   [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
//     if (i % 2 === 0) {
//       row.style.backgroundColor = 'orangered';
//     }
//     if (i % 3 === 0) {
//       row.style.backgroundColor = 'blue';
//     }
//   });
// });

/////////////////////////////////////////////////
// 173. Numeric Separators

// useful for reading large numbers
// can be placed only between two digits
// not allowed between a digit and a dot, at the beginning or end of a number
const diameter = 287_460_000_000;
console.log(diameter);

const priceCents = 345_99;
console.log(priceCents);

const transferFee1 = 15_00;
const transferFee2 = 1_500;

const PI = 3.14_1592; // OK
// const PI2 = 3._141592; // NOT OK

// converting strings with underscores into numbers DO NOT WORK
const testValue = '123_456';
console.log(Number.parseInt(testValue));

/////////////////////////////////////////////////
// 174. Working with BigInt
// internally numbers are stored as 64-bits
// only 53 are used to store the digit
// the rest is used for storing sign and position of the decimal point
console.log(2 ** 53 - 1);
console.log(Number.MAX_SAFE_INTEGER);

// solution to this limitation was introducing BigInt
console.log(124214553452352345234635n * 1252345245234n);

// NOTE: you cannot mix numbers and BigInt
// nor should you even try

// BigInt is easily converted into strings, so concatenating goes smoothly

/////////////////////////////////////////////////
// 175. Creating Dates
const firstDate = new Date();
console.log(firstDate);
console.log(new Date('Mar 21 2022 16:37:48'));

// console.log(new Date(account1.movementsDates[0]));

console.log(new Date(2021, 1, 29, 13, 15, 21));

// working with dates
const future = new Date(2037, 10, 19, 15, 23);
console.log(future.getFullYear());
console.log(future.getMonth()); // it's ZERO-BASED
console.log(future.getDate());
console.log(future.getDay());
console.log(future.toISOString());

// how to get a timestamp
console.log(Date.now());

/////////////////////////////////////////////////
// 177. Operations With Dates

// converting dates to numbers is an efficient way to do calculations

console.log(Number(future));
console.log(+future);

const calcDaysPassed = (date1, date2) =>
  Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
const days1 = calcDaysPassed(
  new Date(2037, 3, 4),
  new Date(2037, 3, 14, 10, 18)
);
console.log(days1);

// for anything more advanced, you should use other libraries, like moment.js

/////////////////////////////////////////////////
// 178. Internationalizing Dates (Intl)

// ISO language table code

// experimenting with API
const now = new Date();

console.log(new Intl.DateTimeFormat('ar-Sy').format(now));

// console.log(`${day}/${month}/${year}, ${hour}:${min}`);
