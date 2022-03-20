'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

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

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////

/**
 * Display all of user's movements on the left user panel
 * @param {Array} movement an array of all user's operations (moves)
 */
const displayMovements = function (movements) {
  containerMovements.innerHTML = '';

  movements.forEach((mov, i) => {
    console.log(mov, i);
    const movType = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${movType}">${
      i + 1
    } ${movType}</div>
      <div class="movements__value">${mov}€</div>
    </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

displayMovements(account1.movements);

// using .forEach()
// we do not want to create new array
// the goal is to modify the original source of data
// DEPENDENCY INJECTION ?!

/**
 * create username property on all accounts
 *
 * username are owners initials
 *
 * @param {Array} accounts an array of accounts, with owner property
 */
const createUserNames = function (accounts) {
  accounts.forEach((account, i) => {
    account.username = account.owner
      .toLowerCase()
      .split(' ')
      .map(word => word[0])
      .join('');
  });
};

createUserNames(accounts);

console.log(accounts);

/**
 * Calculate account balance, log it to the console, and display it on the page
 * @param {Object} account an object with owner and movements properties
 */
const calcDisplayBalance = function (account) {
  const accBalance = account.movements.reduce((acc, cur) => acc + cur, 0);
  // console.log(`Account owner: ${account.owner} // Balance: ${accBalance}`);
  labelBalance.textContent = `${accBalance} €`;
};

calcDisplayBalance(account1);

/**
 * Update values of IN, OUT and INTEREST you see on the main page based on user's movements
 *
 * added rule 1: only interests that are above 1.00 € are to be calculated
 *
 * interest is 1.2 on all deposits only
 * @param {Array} movements an array of financial movements of an account
 * @param {Number} interestRate a ratio at which an interest is calculated, only from income movements, default value is 1.2
 */
const calcDisplaySummary = function (movements, interestRate = 1.2) {
  console.log(movements);
  const incomes = movements
    .filter(mov => mov > 0)
    .reduce((acc, cur) => acc + cur, 0);

  labelSumIn.textContent = `${incomes} €`;

  const outcomes = movements
    .filter(mov => mov < 0)
    .reduce((acc, cur) => acc + cur, 0);

  labelSumOut.textContent = `${Math.abs(outcomes)} €`;

  const interest = movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * interestRate) / 100)
    .filter(dep => dep > 1.0) // added rule 1
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest} €`;
};

calcDisplaySummary(account1.movements);

// EVENT HANDLERS
// this button is attached to a form, so the default action for html page is to reload it
// it's attached to a form, so pressing ENTER key also triggers sending that form to the server
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // the only way to prevent submitting a form and triggering page reload
  e.preventDefault();
  // creating artifacts ...
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  // console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    console.log(`correct pin`);
    // display UI and a welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    } ...`;

    containerApp.style.opacity = 1;
    // display movements
    displayMovements(currentAccount.movements);
    // display balance
    calcDisplayBalance(currentAccount);
    // display summary
    calcDisplaySummary(currentAccount.movements);
  } else {
    console.log(`wrong pin!`);
  }
});
